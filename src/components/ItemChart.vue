<template>
  <Line :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
    :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<script>
import { Line } from 'vue-chartjs'
import { ref, watch, computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default {
  name: 'ItemChart',
  components: { Line },
  props: {
    chartId: {
      type: String,
      default: "item-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => { },
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    bsvData: {
      type: Array,
      default: () => [],
    },
    itemData: {
      type: Object,
      default: () => { },
    },
    itemType: {
      type: String,
      default: 'commodity',
    },
  },
  setup(props) {
    watch(() => {
    })

    const labels = computed(() => {
      if (props.itemData.data && props.itemData.data[0]?.year) {
        return [...props.itemData.data].map((obj) => `${obj.month ? obj.month : obj.Period}, ${obj.year}`);
      } else if (props.itemData.orders) {
        return [...props.itemData.orders].map((obj) => `${obj.changed}`);
      }
      else {
        return [];
      }
    }
    );

    const normalizedItemPrices = computed(() => {
      if (props.itemData.data && props.itemData.data[0]?.year) {
        const result = [...props.bsvData.data]
          .map((item, i) => {
            if (item.year === props.itemData.data[i].year) {
              //merging two objects
              return Object.assign({}, item, props.itemData.data[i]);
            }
          })

        let itemPricesBeforeNullCheck;

        if (result[0].value) {
          itemPricesBeforeNullCheck = result
            .map((obj) => obj.value * (1 / obj["Average Price"]) * 100000000)
            .reverse();
        } else {
          itemPricesBeforeNullCheck = result.map((obj) => (1 / obj["Average Price"]) * 100000000)
            .reverse();
        }

        const itemPrices = itemPricesBeforeNullCheck
          .map((obj) => {
            if (obj === 0) {
              return null;
            } else {
              return obj;
            }
          })
          .reverse();

        return itemPrices
      } else {
        return []
      }
    });


    const chartData = computed(() => {
      return {
        labels: labels.value,
        datasets: [
          {
            label: `${props.itemData.catalog.emoji} ${props.itemData.catalog.item}`,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
            data: [...normalizedItemPrices.value]
          }
        ]
      }
    })

    const chartOptions = computed(() => {
      return {
        responsive: true
      }
    });

    return { chartData, chartOptions, labels, normalizedItemPrices };
  },
}
</script>
