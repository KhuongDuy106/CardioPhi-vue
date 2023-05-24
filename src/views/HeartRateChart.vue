<script lang="ts">
import {
  defineComponent, ref, watch, onMounted,
} from '@vue/composition-api';
import { storeToRefs } from 'pinia';
import Plotly from '@/plugins/plotly';

import { useEcgStore } from '@/stores/EcgStore';
import { useEpisodeDataStore } from '@/stores/EpisodeData';
import { useEpisodesChartStore } from '@/stores/EpisodesStore';

import { useHeartRateStore } from '@/stores/HeartRateStore';
import EpisodeChartVue from './EpisodeChart.vue';
import HrNotificationVue from './HrNotification.vue';

export default defineComponent({
  name: 'HeartRateChart',
  components: {
    EpisodeChartVue,
    HrNotificationVue,
  },
  setup() {
    const store = useEcgStore();

    const { fetchEcgSummary } = store;
    const episodeDataStore = useEpisodeDataStore();
    const {
      afib,
      avBlock,
      maxHR,
      minHR,
      otherBeats,
      pauses,
      psvc,
      pvc,
      sinus,
      svt,
      vt,
      episodeChartData,
      selectedChartData,
      episodeLayout,
      episodeData,
      afibEpisodesData,
      showHrNotification,
    } = storeToRefs(episodeDataStore);
console.log(episodeChartData);
    const heartRateStore = useHeartRateStore();
    const every10th = (value: number, index: number, arr: number[]) => index % 10 === 0;

    const episodeChartStore = useEpisodesChartStore();
    const {
      AfibChart1,
      avBlockChart,
    } = storeToRefs(episodeChartStore);

    watch(avBlockChart, () => {
      (avBlockChart.value.chart1 as number[]).forEach((value:number, index:number) => {
        episodeData.value[0][0].x.push(index);
        episodeData.value[0][0].y.push(value);
      });
      (avBlockChart.value.chart1 as number[]).forEach((value:number, index:number) => {
        episodeData.value[1][0].x.push(index);
        episodeData.value[1][0].y.push(value);
      });
      (avBlockChart.value.chart1 as number[]).forEach((value:number, index:number) => {
        episodeData.value[2][0].x.push(index);
        episodeData.value[2][0].y.push(value);
      });
    }, { deep: true });
    watch(AfibChart1, () => {
      (AfibChart1.value.afibEpisode1 as number[]).forEach((value:number, index:number) => {
        afibEpisodesData.value[0][0].x.push(index);
        afibEpisodesData.value[0][0].y.push(value);
      });
      (AfibChart1.value.afibEpisode2 as number[]).forEach((value:number, index:number) => {
        afibEpisodesData.value[1][0].x.push(index);
        afibEpisodesData.value[1][0].y.push(value);
      });
      (AfibChart1.value.afibEpisode3 as number[]).forEach((value:number, index:number) => {
        afibEpisodesData.value[2][0].x.push(index);
        afibEpisodesData.value[2][0].y.push(value);
      });
    }, { deep: true });

    const heartRateLayout = ref({
      xaxis: {
        showline: false,
        showgrid: false,
        showticklabels: true,
        ticklabelposition: 'top',
        tickmode: 'array',
        tickvals: [50, 220, 390, 560, 730, 900, 1070],
        ticktext: ['6am', 'noon', '6pm', 'midnight', '6am', 'noon', '6pm'],

      },
      yaxis: {
        showline: false,
        showgrid: false,
        showticklabels: true,
        tickmode: 'array',
        range: [0, 30],
        tickvals: [5, 12, 18, 25],
        ticktext: [50, 100, 150, 200],

        title: {
          text: 'HR<br>(bpm)',
        },
      },
      autosize: true,
      hovermode: false,
      margin: {
        t: 0,
        b: 30,
        r: 0,
      },

    });
    
    onMounted(async () => {
      await fetchEcgSummary();

      Plotly.newPlot('heartRateChart', [{
        z: heartRateStore.beatdata.map((v: number[], i: number) => v.filter(every10th)),
        showscale: false,
        type: 'heatmap',
        colorscale: [
          ['0.0', '#fff'],
          ['0.1', '#fff'],

          ['0.15', '#fff'],
          ['0.3', '#020202'],
          ['1.0', '#020202'],
        ],
      }], heartRateLayout.value, {
        displaylogo: false,
        displaymodebar: true,
        modeBarButtonsToRemove: ['autoscale', 'pan', 'toimage'],
        responsive: true,
      });
    });

    const hrshapes = [
      {
        type: 'rect',
        xref: 'x',
        yref: 'paper',
        x0: 25,
        y0: 0,
        x1: 26,
        y1: 1,
        opacity: 0.5,
        line: {
          width: 0,
        },
      },
      {
        type: 'rect',
        xref: 'x',
        yref: 'paper',
        x0: 100,
        y0: 0,
        x1: 102,
        y1: 1,
        opacity: 0.5,
        line: {
          width: 0,
        },
      },
      {
        type: 'rect',
        xref: 'x',
        yref: 'paper',
        x0: 230,
        y0: 0,
        x1: 231,
        y1: 1,
        opacity: 0.5,
        line: {
          width: 0,
        },
      },
      {
        type: 'rect',
        xref: 'x',
        yref: 'paper',
        x0: 325,
        y0: 0,
        x1: 326,
        y1: 1,
        opacity: 0.5,
        line: {
          width: 0,
        },
      },
      {
        type: 'rect',
        xref: 'x',
        yref: 'paper',
        x0: 375,
        y0: 0,
        x1: 376,
        y1: 1,
        opacity: 0.5,
        line: {
          width: 0,
        },
      },
      {
        type: 'rect',
        xref: 'x',
        yref: 'paper',
        x0: 500,
        y0: 0,
        x1: 501,
        y1: 1,
        opacity: 0.5,
        line: {
          width: 0,
        },
      },
    ];

    const showMin = ref({
      shapes: hrshapes,
    });
    const hideMin = ref({
      shapes: [],
    });

    const updateSelectedChart = (val:string) => {
      
      if (val) {
        if (selectedChartData.value.checked) {
          selectedChartData.value.checked = false;
        }

        // eslint-disable-next-line dot-notation
        selectedChartData.value = episodeChartData.value[val];
        selectedChartData.value.show = true;
        // Object.keys(episodeChartData.value).map((item) => {
        //   Object.assign(item, { test: false })
        // });
      } else {
        selectedChartData.value.show = false;
      }
      setTimeout(() => { (Plotly.Plots.resize('heartRateChart')); }, 125);
      setTimeout(() => { (Plotly.Plots.resize('ecgChart')); }, 125);
    };

    watch(selectedChartData, () => {
      if (selectedChartData.value.checked) {
        hrshapes.map((shape) => Object.assign(shape,
          { fillcolor: selectedChartData.value.color }));
        Plotly.relayout('heartRateChart', showMin.value);
      } else {
        Plotly.relayout('heartRateChart', hideMin.value);
      }
    }, { deep: true });

    return {
      episodeChartData,
      afib,
      avBlock,
      minHR,
      maxHR,
      otherBeats,
      pauses,
      psvc,
      pvc,
      sinus,
      svt,
      vt,
      updateSelectedChart,
      selectedChartData,
      episodeData,
      episodeLayout,
      showHrNotification,
    };
  },
});
</script>

<template>
  <v-row
    dense
    no-gutters
  >
    <v-col>
      <v-card
        flat
        tile
        color="#F0F2F4"
        class="px-4 mb-8"
        height="calc(30vh - 10px)"
      >
        <v-divider
          style="border-color: #4A5060; border-bottom-width: 4px;"
          class="mt-1"
        />
        <v-toolbar
          color="white"
          class="mb-1"
          outlined
          flat
          tile
          dense
          style="border-color: #D9D9D9 !important;"
        >
          <v-col
            cols="2"
            class="py-0"
          >
            <v-list
              dense
              :color="episodeChartData.minHR.checked ? '#ffa29e' : 'white'"
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.minHR.checked"
                  color="white"
                  value="minHR"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content
                  class="py-0"
                >
                  <v-list-item-title> Min HR </v-list-item-title>
                  <v-list-item-subtitle>58 pbm</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            cols="2"
            class="py-0"
          >
            <v-list
              dense
              :color="episodeChartData.maxHR.checked ? '#9274d5' : 'white'"
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.maxHR.checked"
                  value="maxHR"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content
                  class="py-0"
                >
                  <v-list-item-title> Max HR </v-list-item-title>
                  <v-list-item-subtitle>115 pbm</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            cols="2"
            class="py-0"
          >
            <v-list
              dense
              :color="episodeChartData.PSVC.checked ? 'warning lighten-4' : 'white'"
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.PSVC.checked"
                  color="white"
                  value="PSVC"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content
                  class="py-0"
                >
                  <v-list-item-title> PSVC </v-list-item-title>
                  <v-list-item-subtitle>254 Beats</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            cols="2"
            class="py-0"
          >
            <v-list
              dense
              :color="episodeChartData.PVC.checked ? 'light-green lighten-3' : 'white'"
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.PVC.checked"
                  color="white"
                  value="PVC"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content
                  class="py-0"
                >
                  <v-list-item-title> PVC </v-list-item-title>
                  <v-list-item-subtitle>254 Beats</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            class="py-0"
            align-self="start"
          >
            <v-list
              dense
              :color="episodeChartData.OtherBeats.checked ? 'orange accent-2' : 'white'"
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.OtherBeats.checked"
                  color="white"
                  value="OtherBeats"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content
                  class="py-0"
                >
                  <v-list-item-title> Other Beats </v-list-item-title>
                  <v-list-item-subtitle>254 Beats</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            class="py-0"
            align-self="start"
          >
            <v-list
              dense
              :color="episodeChartData.sinus.checked ? 'blue accent-1' : 'white'"
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.sinus.checked"
                  color="white"
                  value="sinus"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content
                  class="py-0"
                >
                  <v-list-item-title> Sinus </v-list-item-title>
                  <v-list-item-subtitle>5 Examples</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <v-btn
            icon
            small
            @click="showHrNotification=true"
          >
            <v-icon>
              mdi-bell-outline
            </v-icon>
          </v-btn>
          <v-btn
            icon
            small
            @click="showHrNotification=true"
          >
            <v-icon>
              mdi-tune-vertical
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider
          style="border-color: #4A5060; border-bottom-width: 4px;"
        />
        <v-toolbar
          color="white"
          tile
          flat
          dense
          outlined
          class="mb-2 pb-1"
          style="border-color: #D9D9D9 !important;"
        >
          <v-col
            cols="2"
            class="py-0"
          >
            <v-list
              :color="episodeChartData.AFib.checked ? 'deep-orange lighten-2' : 'white'"
              dense
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.AFib.checked"
                  color="white"
                  value="AFib"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content

                  class="py-0"
                >
                  <v-list-item-title> AFib/Flutter </v-list-item-title>
                  <v-list-item-subtitle>Burden 59.62%</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            cols="2"
            class="py-0"
          >
            <v-list
              :color="episodeChartData.SVT.checked ? 'indigo lighten-3' : 'white'"
              dense
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.SVT.checked"
                  color="white"
                  value="SVT"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content
                  class="py-0"
                >
                  <v-list-item-title> SVT </v-list-item-title>
                  <v-list-item-subtitle>1 episode</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            cols="2"
            class="py-0"
          >
            <v-list
              dense
              :color="episodeChartData.VT.checked ? 'deep-purple lighten-3' : 'white'"
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.VT.checked"
                  color="white"
                  value="VT"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content
                  class="py-0"
                >
                  <v-list-item-title> VT </v-list-item-title>
                  <v-list-item-subtitle>5 Episodes</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            cols="2"
            class="py-0"
          >
            <v-list
              dense
              :color="episodeChartData.pauses.checked ? 'purple lighten-4' : 'white'"
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.pauses.checked"
                  color="white"
                  value="pauses"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content
                  class="py-0"
                >
                  <v-list-item-title> Pauses </v-list-item-title>
                  <v-list-item-subtitle>3 Episodes</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            cols="2"
            class="py-0"
          >
            <v-list
              dense
              :color="episodeChartData.avBlock.checked ? 'pink accent-1' : 'white'"
              class="pa-0"
            >
              <v-list-item>
                <v-checkbox
                  v-model="episodeChartData.avBlock.checked"
                  color="white"
                  value="avBlock"
                  dense
                  @change="updateSelectedChart"
                />
                <v-list-item-content
                  class="py-0"
                >
                  <v-list-item-title> AV Block </v-list-item-title>
                  <v-list-item-subtitle>Type --</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-toolbar>
        <div
          id="heartRateChart"
          class="hr"
          style="outline: #D9D9D9 !important; outline-style: solid; outline-width: thin;
          height:100%;
          width:100%;"
        />
      </v-card>
    </v-col>
    <v-navigation-drawer
      v-if="showHrNotification"
      right
      absolute
      width="500px"
    >
      <HrNotificationVue />
    </v-navigation-drawer>
    <v-navigation-drawer
      v-if="selectedChartData.checked"
      :value="selectedChartData.checked"
      right
      app
      width="500px"
      style="outline: #D9D9D9 !important; outline-style: solid; outline-width: thin;"
    >
      <EpisodeChartVue
        :episode-data="selectedChartData.episodeData"
        :chart-title="selectedChartData.chartTitle"
        :chart-id="selectedChartData.chartId"
        :data="selectedChartData.data"
        :layout="selectedChartData.layout"
      />
    </v-navigation-drawer>
  </v-row>
</template>

<style scoped>
#heartRateChart{
  height: 70% !important;
}
</style>
