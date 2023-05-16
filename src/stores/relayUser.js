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
    powcoTokens: null,
    powcoVideos: null,
  }),
  actions: {
    toggleLoading() {
      this.loading = !this.loading;
    },
    gopUrl(gopBerryTxId) {
      return `https://berry.relayx.com/${gopBerryTxId}`;
    },
    // A method that converts the video creation date to human readable format
    videoCreationDate(video) {
      // return 'No Date' if props.video.createdAt is undefined
      if (!video) {
        return 'No Date';
      }

      if (video.snippet?.title) {
        // Extract the title by taking the last part of the string after the last _
        const dateFromTitle = video.snippet.title.split('_').pop();
        return new Date(dateFromTitle.split('-'));
      } else if (video.createdAt) {
        const date = new Date(video.createdAt);
        return date;
      } else {
        return 'No Date';
      }
    },
    async setJigs(ownerAddress) {
      this.loading = true;

      const powTokenContractID =
        '93f9f188f93f446f6b2d93b0ff7203f96473e39ad0f58eb02663896b53c4f020_o2';

      // Get the past powco.show episodes from the API
      const response = await api.get('https://tokenmeet.live/api/v1/videos');

      // Get the past powco.show episodes backups from Youtube
      const youtubeResponse = await api.get(
        'https://content-youtube.googleapis.com/youtube/v3/playlistItems?playlistId=PLW2_xGu416tTP4dJwppVNDjrnU-OWpeQr&part=snippet%2CcontentDetails&maxResults=50&key=AIzaSyC9V5yMpbxSIUXlHhwaq3t8HRla_B3H_fk'
      );
      // TODO: Hacky way to get the next 50 videos, need to find a better way
      const youtubeResponse2 = await api.get(
        'https://content-youtube.googleapis.com/youtube/v3/playlistItems?playlistId=PLW2_xGu416tTP4dJwppVNDjrnU-OWpeQr&part=snippet%2CcontentDetails&maxResults=50&key=AIzaSyC9V5yMpbxSIUXlHhwaq3t8HRla_B3H_fk&pageToken=EAAaBlBUOkNESQ'
      );

      const powcoPlaylist = youtubeResponse?.data?.items;
      if (powcoPlaylist) {
        this.powcoVideos = powcoPlaylist.reverse();
      }

      const powcoPlaylist2 = youtubeResponse2?.data?.items;
      if (powcoPlaylist2) {
        this.powcoVideos = [...this.powcoVideos, ...powcoPlaylist2.reverse()];
      }

      if (response && response.data) {
        const { data } = response;
        const videos = [...data.videos];
        this.powcoVideos = [...this.powcoVideos, ...videos];
      }

      // Sort the videos by date
      this.powcoVideos.sort((a, b) => {
        const aDate = this.videoCreationDate(a);
        const bDate = this.videoCreationDate(b);

        if (aDate < bDate) {
          return 1;
        }
        if (aDate > bDate) {
          return -1;
        }
        return 0;
      });

      this.powcoVideos.forEach((powcoVideo) => {
        if (!powcoVideo.difficulty) {
          powcoVideo.difficulty = 0;
        }
      });

      this.powcoVideos.sort((a, b) => {
        if (a.difficulty < b.difficulty) {
          return 1;
        }
        if (a.difficulty > b.difficulty) {
          return -1;
        }
        return 0;
      });

      if (!ownerAddress) {
        this.loading = false;
        return;
      }

      const walletJSON = await fetch(
        `https://staging-backend.relayx.com/api/user/balance2/${ownerAddress}`
      );
      const response_data = await walletJSON.json();
      const balances = response_data.data.balances;

      this.powcoTokens = balances[powTokenContractID];
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
    getContentDate(content) {
      if (content?.content?.content_json) {
        // The video date is the last part of the url after the last slash
        const videoDate = content.content.content_json.url.split('/').pop();
        return videoDate;
      } else if (content?.snippet?.title) {
        // The video date is the last part of the title after the last dash
        const videoDate = content.snippet.title;
        return videoDate;
      } else {
        return null;
      }
    },
    combineBoostedContent(boostedContent) {
      // Loop through the boostedContent, get the content, and add the difficulty to the corresponding
      // powcoVideos object
      if (boostedContent) {
        boostedContent.forEach(async (boostedRecipe) => {
          const boostedRecipeDataResponse = await fetch(
            `https://pow.co/api/v1/content/${boostedRecipe.content_txid}`
          );
          const boostedRecipeData = await boostedRecipeDataResponse.json();

          const contentDate = this.getContentDate(boostedRecipeData);
          // // Loop through the powcoVideos and add the difficulty to the corresponding powcoVideos object
          this.powcoVideos.forEach((powcoVideo) => {
            if (
              powcoVideo.snippet?.title === contentDate ||
              powcoVideo.createdAt === contentDate
            ) {
              // The difficulty is the sum of the difficulty of every item in the tags array
              powcoVideo.difficulty = boostedRecipeData.tags.reduce(
                (a, b) => a + b.difficulty,
                0
              );
            }
          });
        });
        // Sort the powcoVideos by difficulty
        this.powcoVideos.sort((a, b) => b.difficulty - a.difficulty);
      }
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRelayUserStore, import.meta.hot));
