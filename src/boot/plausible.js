// plugins/plausible.js
import Plausible from "plausible-tracker";

export default {
  install: (app, options) => {
    const { enableAutoPageviews } = Plausible(options);

    enableAutoPageviews();

    app.provide("plausible");

    const plausibleOptions = {
      domain: "boostpowdailymeetings.com", // Update for your site
      hashMode: true,
      trackLocalhost: false,
    };
    app.use(plausible, plausibleOptions);
  },
};
