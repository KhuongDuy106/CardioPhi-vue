<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable dot-notation -->
<script lang="ts">
import {
  defineComponent, onMounted, ref,
} from '@vue/composition-api';
import { storeToRefs } from 'pinia';
import Plotly from '@/plugins/plotly';

import { useEpisodeDataStore } from '@/stores/EpisodeData';

export default defineComponent({
  name: 'EpisodeChart',
  props: {
    data: {
      type: Array,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
    chartId: {
      type: String,
      required: true,
    },
    chartTitle: {
      type: String,
      required: true,
    },
    episodeData: {
      type: Object,
      required: true,
    },

  },
  setup(props) {
    const current = ref(1);
    const total = ref(3);

    const episodeData = useEpisodeDataStore();

    const { selectedChartData } = storeToRefs(episodeData);

    const previous = () => {
      if (current.value > 1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Plotly.restyle(props.chartId, { x: [props.data[current.value - 2][0]['x']], y: [props.data[current.value - 2][0]['y']] });
        current.value -= 1;
      }
    };
    const next = () => {
      if (current.value < total.value) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Plotly.restyle(props.chartId, { x: [props.data[current.value][0]['x']], y: [props.data[current.value][0]['y']] });
        current.value += 1;
      }
    };
    const closeDrawer = () => {
      selectedChartData.value.checked = false;
      setTimeout(() => { (Plotly.Plots.resize('heartRateChart')); }, 125);
      setTimeout(() => { (Plotly.Plots.resize('ecgChart')); }, 125);
    };

    onMounted(async () => {
      console.log(props.data[0])
      console.log(props.layout)
      Plotly.newPlot(props.chartId,
        props.data[0],
        props.layout,
        {
          displaylogo: false,
          displayModeBar: true,
          modeBarButtonsToRemove: ['autoscale', 'pan', 'toimage'],
        });
    });

    return {
      current,
      total,
      previous,
      next,
      selectedChartData,
      closeDrawer,
    };
  },
});
</script>

<template>
  <v-card
    flat
    tile
  >
    <v-toolbar
      dense
      dark
      tile
      flat
      color="secondary"
    >
      <v-toolbar-title>{{ chartTitle }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click="closeDrawer"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-row
      dense
    >
      <v-toolbar
        color="#D9D9D9"
        flat
        tile
        class="ma-3"
      >
        <v-col
          v-for="(value, key) in episodeData"
          :key="key"
        >
          <v-list
            dense
            color="#D9D9D9"
            class="pa-0"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle
                  class="text-capitalize"
                >
                  {{ key }}
                </v-list-item-subtitle>
                <v-list-item-title>{{ value }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-toolbar>
    </v-row>
    <v-row
      no-gutters
    >
      <v-col
        cols="12"
      >
        <v-card
          flat
        >
          <v-toolbar
            color="#D9D9D9"
            height="30px"
            flat
            tile
            class="ma-2 body-2"
          >
            <div>
              Duration 1 d 8 h Avg HR 150 bpm
            </div>
            <v-spacer />
            <v-btn
              icon
              small
              @click="previous()"
            >
              <v-icon>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            {{ current }}/{{ total }}
            <v-btn
              icon
              small
              @click="next()"
            >
              <v-icon>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-spacer />
            <div>
              03/24/22 10:43:22
            </div>
            <v-btn
              icon
              x-small
              class="ml-2"
            >
              <v-icon>
                mdi-lead-pencil
              </v-icon>
            </v-btn>
          </v-toolbar>
          <div
            :id="chartId"
            style="height:100px;"
          />
          <v-divider
            class="mx-2"
            light
          />
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
