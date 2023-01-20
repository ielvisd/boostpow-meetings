<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          class="text-white"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-white antebBold flex items-center">
          <i class="fak fa-satoshisymbol-solidcirtilt" />
          <p text-base md:text-xl m-0 ml-2 pt-1>BoostPOW Daily meetingss</p>
        </q-toolbar-title>
        <DarkSwitcher />

        <q-tabs v-if="$q.platform.is.desktop" antebBold v-model="tab">
          <q-route-tab to="/" exact name="home" label="Home" />
          <q-route-tab
            to="/tools/DCA-Calculator"
            exact
            name="DCA-Calculator"
            label="Tools"
          />
          <q-route-tab name="features" label="Features" to="/features" exact />
        </q-tabs>
        <div flex items-center justify-center>
          <div
            antebBold
            mr-4
            text-xs
            v-if="relayUserStore && relayUserStore.paymail"
          >
            <p m-0>Welcome {{ relayUserStore.paymail }}</p>
          </div>
          <button
            class="ml-auto text-xs bg-purple-400 my-2 text-black rounded-xl px-2 py-1 font-bold uppercase cursor-pointer"
            @click="handleAuthClick()"
          >
            {{ relayUserStore && relayUserStore.paymail ? "Logout" : "Login" }}
          </button>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :show-if-above="false" bordered>
      <q-list>
        <q-tabs antebBold v-model="tab" vertical>
          <q-route-tab icon="home" to="/" exact name="home" label="Home" />
          <q-route-tab
            icon="calculate"
            to="/tools/DCA-Calculator"
            exact
            name="DCA-Calculator"
            label="Tools"
          />
          <q-route-tab
            icon="rocket_launch"
            name="features"
            label="Features"
            to="/features"
            exact
          />
        </q-tabs>

        <q-item-label antebBold header> Essential Links </q-item-label>
        <!-- Navigation -->
        <EssentialLink
          antebBold
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="">
      <router-view />
    </q-page-container>

    <!-- <q-footer elevated class="bg-grey-8 text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    <div>Title</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer> -->
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import DarkSwitcher from "components/DarkSwitcher.vue";
import { useQuasar } from "quasar";

const linksList = [
  {
    title: "BoostPOW Daily meetingssing @RelayX",
    caption: "Official BoostPOW Daily meetingss Relay Page",
    icon: "🐟",
    link: "https://relayx.com/1satoshipriceindex",
  },
  {
    title: "BoostPOW Daily meetingss Twetch",
    caption: "Follow us on twetch",
    icon: "🧢",
    link: "https://twetch.com/u/80571",
  },
  {
    title: "BoostPOW Daily meetingss Twitter",
    caption: "Follow us on Twitter",
    icon: "🐦",
    link: "https://twitter.com/satspriceindex",
  },
];

import { defineComponent, ref } from "vue";
import { useRelayUserStore } from "../stores/relayUser.js";
import { useBaconDataStore } from "../stores/bacon.js";
import { useBananaDataStore } from "src/stores/bananas";
import { useBreadDataStore } from "src/stores/bread";
import { useBSVDataStore } from "src/stores/bsvData";
import { useChickenDataStore } from "src/stores/chicken";
import { useCoffeeDataStore } from "src/stores/coffee";
import { useEggDataStore } from "src/stores/eggs";
import { useElectricityDataStore } from "src/stores/electricity";
import { useFlourDataStore } from "src/stores/flour";
import { useFuelOilDataStore } from "src/stores/fuelOil";
import { useGasolineAllTypesDataStore } from "src/stores/gasolineAll";
import { useGasolineUnleadedDataStore } from "src/stores/gasolineUnleaded";
import { useGopnikzStore } from "src/stores/gopnikz";
import { useMilkDataStore } from "src/stores/milk";
import { useOrangeDataStore } from "src/stores/oranges";
import { useRiceDataStore } from "src/stores/rice";
import { useTomatoesDataStore } from "src/stores/tomatoes";

export default defineComponent({
  name: "HomeLayout",

  components: {
    EssentialLink,
    DarkSwitcher,
  },

  data() {
    const relayUserStore = useRelayUserStore();

    return {
      relayUserStore,
      splitterModel: ref(20),
    };
  },
  async mounted() {
    const $q = useQuasar();

    $q.dark.set(true);
  },
  computed: {
    loginText() {
      if (useRelayUserStore.paymail) return useRelayUserStore.paymail;
      else return "Login";
    },
  },
  watch: {
    // whenever question changes, this function will run
    paymail(newPaymail, oldPaymail) {
      if (newPaymail.includes("?")) this.loginText;
      else this.loginText;
    },
  },
  methods: {
    handleAuthClick() {
      const relayUserStore = useRelayUserStore();

      if (relayUserStore.paymail) relayUserStore.logout();
      else relayUserStore.login();
    },
  },

  setup() {
    const $q = useQuasar();

    $q.platform.is.mobile;

    const leftDrawerOpen = ref(false);

    return {
      tab: ref("/"),
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
.bgImage {
  background-image: url("../assets/goplandiaBg.webp");
  background-size: cover;
  background-position: 50% 75%;
}

.bgLogo {
  background-image: url("../assets/gopniklogo.png");
  background-size: 125% auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>
