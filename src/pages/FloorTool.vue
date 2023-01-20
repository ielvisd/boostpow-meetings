<script setup lang="ts">
import axios from 'redaxios'
// TODO: Use unplugin to not have to do this anymore
import { onMounted, ref, reactive, watch } from 'vue'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { useGopStore } from '../stores/gops.js'
import { useSlavetteDataStore } from 'src/stores/slavetteData.js'
const { slavettes } = useSlavetteDataStore()
const { gops } = useGopStore()

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

const numBorisIssued = ref(746)
const numChadIssued = ref(797)
const numIgorIssued = ref(768)
const numVladIssued = ref(689)

const gopTypes = ref(['BORIS', 'CHAD', 'IGOR', 'VLAD'])
const gopSalesTypes = ref(['BORIS', 'CHAD', 'IGOR', 'VLAD'])

// NOTE: OG GOP Orders & Sales
const gopCollectionLocation = ref('1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2')
const gopOrderURL = 'https://staging-backend.relayx.com/api/market/1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2/orders'
const orders = ref(null)
const gopSales = ref([])
const borisOrders = ref([])
const chadOrders = ref([])
const igorOrders = ref([])
const vladOrders = ref([])
const boris = reactive({})
const lastSoldBoris = reactive({})
const chad = reactive({})
const lastSoldChad = reactive({})
const igor = reactive({})
const lastSoldIgor = reactive({})
const vlad = reactive({})
const lastSoldVlad = reactive({})

// NOTE: Goplandia Munitions Orders & Sales
const goplandiaMunitionsCollectionLocation = ref('ec5ed161a628a9985c41fa5d90a881cc547ab071c45a038c88b326669378cf54_o2')
const fblOrderUrl = 'https://staging-backend.relayx.com/api/market/ec5ed161a628a9985c41fa5d90a881cc547ab071c45a038c88b326669378cf54_o2/orders'
const fblOrders = ref([])
const fbl = reactive({})
const lastSoldFBL = reactive({})
const fblSales = ref([])

const goptronOrders = ref([])
const goptron = reactive({})
const lastSoldGoptron = reactive({})
const goptronSales = ref([])

// NOTE: METAGOP Orders & Sales
const metagopCollectionLocation = 'd0f9aa922a05ce5a4c4cf57342774826eefd62f82473062f16b65de1a2cfc3d9_o2'
const metagopURL = 'https://staging-backend.relayx.com/api/market/d0f9aa922a05ce5a4c4cf57342774826eefd62f82473062f16b65de1a2cfc3d9_o2/orders'
const metagopOrders = ref([])
const metagop = reactive({})
const lastSoldMetagop = reactive({})
const metagopSales = ref([])

// NOTE: Slavette Orders & Sales
const slavetteCollectionLocation = ref('84769a5ac4cec62270093648c9978016640aeccb62c11b717313d41a4c74640c_o2')
const slavetteOrderURL = 'https://staging-backend.relayx.com/api/market/84769a5ac4cec62270093648c9978016640aeccb62c11b717313d41a4c74640c_o2/orders'
const slavetteOrders = ref(null)
const slavetteSales = ref([])
const slavette = reactive({})
const lastSoldSlavette = reactive({})

// NOTE: Genesis Orders & Sales
const genesisCollectionLocation = ref('c859ac6d6378e872757a86f25d43cad442b72d915288c3c2d10a6d6632a871a5_o2')
const genesisOrderURL = 'https://staging-backend.relayx.com/api/market/c859ac6d6378e872757a86f25d43cad442b72d915288c3c2d10a6d6632a871a5_o2/orders'
const genesisOrders = ref([])
const genesisSales = ref([])
const genesisGop = reactive({})
const lastSoldGenesis = reactive({})

// NOTE: Rug Orders & Sales
const rugCollectionLocation = ref('99658f360f9a5f5ce70f6100b1ffbea1fc385a4f44e156f1c1e4fd5e6d1d6232_o2')
const rugOrderUrl = 'https://staging-backend.relayx.com/api/market/99658f360f9a5f5ce70f6100b1ffbea1fc385a4f44e156f1c1e4fd5e6d1d6232_o2/orders'
const rugOrders = ref([])
const rugSales = ref([])
const rug = reactive({})
const lastRugSold = reactive({})
const radioactiveRugCollectionLocation = ref('a2feebf63bf84ed28945372a4b2ed43ce84dcd0df312bf4c1308b0bca574e11f_o2')
const radioactiveRugOrderUrl = 'https://staging-backend.relayx.com/api/market/a2feebf63bf84ed28945372a4b2ed43ce84dcd0df312bf4c1308b0bca574e11f_o2/orders'
const radioactiveRug = reactive({})
const lastRadioactiveRugSold = reactive({})
const radioactiveRugOrders = ref([])
const radioactiveRugSales = ref([])
const goldenRugCollectionLocation = ref('54e23ac33b311538f3b07a3579c83cab1fb5effa6e13f8f14408849515f6f3fc_o2')
const goldenRugOrderUrl = 'https://staging-backend.relayx.com/api/market/54e23ac33b311538f3b07a3579c83cab1fb5effa6e13f8f14408849515f6f3fc_o2/orders'
const goldenRugOrders = ref([])
const goldenRugSales = ref([])
const goldenRug = reactive({})
const lastGoldenRugSold = reactive({})

// NOTE: Cig Orders & Sales
const cigOrderURL = ' https://staging-backend.relayx.com/api/market/c8c3771f07da180ab76ba2f4a273c3298f1584ad1bcde1e04e0926174e3e432b_o2/orders'
const cigOrders = ref([])
const cigSales = ref([])
const cig = reactive({})
const lastCigSold = reactive({})

// NOTE: Egg Orders & Sales
const eggCollectionLocation = 'ae25cb3651f159df90941110f02c4cf09072b8cce2ad12e7bc1555fedd76b489_o2'
const eggOrderURL = 'https://staging-backend.relayx.com/api/market/ae25cb3651f159df90941110f02c4cf09072b8cce2ad12e7bc1555fedd76b489_o2/orders'
const eggOrders = ref([])
const eggSales = ref([])
const egg = reactive({})
const lastEggSold = reactive({})

const gopUrl = (gopBerryTxId) => {
    return `https://berry.relayx.com/${gopBerryTxId}`
}

const gopLink = (gopLocation) => {
    return `https://relayx.com/market/GOP/${gopLocation}`
}

const slavetteLink = (slavetteLocation) => {
    return `https://relayx.com/market/84769a5ac4cec62270093648c9978016640aeccb62c11b717313d41a4c74640c_o2/${slavetteLocation}`
}

const genesisLink = (genesisLocation) => {
    return `https://relayx.com/market/c859ac6d6378e872757a86f25d43cad442b72d915288c3c2d10a6d6632a871a5_o2/${genesisLocation}`
}

const metagopLink = (genesisLocation) => {
    return `https://relayx.com/market/c859ac6d6378e872757a86f25d43cad442b72d915288c3c2d10a6d6632a871a5_o2/${genesisLocation}`
}

const fblLink = (genesisLocation) => {
    return `https://relayx.com/market/c859ac6d6378e872757a86f25d43cad442b72d915288c3c2d10a6d6632a871a5_o2/${genesisLocation}`
}

const rugLink = (rugLocation) => {
    return `https://relayx.com/market/99658f360f9a5f5ce70f6100b1ffbea1fc385a4f44e156f1c1e4fd5e6d1d6232_o2/${rugLocation}`
}

const radioactiveRugLink = (rugLocation) => {
    return `https://relayx.com/market/a2feebf63bf84ed28945372a4b2ed43ce84dcd0df312bf4c1308b0bca574e11f_o2/${rugLocation}`
}

const goldenRugLink = (rugLocation) => {
    return `https://relayx.com/market/54e23ac33b311538f3b07a3579c83cab1fb5effa6e13f8f14408849515f6f3fc_o2/${rugLocation}`
}

const eggLink = (eggLocation) => {
    return `https://relayx.com/market/ae25cb3651f159df90941110f02c4cf09072b8cce2ad12e7bc1555fedd76b489_o2/${eggLocation}`
}

const setGopData = (currentGopType, currentGop, gopOrder) => {
    switch (currentGopType) {
        case 'BORIS':
            boris.background = currentGop.Background
            boris.face = currentGop.Face
            boris.faceElement = currentGop['Face Element']
            boris.hands = currentGop.Hands
            boris.head = currentGop.Head
            boris.pants = currentGop.Pants
            boris.sunglasses = currentGop.Sunglasses
            boris.upperBody = currentGop.Upperbody
            boris.id = currentGop.id
            boris.price = gopOrder.satoshis
            boris.url = gopUrl(gopOrder.berry.txid)
            boris.link = gopLink(gopOrder.location)
            boris.location = gopCollectionLocation
            boris.name = 'Boris'
            boris.rank = currentGop.rank
            boris.txid = gopOrder.txid
            boris.metagop = currentGop.metagop
            break
        case 'CHAD':
            chad.background = currentGop.Background
            chad.face = currentGop.Face
            chad.faceElement = currentGop['Face Element']
            chad.hands = currentGop.Hands
            chad.head = currentGop.Head
            chad.pants = currentGop.Pants
            chad.sunglasses = currentGop.Sunglasses
            chad.upperBody = currentGop.Upperbody
            chad.id = currentGop.id
            chad.price = gopOrder.satoshis
            chad.url = gopUrl(gopOrder.berry.txid)
            chad.link = gopLink(gopOrder.location)
            chad.name = 'Chad'
            chad.rank = currentGop.rank
            chad.location = gopCollectionLocation
            chad.txid = gopOrder.txid
            chad.metagop = currentGop.metagop
            break
        case 'IGOR':
            igor.background = currentGop.Background
            igor.face = currentGop.Face
            igor.faceElement = currentGop['Face Element']
            igor.hands = currentGop.Hands
            igor.head = currentGop.Head
            igor.pants = currentGop.Pants
            igor.sunglasses = currentGop.Sunglasses
            igor.upperBody = currentGop.Upperbody
            igor.id = currentGop.id
            igor.price = gopOrder.satoshis
            igor.url = gopUrl(gopOrder.berry.txid)
            igor.link = gopLink(gopOrder.location)
            igor.name = 'Igor'
            igor.rank = currentGop.rank
            igor.location = gopCollectionLocation
            igor.txid = gopOrder.txid
            igor.metagop = currentGop.metagop
            break
        case 'VLAD':
            vlad.background = currentGop.Background
            vlad.face = currentGop.Face
            vlad.faceElement = currentGop['Face Element']
            vlad.hands = currentGop.Hands
            vlad.head = currentGop.Head
            vlad.pants = currentGop.Pants
            vlad.sunglasses = currentGop.Sunglasses
            vlad.upperBody = currentGop.Upperbody
            vlad.id = currentGop.id
            vlad.price = gopOrder.satoshis
            vlad.url = gopUrl(gopOrder.berry.txid)
            vlad.link = gopLink(gopOrder.location)
            vlad.name = 'Vlad'
            vlad.rank = currentGop.rank
            vlad.location = gopCollectionLocation
            vlad.txid = gopOrder.txid
            vlad.metagop = currentGop.metagop
            break
    }
}

const setGopOrderData = (currentGopType, currentGop, gopOrder) => {
    switch (currentGopType) {
        case 'BORIS':
            borisOrders.value.push(gopOrder)
            break
        case 'CHAD':
            chadOrders.value.push(gopOrder)
            break
        case 'IGOR':
            igorOrders.value.push(gopOrder)
            break
        case 'VLAD':
            vladOrders.value.push(gopOrder)
            break
    }
}

const setGopSoldOutImage = (currentGopType) => {
    switch (currentGopType) {
        case 'BORIS':
            boris.url = '/soldout.svg'
            break
        case 'CHAD':
            chad.url = '/soldout.svg'
            break
        case 'IGOR':
            igor.url = '/soldout.svg'
            break
        case 'VLAD':
            vlad.url = '/soldout.svg'
            break
    }
}

const setGenesisSoldOutImage = () => {
    genesisGop.url = '/soldout.svg'
}

const setMetagopSoldOutImage = () => {
    metagop.url = '/soldout.svg'
}

const setFBLSoldOutImage = () => {
    fbl.url = '/soldout.svg'
}

const setGoptronSoldOutImage = () => {
    goptron.url = '/soldout.svg'
}

const setSlavetteSoldOutImage = () => {
    slavette.url = '/soldout.svg'
}

const setRugSoldOutImage = () => {
    rug.url = '/soldout.svg'
}

const setRadioactiveRugSoldOutImage = () => {
    radioactiveRug.url = '/soldout.svg'
}

const setGoldenRugSoldOutImage = () => {
    goldenRug.url = '/soldout.svg'
}

const setCigSoldOutImage = () => {
    cig.url = '/soldout.svg'
}

const setEggSoldOutImage = () => {
    egg.url = '/soldout.svg'
}

const findFloorGops = (newOrders) => {
    // Exit if all gop types have been checked
    const gopStore = useGopStore
    let gopTypeIndex = null

    for (let index = 0; index < orders.value.length; index++) {
        const gopOrder = orders.value[index]

        // Check which Gopnik it is
        const result = gops.filter((gopObject) => {
            return gopObject.id === gopOrder.props.no
        })
        const currentGop = JSON.parse(JSON.stringify(result))[0]
        const currentGopType = currentGop.Face.split(' ')[0]

        // Exit if all gop types have been checked
        let gopTypeIndex = null

        // If it's in the Gop list, update the gop data & remove it from the list
        for (let i = 0; i < gopTypes.value.length; i++) {
            if (gopTypes.value.length === 0)
                break

            if (gopTypes.value[i].match(currentGopType)) {
                gopTypeIndex = i
                setGopData(currentGopType, currentGop, gopOrder)
                gopTypes.value.splice(gopTypeIndex, 1)
                i--
            }
        }

        setGopOrderData(currentGopType, currentGop, gopOrder)

        // Check it there are any gops that are sold out
    }
    if (gopTypes.value.length) {
        for (let i = 0; i < gopTypes.value.length; i++) {
            gopTypeIndex = i
            setGopSoldOutImage(gopTypes.value[i])
            gopTypes.value.splice(i, 1)
            i--// decrement index if item is removed
        }
    }
}

const findLastGopSales = () => {
    const gopStore = useGopStore
    for (let index = 0; index < gopSales.value.length; index++) {
        const gopSale = gopSales.value[index]

        // Check which Gopnik it is
        const result = gops.filter((gopObject) => {
            return gopObject.id === gopSale.jig.no
        })
        const currentGop = JSON.parse(JSON.stringify(result))[0]
        const currentGopType = currentGop.Face.split(' ')[0]

        // Exit if all gop types have been checked
        let gopTypeIndex = null
        // if (gopSalesTypes.value.length === 0)
        //   break

        // If it's in the Gop list, update the gop data & remove it from the list
        for (let i = 0; i < gopSalesTypes.value.length; i++) {
            if (gopSalesTypes.value[i].match(currentGopType)) {
                gopTypeIndex = i
                setGopSaleData(currentGopType, currentGop, gopSale)
                gopSalesTypes.value.splice(gopTypeIndex, 1)
                i--
            }
        }
    }
}

const setSlavetteData = (slavetteOrder) => {
    slavette.id = slavetteOrder.props.no
    slavette.price = slavetteOrder.satoshis
    slavette.url = gopUrl(slavetteOrder.berry.txid)
    slavette.txid = slavetteOrder.txid
    slavette.location = slavetteCollectionLocation

    // Check which Slavette it is
    const currentSlavette = slavettes.filter((slavetteObject) => {
        return slavetteObject.id === slavetteOrder.props.no
    })
    slavette.rank = currentSlavette[0].rank
}

const setRugData = (rugOrder) => {
    rug.id = rugOrder.props.no
    rug.price = rugOrder.satoshis
    rug.url = gopUrl('99658f360f9a5f5ce70f6100b1ffbea1fc385a4f44e156f1c1e4fd5e6d1d6232_o1')
    rug.link = rugLink(rugOrder.location)
    rug.txid = rugOrder.txid
    rug.location = rugCollectionLocation
}

const setRadioactiveRugData = (rugOrder) => {
    radioactiveRug.id = rugOrder.props.no
    radioactiveRug.price = rugOrder.satoshis
    radioactiveRug.url = gopUrl('a2feebf63bf84ed28945372a4b2ed43ce84dcd0df312bf4c1308b0bca574e11f_o1')
    radioactiveRug.link = radioactiveRugLink(rugOrder.location)
    radioactiveRug.txid = rugOrder.txid
    radioactiveRug.location = radioactiveRugCollectionLocation
}

const setGoldenRugData = (rugOrder) => {
    goldenRug.id = rugOrder.props.no
    goldenRug.price = rugOrder.satoshis
    goldenRug.url = gopUrl('54e23ac33b311538f3b07a3579c83cab1fb5effa6e13f8f14408849515f6f3fc_o1')
    goldenRug.link = goldenRugLink(rugOrder.location)
    goldenRug.txid = rugOrder.txid
    goldenRug.location = goldenRugCollectionLocation
}

const setCigData = (cigOrder) => {
    cig.amount = cigOrder.size
    cig.id = cigOrder.props.no
    cig.price = cigOrder.satoshis
    cig.url = gopUrl('c8c3771f07da180ab76ba2f4a273c3298f1584ad1bcde1e04e0926174e3e432b_o1')
}

const setEggData = (eggOrder) => {
    egg.id = eggOrder.props.no
    egg.price = eggOrder.satoshis
    egg.url = gopUrl('ae25cb3651f159df90941110f02c4cf09072b8cce2ad12e7bc1555fedd76b489_o1')
    egg.link = eggLink(eggOrder.location)
    egg.txid = eggOrder.txid
    egg.location = eggCollectionLocation
}

const setRugSalesData = (rugSale) => {
    lastRugSold.id = rugSale.jig.no
    lastRugSold.price = rugSale.satoshis
    lastRugSold.url = gopUrl(rugSale.jig.image)
    lastRugSold.changed = rugSale.changed
}

const setRadioactiveRugSalesData = (radioactiveRugSale) => {
    lastRadioactiveRugSold.id = radioactiveRugSale.jig.no
    lastRadioactiveRugSold.price = radioactiveRugSale.satoshis
    lastRadioactiveRugSold.url = gopUrl(radioactiveRugSale.jig.image)
    lastRadioactiveRugSold.changed = radioactiveRugSale.changed
}

const setGoldenRugSalesData = (goldenRugSale) => {
    lastGoldenRugSold.id = goldenRugSale.jig.no
    lastGoldenRugSold.price = goldenRugSale.satoshis
    lastGoldenRugSold.url = gopUrl(goldenRugSale.jig.image)
    lastGoldenRugSold.changed = goldenRugSale.changed
}

const setMetagopSalesData = (metagopSale) => {
    lastSoldMetagop.id = metagopSale.jig.no
    lastSoldMetagop.price = metagopSale.satoshis
    lastSoldMetagop.url = gopUrl(metagopSale.jig.image)
    lastSoldMetagop.changed = metagopSale.changed
    // Check which Gopnik it is
    const currentGop = gops.filter((gopObject) => {
        return gopObject.id === metagopSale.jig.no
    })
    lastSoldMetagop.rank = metagopSale.jig.no
}

const setEggSaleData = (eggSale) => {
    lastEggSold.id = eggSale.jig.no
    lastEggSold.price = eggSale.satoshis
    lastEggSold.url = gopUrl(eggSale.jig.image)
    lastEggSold.changed = eggSale.changed
}

const setCigSaleData = (cigSale) => {
    lastCigSold.amount = cigSale.amount
    lastCigSold.changed = cigSale.changed
    lastCigSold.id = cigSale.jig.no
    lastCigSold.price = cigSale.satoshis
    lastCigSold.url = gopUrl(cigSale.jig.image)
    lastCigSold.changed = cigSale.changed
}

const setSlavetteSaleData = (slavetteSale) => {
    lastSoldSlavette.id = slavetteSale.jig.no
    lastSoldSlavette.price = slavetteSale.satoshis
    lastSoldSlavette.url = gopUrl(slavetteSale.jig.image)
    lastSoldSlavette.changed = slavetteSale.changed

    // Check which Gopnik it is
    const currentSlavette = slavettes.filter((slavetteObject) => {
        return slavetteObject.id === slavetteSale.jig.no
    })
    lastSoldSlavette.rank = currentSlavette[0].rank
}

const setFBLSaleData = (fblSale) => {
    lastSoldFBL.id = fblSale.jig.no
    lastSoldFBL.price = fblSale.satoshis
    lastSoldFBL.url = gopUrl(fblSale.jig.image)
    lastSoldFBL.changed = fblSale.changed
}

const setGoptronSaleData = (goptronSale) => {
    lastSoldGoptron.id = goptronSale.jig.no
    lastSoldGoptron.price = goptronSale.satoshis
    lastSoldGoptron.url = gopUrl(goptronSale.jig.image)
    lastSoldGoptron.changed = goptronSale.changed
}

const setGenesisSalesData = (genesisSale) => {
    lastSoldGenesis.id = genesisSale.jig.no
    lastSoldGenesis.price = genesisSale.satoshis
    lastSoldGenesis.url = gopUrl(genesisSale.jig.image)
    lastSoldGenesis.changed = genesisSale.changed
}

const setGenesisData = (genesisOrder) => {
    genesisGop.id = genesisOrder.props.no
    genesisGop.price = genesisOrder.satoshis
    genesisGop.url = gopUrl(genesisOrder.berry.txid)
    genesisGop.link = genesisLink(genesisOrder.location)
    genesisGop.txid = genesisOrder.txid
    genesisGop.location = genesisCollectionLocation
}

const setFBLData = (fblOrder) => {
    fbl.id = fblOrder.props.no
    fbl.price = fblOrder.satoshis
    fbl.url = gopUrl(fblOrder.berry.txid)
    fbl.link = fblLink(fblOrder.location)
    fbl.txid = fblOrder.txid
    fbl.location = goplandiaMunitionsCollectionLocation
}

const setMetagopData = (metagopOrder) => {
    metagop.id = metagopOrder.props.no
    metagop.price = metagopOrder.satoshis
    metagop.url = gopUrl(metagopOrder.berry.txid)
    metagop.link = metagopLink(metagopOrder.location)
    metagop.txid = metagopOrder.txid
    metagop.location = metagopCollectionLocation

    // Check which Gopnik it is
    const currentGop = gops.filter((gopObject) => {
        return gopObject.id === metagopOrder.props.no
    })
    metagop.rank = currentGop[0].rank
}

const findLastSoldFbl = () => {
    if (fblSales.value.length) {
        const fblOrder = fblSales.value[0]
        setFBLSaleData(fblOrder)
    }
}

const setGoptronData = (goptronOrder) => {
    goptron.id = goptronOrder.props.no
    goptron.price = goptronOrder.satoshis
    goptron.url = gopUrl(goptronOrder.berry.txid)
    goptron.link = genesisLink(goptronOrder.location)
    goptron.txid = goptronOrder.txid
    goptron.location = goplandiaMunitionsCollectionLocation
}

const findLastSoldGoptron = () => {
    if (goptronSales.value.length) {
        const goptronOrder = goptronSales.value[0]
        setGoptronSaleData(goptronOrder)
    }
}

const findLastSlavetteSold = () => {
    const slavetteOrder = slavetteSales.value[0]
    setSlavetteSaleData(slavetteOrder)
}

const findLastRugSold = () => {
    const rugSale = rugSales.value[0]
    setRugSalesData(rugSale)
}

const findLastRadioactiveRugSold = () => {
    const rugSale = radioactiveRugSales.value[0]
    setRadioactiveRugSalesData(rugSale)
}

const findLastGoldenRugSold = () => {
    const rugSale = goldenRugSales.value[0]
    setGoldenRugSalesData(rugSale)
}

const findLastMetagopSold = () => {
    const metagopSale = metagopSales.value[0]
    setMetagopSalesData(metagopSale)
}

const findLastEggSold = () => {
    const eggSale = eggSales.value[0]
    setEggSaleData(eggSale)
}

const findLastCigSold = () => {
    const cigSale = cigSales.value[0]
    setCigSaleData(cigSale)
}

const findLastGenesisSold = () => {
    const genesisSale = genesisSales.value[0]
    setGenesisSalesData(genesisSale)
}

const findFloorSlavette = () => {
    if (!slavetteOrders.value.length)
        setSlavetteSoldOutImage()
    else
        setSlavetteData(slavetteOrders.value[0])
}

const findFloorGenesis = () => {
    if (!genesisOrders.value.length)
        setGenesisSoldOutImage()
    else
        setGenesisData(genesisOrders.value[0])
}

const findFloorFbl = () => {
    if (!fblOrders.value.length)
        setFBLSoldOutImage()
    else
        setFBLData(fblOrders.value[0])
}

const findFloorMetagop = () => {
    if (!metagopOrders.value.length)
        setMetagopSoldOutImage()
    else
        setMetagopData(metagopOrders.value[0])
}

const findFloorGoptron = () => {
    if (!goptronOrders.value.length)
        setGoptronSoldOutImage()
    else
        setGoptronData(goptronOrders.value[0])
}

const findFloorRug = () => {
    if (!rugOrders.value.length)
        setRugSoldOutImage()
    else
        setRugData(rugOrders.value[0])
}

const findFloorRadioactiveRug = () => {
    if (!radioactiveRugOrders.value.length)
        setRadioactiveRugSoldOutImage()
    else
        setRadioactiveRugData(radioactiveRugOrders.value[0])
}

const findFloorGoldenRug = () => {
    if (!goldenRugOrders.value.length)
        setGoldenRugSoldOutImage()
    else
        setGoldenRugData(goldenRugOrders.value[0])
}

const findFloorEgg = () => {
    if (!eggOrders.value.length)
        setEggSoldOutImage()
    else
        setEggData(eggOrders.value[0])
}

const findFloorCig = () => {
    if (!cigOrders.value.length)
        setCigSoldOutImage()
    else
        setCigData(cigOrders.value[0])
}

const setGopSaleData = (currentGopType, currentGop, gopSale) => {
    switch (currentGopType) {
        case 'BORIS':
            lastSoldBoris.background = currentGop.Background
            lastSoldBoris.face = currentGop.Face
            lastSoldBoris.faceElement = currentGop['Face Element']
            lastSoldBoris.hands = currentGop.Hands
            lastSoldBoris.head = currentGop.Head
            lastSoldBoris.pants = currentGop.Pants
            lastSoldBoris.sunglasses = currentGop.Sunglasses
            lastSoldBoris.upperBody = currentGop.Upperbody
            lastSoldBoris.id = currentGop.id
            lastSoldBoris.price = gopSale.satoshis
            lastSoldBoris.url = gopUrl(gopSale.jig.image)
            lastSoldBoris.changed = gopSale.changed
            lastSoldBoris.rank = currentGop.rank
            break
        case 'CHAD':
            lastSoldChad.background = currentGop.Background
            lastSoldChad.face = currentGop.Face
            lastSoldChad.faceElement = currentGop['Face Element']
            lastSoldChad.hands = currentGop.Hands
            lastSoldChad.head = currentGop.Head
            lastSoldChad.pants = currentGop.Pants
            lastSoldChad.sunglasses = currentGop.Sunglasses
            lastSoldChad.upperBody = currentGop.Upperbody
            lastSoldChad.id = currentGop.id
            lastSoldChad.price = gopSale.satoshis
            lastSoldChad.url = gopUrl(gopSale.jig.image)
            lastSoldChad.changed = gopSale.changed
            lastSoldChad.rank = currentGop.rank
            break
        case 'IGOR':
            lastSoldIgor.background = currentGop.Background
            lastSoldIgor.face = currentGop.Face
            lastSoldIgor.faceElement = currentGop['Face Element']
            lastSoldIgor.hands = currentGop.Hands
            lastSoldIgor.head = currentGop.Head
            lastSoldIgor.pants = currentGop.Pants
            lastSoldIgor.sunglasses = currentGop.Sunglasses
            lastSoldIgor.upperBody = currentGop.Upperbody
            lastSoldIgor.id = currentGop.id
            lastSoldIgor.price = gopSale.satoshis
            lastSoldIgor.url = gopUrl(gopSale.jig.image)
            lastSoldIgor.changed = gopSale.changed
            lastSoldIgor.rank = currentGop.rank

            break
        case 'VLAD':
            lastSoldVlad.background = currentGop.Background
            lastSoldVlad.face = currentGop.Face
            lastSoldVlad.faceElement = currentGop['Face Element']
            lastSoldVlad.hands = currentGop.Hands
            lastSoldVlad.head = currentGop.Head
            lastSoldVlad.pants = currentGop.Pants
            lastSoldVlad.sunglasses = currentGop.Sunglasses
            lastSoldVlad.upperBody = currentGop.Upperbody
            lastSoldVlad.id = currentGop.id
            lastSoldVlad.price = gopSale.satoshis
            lastSoldVlad.url = gopUrl(gopSale.jig.image)
            lastSoldVlad.changed = gopSale.changed
            lastSoldVlad.rank = currentGop.rank

            break
    }
}

watch(slavetteOrders, (newSlavetteOrders) => {
    if (slavetteOrders.value)
        findFloorSlavette(newSlavetteOrders)
},

    // use `deep` flag to observe property changes to array elements
    { deep: true },
)

watch(genesisOrders, (newGenesisOrders) => {
    if (genesisOrders.value)
        findFloorGenesis(newGenesisOrders)
},

    // use `deep` flag to observe property changes to array elements
    { deep: true },
)

watch(metagopOrders, (newmetagopOrders) => {
    if (metagopOrders.value)
        findFloorMetagop(newmetagopOrders)
},
    { deep: true },
)

watch(fblOrders, (newFBLOrders) => {
    if (fblOrders.value)
        findFloorFbl(newFBLOrders)
},
    { deep: true },
)

watch(goptronOrders, (newGoptronOrders) => {
    if (goptronOrders.value)
        findFloorGoptron(newGoptronOrders)
},
    { deep: true },
)

watch(orders, (newOrders) => {
    if (orders.value)
        findFloorGops(newOrders)
},

    // use `deep` flag to observe property changes to array elements
    { deep: true },
)

watch(rugOrders, (newRugOrders) => {
    if (rugOrders.value)
        findFloorRug(newRugOrders)
},

    // use `deep` flag to observe property changes to array elements
    { deep: true },
)

watch(radioactiveRugOrders, (newRadioactiveRugOrders) => {
    if (radioactiveRugOrders.value)
        findFloorRadioactiveRug(newRadioactiveRugOrders)
},

    // use `deep` flag to observe property changes to array elements
    { deep: true },
)

watch(goldenRugOrders, (newGoldenRugOrders) => {
    if (goldenRugOrders.value)
        findFloorGoldenRug(newGoldenRugOrders)
},

    // use `deep` flag to observe property changes to array elements
    { deep: true },
)

watch(eggOrders, (newEggOrders) => {
    if (eggOrders.value)
        findFloorEgg(newEggOrders)
},

    // use `deep` flag to observe property changes to array elements
    { deep: true },
)

watch(cigOrders, (newCigOrders) => {
    if (cigOrders.value)
        findFloorCig(newCigOrders)
},

    // use `deep` flag to observe property changes to array elements
    { deep: true },
)

// Get & sort gop orders by price
const getAndSortGops = async () => {
    await axios.get(gopOrderURL).then(response => (
        orders.value = response.data.data.orders.sort((a, b) => (a.satoshis > b.satoshis) ? 1 : -1)))
}

// Get & sort gop orders by price FBL-9000 mk1
const getAndSortFBL = async () => {
    let goplandiaMunitionsOrders
    await axios.get(fblOrderUrl).then(response => (
        goplandiaMunitionsOrders = response.data.data.orders.sort((a, b) => (a.satoshis > b.satoshis) ? 1 : -1)
    ))
    goptronOrders.value = goplandiaMunitionsOrders.filter(res => res.name === 'GOPTRON X-218')
    fblOrders.value = goplandiaMunitionsOrders.filter(res => res.name === 'FBL-9000 mk1')
    fbl.issued = 155
    goptron.issued = 77
}

// Get & sort gop orders by price
const getAndSortSlavettes = async () => {
    await axios.get(slavetteOrderURL).then((response) => {
        slavetteOrders.value = response.data.data.orders.sort((a, b) => (a.satoshis > b.satoshis) ? 1 : -1)
        slavette.issued = response.data.data.token.issued
    },
    )
}

const getAndSortRugs = async () => {
    await axios.get(rugOrderUrl).then((response) => {
        rugOrders.value = response.data.data.orders.sort((a, b) => (a.satoshis > b.satoshis) ? 1 : -1)
        rug.issued = response.data.data.token.issued
    },
    )
}

const getAndSortRadioactiveRugs = async () => {
    await axios.get(radioactiveRugOrderUrl).then((response) => {
        radioactiveRugOrders.value = response.data.data.orders.sort((a, b) => (a.satoshis > b.satoshis) ? 1 : -1)
        radioactiveRug.issued = response.data.data.token.issued
    },
    )
}

const getAndSortGoldenRugs = async () => {
    await axios.get(goldenRugOrderUrl).then((response) => {
        goldenRugOrders.value = response.data.data.orders.sort((a, b) => (a.satoshis > b.satoshis) ? 1 : -1)
        goldenRug.issued = response.data.data.token.issued
    },
    )
}

const getAndSortEggs = async () => {
    await axios.get(eggOrderURL).then((response) => {
        eggOrders.value = response.data.data.orders.sort((a, b) => (a.satoshis > b.satoshis) ? 1 : -1)
        egg.issued = response.data.data.token.issued
    },
    )
}

const getAndSortCigs = async () => {
    await axios.get(cigOrderURL).then((response) => {
        cigOrders.value = response.data.data.orders.sort((a, b) => ((a.size / a.satoshis) > (b.size / b.satoshis)) ? -1 : 1)
        cig.issued = response.data.data.token.issued
    },
    )
}

// Get & sort gop orders by price
const getAndSortGenesis = async () => {
    await axios.get(genesisOrderURL).then((response) => {
        genesisOrders.value = response.data.data.orders.sort((a, b) => (a.satoshis > b.satoshis) ? 1 : -1)
        genesisGop.issued = response.data.data.token.issued
    },
    )
}

const getAndSortMetagops = async () => {
    await axios.get(metagopURL).then((response) => {
        metagopOrders.value = response.data.data.orders.sort((a, b) => (a.satoshis > b.satoshis) ? 1 : -1)
        metagop.issued = response.data.data.token.issued
    },
    )
}

const getSlavetteSales = async () => {
    const { result } = useQuery(gql`
    query Activity {
      activity(market: "84769a5ac4cec62270093648c9978016640aeccb62c11b717313d41a4c74640c_o2") {
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
        slavetteSales.value = value.activity
        findLastSlavetteSold()
    })
}

const getFBLSales = async () => {
    const { result } = useQuery(gql`
    query Activity {
      activity(market: "ec5ed161a628a9985c41fa5d90a881cc547ab071c45a038c88b326669378cf54_o2") {
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

    let totalGMSales

    watch(result, (value) => {
        totalGMSales = value.activity
        fblSales.value = totalGMSales.filter((gopSale) => {
            return gopSale.jig.name === 'FBL-9000 mk1'
        })
        goptronSales.value = totalGMSales.filter((gopSale) => {
            return gopSale.jig.name === 'GOPTRON X-218'
        })

        findLastSoldFbl()
        findLastSoldGoptron()
    })
}

const getGopSales = async () => {
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
        gopSales.value = value.activity
        findLastGopSales()
    })
}

const getGenesisSales = async () => {
    const { result } = useQuery(gql`
    query Activity {
      activity(market: "c859ac6d6378e872757a86f25d43cad442b72d915288c3c2d10a6d6632a871a5_o2") {
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
        genesisSales.value = value.activity
        findLastGenesisSold()
    })
}

const getRugSales = async () => {
    const { result } = useQuery(gql`
    query Activity {
      activity(market: "99658f360f9a5f5ce70f6100b1ffbea1fc385a4f44e156f1c1e4fd5e6d1d6232_o2") {
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
        rugSales.value = value.activity
        findLastRugSold()
    })
}

const getRadioactiveRugSales = async () => {
    const { result } = useQuery(gql`
    query Activity {
      activity(market: "a2feebf63bf84ed28945372a4b2ed43ce84dcd0df312bf4c1308b0bca574e11f_o2") {
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
        radioactiveRugSales.value = value.activity
        findLastRadioactiveRugSold()
    })
}

const getGoldenRugSales = async () => {
    const { result } = useQuery(gql`
    query Activity {
      activity(market: "54e23ac33b311538f3b07a3579c83cab1fb5effa6e13f8f14408849515f6f3fc_o2") {
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
        goldenRugSales.value = value.activity
        findLastGoldenRugSold()
    })
}

const getMetagopSales = async () => {
    const { result } = useQuery(gql`
    query Activity {
      activity(market: "d0f9aa922a05ce5a4c4cf57342774826eefd62f82473062f16b65de1a2cfc3d9_o2") {
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
        metagopSales.value = value.activity
        findLastMetagopSold()
    })
}

const getEggSales = async () => {
    const { result } = useQuery(gql`
    query Activity {
      activity(market: "ae25cb3651f159df90941110f02c4cf09072b8cce2ad12e7bc1555fedd76b489_o2") {
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
        eggSales.value = value.activity
        findLastEggSold()
    })
}

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

const getCigSales = async () => {
    const { result } = useQuery(gql`
    query Activity {
      activity(market: "c8c3771f07da180ab76ba2f4a273c3298f1584ad1bcde1e04e0926174e3e432b_o2") {
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
        cigSales.value = value.activity
        findLastCigSold()
    })
}

onMounted(() => {
    getGopSales()
    getSlavetteSales()
    getFBLSales()
    getGenesisSales()
    getRugSales()
    getRadioactiveRugSales()
    getGoldenRugSales()
    getCigSales()
    getEggSales()
    getAndSortSlavettes()
    getAndSortGops()
    getAndSortFBL()
    getAndSortGenesis()
    getAndSortMetagops()
    getMetagopSales()
    getAndSortRugs()
    getAndSortRadioactiveRugs()
    getAndSortGoldenRugs()
    getAndSortEggs()
    getAndSortCigs()
})

// Fill the floor price for each type of gop

</script>

<template>
    <div class="mx-auto h-full bg-black">
        <div class="md:max-w-screen lg:max-w-screen-2xl flex flex-col justify-center items-center w-full mx-auto">
            <div class="text-lg text-center mx-auto w-full text-yellow-200">
                <p>These gops are squatting too close to the floor. Help them up!</p>
            </div>
            <div class="flex flex-col md:flex-row flex-wrap justify-center items-center mt-2 mb-8 mx-auto h-full">
                <NFT-Card mt-4 :nft-object="boris" :last-sold-n-f-t-object="lastSoldBoris" :nft-orders="borisOrders"
                    :num-issued="numBorisIssued" nft-object-name="gopnik" @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="chad" :last-sold-n-f-t-object="lastSoldChad" :nft-orders="chadOrders" mt-4
                    :num-issued="numChadIssued" nft-object-name="gopnik" @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="igor" :last-sold-n-f-t-object="lastSoldIgor" :nft-orders="igorOrders" mt-4
                    :num-issued="numIgorIssued" nft-object-name="gopnik" @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="vlad" :last-sold-n-f-t-object="lastSoldVlad" :nft-orders="vladOrders" mt-4
                    :num-issued="numVladIssued" nft-object-name="gopnik" @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="genesisGop" :last-sold-n-f-t-object="lastSoldGenesis" :nft-orders="genesisOrders"
                    mt-4 :num-issued="36" nft-object-name="Genesis Gopnik" @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="slavette" :last-sold-n-f-t-object="lastSoldSlavette" :nft-orders="slavetteOrders"
                    mt-4 :num-issued="333" nft-object-name="slavette" @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="fbl" :last-sold-n-f-t-object="lastSoldFBL" :nft-orders="fblOrders" mt-4
                    :num-issued="155" nft-object-name="FBL-9000" :last-sold-image="false"
                    @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="goptron" :last-sold-n-f-t-object="lastSoldGoptron" :nft-orders="goptronOrders"
                    mt-4 :num-issued="77" nft-object-name="GOPTRON X-218" :last-sold-image="false"
                    @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="rug" :last-sold-n-f-t-object="lastRugSold" :nft-orders="rugOrders" mt-4
                    :num-issued="218" nft-object-name="Rug" :last-sold-image="false"
                    @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="radioactiveRug" :last-sold-n-f-t-object="lastRadioactiveRugSold" mt-4
                    :nft-orders="radioactiveRugOrders" :num-issued="69" nft-object-name="Radioactive Rug"
                    :last-sold-image="false" @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="goldenRug" :last-sold-n-f-t-object="lastGoldenRugSold" mt-4
                    :nft-orders="goldenRugOrders" :num-issued="33" nft-object-name="Golden Rug" :last-sold-image="false"
                    @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="egg" :last-sold-n-f-t-object="lastEggSold" :nft-orders="eggOrders" mt-4
                    :num-issued="777" nft-object-name="Egg" :last-sold-image="false"
                    @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="metagop" :last-sold-n-f-t-object="lastSoldMetagop" :nft-orders="metagopOrders"
                    mt-4 :num-issued="420" nft-object-name="metagop" @buy="(item) => buyItem(item, true, 0)" />
                <NFT-Card :nft-object="cig" :last-sold-n-f-t-object="lastCigSold" :nft-orders="cigOrders" mt-4
                    :num-issued="333000" nft-object-name="Cigarettes" :last-sold-image="false" :fungible="true" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import NFTCard from '../components/NFTCard.vue'

export default {
    components: {
        NFTCard
    },
}
</script>