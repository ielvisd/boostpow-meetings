import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useGasolineAllTypesDataStore = defineStore({
  id: "useGasolineAllTypesDataStore",
  state: () => ({
    catalog: ref({
      item: "Gasoline, all types, per gallon",
      area: "U.S. city average",
      shortName: "gasoline",
      emoji: "🏎️",
    }),
    data: ref([
      { month: "Dec", value: 2.479, year: 2018 },
      { month: "Jan", value: 2.352, year: 2019 },
      { month: "Feb", value: 2.412, year: 2019 },
      {
        month: "Mar",
        value: 2.62,
        year: 2019,
      },
      { month: "Apr", value: 2.894, year: 2019 },
      { month: "May", value: 2.963, year: 2019 },
      { month: "Jun", value: 2.814, year: 2019 },
      { month: "Jul", value: 2.836, year: 2019 },
      { month: "Aug", value: 2.716, year: 2019 },
      { month: "Sep", value: 2.694, year: 2019 },
      { month: "Oct", value: 2.741, year: 2019 },
      { month: "Nov", value: 2.687, year: 2019 },
      { month: "Dec", value: 2.652, year: 2019 },
      { month: "Jan", value: 2.631, year: 2020 },
      {
        month: "Feb",
        value: 2.53,
        year: 2020,
      },
      { month: "Mar", value: 2.334, year: 2020 },
      { month: "Apr", value: 1.946, year: 2020 },
      { month: "May", value: 1.946, year: 2020 },
      { month: "Jun", value: 2.141, year: 2020 },
      { month: "Jul", value: 2.243, year: 2020 },
      { month: "Aug", value: 2.245, year: 2020 },
      {
        month: "Sep",
        value: 2.26,
        year: 2020,
      },
      { month: "Oct", value: 2.228, year: 2020 },
      { month: "Nov", value: 2.159, year: 2020 },
      { month: "Dec", value: 2.235, year: 2020 },
      { month: "Jan", value: 2.391, year: 2021 },
      { month: "Feb", value: 2.559, year: 2021 },
      { month: "Mar", value: 2.856, year: 2021 },
      { month: "Apr", value: 2.907, year: 2021 },
      { month: "May", value: 3.041, year: 2021 },
      { month: "Jun", value: 3.245, year: 2021 },
      { month: "Jul", value: 3.326, year: 2021 },
      { month: "Aug", value: 3.351, year: 2021 },
      { month: "Sep", value: 3.361, year: 2021 },
      { month: "Oct", value: 3.477, year: 2021 },
      { month: "Nov", value: 3.576, year: 2021 },
      { month: "Dec", value: 3.505, year: 2021 },
      {
        month: "Jan",
        value: 3.5,
        year: 2022,
      },
      { month: "Feb", value: 3.675, year: 2022 },
      { month: "Mar", value: 4.401, year: 2022 },
      { month: "Apr", value: 4.369, year: 2022 },
      { month: "May", value: 4.695, year: 2022 },
      { month: "Jun", value: 5.149, year: 2022 },
      { month: "Jul", value: 4.798, year: 2022 },
      { month: "Aug", value: 4.205, year: 2022 },
      { month: "Sep", value: 3.99, year: 2022 },
      {
        month: "Oct",
        value: 4.13,
        year: 2022,
      },
      {
        month: "Nov",
        value: 3.958,
        year: 2022,
      },
      {
        month: "Dec",
        value: 3.459,
        year: 2022,
      },
    ]),
  }),
});
if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(useGasolineAllTypesDataStore, import.meta.hot)
  );
