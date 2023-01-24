<template>
  <div class="container bg-blue-100 rounded-xl shadow border p-8 m-10">
    <p class="text-3xl text-gray-700 font-bold mb-5">
      Stock Prices
    </p>
    <div class="flex rounded-md">
      <input v-model="stockName" class="rounded-md pl-2 ml-auto border-gray-200 shadow-sm sm:text-sm" />
      <button class="rounded-md mr-auto ml-2 px-3 py-1 text-xl text-blue-100 transition-colors duration-300 bg-blue-500 shadow-xl hover:bg-blue-600" @click="fetchData">+</button>
    </div>
    <!-- <LoadingSpinner v-if="!isLoading"/> -->
    <!-- <p v-if="errorMsg !== '' ">{{ errorMsg }}</p> -->
    <div class="footer" v-if="stockPrice !== ''">
      <div class="stock-head container my-3">
        <p>{{ stockName.toUpperCase() }}</p>
        <p :class="[isHigher , 'text-2xl font-bold']">
          {{ stockPrice }}
        </p>
      </div>
      <div class="stock-footer grid grid-cols-4">
        <div>
          <p class="text-xs">Open</p>
          <p class="text-base font-semibold">{{ openNum }}</p>
        </div>
        <div>
          <p class="text-xs">Close</p>
          <p class="text-base font-semibold">{{ closeNum }}</p>
        </div>
        <div>
          <p class="text-xs">High</p>
          <p class="text-base font-semibold">{{ highNum }}</p>
        </div>
        <div>
          <p class="text-xs">Low</p>
          <p class="text-base font-semibold">{{ lowNum }}</p>
        </div>
      </div>
    </div>
    <div class="container" style="width: 800px">
      <canvas id="StockChart"></canvas>
    </div>
 </div>
</template>

<script>
// import LoadingSpinner from './LoadingSpinner.vue';
const axios = require('axios');
import Chart from 'chart.js/auto';

// put the API key in file seprate
const APIKEY = 'XUDPEUZ51PPCFW5Y'

export default {
  name: 'StockView',
  // components: {
  //   LoadingSpinner
  // },
  data(){
    return {
      // isLoading: false,
      errorMsg: '',
      chartData: [],
      stockName: 'IBM',
      stockPrice: '',
      openNum: '',
      closeNum: '',
      highNum: '',
      lowNum: ''
    }
  },
  computed:{
    isHigher(){
      return (this.stockPrice > this.openNum) ? 'highClass':'lowClass';
    }
  },
  methods:{
    fetchData() {
      axios
      .get('https://www.alphavantage.co/query?',{
        params: { function: 'TIME_SERIES_DAILY_ADJUSTED', 
        symbol: this.stockName,
        apikey: APIKEY}
      })
      .then(res => {
        this.chartData = []
        // this.getChart()
        // this.isLoading = true;
        // catch error if wrong api name by using if
        let result = res.data['Time Series (Daily)'];
        
        let newResult = Object.values(result)[0]
        this.stockPrice = Object.values(newResult)[3]

        this.openNum = Object.values(newResult)[0]
        this.highNum = Object.values(newResult)[1]
        this.lowNum = Object.values(newResult)[2]
        this.closeNum = Object.values(newResult)[3]
        // console.log(res.data['Time Series (Daily)'])
        // get chart data
        for(let i = 0; i < 16; i++){
          let day = Object.keys(result)[i]
          let price = Object.values(Object.values(result)[i])[3]
          this.chartData.push({'day': day, 'price': Number(price)})
        }
        // this.getChart()
      })
      .catch(() => this.errorMsg = 'This is a wrong stock')
      .then(() => this.getChart())
    },
    getChart() {
      const LineChart = new Chart(
        document.getElementById('StockChart'),
        {
          type: 'line',
          data: {
            labels: this.chartData.map(row => row.day),
            datasets: [
              {
                label: '',
                data: this.chartData.map(row => row.price)
              }
            ]
          }
        }
      )
      return LineChart;
    }
  },
  mounted(){
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.highClass{
  color: #42b983;
}
.lowClass{
  color: red;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
