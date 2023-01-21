<template>
  <q-page class="flex flex-col justify-start items-center mx-auto w-full">
    <div
      class="flex flex-col items-start justify-center mx-auto"
      style="max-width: 760px"
    >
      <h6 class="text-body1 my-0 mt-8">
        The BoostPOW Daily meetings (SPI) is a measure of the average change
        over time in prices paid by urban consumers for a market basket of goods
        and services. SPI tracks the market basket priced in
        <span class="text-italic">satoshis*</span>.
      </h6>
      <p class="text-md m-0">
        24hr change: {{ rows[0].change }}%
        <span v-if="rows[0].change >= 0">📈</span><span v-else>📉</span>
      </p>
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
import { useRoute } from "vue-router";

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

export default defineComponent({
  name: "ItemDetails",
  components: {},
  setup() {
    return {};
  },
  async mounted() {
    const route = useRoute();
  },
  methods: {},
});
</script>

<style scoped>
.q-table__container {
  box-shadow: none;
}

.q-table td {
  font-size: medium;
}
</style>
sett
