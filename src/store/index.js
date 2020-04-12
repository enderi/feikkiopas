import Vue from 'vue'
import Vuex from 'vuex'
import ReittiData from '../resources/reittiopas.json'
import BusLineManager from '../services/bus-line-manager'

Vue.use(Vuex)

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

export default new Vuex.Store({
  state: {
    busLineManager: busLineManager
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
