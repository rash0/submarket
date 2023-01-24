<template>
  <div class="container bg-red-100 rounded-xl shadow border p-4 mx-auto mb-12">
    <currencyResult :exRate="exRate" :resultCurrency="resultCurrency"/>
    <div class="container">
      <input v-model="fromCurrency" class="rounded-md py-1 pl-2 ml-auto border-gray-200 shadow-sm sm:text-sm" />
      <input v-model="toCurrency" class="rounded-md py-1 pl-2 ml-6 border-gray-200 shadow-sm sm:text-sm" />
    </div>
    <button class="rounded-md mr-auto ml-2 mt-4 px-6 py-1 text-lg text-red-100 transition-colors duration-300 bg-red-500 shadow-xl hover:bg-red-600" @click="fetchData">Convert</button>
  </div>
</template>

<script>
import currencyResult from '@/components/currencyResult.vue';
const axios = require('axios');

const APIKEY = 'XUDPEUZ51PPCFW5Y'

export default {
  name: 'FxView',
  components:{
    currencyResult
  },
  data(){
    return {
      exRate: 0,
      resultCurrency: 'EGP',
      fromCurrency: 'USD',
      toCurrency: 'EGP',
    }
  },
  methods:{
    fetchData() {
      axios
      .get('https://www.alphavantage.co/query?',{
        params: { function: 'CURRENCY_EXCHANGE_RATE', 
        from_currency: this.fromCurrency,
        to_currency: this.toCurrency,
        apikey: APIKEY}
      })
      .then(res => {
        let result = res.data['Realtime Currency Exchange Rate']
        let rateValue = Object.values(result)[4]
        this.exRate = Math.round(rateValue * 100) / 100
        this.resultCurrency = Object.values(result)[2]
      })
      .catch(err => console.log(err))
    }
  },
  mounted(){
    this.fetchData()
  }
}
</script>
