<template>
  <q-card mt-4 md:mt-8>
    <div>
      <div v-if="props.video.difficulty" class="absolute top-0 right-0 bg-white text-black p-2 flex items-center">
        <span class="pr-1">⛏️</span>{{ video.difficulty.toFixed(4) }}
      </div>
      <div class=" flex flex-col justify-center no-wrap items-center text-center border-2 border-red border max-w-sm">
        <q-video v-if="videoSource.includes('youtube') && relayUserStore.powcoTokens >= tokensRequired(videoCreationDate)"
          :src="videoSource" />


        <vue3-video-player
          v-if="!videoSource.includes('youtube') && relayUserStore.powcoTokens >= tokensRequired(videoCreationDate)"
          :core="props?.video?.download_url ? '' : HLSCore" :src="videoSource">
        </vue3-video-player>

        <p v-if="!relayUserStore?.powcoTokens || relayUserStore.powcoTokens < tokensRequired(videoCreationDate)"
          text-center py-8>Not enough POWCO tokens
          for this video</p>

        <p v-if="!relayUserStore?.powcoTokens || relayUserStore.powcoTokens < tokensRequired(videoCreationDate)">Tokens
          required: {{
            tokensRequired(videoCreationDate) }}</p>

        <q-card-section>
          <div class="flex flex-col justify-center items-center">

            <div class="flex justify-center items-center">
              <RouterLink text-pink-700 w-full text-lg font-bold text-center no-underline mx-auto border-2
                :to="props?.video?.createdAt ? `/${props.video.createdAt}` : `/${props?.video?.snippet?.title}`">
                {{ videoCreationDate }}
              </RouterLink>
            </div>

            <div class="flex justify-around items-center">
              <p class="w-1/2 border-2 border-red-500" border-2 border-red-400>Video created at: {{ videoCreationDate
              }}</p>

              <BoostButton
                :content="props?.video?.snippet?.title ? `https://powco.show/${props?.video?.snippet?.title}` : `https://powco.show/${props.video.createdAt}`"
                :onSuccess="onBoostSuccess" class="" size="sm" round :ranks="ranksWithBoost" outline>
                <p class="text-xl p-0 m-0">🦚</p>
              </BoostButton>
            </div>

          </div>
        </q-card-section>
      </div>
      <!-- TODO: Extract to it's own component - this is the confirmation dialog -->
      <q-dialog v-model="boostConfirmCard">
        <q-card class="my-card">
          <q-card-section>
            <q-card-section horizontal flex items-center>
              <div class="w-24 my-auto px-4">
                <q-img class="col-5 shadow rounded-full max-w-full h-auto align-middle border-none"
                  style="height: 50px; max-width: 50px" :src="`https://berry2.relayx.com/${video.image}`" />
              </div>

              <q-card-section>
                <p my-auto text-lg> Boosted <span font-bold>
                    {{ video.name }}
                  </span> successfully!</p>
              </q-card-section>
            </q-card-section>
          </q-card-section>
          <!-- A section with a link to the pow.co page to this txid that opens in a new windo -->
          <q-card-section flex align-center items-center>
            <q-btn mx-auto bg-pink-600 type="a" target="_blank" :href="`https://pow.co/${boostTxid}`">
              <p my-auto font-bold mx-auto text-center>
                See your boosted video at pow.co
              </p>
            </q-btn>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-card>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import { RouterLink } from 'vue-router'
import HLSCore from '@cloudgeek/playcore-hls'
import BoostButton from './BoostButton.vue'
import { useRelayUserStore } from '../stores/relayUser.js';
import { useQuasar } from 'quasar'

const relayUserStore = useRelayUserStore();
const $q = useQuasar()

const daysAgo = (videoTitle) => {
  const dateFromTitle = videoTitle.split('_').pop();
  // To set two dates to two variables
  // .split to set to UTC time https://stackoverflow.com/a/7556787
  var date1 = new Date(dateFromTitle.split('-'));
  var date2 = new Date();
  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Math.floor(Difference_In_Days);
}

const onBoostSuccess = (txid) => {
  $q.loading.hide()
}

const tokensRequired = (videoTitle) => {
  const daysOld = daysAgo(videoTitle);
  const tokens = 10000 - daysOld * 100;
  return tokens >= 100 ? tokens : 100;
}
const timeSince = (date) => {
  const seconds = Math.floor(new Date().getTime() / 1000 - date);
  return new Date(Date.now() - seconds * 1000).toDateString();
}

const boostConfirmCard = ref(false);
const boostTxid = ref('');

const videoSource = computed(() => {

  // If it's a Youtube video, return viewable url
  if (props?.video?.kind === 'youtube#playlistItem') {
    return `https://www.youtube.com/embed/${props.video.snippet.resourceId.videoId}`
  }


  if (!props?.video?.download_url) {
    return props.video?.playback?.hls_url
    // return 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'
  }

  return props.video.download_url.replace(/['"]+/g, '')
});


const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
});

// A computed property that converts the video creation date to human readable format
const videoCreationDate = computed(() => {
  // return 'No Date' if props.video.createdAt is undefined

  if (props?.video?.snippet?.title) {
    // Extract the title by taking the last part of the string after the last _
    const dateFromTitle = props.video.snippet.title.split('_').pop();
    return new Date(dateFromTitle.split('-')).toLocaleDateString();
  }

  const date = new Date(props.video.creation_time);
  return date.toLocaleDateString();
});

// A computed property that removes the extra "" surrounding the download_url
const videoDownloadUrl = computed(() => {

  if (!props?.video?.download_url) {
    return props.video.playback.embed_url
  }

  return props.video.download_url.replace(/['"]+/g, '')
});
</script>



<style scoped>
.breakwordsclass {
  word-break: break-word;
}
</style>
