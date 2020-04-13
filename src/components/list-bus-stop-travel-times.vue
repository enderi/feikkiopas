<template>
<div>
    <h3>Pysäkkien välien kestot</h3>
    <div v-for="(road, index) in roads" v-bind:key="index">
        {{road.from.name}} => {{road.to.name}} = {{road.travelTime}} yksikköä

    </div>
</div>
</template>

<script>
    export default {
        name: 'list-bus-stop-travel-times',
        props: ['roads']
    }
</script>