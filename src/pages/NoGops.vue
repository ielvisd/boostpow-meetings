<script setup>
import { onMounted, ref } from "vue";
onMounted(async () => {
  // if (!gopnikzFiltersStore.hasSearched) {
  //   await gopnikzFiltersStore.getAndSortGops()
  //   await gopnikzFiltersStore.findGops()
  // }
  // gopnikzFiltersStore.hasSearched = true
});
</script>

<script>
import NFTCard from "../components/NFTCard.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    // NFTCard
  },
};
</script>

<template>
  <div
    class="flex flex-col px-8 md:flex-row text-left items-center justify-center md:justify-between mx-auto py-10 w-full md:w-4xl"
  >
    <div
      class="flex flex-col items-centerl justify-center w-full md:w-1/2 px-4"
    >
      <p class="text-lg md:text-2xl text-black text-center w-full antebBold">
        Sponsor us 🙁❓
      </p>

      <p class="text-black w-full mt-2 md:text-lg">
        🛑 Only owners of the BoostPOW Daily meetingss NFT, a current item's
        monthly sponsorship NFT or of an OG Gopnik may proceed past this point.
        Having one of these NFTs in your wallet gets you advanced features,
        stats, sponsorship credit and drops from future collaborations. Have you
        logged in?
      </p>

      <p class="text-black w-full mt-2 md:text-lg">
        3 ways to access advanced features/pages:
      </p>
      BoostPOW Daily meetingss
      <div fBoostPOW Daily meetingsscenter justify-center md:text-lg>
        <p class="text-black w-full ml-4 antebBold">
          - BoostPOW Daily meetingss NFT:
          <aBoostPOW Daily meetingss
            target="_blank"
            BoostPOW Daily meetingssx.com/market/1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2"
          >
            BoostPOW Daily meetingss NFT Market Page</a
          >
        </p>
        <p class="text-black w-full ml-4 antebBold">
          - BoostPOW Daily meetingss Monthly Item Sponsorship NFT:
          <a
            target="_blank"
            href="https://relayx.com/market/1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2"
          >
            BoostPOW Daily meetingss NFT Monthly Item NFT Market Page</a
          >
        </p>
        <p class="antebBold text-black w-full ml-4 antebBold">
          - This is what a random Gopnik looks like, or you can browse the
          collection here:
          <a
            target="_blank"
            href="https://relayx.com/market/1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2"
          >
            RelayX Gopnikz Market Page</a
          >
        </p>
      </div>
    </div>

    <!-- <div class="full !md:max-w-2/5 mx-4 flex flex-col justify-center items-center mt-4">
      <p class="antebBold m-0 text-xl md:text-2xl font-bold text-black  !h-full m-0">Random Gopnik</p>
      <NFT-Card class="full !max-w-full !mt-2 md:mt-0" v-if="gopnikzFiltersStore.sortedGopOrders.length"
        :key="gopnikzFiltersStore.sortedGopOrders[0].id" :nft-object="gopnikzFiltersStore.sortedGopOrders[0]"
        :nft-orders="gopnikzFiltersStore.orders"
        :num-issued="gopnikzFiltersStore.orders && gopnikzFiltersStore.orders.length ? gopnikzFiltersStore.orders.length : 0"
        nft-object-name="gopnik" @buy="(item) => buyItem(item, true, 0)" />
      <p v-else class="text-md md:text-lg font-bold text-black  !h-full mt-12">Looking for a Gopnik, please
        wait... </p>
    </div> -->
  </div>
</template>

<style>
/* @import '../assets/base.css'; */
</style>

<style scoped></style>
