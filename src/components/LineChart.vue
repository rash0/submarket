<template>
    <div class="container m-auto mt-6 border-red-700 border-2" style="width: 800px">
        <canvas id="StockChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'LineChart',
    props:{
        chartArray: Array
    },
    data(){
        return {
            charty: this.chartArray
        }
    },
    computed:{
        getChart() {
            const LineChart = new Chart(
                document.getElementById('StockChart'),
                {
                type: 'line',
                data: {
                    labels: this.charty.map(row => row.day),
                    datasets: [
                    {
                        label: '',
                        data: this.charty.map(row => row.price)
                    }
                    ]
                }
                }
            )
            return LineChart;
            }
    }
}
</script>