<template>
  <div class="container bg-blue-100 rounded-xl shadow border p-4 mx-auto mb-12">
    <p class="text-3xl text-gray-700 font-light mb-5">
      Stock Prices
    </p>
    <div class="flex rounded-md">
      <input v-model="stockName" class="rounded-md pl-2 ml-auto border-gray-200 shadow-sm sm:text-sm" />
      <button class="rounded-md mr-auto ml-2 px-3 py-1 text-xl text-blue-100 transition-colors duration-300 bg-blue-500 shadow-xl hover:bg-blue-600" @click="fetchData">+</button>
    </div>
    <!-- <LoadingSpinner v-if="!isLoading"/> -->
    <!-- <p v-if="errorMsg !== '' ">{{ errorMsg }}</p> -->
    <div class="footer my-12" v-if="stockPrice !== ''">
      <div class="stock-head container mb-3">
        <p>{{ stockName.toUpperCase() }}</p>
        <p :class="[isHigher , 'text-2xl font-bold']">
          {{ stockPrice }}
        </p>
      </div>
      <div class="stock-footer grid grid-cols-4 px-64">
        <StockDetails detailname="Open" :detailsNum="openNum"/>
        <StockDetails detailname="Close" :detailsNum="closeNum"/>
        <StockDetails detailname="High" :detailsNum="highNum"/>
        <StockDetails detailname="Low" :detailsNum="lowNum"/>
      </div>
    </div>
    <div class="container m-auto mt-6" style="width: 800px">
      <canvas id="StockChart"></canvas>
    </div>
 </div>
</template>

<script>
import StockDetails from '@/components/StockDetails.vue';
const axios = require('axios');
import Chart from 'chart.js/auto';

// put the API key in file seprate
const APIKEY = 'XUDPEUZ51PPCFW5Y'

export default {
  name: 'StockView',
  components: {
    StockDetails
},
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
        let result = res.data['Time Series (Daily)'];
        
        let newResult = Object.values(result)[0]
        this.stockPrice = Object.values(newResult)[3]

        this.openNum = Object.values(newResult)[0]
        this.highNum = Object.values(newResult)[1]
        this.lowNum = Object.values(newResult)[2]
        this.closeNum = Object.values(newResult)[3]
        // get chart data
        for(let i = 0; i < 16; i++){
          let day = Object.keys(result)[i]
          let price = Object.values(Object.values(result)[i])[3]
          this.chartData.push({'day': day, 'price': Number(price)})
        }
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
