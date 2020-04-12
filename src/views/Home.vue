<template>
  <div class="home">
    <form v-on:submit.prevent="calculateRoute">
      <label for="fromStop">Lähtö</label><br />
      <select v-model="fromStop" id="fromStop">
        <option disabled value>Mistä lähdetään?</option>
        <option v-for="stop in busStops" v-bind:key="stop.name">{{stop.name}}</option>
      </select>
      <br />
      <label for="toStop">Määränpää</label><br />
      <select v-model="toStop">
        <option disabled value>Minne mennään?</option>
        <option v-for="stop in busStops" v-bind:key="stop.name">{{stop.name}}</option>
      </select>
      <br />
      <input type="submit" value="Laske reitti" />
    </form>
    <br />

    <div class="result-view" v-if="result">
      <div>Reitti selvä!</div>
      <div>Etapit:</div>
      <ul>
        <li
          v-for="(step, index) in result"
          v-bind:key="index"
        >Pysäkiltä {{step.from}} pysäkille {{step.to}} käyttäen linjaa '{{step.with}}' ({{step.travelTime}} aikayksikköä)</li>
      </ul>
      <div>Aikaa tulee kuluman {{sumTotalTravelTime(result)}} aikayksikköä</div>
    </div>
  </div>

</template>

<script>
import store from "../store";
export default {
  name: "Home",
  data() {
    return {
      busStops: store.state.busLineManager.getBusStops(),
      fromStop: null,
      toStop: null,
      result: null
    };
  },
  methods: {
    calculateRoute() {
      let route = store.state.busLineManager.getRouteSolver().findShortestPathBetween(
        this.fromStop,
        this.toStop
      );
      this.result = route.getClearLanguageObject();
    },
    sumTotalTravelTime(route) {
      let sum = 0;
      route.forEach(step => {
        sum += step.travelTime;
      });
      return sum;
    }
  }
};
</script>
