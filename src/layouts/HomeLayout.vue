<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-pink-600">
        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->

        <q-toolbar-title class="text-white antebBold flex items-center">
          <i class="fa-solid fa-volcano"></i>
          <RouterLink class="text-white no-underline" to="/">
            <div class="flex flex-col items-start justify-center">
              <div class="flex flex-row justify-center">
                <!-- <img src="../../public/icons/favicon-16x16.png" alt="logo" class="h-8"> -->
                <div class="text-h6">The POWCO Show</div>

              </div>

              <div class="text-caption">POWCO show episodes ranked by Boost Proof of Work</div>
            </div>
          </RouterLink>
        </q-toolbar-title>

        <DarkSwitcher />

        <q-tabs v-if="$q.platform.is.desktop" antebBold v-model="tab">
          <q-route-tab to="/" exact name="home" label="Home" />
        </q-tabs>
        <div flex items-center justify-center>
          <div antebBold mr-4 text-xs v-if="relayUserStore && relayUserStore.paymail">
            <p m-0>Welcome {{ relayUserStore.paymail }}</p>
          </div>
          <button class="ml-auto text-xs bg-white my-2 text-black rounded-xl px-2 py-1 font-bold uppercase cursor-pointer"
            @click="handleAuthClick()">
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
        <EssentialLink antebBold v-for="link in essentialLinks" :key="link.title" v-bind="link" />
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
import EssentialLink from 'components/EssentialLink.vue';
import DarkSwitcher from 'components/DarkSwitcher.vue';
import { useQuasar } from 'quasar';
import { RouterLink } from 'vue-router'

const linksList = [
  {
    title: 'The Proof of Work Company',
    caption: 'A post-hyperbitcoinization social network',
    icon: '🚀',
    link: 'https://pow.co',
  },
];

import { defineComponent, ref } from 'vue';
import { useRelayUserStore } from '../stores/relayUser.js';

export default defineComponent({
  name: 'HomeLayout',

  components: {
    EssentialLink,
    DarkSwitcher,
  },

  data () {
    const relayUserStore = useRelayUserStore();

    return {
      relayUserStore,
      splitterModel: ref(20),
    };
  },
  async mounted () {
    const $q = useQuasar();

    $q.dark.set(true);
  },
  computed: {
    loginText () {
      if (useRelayUserStore.paymail) return useRelayUserStore.paymail;
      else return 'Login';
    },
  },
  watch: {
    // whenever question changes, this function will run
    paymail (newPaymail, oldPaymail) {
      if (newPaymail.includes('?')) this.loginText;
      else this.loginText;
    },
  },
  methods: {
    handleAuthClick () {
      const relayUserStore = useRelayUserStore();

      if (relayUserStore.paymail) relayUserStore.logout();
      else relayUserStore.login();
    },
  },

  setup () {
    const $q = useQuasar();

    $q.platform.is.mobile;

    const leftDrawerOpen = ref(false);

    return {
      tab: ref('/'),
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
