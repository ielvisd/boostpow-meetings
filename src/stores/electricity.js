import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useElectricityDataStore = defineStore({
  id: "useElectricityDataStore",
  state: () => ({
    catalog: ref({
      item: "Electricity per KWH",
      area: "U.S. city average",
      shortName: "electricity",
      emoji: "💡",
    }),
    data: ref([
      { month: "Dec", value: 0.135, year: 2018 },
      { month: "Jan", value: 0.135, year: 2019 },
      { month: "Feb", value: 0.136, year: 2019 },
      { month: "Mar", value: 0.135, year: 2019 },
      { month: "Apr", value: 0.135, year: 2019 },
      { month: "May", value: 0.136, year: 2019 },
      { month: "Jun", value: 0.139, year: 2019 },
      {
        month: "Jul",
        value: 0.14,
        year: 2019,
      },
      { month: "Aug", value: 0.139, year: 2019 },
      { month: "Sep", value: 0.139, year: 2019 },
      { month: "Oct", value: 0.136, year: 2019 },
      { month: "Nov", value: 0.133, year: 2019 },
      { month: "Dec", value: 0.133, year: 2019 },
      { month: "Jan", value: 0.134, year: 2020 },
      { month: "Feb", value: 0.134, year: 2020 },
      { month: "Mar", value: 0.134, year: 2020 },
      { month: "Apr", value: 0.133, year: 2020 },
      { month: "May", value: 0.134, year: 2020 },
      { month: "Jun", value: 0.137, year: 2020 },
      { month: "Jul", value: 0.137, year: 2020 },
      { month: "Aug", value: 0.137, year: 2020 },
      { month: "Sep", value: 0.137, year: 2020 },
      { month: "Oct", value: 0.135, year: 2020 },
      { month: "Nov", value: 0.136, year: 2020 },
      { month: "Dec", value: 0.136, year: 2020 },
      { month: "Jan", value: 0.136, year: 2021 },
      { month: "Feb", value: 0.137, year: 2021 },
      { month: "Mar", value: 0.138, year: 2021 },
      { month: "Apr", value: 0.139, year: 2021 },
      {
        month: "May",
        value: 0.14,
        year: 2021,
      },
      { month: "Jun", value: 0.142, year: 2021 },
      { month: "Jul", value: 0.143, year: 2021 },
      { month: "Aug", value: 0.144, year: 2021 },
      { month: "Sep", value: 0.144, year: 2021 },
      { month: "Oct", value: 0.142, year: 2021 },
      { month: "Nov", value: 0.142, year: 2021 },
      { month: "Dec", value: 0.142, year: 2021 },
      { month: "Jan", value: 0.147, year: 2022 },
      { month: "Feb", value: 0.148, year: 2022 },
      {
        month: "Mar",
        value: 0.15,
        year: 2022,
      },
      { month: "Apr", value: 0.151, year: 2022 },
      { month: "May", value: 0.154, year: 2022 },
      {
        month: "Jun",
        value: 0.16,
        year: 2022,
      },
      {
        month: "Jul",
        value: 0.166,
        year: 2022,
      },
      { month: "Aug", value: 0.167, year: 2022 },
      { month: "Sep", value: 0.167, year: 2022 },
      {
        month: "Oct",
        value: 0.166,
        year: 2022,
      },
      {
        month: "Nov",
        value: 0.163,
        year: 2022,
      },
      {
        month: "Dec",
        value: 0.165,
        year: 2022,
      },
    ]),
  }),
});
if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(useElectricityDataStore, import.meta.hot)
  );
