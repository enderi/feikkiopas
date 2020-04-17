<template>
  <div>
    <strong class="font-bold text-xl">Reitti löytyi!</strong>
    <div class>
      <timeline v-bind:route="this.route"></timeline>
    </div>
  </div>
</template>

<script>
import Constants from "../const";
import Timeline from "./timeline";
export default {
  name: "show-route",
  props: ["route"],
  components: {
    Timeline
  },
  data() {
    return {
      Constants
    };
  },
  methods: {
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
