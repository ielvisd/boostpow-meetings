<template>
  <q-page class="px-4 flex flex-col justify-start items-center mx-auto w-full">
    <div class="q-pa-md flex justify-center items-center w-full">

      <div class="w-full flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold mb-4">The POWCO Show</h1>
        <p class="text-lg m-0">
          POWCO show episodes ranked by Boost Proof of Work
        </p>
      </div>
      <div flex flex-col justify-center items-center>

        <div class="flex justify-center items-center">
          <q-select v-model="selectedSort" :options="sortOptions" class="my-4 mx-4" />
          <q-select v-model="dateModel" :options="dateOptions"
            :display-value="`${dateModel ? dateModel.label : '*none*'}`" />
        </div>

        <paginate mx-auto v-model:current-page="currentPage" :totalPage="pageCount" @pageChange="handlePageChange" />

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ItemCard v-for="video in slicedVideos" :key="video.id" :video="video" :exchangeRate="exchangeRate"
            class="my-card" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, onBeforeMount, ref, computed } from 'vue';
import ItemCard from '../components/ItemCard.vue'
import { useRelayUserStore } from '../stores/relayUser.js';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar';
import Paginate from 'vue3-paginate'

const $q = useQuasar();
const currentPage = ref(1);
const pageSize = ref(9);

const relayUserStore = useRelayUserStore();
const sortOptions = [
  { label: 'No. low to high', value: 'No. low to high' },
  { label: 'No. high to low', value: 'No. high to low' },
  { label: 'Difficulty high to low', value: 'Difficulty high to low' },
];
const selectedSort = ref('Difficulty high to low');

// A computed property for the total number of powcoVideos
const numberOfVideos = computed(() =>
  relayUserStore.powcoVideos.length
);

const pageCount = computed(() => {
  if (!relayUserStore?.powcoVideos) return 0;
  const items = relayUserStore?.powcoVideos?.filter((video) =>
    video?.kind || video?.media_info
  );;
  return Math.ceil(items.length / pageSize.value);
});

const slicedVideos = computed(() => {
  let videos = relayUserStore.powcoVideos || [];

  // Remove videos without 'kind' or 'media_info' properties
  videos = videos.filter((video) =>

    video?.kind || video?.media_info
  );

  // Then sort by difficulty
  videos?.sort((a, b) => b?.difficulty - a?.difficulty);


  if (videos && selectedSort.value) {
    switch (selectedSort.value.value) {
      case 'No. low to high':
        videos.sort((a, b) => a?.props?.no - b?.props?.no);
        break;
      case 'No. high to low':
        videos.sort((a, b) => b?.props?.no - a?.props?.no);
        break;
      case 'Difficulty high to low':
        videos.sort((a, b) => b?.difficulty - a?.difficulty);
        break;
      default:
        break;
    }
  }

  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;

  return videos && videos.slice(startIndex, endIndex);
});


const now = new Date().getTime()
// Calculate the Unix timestamp for 7 days ago (in milliseconds)
const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
const oneDayAgo = now - (1 * 24 * 60 * 60 * 1000);
const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
// Convert the Unix timestamp to seconds by dividing by 1000
const unixTimestampSevenDaysAgo = Math.floor(sevenDaysAgo / 1000);
const unixTimestampOneDayAgo = Math.floor(oneDayAgo / 1000);
const unixTimestampThirtyDaysAgo = Math.floor(thirtyDaysAgo / 1000);

const handlePageChange = (pageNum) => {
  currentPage.value = pageNum;
};

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

const exchangeRate = ref(null)

// TODO: Pass this as a prop instead
onBeforeMount(async () => {
  const exchangeRateResponse = await api.get('https://api.whatsonchain.com/v1/bsv/main/exchangerate')

  // round to w decimals
  exchangeRate.value = exchangeRateResponse.data.rate.toFixed(2)
})


onMounted(async () => {
  const { data: boost_rankings } = await api.get(`https://pow.co/api/v1/boost/rankings?start_date=${dateModel.value.startDate}&tag=6c61666f6e64616465656c6365626f7275636f`)

  // Call setJigs to load the videos
  await relayUserStore.setJigs()
  relayUserStore.combineBoostedRecipes(boost_rankings.rankings)

  // console.log('boost_rankings', boost_rankings)
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

.breakwordsclass {
  word-break: break-word;
}
</style>
