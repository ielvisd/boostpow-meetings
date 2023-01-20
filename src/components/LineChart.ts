import { defineComponent, h, PropType, ref } from "vue";

import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

import { useBsvDataStore } from "../stores/bsvData";
const { bsvData } = useBsvDataStore();

export default defineComponent({
  name: "LineChart",
  components: {
    Line,
  },
  computed: {
    bsvDataMonthlyHistoricalPrice() {
      return this.bsvData.map((obj) => (obj.High + obj.Low) / 2);
    },
    bsvDataMonthlyHistoricalPriceLabels() {
      return this.bsvData.map((obj) => obj.Date);
    },
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
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
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    bsvData: {
      type: Object,
      default: () => bsvData,
    },
  },
  setup(props) {
    const labels = bsvData.map((obj) => obj.Date);
    const prices = bsvData.map(
      (obj) => ((1 / obj.High + 1 / obj.Low) / 2) * 100000000
    );
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Satohis per 1 USD (Historic)",
          backgroundColor: "#f87979",
          data: prices,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return () =>
      h(Line, {
        bsvData: props.bsvData,
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});
