import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useBaconDataStore = defineStore({
  id: "useBaconDataStore",
  state: () => ({
    catalog: ref({
      item: "Bacon, sliced per lb.",
      area: "U.S. city average",
      shortName: "bacon",
      emoji: "🥓",
    }),
    data: ref([
      {
        month: "Dec",
        value: 5.502,
        year: 2018,
      },
      {
        month: "Jan",
        value: 5.518,
        year: 2019,
      },
      {
        month: "Feb",
        value: 5.502,
        year: 2019,
      },
      {
        month: "Mar",
        value: 5.608,
        year: 2019,
      },
      {
        month: "Apr",
        value: 5.552,
        year: 2019,
      },
      {
        month: "May",
        value: 5.812,
        year: 2019,
      },
      {
        month: "Jun",
        value: 5.878,
        year: 2019,
      },
      {
        month: "Jul",
        value: 5.701,
        year: 2019,
      },
      {
        month: "Aug",
        value: 5.576,
        year: 2019,
      },
      {
        month: "Sep",
        value: 5.571,
        year: 2019,
      },
      {
        month: "Oct",
        value: 5.653,
        year: 2019,
      },
      {
        month: "Nov",
        value: 5.505,
        year: 2019,
      },
      {
        month: "Dec",
        value: 5.474,
        year: 2019,
      },
      {
        month: "Jan",
        value: 5.505,
        year: 2020,
      },
      {
        month: "Feb",
        value: 5.497,
        year: 2020,
      },
      {
        month: "Mar",
        value: 5.257,
        year: 2020,
      },
      {
        month: "Apr",
        value: 5.346,
        year: 2020,
      },
      {
        month: "May",
        value: 5.348,
        year: 2020,
      },
      {
        month: "Jun",
        value: 5.772,
        year: 2020,
      },
      {
        month: "Jul",
        value: 5.776,
        year: 2020,
      },
      {
        month: "Aug",
        value: 5.559,
        year: 2020,
      },
      {
        month: "Sep",
        value: 5.619,
        year: 2020,
      },
      {
        month: "Oct",
        value: 5.722,
        year: 2020,
      },
      {
        month: "Nov",
        value: 5.754,
        year: 2020,
      },
      {
        month: "Dec",
        value: 5.831,
        year: 2020,
      },
      {
        month: "Jan",
        value: 5.831,
        year: 2021,
      },
      {
        month: "Feb",
        value: 5.778,
        year: 2021,
      },
      {
        month: "Mar",
        value: 5.852,
        year: 2021,
      },
      {
        month: "Apr",
        value: 6.215,
        year: 2021,
      },
      {
        month: "May",
        value: 6.346,
        year: 2021,
      },
      {
        month: "Jun",
        value: 6.67,
        year: 2021,
      },
      {
        month: "Jul",
        value: 6.857,
        year: 2021,
      },
      {
        month: "Aug",
        value: 7.096,
        year: 2021,
      },
      {
        month: "Sep",
        value: 7.22,
        year: 2021,
      },
      {
        month: "Oct",
        value: 7.317,
        year: 2021,
      },
      {
        month: "Nov",
        value: 7.265,
        year: 2021,
      },
      {
        month: "Dec",
        value: 7.211,
        year: 2021,
      },
      {
        month: "Jan",
        value: 7.222,
        year: 2022,
      },
      {
        month: "Feb",
        value: 7.097,
        year: 2022,
      },
      {
        month: "Mar",
        value: 7.203,
        year: 2022,
      },
      {
        month: "Apr",
        value: 7.422,
        year: 2022,
      },
      {
        month: "May",
        value: 7.364,
        year: 2022,
      },
      {
        month: "Jun",
        value: 7.403,
        year: 2022,
      },
      {
        month: "July",
        value: 7.415,
        year: 2022,
      },
      {
        month: "Aug",
        value: 7.372,
        year: 2022,
      },
      {
        month: "Sept",
        value: 7.383,
        year: 2022,
      },
      {
        month: "Oct",
        value: 7.608,
        year: 2022,
      },
      {
        month: "Nov",
        value: 7.243,
        year: 2022,
      },
      {
        month: "Dec",
        value: 6.956,
        year: 2022,
      },
    ]),
  }),
});
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBaconDataStore, import.meta.hot));
