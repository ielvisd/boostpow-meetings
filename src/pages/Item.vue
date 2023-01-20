<template>
  <q-page class="flex flex-col justify-start items-center mx-auto w-full">
    <div
      class="flex flex-col items-start justify-center mx-auto"
      style="max-width: 760px"
    >
      <h6 class="text-body1 my-0 mt-8">
        The BoostPOW Daily meetingss (SPI) is a measure of the average change
        over time in prices paid by urban consumers for a market basket of goods
        and services. SPI tracks the market basket priced in
        <span class="text-italic">satoshis*</span>.
      </h6>
      <p
        v-if="exchangeResult && exchangeResult.rate"
        class="font-bold mt-2 md:m-0"
      >
        1 USD =
        <span
          >{{ humanRead(exchangeResult.rate) }}
          <i class="fak fa-satoshisymbol-solidtilt"
        /></span>
      </p>
      <p class="text-md m-0">
        24hr change: {{ rows[0].change }}%
        <span v-if="rows[0].change >= 0">📈</span><span v-else>📉</span>
      </p>
    </div>
    <div
      v-if="bsvDataStore && selected[0]"
      w-full
      flex
      flex-col
      justify-center
      items-center
      md:max-w-3xl
    >
      <ItemChart
        class="w-full md:w-4/5 mt-2 md:mt-0"
        :bsvData="bsvDataStore"
        :itemData="selected[0].data"
        :itemType="setItemType"
      />
    </div>
    <!-- <div class="h-full mt-4">
      <q-tabs no-caps inline-label v-model="tab">
        <q-tab name="goodsAndServices" label="Goods and Services" />
        <q-tab name="nft" label="NFT" />
        <q-tab name="ft" label="FT" />
        <q-tab name="currencies" label="Currencies" />
        <q-tab name="crypto" label="Crypto" />
        <q-tab name="stocks" label="Stocks" />
        <q-tab name="real estate" label="Real Estate" />
      </q-tabs>
    </div>
    <div class="w-full md:w-max-2xl">
      <q-table selection="single" v-model:selected="selected" v-if="tab === 'goodsAndServices'" separator="none"
        :rows="rows" :columns="columns" row-key="name" class="w-full md:w-3xl mx-auto md:w-max-2xl">
        <template v-slot:body-cell-name="props">
          <q-td @click="handleRowClick(props.row)" :props="props" class="flex justify-start items-center"> <span
              class="text-md md:text-2xl mr-2">{{
                  props.row.emoji
              }}</span>{{ props.row.name }}</q-td>
        </template>
        <template v-slot:body-cell-price="props">
          <q-td @click="handleRowClick(props.row)" :props="props">
            {{ dollarToSats(props.value) }} <i class="fak fa-satoshisymbol-solidtilt" />
          </q-td>
        </template>
        <template v-slot:body-cell-last30days="props">
          <q-td @click="handleRowClick(props.row)" :props="props">
            {{ (props.value) }} %
          </q-td>
        </template>
      </q-table>
      <q-table selection="single" v-model:selected="selected" v-else-if="tab === 'nft'" separator="none" :rows="nftRows"
        :columns="nftColumns" row-key="name" class="w-full md:w-3xl mx-auto md:w-max-2xl">
        <template v-slot:body-cell-change="props">
          <q-td @click="handleRowClick(props.row)" :props="props">
            {{ props.value }} %
          </q-td>
        </template>
        <template v-slot:body-cell-name="props">
          <q-td @click="handleRowClick(props.row)" :props="props" class="flex justify-start items-center"> <span
              class="text-md md:text-2xl mr-2">{{
                  props.row.emoji
              }}</span>{{ props.row.name }}</q-td>
        </template>
        <template v-slot:body-cell-price="props">
          <q-td @click="handleRowClick(props.row)" :props="props">
            {{ dollarToSats(props.value) }} <i class="fak fa-satoshisymbol-solidtilt" />
          </q-td>
        </template>
      </q-table>
      <div v-else flex items-center justify-center>
        <p mt-8>SOON</p>
      </div>
    </div> -->
    <div
      class="flex flex-col justify-start items-start mt-4 w-full"
      style="max-width: 760px"
    >
      <p class="text-sm mx-4 my-0">
        *Satoshi Price = (CPI PRICE $USD) * (BSV/$USD) * (100,000,000 Satoshis /
        BSV)
      </p>
      <p class="text-sm mx-4 mt-0">Last CPI price update: January, 2023</p>
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

import ItemChart from "../components/ItemChart.vue";
// import NFTChart from '../components/NFTChart.vue'
import { useRoute } from "vue-router";

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
    name: "lastSale",
    label: "Last Sale Price",
    field: "lastSale",
    sortable: true,
    sort: (a, b) => parseFloat(a, 10) - parseFloat(b, 10),
  },
];
export default defineComponent({
  name: "ItemDetails",
  components: { ItemChart },
  setup() {
    return {
      columns,
      eggDataStore,
      gasolineUnleadedDataStore,
      gasolineAllTypesDataStore,
      flourDataStore,
      fuelOilDataStore,
      electricityDataStore,
      currencyColumns,
      chickenDataStore,
      coffeeDataStore,
      breadDataStore,
      bananaDataStore,
      nftColumns,
      bsvDataStore,
      gopnikzStore,
      milkDataStore,
      baconDataStore,
      riceDataStore,
      tomatoesDataStore,
      orangeDataStore,
      showChart: false,
      gopSales: ref([]),
      selected: ref([]),
      bsvData: ref(null),
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
          name: "Gopnikz",
          shortName: "gopnikz",
          emoji: "",
          price: "",
          change: "",
          last30days: "",
          data: gopnikzStore,
        },
      ]),
      tab: ref("goodsAndServices"),
    };
  },
  async mounted() {
    const route = useRoute();

    let itemShortName = route.path.split("/spi/")[1];
    let matchingRowIndex = this.rows.findIndex(
      (o) => o.shortName === itemShortName
    );

    if (matchingRowIndex === -1) {
      matchingRowIndex = this.nftRows.findIndex(
        (o) => o.shortName === itemShortName
      );
      this.selected = [this.nftRows[matchingRowIndex]];
    }

    // NOTE: Hack to show the BSV chart
    console.log(
      "itemShortName",
      itemShortName,
      itemShortName === bsvDataStore.catalog.shortName
    );
    if (itemShortName === bsvDataStore.catalog.shortName) {
      matchingRowIndex = this.currencyRows.findIndex(
        (o) => o.shortName === itemShortName
      );
      this.selected = [this.currencyRows[matchingRowIndex]];
    } else {
      this.selected = [this.rows[matchingRowIndex]];
    }
    // NOTE: Fetch data?
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
    setItemType() {},
    handleRowClick(row) {
      switch (row.emoji) {
        case "🥓":
          this.$router.push({ path: "/spi/bacon" });
          break;

        default:
          break;
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
  font-size: medium;
}
</style>
sett
