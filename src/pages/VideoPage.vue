<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-md col-12 col-md-8 col-lg-6">
      <q-card-section>
        <q-video :src="`https://www.youtube.com/embed/${videoId}`" :aspect-ratio="16 / 9" :controls="true"
          :playsinline="true" />
      </q-card-section>

      <q-card-section>
        <div class="text-h6">
          {{ videoDetails?.items?.length && videoDetails?.items[0]?.snippet?.title }}
        </div>
        <div class="text-subtitle2">
          {{ videoDetails?.items?.length && videoDetails?.items[0]?.snippet?.description }}
        </div>

        <div class="text-subtitle2">
          Days ago: {{ videoDetails?.items?.length && daysAgo(videoDetails?.items[0]?.snippet?.title) }}
        </div>

        <div class="text-subtitle2">
          Tokens required: {{ videoDetails?.items?.length && tokensRequired(videoDetails?.items[0]?.snippet?.title) }}
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.q-card-section {
  padding: 0;
}

/* Media query for larger screens */
@media (min-width: 992px) {
  .q-card {
    max-width: 800px;
  }

  .col-lg-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>


<script setup lang="ts" >
// Import the useRoute function
import { useRoute } from "vue-router";

// Import the ref function
import { ref, onBeforeMount } from "vue";

// Set the data from the URL parameter
const { params } = useRoute()
const videoId = ref(params.videoId)
const videoDetails = ref({})

onBeforeMount(async () => {
  // console.log("in onBeforeMount");
  const youtubeVideoDataResponse = await fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=TkkcjEfkVZA&key=AIzaSyC9V5yMpbxSIUXlHhwaq3t8HRla_B3H_fk")

  videoDetails.value = await youtubeVideoDataResponse.json()
  // console.log("youtubeVideoDataResponse: ", youtubeVideoDataResponse);

  // console.log("videoId: ", videoId.value);
})

const daysAgo = (videoTitle) => {
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

const tokensRequired = (videoTitle) => {
  const daysOld = daysAgo(videoTitle);
  const tokens = 10000 - daysOld * 100;
  return tokens >= 100 ? tokens : 100;
}
</script>
