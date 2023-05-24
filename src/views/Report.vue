<script lang="ts">
import {
  defineComponent, ref, onMounted, watch,
} from '@vue/composition-api';
import { storeToRefs } from 'pinia';
import { useReportInfo } from '@/stores/ReportStore';
import { useEpisodesChartStore } from '@/stores/EpisodesStore';
import { useEcgStore } from '@/stores/EcgStore';

import Plotly from '@/plugins/plotly';

export default defineComponent({
  name: 'ECGReport',
  setup() {
    const episodeChartStore = useEpisodesChartStore();
    const store = useEcgStore();
    const { fetchEcgSummary } = store;
    const {
      liveGraph,
    } = storeToRefs(store);

    const {
      AfibChart1,
    } = storeToRefs(episodeChartStore);

    const reportStore = useReportInfo();

    const data = ref([{
      x: [] as number[],
      y: [] as number[],
      type: 'scatter',
      line: {
        color: 'black',
      },
    }]);
    watch(liveGraph, () => {
      (AfibChart1.value.afibEpisode1 as number[]).forEach((value:number, index:number) => {
        data.value[0].x.push(index);
        data.value[0].y.push(value);
      });
    }, { deep: true });

    const minTrace = {
      x: ['03/24', '03/25', '03/26', '03/27', '03/28', '03/29', '03/30'],
      y: [55, 50, 52, 60, 55, 60, 50],
      name: 'Min',
      type: 'scatter',
      line: {
        color: 'blue',
      },
      marker: {
        symbol: 'triangle-down',
        size: 11,
      },
    };
    const meanTrace = {
      x: ['03/24', '03/25', '03/26', '03/27', '03/28', '03/29', '03/30'],
      y: [95, 80, 82, 95, 85, 90, 80],
      name: 'Mean',
      type: 'scatter',
      line: {
        color: 'black',
      },
      marker: {
        size: 10,
      },
    };
    const maxTrace = {
      x: ['03/24', '03/25', '03/26', '03/27', '03/28', '03/29', '03/30'],
      y: [125, 110, 112, 125, 105, 140, 130],
      name: 'Max',
      type: 'scatter',
      line: {
        color: 'red',
      },
      marker: {
        symbol: 'triangle-up',
        size: 11,
      },
    };
    const hrReportData = [maxTrace, meanTrace, minTrace];
    const layout = {
      xaxis: {
        showline: false,
        showgrid: true,
        showticklabels: false,
      },
      yaxis: {
        showline: false,
        showgrid: true,
        showticklabels: false,
      },
      margin: {
        b: 0,
        l: 0,
        r: 0,
        t: 0,
      },
      height: 150,
    };
    const hrLayout = {
      title: {
        text: 'Heart Rate during the monitoring',
        xanchor: 'left',
        x: 0,
      },
      xaxis: {
        title: 'Days',
        showline: false,
        showgrid: true,
        showticklabels: true,
      },
      yaxis: {
        title: 'Heart Rate (bpm)',
        showline: false,
        showgrid: true,
        showticklabels: true,
        range: [25, 150],
      },
      margin: {
        t: 30,
      },
      height: 200,
    };
    const hrAfibLayout = {
      title: {
        text: 'Heart Rate during AFib / Flutter',
        xanchor: 'left',
        x: 0,
      },
      xaxis: {
        title: 'Days',
        showline: false,
        showgrid: true,
        showticklabels: true,
      },
      yaxis: {
        title: 'Heart Rate (bpm)',
        showline: false,
        showgrid: true,
        showticklabels: true,
        range: [25, 150],
      },
      margin: {
        t: 30,
      },
      height: 200,

    };
    const afibBurdenData = [{
      x: [
        '0h 0m<br>5h 24m<br>0%<br>03/22',
        '0h 0m<br>< 1 min<br>0%<br>03/23',
        '6h 43m<br>< 1 min<br>28%<br>03/24',
        '23h 55m<br>0h 3m<br>100%<br>03/25',
        '23h 59m<br>< 1 min<br>100%<br>03/26',
        '9h 10m<br>< 1 min<br>38%<br>03/27',
        '9h 54m<br>< 1 min<br>41%<br>03/28',
        '2h 57m<br>< 1 min<br>12%<br>03/29',
      ],
      y: [0, 7.75, 24, 12.5, 0, 2.5, 0.6],
      name: 'AF',
      type: 'bar',
      marker: {
        color: '#066A94',
        line: {
          color: 'black',
          width: 1,
        },
      },
    },
    {
      x: [
        '0h 0m<br>5h 24m<br>0%<br>03/22',
        '0h 0m<br>< 1 min<br>0%<br>03/23',
        '6h 43m<br>< 1 min<br>28%<br>03/24',
        '23h 55m<br>0h 3m<br>100%<br>03/25',
        '23h 59m<br>< 1 min<br>100%<br>03/26',
        '9h 10m<br>< 1 min<br>38%<br>03/27',
        '9h 54m<br>< 1 min<br>41%<br>03/28',
        '2h 57m<br>< 1 min<br>12%<br>03/29',
      ],
      y: [18, 16.25, 0, 12, 24, 24, 22, 24],
      name: 'Sinus/Other',
      type: 'bar',
      marker: {
        color: '#F0F2F4',
        line: {
          color: 'black',
          width: 1,
        },
      },

    },

    ];

    const afibBurdenLayout = {
      title: {
        text: 'AFib Burden',
        xanchor: 'left',
        x: 0,
      },
      xaxis: {
        title: 'Days and Burden Percentages',
        showline: false,
        showgrid: true,
        showticklabels: true,
      },
      yaxis: {
        title: 'Time (hr)',
        showline: false,
        showgrid: true,
        showticklabels: true,
      },
      margin: {
        r: 0,
        t: 30,
      },
      height: 250,
      barmode: 'stack',

    };
    const afibLayout1 = {
      xaxis: {
        showline: false,
        showgrid: true,
        showticklabels: false,
      },
      yaxis: {
        showline: false,
        showgrid: true,
        showticklabels: false,
      },
      margin: {
        b: 0,
        l: 0,
        r: 0,
        t: 0,
      },
      height: 150,
    };
    const afibLayout2 = {
      xaxis: {
        showline: false,
        showgrid: true,
        showticklabels: false,
      },
      yaxis: {
        showline: false,
        showgrid: true,
        showticklabels: false,
      },
      margin: {
        b: 0,
        l: 0,
        r: 0,
        t: 0,
      },
      height: 150,
    };
    const afibDetailLayout = {
      xaxis: {
        showline: false,
        showgrid: false,
        showticklabels: false,
        zeroline: false,
      },
      yaxis: {
        showline: false,
        showgrid: false,
        showticklabels: false,
        zeroline: false,
      },
      margin: {
        b: 0,
        l: 0,
        r: 0,
        t: 0,
      },
      height: 50,
    };

    window.onbeforeprint = (event) => {
      Plotly.relayout('afib_report', { width: 775 });
      Plotly.relayout('hr_report', { width: 1100 });
      Plotly.relayout('hr_afib_report', { width: 1100 });
      Plotly.relayout('afib_burden_report', { width: 1100 });
      Plotly.relayout('afib_1', { width: 1000 });
      Plotly.relayout('afib_2', { width: 1000 });
      Plotly.relayout('afib1_onset', { width: 300 });
      Plotly.relayout('afib1_fastest', { width: 300 });
      Plotly.relayout('afib1_termination', { width: 300 });
      Plotly.relayout('afib2_onset', { width: 300 });
      Plotly.relayout('afib2_fastest', { width: 300 });
      Plotly.relayout('afib2_termination', { width: 300 });
    };
    window.addEventListener('afterprint', (event) => {
      Plotly.relayout('afib_report', { width: '' });
      Plotly.relayout('hr_report', { width: '' });
      Plotly.relayout('hr_afib_report', { width: '' });
      Plotly.relayout('afib_burden_report', { width: '' });
      Plotly.relayout('afib_1', { width: '' });
      Plotly.relayout('afib_2', { width: '' });
      Plotly.relayout('afib1_onset', { width: '' });
      Plotly.relayout('afib1_fastest', { width: '' });
      Plotly.relayout('afib1_termination', { width: '' });
      Plotly.relayout('afib2_onset', { width: '' });
      Plotly.relayout('afib2_fastest', { width: '' });
      Plotly.relayout('afib2_termination', { width: '' });
    });

    onMounted(async () => {
      await fetchEcgSummary();

      Plotly.newPlot('afib_report', data.value, layout, { displayModeBar: false, responsive: true });
      Plotly.newPlot('hr_report', hrReportData, hrLayout, { displayModeBar: false, responsive: true });
      Plotly.newPlot('hr_afib_report', hrReportData, hrAfibLayout, { displayModeBar: false, responsive: true });
      Plotly.newPlot('afib_burden_report', afibBurdenData, afibBurdenLayout, { displayModeBar: false, responsive: true });
      Plotly.newPlot('afib_1', data.value, afibLayout1, { displayModeBar: false, responsive: true });
      Plotly.newPlot('afib_2', data.value, afibLayout2, { displayModeBar: false, responsive: true });

      Plotly.newPlot('afib1_onset', data.value, afibDetailLayout, { displayModeBar: false, responsive: true, staticPlot: true });
      Plotly.newPlot('afib1_fastest', data.value, afibDetailLayout, { displayModeBar: false, responsive: true, staticPlot: true });
      Plotly.newPlot('afib1_termination', data.value, afibDetailLayout, { displayModeBar: false, responsive: true, staticPlot: true });
      Plotly.newPlot('afib2_onset', data.value, afibDetailLayout, { displayModeBar: false, responsive: true, staticPlot: true });
      Plotly.newPlot('afib2_fastest', data.value, afibDetailLayout, { displayModeBar: false, responsive: true, staticPlot: true });
      Plotly.newPlot('afib2_termination', data.value, afibDetailLayout, { displayModeBar: false, responsive: true, staticPlot: true });

      window.print();
    });
    return {
      reportStore,
    };
  },

});

</script>
<template>
  <div>
    <v-app-bar
      flat
      color="white"
      class="mx-4"
    >
      <v-img
        src="CardioPhi-logos_black_new1.png"
        height="calc(100% - 30px)"
        width="110px"
        contain
        position="left"
        class="flex-shrink-1 ml-5"
      />

      <v-app-bar-title>ECG Analysis Report</v-app-bar-title>
      <v-spacer />
    </v-app-bar>
    <v-divider
      class="mx-4 my-1"
      style="border-color: #4A5060; border-bottom-width: 1px;"
    />

    <v-row
      class="mx-4"
      dense
    >
      <v-col
        v-for="(item, key) in
          Object.fromEntries(Object.entries(reportStore.reportInfo.patientInfo).slice(0,7))"
        :key="key"
        class="px-1 d-flex justify-space-between"
      >
        <v-list
          class="pa-0"
        >
          <v-list-item
            class="px-0"
          >
            <v-list-item-content>
              <v-list-item-title>{{ key }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-divider
      class="mx-4 my-1"
      style="border-color: #4A5060;"
    />
    <v-row
      class="mx-4"
      dense
    >
      <v-col
        v-for="(item, key) in
          Object.fromEntries(Object.entries(reportStore.reportInfo.patientInfo).slice(7))"
        :key="key"
        sm="2"
        class="px-1"
      >
        <v-list
          class="pa-0"
        >
          <v-list-item
            class="px-0"
          >
            <v-list-item-content>
              <v-list-item-title>{{ key }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-divider
      class="mx-4 my-1"
      style="border-color: #4A5060; border-bottom-width: 4px;"
    />
    <v-row id="page1">
      <v-col
        class="pr-0"
        style="max-width: 28%;"
      >
        <v-card
          flat
          tile
          class="mx-4"
        >
          <v-card-title
            class="pa-1"
          >
            {{ Object.keys(reportStore.reportInfo)[1] }}
          </v-card-title>
          <v-row>
            <v-col
              v-for="(item, key) in
                reportStore.reportInfo['Heart Rate']"
              :key="key"
              class="px-0"
            >
              <v-list
                class="pa-0"
                dense
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      {{ key }}
                    </v-list-item-subtitle>
                    <v-list-item-title
                      v-if="typeof item === 'string' "
                    >
                      {{ item }}
                    </v-list-item-title>
                    <template
                      v-if="typeof item === 'object'"
                    >
                      <v-list-item-title>
                        {{ Object.values(item)[0] }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ Object.values(item)[1] }}
                      </v-list-item-subtitle>
                    </template>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <v-divider
            style="border-color: #4A5060; border-bottom-width: 4px;"
          />
        </v-card>
        <v-card
          flat
          tile
          class="mx-4"
        >
          <v-card-title
            class="pa-1"
          >
            {{ Object.keys(reportStore.reportInfo)[2] }}
          </v-card-title>

          <v-row
            v-for="(item, key) in
              reportStore.reportInfo.Ectopics"
            :key="key"
            :style="key == 'Premature Supraventricular Complexes' ?
              // eslint-disable-next-line max-len
              'border-color: #4A5060; border-bottom-width: 1px; border-bottom: solid; border-bottom: inset'
              : '' "
            class="mx-2"
            no-gutters
          >
            <v-col>
              <v-card-subtitle
                class="pa-0"
              >
                {{ key }}
              </v-card-subtitle>

              <v-row>
                <v-col
                  v-for="(data, index) in item"
                  :key="index"
                  class="px-1"
                >
                  <v-list
                    class="pa-0"
                  >
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ index }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ data }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider
            style="border-color: #4A5060; border-bottom-width: 4px;"
          />
        </v-card>
        <v-card
          flat
          tile
          class="mx-4"
        >
          <v-card-title
            class="px-1"
          >
            {{ Object.keys(reportStore.reportInfo)[3] }}
          </v-card-title>
          <v-row
            dense
          >
            <v-col>
              <v-list
                v-for="(item, key) in
                  reportStore.reportInfo['Other']"
                :key="key"
                class="pa-0"
              >
                <v-list-item>
                  <v-list-item-title>
                    {{ key }}
                  </v-list-item-title>

                  <v-list-item-subtitle
                    class="d-flex justify-end"
                  >
                    {{ item }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <v-divider
            class="mx-4"
          />
        </v-card>
      </v-col>
      <v-col
        class="px-0 d-flex flex-grow-1 flex-column"
        style="min-width: 75vw;"
      >
        <v-row
          dense
        >
          <v-card
            flat
            tile
            class="flex-grow-1 pr-7"
          >
            <v-toolbar
              color="grey lighten-2"
              flat
              short
              class="mx-1"
            >
              <v-col>
                <v-card-title
                  class="px-0"
                >
                  {{ Object.keys(reportStore.reportInfo)[4] }}
                </v-card-title>
              </v-col>
              <v-col
                v-for="(item, key) in
                  Object.fromEntries(
                    Object.entries(reportStore.reportInfo['AFib/Flutter']).slice(0,4)
                  )"
                :key="key"
              >
                <v-list-item
                  two-line
                >
                  <v-list-item-content
                    height="48px"
                    class="mb-2 py-0"
                  >
                    <v-list-item-title> {{ key }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-toolbar>
            <v-card
              flat
              height="fit-content"
              class="px-2"
            >
              <v-row
                no-gutters
                dense
                class="py-1 px-4 caption d-flex flex-row justify-space-between"
              >
                <div class="d-flex">
                  <v-col
                    cols="8"
                    class="pa-0"
                  >
                    {{ reportStore.reportInfo['AFib/Flutter'].episode_info.label }}
                  </v-col>
                  <v-col
                    cols="8"
                    class="pa-0"
                  >
                    {{ reportStore.reportInfo['AFib/Flutter'].episode_info.value }}
                  </v-col>
                </div>
                <div class="d-flex">
                  <v-col
                    class="py-0"
                  >
                    {{ reportStore.reportInfo['AFib/Flutter'].episode_info.date }}
                  </v-col>
                  <v-col
                    class="py-0"
                  >
                    {{ reportStore.reportInfo['AFib/Flutter'].episode_info.time }}
                  </v-col>
                </div>
              </v-row>
              <div
                id="afib_report"
                style="outline: #D9D9D9 !important; outline-style: solid; outline-width: thin;"
              />
            </v-card>
            <v-divider
              inset
              class="mr-16"
              style="border-color: #4A5060; border-bottom-width: 2px;"
            />
          </v-card>
        </v-row>
        <v-row
          class="my-2 pr-8"
        >
          <v-toolbar
            color="grey lighten-2"
            flat
            short
            class="mx-2"
          >
            <v-col>
              <v-card-title>
                {{ Object.keys(reportStore.reportInfo)[5] }}
              </v-card-title>
            </v-col>
            <v-col
              v-for="(item, key) in
                Object.fromEntries(
                  Object.entries(reportStore.reportInfo['Pauses']).slice(0,4)
                )"
              :key="key"
            >
              <v-list-item
                two-line
              >
                <v-list-item-content
                  height="48px"
                  class="mb-2 py-0"
                >
                  <v-list-item-title> {{ key }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-toolbar>
        </v-row>
        <v-divider
          inset
          class="mr-16"
          style="border-color: #4A5060; border-bottom-width: 2px;"
        />
        <v-row
          class="my-2 pr-8"
        >
          <v-toolbar
            color="grey lighten-2"
            flat
            short
            class="mx-2"
          >
            <v-col>
              <v-card-title>
                {{ Object.keys(reportStore.reportInfo)[6] }}
              </v-card-title>
            </v-col>
            <v-col
              v-for="(item, key) in
                Object.fromEntries(
                  Object.entries(reportStore.reportInfo['VT']).slice(0,4)
                )"
              :key="key"
            >
              <v-list-item
                two-line
              >
                <v-list-item-content
                  height="48px"
                  class="mb-2 py-0"
                >
                  <v-list-item-title> {{ key }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-toolbar>
        </v-row>
        <v-divider
          inset
          class="mr-16"
          style="border-color: #4A5060; border-bottom-width: 2px;"
        />
        <v-row
          class="my-2 pr-8"
        >
          <v-toolbar
            color="grey lighten-2"
            flat
            short
            class="mx-2"
          >
            <v-col>
              <v-card-title>
                {{ Object.keys(reportStore.reportInfo)[7] }}
              </v-card-title>
            </v-col>
            <v-col
              v-for="(item, key) in
                Object.fromEntries(
                  Object.entries(reportStore.reportInfo['SVT']).slice(0,4)
                )"
              :key="key"
            >
              <v-list-item
                two-line
              >
                <v-list-item-content
                  height="48px"
                  class="mb-2 py-0"
                >
                  <v-list-item-title> {{ key }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-toolbar>
        </v-row>
        <v-divider
          inset
          class="mr-16"
          style="border-color: #4A5060; border-bottom-width: 2px;"
        />
        <v-row
          class="my-2 pr-8"
        >
          <v-toolbar
            color="grey lighten-2"
            flat
            short
            class="mx-2"
          >
            <v-col>
              <v-card-title>
                {{ Object.keys(reportStore.reportInfo)[8] }}
              </v-card-title>
            </v-col>
            <v-col>
              <v-list-item-content
                height="48px"
                class="mb-2 py-0"
              >
                <v-list-item-title> {{ reportStore.reportInfo['AV Block'] }}</v-list-item-title>
              </v-list-item-content>
            </v-col>
          </v-toolbar>
        </v-row>
        <v-divider
          inset
          class="mr-16"
          style="border-color: #4A5060; border-bottom-width: 2px;"
        />
        <v-row
          class="my-2"
        >
          <v-card
            flat
            class="pr-7 mx-2"
          >
            <v-card-title
              class="pl-0 py-2"
            >
              {{ Object.keys(reportStore.reportInfo)[9] }}
            </v-card-title>
            <v-card-text
              class="pl-0"
            >
              {{ reportStore.reportInfo['Findings'] }}
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-divider
      class="mx-4 my-2"
      style="border-color: #4A5060; border-bottom-width: 4px;"
    />
    <v-row
      class="mx-4 my-2 d-flex flex-grow-1 flex-column"
    >
      <v-card
        flat
        tile
        class="flex-row px-6"
      >
        <v-card-title
          class="pa-0"
        >
          Heart Rate
        </v-card-title>
        <div id="hr_report" />
      </v-card>
    </v-row>
    <v-divider
      class="mx-4 my-1"
      style="border-color: #4A5060; border-bottom-width: 4px;"
    />
    <v-row
      class="mx-4 my-2 d-flex flex-grow-1 flex-column"
    >
      <v-card
        flat
        tile
        class="flex-row px-6"
      >
        <v-card-title
          class="pa-0"
        >
          Afib/Flutter
        </v-card-title>
        <div id="hr_afib_report" />

        <v-divider
          class="mx-16 my-1"
          style="border-color: #4A5060; border-bottom-width: 4px;"
        />

        <div id="afib_burden_report" />
      </v-card>
    </v-row>
    <v-row
      class="mx-4 my-2 d-flex flex-grow-1 flex-column"
    >
      <v-divider
        class="mx-16 my-1"
        style="border-color: #4A5060; border-bottom-width: 4px;"
      />
      <v-card
        flat
        tile
        class="flex-row px-6"
      >
        <v-row>
          <v-col
            cols="3"
          >
            <v-card-title
              class="px-0"
            >
              {{ Object.keys(reportStore.reportInfo)[10] }}
            </v-card-title>
          </v-col>
          <v-col
            v-for="(item, key) in
              Object.fromEntries(
                Object.entries(reportStore.reportInfo['1. AFib / Flutter Episode'])
              )"
            :key="key"
          >
            <v-list-item
              two-line
            >
              <v-list-item-content
                height="48px"
                class="mb-2 py-0"
              >
                <v-list-item-title> {{ key }}</v-list-item-title>
                <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <div id="afib_1" />

        <v-row
          no-gutters
          class="d-flex justify-space-between"
        >
          <v-card
            flat
            tile
            height="fit-content"
            width="33%"
            class="pt-2"
          >
            <div
              id="afib1_onset"
              style="outline: #D9D9D9 !important; outline-style: solid; outline-width: thin;"
            />
            <v-card-text class="d-flex justify-center pt-0">
              Onset
            </v-card-text>
          </v-card>
          <v-card
            flat
            tile
            height="fit-content"
            width="33%"
            class="pt-2"
          >
            <div
              id="afib1_fastest"
              style="outline: #D9D9D9 !important; outline-style: solid; outline-width: thin;"
            />
            <v-card-text class="d-flex justify-center pt-0">
              Fastest
            </v-card-text>
          </v-card>
          <v-card
            flat
            tile
            height="fit-content"
            width="33%"
            class="pt-2"
          >
            <div
              id="afib1_termination"
              style="outline: #D9D9D9 !important; outline-style: solid; outline-width: thin;"
            />
            <v-card-text class="d-flex justify-center pt-0">
              Termination
            </v-card-text>
          </v-card>
        </v-row>
      </v-card>
    </v-row>
    <v-row
      class="mx-4 my-2 d-flex flex-grow-1 flex-column"
    >
      <v-divider
        class="mx-16 my-1"
        style="border-color: #4A5060; border-bottom-width: 4px;"
      />
      <v-card
        flat
        tile
        class="flex-row px-6"
      >
        <v-row>
          <v-col
            cols="3"
          >
            <v-card-title
              class="px-0"
            >
              {{ Object.keys(reportStore.reportInfo)[11] }}
            </v-card-title>
          </v-col>
          <v-col
            v-for="(item, key) in
              Object.fromEntries(
                Object.entries(reportStore.reportInfo['2. AFib / Flutter Episode'])
              )"
            :key="key"
          >
            <v-list-item
              two-line
            >
              <v-list-item-content
                height="48px"
                class="mb-2 py-0"
              >
                <v-list-item-title> {{ key }}</v-list-item-title>
                <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <div id="afib_2" />

        <v-row
          no-gutters
          class="d-flex justify-space-between"
        >
          <v-card
            flat
            tile
            height="fit-content"
            width="33%"
            class="pt-2"
          >
            <div
              id="afib2_onset"
              style="outline: #D9D9D9 !important; outline-style: solid; outline-width: thin;"
            />
            <v-card-text class="d-flex justify-center pt-0">
              Onset
            </v-card-text>
          </v-card>
          <v-card
            flat
            tile
            height="fit-content"
            width="33%"
            class="pt-2"
          >
            <div
              id="afib2_fastest"
              style="outline: #D9D9D9 !important; outline-style: solid; outline-width: thin;"
            />
            <v-card-text class="d-flex justify-center pt-0">
              Fastest
            </v-card-text>
          </v-card>
          <v-card
            flat
            tile
            height="fit-content"
            width="33%"
            class="pt-2"
          >
            <div
              id="afib2_termination"
              style="outline: #D9D9D9 !important; outline-style: solid; outline-width: thin;"
            />
            <v-card-text class="d-flex justify-center pt-0">
              Termination
            </v-card-text>
          </v-card>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<style >
@media print {
  /* for firefox */
@-moz-document url-prefix() {
  @page { size: landscape; }
}

#afib1_termination, #afib1_fastest, #afib1_onset, #afib2_termination, #afib2_fastest, #afib2_onset{
  width: fit-content;
}
#page1 {page-break-after: always;}

}
/*Edge*/
@media print and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  @page { size: landscape; }
}

</style>
