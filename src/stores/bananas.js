import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useBananaDataStore = defineStore({
  id: "useBananaDataStore",
  state: () => ({
    catalog: ref({
      item: "Bananas, per lb.",
      area: "U.S. city average",
      shortName: "bananas",
      emoji: "🍌",
    }),
    data: ref([
      { month: "Dec", value: 0.577, year: 2018 },
      { month: "Jan", value: 0.576, year: 2019 },
      { month: "Feb", value: 0.571, year: 2019 },
      { month: "Mar", value: 0.581, year: 2019 },
      { month: "Apr", value: 0.567, year: 2019 },
      { month: "May", value: 0.579, year: 2019 },
      { month: "Jun", value: 0.574, year: 2019 },
      { month: "Jul", value: 0.569, year: 2019 },
      { month: "Aug", value: 0.578, year: 2019 },
      { month: "Sep", value: 0.569, year: 2019 },
      { month: "Oct", value: 0.573, year: 2019 },
      { month: "Nov", value: 0.573, year: 2019 },
      { month: "Dec", value: 0.573, year: 2019 },
      {
        month: "Jan",
        value: 0.57,
        year: 2020,
      },
      { month: "Feb", value: 0.574, year: 2020 },
      { month: "Mar", value: 0.576, year: 2020 },
      { month: "Apr", value: 0.581, year: 2020 },
      { month: "May", value: 0.589, year: 2020 },
      { month: "Jun", value: 0.588, year: 2020 },
      {
        month: "Jul",
        value: 0.58,
        year: 2020,
      },
      { month: "Aug", value: 0.576, year: 2020 },
      { month: "Sep", value: 0.574, year: 2020 },
      { month: "Oct", value: 0.577, year: 2020 },
      { month: "Nov", value: 0.578, year: 2020 },
      { month: "Dec", value: 0.572, year: 2020 },
      { month: "Jan", value: 0.597, year: 2021 },
      {
        month: "Feb",
        value: 0.59,
        year: 2021,
      },
      { month: "Mar", value: 0.594, year: 2021 },
      { month: "Apr", value: 0.604, year: 2021 },
      {
        month: "May",
        value: 0.6,
        year: 2021,
      },
      { month: "Jun", value: 0.595, year: 2021 },
      { month: "Jul", value: 0.594, year: 2021 },
      { month: "Aug", value: 0.589, year: 2021 },
      { month: "Sep", value: 0.597, year: 2021 },
      {
        month: "Oct",
        value: 0.6,
        year: 2021,
      },
      { month: "Nov", value: 0.619, year: 2021 },
      { month: "Dec", value: 0.622, year: 2021 },
      {
        month: "Jan",
        value: 0.63,
        year: 2022,
      },
      { month: "Feb", value: 0.628, year: 2022 },
      { month: "Mar", value: 0.642, year: 2022 },
      { month: "Apr", value: 0.637, year: 2022 },
      { month: "May", value: 0.642, year: 2022 },
      {
        month: "Jun",
        value: 0.64,
        year: 2022,
      },
      {
        month: "Jul",
        value: 0.64,
        year: 2022,
      },
      {
        month: "Aug",
        value: 0.643,
        year: 2022,
      },
      {
        month: "Sept",
        value: 0.643,
        year: 2022,
      },
      {
        month: "Oct",
        value: 0.634,
        year: 2022,
      },
      {
        month: "Nov",
        value: 0.631,
        year: 2022,
      },
      {
        month: "Dec",
        value: 0.628,
        year: 2022,
      },
    ]),
  }),
});
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBananaDataStore, import.meta.hot));
