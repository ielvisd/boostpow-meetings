<script setup>
import Multiselect from '@vueform/multiselect'
import VueNumberInput from '@chenfengyuan/vue-number-input'
import { useGopnikzFiltersStore } from '../stores/gopnikzFilters'
import { useMyCompanionsStore } from '../stores/myCompanions'
import { useMyGopsStore } from '../stores/myGops'
import { computed, watch, ref } from 'vue';

const myGopStore = useMyGopsStore()
const gopnikzFiltersStore = useGopnikzFiltersStore()
const companionsStore = useCompanionsStore()
const myGopsStore = useMyGopsStore()
const myCompanionsStore = useMyCompanionsStore()

const hasFetchedAllItems = ref(false)

const props = defineProps({
  collection: {
    type: String,
    required: true
  },
  showPriceRange: {
    type: Boolean,
    default: true
  },
  showTraits: {
    type: Boolean,
    default: true
  },
  showSlavetteTraits: {
    type: Boolean,
    default: false
  },
  showCompanionTraits: {
    type: Boolean,
    default: false
  },
})

const currentSortOption = computed({
  get() {
    if (props && props.collection) {
      switch (props.collection) {
        case 'gopnikz':
          return gopnikzFiltersStore.sortOption
        case 'myOgGops':
          return myGopsStore.sortOption
        case 'companions':
          return companionsStore.sortOption
        case 'munitions':
          return munitionsFiltersStore.sortOption
        default:
          return gopnikzFiltersStore.sortOption
      }
    } else {
      return this.computedSortOption
    }
  },
  set(value) {
    this.computedSortOption = value
  }
})
const currentRankOption = computed({
  get() {
    switch (props.collection) {
      case 'gopnikz':
        return gopnikzFiltersStore.rank
      case 'myOgGops':
        return myGopsStore.rank
      case 'metagops':
        return metagopsFiltersStore.rank
      case 'slavettes':
        return slavettesFiltersStore.rank
      case 'companions':
        return companionsStore.rank
      case 'myCompanions':
        return myCompanionsStore.rank
      default:
        return ['Any']
    }
  },
  set(value) {
    if (value === 'Any') {
      this.computedRankOption = [value]
    } else {
      this.computedRankOption = [...value]
    }
  }
})

const currentItemsOption = computed({
  get() {
    switch (props.collection) {
      case 'gopnikz':
        return gopnikzFiltersStore.itemsOption
      case 'myOgGops':
        return myGopsStore.itemsOption
      case 'companions':
        return companionsStore.itemsOption
      case 'myCompanions':
        return myCompanionsStore.itemsOption
      default:
        return ['Any']
    }
  },
  set(value) {
    this.currentItemsOption = [value]
  }
})

const setMinPrice = (newValue, oldValue) => {
  switch (props.collection) {
    case 'myOgGops':
      myGopStore.minPrice = newValue
      myGopStore.findGops()
      return
    case 'gopnikz':
      gopnikzFiltersStore.minPrice = newValue
      gopnikzFiltersStore.findGops()
      return
    case 'companions':
      companionsStore.minPrice = newValue
      companionsStore.findGops()
      return

    default:
      return
  }
}
const setMaxPrice = (newValue, oldValue) => {
  switch (props.collection) {
    case 'myOgGops':
      myGopStore.maxPrice = newValue
      myGopStore.findGops()
      return myGopStore.maxPrice

    case 'gopnikz':
      gopnikzFiltersStore.maxPrice = newValue
      gopnikzFiltersStore.findGops()
      return gopnikzFiltersStore.maxPrice

    case 'companions':
      companionsStore.maxPrice = newValue
      companionsStore.findGops()
      return companionsStore.maxPrice

    default:
      return
  }
}

// TODO: Make this async and then sort the items
const setItemsOption = async (selection) => {

  if (selection === 'All Items') {
    switch (props.collection) {
      case 'gopnikz':
        await gopnikzFiltersStore.setSortToExotic()
        break;
      case 'myOgGops':
        await myGopStore.setSortToExotic()
        break;
      case 'companions':
        await companionsStore.setSortToExotic()
        break;
      case 'myCompanions':
        await myCompanionsStore.setSortToExotic()
        break;

      default:
        break;
    }
  }
  if (!hasFetchedAllItems.value) {
    // NOTE: Separating out all items form listed items as two separate API and lists for speed when filtering
    switch (props.collection) {
      case 'gopnikz':
        await gopnikzFiltersStore.fetchAllItems()
        await gopnikzFiltersStore.findAndSortAllItems()
        break;
      case 'myOgGops':
        await myGopStore.fetchAllItems()
        await myGopStore.findAndSortAllItems()
        break;
      case 'companions':
        await companionsStore.fetchAllItems()
        await companionsStore.findAndSortAllItems()
        break;
      case 'myCompanions':
        await myCompanionsStore.fetchAllItems()
        await myCompanionsStore.findAndSortAllItems()
        break;

      default:
        break;
    }
    hasFetchedAllItems.value = true;

  }

  switch (props.collection) {
    case 'gopnikz':
      gopnikzFiltersStore.itemsOption = [selection]
      break;

    case 'myOgGops':
      myGopStore.itemsOption = [selection]
      break;

    case 'companions':
      companionsStore.itemsOption = [selection]
      break;
    case 'myCompanions':
      myCompanionsStore.itemsOption = [selection]
      break;

    default:
      break;
  }
}

const checkIfAll = (selection, listName) => {
  if (selection.includes('Any')) {
    setCollectionTraitValueToAny(selection, listName)
  }
  // NOTE: Removes `Trait: Any` from the list of options when a trait that's not `Any` is selected
  else {
    removeAnyTraitIfSelectionMade(selection, listName)
  }
  findCurrentGops()
}

const removeTraitOption = (selection, listName) => {
  switch (props.collection) {
    case 'gopnikz':
      if (gopnikzFiltersStore[listName])
        gopnikzFiltersStore[listName].splice(gopnikzFiltersStore[listName].indexOf(selection), 1)
      gopnikzFiltersStore.findGops()
      break;

    case 'myOgGops':
      if (myGopStore[listName])
        myGopStore[listName].splice(myGopStore[listName].indexOf(selection), 1)
      myGopStore.findGops()
      break;

    case 'companions':
      if (companionsStore[listName])
        companionsStore[listName].splice(companionsStore[listName].indexOf(selection), 1)
      companionsStore.findGops()
    case 'myCompanions':
      if (myCompanionsStore[listName])
        myCompanionsStore[listName].splice(myCompanionsStore[listName].indexOf(selection), 1)
      myCompanionsStore.findGops()
    default:
      break;
  }
}

const findCurrentGops = () => {
  switch (props.collection) {
    case 'gopnikz':
      if (gopnikzFiltersStore.itemsOption[0] === 'Listed') {
        gopnikzFiltersStore.findGops()
      } else {
        gopnikzFiltersStore.findAndSortAllItems()
      }
      break;

    case 'myOgGops':
      myGopStore.findGops()
      break;
    case 'companions':
      companionsStore.findGops()
      break;
    case 'myCompanions':
      myCompanionsStore.findGops()
      break;

    default:
      break;
  }
}

const setCollectionTraitValueToAny = (selection, list) => {
  switch (props.collection) {
    case 'gopnikz':
      gopnikzFiltersStore[list] = ['Any']
      break;

    case 'myOgGops':
      myGopStore[list] = ['Any']
      break;

    case 'companions':
      companionsStore[list] = ['Any']
      break;
    case 'myCompanions':
      myCompanionsStore[list] = ['Any']
      break;

    default:
      break;
  }
}

const removeAnyTraitIfSelectionMade = (selection, listName) => {
  // NOTE: Add new trait then delete `Any` value
  switch (props.collection) {
    case 'gopnikz':
      // NOTE: Add trait to V-Model if not there already (to prevent duplicates) & remove `Any` option if it's there
      if (!gopnikzFiltersStore[listName].includes(selection))
        gopnikzFiltersStore[listName].push(selection)
      if (gopnikzFiltersStore[listName].includes('Any'))
        gopnikzFiltersStore[listName].splice(gopnikzFiltersStore[listName].indexOf('Any'), 1)
      gopnikzFiltersStore.findGops()
      break;

    case 'myOgGops':
      if (!myGopStore[listName].includes(selection))
        myGopStore[listName].push(selection)
      if (myGopStore[listName].includes('Any'))
        myGopStore[listName].splice(myGopStore[listName].indexOf('Any'), 1)
      myGopStore.findGops()
      break;
    case 'companions':
      if (!companionsStore[listName].includes(selection))
        companionsStore[listName].push(selection)
      if (companionsStore[listName].includes('Any'))
        companionsStore[listName].splice(companionsStore[listName].indexOf('Any'), 1)
      companionsStore.findGops()
      break;
    case 'myCompanions':
      if (!myCompanionsStore[listName].includes(selection))
        myCompanionsStore[listName].push(selection)
      if (myCompanionsStore[listName].includes('Any'))
        myCompanionsStore[listName].splice(myCompanionsStore[listName].indexOf('Any'), 1)
      myCompanionsStore.findGops()
      break;
    default:
      break;
  }
}

const getStoreSort = (event, rank, rank2) => {
  switch (props.collection) {
    case 'gopnikz':
      gopnikzFiltersStore.setSort(event, rank, rank2)
    case 'myOgGops':
      myGopStore.setSort(event, rank, rank2)
    case 'slavettes':
      companionsStore.setSort(event, rank, rank2)
    case 'myCompanions':
      myCompanionsStore.setSort(event, rank, rank2)

    default:
      break;
  }
}
</script>

<template>
  <div class="bg-#242424 w-full md:w-2/7 text-white p-4 antebBold">
    <div class="flex flex-wrap justify-center items-center">
      <div class="flex flex-col md:flex-row mx-auto justify-center items-center md:max-w-4xl w-full">
        <div class="w-full md:w-64 flex flex-col justify-center items-center">
          <div class="w-full md:w-64 flex flex-col justify-center items-center">
            <Multiselect placeholder="Type:" v-model="currentItemsOption[0]" :options="itemsOptions"
              class="multiselect-theme text-#bd83af mt-2" @select="setItemsOption($event, 'rank', rank)" />
          </div>
          <p m-0 mt-2>Sort By:</p>
          <Multiselect :placeholder="'Sort'" v-model="currentSortOption"
            :options="currentItemsOption[0] === 'All Items' ? itemSortOptions : sortOptions"
            class="multiselect-theme text-#bd83af mt-2" @select="getStoreSort($event, 'rank', rank)" />
        </div>
        <div v-if="showPriceRange && currentItemsOption[0] !== 'All Items'"
          class="w-full flex justify-around items-center mt-4">
          <div class="flex flex-col justify-center items-center">
            <p m-0>Min Price:</p>
            <vue-number-input @update:model-value="setMinPrice" v-model="currentMinPrice" :step="0.1" :min="0.01"
              class=" text-black" placeholder="0.00 BSV" size="small" inline controls />
          </div>
          <div class="flex flex-col justify-center items-center">
            <p m-0>Max Price:</p>
            <vue-number-input @update:model-value="setMaxPrice" v-model="currentMaxPrice" :step="0.1"
              :min="gopnikzFiltersStore.minBuyPrice" class=" text-black" placeholder="0.00 BSV" size="small" inline
              controls />
          </div>
        </div>
      </div>

      <div v-if="showTraits" w-full flex flex-col justify-center items-center>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <p class="w-1/10 m-0  text-purple-400 text-lg">Rank: </p>
          <Multiselect class="!w-8/10 ml-2 multiselect-theme" v-model="currentRankOption" :options="rankOptions"
            :mode="mode" @select="checkIfAll($event, 'rank', 'rank')" @deselect="removeTraitOption($event, 'rank')"
            :placeholder="'Rank'">

            <template v-slot:option="props">
              <div :class='`option__title multiselect-theme-${props.option.value}`'>
                <span>
                  {{
                      props.option.label
                  }}
                </span>
              </div>
            </template>

            <template v-slot:tag="props">
              <div :class='`option__title multiselect-theme-${props.option.value}`'>
                <span>
                  {{
                      props.option.label
                  }}
                </span>
                <q-icon name="close" class="!border-0 text-0.75rem text-accent"
                  @click="removeTraitOption($event, 'rank')" />
              </div>
            </template>

          </Multiselect>
        </div>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <Multiselect v-model="currentValueOption" :options="options" :mode="mode"
            @select="checkIfAll($event, 'value', 'value')" class="multiselect-theme" :placeholder="'Type'"
            @deselect="removeTraitOption($event, 'value')" />
        </div>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <Multiselect v-model="currentBackgroundOption" :options="backgroundOptions" :mode="mode"
            @select="checkIfAll($event, 'background', 'background')" :placeholder="'Background'"
            class="multiselect-theme" @deselect="removeTraitOption($event, 'background')" />
        </div>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <Multiselect v-model="currentHeadOption" :options="headOptions" :mode="mode"
            @select="checkIfAll($event, 'head', 'head')" :placeholder="'Head'" class="multiselect-theme"
            @deselect="removeTraitOption($event, 'head')" />
        </div>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <Multiselect v-model="currentFaceOption" :options="faceOptions" :mode="mode"
            @select="checkIfAll($event, 'face', 'face')" :placeholder="'Face'" class="multiselect-theme"
            @deselect="removeTraitOption($event, 'face')" />
        </div>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <Multiselect v-model="currentFaceElementOption" :options="faceElementOptions" :mode="mode"
            @select="checkIfAll($event, 'faceElement', 'faceElement')" :placeholder="'Face Element'"
            class="multiselect-theme" @deselect="removeTraitOption($event, 'faceElement')" />
        </div>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <Multiselect v-model="currentSunglassesOption" :options="sunglassesOptions" :mode="mode"
            @select="checkIfAll($event, 'sunglasses', 'sunglasses')" :placeholder="'Sunglasses'"
            class="multiselect-theme" @deselect="removeTraitOption($event, 'sunglasses')" />
        </div>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <Multiselect v-model="currentUpperbodyOption" :options="upperBodyOptions" :mode="mode"
            @select="checkIfAll($event, 'upperbody', 'upperbody')" :placeholder="'Upperbody'" class="multiselect-theme"
            @deselect="removeTraitOption($event, 'upperbody')" />
        </div>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <Multiselect v-model="currentHandOption" :options="handOptions" :mode="mode"
            @select="checkIfAll($event, 'hands', 'hands')" :placeholder="'Hands'" class="multiselect-theme"
            @deselect="removeTraitOption($event, 'hands')" />
        </div>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <Multiselect v-model="currentPantOption" :options="pantOptions" :mode="mode"
            @select="checkIfAll($event, 'pants', 'pants')" :placeholder="'Pants'" class="multiselect-theme"
            @deselect="removeTraitOption($event, 'pants')" />
        </div>
      </div>

      <div v-if="showCompanionTraits || showSlavetteTraits" w-full flex flex-col justify-center items-center>
        <div class="w-full mt-4 flex flex-wrap justify-center items-center text-black">
          <p class="w-1/10 m-0  text-purple-400 text-lg">Rank: </p>
          <Multiselect class="!w-8/10 ml-2 multiselect-theme" v-model="currentRankOption" :options="rankOptions"
            :mode="mode" @select="checkIfAll($event, 'rank', 'rank')" @deselect="removeTraitOption($event, 'rank')"
            :placeholder="'Rank'">

            <template v-slot:option="props">
              <div :class='`option__title multiselect-theme-${props.option.value}`'>
                <span>
                  {{
                      props.option.label
                  }}
                </span>
              </div>
            </template>
            <template v-slot:tag="props">
              <div :class='`option__title multiselect-theme-${props.option.value}`'>
                <span>
                  {{
                      props.option.label
                  }}
                </span>
              </div>
            </template>
          </Multiselect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'GopnikzFilters',
  mounted: function () {
    // NOTE: Set trait options here otherwise it's undefined when deployed for some reason...
    const myGopsStore = useMyGopsStore()
    const gopnikzFiltersStore = useGopnikzFiltersStore()
    const slavettesFiltersStore = useSlavetteFilterStore()
    const metagopsFiltersStore = useMetagopsFiltersStore()
    const companionsStore = useCompanionsStore()
    const genesisStore = useGenesisStore()

    switch (this.collection) {
      case 'gopnikz':
        this.currentRankOption = gopnikzFiltersStore.rank
        this.currentSortOption = gopnikzFiltersStore.sortOption
        this.currentValueOption = gopnikzFiltersStore.value
        this.currentBackgroundOption = gopnikzFiltersStore.background
        this.currentFaceElementOption = gopnikzFiltersStore.faceElement
        this.currentFaceOption = gopnikzFiltersStore.face
        this.currentUpperbodyOption = gopnikzFiltersStore.upperbody
        this.currentHandOption = gopnikzFiltersStore.hands
        this.currentHeadOption = gopnikzFiltersStore.head
        this.currentSunglassesOption = gopnikzFiltersStore.sunglasses
        this.currentPantOption = gopnikzFiltersStore.pants
        this.currentItemsOption = gopnikzFiltersStore.itemsOption
        return
      case 'myOgGops':
        this.currentRankOption = myGopsStore.rank
        this.currentSortOption = myGopsStore.sortOption
        this.currentValueOption = myGopsStore.value
        this.currentBackgroundOption = myGopsStore.background
        this.currentFaceElementOption = myGopsStore.faceElement
        this.currentFaceOption = myGopsStore.face
        this.currentUpperbodyOption = myGopsStore.upperbody
        this.currentHandOption = myGopsStore.hands
        this.currentHeadOption = myGopsStore.head
        this.currentSunglassesOption = myGopsStore.sunglasses
        this.currentPantOption = myGopsStore.pants
        this.currentItemsOption = myGopsStore.itemsOption
        return
      case 'companions':
        this.currentRankOption = companionsStore.rank
        this.currentSortOption = companionsStore.sortOption
        this.currentValueOption = companionsStore.value
        this.currentBackgroundOption = companionsStore.background
        this.currentFaceElementOption = companionsStore.faceElement
        this.currentFaceOption = companionsStore.face
        this.currentUpperbodyOption = companionsStore.upperbody
        this.currentHandOption = companionsStore.hands
        this.currentHeadOption = companionsStore.head
        this.currentSunglassesOption = companionsStore.sunglasses
        this.currentItemsOption = companionsStore.itemsOption
        return
    }
  },
  data() {
    return {
      backgroundImage: 'goplandaBg.png',
      mode: 'tags',
      options: [
        { value: 'Any', label: 'Type: Any' },
        { value: 'BORIS', label: 'Type: Boris' },
        { value: 'CHAD', label: 'Type: Chad' },
        { value: 'IGOR', label: 'Type: Igor' },
        { value: 'VLAD', label: 'Type: Vlad' },
      ],
      backgroundOptions: [
        { value: 'Any', label: 'Background: Any' },
        { value: 'Blue', label: 'Background: Blue' },
        { value: 'Green', label: 'Background: Green' },
        { value: 'Purple', label: 'Background: Purple' },
        { value: 'Radioactive', label: 'Background: Radioactive' },
        { value: 'Radioactive Pink', label: 'Background: Radioactive Pink' },
        { value: 'Red', label: 'Background: Red' },
        { value: 'Yellow', label: 'Background: Yellow' },
      ],
      headOptions: [
        { value: 'Any', label: 'Head: Any' },
        { value: 'Bandages', label: 'Head: Bandages' },
        { value: 'Beanie', label: 'Head: Beanie' },
        { value: 'Beanie Green', label: 'Head: Beanie Green' },
        { value: 'Beanie Red', label: 'Head: Beanie Red' },
        { value: 'Blonde', label: 'Head: Blonde' },
        { value: 'Buzz Cut', label: 'Head: Buzz Cut' },
        { value: 'Egg', label: 'Head: Egg' },
        { value: 'Fish', label: 'Head: Fish' },
        { value: 'Fried Egg', label: 'Head: Fried Egg' },
        { value: 'Fur Hat', label: 'Head: Fur Hat' },
        { value: 'Golden Egg', label: 'Head: Golden Egg' },
        { value: 'Military Hat', label: 'Head: Military Hat' },
        { value: 'Slav Hat', label: 'Head: Slav Hat' },
        { value: 'Ushanka', label: 'Head: Ushanka' },
      ],
      faceOptions: [
        { value: 'Any', label: 'Face: Any' },
        { value: 'None', label: 'Face: None' },
        { value: 'Drunk', label: 'Face: Drunk' },
        { value: 'Beard', label: 'Face: Beard' },
        { value: 'Eyebags', label: 'Face: Eyebags' },
        { value: 'Golden Tooth', label: 'Face: Golden Tooth' },
        { value: 'Punch', label: 'Face: Punch' },
        { value: 'Scar', label: 'Face: Scar' },
      ],
      faceElementOptions: [
        { value: 'Any', label: 'Face Element: Any' },
        { value: '3rd Eye', label: 'Face Element: 3rd Eye' },
        { value: 'Bandage', label: 'Face Element: Bandage' },
        { value: 'Kiss', label: 'Face Element: Kiss' },
        { value: 'Mole', label: 'Face Element: Mole' },
        { value: 'None', label: 'Face Element: None' },
        { value: 'Scar', label: 'Face Element: Scar' },
        { value: 'Tattoo', label: 'Face Element: Tattoo' },
      ],
      sunglassesOptions: [
        { value: 'Any', label: 'Sunglasses: Any' },
        { value: 'Aviator Sunglasses', label: 'Sunglasses: Aviator Sunglasses' },
        { value: 'Cyclop Sunglasses', label: 'Sunglasses: Cyclop Sunglasses' },
        { value: 'Dolge&Gopnikz', label: 'Sunglasses: Dolge&Gopnikz' },
        { value: 'None', label: 'Sunglasses: None' },
        { value: 'Viper Sunglasses', label: 'Sunglasses: Viper Sunglasses' },
      ],
      upperBodyOptions: [
        { value: 'Any', label: 'Upper Body: Any' },
        { value: 'Blood Stain', label: 'Upper Body: Blood Stain' },
        { value: 'Body Hair', label: 'Upper Body: Body Hair' },
        { value: 'Chains', label: 'Upper Body: Chains' },
        { value: 'Golden Cross', label: 'Upper Body: Golden Cross' },
        { value: 'Hoodie Fish', label: 'Upper Body: Hoodie Fish' },
        { value: 'Hoodie Flames', label: 'Upper Body: Hoodie Flames' },
        { value: 'Hoodie Houndstooth', label: 'Upper Body: Hoodie Houndstooth' },
        { value: 'Hoodie Jaguar', label: 'Upper Body: Hoodie Jaguar' },
        { value: 'Hoodie Special', label: 'Upper Body: Hoodie Special' },
        { value: 'Hoodie Zebra', label: 'Upper Body: Hoodie Zebra' },
        { value: 'Leather Jaket Brown', label: 'Upper Body: Leather Jaket Brown' },
        { value: 'Leather Jaket Black', label: 'Upper Body: Leather Jaket Black' },
        { value: 'Marine Top', label: 'Upper Body: Marine Top' },
        { value: 'Mustard Stain', label: 'Upper Body: Mustard Stain' },
        { value: 'None', label: 'Upper Body: None' },
        { value: 'Hoodie Black', label: 'Upper Body: Hoodie Black' },
        { value: 'Hoodie Black Cube', label: 'Upper Body: Hoodie Black Cube' },
        { value: 'Hoodie Black Dotted', label: 'Upper Body: Hoodie Black Dotted' },
        { value: 'Hoodie Blue', label: 'Upper Body: Hoodie Blue' },
        { value: 'Hoodie Blue Cube', label: 'Upper Body: Hoodie Blue Cube' },
        { value: 'Hoodie Blue Dotted', label: 'Upper Body: Hoodie Blue Dotted' },
        { value: 'Hoodie Green', label: 'Upper Body: Hoodie Green' },
        { value: 'Hoodie Green Cube', label: 'Upper Body: Hoodie Green Cube' },
        { value: 'Hoodie Green Dotted', label: 'Upper Body: Hoodie Green Dotted' },
        { value: 'Hoodie Orange', label: 'Upper Body: Hoodie Orange' },
        { value: 'Hoodie Orange Cube', label: 'Upper Body: Hoodie Orange Cube' },
        { value: 'Hoodie Orange Dotted', label: 'Upper Body: Hoodie Orange Dotted' },
        { value: 'Hoodie Pink', label: 'Upper Body: Hoodie Pink' },
        { value: 'Hoodie Pink Cube', label: 'Upper Body: Hoodie Pink Cube' },
        { value: 'Hoodie Pink Dotted', label: 'Upper Body: Hoodie Pink Dotted' },
        { value: 'Hoodie Red', label: 'Upper Body: Hoodie Red' },
        { value: 'Hoodie Red Cube', label: 'Upper Body: Hoodie Red Cube' },
        { value: 'Hoodie Red Dotted', label: 'Upper Body: Hoodie Red Dotted' },
        { value: 'Hoodie Yellow', label: 'Upper Body: Hoodie Yellow' },
        { value: 'Hoodie Yellow Cube', label: 'Upper Body: Hoodie Yellow Cube' },
        { value: 'Hoodie Yellow Dotted', label: 'Upper Body: Hoodie Yellow Dotted' },
      ],
      handOptions: [
        { value: 'Any', label: 'Hands: Any' },
        { value: 'AK47', label: 'Hands: AK47' },
        { value: 'Bottle Blue Liquid', label: 'Hands: Bottle Blue Liquid' },
        { value: 'Bottle Green Liquid', label: 'Hands: Bottle Green LHands: iquid' },
        { value: 'Bottle Magic Liquid', label: 'Hands: Bottle Magic Liquid' },
        { value: 'Bottle Pink Liquid', label: 'Hands: Bottle Pink Liquid' },
        { value: 'Bottle Red Liquid', label: 'Hands: Bottle Red Liquid' },
        { value: 'Bottle Yellow Liquid', label: 'Hands: Bottle Blue Liquid' },
        { value: 'Cigar', label: 'Hands: Cigar' },
        { value: 'Cigarette', label: 'Hands: Cigarette' },
        { value: 'Empty', label: 'Hands: Empty' },
        { value: 'Gopnokia Phone', label: 'Hands: Gopnokia Phone' },
        { value: 'Joint', label: 'Hands: Joint' },
        { value: 'KBAC', label: 'Hands: KBAC' },
        { value: 'Metal Crow Bar', label: 'Hands: Metal Crow Bar' },
        { value: 'Sunseeds Cone', label: 'Hands: Sunseeds Cone' },
        { value: 'Vodka', label: 'Hands: Vodka' },
      ],
      pantOptions: [
        { value: 'Any', label: 'Pants: Any' },
        { value: 'Birds', label: 'Pants: Birds' },
        { value: 'Briefs', label: 'Pants: Briefs' },
        { value: 'Fish', label: 'Pants: Fish' },
        { value: 'Flames', label: 'Pants: Flames' },
        { value: 'Houndstooth', label: 'Pants: Houndstooth' },
        { value: 'Jaguar', label: 'Pants: Jaguar' },
        { value: 'Special', label: 'Pants: Special' },
        { value: 'Zebra', label: 'Pants: Zebra' },
        { value: 'Black', label: 'Pants: Black' },
        { value: 'Black Cube', label: 'Pants: Black Cube' },
        { value: 'Black Dotted', label: 'Pants: Black Dotted' },
        { value: 'Blue', label: 'Pants: Blue' },
        { value: 'Blue Cube', label: 'Pants: Blue Cube' },
        { value: 'Blue Dotted', label: 'Pants: Blue Dotted' },
        { value: 'Green', label: 'Pants: Green' },
        { value: 'Green Cube', label: 'Pants: Green Cube' },
        { value: 'Green Dotted', label: 'Pants: Green Dotted' },
        { value: 'Orange', label: 'Pants: Orange' },
        { value: 'Orange Cube', label: 'Pants: Orange Cube' },
        { value: 'Orange Dotted', label: 'Pants: Orange Dotted' },
        { value: 'Pink', label: 'Pants: Pink' },
        { value: 'Pink Cube', label: 'Pants: Pink Cube' },
        { value: 'Pink Dotted', label: 'Pants: Pink Dotted' },
        { value: 'Red', label: 'Pants: Red' },
        { value: 'Red Cube', label: 'Pants: Red Cube' },
        { value: 'Red Dotted', label: 'Pants: Red Dotted' },
        { value: 'Yellow', label: 'Pants: Yellow' },
        { value: 'Yellow Cube', label: 'Pants: Yellow Cube' },
        { value: 'Yellow Dotted', label: 'Pants: Yellow Dotted' },
      ],
      rankOptions: [
        { value: 'Any', label: 'Any' },
        { value: 'Common', label: 'Common - 50%' },
        { value: 'Uncommon', label: 'Uncommon - 25%' },
        { value: 'Rare', label: 'Rare - 15%' },
        { value: 'Epic', label: 'Epic - 6%' },
        { value: 'Legendary', label: 'Legendary - 3%' },
        { value: 'Exotic', label: 'Exotic - 1%' },
      ],
      sortOptions: [
        { value: 'Price Low to High', label: 'Sort: Price Low to High' },
        { value: 'Price High to Low', label: 'Sort: Price High to Low' },
        { value: 'Rank Common to Exotic', label: 'Rank: Common to Exotic' },
        { value: 'Rank Exotic to Common', label: 'Rank: Exotic to Common' },
      ],
      itemSortOptions: [
        { value: 'Rank Common to Exotic', label: 'Rank: Common to Exotic' },
        { value: 'Rank Exotic to Common', label: 'Rank: Exotic to Common' },
      ],
      itemsOptions: [
        { value: 'All Items', label: 'All Items' },
        { value: 'Listed', label: 'Listed' },
      ],
      computedSortOption: null,
      computedMinPrice: null,
      computedMaxPrice: null,
      computedValueOption: null,
      computedItemsOptions: null,
      computedBackgroundOption: null,
      computedHeadOption: null,
      computedFaceOption: null,
      computedFaceElementOption: null,
      computedSunglassesOption: null,
      computedUpperbodyOption: null,
      computedHandOption: null,
      computedPantOption: null,
    }
  },
  watch: {
    collection: function (newVal, oldVal) { // watch it
    }
  },
  computed: {
    currentMinPrice: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()
        const slavettesFiltersStore = useSlavetteFilterStore()
        const metagopsFiltersStore = useMetagopsFiltersStore()
        const companionsStore = useCompanionsStore()
        const genesisStore = useGenesisStore()

        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.minPrice
            case 'myOgGops':
              return myGopsStore.minPrice
            case 'slavettes':
              return slavettesFiltersStore.minPrice
            case 'metagops':
              return metagopsFiltersStore.minPrice
            case 'companions':
              return companionsStore.minPrice
            case 'genesis':
              return genesisStore.minPrice

            default:
              return gopnikzFiltersStore.minPrice
          }
        } else {
          return this.computedMinPrice
        }
      },
      set(value) {
        this.computedMinPrice = value
      }
    },
    currentMaxPrice: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()
        const slavettesFiltersStore = useSlavetteFilterStore()
        const metagopsFiltersStore = useMetagopsFiltersStore()
        const companionsStore = useCompanionsStore()
        const genesisStore = useGenesisStore()

        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.maxPrice
            case 'myOgGops':
              return myGopsStore.maxPrice
            case 'slavettes':
              return slavettesFiltersStore.maxPrice
            case 'metagops':
              return metagopsFiltersStore.maxPrice
            case 'companions':
              return companionsStore.maxPrice
            case 'genesis':
              return genesisStore.minPrice
            default:
              return gopnikzFiltersStore.maxPrice
          }
        } else {
          return this.computedMaxPrice
        }
      },
      set(value) {
        this.computedMaxPrice = value
      }
    },
    currentPantOption: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()

        const metagopsFiltersStore = useMetagopsFiltersStore()
        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.pants
            case 'myOgGops':
              return myGopsStore.pants
            case 'metagops':
              return metagopsFiltersStore.pants
            default:
              return gopnikzFiltersStore.pants
          }
        } else {
          return this.computedPantOption
        }
      },
      set(value) {
        this.computedPantOption = [...value]
      }
    },
    currentHandOption: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()
        const slavettesFiltersStore = useSlavetteFilterStore()
        const metagopsFiltersStore = useMetagopsFiltersStore()
        const companionsStore = useCompanionsStore()
        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.hands
            case 'myOgGops':
              return myGopsStore.hands
            case 'metagops':
              return metagopsFiltersStore.hands
            case 'slavettes':
              return slavettesFiltersStore.hands
            case 'companions':
              return companionsStore.hands
            default:
              return gopnikzFiltersStore.hands
          }
        } else {
          return this.computedHandOption
        }
      },
      set(value) {
        this.computedHandOption = [...value]
      }
    },
    currentUpperbodyOption: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()

        const metagopsFiltersStore = useMetagopsFiltersStore()
        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.upperbody

            case 'myOgGops':
              return myGopsStore.upperbody
            case 'metagops':
              return metagopsFiltersStore.upperbody

            default:
              return gopnikzFiltersStore.upperbody
          }
        } else {
          return this.computedUpperbodyOption
        }
      },
      set(value) {
        this.computedUpperbodyOption = [...value]
      }
    },
    currentSunglassesOption: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()

        const metagopsFiltersStore = useMetagopsFiltersStore()
        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.sunglasses

            case 'myOgGops':
              return myGopsStore.sunglasses
            case 'metagops':
              return metagopsFiltersStore.sunglasses

            default:
              return gopnikzFiltersStore.sunglasses
          }
        } else {
          return this.computedSunglassesOption
        }
      },
      set(value) {
        this.computedSunglassesOption = [...value]
      }
    },
    currentFaceElementOption: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()

        const metagopsFiltersStore = useMetagopsFiltersStore()
        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.faceElement

            case 'myOgGops':
              return myGopsStore.faceElement

            default:
              return gopnikzFiltersStore.faceElement
          }
        } else {
          return this.computedFaceElementOption
        }
      },
      set(value) {
        this.computedFaceElementOption = [...value]
      }
    },
    currentFaceOption: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()

        const metagopsFiltersStore = useMetagopsFiltersStore()
        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.face

            case 'myOgGops':
              return myGopsStore.face

            default:
              return gopnikzFiltersStore.face
          }
        } else {
          return this.computedFaceOption
        }
      },
      set(value) {
        this.computedFaceOption = [...value]
      }
    },
    currentHeadOption: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()

        const metagopsFiltersStore = useMetagopsFiltersStore()
        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.head

            case 'myOgGops':
              return myGopsStore.head
            case 'metagops':
              return metagopsFiltersStore.head

            default:
              return gopnikzFiltersStore.head
          }
        } else {
          return this.computedHeadOption
        }
      },
      set(value) {
        this.computedHeadOption = [...value]
      }
    },
    currentBackgroundOption: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()

        const metagopsFiltersStore = useMetagopsFiltersStore()
        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.background

            case 'myOgGops':
              return myGopsStore.background
            case 'metagops':
              return metagopsFiltersStore.background

            default:
              return gopnikzFiltersStore.background
          }
        } else {
          return this.computedBackgroundOption
        }
      },
      set(value) {
        this.computedBackgroundOption = [...value]
      }
    },
    currentValueOption: {
      get() {
        const myGopsStore = useMyGopsStore()
        const gopnikzFiltersStore = useGopnikzFiltersStore()

        const metagopsFiltersStore = useMetagopsFiltersStore()
        if (this.props && this.props.collection) {
          switch (this.props.collection) {
            case 'gopnikz':
              return gopnikzFiltersStore.value
            case 'myOgGops':
              return myGopsStore.value
            case 'metagops':
              return metagopsFiltersStore.value

            default:
              return gopnikzFiltersStore.value
          }
        } else {
          return this.computedValueOption
        }
      },
      set(value) {
        this.computedValueOption = [...value]
      }
    },
  },
  props: {
    collection: {
      type: String,
      required: true
    },
    showPriceRange: {
      type: Boolean,
      default: true
    },
    showTraits: {
      type: Boolean,
      default: true
    },
    showCompanionTraits: {
      type: Boolean,
      default: false
    },
  },
  components: {
    Multiselect
  }
});
</script>

<style scoped>
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

:deep(.multiselect-dropdown) {
  background: #242424;
}

:deep(.is-pointed) {
  background: #242424;
}

:deep(.multiselect-tags) {
  margin: 0;
}

.multiselect-theme-Any {
  background: #bd83af;
  color: purple;
  padding: 6px 12px;
  margin: 6px auto;
  border-radius: 22px;
  margin-left: 8px;
}

.multiselect-theme-Common {
  --ms-bg: #242424;
  background: rgba(229, 231, 235, 1);
  color: purple;
  padding: 6px 12px;
  margin: 6px auto;
  border-radius: 22px;
  margin-left: 8px;
}

.multiselect-theme-Uncommon {
  --ms-bg: #242424;
  background: rgba(96, 165, 250, 1);
  color: purple;
  padding: 6px 12px;
  margin: 6px auto;
  border-radius: 22px;
  margin-left: 8px;
}

.multiselect-theme-Rare {
  --ms-bg: #242424;
  background: rgba(74, 222, 128, 1);
  color: purple;
  padding: 6px 12px;
  margin: 6px auto;
  border-radius: 22px;
  margin-left: 8px;
}

.multiselect-theme-Epic {
  --ms-bg: #242424;
  background: rgba(248, 113, 113, 1);
  color: purple;
  padding: 6px 12px;
  margin: 6px auto;
  border-radius: 22px;
  margin-left: 8px;
}

.multiselect-theme-Legendary {
  --ms-bg: #242424;
  background: rgba(250, 204, 21, 1);
  color: purple;
  padding: 6px 12px;
  margin: 6px auto;
  border-radius: 22px;
  margin-left: 8px;
}

.multiselect-theme-Exotic {
  --ms-bg: #242424;
  background: rgba(192, 32, 252, 1);
  color: black;
  padding: 6px 12px;

  margin: 6px auto;
  border-radius: 22px;
  margin-left: 8px;
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
