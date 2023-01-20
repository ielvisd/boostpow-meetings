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

// import BaconUSDChart from '../components/BaconUSDChart.ts'
import { useBSVDataStore } from "src/stores/bsvData";
import { useBaconDataStore } from "src/stores/bacon";
import { useBananaDataStore } from "src/stores/bananas";
import { useBreadDataStore } from "src/stores/bread";
import { useChickenDataStore } from "src/stores/chicken";
import { useCoffeeDataStore } from "src/stores/coffee";
import { useEggDataStore } from "src/stores/eggs";
import { useFlourDataStore } from "src/stores/flour";
import { useMilkDataStore } from "src/stores/milk";
import { useOrangeDataStore } from "src/stores/oranges";
import { useRiceDataStore } from "src/stores/rice";
import { useTomatoesDataStore } from "src/stores/tomatoes";
import { useElectricityDataStore } from "src/stores/electricity";
import { useFuelOilDataStore } from "src/stores/fuelOil";
import { useGasolineAllTypesDataStore } from "src/stores/gasolineAll";
import { useGasolineUnleadedDataStore } from "src/stores/gasolineUnleaded";
import NFTCard from "src/components/NFTCard.vue";
import { useGopnikzStore } from "src/stores/gopnikz";
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

const milkDataStore = useMilkDataStore();
const orangeDataStore = useOrangeDataStore();
const riceDataStore = useRiceDataStore();
const tomatoesDataStore = useTomatoesDataStore();
const baconDataStore = useBaconDataStore();
const bananaDataStore = useBananaDataStore();
const breadDataStore = useBreadDataStore();
const bsvDataStore = useBSVDataStore();
const chickenDataStore = useChickenDataStore();
const coffeeDataStore = useCoffeeDataStore();
const eggDataStore = useEggDataStore();
const electricityDataStore = useElectricityDataStore();
const flourDataStore = useFlourDataStore();
const fuelOilDataStore = useFuelOilDataStore();
const gasolineAllTypesDataStore = useGasolineAllTypesDataStore();
const gasolineUnleadedDataStore = useGasolineUnleadedDataStore();
const gopnikzStore = useGopnikzStore();
const relayUserStore = useRelayUserStore();

onMounted(() => {
  console.log("in onMounted");

  console.log("fuel oil store", fuelOilDataStore);
});

const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: "price",
    sortable: true,
  },
  {
    name: "last30days",
    label: "CPI Last 30 days (%)",
    field: "last30days",
    sortable: true,
    sort: (a, b) => parseFloat(a, 10) - parseFloat(b, 10),
  },
];

const currencyColumns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: "price",
    sortable: true,
  },
  {
    name: "last30days",
    label: "Satoshi Price Last 30 days (%)",
    field: "last30days",
    sortable: true,
    sort: (a, b) => parseFloat(a, 10) - parseFloat(b, 10),
  },
];

const nftColumns = [
  {
    name: "rank",
    required: true,
    label: "Rank",
    align: "left",
    field: (row) => row.rank,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "vol_7d",
    required: true,
    label: "Volume (7day)",
    align: "left",
    field: (row) => row.data.vol_7d,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: "price",
    sortable: true,
  },
];

const ftColumns = [
  {
    name: "rank",
    required: true,
    label: "Rank",
    align: "left",
    field: (row) => row.rank,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "vol_7d",
    required: true,
    label: "Volume (7day)",
    align: "left",
    field: (row) => row.data.vol_7d,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: "price",
    sortable: true,
  },
];

const audioColumns = [
  {
    name: "rank",
    required: true,
    label: "Rank",
    align: "left",
    field: (row) => row.rank,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "vol_7d",
    required: true,
    label: "Volume (7day)",
    align: "left",
    field: (row) => row.data.vol_7d,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: "price",
    sortable: true,
  },
];

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
      columns,
      initialPagination: {
        sortBy: "last30days",
        descending: false,
        page: 1,
        rowsPerPage: 50,
        // rowsNumber: xx if getting data from a server
      },
      nftRankings: ref({}),
      ftRankings: ref({}),
      audioRankings: ref({}),
      currencyColumns,
      nftColumns,
      ftColumns,
      baconDataStore,
      bananaDataStore,
      electricityDataStore,
      flourDataStore,
      gasolineUnleadedDataStore,
      fuelOilDataStore,
      orangeDataStore,
      milkDataStore,
      gopnikzStore,
      showChart: false,
      exchangeResult: ref(null),
      gopSales: ref([]),
      selected: ref([]),
      bsvData: ref(null),
      bsvDataStore,
      rows: ref([
        {
          name: baconDataStore.catalog.item,
          shortName: baconDataStore.catalog.shortName,
          emoji: baconDataStore.catalog.emoji,
          price: baconDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((baconDataStore.data.slice(-1)[0].value -
              baconDataStore.data.slice(-2)[0].value) /
              baconDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: baconDataStore,
        },
        {
          name: bananaDataStore.catalog.item,
          shortName: bananaDataStore.catalog.shortName,
          emoji: bananaDataStore.catalog.emoji,
          price: bananaDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((bananaDataStore.data.slice(-1)[0].value -
              bananaDataStore.data.slice(-2)[0].value) /
              bananaDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: bananaDataStore,
        },
        {
          name: breadDataStore.catalog.item,
          shortName: breadDataStore.catalog.shortName,
          emoji: breadDataStore.catalog.emoji,
          price: breadDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((breadDataStore.data.slice(-1)[0].value -
              breadDataStore.data.slice(-2)[0].value) /
              breadDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: breadDataStore,
        },
        {
          name: chickenDataStore.catalog.item,
          shortName: chickenDataStore.catalog.shortName,
          emoji: chickenDataStore.catalog.emoji,
          price: chickenDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((chickenDataStore.data.slice(-1)[0].value -
              chickenDataStore.data.slice(-2)[0].value) /
              chickenDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: chickenDataStore,
        },
        {
          name: coffeeDataStore.catalog.item,
          shortName: coffeeDataStore.catalog.shortName,
          emoji: coffeeDataStore.catalog.emoji,
          price: coffeeDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((coffeeDataStore.data.slice(-1)[0].value -
              coffeeDataStore.data.slice(-2)[0].value) /
              coffeeDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: coffeeDataStore,
        },
        {
          name: eggDataStore.catalog.item,
          shortName: eggDataStore.catalog.shortName,
          emoji: eggDataStore.catalog.emoji,
          price: eggDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((eggDataStore.data.slice(-1)[0].value -
              eggDataStore.data.slice(-2)[0].value) /
              eggDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: eggDataStore,
        },
        {
          name: flourDataStore.catalog.item,
          shortName: flourDataStore.catalog.shortName,
          emoji: flourDataStore.catalog.emoji,
          price: flourDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((flourDataStore.data.slice(-1)[0].value -
              flourDataStore.data.slice(-2)[0].value) /
              flourDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: flourDataStore,
        },
        {
          name: milkDataStore.catalog.item,
          shortName: milkDataStore.catalog.shortName,
          emoji: milkDataStore.catalog.emoji,
          price: milkDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((milkDataStore.data.slice(-1)[0].value -
              milkDataStore.data.slice(-2)[0].value) /
              milkDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: milkDataStore,
        },
        {
          name: orangeDataStore.catalog.item,
          shortName: orangeDataStore.catalog.shortName,
          emoji: orangeDataStore.catalog.emoji,
          price: orangeDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((orangeDataStore.data.slice(-1)[0].value -
              orangeDataStore.data.slice(-2)[0].value) /
              orangeDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: orangeDataStore,
        },
        {
          name: riceDataStore.catalog.item,
          shortName: riceDataStore.catalog.shortName,
          emoji: riceDataStore.catalog.emoji,
          price: riceDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((riceDataStore.data.slice(-1)[0].value -
              riceDataStore.data.slice(-2)[0].value) /
              riceDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: riceDataStore,
        },
        {
          name: tomatoesDataStore.catalog.item,
          shortName: tomatoesDataStore.catalog.shortName,
          emoji: tomatoesDataStore.catalog.emoji,
          price: tomatoesDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((tomatoesDataStore.data.slice(-1)[0].value -
              tomatoesDataStore.data.slice(-2)[0].value) /
              tomatoesDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: tomatoesDataStore,
        },
        {
          name: electricityDataStore.catalog.item,
          shortName: electricityDataStore.catalog.shortName,
          emoji: electricityDataStore.catalog.emoji,
          price: electricityDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((electricityDataStore.data.slice(-1)[0].value -
              electricityDataStore.data.slice(-2)[0].value) /
              electricityDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: electricityDataStore,
        },
        {
          name: fuelOilDataStore.catalog.item,
          shortName: fuelOilDataStore.catalog.shortName,
          emoji: fuelOilDataStore.catalog.emoji,
          price: fuelOilDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((fuelOilDataStore.data.slice(-1)[0].value -
              fuelOilDataStore.data.slice(-2)[0].value) /
              fuelOilDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: fuelOilDataStore,
        },
        {
          name: gasolineAllTypesDataStore.catalog.item,
          shortName: gasolineAllTypesDataStore.catalog.shortName,
          emoji: gasolineAllTypesDataStore.catalog.emoji,
          price: gasolineAllTypesDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((gasolineAllTypesDataStore.data.slice(-1)[0].value -
              gasolineAllTypesDataStore.data.slice(-2)[0].value) /
              gasolineAllTypesDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: gasolineAllTypesDataStore,
        },
        {
          name: gasolineUnleadedDataStore.catalog.item,
          shortName: gasolineUnleadedDataStore.catalog.shortName,
          emoji: gasolineUnleadedDataStore.catalog.emoji,
          price: gasolineUnleadedDataStore.data.slice(-1)[0].value,
          change: "",
          last30days: (
            ((gasolineUnleadedDataStore.data.slice(-1)[0].value -
              gasolineUnleadedDataStore.data.slice(-2)[0].value) /
              gasolineUnleadedDataStore.data.slice(-2)[0].value) *
            100
          ).toFixed(2),
          data: gasolineUnleadedDataStore,
        },
      ]),
      currencyRows: ref([
        {
          name: "USD",
          emoji: bsvDataStore.catalog.emoji,
          shortName: bsvDataStore.catalog.shortName,
          price: "",
          change: "",
          last30days: -(
            ((bsvDataStore.data.slice(-1)[0]["Average Price"] -
              bsvDataStore.data.slice(-2)[0]["Average Price"]) /
              bsvDataStore.data.slice(-2)[0]["Average Price"]) *
            100
          ).toFixed(2),
          data: bsvDataStore,
        },
      ]),
      nftRows: ref([
        {
          rank: "",
          name: "",
          price: "",
          vol_7d: "",
        },
      ]),
      ftRows: ref([
        {
          rank: "",
          name: "",
          price: "",
          vol_7d: "",
        },
      ]),
      audioRows: ref([
        {
          rank: "",
          name: "",
          price: "",
          vol_7d: "",
        },
      ]),
      tab: ref("goodsAndServices"),
    };
  },
  async mounted() {
    this.getNFTData();
    this.getFTData();
    this.getAudioData();
    // NOTE: Fetch data?
    this.selected = [this.rows[0]];
    // await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/APU0000708111?registrationkey=2aba5af8d764404899e417ae2b3ce9cb').then(response => response.json()).then(data => (this.eggCPIData = data?.Results?.series[0]?.data));
    // this.latestEggCPIDataPoint = this.eggCPIData[0]

    await fetch("https://api.whatsonchain.com/v1/bsv/main/exchangerate")
      .then((response) => response.json())
      .then((data) => (this.exchangeResult = data));
    // this.latestEggCPIDataPoint = this.eggCPIData[0]
    await fetch("https://api.blockchair.com/bitcoin-sv/stats?")
      .then((response) => response.json())
      .then((data) => (this.bsvData = data));
    this.rows.forEach((item, index) => {
      item.change = this.bsvData?.data.market_price_usd_change_24h_percentage
        ? this.bsvData.data.market_price_usd_change_24h_percentage.toFixed(2)
        : "-";
    });
    this.currencyRows[0].price = this.humanRead(this.exchangeResult.rate);
  },
  methods: {
    onReady() {
      this.$refs.youtube.playVideo();
    },
    async getNFTData() {
      const { result } = await useQuery(gql`
        query Ranks {
          ranks(filter: "7d", category: "COL", search: "") {
            origin
            name
            image
            stats {
              rank
              floor
              vol_24h
              vol_7d
              vol_30d
              vol_total
              __typename
            }
            __typename
          }
        }
      `);
      this.nftRankings = result.value;

      if (this.nftRankings) {
        this.nftRows = this.nftRankings.ranks.map(function (ranking) {
          // create a new object to store
          var newObj = {};
          newObj["name"] = ranking.name;
          newObj["shortName"] = ranking.name;
          newObj["image"] = ranking.image;
          newObj["price"] = ranking.stats.floor;
          newObj["data"] = ranking.stats;
          newObj["vol_7d"] = ranking.stats.vol_7d;
          // return our new object.
          return newObj;
        });
      }

      watch(result, (value) => {
        this.nftRankings = value;
        if (this.nftRankings) {
          this.nftRows = this.nftRankings.ranks.map(function (ranking) {
            // create a new object to store
            var newObj = {};
            newObj["name"] = ranking.name;
            newObj["rank"] = ranking.stats.rank;
            newObj["image"] = ranking.image;
            newObj["price"] = ranking.stats.floor;
            newObj["data"] = ranking.stats;
            newObj["origin"] = ranking.origin;
            // return our new object.
            return newObj;
          });
        }
      });
    },

    async getFTData() {
      const { result } = await useQuery(gql`
        query Ranks {
          ranks(filter: "7d", category: "FT", search: "") {
            origin
            name
            image
            stats {
              rank
              floor
              vol_24h
              vol_7d
              vol_30d
              vol_total
              __typename
            }
            __typename
          }
        }
      `);
      this.ftRankings = result.value;

      if (this.ftRankings) {
        this.ftRows = this.ftRankings.ranks.map(function (ranking) {
          // create a new object to store
          var newObj = {};
          newObj["name"] = ranking.name;
          newObj["shortName"] = ranking.name;
          newObj["image"] = ranking.image;
          newObj["price"] = ranking.stats.floor;
          newObj["data"] = ranking.stats;
          newObj["vol_7d"] = ranking.stats.vol_7d;
          // return our new object.
          return newObj;
        });
      }

      watch(result, (value) => {
        this.ftRankings = value;
        if (this.ftRankings) {
          this.ftRows = this.ftRankings.ranks.map(function (ranking) {
            // create a new object to store
            var newObj = {};
            newObj["name"] = ranking.name;
            newObj["rank"] = ranking.stats.rank;
            newObj["image"] = ranking.image;
            newObj["price"] = ranking.stats.floor;
            newObj["data"] = ranking.stats;
            newObj["origin"] = ranking.origin;
            // return our new object.
            return newObj;
          });
        }
      });
    },
    async getAudioData() {
      const { result } = await useQuery(gql`
        query Ranks {
          ranks(filter: "7d", category: "AUDIO", search: "") {
            origin
            name
            image
            stats {
              rank
              floor
              vol_24h
              vol_7d
              vol_30d
              vol_total
              __typename
            }
            __typename
          }
        }
      `);
      this.audioRankings = result.value;

      if (this.audioRankings) {
        this.audioRows = this.audioRankings.ranks.map(function (ranking) {
          // create a new object to store
          var newObj = {};
          newObj["name"] = ranking.name;
          newObj["shortName"] = ranking.name;
          newObj["image"] = ranking.image;
          newObj["price"] = ranking.stats.floor;
          newObj["data"] = ranking.stats;
          newObj["vol_7d"] = ranking.stats.vol_7d;
          // return our new object.
          return newObj;
        });
      }

      watch(result, (value) => {
        this.audioRankings = value;
        if (this.audioRankings) {
          this.audioRows = this.audioRankings.ranks.map(function (ranking) {
            // create a new object to store
            var newObj = {};
            newObj["name"] = ranking.name;
            newObj["rank"] = ranking.stats.rank;
            newObj["image"] = ranking.image;
            newObj["price"] = ranking.stats.floor;
            newObj["data"] = ranking.stats;
            newObj["origin"] = ranking.origin;
            // return our new object.
            return newObj;
          });
        }
      });
    },
    handleRowClick(row) {
      if (row.shortName) {
        this.$router.push({ path: `/spi/${row.shortName}` });
      } else {
        window.open(`https://relayx.com/market/${row.origin}`, "_blank");
      }
    },
    timeSince(date) {
      const seconds = Math.floor(new Date().getTime() / 1000 - date);

      return new Date(Date.now() - seconds * 1000).toDateString();
    },
    last30dayPercentageChange(array) {},
    async handleMoreStatsClick(selection) {
      this.$router.push({ path: "/spi/bacon" });
    },
    async updateItemSelection(newSelection) {
      this.showChart = true;
      this.selected = newSelection;
    },
    humanRead(bsvDollarPrice, intSep = ",", floatSep = ".") {
      const satoshisPerDollar = bsvDollarPrice / 100000000;
      const dollarsPerSatoshis = 1 / satoshisPerDollar;
      return new Intl.NumberFormat("en", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(dollarsPerSatoshis);
    },
    dollarToSats(dollars, intSep = ",", floatSep = ".") {
      if (this.exchangeResult) {
        const satoshisPerDollar =
          (dollars / this.exchangeResult.rate) * 100000000;
        // const dollarsPerSatoshis = 1 / satoshisPerDollar
        return new Intl.NumberFormat("en", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(satoshisPerDollar);
      } else {
        return 0;
      }
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
