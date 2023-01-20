import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useCoffeeDataStore = defineStore({
  id: "useCoffeeDataStore",
  state: () => ({
    catalog: ref({
      item: "Coffee, 100%, ground roast, all sizes, per lb.",
      area: "U.S. city average",
      shortName: "coffee",
      emoji: "☕",
    }),
    data: ref([
      {
        month: "Dec",
        value: "",
        year: 2018,
      },
      {
        month: "Jan",
        value: "",
        year: 2019,
      },
      {
        month: "Feb",
        value: "",
        year: 2019,
      },
      {
        month: "Mar",
        value: "",
        year: 2019,
      },
      {
        month: "Apr",
        value: "",
        year: 2019,
      },
      {
        month: "May",
        value: "",
        year: 2019,
      },
      {
        month: "Jun",
        value: "",
        year: 2019,
      },
      {
        month: "Jul",
        value: "",
        year: 2019,
      },
      {
        month: "Aug",
        value: "",
        year: 2019,
      },
      {
        month: "Sep",
        value: "",
        year: 2019,
      },
      { month: "Oct", value: 4.174, year: 2019 },
      { month: "Nov", value: 4.197, year: 2019 },
      {
        month: "Dec",
        value: 4.053,
        year: 2019,
      },
      { month: "Jan", value: 4.174, year: 2020 },
      {
        month: "Feb",
        value: 4.25,
        year: 2020,
      },
      { month: "Mar", value: 4.334, year: 2020 },
      { month: "Apr", value: 4.396, year: 2020 },
      { month: "May", value: 4.466, year: 2020 },
      { month: "Jun", value: 4.517, year: 2020 },
      { month: "Jul", value: 4.536, year: 2020 },
      { month: "Aug", value: 4.504, year: 2020 },
      { month: "Sep", value: 4.487, year: 2020 },
      { month: "Oct", value: 4.522, year: 2020 },
      { month: "Nov", value: 4.485, year: 2020 },
      {
        month: "Dec",
        value: 4.52,
        year: 2020,
      },
      { month: "Jan", value: 4.591, year: 2021 },
      { month: "Feb", value: 4.673, year: 2021 },
      { month: "Mar", value: 4.671, year: 2021 },
      { month: "Apr", value: 4.752, year: 2021 },
      { month: "May", value: 4.566, year: 2021 },
      { month: "Jun", value: 4.605, year: 2021 },
      { month: "Jul", value: 4.562, year: 2021 },
      { month: "Aug", value: 4.726, year: 2021 },
      { month: "Sep", value: 4.733, year: 2021 },
      {
        month: "Oct",
        value: 4.8,
        year: 2021,
      },
      { month: "Nov", value: 4.816, year: 2021 },
      {
        month: "Dec",
        value: 4.965,
        year: 2021,
      },
      { month: "Jan", value: 5.135, year: 2022 },
      { month: "Feb", value: 5.247, year: 2022 },
      {
        month: "Mar",
        value: 5.41,
        year: 2022,
      },
      { month: "Apr", value: 5.529, year: 2022 },
      { month: "May", value: 5.835, year: 2022 },
      { month: "Jun", value: 5.793, year: 2022 },
      { month: "Jul", value: 6.112, year: 2022 },
      { month: "Aug", value: 6.235, year: 2022 },
      {
        month: "Sept",
        value: 6.17,
        year: 2022,
      },
      {
        month: "Oct",
        value: 6.408,
        year: 2022,
      },
      {
        month: "Nov",
        value: 6.356,
        year: 2022,
      },
      {
        month: "Dec",
        value: 6.465,
        year: 2022,
      },
    ]),
  }),
});
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCoffeeDataStore, import.meta.hot));
