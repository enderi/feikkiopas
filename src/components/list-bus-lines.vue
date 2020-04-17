<template>
  <div>
    <h3 class="text-xl underline pb-3">Linjastot</h3>
    <div v-for="(line, index) in busLines" v-bind:key="index">
      <div class="text-lg">'{{ line.name }}':</div>
      <div>
        <span class="text-sm" v-for="(stop, index) in line.stops" v-bind:key="index">
          {{ stop.name }}
          <span v-if="index < line.stops.length - 1">-</span>
        </span>
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-bus-lines",
  props: ["busLines"]
};
</script>
