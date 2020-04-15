<template>
  <div class="container mx-auto px-5 my-5">
    <div class="grid grid-cols-3 ">
      <div>
        <search-route-form :busStops="busLineManager.getBusStops()" @search="calculateRoute"></search-route-form>
        
        <show-route-not-found v-if="routeNotFound" v-bind:route="routeNotFound"></show-route-not-found>
        <show-route v-if="foundRoute" v-bind:route="foundRoute"></show-route>
      </div>
      <div class="bg-white shadow-md rounded mx-4 px-8 pt-6 pb-8 mb-4">
        <list-bus-lines v-bind:busLines="busLineManager.getBusLines()"></list-bus-lines>
      </div>
      <div class="bg-white shadow-md rounded mx-4 px-8 pt-6 pb-8 mb-4">
        <list-bus-stop-travel-times v-bind:roads="busLineManager.getRoads()"></list-bus-stop-travel-times>
      </div>
    </div>
  </div>
</template>

<script>
  import busLineManager from './store'
  
  import SearchRouteForm from './components/search-route-form'
  import ShowRoute from './components/show-route'
  import ListBusLines from './components/list-bus-lines'
  import ListBusStopTravelTimes from "./components/list-bus-stop-travel-times"
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
          this.routeNotFound = {from: formData.fromStop, to: formData.toStop}
        }
      }
    }
  };
</script>
