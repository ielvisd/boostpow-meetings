<script setup>
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { onMounted, ref } from 'vue'
import { provideApolloClient } from '@vue/apollo-composable'
import { useMyCompanionsStore } from '../../stores/myCompanions.js'
import { useRelayUserStore } from '../../stores/relayUser.js'
import axios from 'redaxios'
import CollectionTabs from '../../components/CollectionTabs.vue'
import GopnikzFilters from '../../components/GopnikzFilters.vue'
import NFTCard from '../../components/NFTCard.vue'

const relayUserStore = useRelayUserStore()
const myCompanionsStore = useMyCompanionsStore()

onMounted(async () => {
    // await relayUserStore.getAndSortGops()
    // await myCompanionsStore.findGops()
})

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

const buyItem = async (gopLocation) => {
    const ownerResponse = await relayone.alpha.run.getOwner()

    const run = new Run({
        wallet: {
            ...relayone.alpha.run,
            owner() {
                return ownerResponse
            },
        },
    })
    try {
        const response = await axios.post('https://staging-backend.relayx.com/api/dex/buy', {
            address: ownerResponse,
            location: gopLocation.location,
            txid: gopLocation.txid,
        })
        const sendResponse = await window.relayone.send(response.data.data.rawtx)
        window.location.reload()
    }
    catch (err) {
        // this.error = err
        alert(err)
    }
}

</script>

<template>
    <div class="mx-auto h-auto min-h-full px-8 bg-black mt-0">
        <CollectionTabs parentPage="my-bag" />
        <div class="flex flex-col md:flex-row items-start justify-center mt-8">
            <GopnikzFilters collection="companions" :showPriceRange="false" :showTraits="false"
                :showCompanionTraits="true" />
            <div
                class="mt-8 md:mt-0 flex w-full md:w-5/7  flex-col md:flex-row md:flex-row md:flex-wrap no-wrap justify-center items-center md:items-start w-full">
                <button v-if="!relayUserStore.paymail"
                    class="mx-auto text-lg bg-purple-400 my-2 text-black rounded-xl px-2 py-1 font-bold uppercase cursor-pointer"
                    @click="handleAuthClick()">
                    {{ relayUserStore && relayUserStore.paymail ? 'Logout' : 'Login to Continue' }}
                </button>
                <p v-if="relayUserStore.loading || myCompanionsStore.loading" class="mx-auto text-yellow-100">
                    Loading, please wait...
                </p>
                <div v-if="relayUserStore.gopnikOptions && !relayUserStore.loading"
                    class="flex flex-col md:flex-row flex-wrap mb-8 mx-auto h-full">
                    <NFT-Card min-w-280px mb-8 v-for="companion in myCompanionsStore.paginatedData" :key="companion.id"
                        :nft-object="companion" nft-object-name="companion" />
                </div>
                <div v-if="myCompanionsStore.sortedGopOrders.length && !myCompanionsStore.loading" flex justify-center
                    items-center>
                    <button
                        class=" ml-auto antebBold text-xs bg-purple-400 my-2 text-black rounded-xl px-2 py-1 font-bold uppercase cursor-pointer"
                        @click="myCompanionsStore.backPage()">prev</button>
                    <button
                        class=" ml-auto antebBold text-xs bg-purple-400 my-2 text-black rounded-xl px-2 py-1 font-bold uppercase cursor-pointer"
                        @click="myCompanionsStore.nextPage()">next</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "MyCompanions",
    components: {
        NFTCard, CollectionTabs
    },
    computed: {
        inlineStyle() {
            return {
                backgroundImage: `url(${require('../assets/images/goplandiaBg.webp')})`
            };
        }
    },
    data() {
        const relayUserStore = useRelayUserStore()

        return {
            backgroundImage: 'goplandaBg.png',
            relayUserStore
        }
    },
    methods: {
        async handleAuthClick() {
            const relayUserStore = useRelayUserStore()

            if (relayUserStore.paymail)
                relayUserStore.logout()
            else
                await relayUserStore.login()
        },
    },
});
</script>


<style src="@vueform/multiselect/themes/default.css">
</style>

<style scoped>
.bgLogo {
    background-image: url("../assets/gopniklogo.png");
    background-size: 125% auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}

.multiselect-options {
    font-family: Courier, Courier New, Lucida Console, Monaco, Consolas;
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

.multiselect-theme {
    --ms-bg: #242424;
    --ms-tag-bg: #bd83af;
    --ms-tag-color: #812c6c;
}

.multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #35495e;
    margin: 3px 3px 8px;
}

.multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
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