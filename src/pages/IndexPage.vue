<template>
  <q-page class="px-4 flex flex-col justify-start items-center mx-auto w-full">
    <YouTube
      src="https://www.youtube.com/watch?v=jNQXAC9IVRw"
      @ready="onReady"
      ref="youtube"
    />
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
import YouTube from "vue3-youtube";

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
    YouTube,
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

    timeSince(date) {
      const seconds = Math.floor(new Date().getTime() / 1000 - date);

      return new Date(Date.now() - seconds * 1000).toDateString();
    },
  },
});
</script>

<style scoped>
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
