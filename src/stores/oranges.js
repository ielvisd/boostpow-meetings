import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useOrangeDataStore = defineStore({
  id: "useOrangeDataStore",
  state: () => ({
    catalog: ref({
      item: "	Oranges, Navel, per lb.",
      area: "U.S. city average",
      emoji: "🍊",
      shortName: "oranges",
    }),
    data: ref([
      { month: "Dec", value: 1.389, year: 2018 },
      { month: "Jan", value: 1.344, year: 2019 },
      { month: "Feb", value: 1.298, year: 2019 },
      { month: "Mar", value: 1.346, year: 2019 },
      {
        month: "Apr",
        value: 1.28,
        year: 2019,
      },
      { month: "May", value: 1.331, year: 2019 },
      { month: "Jun", value: 1.296, year: 2019 },
      { month: "Jul", value: 1.411, year: 2019 },
      { month: "Aug", value: 1.442, year: 2019 },
      { month: "Sep", value: 1.426, year: 2019 },
      {
        month: "Oct",
        value: 1.47,
        year: 2019,
      },
      { month: "Nov", value: 1.429, year: 2019 },
      { month: "Dec", value: 1.327, year: 2019 },
      { month: "Jan", value: 1.244, year: 2020 },
      { month: "Feb", value: 1.218, year: 2020 },
      { month: "Mar", value: 1.174, year: 2020 },
      {
        month: "Apr",
        value: "",
        year: 2020,
      },
      { month: "May", value: 1.209, year: 2020 },
      { month: "Jun", value: 1.296, year: 2020 },
      {
        month: "Jul",
        value: "",
        year: 2020,
      },
      {
        month: "Aug",
        value: "",
        year: 2020,
      },
      {
        month: "Sep",
        value: "",
        year: 2020,
      },
      {
        month: "Oct",
        value: "",
        year: 2020,
      },
      {
        month: "Nov",
        value: "",
        year: 2020,
      },
      { month: "Dec", value: 1.329, year: 2020 },
      { month: "Jan", value: 1.303, year: 2021 },
      { month: "Feb", value: 1.321, year: 2021 },
      { month: "Mar", value: 1.266, year: 2021 },
      {
        month: "Apr",
        value: 1.32,
        year: 2021,
      },
      { month: "May", value: 1.317, year: 2021 },
      { month: "Jun", value: 1.354, year: 2021 },
      {
        month: "Jul",
        value: "",
        year: 2021,
      },
      {
        month: "Aug",
        value: "",
        year: 2021,
      },
      {
        month: "Sep",
        value: "",
        year: 2021,
      },
      {
        month: "Oct",
        value: 1.49,
        year: 2021,
      },
      {
        month: "Nov",
        value: 1.44,
        year: 2021,
      },
      { month: "Dec", value: 1.448, year: 2021 },
      { month: "Jan", value: 1.427, year: 2022 },
      { month: "Feb", value: 1.445, year: 2022 },
      {
        month: "Mar",
        value: 1.48,
        year: 2022,
      },
      { month: "Apr", value: 1.505, year: 2022 },
      { month: "May", value: 1.546, year: 2022 },
      {
        month: "Jun",
        value: 1.6,
        year: 2022,
      },
      {
        month: "Jul",
        value: null,
        year: 2022,
      },
      { month: "Aug", value: 1.703, year: 2022 },
      {
        month: "Sep",
        value: 1.73,
        year: 2022,
      },
      {
        month: "Oct",
        value: 1.73,
        year: 2022,
      },
      {
        month: "Nov",
        value: 1.641,
        year: 2022,
      },
      {
        month: "Dec",
        value: 1.485,
        year: 2022,
      },
    ]),
  }),
});
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrangeDataStore, import.meta.hot));
