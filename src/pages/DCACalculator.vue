

<template>
  <div
    class="flex flex-col md:flex-row text-left items-center justify-center md:justify-between mx-auto py-10 w-full max-w-screen-md">
    <div class="flex mx-auto flex-col items-center justify-center w-full px-4">
      <p class="text-lg md:text-2xl text-center w-full antebBold">
        Dollar Cost Average Calculator
      </p>
      <div class="flex flex-col md:flex-row justify-center items-center mx-auto">
        <div class="w-full md:w-1/2 px-4">
          <p class="text-lg md:text-xl m-0 text-center w-full antebBold">
            Your Dollar Cost Average is: <span class="text-purple-500"> ${{dollarCostAverage.toFixed(2)}}</span>
          </p>

          <p class="text-lg md:text-xl m-0 w-full mt-4 text-center w-full antebBold">
            You have accumulated <span class="text-purple-500">{{(dollarValue * monthSaved /
            dollarCostAverage).toFixed(2)}}
              Bitcoins</span> and have spent a total of
            <span class="text-purple-500">${{dollarValue * monthSaved}} </span> (<span
              class="text-purple-500">${{dollarValue}}</span> * <span class="text-purple-500">{{monthSaved}}</span>
            months)
            at an average price of <span class="text-purple-500"> ${{dollarCostAverage.toFixed(2)}}</span> per Bitcoin.
          </p>
          <p v-if="exchangeResult" class="text-lg md:text-xl m-0 w-full mt-4 text-center w-full antebBold">
            You are <span
              :class="exchangeResult.rate >= dollarCostAverage ? 'text-green-500' : 'text-red-500'">{{(exchangeResult.rate
              >= dollarCostAverage ? 'up' : 'down')}}
            </span> {{exchangeResult.rate >= dollarCostAverage ? '📈' : '📉'}} on your investment by
            <span
              :class="exchangeResult.rate >= dollarCostAverage ? 'text-green-500' : 'text-red-500'">{{netBSVPercentageDiff}}%
            </span>. The current price of Bitcoin is <span
              class="text-purple-500">${{parseFloat(exchangeResult.rate).toFixed(2)}}</span>.
          </p>
        </div>


        <div class="q-pa-md w-full flex justify-center items-center mx-auto w-full md:w-1/2 px-4">


          <p mb-0 class=" antebBold">Dollar Cost Averaging start date </p>
          <q-date w-full mt-2 v-model="date" color="purple-3"
            :options="date => date >= '2018/11/15' && date < todayString" />
          <p mb-0 mt-6 class="antebBold">Amount spent per month: </p>
          <q-slider mt-8 v-model="dollarValue" :min="0" :max="1000" :step="25" label :label-value="'$' + dollarValue"
            label-always color="purple" />



        </div>

      </div>


    </div>
  </div>

</template>

<script>
import NFTCard from '../components/NFTCard.vue'
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useBSVDataStore } from "../stores/bsvData";

export default {
  async mounted() {
    await fetch('https://api.whatsonchain.com/v1/bsv/main/exchangerate').then(response => response.json()).then(data => (this.exchangeResult = data));
  },
  setup() {
    const $q = useQuasar()
    const exchangeResult = ref(null)
    const dollarValue = ref(1)
    const accept = ref(false)
    const date = ref('2018/11/15')
    const bsvDataStore = useBSVDataStore()

    const today = ref(new Date())

    const todayString = today.value.toJSON().slice(0, 10).replace(/-/g, '/')
    // a computed ref
    const chosenDate = computed(() => {
      return (
        new Date(date.value)
      );
    })

    // a computed ref
    const monthSaved = computed(() => {
      return (
        today.value.getMonth() -
        chosenDate.value.getMonth() +
        12 * (today.value.getFullYear() - chosenDate.value.getFullYear())
      );
    })

    // a computed ref
    const bsvMonthsData = computed(() => {
      return (
        bsvDataStore.data.slice(-1 * monthSaved.value)
      );
    })

    // a computed ref
    const dollarCostAverage = computed(() => {
      return (
        (bsvMonthsData.value.reduce((prev, next) => prev + next['Average Price'], 0)) / monthSaved.value
      );
    })

    const netBSVPercentageDiff = computed(() => {
      if (exchangeResult.value && exchangeResult.value.rate) {
        return (
          Math.abs(((dollarCostAverage.value
            - parseFloat(exchangeResult.value.rate))
            / dollarCostAverage.value) * 100).toFixed(2))
      } else {
        return null
      }
    })


    return {
      dollarValue,
      dollarCostAverage,
      netBSVPercentageDiff,
      bsvMonthsData,
      accept,
      today,
      exchangeResult,
      todayString,
      date,
      chosenDate,
      monthSaved,
      bsvData: bsvDataStore.data,
      optionsFn(date) {
        return date >= '2018/11/15'
      },

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset() {
        accept.value = false
      }
    }
  }
}
</script>

<style >
/* @import '../assets/base.css'; */
</style>

<style scoped>

</style>
