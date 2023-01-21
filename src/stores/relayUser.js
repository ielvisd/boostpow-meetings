import { acceptHMRUpdate, defineStore } from "pinia";

export const useRelayUserStore = defineStore({
  id: "useRelayUserStore",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    loggedIn: false,
    returnUrl: null,
    loading: false,
    paymail: null,
    powcoTokens: null,
    powcoVideos: [],
    totalPowcoVideos: 0,
  }),
  actions: {
    toggleLoading() {
      this.loading = !this.loading;
    },
    gopUrl(gopBerryTxId) {
      return `https://berry.relayx.com/${gopBerryTxId}`;
    },
    async setJigs(ownerAddress) {
      const powTokenContractID =
        "93f9f188f93f446f6b2d93b0ff7203f96473e39ad0f58eb02663896b53c4f020_o2";
      this.loading = true;
      if (!ownerAddress) return;

      const walletJSON = await fetch(
        `https://staging-backend.relayx.com/api/user/balance2/${ownerAddress}`
      );
      const response_data = await walletJSON.json();
      const balances = response_data.data.balances;
      console.log("balances are: ", balances);
      this.powcoTokens = balances[powTokenContractID];

      // Get the playlist items if this is a powco token holder
      if (this.powcoTokens >= 1) {
        const powcoPlaylistResponse = await fetch(
          "https://content-youtube.googleapis.com/youtube/v3/playlistItems?playlistId=PLW2_xGu416tTP4dJwppVNDjrnU-OWpeQr&part=snippet%2CcontentDetails&maxResults=50&key=AIzaSyC9V5yMpbxSIUXlHhwaq3t8HRla_B3H_fk"
          // "https://youtube.googleapis.com/youtube/v3/channels?part=id&id=PLW2_xGu416tTP4dJwppVNDjrnU-OWpeQr&key=[AIzaSyC9V5yMpbxSIUXlHhwaq3t8HRla_B3H_fk]"
        );
        const powcoPlaylist = await powcoPlaylistResponse.json();
        this.powcoVideos = powcoPlaylist.items;
        this.totalPowcoVideos = powcoPlaylist.pageInfo.totalResults;
      }
      this.loading = false;
    },
    async getRunOwner() {
      const ownerResponse = await relayone.alpha.run.getOwner();
      const run = new Run({
        wallet: {
          ...relayone.alpha.run,
          owner() {
            return ownerResponse;
          },
        },
      });
      localStorage.setItem("owner", ownerResponse);
      this.setJigs(ownerResponse);
    },
    async login() {
      this.loading = true;
      const token = await relayone.authBeta();
      const [payload, singature] = token.split(".");
      const data = JSON.parse(atob(payload));
      localStorage.setItem("paymail", data.paymail);
      this.paymail = data.paymail;
      this.loggedIn = true;
      await this.getRunOwner();
    },
    logout() {
      this.loading = true;
      localStorage.removeItem("paymail");
      this.paymail = null;
      this.loggedIn = false;
      // relayone.logout()
      localStorage.removeItem("https://one.relayx.io/");
      // redirect to previous url or default to home page
      // useRouter(this.returnUrl || '/')
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRelayUserStore, import.meta.hot));
