<template>
  <q-card mt-4 md:mt-8>
    <div>

      <div class=" flex flex-col justify-center no-wrap items-center text-center border-2 border-red border max-w-sm">

        <q-video v-if="videoSource.includes('youtube')" :src="videoSource" />

        <vue3-video-player v-else :core="props?.video?.download_url ? '' : HLSCore" :src="videoSource">
        </vue3-video-player>


        <q-card-section>
          <div class="flex flex-col justify-center items-center">

            <div class="flex justify-center items-center">
              <RouterLink text-pink-700 w-full text-lg font-bold text-center no-underline mx-auto border-2
                :to="props?.video?.createdAt ? `/${props.video.createdAt}` : `/${props?.video?.snippet?.publishedAt}`">
                {{ videoCreationDate }}
              </RouterLink>
            </div>

            <div class="flex justify-around items-center">
              <p class="w-1/2 border-2 border-red-500" border-2 border-red-400>Video created at: {{ videoCreationDate
              }}</p>

              <BoostButton :exchangeRate="exchangeRate"
                :content="props.video?.contentDetails?.videoPublishedAt ? `https://powco.show/${props.video.contentDetails.videoPublishedAt}` : `https://powco.show/${props.video.createdAt}`"
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

const boostConfirmCard = ref(false);
const boostTxid = ref('');

const videoSource = computed(() => {

  // If it's a Youtube video, return viewable url
  if (props?.video?.kind === 'youtube#playlistItem') {
    return `https://www.youtube.com/embed/${props.video.snippet.resourceId.videoId}`
  }


  if (!props?.video?.download_url) {
    console.log('props.video', props.video)
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

  if (!props?.video?.createdAt) {
    console.log('props.snippet', props.video.snippet)
    console.log('props?.video.snippet?.publishedAt', props?.video.snippet?.publishedAt)

    const videoDate = new Date(props?.video?.snippet?.publishedAt);
    return videoDate.toLocaleDateString();
    // return props?.video.snippet?.publishedAt;
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
