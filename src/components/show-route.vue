<template>
    <div class="foundRoute-view">
        <div>Reitti selvä!</div>
        <div>Etapit:</div>
        <ul>
            <li
                    v-for="(step, index) in route"
                    v-bind:key="index"
            >Pysäkiltä {{step.from}} pysäkille {{step.to}} käyttäen linjaa '{{step.props[Constants.BUS_LINE_NAME]}}'
                ({{step.travelTime}} aikayksikköä)
            </li>
        </ul>
        <div>Aikaa tulee kuluman {{sumTotalTravelTime(route)}} aikayksikköä</div>
    </div>
</template>

<script>
    import Constants from '../const'
    export default {
        name: 'show-route',
        props: ['route'],
        data() {
            return {
                Constants
            }
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
    }
</script>