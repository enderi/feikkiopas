<template>
  <div  class="w-full max-w-xs">
    <form v-on:submit.prevent="calculateRoute" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 class="">Hae reitti</h3>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="fromStop">Lähtö</label>
      <div class="inline-block relative w-64">
        <select 
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        v-model="formData.fromStop" id="fromStop">
          <option disabled value>Mistä lähdetään?</option>
          <option v-for="stop in busStops" v-bind:key="stop.name">{{stop.name}}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="toStop">Määränpää</label>
      <div class="inline-block relative w-64">
        <select 
        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        v-model="formData.toStop" id="toStop">
          <option disabled value>Minne mennään?</option>
          <option v-for="stop in busStops" v-bind:key="stop.name">{{stop.name}}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <div>
        <div class="md:w-1/3"></div>
        <label class="md:w-2/3 block text-gray-500 font-bold">
        <input class="mr-2 leading-tight" type="checkbox"
          id="biDirectionalCheckbox"
          v-model="formData.useBiDirectionalLines"
        />
        <span class="text-sm" for="biDirectionalCheckbox">Kahdensuuntaiset linjastot</span>
        </label>
      </div>
      <input 
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        type="submit" value="Laske reitti" />
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