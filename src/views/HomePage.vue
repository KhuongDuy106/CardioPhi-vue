<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EcgChartVue from './EcgChart.vue';
import HeartRateChartVue from './HeartRateChart.vue';
import TimeStatsVue from './TimeStats.vue';

export default defineComponent({
  components: { EcgChartVue, TimeStatsVue, HeartRateChartVue },
});
</script>

<template>
  <v-main
    style="background-color:#F0F2F4;"
    class="d-flex"
  >
    <v-app-bar
      flat
      dense
      outlined
      color="white"
      class="mr-2"
      max-height="45px"
    >
      <div>
        <v-img
          src="CardioPhi-logos_colored.png"
          contain
          position="left"
          content-class="logo"
          class="ml-2 pa-0"
        />
      </div>
      <div class="d-flex align-center">
        <v-card-title
          class="pb-3 pr-1 py-3 font-weight-regular"
        >
          Main
        </v-card-title>

        <v-icon
          color="black"
        >
          mdi-chevron-double-right
        </v-icon>

        <v-card-title
          class="pb-3 px-1 py-3 font-weight-black"
        >
          ECG Analysis
        </v-card-title>

        <v-icon
          color="black"
        >
          mdi-chevron-double-right
        </v-icon>

        <v-card-title
          class="pb-3 px-1 py-3 font-weight-regular"
        >
          Report Generation
        </v-card-title>
      </div>
      <v-spacer />
      <v-btn
        color="secondary"
        tile
        small
        class="mr-2"
        :to="'Report'"
      >
        Generate Report
      </v-btn>
      <v-btn
        icon
        class="mr-4"
      >
        <v-icon
          x-large
          color="secondary"
        >
          mdi-video
        </v-icon>
      </v-btn>
      <v-btn
        icon
        small
        class="ml-2"
      >
        <v-icon
          color="black"
        >
          mdi-account-box-outline
        </v-icon>
      </v-btn>
      <v-btn
        icon
        small
      >
        <v-icon
          color="black"
        >
          mdi-cog
        </v-icon>
      </v-btn>
    </v-app-bar>
    <EcgChartVue />
    <HeartRateChartVue />
    <TimeStatsVue />
  </v-main>
</template>

<style >
.logo{
    max-width: 120px !important;
    width: 120px !important;
}
</style>
