<template>
    <div class="mb-12">
        <p class="text-3xl text-gray-700 font-light mb-5">Exchange Rate</p>
        <p class="text-3xl font-semibold">{{ exRate }}
          <span class="text-xs font-light">{{ resultCurrency }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'currencyResult',
    props:{
        exRate: Number,
        resultCurrency: String
    }
}
</script>