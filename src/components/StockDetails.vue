<template>
    <div>
        <p class="text-xs">{{ detailname }}</p>
        <p class="text-base font-semibold">{{ detailsNum }}</p>
    </div>
</template>

<script>
export default {
    name: 'StockDetails',
    props:{
        detailname: String,
        detailsNum: String
    },
}
</script>