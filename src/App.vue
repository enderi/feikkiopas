<template>
  <div class="home">
    <div>
      <h3>Hae reitti</h3>
      <form v-on:submit.prevent="calculateRoute">
        <label for="fromStop">Lähtö</label><br/>
        <select v-model="fromStop" id="fromStop">
          <option disabled value>Mistä lähdetään?</option>
          <option v-for="stop in busStops" v-bind:key="stop.name">{{stop.name}}</option>
        </select>
        <br/>
        <label for="toStop">Määränpää</label><br/>
        <select v-model="toStop" id="toStop">
          <option disabled value>Minne mennään?</option>
          <option v-for="stop in busStops" v-bind:key="stop.name">{{stop.name}}</option>
        </select>
        <br/>
        <input type="checkbox" id="biDirectionalCheckbox" value="Kahdensuuntaiset reitit" v-model="useBiDirectionalLines">
        <label for="biDirectionalCheckbox">Kahdensuuntaiset reitit</label><br>
        <input type="submit" value="Laske reitti"/>
      </form>
    </div>
    <br/>

    <show-route-not-found v-if="routeNotFound" v-bind:route="routeNotFound"></show-route-not-found>
    <show-route v-if="foundRoute" v-bind:route="foundRoute"></show-route>

    <hr>
    <list-bus-lines v-bind:busLines="busLines" v-bind:biDirectional="useBiDirectionalLines"></list-bus-lines>
    <list-bus-stop-travel-times v-bind:roads="roads"></list-bus-stop-travel-times>

  </div>

</template>

<script>
  import ReittiData from './data/reittiopas.json'
  import BusLineManager from './services/bus-line-manager'
  import ShowRoute from './components/show-route'
  import ListBusLines from './components/list-bus-lines'
  import ListBusStopTravelTimes from "./components/list-bus-stop-travel-times"
  import ShowRouteNotFound from "./components/show-route-not-found";
  const busLineManager = new BusLineManager()

  // initializing with given data set
  ReittiData.pysakit.forEach(pysakki => {
    busLineManager.addBusStop(pysakki)
  })

  ReittiData.tiet.forEach(tie => {
    busLineManager.addRoadBetweenStops(tie.mista, tie.mihin, tie.kesto)
  })

  Object.keys(ReittiData.linjastot).forEach(linjastoNimi =>{
    busLineManager.addBusLine(linjastoNimi,  ReittiData.linjastot[linjastoNimi])
  })
  export default {
    name: "Home",
    components: {
      ShowRouteNotFound,
      ListBusStopTravelTimes,
      ShowRoute,
      ListBusLines
    },
    data() {
      return {
        busStops: busLineManager.getBusStops(),
        roads: busLineManager.getRoads(),
        busLines: busLineManager.getBusLines(),
        distancesObj: null,
        fromStop: null,
        toStop: null,
        useBiDirectionalLines: true,
        foundRoute: null,
        routeNotFound: null
      };
    },
    mounted() {
      const distances = {}
      this.roads.forEach(road => {
        distances[road.from.name] = distances[road.from.name] || {}
        distances[road.to.name] = distances[road.to.name] || {}
        distances[road.from.name][road.to.name] = road.travelTime
        distances[road.to.name][road.from.name] = road.travelTime
      })
      this.distancesObj = distances
    },
    methods: {
      calculateRoute() {
        if (this.fromStop === this.toStop) {
          return
        }
        this.routeNotFound = null
        this.foundRoute = null
        try {
          const solver = busLineManager.getRouteSolver(this.useBiDirectionalLines)
          
          const route = solver.findShortestPathBetween(
                  this.fromStop,
                  this.toStop
          );

          this.foundRoute = route.getAsSimpleArray();
        } catch (e) {
          this.routeNotFound = {from: this.fromStop, to: this.toStop}
        }
      }
    }
  };
</script>
