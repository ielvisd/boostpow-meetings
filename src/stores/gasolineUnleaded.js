import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useGasolineUnleadedDataStore = defineStore({
  id: "useGasolineUnleadedDataStore",
  state: () => ({
    catalog: ref({
      item: "Gasoline, unleaded regular, per gallon",
      area: "U.S. city average",
      shortName: "gasoline-unleaded",
      emoji: "⛽",
    }),
    data: ref([
      { month: "Dec", value: 2.414, year: 2018 },
      { month: "Jan", value: 2.289, year: 2019 },
      { month: "Feb", value: 2.353, year: 2019 },
      { month: "Mar", value: 2.564, year: 2019 },
      { month: "Apr", value: 2.835, year: 2019 },
      { month: "May", value: 2.901, year: 2019 },
      { month: "Jun", value: 2.752, year: 2019 },
      { month: "Jul", value: 2.776, year: 2019 },
      { month: "Aug", value: 2.655, year: 2019 },
      {
        month: "Sep",
        value: 2.63,
        year: 2019,
      },
      { month: "Oct", value: 2.673, year: 2019 },
      {
        month: "Nov",
        value: 2.62,
        year: 2019,
      },
      { month: "Dec", value: 2.587, year: 2019 },
      { month: "Jan", value: 2.567, year: 2020 },
      { month: "Feb", value: 2.465, year: 2020 },
      { month: "Mar", value: 2.267, year: 2020 },
      { month: "Apr", value: 1.876, year: 2020 },
      { month: "May", value: 1.879, year: 2020 },
      { month: "Jun", value: 2.076, year: 2020 },
      { month: "Jul", value: 2.176, year: 2020 },
      { month: "Aug", value: 2.177, year: 2020 },
      { month: "Sep", value: 2.193, year: 2020 },
      { month: "Oct", value: 2.159, year: 2020 },
      {
        month: "Nov",
        value: 2.09,
        year: 2020,
      },
      { month: "Dec", value: 2.168, year: 2020 },
      { month: "Jan", value: 2.326, year: 2021 },
      { month: "Feb", value: 2.496, year: 2021 },
      { month: "Mar", value: 2.791, year: 2021 },
      { month: "Apr", value: 2.839, year: 2021 },
      { month: "May", value: 2.972, year: 2021 },
      { month: "Jun", value: 3.154, year: 2021 },
      { month: "Jul", value: 3.233, year: 2021 },
      { month: "Aug", value: 3.255, year: 2021 },
      { month: "Sep", value: 3.265, year: 2021 },
      { month: "Oct", value: 3.385, year: 2021 },
      { month: "Nov", value: 3.482, year: 2021 },
      { month: "Dec", value: 3.408, year: 2021 },
      { month: "Jan", value: 3.413, year: 2022 },
      { month: "Feb", value: 3.592, year: 2022 },
      { month: "Mar", value: 4.312, year: 2022 },
      { month: "Apr", value: 4.271, year: 2022 },
      { month: "May", value: 4.604, year: 2022 },
      {
        month: "Jun",
        value: 5.058,
        year: 2022,
      },
      {
        month: "Jul",
        value: 4.667,
        year: 2022,
      },
      { month: "Aug", value: 4.101, year: 2022 },
      { month: "Sept", value: 3.881, year: 2022 },
      {
        month: "Oct",
        value: 4.13,
        year: 2022,
      },
      {
        month: "Nov",
        value: 3.853,
        year: 2022,
      },
      {
        month: "Dec",
        value: 3.356,
        year: 2022,
      },
    ]),
  }),
});
if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(useGasolineUnleadedDataStore, import.meta.hot)
  );
