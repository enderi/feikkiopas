import ReittiData from './data/reittiopas.json'
import BusLineManager from './services/bus-line-manager'

const busLineManager = new BusLineManager()

// initializing with given data set
ReittiData.pysakit.forEach(pysakki => {
  busLineManager.addBusStop(pysakki)
})

ReittiData.tiet.forEach(tie => {
  busLineManager.addRoadBetweenStops(tie.mista, tie.mihin, tie.kesto)
})

Object.keys(ReittiData.linjastot).forEach(linjastoNimi => {
  busLineManager.addBusLine(linjastoNimi, ReittiData.linjastot[linjastoNimi])
})

export default busLineManager
