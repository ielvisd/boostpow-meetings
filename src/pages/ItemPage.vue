<template>
  <div flex items-center justify-center w-full md:w-xl mx-auto flex-col>
    <div class="flex justify-center items-center">
      <q-select v-model="selectedSort" :options="sortOptions" class="my-4 mx-4" />
      <q-select v-model="dateModel" :options="dateOptions" :display-value="`${dateModel ? dateModel.label : '*none*'}`" />
    </div>
    <ItemCard v-if="currentRecipe" :video="currentRecipe" />
    <p mx-auto mt-8 v-else> Loading </p>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRelayUserStore } from '../stores/relayUser.js';
import ItemCard from '../components/ItemCard.vue'
import { api } from 'boot/axios';

//TODO: Move this to a store
// Get the current time in milliseconds since January 1, 1970 (Unix timestamp)
const now = new Date().getTime();
// Calculate the Unix timestamp for 7 days ago (in milliseconds)
const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
const oneDayAgo = now - (1 * 24 * 60 * 60 * 1000);
const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
// Convert the Unix timestamp to seconds by dividing by 1000
const unixTimestampSevenDaysAgo = Math.floor(sevenDaysAgo / 1000);
const unixTimestampOneDayAgo = Math.floor(oneDayAgo / 1000);
const unixTimestampThirtyDaysAgo = Math.floor(thirtyDaysAgo / 1000);

const dateModel = ref({
  label: 'Last 7 days',
  value: '7d',
  startDate: unixTimestampSevenDaysAgo,
  endDate: Date.now()
})

const dateOptions = [
  {
    label: 'Last 24 hours',
    value: '24h',
    startDate: unixTimestampOneDayAgo,
    endDate: Date.now()
  },
  {
    label: 'Last 7 days',
    value: '7d',
    startDate: unixTimestampSevenDaysAgo,
    endDate: Date.now()
  },
  {
    label: 'Last 30 days',
    value: '30d',
    startDate: unixTimestampThirtyDaysAgo,
    endDate: Date.now()
  },
  {
    label: 'All time',
    value: 'total',
    // Set to BSV genesis block date in Unix format
    startDate: 1231006505,
    endDate: Date.now()
  }
]

// const setDateRange = () => {
//   dateRange.value = value;
//   getAudioRankings(dateRange.value, searchText);
// };

const relayUserStore = useRelayUserStore();
const { params } = useRoute()
const exchangeRate = ref(null)

const currentRecipe = ref(null)
const videoIndex = ref(null)

const videoSrc = computed(() => {
  return `https://www.youtube.com/watch?v=${currentRecipe.value?.contentDetails?.videoId}`
})

const sortOptions = [
  { label: 'No. low to high', value: 'No. low to high' },
  { label: 'No. high to low', value: 'No. high to low' },
  { label: 'Difficulty high to low', value: 'Difficulty high to low' },
];
const selectedSort = ref('Difficulty high to low');

const slicedVideos = computed(() => {
  let videos = relayUserStore.powcoVideos || [];

  // Remove videos without 'kind' or 'media_info' properties
  videos = videos.filter((video) =>

    video?.kind || video?.media_info
  );

  // Then sort by difficulty
  videos?.sort((a, b) => b?.difficulty - a?.difficulty)

  return videos
});

onBeforeMount(async () => {
  const exchangeRateResponse = await api.get('https://api.whatsonchain.com/v1/bsv/main/exchangerate')

  // round to w decimals
  exchangeRate.value = exchangeRateResponse.data.rate.toFixed(2)

  await relayUserStore.setJigs()

  // Loop through the powcoVideos in relayUserStore and look for a match
  for (let index = 0; index < slicedVideos.value.length; index++) {
    const video = slicedVideos.value[index];

    if (params.recipeTitle === video?.createdAt || params.recipeTitle === video?.contentDetails?.videoPublishedAt || params.recipeTitle === video?.snippet?.publishedAt) {
      currentRecipe.value = video
      videoIndex.value = index
      break
    }
  }
});
// tag = 'powco-show'
const powcoShowTagString = '706f77636f2d73686f77'

onMounted(async () => {
  const { data: boost_rankings } = await api.get(`https://pow.co/api/v1/boost/rankings?start_date=${dateModel.value.startDate}&tag=${powcoShowTagString}`)
  // Call setJigs to load the videos
  await relayUserStore.setJigs()
  relayUserStore.combineBoostedContent(boost_rankings.rankings)

  // console.log('boost_rankings', boost_rankings)
});
// A bit hacky, whenever the loading state changes I check to see if a recipe has been found
// May need to update this in the future if there are other loading state changes
watch(() => relayUserStore.loading, () => {
  if (videoIndex.value !== null) {
    currentRecipe.value = relayUserStore.powcoVideos[videoIndex.value]
  }

}
)

</script>
