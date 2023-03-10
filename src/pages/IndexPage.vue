<template>
  <q-page class="px-4 flex flex-col justify-start items-center mx-auto w-full">
    <p class="my-4 text-center" v-if="!relayUserStore.powcoTokens">
      Oops! It looks like you're not logged in or a POWCO token holder yet. <br>
      <a href="https://relayx.com/market/93f9f188f93f446f6b2d93b0ff7203f96473e39ad0f58eb02663896b53c4f020_o2"
        target="_blank" rel="noreferrer" class="text-purple-500 underline">
        Click here to become a token holder and unlock access to past POWCO Daily Meetings.
      </a>
    </p>
    <div v-else class="q-pa-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <q-card v-for="video in relayUserStore.powcoVideos" v-bind:key="video.id" class="my-card">
        <div class="relative">
          <q-video v-if="
            relayUserStore.powcoTokens >= tokensRequired(video.snippet.title)
          " class="my-card" :src="`https://www.youtube.com/embed/${video.contentDetails.videoId}`" />
          <div v-else class="absolute inset-0 bg-black opacity-75 flex justify-center items-center">
            <p class="text-white font-bold">Not enough POWCO tokens for this video</p>
          </div>
        </div>
        <!-- Make this hold 2 columns -->
        <q-card-section class="
                  flex
                  flex-col
                  justify-between
                  items-center
                  h-full
                ">
          <!-- A div to hold these three field -->
          <div class="
                    flex
                    justify-between
                    items-center
                    mb-2
                  ">

            <div class="text-h6 mb-2">
              <a v-if="relayUserStore.powcoTokens >= tokensRequired(video.snippet.title)"
                :href="`/${video.contentDetails.videoId}`"
                class="text-purple-400 text-wrap hover:underline overflow-hidden break-all">{{
                  video.snippet.title
                }}</a>
              <span v-else class="text-gray-400 break-all">{{ video.snippet.title }}</span>
            </div>
            <div class="text-subtitle2 mb-1">
              <span class="font-bold">Days old:</span> {{ daysAgo(video.snippet.title) }}
            </div>
            <div class="text-subtitle2">
              <span class="font-bold">Tokens Required:</span> {{ tokensRequired(video.snippet.title) }}
            </div>
          </div>
          <!-- A div to hold the boost button -->
          <!-- <div class="
                  flex
                  justify-center
                  items-center
                  w-full
                ">
            <BoostButton v-if="relayUserStore.powcoTokens >= tokensRequired(video.snippet.title)"
              :videoId="video.contentDetails.videoId" :tokensRequired="tokensRequired(video.snippet.title)" />
          </div> -->
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import { useRelayUserStore } from "../stores/relayUser";
// import BoostButton from "../components/BoostButton.vue";

const relayUserStore = useRelayUserStore();

function daysAgo (videoTitle) {
  const dateFromTitle = videoTitle.split("_").pop();
  // To set two dates to two variables
  // .split to set to UTC time https://stackoverflow.com/a/7556787
  var date1 = new Date(dateFromTitle.split("-"));
  var date2 = new Date();
  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Math.floor(Difference_In_Days);
}

function tokensRequired (videoTitle) {
  const daysOld = daysAgo(videoTitle);
  const tokens = 10000 - daysOld * 100;
  // console.log("Hello from the IndexPage!");
  return tokens >= 100 ? tokens : 100;


}

onMounted(async () => {
  // TODO: Figure out why console log breaks it
  // console.log("Hello from the IndexPage!");
  // If the user is logged in, get their POWCO tokens using setJigs]
  if (relayUserStore?.paymail) {
    const ownerResponse = await relayone.alpha.run.getOwner();
    relayUserStore.setJigs(ownerResponse);
  }
});
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}

.q-table__container {
  box-shadow: none;
}

.q-table td {
  @apply cursor-pointer my-0 text-sm h-24 border-t-2;
}

.q-table tbody td {
  @apply cursor-pointer my-0 text-sm;
}

.body--dark p {
  color: white;
}
</style>
