import { acceptHMRUpdate, defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useRelayUserStore = defineStore({
  id: 'useRelayUserStore',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    loggedIn: false,
    returnUrl: null,
    loading: false,
    paymail: null,
    powcoVideos: null,
  }),
  actions: {
    toggleLoading() {
      this.loading = !this.loading;
    },
    gopUrl(gopBerryTxId) {
      return `https://berry.relayx.com/${gopBerryTxId}`;
    },

    async setJigs(ownerAddress) {
      this.loading = true;

      // Get the past powco.show episodes from the API
      const response = await api.get('https://tokenmeet.live/api/v1/videos');

      // Get the past powco.show episodes backups from Youtube
      const youtubeResponse = await api.get(
        'https://content-youtube.googleapis.com/youtube/v3/playlistItems?playlistId=PLW2_xGu416tTP4dJwppVNDjrnU-OWpeQr&part=snippet%2CcontentDetails&maxResults=50&key=AIzaSyC9V5yMpbxSIUXlHhwaq3t8HRla_B3H_fk'
      );

      console.log('youtubeResponse is: ', youtubeResponse);

      // TODO: Paginate after 50 videos
      const powcoPlaylist = youtubeResponse?.data?.items;
      if (powcoPlaylist) {
        this.powcoVideos = powcoPlaylist.reverse();
      }

      if (response && response.data) {
        const { data } = response;
        const videos = [...data.videos];
        this.powcoVideos = [...this.powcoVideos, ...videos];
      }

      // Sort the videos by createdAt or publishedAt, whichever is available
      this.powcoVideos.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (a.snippet?.publishedAt && b.snippet?.publishedAt) {
          return (
            new Date(b.snippet?.publishedAt) - new Date(a.snippet?.publishedAt)
          );
        }
        if (a.createdAt && b.snippet?.publishedAt) {
          return new Date(b.snippet?.publishedAt) - new Date(a.createdAt);
        }
        if (a.snippet?.publishedAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.snippet?.publishedAt);
        }
      });

      if (!ownerAddress) return;

      const walletJSON = await fetch(
        `https://staging-backend.relayx.com/api/user/balance2/${ownerAddress}`
      );
      const response_data = await walletJSON.json();
      // const balances = response_data.data.balances
      const collectibles = response_data.data.collectibles;
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
      localStorage.setItem('owner', ownerResponse);
      this.setJigs(ownerResponse);
    },
    async login() {
      this.loading = true;
      const token = await relayone.authBeta();
      const [payload, singature] = token.split('.');
      const data = JSON.parse(atob(payload));
      localStorage.setItem('paymail', data.paymail);
      this.paymail = data.paymail;
      this.loggedIn = true;
      await this.getRunOwner();
    },
    logout() {
      this.loading = true;
      localStorage.removeItem('paymail');
      this.paymail = null;
      this.loggedIn = false;
      // relayone.logout()
      localStorage.removeItem('https://one.relayx.io/');
      // redirect to previous url or default to home page
      // useRouter(this.returnUrl || '/')
    },
    combineBoostedRecipes(boostedRecipes) {
      // Loop through powcoVideos and if a recipe is in the boostedRecipes then combine the two.
      // The boostedRecipes are in powcoVideos but they have a special property called 'difficulty' which is how they will be ranked. powcoVideos should be sorted by difficulty.
      this.powcoVideos = this.powcoVideos.map((video) => {
        const videoTxid = video.origin?.split('_')[0];
        // console.log('videoTxid is: ', videoTxid, video);
        const boostedRecipe = boostedRecipes.find(
          (recipe) => recipe.content_txid === videoTxid
        );
        if (boostedRecipe) {
          return {
            ...video,
            boosted: true,
            difficulty: boostedRecipe.difficulty,
          };
        } else {
          return {
            ...video,
            boosted: false,
            difficulty: null,
          };
        }
      });
      // Sort the powcoVideos by difficulty
      this.powcoVideos.sort((a, b) => b.difficulty - a.difficulty);
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRelayUserStore, import.meta.hot));
