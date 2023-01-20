<template>
    <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        bsvDataMonthlyHistoricalPrice() {
            return this.bsvData.map((obj) => (obj.High + obj.Low) / 2);
        },
        bsvDataMonthlyHistoricalPriceLabels() {
            return this.bsvData.map((obj) => obj.Date);
        }
    },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            chartOptions: {
                responsive: true
            },
            bsvData: [
                {
                    "Date": "2018-12-01",
                    "Open": 95.110397,
                    "High": 134.587875,
                    "Low": 64.519569,
                    "Close": 84.956306,
                    "Adj Close": 84.956306,
                    "Volume": 3933121780
                },
                {
                    "Date": "2019-01-01",
                    "Open": 84.785568,
                    "High": 96.276894,
                    "Low": 61.98494,
                    "Close": 63.975952,
                    "Adj Close": 63.975952,
                    "Volume": 2288672815
                },
                {
                    "Date": "2019-02-01",
                    "Open": 64.062965,
                    "High": 75.903381,
                    "Low": 57.513218,
                    "Close": 67.315666,
                    "Adj Close": 67.315666,
                    "Volume": 2680394262
                },
                {
                    "Date": "2019-03-01",
                    "Open": 67.250298,
                    "High": 71.894714,
                    "Low": 62.983814,
                    "Close": 64.982018,
                    "Adj Close": 64.982018,
                    "Volume": 2940442207
                },
                {
                    "Date": "2019-04-01",
                    "Open": 64.971001,
                    "High": 95.136093,
                    "Low": 50.289795,
                    "Close": 54.193066,
                    "Adj Close": 54.193066,
                    "Volume": 4987101456
                },
                {
                    "Date": "2019-05-01",
                    "Open": 54.198193,
                    "High": 251.067413,
                    "Low": 51.774521,
                    "Close": 195.788086,
                    "Adj Close": 195.788086,
                    "Volume": 10488313573
                },
                {
                    "Date": "2019-06-01",
                    "Open": 195.776123,
                    "High": 255.881409,
                    "Low": 179.065582,
                    "Close": 194.203125,
                    "Adj Close": 194.203125,
                    "Volume": 17464324057
                },
                {
                    "Date": "2019-07-01",
                    "Open": 194.203125,
                    "High": 213.546188,
                    "Low": 106.70237,
                    "Close": 147.976563,
                    "Adj Close": 147.976563,
                    "Volume": 12298105102
                },
                {
                    "Date": "2019-08-01",
                    "Open": 148.032608,
                    "High": 160.492935,
                    "Low": 120.63102,
                    "Close": 129.413422,
                    "Adj Close": 129.413422,
                    "Volume": 9800867820
                },
                {
                    "Date": "2019-09-01",
                    "Open": 129.38591,
                    "High": 138.176636,
                    "Low": 70.976768,
                    "Close": 87.420975,
                    "Adj Close": 87.420975,
                    "Volume": 8942441764
                },
                {
                    "Date": "2019-10-01",
                    "Open": 87.472183,
                    "High": 150.129517,
                    "Low": 81.104912,
                    "Close": 129.789948,
                    "Adj Close": 129.789948,
                    "Volume": 13274575447
                },
                {
                    "Date": "2019-11-01",
                    "Open": 129.710205,
                    "High": 141.750702,
                    "Low": 89.447189,
                    "Close": 107.680237,
                    "Adj Close": 107.680237,
                    "Volume": 16671380050
                },
                {
                    "Date": "2019-12-01",
                    "Open": 107.6959,
                    "High": 107.700226,
                    "Low": 78.19146,
                    "Close": 97.078827,
                    "Adj Close": 97.078827,
                    "Volume": 12926100907
                },
                {
                    "Date": "2020-01-01",
                    "Open": 97.078827,
                    "High": 441.196564,
                    "Low": 92.114578,
                    "Close": 272.39621,
                    "Adj Close": 272.39621,
                    "Volume": 70563263336
                },
                {
                    "Date": "2020-02-01",
                    "Open": 272.911743,
                    "High": 379.498291,
                    "Low": 209.630844,
                    "Close": 212.291992,
                    "Adj Close": 212.291992,
                    "Volume": 77898424195
                },
                {
                    "Date": "2020-03-01",
                    "Open": 212.322708,
                    "High": 258.112885,
                    "Low": 88.071465,
                    "Close": 165.404602,
                    "Adj Close": 165.404602,
                    "Volume": 74100659748
                },
                {
                    "Date": "2020-04-01",
                    "Open": 165.404602,
                    "High": 226.782516,
                    "Low": 159.275253,
                    "Close": 208.301544,
                    "Adj Close": 208.301544,
                    "Volume": 70699378079
                },
                {
                    "Date": "2020-05-01",
                    "Open": 208.301544,
                    "High": 218.085083,
                    "Low": 174.880325,
                    "Close": 193.136215,
                    "Adj Close": 193.136215,
                    "Volume": 57709875515
                },
                {
                    "Date": "2020-06-01",
                    "Open": 193.129608,
                    "High": 207.659439,
                    "Low": 154.353745,
                    "Close": 158.150452,
                    "Adj Close": 158.150452,
                    "Volume": 35117807601
                },
                {
                    "Date": "2020-07-01",
                    "Open": 158.506104,
                    "High": 230.53093,
                    "Low": 151.935822,
                    "Close": 229.836899,
                    "Adj Close": 229.836899,
                    "Volume": 39356434995
                },
                {
                    "Date": "2020-08-01",
                    "Open": 229.836899,
                    "High": 252.975143,
                    "Low": 184.245056,
                    "Close": 192.845444,
                    "Adj Close": 192.845444,
                    "Volume": 34703251293
                },
                {
                    "Date": "2020-09-01",
                    "Open": 192.798553,
                    "High": 207.113968,
                    "Low": 143.527222,
                    "Close": 171.84967,
                    "Adj Close": 171.84967,
                    "Volume": 28231182746
                },
                {
                    "Date": "2020-10-01",
                    "Open": 171.817688,
                    "High": 184.540085,
                    "Low": 155.721451,
                    "Close": 164.869537,
                    "Adj Close": 164.869537,
                    "Volume": 25170690086
                },
                {
                    "Date": "2020-11-01",
                    "Open": 164.869537,
                    "High": 216.649689,
                    "Low": 146.683075,
                    "Close": 182.558167,
                    "Adj Close": 182.558167,
                    "Volume": 25293696473
                },
                {
                    "Date": "2020-12-01",
                    "Open": 182.587158,
                    "High": 195.894882,
                    "Low": 151.14624,
                    "Close": 163.632034,
                    "Adj Close": 163.632034,
                    "Volume": 17936882249
                },
                {
                    "Date": "2021-01-01",
                    "Open": 163.60524,
                    "High": 324.542206,
                    "Low": 158.522171,
                    "Close": 173.860458,
                    "Adj Close": 173.860458,
                    "Volume": 42236027836
                },
                {
                    "Date": "2021-02-01",
                    "Open": 173.856476,
                    "High": 282.137909,
                    "Low": 169.496109,
                    "Close": 177.448685,
                    "Adj Close": 177.448685,
                    "Volume": 39503338885
                },
                {
                    "Date": "2021-03-01",
                    "Open": 177.48114,
                    "High": 233.738754,
                    "Low": 176.156601,
                    "Close": 217.08876,
                    "Adj Close": 217.08876,
                    "Volume": 26549448537
                },
                {
                    "Date": "2021-04-01",
                    "Open": 217.09375,
                    "High": 491.635376,
                    "Low": 206.742355,
                    "Close": 323.670746,
                    "Adj Close": 323.670746,
                    "Volume": 59092953175
                },
                {
                    "Date": "2021-05-01",
                    "Open": 323.641663,
                    "High": 457.2388,
                    "Low": 129.340607,
                    "Close": 174.938431,
                    "Adj Close": 174.938431,
                    "Volume": 61384597932
                },
                {
                    "Date": "2021-06-01",
                    "Open": 174.916962,
                    "High": 191.480484,
                    "Low": 107.627602,
                    "Close": 146.908524,
                    "Adj Close": 146.908524,
                    "Volume": 24052134806
                },
                {
                    "Date": "2021-07-01",
                    "Open": 146.948868,
                    "High": 153.990097,
                    "Low": 111.814842,
                    "Close": 141.753128,
                    "Adj Close": 141.753128,
                    "Volume": 11886477043
                },
                {
                    "Date": "2021-08-01",
                    "Open": 141.620987,
                    "High": 213.438889,
                    "Low": 134.594116,
                    "Close": 169.164474,
                    "Adj Close": 169.164474,
                    "Volume": 12631307369
                },
                {
                    "Date": "2021-09-01",
                    "Open": 169.125488,
                    "High": 202.196945,
                    "Low": 118.884277,
                    "Close": 129.408997,
                    "Adj Close": 129.408997,
                    "Volume": 12262042882
                },
                {
                    "Date": "2021-10-01",
                    "Open": 129.445511,
                    "High": 185.218994,
                    "Low": 128.477753,
                    "Close": 165.510361,
                    "Adj Close": 165.510361,
                    "Volume": 9710947213
                },
                {
                    "Date": "2021-11-01",
                    "Open": 165.53743,
                    "High": 198.756165,
                    "Low": 141.976257,
                    "Close": 150.092392,
                    "Adj Close": 150.092392,
                    "Volume": 6489350436
                },
                {
                    "Date": "2021-12-01",
                    "Open": 149.958023,
                    "High": 175.417633,
                    "Low": 83.869843,
                    "Close": 121.182472,
                    "Adj Close": 121.182472,
                    "Volume": 12226159483
                },
                {
                    "Date": "2022-01-01",
                    "Open": 121.192055,
                    "High": 125.227592,
                    "Low": 84.059509,
                    "Close": 91.430992,
                    "Adj Close": 91.430992,
                    "Volume": 4024762049
                },
                {
                    "Date": "2022-02-01",
                    "Open": 91.432686,
                    "High": 105.770844,
                    "Low": 74.57016,
                    "Close": 88.384613,
                    "Adj Close": 88.384613,
                    "Volume": 2765445400
                },
                {
                    "Date": "2022-03-01",
                    "Open": 88.401993,
                    "High": 100.044998,
                    "Low": 74.26088,
                    "Close": 94.544815,
                    "Adj Close": 94.544815,
                    "Volume": 3986012091
                },
                {
                    "Date": "2022-04-01",
                    "Open": 94.562134,
                    "High": 101.380516,
                    "Low": 70.681259,
                    "Close": 71.376244,
                    "Adj Close": 71.376244,
                    "Volume": 3659153644
                },
                {
                    "Date": "2022-05-01",
                    "Open": 71.376503,
                    "High": 79.581696,
                    "Low": 45.68642,
                    "Close": 54.19136,
                    "Adj Close": 54.19136,
                    "Volume": 5548785079
                },
                {
                    "Date": "2022-06-01",
                    "Open": 54.197964,
                    "High": 67.164711,
                    "Low": 42.873867,
                    "Close": 55.416965,
                    "Adj Close": 55.416965,
                    "Volume": 3869954804
                },
                {
                    "Date": "2022-07-01",
                    "Open": 55.512878,
                    "High": 58.392479,
                    "Low": 51.446949,
                    "Close": 56.699348,
                    "Adj Close": 56.699348,
                    "Volume": 572284880
                }
            ]
        }
    }
}
</script>