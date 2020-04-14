<template>
  <div>
    <h3>Hae reitti</h3>
    <form v-on:submit.prevent="calculateRoute">
      <label for="fromStop">Lähtö</label>
      <br />
      <select v-model="formData.fromStop" id="fromStop">
        <option disabled value>Mistä lähdetään?</option>
        <option v-for="stop in busStops" v-bind:key="stop.name">{{stop.name}}</option>
      </select>
      <br />
      <label for="toStop">Määränpää</label>
      <br />
      <select v-model="formData.toStop" id="toStop">
        <option disabled value>Minne mennään?</option>
        <option v-for="stop in busStops" v-bind:key="stop.name">{{stop.name}}</option>
      </select>
      <br />
      <input
        type="checkbox"
        id="biDirectionalCheckbox"
        v-model="formData.useBiDirectionalLines"
      />
      <label for="biDirectionalCheckbox">Kahdensuuntaiset linjastot</label>
      <br />
      <input type="submit" value="Laske reitti" />
    </form>
  </div>
</template>

<script>
export default {
  name: "search-route-form",
  props: ["busStops"],
  data() {
    return {
      formData: {
        fromStop: null,
        toStop: null,
        useBiDirectionalLines: true
      }
    };
  },
  methods: {
    calculateRoute() {
      this.$emit("search", this.formData);
    }
  }
};
</script>