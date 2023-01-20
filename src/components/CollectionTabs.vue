<script setup>
</script>

<template>
  <q-tabs class="text-#242424" v-model="tab" align="left">
    <p class="text-white text-md md:text-xl font-bold text-#242424 m-0">
      Browse Collection
    </p>
    <q-space />
    <p v-if="parentPage === 'collection'" class="text-white text-md md:text-xl font-bold text-#242424 mr-2">
      More by this creator:
    </p>
    <p v-else class="text-white text-md md:text-xl font-bold text-#242424 mr-2">
      My Bags
    </p>
    <div class="flex items-center justify-center bg-#242424 text-purple-300 rounded-xl">
      <!-- <q-route-tab :icon="getGopniksLogo" name="gopnikz" label="Gopnikz" :to="`/${parentPage}/gopnikz`" exact />
            <q-route-tab v-if="parentPage === 'collection'" :icon="getMetagopsLogo" name="metagops" label="Metagops"
                :to="`/${parentPage}/metagops`" exact />
            <q-route-tab v-if="parentPage === 'collection'" :icon="getSlavettesLogo" name="slavettes" label="Slavettes"
                :to="`/${parentPage}/slavettes`" exact />
            <q-route-tab :icon="getMunitionsLogo" name="munitions" label="Munitions" v-if="parentPage === 'collection'"
                to="/collection/munitions" exact />
            <q-route-tab :icon="getCompanionsLogo" name="companions" label="Companions"
                :to="`/${parentPage}/companions`" exact />
            <q-route-tab v-if="parentPage === 'collection'" :icon="getGenesisLogo" name="genesisGops" label="Genesis"
                to="/collection/genesisGops" exact />
            <q-route-tab v-if="parentPage === 'collection'" :icon="getLegendaryLogo" name="legendaryGops"
                label="Legendary" :to="`/${parentPage}/legendaryGops`" exact /> -->
    </div>
  </q-tabs>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CollectionTabs",

  props: {
    parentPage: {
      type: String,
      default: 'collection',
    },
  },
  computed: {
    // getGopniksLogo() {
    //     return 'img:' + new URL('../assets/gopniklogo.png', import.meta.url).href
    // },
    // getMetagopsLogo() {
    //     return 'img:' + new URL('../assets/3dplace.jpeg', import.meta.url).href
    // },
    // getSlavettesLogo() {
    //     return 'img:' + new URL('../assets/tinyslavettelogo.webp', import.meta.url).href
    // },
    // getMunitionsLogo() {
    //     return 'img:' + new URL('../assets/munitions.webp', import.meta.url).href
    // },
    // getCompanionsLogo() {
    //     return 'img:' + new URL('../assets/companions.png', import.meta.url).href
    // },
    // getLegendaryLogo() {
    //     return 'img:' + new URL('../assets/goldGop.webp', import.meta.url).href
    // },
    // getGenesisLogo() {
    //     return 'img:' + new URL('../assets/genesis.webp', import.meta.url).href
    // }
  },
});
</script>


<style lang="scss" scoped>
.bgLogo {
  /* background-image: url("../assets/gopniklogo.png"); */
  background-size: 125% auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.multiselect-options {
  font-family: Courier, Courier New, Lucida Console, Monaco, Consolas;
  padding: 20px;
  margin-bottom: 20px;
  display: inline-block;
  /* width: 100%; */
  box-sizing: border-box;
  font-size: 16px;
}

.output {
  font-family: Courier, Courier New, Lucida Console, Monaco, Consolas;
  background: #000000;
  color: #812c6c;
  padding: 20px;
  margin-bottom: 20px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
}

.multiselect-theme {
  --ms-bg: #242424;
  --ms-tag-bg: #bd83af;
  --ms-tag-color: #812c6c;
}

.multiselect-tag.is-user {
  padding: 5px 8px;
  border-radius: 22px;
  background: #35495e;
  margin: 3px 3px 8px;
}

.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;
  ;
}

.user-image {
  margin: 0 6px 0 0;
  border-radius: 50%;
  height: 22px;
}

.character-option-icon {
  margin: 0 6px 0 0;
  height: 22px;
}

.character-label-icon {
  margin: 0 6px 0 0;
  height: 26px;
}

:deep(.q-icon) {
  width: 44px;
  height: auto;
  border-radius: 9999px;
  border: 2px solid white;
}

:deep(.q-icon) {
  img {
    border-radius: 9999px;
  }
}
</style>
