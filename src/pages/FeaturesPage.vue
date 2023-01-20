<script setup>
import { ref } from 'vue'
</script>

<script>
// TODO: Use Quasar's notification component
// import { useToast } from 'vue-toastification'
import { getAuth, signInAnonymously, signOut } from 'firebase/auth'
import { collection, doc, getDocs, getFirestore, increment, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import FeatureCard from '../components/FeatureCard.vue'

// const toast = useToast()

// NOTE: Scripts
const relayScriptUrl = 'https://one.relayx.io/relayone.js'
const runScriptUrl = 'https://unpkg.com/run-sdk'
const bsvScriptUrl = 'https://unpkg.com/bsv@1.5.6'

// NOTE: Contracts
const gopnikContractId = '1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2'
const preOrderContractId = 'f713af776e1dd115c614819bd22a4aba97eb0f642280c9a6d8a9b9515e45be77_o2'

export default {
  components: {
    FeatureCard
  },
  data() {
    return {
      nftPlazaContributors: [],
      panel: ref('active'),
      nftPlazaContributions: 0,
      slavettes3dContributions: 0,
      slavetteOrderFiltersContributions: 0,
      metagopOrderFiltersContributions: 0,
      goplandiaMultiplayerContributions: 0,
      companionsMintContributions: 8.31,
      companionsFiltersContributions: 0,
      gopTraitCardsContributions: 0,
      gopBagsContributions: 0,
      gopFriendsContributions: 0,
      goptronContributors: ['222@relayx.io', 'ahtiainen@relayx.io', 'annalyn@relayx.io', 'baki@relayx.io', 'bigriz@relayx.io', 'bitcoinassassin@relayx.io', 'bitcommando@relayx.io', 'changuito@relayx.io', 'cuber@relayx.io', 'david1@relayx.io', 'davidno1@relayx.io', 'dougieflush@relayx.io', 'dubby@relayx.io', 'fc2@relayx.io', 'gametight@relayx.io', 'geir@relayx.io', 'gibairdrop@relayx.io', 'handcash@relayx.io', 'hokkaido@relayx.io', 'hondamane@relayx.io', 'iamtman@relayx.io', 'inoue@relayx.io', 'jack1@relayx.io', 'jiujitsio@relayx.io', 'jteck@relayx.io', 'juni@relayx.io', 'kagoshima@relayx.io', 'keita@relayx.io', 'kieu@relayx.io', 'megumi@relayx.io', 'metadesk@relayx.io', 'monkeyc@relayx.io', 'pc@relayx.io', 'portfolio@relayx.io', 'rakuten@relayx.io', 'rxvault@relayx.io', 'sans@relayx.io', 'soundfx2@relayx.io', 'yjsnpi@relayx.io', 'zowie@relayx.io', 'basedbabes@relayx.io', 'bchsv@relayx.io', 'blacksheep@relayx.io', 'crick@relayx.io', 'fronks@relayx.io', 'gopniks@relayx.io', 'ielvis@relayx.io', 'kbvault@relayx.io', 'lexssit@relayx.io', 'minitrue635@relayx.io', 'teammarumaru@relayx.io', 'yaju@relayx.io', 'longlogji@relayx.io', '333@relayx.io', '444@relayx.io', '999@relayx.io', 'alexandy@relayx.io', 'covid420@relayx.io', 'csgo@relayx.io', 'ghfhvfyjblkhhw@relayx.io', 'igorricric@relayx.io', 'longji@relayx.io', 'pihgjfghcjn@relayx.io', 'python@relayx.io', 'stickdoodz@relayx.io', 'ufo@relayx.io', '200@relayx.io', '250@relayx.io', '370@relayx.io', 'bosh@relayx.io', 'claudia@relayx.io', 'creg@relayx.io', 'java@relayx.io', 'jd2122@relayx.io', 'patsbsv@relayx.io', 'qwertypoiuy@relayx.io', 'shitcoin@relayx.io'],
    }
  },
  async created() {
    this.getProjectContributions('1nftmp@relayx.io')
    this.getProjectContributions('1Lexssit@relayx.io')
    this.getProjectContributions('1slavette_order_filters@relayx.io')
    this.getProjectContributions('1goplandia@relayx.io')
    this.getProjectContributions('1companions_filters@relayx.io')
    this.getProjectContributions('1metagop_order_filters@relayx.io')
    this.getProjectContributions('1gop_bags@relayx.io')
    this.getProjectContributions('1gop_trait_cards@relayx.io')
    this.getProjectContributions('1gop_friends@relayx.io')

    this.getProjectContributors('1nftmp@relayx.io')
    this.getProjectContributors('1Lexssit@relayx.io')
    this.getProjectContributors('1slavette_order_filters@relayx.io')
    this.getProjectContributors('1metagop_order_filters@relayx.io')
    this.getProjectContributors('1goplandia@relayx.io')
    this.getProjectContributors('1metadesk@relayx.io')
    this.getProjectContributors('1companionsFiltersContributions@relayx.io')
    this.getProjectContributors('1gop_bags@relayx.io')
    this.getProjectContributors('1gop_trait_cards@relayx.io')
    this.getProjectContributors('1gop_friends@relayx.io')
  },
  methods: {
    goptronContributor(paymail) {
      const exists = this.goptronContributors.includes(paymail)
      return exists
    },
    addContributor(contribution) {
      const hasContributed = this.nftPlazaContributors.some((contributor) => {
        return contributor.paymail === contribution.payment.paymail
      })
      if (!hasContributed)
        this.nftPlazaContributors.push({ paymail: contribution.payment.paymail })

      switch (contribution.walletPaymail) {
        case '1nftmp@relayx.io':
          this.nftPlazaContributions += contribution.payment.amount
          this.nftPlazaContributions = parseFloat(this.nftPlazaContributions.toFixed(2))
          break
        case '1Lexssit@relayx.io':
          this.slavettes3dContributions += contribution.payment.amount
          this.slavettes3dContributions = parseFloat(this.slavettes3dContributions.toFixed(2))
          break
        case '1slavette_order_filters@relayx.io':
          this.slavetteOrderFiltersContributions += contribution.payment.amount
          this.slavetteOrderFiltersContributions = parseFloat(this.slavetteOrderFiltersContributions.toFixed(2))
          break
        case '1metagop_order_filters@relayx.io':
          this.metagopOrderFiltersContributions += contribution.payment.amount
          this.metagopOrderFiltersContributions = parseFloat(this.metagopOrderFiltersContributions.toFixed(2))
          break
        case '1goplandia@relayx.io':
          this.goplandiaMultiplayerContributions += contribution.payment.amount
          this.goplandiaMultiplayerContributions = parseFloat(this.goplandiaMultiplayerContributions.toFixed(2))
          break
        case '1companions_filters@relayx.io':
          this.companionsFiltersContributions += contribution.payment.amount
          this.companionsFiltersContributions = parseFloat(this.companionsFiltersContributions.toFixed(2))
          break
        case '1gop_bags@relayx.io':
          this.gopBagsContributions += contribution.payment.amount
          this.gopBagsContributions = parseFloat(this.gopBagsContributions.toFixed(2))
          break
        case '1gop_trait_cards@relayx.io':
          this.gopTraitCardsContributions += contribution.payment.amount
          this.gopTraitCardsContributions = parseFloat(this.gopTraitCardsContributions.toFixed(2))
          break
        case '1gop_friends@relayx.io':
          this.gopFriendsContributions += contribution.payment.amount
          this.gopFriendsContributions = parseFloat(this.gopFriendsContributions.toFixed(2))
          break
        default:
          break
      }
    },
    async getProjectContributions(projectName) {
      const auth = getAuth()
      signInAnonymously(auth)
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          alert('There was an error fetching contributions. Try again later.')
          // toast.failure('There was an error fetching contributions. Try again later.')
        })
      const db = getFirestore()

      const querySnapshot = await getDocs(collection(db, projectName))
      let total_count = 0
      querySnapshot.forEach((doc) => {
        total_count += Number(doc.data().amount)
      })

      switch (projectName) {
        case '1nftmp@relayx.io':
          this.nftPlazaContributions += total_count
          this.nftPlazaContributions = parseFloat(this.nftPlazaContributions.toFixed(2))
          break
        case '1Lexssit@relayx.io':
          this.slavettes3dContributions += total_count
          this.slavettes3dContributions = parseFloat(this.slavettes3dContributions.toFixed(2))
          break
        case '1slavette_order_filters@relayx.io':
          this.slavetteOrderFiltersContributions += total_count
          this.slavetteOrderFiltersContributions = parseFloat(this.slavetteOrderFiltersContributions.toFixed(2))
          break
        case '1metagop_order_filters@relayx.io':
          this.metagopOrderFiltersContributions += total_count
          this.metagopOrderFiltersContributions = parseFloat(this.metagopOrderFiltersContributions.toFixed(2))
          break
        case '1goplandia@relayx.io':
          this.goplandiaMultiplayerContributions += total_count
          this.goplandiaMultiplayerContributions = parseFloat(this.goplandiaMultiplayerContributions.toFixed(2))
          break
        case '1companions_filters@relayx.io':
          this.companionsFiltersContributions += total_count
          this.companionsFiltersContributions = parseFloat(this.companionsFiltersContributions.toFixed(2))
          break
        case '1gop_bags@relayx.io':
          this.gopBagsContributions += total_count
          this.gopBagsContributions = parseFloat(this.gopBagsContributions.toFixed(2))
          break
        case '1gop_trait_cards@relayx.io':
          this.gopTraitCardsContributions += total_count
          this.gopTraitCardsContributions = parseFloat(this.gopTraitCardsContributions.toFixed(2))
          break
        case '1gop_friends@relayx.io':
          this.gopFriendsContributions += total_count
          this.gopFriendsContributions = parseFloat(this.gopFriendsContributions.toFixed(2))
          break
        default:
          break
      }
    },
    async getProjectContributors(projectName) {

      if (projectName === '1metadesk@relayx.io') {
        this.goptronContributors.forEach((contributor) => {
          if (!this.nftPlazaContributors.includes(contributor))
            this.nftPlazaContributors.push({ paymail: contributor })

        })
      } else {
        const auth = getAuth()
        signInAnonymously(auth)
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            alert('There was an error fetching contributors. Try again later.')
            // toast.failure('There was an error fetching contributors. Try again later.')
          })
        const db = getFirestore()

        const querySnapshot = await getDocs(collection(db, projectName))
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          const docData = doc.data()

          const checkUsername = obj => obj.paymail === docData.paymail

          if (!this.nftPlazaContributors.some(checkUsername))
            this.nftPlazaContributors.push(docData)
        })
      }
    },
    getPaymailImage(paymail) {
      return `https://bitpic.network/u/${paymail}`
    },
  },
}
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center mx-auto py-10 md:max-w-screen-xl">
    <p class="text-2xl md:text-3xl font-extrabold text-purple-400">
      Features
    </p>

    <p class="text-purple-300 w-full md:w-lg mt-2">
      Will build for cigs 🚬🚬🚬
    </p>
    <!-- Features Container -->
    <div class="flex flex-col flex-wrap md:flex-row items-center justify-center text-center mx-auto max-w-screen-xl">
      <!-- <div class="w-full flex flex-col md:flex-row">
        <button>Active</button>
        <button>Completed</button>
      </div> -->

      <div class="flex items-center justify-center bg-#242424 text-purple-300 rounded-xl">
        <div>
          <q-tabs v-model="panel" align="justify" narrow-indicator class="q-mb-lg">
            <q-tab icon="hourglass_full" class="text-purple" name="active" label="Active" />
            <q-tab icon="handshake" class="text-green" name="completed" label="Completed" />
          </q-tabs>

          <div class="q-gutter-y-sm">
            <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders bg-#242424">

              <q-tab-panel flex flex-wrap items-center justify-center name="active">
                <feature-card :completed-steps="nftPlazaContributions" :wallet-paymail="'1nftmp@relayx.io'"
                  :total-steps="42" :diameter="150" :title="'NFT Marketplace'" :icon="'🤝'"
                  :description="'Buy & Sell your RelayX NFTs'"
                  @new-contributor="(contribution) => addContributor(contribution)" />

                <feature-card :completed-steps="slavettes3dContributions" :wallet-paymail="'1Lexssit@relayx.io'"
                  :total-steps="42" :diameter="150" :title="'3D Slavettes'" :icon="'👀'"
                  :description="'Create and airdrop 3d model NFTs of the OG Slavettes'"
                  @new-contributor="(contribution) => addContributor(contribution)" />

                <feature-card :completed-steps="slavetteOrderFiltersContributions"
                  :wallet-paymail="'1slavette_order_filters@relayx.io'" :total-steps="6.9" :diameter="150"
                  :title="'Slavette Order Filters'" :icon="'💃'" :description="'Order filters with traits & rankings'"
                  @new-contributor="(contribution) => addContributor(contribution)" />

                <feature-card :completed-steps="metagopOrderFiltersContributions"
                  :wallet-paymail="'1metagop_order_filters@relayx.io'" :total-steps="6.9" :diameter="150"
                  :title="'Metagop Order Filters'" :icon="'💪'" :description="'Order filters with traits & rankings'"
                  @new-contributor="(contribution) => addContributor(contribution)" />

                <feature-card :completed-steps="goplandiaMultiplayerContributions"
                  :wallet-paymail="'1goplandia@relayx.io'" :total-steps="111" :diameter="150"
                  :title="'Goplandia Multiplayer'" :icon="'🔪 '" :description="'Squatting is more fun together'"
                  @new-contributor="(contribution) => addContributor(contribution)" />
                <feature-card :completed-steps="companionsFiltersContributions"
                  :wallet-paymail="'1companions_filters@relayx.io'" :total-steps="3.50" :diameter="150"
                  :title="'Companions Filters'" :icon="'🦅 '" :description="'Order Filters with traits'"
                  @new-contributor="(contribution) => addContributor(contribution)" />
                <feature-card :completed-steps="gopBagsContributions" :wallet-paymail="'1gop_bags@relayx.io'"
                  :total-steps="3.33" :diameter="150" :title="'Gop Bags'" :icon="'👜 '"
                  description='"My Bag" Page for all Gopnikz collections'
                  @new-contributor="(contribution) => addContributor(contribution)" />
                <feature-card :completed-steps="gopTraitCardsContributions"
                  :wallet-paymail="'1gop_trait_cards@relayx.io'" :total-steps="3.69" :diameter="150"
                  :title="'NFT Detail Page'" :icon="'💅 '" description='NFT Page with trait details/breakdown'
                  @new-contributor="(contribution) => addContributor(contribution)" />
                <feature-card :completed-steps="gopFriendsContributions" :wallet-paymail="'1gop_friends@relayx.io'"
                  :total-steps="4.2" :diameter="150" :title="'Gop Friends Collections'" :icon="'😘 '"
                  description='A page for friendly RelayX collections'
                  @new-contributor="(contribution) => addContributor(contribution)" />
              </q-tab-panel>
              <q-tab-panel flex flex-wrap items-center justify-center name="completed">
                <feature-card :completed-steps="companionsMintContributions" :wallet-paymail="'1metadesk@relayx.io'"
                  :total-steps="7.77" :diameter="150" :title="'Companions Mint'" :icon="'🐻'"
                  :description="'A companion to squat with'"
                  @new-contributor="(contribution) => addContributor(contribution)" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>


      </div>
    </div>
    <p class="text-lg md:text-2xl font-extrabold text-purple-400 mt-4">
      Rewards 🎁
    </p>
    <!-- Features Container -->
    <!-- <div
            class="flex flex-col flex-wrap md:flex-row items-center justify-center text-center mx-auto max-w-screen-xl">
            <div
                class="featureBg flex flex-col md:flex-row w-full md:w-2xl items-center justify-center text-center rounded-4xl mt-4 text-white p-4 mx-2 relative">
                <div class="flex flex-col items-center justify-center text-center text-white md:w-full">
                    <p
                        class="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tighter">
                        GOPTRON X-218
                    </p>
                    <div class="flex flex-col -mt-8">
                        <img src="../assets/goptron.png" class="cursor-pointer h-auto md:max-h-30vh">
                        <p class="text-xl md:text-2xl text-green -mt-8 tracking-tighter font-bold">
                            Supply: 77
                        </p>
                    </div>
                </div>

                <div class="flex flex-col w-full md:w-xl">
                    <p class=" text-white mt-2 mx-4 text-lg md:text-3xl tracking-tighter text-start">
                        This enchanted item is a gift for the first generation of features funders, it's powerful
                        effects will serve
                        you well comrade.
                    </p>
                    <p class="text-white mt-8 mx-4 text-md md:text-lg tracking-tighter text-end">
                        June 22, 2022
                    </p>
                </div>
            </div>
        </div> -->

    <!-- Features Container -->
    <h2 class="text-2xl md:text-3xl font-extrabold text-purple-400 mt-4">
      Contributors
    </h2>
    <div
      class="flex flex-col flex-wrap md:flex-row items-around justify-around text-center mx-auto w-full md:max-w-screen-lg mt-2">
      <div v-for="contributor in nftPlazaContributors" :key="contributor.paymail"
        class="ml-2 text-white text-lg w-1/2 md:w-auto md:text-xl multiselect-tag is-user w-fit flex justify-center items-center border-2 mt-4">
        <img :src="getPaymailImage(contributor.paymail)">
        <p>{{ contributor.paymail }}</p>
        <!-- <img v-if="goptronContributor(contributor.paymail)" src="../assets/goptron.png"
          class="cursor-pointer reward ml-2"> -->
      </div>
    </div>
  </div>

</template>

<style >
@import '../assets/base.css';
</style>

<style scoped>
header {
  line-height: 1.5;
}

.delete-btn {
  padding: 0.5em 1em;
  background-color: #eccfc9;
  color: #c5391a;
  border: 2px solid #ea3f1b;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}

.example {
  background: #ffffff;
  margin: 20px;
  border-color: #e7e7e7;
  padding: 40px;
}

.multiselect-options {
  font-family: Courier, Courier New, Lucida Console, Monaco, Consolas;
  /* background: #000000; */
  color: #812c6c;
  padding: 20px;
  margin-bottom: 20px;
  display: inline-block;
  /* width: 100%; */
  box-sizing: border-box;
  font-size: 16px;
}

.output {
  font-family: Courier, Courier New, Lucida Console, Monaco, Consolas;
  background: #000000;
  color: #812c6c;
  padding: 20px;
  margin-bottom: 20px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
}

.featureBg {
  background-color: rgba(55, 65, 81, 0.5);
  border-radius: 4rem
}

.multiselect-single-label-text {
  font-family: Courier, Courier New, Lucida Console, Monaco, Consolas;
  /* background: #000000; */
  color: #812c6c;
  padding: 20px;
  display: inline-block;
  /* width: 100%; */
  box-sizing: border-box;
  font-size: 16px;
}

.multiselect-tag.is-user {
  padding: 8px 12px;
  border-radius: 22px;
  background: #35495e;
  margin-top: 16px;
}

.multiselect-tag.is-user img {
  width: 48px;
  border-radius: 50%;
  height: 48px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.reward {
  width: 24px !important;
  border-radius: 50%;
  height: 24px !important;
  margin-right: 8px;
  background: lightgreen;
  border: none !important;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;
  ;
}

.user-image {
  margin: 0 6px 0 0;
  border-radius: 50%;
  height: 22px;
}

.character-option-icon {
  margin: 0 6px 0 0;
  height: 22px;
}

.character-label-icon {
  margin: 0 6px 0 0;
  height: 26px;
}
</style>
