import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import axios from 'redaxios'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import gql from 'graphql-tag'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://staging-backend.relayx.com/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

provideApolloClient(apolloClient)

const gopUrl = (gopBerryTxId) => {
  return `https://berry.relayx.com/${gopBerryTxId}`
}

const gopLink = (gopLocation) => {
  return `https://relayx.com/market/GOP/${gopLocation}`
}

const soldOutLink = () => {
  return `https://relayx.com/market/289dda12817938d4fb7f173f14cb8843016d7d76eeadaea457d76d2f675384ff_o2`
}

const gopCollectionLocation = ref('1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2')

const gopOrderURL = 'https://staging-backend.relayx.com/api/market/GOP/orders'
const gopItemsURL = 'https://staging-backend.relayx.com/api/market/GOP/items'

export const useGopnikzStore = defineStore({
  id: 'useGopnikzStore',
  state: () => ({
    allGopItems: [],
    catalog: {
      "item": "Gasoline, unleaded regular, per gallon",
      "area": "U.S. city average",
      "shortName": 'gasoline-unleaded',
      "emoji": '⛽'
    },
    allItems: [],
    allItemsPage: 1,
    gopSales: [],
    hasSearched: false,
    loading: false,
    orders: null,
    searchedAllItems: [],
    searchedGopOrders: [],
    sortedAllItems: [],
    sortedGopOrders: [],
  }),
  getters: {
    paginatedData: (state) => state.sortedGopOrders.slice(0, state.page * state.perPage),
    paginatedAllItemsData: (state) => state.sortedAllItems.slice(0 * state.perPage, state.allItemsPage * state.perPage)
  },
  actions: {
    // // Get & sort gop orders by price
    async getAndSortGops() {
      this.loading = true

      await axios.get(gopOrderURL).then(response => (
        this.orders = response.data.data.orders.sort((a, b) => (a.satoshis > b.satoshis) ? 1 : -1)
      ))


      this.loading = false
    },
    async getGopSales() {
      const { result } = useQuery(gql`
        query Activity {
          activity(market: "1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2") {
            status, changed, amount, satoshis
            jig {
              location,
              name,
              image,
              ... on NFT {
                    no
              }
            }
          }
        }
      `)

      watch(result, (value) => {
        this.gopSales = value.activity
      })
    },
    async fetchAllItems() {
      this.loading = true

      await axios.get(gopItemsURL).then(response => (
        this.allItems = response.data.data.items.sort((a, b) => (a.props.satoshis > b.props.satoshis) ? 1 : -1)
      ))

      this.loading = false
    },
    toggleLoading() {
      this.loading = !this.loading
    },
    async findAndSortAllItems() {
      this.loading = true

      setTimeout(async () => {
        await this.findAndSortAllItems2()
      }, 250)
    },

    async findAndSortAllItems2() {
      this.searchedAllItems = []
      if (this.allItems) {
        for (let index = 0; index < this.allItems.length; index++) {
          const gopOrder = this.allItems[index]
          this.searchedAllItems.push({
            price: gopOrder.satoshis ? gopOrder.satoshis : null,
            url: gopUrl(gopOrder.berry.txid),
            link: gopLink(gopOrder.location),
            location: gopCollectionLocation,
            txid: gopOrder.txid,
          })
        }
        this.loading = false

        // set sold out image if no results
        if (!this.searchedAllItems.length) {
          this.searchedAllItems.push({
            url: 'soldOut',
            link: soldOutLink(),
          })
          this.sortedAllItems = [...this.searchedAllItems]
        }

        await this.setSort()
      }
    },
    async findGops() {
      this.loading = true

      setTimeout(async () => {
        await this.findGops2()
      }, 250)
    },
    setSortToExotic() {
      this.sortOption = ['Rank Exotic to Common']
    },
    findGops2() {
      this.searchedGopOrders = []

      if (this.orders) {

        for (let index = 0; index < this.orders.length; index++) {
          const gopOrder = this.orders[index]
          this.searchedGopOrders.push({
            price: gopOrder.satoshis,
            url: gopUrl(gopOrder.berry.txid),
            link: gopLink(gopOrder.location),
            location: gopCollectionLocation,
            txid: gopOrder.txid,
          })
        }
        this.loading = false

        // set sold out image if no results
        if (!this.searchedGopOrders.length) {
          this.searchedGopOrders.push({
            url: 'soldOut',
            link: soldOutLink(),
          })
          this.sortedGopOrders = [...this.searchedGopOrders]
        }

        this.setSort()
      }
    },
    setSort() {
      this.sortedGopOrders = [...this.searchedGopOrders].sort((a, b) => (a.satoshis > b.satoshis) ? -1 : 1)
      this.sortedAllItems = [...this.searchedAllItems].sort((a, b) => (a.price > b.price) ? 1 : -1)

      if (this.minPrice && !this.maxPrice) {
        const filteredOrders = this.sortedGopOrders.filter(order => order.price / 100000000 >= this.minPrice)
        this.sortedGopOrders = [...filteredOrders]
      }
      else if (!this.minPrice && this.maxPrice) {
        const filteredOrders = this.sortedGopOrders.filter(order => order.price / 100000000 <= this.maxPrice)
        this.sortedGopOrders = [...filteredOrders]
      }
      else if (this.minPrice && this.maxPrice) {
        const filteredOrders = this.sortedGopOrders.filter(order => order.price / 100000000 >= this.minPrice && order.price / 100000000 <= this.maxPrice)
        this.sortedGopOrders = [...filteredOrders]
      }

      if (!this.sortedGopOrders.length) {
        this.sortedGopOrders.push({
          url: '/src/assets/soldout.svg',
          link: soldOutLink(),
        })
      }
    }
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGopnikzStore, import.meta.hot))
