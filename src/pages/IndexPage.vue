<template>
  <q-page class="px-4 flex flex-col justify-start items-center mx-auto w-full">
    <p mt-4 v-if="!relayUserStore.powcoTokens">
      You must be logged in and a
      <a
        href="https://relayx.com/market/93f9f188f93f446f6b2d93b0ff7203f96473e39ad0f58eb02663896b53c4f020_o2"
        target="_blank"
        rel="noreferrer"
      >
        POWCO token holder
      </a>
      to view past POWCO Daily Meetings
    </p>
    <div v-else class="q-pa-md">
      <q-card
        v-for="video in relayUserStore.powcoVideos"
        v-bind:key="video.id"
        class="my-card"
      >
        <q-video
          v-if="
            relayUserStore.powcoTokens >= tokensRequired(video.snippet.title)
          "
          class="my-card"
          :src="`https://www.youtube.com/embed/${video.contentDetails.videoId}`"
        />
        <p v-else text-center py-8>Not enough POWCO tokens for this video</p>
        <q-card-section>
          <div class="text-h6">{{ video.snippet.title }}</div>
          <div class="text-subtitle2">
            Days old: {{ daysAgo(video.snippet.title) }}
          </div>
          <div class="text-subtitle2">
            Tokens Required: {{ tokensRequired(video.snippet.title) }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref, computed, nextTick, watch, onMounted } from "vue";
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

// import NFTChart from '../components/NFTChart.vue'
import { useRelayUserStore } from "../stores/relayUser.js";
// import YouTube from "vue3-youtube";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://staging-backend.relayx.com/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

provideApolloClient(apolloClient);
const relayUserStore = useRelayUserStore();

onMounted(() => {
  console.log("in onMounted");

  console.log("fuel oil store", fuelOilDataStore);
});

export default defineComponent({
  name: "IndexPage",
  components: {
    // YouTube,
  },
  data() {
    const relayUserStore = useRelayUserStore();

    return {
      relayUserStore,
      splitterModel: ref(20),
    };
  },
  setup() {
    return {
      initialPagination: {
        sortBy: "last30days",
        descending: false,
        page: 1,
        rowsPerPage: 50,
        // rowsNumber: xx if getting data from a server
      },
    };
  },
  async mounted() {
    console.log("mounted");
  },
  methods: {
    onReady() {
      // this.$refs.youtube.playVideo();
    },
    daysAgo(videoTitle) {
      const dateFromTitle = videoTitle.split("_").pop();
      console.log("datefromTitle", dateFromTitle);
      // To set two dates to two variables
      // .split to set to UTC time https://stackoverflow.com/a/7556787
      var date1 = new Date(dateFromTitle.split("-"));
      console.log("date1: ", date1);
      var date2 = new Date();
      console.log("date2: ", date2);
      // To calculate the time difference of two dates
      var Difference_In_Time = date2.getTime() - date1.getTime();
      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      return Math.floor(Difference_In_Days);
    },
    tokensRequired(videoTitle) {
      const daysOld = this.daysAgo(videoTitle);

      const tokens = 50 - daysOld;

      return tokens >= 1 ? tokens : 1;
    },
    timeSince(date) {
      const seconds = Math.floor(new Date().getTime() / 1000 - date);

      return new Date(Date.now() - seconds * 1000).toDateString();
    },
  },
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
