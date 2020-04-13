<template>
    <div class="home" v-bind:class="{styled: isStyleOn}">
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
                <input type="submit" value="Laske reitti"/>
            </form>
        </div>
        <br/>
        <div class="foundRoute-view" v-if="routeNotFound">
            Reittiä ei löytynyt välille {{routeNotFound.from}} {{routeNotFound.to}}
        </div>
        <div class="foundRoute-view" v-if="foundRoute">
            <div>Reitti selvä!</div>
            <div>Etapit:</div>
            <ul>
                <li
                        v-for="(step, index) in foundRoute"
                        v-bind:key="index"
                >Pysäkiltä {{step.from}} pysäkille {{step.to}} käyttäen linjaa '{{step.props['busLineName']}}'
                    ({{step.travelTime}} aikayksikköä)
                </li>
            </ul>
            <div>Aikaa tulee kuluman {{sumTotalTravelTime(foundRoute)}} aikayksikköä</div>
        </div>
        <hr>
        <div>
            <h3>Reitit</h3>
            <div v-for="(line, index) in busLines" v-bind:key="index">
                <div>Reitti '{{line.name}}':</div>
                <div>
                  <span v-for="(stop, index) in line.stops" v-bind:key="index">
                    {{stop.name}}
                      <span v-if="index < line.stops.length -1">=></span>
                  </span>
                </div>
                <br>
            </div>
        </div>

        <div>
            <h3>Pysäkkien välien kestot</h3>
            <div v-for="(road, index) in roads" v-bind:key="index">
                {{road.from.name}} => {{road.to.name}} = {{road.travelTime}} yksikköä

            </div>
        </div>
    </div>

</template>
<style>
    .styled .box {
        width: 40px;
        height: 40px;
        text-align: center;
        vertical-align: center;
    }
</style>
<script>
    import store from "../store";

    export default {
        name: "Home",
        data() {
            return {
                busStops: store.state.busLineManager.getBusStops(),
                roads: store.state.busLineManager.getRoads(),
                busLines: store.state.busLineManager.getBusLines(),
                distancesObj: null,
                fromStop: null,
                toStop: null,
                foundRoute: null,
                routeNotFound: null,
                isStyleOn: true
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
                    const route = store.state.busLineManager.getRouteSolver().findShortestPathBetween(
                        this.fromStop,
                        this.toStop
                    );

                    this.foundRoute = route.getAsSimpleArray();
                } catch (e) {
                    this.routeNotFound = {from: this.fromStop, to: this.toStop}
                }
            }
            ,
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
