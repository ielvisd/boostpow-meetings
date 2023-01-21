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
          <i class="fa-solid fa-feather-pointed"></i>
          <p text-base md:text-xl m-0 ml-2 pt-1>The POWCO Dev Show</p>
        </q-toolbar-title>
        <DarkSwitcher />

        <q-tabs v-if="$q.platform.is.desktop" antebBold v-model="tab">
          <q-route-tab to="/" exact name="home" label="Home" />
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
    title: "POWCO",
    caption: "Proof of Work Cooperative",
    icon: "🦌",
    link: "https://pow.co",
  },
  {
    title: "AskBitcoin",
    caption: "AskBitcoin",
    icon: "🧠",
    link: "https://askbitcoin.com",
  },
  {
    title: "POWCO Development",
    caption: "Improve POWCO properties and earn satoshis",
    icon: "👷‍♂️",
    link: "https://powco.dev",
  },
  {
    title: "POWStream",
    caption: "Watch & boost",
    icon: "🍿",
    link: "https://powstream.com",
  },
];

import { defineComponent, ref } from "vue";
import { useRelayUserStore } from "../stores/relayUser.js";

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
