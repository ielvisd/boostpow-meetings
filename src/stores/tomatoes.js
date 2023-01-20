import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useTomatoesDataStore = defineStore({
  id: "useTomatoesDataStore",
  state: () => ({
    catalog: ref({
      item: "Tomatoes, field grown, per lb.",
      area: "U.S. city average",
      shortName: "tomatoes",
      emoji: "🍅",
    }),
    data: ref([
      { month: "Dec", value: 2.175, year: 2018 },
      { month: "Jan", value: 2.227, year: 2019 },
      { month: "Feb", value: 2.068, year: 2019 },
      { month: "Mar", value: 2.079, year: 2019 },
      { month: "Apr", value: 1.947, year: 2019 },
      { month: "May", value: 1.823, year: 2019 },
      { month: "Jun", value: 1.812, year: 2019 },
      { month: "Jul", value: 1.799, year: 2019 },
      { month: "Aug", value: 1.864, year: 2019 },
      { month: "Sep", value: 1.911, year: 2019 },
      { month: "Oct", value: 1.779, year: 2019 },
      { month: "Nov", value: 1.903, year: 2019 },
      { month: "Dec", value: 1.954, year: 2019 },
      { month: "Jan", value: 2.221, year: 2020 },
      { month: "Feb", value: 2.197, year: 2020 },
      { month: "Mar", value: "", year: 2020 },
      { month: "Apr", value: "", year: 2020 },
      { month: "May", value: 1.851, year: 2020 },
      { month: "Jun", value: 1.922, year: 2020 },
      { month: "Jul", value: 1.977, year: 2020 },
      { month: "Aug", value: 1.874, year: 2020 },
      { month: "Sep", value: 1.847, year: 2020 },
      { month: "Oct", value: 1.911, year: 2020 },
      { month: "Nov", value: 1.935, year: 2020 },
      { month: "Dec", value: 1.893, year: 2020 },
      { month: "Jan", value: 1.928, year: 2021 },
      { month: "Feb", value: 1.838, year: 2021 },
      { month: "Mar", value: 1.768, year: 2021 },
      { month: "Apr", value: 1.786, year: 2021 },
      { month: "May", value: 1.804, year: 2021 },
      { month: "Jun", value: 1.83, year: 2021 },
      { month: "Jul", value: 1.827, year: 2021 },
      { month: "Aug", value: 1.858, year: 2021 },
      { month: "Sep", value: 1.828, year: 2021 },
      { month: "Oct", value: 1.892, year: 2021 },
      { month: "Nov", value: 1.924, year: 2021 },
      { month: "Dec", value: 1.906, year: 2021 },
      { month: "Jan", value: 1.892, year: 2022 },
      { month: "Feb", value: 1.826, year: 2022 },
      { month: "Mar", value: 1.827, year: 2022 },
      { month: "Apr", value: 1.794, year: 2022 },
      { month: "May", value: 1.819, year: 2022 },
      {
        month: "Jun",
        value: 1.842,
        year: 2022,
      },
      {
        month: "Jul",
        value: 1.842,
        year: 2022,
      },
      { month: "Aug", value: 1.89, year: 2022 },
      { month: "Sept", value: 1.901, year: 2022 },
      {
        month: "Oct",
        value: 1.974,
        year: 2022,
      },
      {
        month: "Nov",
        value: 2.107,
        year: 2022,
      },
      {
        month: "Dec",
        value: 2.228,
        year: 2022,
      },
    ]),
  }),
});
if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(useTomatoesDataStore, import.meta.hot)
  );
