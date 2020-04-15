<template>
  <div class="foundRoute-view">
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Reitti selvä!</strong>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        </span>
    </div>
    <div>Etapit:</div>
    <ul>
      <li v-for="(step, index) in route" v-bind:key="index">
        Pysäkiltä {{ step.from }} pysäkille {{ step.to }} käyttäen linjaa '{{
          step.props[Constants.BUS_LINE_NAME]
        }}' ({{ step.travelTime }} aikayksikköä)
      </li>
    </ul>
    <div>Aikaa tulee kuluman {{ sumTotalTravelTime(route) }} aikayksikköä</div>
  </div>
</template>

<script>
import Constants from '../const'
export default {
  name: 'show-route',
  props: ['route'],
  data () {
    return {
      Constants
    }
  },
  methods: {
    sumTotalTravelTime (route) {
      let sum = 0
      route.forEach(step => {
        sum += step.travelTime
      })
      return sum
    }
  }
}
</script>
