import { acceptHMRUpdate, defineStore } from 'pinia'
// import { useMyGopsStore } from '../stores/myGops'
// import { useMyCompanionsStore } from './myCompanions'


export const useRelayUserStore = defineStore({
  id: 'useRelayUserStore',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    loggedIn: false,
    returnUrl: null,
    searchedGopOrders: [],
    searchedGopBag: [],
    loading: false,
    paymail: null,
    gopnikz: [],
    myCompanions: [],
    companionOptions: [],
    gopnikOptions: [],
    preorders: [],
    preorderOptions: [],
    confirmedPreorders: [],
    metagopPreorders: [],
  }),
  actions: {
    toggleLoading() {
      this.loading = !this.loading
    },
    gopUrl(gopBerryTxId) {
      return `https://berry.relayx.com/${gopBerryTxId}`
    },
    getGopnikOptions() {
      this.gopnikOptions = []
      this.gopnikz.forEach((gopnik) => {
        this.gopnikOptions.push({
          value: gopnik.props.no,
          name: `Gopnik # ${gopnik.props.no}`,
          image: this.gopUrl(gopnik.berry.txid),
        })
      })
    },
    getCompanionOptions() {
      this.companionOptions = []
      this.myCompanions.forEach((companion) => {
        this.companionOptions.push({
          value: companion.props.no,
          name: `Companion # ${companion.props.no}`,
          image: this.gopUrl(companion.berry.txid),
        })
      })
    },
    async setJigs(ownerAddress) {
      const gopnikContractId = '1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2'
      const companionsContractId = '880b9e67a2303c08845caa3a11804a0674b293d8d665b9f45938cea3eb216883_o2'
      this.loading = true
      if (!ownerAddress)
        return

      const walletJSON = await fetch(
        `https://staging-backend.relayx.com/api/user/balance2/${ownerAddress}`,
      )
      const response_data = await walletJSON.json()
      const collectibles = response_data.data.collectibles
      const balances = response_data.data.balances
      // TODO: This is going to take a long time with multiple collections. Figure out how to separate these calls per page instead of doing them all at login
      // NOTE: Set OG Gopnikz
      const ogGops = collectibles.filter(
        collectible =>
          collectible.origin
          === gopnikContractId,
      )
      this.gopnikz = ogGops.sort((a, b) => (a.props.no > b.props.no) ? 1 : -1)
      this.getGopnikOptions()

      // NOTE: Set Companions
      // const companions = collectibles.filter(
      //     collectible =>
      //         collectible.origin
      //         === companionsContractId,
      // )
      // this.myCompanions = companions.sort((a, b) => (a.props.no > b.props.no) ? 1 : -1)
      // this.getCompanionOptions()

      this.loading = false
    },
    async getRunOwner() {
      const ownerResponse = await relayone.alpha.run.getOwner()
      const run = new Run({
        wallet: {
          ...relayone.alpha.run,
          owner() {
            return ownerResponse
          },
        },
      })
      localStorage.setItem('owner', ownerResponse)
      this.setJigs(ownerResponse)
    },
    async login() {
      // const myGopsStore = useMyGopsStore()
      // const myCompanionsStore = useMyCompanionsStore()
      this.loading = true
      const token = await relayone.authBeta()
      const [payload, singature] = token.split('.')
      const data = JSON.parse(atob(payload))
      localStorage.setItem('paymail', data.paymail)
      this.paymail = data.paymail
      this.loggedIn = true
      await this.getRunOwner()
      // TODO: This is going to take a long time with multiple collections. Figure out how to separate these calls per page instead of doing them all at login
      // myGopsStore.findGops()
      // myCompanionsStore.findGops()
    },
    logout() {
      this.loading = true
      localStorage.removeItem('paymail')
      this.paymail = null
      this.loggedIn = false
      // relayone.logout()
      localStorage.removeItem('https://one.relayx.io/')
      // redirect to previous url or default to home page
      // useRouter(this.returnUrl || '/')
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRelayUserStore, import.meta.hot))
