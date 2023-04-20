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

              <div class="text-caption">POWCO Show episodes ranked by Boost Proof of Work</div>
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
          <button
            class="ml-auto text-xs bg-purple-400 my-2 text-black rounded-xl px-2 py-1 font-bold uppercase cursor-pointer"
            @click="handleAuthClick()">
            {{ relayUserStore && relayUserStore.paymail ? "Logout" : "Login" }}
          </button>
        </div>

      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';
import { useRelayUserStore } from '../stores/relayUser.js';
import DarkSwitcher from 'components/DarkSwitcher.vue';

const relayUserStore = useRelayUserStore();

const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
