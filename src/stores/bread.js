import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useBreadDataStore = defineStore({
  id: "useBreadDataStore",
  state: () => ({
    catalog: ref({
      item: "Bread, white, pan, per lb.",
      area: "U.S. city average",
      shortName: "bread",
      emoji: "🍞",
    }),
    data: ref([
      {
        month: "Dec",
        value: 1.29,
        year: 2018,
      },
      {
        month: "Jan",
        value: 1.274,
        year: 2019,
      },
      {
        month: "Feb",
        value: 1.282,
        year: 2019,
      },
      {
        month: "Mar",
        value: 1.261,
        year: 2019,
      },
      {
        month: "Apr",
        value: 1.285,
        year: 2019,
      },
      {
        month: "May",
        value: 1.289,
        year: 2019,
      },
      {
        month: "Jun",
        value: 1.28,
        year: 2019,
      },
      {
        month: "Jul",
        value: 1.281,
        year: 2019,
      },
      {
        month: "Aug",
        value: 1.275,
        year: 2019,
      },
      {
        month: "Sep",
        value: 1.296,
        year: 2019,
      },
      {
        month: "Oct",
        value: 1.325,
        year: 2019,
      },
      {
        month: "Nov",
        value: 1.361,
        year: 2019,
      },
      {
        month: "Dec",
        value: 1.363,
        year: 2019,
      },
      {
        month: "Jan",
        value: 1.351,
        year: 2020,
      },
      {
        month: "Feb",
        value: 1.375,
        year: 2020,
      },
      {
        month: "Mar",
        value: 1.374,
        year: 2020,
      },
      {
        month: "Apr",
        value: 1.406,
        year: 2020,
      },
      {
        month: "May",
        value: 1.412,
        year: 2020,
      },
      {
        month: "Jun",
        value: 1.474,
        year: 2020,
      },
      {
        month: "Jul",
        value: 1.485,
        year: 2020,
      },
      {
        month: "Aug",
        value: 1.495,
        year: 2020,
      },
      {
        month: "Sep",
        value: 1.492,
        year: 2020,
      },
      {
        month: "Oct",
        value: 1.503,
        year: 2020,
      },
      {
        month: "Nov",
        value: 1.515,
        year: 2020,
      },
      {
        month: "Dec",
        value: 1.538,
        year: 2020,
      },
      {
        month: "Jan",
        value: 1.546,
        year: 2021,
      },
      {
        month: "Feb",
        value: 1.537,
        year: 2021,
      },
      {
        month: "Mar",
        value: 1.526,
        year: 2021,
      },
      {
        month: "Apr",
        value: 1.51,
        year: 2021,
      },
      {
        month: "May",
        value: 1.511,
        year: 2021,
      },
      {
        month: "Jun",
        value: 1.51,
        year: 2021,
      },
      {
        month: "Jul",
        value: 1.491,
        year: 2021,
      },
      {
        month: "Aug",
        value: 1.467,
        year: 2021,
      },
      {
        month: "Sep",
        value: 1.58,
        year: 2021,
      },
      {
        month: "Oct",
        value: 1.526,
        year: 2021,
      },
      {
        month: "Nov",
        value: 1.547,
        year: 2021,
      },
      {
        month: "Dec",
        value: 1.532,
        year: 2021,
      },
      {
        month: "Jan",
        value: 1.555,
        year: 2022,
      },
      {
        month: "Feb",
        value: 1.578,
        year: 2022,
      },
      {
        month: "Mar",
        value: 1.607,
        year: 2022,
      },
      {
        month: "Apr",
        value: 1.612,
        year: 2022,
      },
      {
        month: "May",
        value: 1.606,
        year: 2022,
      },
      {
        month: "Jun",
        value: 1.691,
        year: 2022,
      },
      {
        month: "Jul",
        value: 1.715,
        year: 2022,
      },
      {
        month: "Aug",
        value: 1.756,
        year: 2022,
      },
      {
        month: "Sept",
        value: 1.749,
        year: 2022,
      },
      {
        month: "Oct",
        value: 1.814,
        year: 2022,
      },
      {
        month: "Nov",
        value: 1.847,
        year: 2022,
      },
      {
        month: "Dec",
        value: 1.873,
        year: 2022,
      },
    ]),
  }),
});
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBreadDataStore, import.meta.hot));
