<script lang="ts">
import {
  defineComponent, ref, onMounted, watch, Ref,
} from '@vue/composition-api';
import { storeToRefs } from 'pinia';
import Plotly from '@/plugins/plotly';
import { useEcgStore } from '@/stores/EcgStore';

export default defineComponent({
  name: 'EcgChart',

  setup() {
    const intervalId = ref();
    const store = useEcgStore();
    const play = ref(false);
    const {
      liveGraph,
    } = storeToRefs(store);
    const { fetchEcgSummary, ticktext, tickvals } = store;

    const showDetections = ref(false);
    const liveDetections: Ref<Array<Record<string, unknown>>> = ref([]);

    const data = ref([{
      x: [] as number[],
      y: [] as number[],
      type: 'scattergl',
      line: {
        color: 'black',
      },
    }]);

    const layout = {
      xaxis: {
        showline: false,
        showgrid: false,
        showticklabels: true,
        tickmode: 'array',
        range: [0, 3600],
        tickvals,
        ticktext,
        minor: {
          dtick: 72,
          tick0: 0,
          showgrid: true,
        },

      },
      yaxis: {
        fixedrange: true,
        showline: true,
        showgrid: true,
        showticklabels: true,
        zeroline: false,
        gridcolor: '#555',
        title: {
          text: 'Millivolts<br>(mV)',
        },

      },
      margin: {
        b: 25,
        t: 0,
      },
      shapes: null,
      autosize: true,

      hovermode: false,
    };
    const detections = ref({
      shapes: liveDetections,
    });
    const noDetections = ref({
      shapes: [],
    });

    watch(showDetections, () => {
      if (showDetections.value) {
        console.log(detections.value);
        Plotly.relayout('ecgChart', detections.value);
      } else {
        Plotly.relayout('ecgChart', noDetections.value);
      }
    }, { deep: true });

    watch(liveGraph, () => {
      liveGraph.value.raw_signal.forEach((value:number, index:number) => {
        data.value[0].x.push(index);
        data.value[0].y.push(value);
      });

      liveGraph.value.detections.forEach((arr: any) => {
        liveDetections.value.push({
          type: 'rect',
          xref: 'x',
          yref: 'paper',
          x0: arr[0][0],
          y0: 0,
          x1: arr[0][1],
          y1: 1,
          fillcolor: '#55CEFF',
          opacity: arr[1] > 0.55 ? 0.8 : arr[1],
          line: {
            width: 0,
          },
        });
      });
    }, { deep: true });

    onMounted(async () => {
      await fetchEcgSummary();
      const config = {
        displaylogo: false,
        displaymodebar: true,
        modeBarButtonsToRemove: ['autoscale', 'pan', 'toimage'],
        responsive: true,
      };
      const ecChart = await Plotly.newPlot('ecgChart', data.value, layout, config);
      watch(play, () => {
        if (play.value) {
          intervalId.value = setInterval(() => {
            Plotly.relayout('ecgChart',
              {
                'xaxis.range': [ecChart.layout.xaxis.range[0] + 45, ecChart.layout.xaxis.range[1] + 45],

              });
          }, 125);
        } else {
          clearInterval(intervalId.value);
        }
      });
    });

    return {
      data,
      liveGraph,
      layout,
      showDetections,
      play,
    };
  },

});
</script>

<template>
  <div
    style="width: 100%;"
  >
    <v-row
      no-gutters
      dense
      class="py-1 px-4 body-1"
    >
      <v-col>
        Start: 07/08/2022 10:40 PM
        <v-btn
          icon
          x-small
        >
          <v-icon>
            mdi-lead-pencil
          </v-icon>
        </v-btn>
      </v-col>
      <v-col>
        End: 07/09/2022 12:40 PM
        <v-btn
          icon
          x-small
        >
          <v-icon>
            mdi-lead-pencil
          </v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <div>
          Total Monitoring Time: 20h 52min
        </div>
      </v-col>
      <v-col>
        <div>
          Total Time Analyzed: 20h 52min
        </div>
      </v-col>
    </v-row>
    <v-row
      no-gutters
    >
      <v-col>
        <v-card
          flat
          tile
          color="#F0F2F4"
          class="px-4 mb-8"
          height="calc(22vh - 10px)"
        >
          <v-toolbar
            dark
            flat
            tile
            dense
            height="min-content"
            color="secondary"
            class="py-0"
          >
            <v-toolbar-title>ECG</v-toolbar-title>
            <v-spacer />
            <div>
              Min HR: {{ Math.round(liveGraph.hr.min) }}
            </div>
            <v-spacer />
            <div>
              HR: {{ Math.round(liveGraph.hr.current) }}
            </div>
            <v-spacer />
            <div>
              Max HR: {{ Math.round(liveGraph.hr.max) }}
            </div>
            <v-spacer />
            <div class="d-flex">
              <v-checkbox
                v-model="showDetections"
                dense
                dark
                off-icon="mdi-checkbox-blank"
                style="max-height: 25px;"
              />
              <div>Interpretation</div>
            </div>
            <v-spacer />
            <div> Atrial Fibrilation/Flutter</div>
            <v-spacer />
            <v-btn
              v-if="!play"
              icon
              x-small
              @click="play = !play"
            >
              <v-icon>
                mdi-play
              </v-icon>
            </v-btn>
            <v-btn
              v-if="play"
              icon
              x-small
              @click="play = !play"
            >
              <v-icon>
                mdi-pause
              </v-icon>
            </v-btn>
            <div> Live</div>
          </v-toolbar>
          <div
            id="ecgChart"
            style="outline: #D9D9D9 !important; outline-style: solid; outline-width: thin;  width: 100%"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
