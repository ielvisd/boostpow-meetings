
<script>
export default {
  name: 'NFTCard',
  props: {
    nftObject: {
      type: Object,
      required: true,
    },
    nftObjectName: {
      type: String,
      required: true,
    },
    lastSoldNFTObject: {
      type: Object,
    },
    lastSoldImage: {
      type: Boolean,
      default: true,
    },
    nftOrders: {
      type: Object,
      default: () => { }
    },
    numIssued: {
      type: Number,
      default: null,
    },
    fungible: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isVisible: false,
    confirmedPreorders: [],
    preOrderChecked: false,
    preOrdered: false,
  }),

  methods: {
    openRelay(url) {
      // window.open(this.nftObject.link ? this.nftObject.link : 'https://www.relayx.com/1gopniks')
    },
    rankTitle(ranking) {
      switch (this.nftObjectName) {
        case 'gopnik':
        case 'metagop':
          if (ranking >= 1 && ranking <= 30) return 'Exotic'
          if (ranking >= 31 && ranking <= 120) return 'Legendary'
          if (ranking >= 121 && ranking <= 300) return 'Epic'
          if (ranking >= 301 && ranking <= 750) return 'Rare'
          if (ranking >= 751 && ranking <= 1500) return 'Uncommon'
          if (ranking >= 1501 && ranking <= 3000) return 'Common'
          break;
        case 'companion':
          if (ranking >= 1 && ranking <= 7) return 'Exotic'
          if (ranking >= 8 && ranking <= 31) return 'Legendary'
          if (ranking >= 32 && ranking <= 78) return 'Epic'
          if (ranking >= 79 && ranking <= 195) return 'Rare'
          if (ranking >= 196 && ranking <= 390) return 'Uncommon'
          if (ranking >= 391 && ranking <= 777) return 'Common'
          break;
        case 'slavette':
          if (ranking >= 1 && ranking <= 3) return 'Exotic' // 1% - 3
          if (ranking >= 4 && ranking <= 14) return 'Legendary' // 3% - 10
          if (ranking >= 13 && ranking <= 33) return 'Epic' // 6% - 19.98 -> 20
          if (ranking >= 32 && ranking <= 82) return 'Rare' // 15% - 49.95 -> 50
          if (ranking >= 82 && ranking <= 165) return 'Uncommon' // 25% - 83.25 -> 83
          if (ranking >= 166 && ranking <= 333) return 'Common' // 50% - 166.5 -> 167
        default:
          break;
      }
    },
    rankClass(ranking) {
      switch (this.nftObjectName) {
        case 'gopnik':
        case 'metagop':
          if (ranking >= 1 && ranking <= 30) return 'border-6 border-purple-400'
          if (ranking >= 31 && ranking <= 120) return 'border-6 border-yellow-400'
          if (ranking >= 121 && ranking <= 300) return 'border-6 border-red-400'
          if (ranking >= 301 && ranking <= 750) return 'border-6 border-green-400'
          if (ranking >= 751 && ranking <= 1500) return 'border-6 border-blue-400'
          if (ranking >= 1501 && ranking <= 3000) return 'border-6 border-gray-200'
          break;
        case 'companion':
        case 'myCompanions':
          if (ranking >= 1 && ranking <= 7) return 'border-6 border-purple-400'
          if (ranking >= 8 && ranking <= 31) return 'border-6 border-yellow-400'
          if (ranking >= 32 && ranking <= 78) return 'border-6 border-red-400'
          if (ranking >= 79 && ranking <= 195) return 'border-6 border-green-400'
          if (ranking >= 196 && ranking <= 390) return 'border-6 border-blue-400'
          if (ranking >= 391 && ranking <= 777) return 'border-6 border-gray-200'
          break;
        case 'slavette':
          if (ranking >= 1 && ranking <= 3) return 'border-6 border-purple-400' // 1% - 3
          if (ranking >= 4 && ranking <= 14) return 'border-6 border-yellow-400' // 3% - 10
          if (ranking >= 13 && ranking <= 33) return 'border-6 border-red-400'// 6% - 19.98 -> 20
          if (ranking >= 32 && ranking <= 82) return 'border-6 border-green-400'// 15% - 49.95 -> 50
          if (ranking >= 82 && ranking <= 165) return 'border-6 border-blue-400' // 25% - 83.25 -> 83
          if (ranking >= 166 && ranking <= 333) return 'border-6 border-gray-200' // 50% - 166.5 -> 167
        default:
          break;
      }
    },
    metagopTagClass(ranking) {
      if (ranking >= 1 && ranking <= 30) return '!bg-gradient-to-t from-purple-400  to-pink-500'
      if (ranking >= 31 && ranking <= 120) return '!bg-gradient-to-t from-yellow-400  to-pink-500'
      if (ranking >= 121 && ranking <= 300) return '!bg-gradient-to-t from-red-400  to-pink-500'
      if (ranking >= 301 && ranking <= 750) return '!bg-gradient-to-t from-green-400  to-pink-500'
      if (ranking >= 751 && ranking <= 1500) return '!bg-gradient-to-t from-blue-400  to-pink-500'
      if (ranking >= 1501 && ranking <= 3000) return '!bg-gradient-to-t from-gray-200  to-pink-500'
    },
    metagopRankClass(ranking) {
      switch (this.nftObjectName) {
        case 'gopnik':
        case 'metagop':
          if (ranking >= 1 && ranking <= 30) return '!bg-gradient-to-b from-purple-400  to-pink-500'
          if (ranking >= 31 && ranking <= 120) return '!bg-gradient-to-b from-yellow-400  to-pink-500'
          if (ranking >= 121 && ranking <= 300) return '!bg-gradient-to-b from-red-400  to-pink-500'
          if (ranking >= 301 && ranking <= 750) return '!bg-gradient-to-b from-green-400  to-pink-500'
          if (ranking >= 751 && ranking <= 1500) return '!bg-gradient-to-b from-blue-400  to-pink-500'
          if (ranking >= 1501 && ranking <= 3000) return '!bg-gradient-to-b from-gray-200  to-pink-500'
          break;
        case 'companion':
          if (ranking >= 1 && ranking <= 7) return '!bg-gradient-to-b from-purple-400  to-pink-500'
          if (ranking >= 8 && ranking <= 31) return '!bg-gradient-to-b from-yellow-400  to-pink-500'
          if (ranking >= 32 && ranking <= 78) return '!bg-gradient-to-b from-red-400  to-pink-500'
          if (ranking >= 79 && ranking <= 195) return '!bg-gradient-to-b from-green-400  to-pink-500'
          if (ranking >= 196 && ranking <= 390) return '!bg-gradient-to-b from-blue-400  to-pink-500'
          if (ranking >= 391 && ranking <= 777) return '!bg-gradient-to-b from-gray-200  to-pink-500'
          break;
        case 'slavette':
          if (ranking >= 1 && ranking <= 3) return '!bg-gradient-to-b from-purple-400  to-pink-500' // 1% - 3
          if (ranking >= 4 && ranking <= 14) return '!bg-gradient-to-b from-yellow-400  to-pink-500'// 3% - 10
          if (ranking >= 13 && ranking <= 33) return '!bg-gradient-to-b from-red-400  to-pink-500'// 6% - 19.98 -> 20
          if (ranking >= 32 && ranking <= 82) return '!bg-gradient-to-b from-green-400  to-pink-500'// 15% - 49.95 -> 50
          if (ranking >= 82 && ranking <= 165) return '!bg-gradient-to-b from-blue-400  to-pink-500' // 25% - 83.25 -> 83
          if (ranking >= 166 && ranking <= 333) return '!bg-gradient-to-b from-gray-200  to-pink-500' // 50% - 166.5 -> 167
          break;
        default:
          break;
      }
    },
    timeSince(date) {
      const seconds = Math.floor(((new Date().getTime() / 1000) - date))
      let interval = Math.floor(seconds / 31536000)

      if (interval === 1) return `${interval} year ago`

      if (interval > 1) return `${interval} years ago`

      interval = Math.floor(seconds / 2592000)
      if (interval === 1) return `${interval} month ago`

      if (interval > 1) return `${interval} months ago`

      interval = Math.floor(seconds / 86400)
      if (interval === 1) return `${interval} day ago`

      if (interval > 1) return `${interval} days ago`

      interval = Math.floor(seconds / 3600)
      if (interval === 1) return `${interval} hr ago`

      if (interval > 1) return `${interval} hrs ago`

      interval = Math.floor(seconds / 60)
      if (interval === 1) return `${interval} min ago `

      if (interval > 1) return `${interval} mins ago`

      return `${Math.floor(seconds)} sec ago`
    },
    gopPrice(satoshis) {
      return `${satoshis / 100000000} BSV`
    },
    getSoldOutURL(imageURL) {
      if (imageURL === 'soldOut') {
        return new URL('../assets/soldout.svg', import.meta.url).href
      } else {
        return imageURL
      }
    }
  },
}
</script>

<template>
  <div class="antebBold md:max-w-3/13 mx-auto relative h-full flex flex-col justify-center items-center">
    <!-- IMAGE  -->
    <div relative v-if="nftObject.url" class="flex flex-col rounded-3xl" :class="rankClass(nftObject.rank)">
      <div class="w-full rounded-2xl cursor-pointer md:max-h-48vh flex items-center justify-center">
        <img class="w-full rounded-2xl" :src="getSoldOutURL(nftObject.url)"
          @click="openRelay('https://relayx.com/market/gop', '_blank')">
      </div>
      <div :class="metagopRankClass(nftObject.rank)" absolute top-0 right-2 v-if="nftObject.url && nftObject.rank"
        :src="nftObject.url"
        class="cursor-pointer h-auto md:text-lg md:max-h-32vh flex justify-around items-center px-2 font-bold"
        @click="openRelay('https://relayx.com/market/gop', '_blank')">
        <p m-0>#{{ nftObject.rank }}</p>
      </div>

      <div :class="metagopTagClass(nftObject.rank)" v-if="nftObject.metagop"
        class="flex flex-col items-center justify-center  text-center lastContainer absolute bottom-0 left-2 cursor-pointer"
        @click="openRelay('https://relayx.com/market/gop', '_blank')">
        <p class="w-full mx-auto md:text-lg text-black px-2 m-0">
          METAGOP #{{ nftObject.metagop }}
        </p>
      </div>
      <div :class="metagopTagClass(nftObject.rank)" v-if="nftObject.ogGop"
        class="flex flex-col items-center justify-center  text-center lastContainer absolute bottom-0 left-2 cursor-pointer"
        @click="openRelay('https://relayx.com/market/gop', '_blank')">
        <p class="w-full mx-auto md:text-lg text-black px-2 m-0">
          OG GOP #{{ nftObject.ogGop }}
        </p>
      </div>
    </div>

    <!-- RANK  -->
    <div v-else class="w-full h-343px flex justify-center items-center border-2 border-white">
      <p class="mx-auto text-black">
        Loading floor {{ nftObjectName }}...
      </p>
    </div>
    <div v-if="lastSoldNFTObject && lastSoldNFTObject.id && nftObject.id"
      class="flex flex-col items-center justify-center rounded-xl text-center lastContainer absolute !bg-black top-0 right-0 bg-transparent w-7/20 cursor-pointer"
      @click="openRelay('https://relayx.com/market/gop', '_blank')">
      <p class="w-full mx-auto text-sm text-black m-0">
        {{ timeSince(lastSoldNFTObject.changed) }}
      </p>
      <div v-if="lastSoldImage" class="">
        <img :src="lastSoldNFTObject.url" :class="rankClass(lastSoldNFTObject.rank)" class="w-full rounded-xl">
      </div>
      <p class="w-full mx-auto text-sm text-black m-0">
        {{ nftObjectName }} #{{ lastSoldNFTObject.id }}
      </p>
      <p class="w-full mx-auto text-sm text-black m-0">
        {{ gopPrice(lastSoldNFTObject.price) }}
      </p>
    </div>
    <div v-if="lastSoldNFTObject && lastSoldNFTObject.changed && fungible"
      class="lastContainer absolute !bg-black top-0 right-0 bg-transparent w-7/20 cursor-pointer"
      @click="openRelay('https://relayx.com/market/gop', '_blank')">
      <p class="w-full mx-auto text-sm text-black">
        {{ timeSince(lastSoldNFTObject.changed) }}
      </p>
      <p v-if="fungible" class="w-full  text-sm mx-auto text-black">
        {{ lastSoldNFTObject.amount / 1000 }} {{ nftObjectName }} - {{ gopPrice(lastSoldNFTObject.price) }}
      </p>
    </div>

    <div v-if="nftOrders && nftOrders.length"
      class="w-full flex flex-col flex-wrap justify-center items-center mt-2 text-center">

      <div v-if="nftObject.id && !fungible" class="mt-1 flex justify-center items-center">
        <p class="m-0 mx-auto text-lg antebBold text-purple-400 cursor-pointer"
          @click="openRelay('https://relayx.com/market/gop', '_blank')">
          #{{ nftObject.id }}
        </p>
        <p v-if="nftObject.price" class="antebBold m-0 ml-2 mx-auto text-lg text-black cursor-pointer"
          @click="openRelay('https://relayx.com/market/gop', '_blank')">
          {{ gopPrice(nftObject.price) }}
        </p>
        <button v-if="nftObject.price && !fungible"
          class="bg-purple-500 ml-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          @click="$emit('buy', nftObject)">
          Buy
        </button>
      </div>

      <p v-if="nftObject.price && fungible" class="antebBold mx-auto text-lg text-black cursor-pointer"
        @click="openRelay('https://relayx.com/market/gop', '_blank')">
        {{ gopPrice((nftObject.price / nftObject.amount) * 1000) }} - {{ nftObject.amount / 1000 }} {{
            nftObjectName
        }}
      </p>
      <p v-if="nftObject.price && fungible" class="mx-auto text-lg text-black cursor-pointer"
        @click="openRelay('https://relayx.com/market/gop', '_blank')">
        Total Supply: {{ numIssued }}
      </p>
    </div>
    <div v-else-if="nftObject.url && nftOrders && !nftOrders.length"
      class="w-full flex flex-col flex-wrap justify-center items-center mt-2 text-center">
      <p class="mx-auto text-xl font-bold text-black cursor-pointer"
        @click="openRelay('https://relayx.com/market/gop', '_blank')">
        {{ nftObjectName }} sold out
      </p>
      <p class="mx-auto text-lg text-black cursor-pointer"
        @click="openRelay('https://relayx.com/market/gop', '_blank')">
        🚬
      </p>
      <p class="mx-auto text-lg text-black cursor-pointer"
        @click="openRelay('https://relayx.com/market/gop', '_blank')">
        0 / {{ numIssued }} for sale
      </p>
    </div>
    <!-- <div v-if="nftObject.url && nftObject.rank" class="flex items-center justify-center mt-2">
            <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                @click="checkPreorderUsed(nftObject.id)">
                3D Preorder Used?
            </button>
            <p v-if="preOrderChecked" class="mx-auto text-black ml-2 font-bold">
                {{ preOrdered ? 'Yes' : 'No' }}
            </p>
        </div> -->
  </div>
</template>

<style scoped lang="sass">
.maxFifth
    @media (max-width: $breakpoint-xs-max)
        font-size: 20px
</style>
