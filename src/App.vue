<template>
  <div class="home">
    <search-route-form :busStops="busLineManager.getBusStops()" @search="calculateRoute"></search-route-form>
    <br/>
    <show-route-not-found v-if="routeNotFound" v-bind:route="routeNotFound"></show-route-not-found>
    <show-route v-if="foundRoute" v-bind:route="foundRoute"></show-route>

    <hr>
    <list-bus-lines v-bind:busLines="busLineManager.getBusLines()"></list-bus-lines>
    <list-bus-stop-travel-times v-bind:roads="busLineManager.getRoads()"></list-bus-stop-travel-times>

  </div>

</template>

<script>
  import busLineManager from './store'
  
  import SearchRouteForm from './components/search-route-form'
  import ShowRoute from './components/show-route'
  import ListBusLines from './components/list-bus-lines'
  import ListBusStopTravelTimes from "./COMPONENTS/list-bus-stop-travel-times"
  import ShowRouteNotFound from "./components/show-route-not-found";
  
  export default {
    name: "Home",
    components: {
      SearchRouteForm,
      ShowRouteNotFound,
      ListBusStopTravelTimes,
      ShowRoute,
      ListBusLines
    },
    data() {
      return {
        busLineManager,
        foundRoute: null,
        routeNotFound: null
      };
    },
    methods: {
      calculateRoute(formData) {
        if (formData.fromStop === formData.toStop) {
          return
        }
        this.routeNotFound = null
        this.foundRoute = null
        try {
          const solver = busLineManager.getRouteSolver(formData.useBiDirectionalLines)
          
          const route = solver.findShortestPathBetween(
                  formData.fromStop,
                  formData.toStop
          );

          this.foundRoute = route.getAsSimpleArray();
        } catch (e) {
          this.routeNotFound = {from: this.fromStop, to: this.toStop}
        }
      }
    }
  };
</script>
