import Vue3VideoPlayer from '@cloudgeek/vue3-video-player';
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css';
import { boot } from 'quasar/wrappers';

declare module '@cloudgeek/vue3-video-player' {}

export default boot(({ app }) => {
  const myLang = {
    dashboard: {
      btn: {
        play: 'Play',
        pause: 'Pause',
        fullscreen: 'Fullscreen',
        exitFullscreen: 'Exit Fullscreen',
        mute: 'Mute',
        unmute: 'Unmute',
        back: 'Back',
        pip: 'PIP',
      },
      settings: {
        autoplay: 'Autoplay',
        loop: 'Loop',
        speed: 'Speed',
        resolution: 'Resolution',
      },
    },
    layers: {
      error: {
        title: 'Error!',
        2404: 'Video Source Undefined',
        2502: 'Media Network Error',
        2503: 'Video Cannot DECODE',
        2504: 'Video Cannot Play!',
        601: 'Live video Cannot Play!',
      },
      loading: {
        msg: 'Loading ...',
      },
    },
  };

  app.use(Vue3VideoPlayer, {
    lang: myLang,
  });
});
