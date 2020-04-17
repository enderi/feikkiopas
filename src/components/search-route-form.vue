<template>
  <div>
    <form v-on:submit.prevent="calculateRoute">
      <h3 class="text-xl underline mb-3">Hae reitti</h3>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="fromStop">Lähtö</label>
      <div class="inline-block relative w-64">
        <select
          class="block text-sm appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          v-model="formData.fromStop"
          id="fromStop"
        >
          <option disabled value>Mistä lähdetään?</option>
          <option v-for="stop in busStops" v-bind:key="stop.name">{{stop.name}}</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <label class="block text-gray-700 text-sm font-bold mb-2 mt-4" for="toStop">Määränpää</label>
      <div class="inline-block relative w-64">
        <select
          class="block text-sm appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          v-model="formData.toStop"
          id="toStop"
        >
          <option disabled value>Minne mennään?</option>
          <option v-for="stop in busStops" v-bind:key="stop.name">{{stop.name}}</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div>
        <div class="md:w-1/3"></div>
        <label class="md:w-2/3 block text-gray-500 font-bold mt-4">
          <input
            class="mr-2 leading-tight"
            type="checkbox"
            id="biDirectionalCheckbox"
            v-model="formData.useBiDirectionalLines"
          />
          <span class="text-sm" for="biDirectionalCheckbox">Kahdensuuntaiset linjastot</span>
        </label>
      </div>
      <input
        class="font-semibold mt-3 py-2 px-4 border border-gray-400 rounded"
        v-bind:class="{ '': searchDisabled, 'bg-white text-gray-800 shadow hover:bg-gray-100': !searchDisabled }"
        type="submit"
        value="Laske reitti"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "search-route-form",
  props: ["busStops"],
  computed: {
    searchDisabled() {
      return (
        !this.formData.fromStop ||
        !this.formData.toStop ||
        this.formData.fromStop === this.formData.toStop
      );
    }
  },
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