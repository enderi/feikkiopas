<template>
  <div class="container font-mono mx-auto my-5 px-5 py-5 bg-gray-100">
    <div class="text-4xl font-bold text-gray-700 ml-4 my-4">Reittiopas</div>
    <div class="grid md:grid-cols-2">
      <div class="bg-white shadow-md rounded mx-4 px-8 pt-6 pb-8 mb-4">
        <search-route-form :busStops="busLineManager.getBusStops()" @search="calculateRoute"></search-route-form>
        <show-route-not-found class="mt-4" v-if="routeNotFound" v-bind:route="routeNotFound"></show-route-not-found>
        <hr class="my-4" />
        <list-bus-lines v-bind:busLines="busLineManager.getBusLines()"></list-bus-lines>
      </div>
      <div class="bg-white shadow-md rounded mx-4 px-8 pt-6 pb-8 mb-4" v-if="foundRoute">
        <show-route v-if="foundRoute" v-bind:route="foundRoute"></show-route>
      </div>
    </div>
    <div class="text-right">
      <a
        class="text-blue-900 hover:text-blue-600 mr-4"
        href="https://github.com/enderi/feikkiopas/"
      >Github</a>
    </div>
  </div>
</template>

<script>
import busLineManager from "./store";

import SearchRouteForm from "./components/search-route-form";
import ShowRoute from "./components/show-route";
import ListBusLines from "./components/list-bus-lines";
import ShowRouteNotFound from "./components/show-route-not-found";

export default {
  name: "Home",
  components: {
    SearchRouteForm,
    ShowRouteNotFound,
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
        return;
      }
      this.routeNotFound = null;
      this.foundRoute = null;
      try {
        const solver = busLineManager.getRouteSolver(
          formData.useBiDirectionalLines
        );

        const route = solver.findShortestPathBetween(
          formData.fromStop,
          formData.toStop
        );

        this.foundRoute = route.getAsSimpleArray();
      } catch (e) {
        this.routeNotFound = { from: formData.fromStop, to: formData.toStop };
      }
    }
  }
};
</script>
