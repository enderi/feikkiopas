<template>
  <div>
    <section class="timeline">
      <ul>
        <li v-for="(info, index) in steps" v-bind:key="index">
          <span></span>
          <div class="text-xl font-bold">{{ info.line }} linja</div>
          <div>{{info.stops.length-1}} pysäkinväli(ä)</div>
          <div>{{info.travelTimes}} aikayksikköä</div>

          <div class="stop">
            <span class="text-xl font-bold">{{ info.stops[0] }}</span>
            <span class="text-xl font-bold">{{ info.stops[info.stops.length-1] }}</span>
          </div>
        </li>
      </ul>
    </section>
    <div class="text-xl">Yhteensä {{calculateTotalTravelTime(steps)}} aikayksikköä</div>
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat");
$font-stack: "Montserrat", sans-serif;
$font-color: black;

$dark-blue: #2e4a62;
$light-blue: #4e9bfa;

@mixin clearfix {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
}
@mixin set-border($thickness, $color, $radius) {
  border: $thickness solid $color;
  border-radius: $radius;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: $font-stack;
  color: $font-color;
}
main {
  width: 32em;
  height: 100%;
  margin: 1em auto;
  padding: 40px;
  background: $dark-blue;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}
.timeline {
  padding: 5px 45px;
  ul {
    position: relative;
    &::before {
      @include clearfix();
      height: 100%;
    }
  }
  li {
    position: relative;
    margin: 60px 35px;
    width: 100%;
    list-style: none;
    line-height: 25px;
    & > span {
      @include clearfix();
      left: -25px;
      height: 110%;
      @include set-border(2px, $font-color, none);
    }
    & > span::before,
    & > span::after {
      @include clearfix();
      width: 14px;
      height: 14px;
      @include set-border(3px, $font-color, 50%);
      left: -7px;
      background: $light-blue;
    }
    & > span::before {
      top: -15px;
    }
    & > span::after {
      top: 100%;
    }
    div {
      &:nth-child(3),
      &:nth-child(4) {
        font-style: italic;
        color: darken($font-color, 25%);
      }
    }
    .stop span {
      position: absolute;

      left: -85px;
      width: 40px;
      text-align: right;
      &:first-child {
        top: -20px;
      }
      &:last-child {
        top: 100%;
      }
    }
  }
}
</style>

<script>
export default {
  name: "timeline",
  props: ["route"],
  computed: {
    steps() {
      let currentStep = null;
      let routeReOrganized = [];
      for (let i = 0; i < this.route.length; i++) {
        if (!currentStep || currentStep.line !== this.route[i].props.busLineName) {
          currentStep = {
            line: this.route[i].props.busLineName,
            stops: [this.route[i].from, this.route[i].to],
            travelTimes: this.route[i].travelTime
          };
          routeReOrganized.push(currentStep);
        } else {
          currentStep.stops.push(this.route[i].to);
          currentStep.travelTimes += this.route[i].travelTime;
        }
      }
      return routeReOrganized;
    }
  },
  methods: {
    calculateTotalTravelTime(route) {
      let total = 0;
      route.forEach(step => {
        total += step.travelTimes;
      });
      return total;
    }
  }
};
</script>