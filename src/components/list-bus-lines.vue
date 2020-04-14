<template>
<div>
    <h3>Reitit</h3>
    <div v-for="(line, index) in busLines" v-bind:key="index">
        <div>Reitti '{{line.name}}':</div>
        <div>
                  <span v-for="(stop, index) in line.stops" v-bind:key="index">
                    {{stop.name}}
                      <span v-if="index < line.stops.length -1">
                        <span v-if="!biDirectional">=></span>
                        <span v-if="biDirectional">
                            &lt;=>
                        </span>
                      </span>
                  </span>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'list-bus-lines',
        props: ['busLines', 'biDirectional']
    }
</script>