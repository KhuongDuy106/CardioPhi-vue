<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { storeToRefs } from 'pinia';

import { useEcgStore } from '@/stores/EcgStore';
import TimeChartNotificationVue from './TimeChartNotification.vue';

export default defineComponent({
  name: 'TimeStats',
  components: {
    TimeChartNotificationVue,
  },
  setup() {
    const store = useEcgStore();

    const { predictionWidget, showTCNotification } = storeToRefs(store);
    const selectedTab = ref('');

    return { predictionWidget, selectedTab, showTCNotification };
  },
});
</script>
<template>
  <v-row
    style="height: 25vh;"
  >
    <v-card
      flat
      tile
      color="secondary"
      class="mx-7 flex-grow-1"
      width="100%"
      height="100%"
      max-height="500px"
      min-height="fit-content"
    >
      <v-row
        dense
        no-gutters
        class="mx-2 pt-1"
      >
        <div
          style=" width:min-content;"
        >
          <v-tabs
            v-model="selectedTab"
            height="max-content"
            color="black"
            background-color="#F0F2F4"
          >
            <v-tab
              class="py-2"
            >
              Today
            </v-tab>
            <v-tab
              class="py-2"
            >
              Hourly
            </v-tab>
            <v-tab
              class="py-2"
            >
              Daily
            </v-tab>
          </v-tabs>
        </div>
        <v-spacer />

        <v-btn
          icon
          small
          color="white"
          @click="showTCNotification=true"
        >
          <v-icon>
            mdi-bell-outline
          </v-icon>
        </v-btn>
        <v-btn
          color="white"
          icon
          small
          @click="showTCNotification=true"
        >
          <v-icon>
            mdi-tune-vertical
          </v-icon>
        </v-btn>
      </v-row>

      <v-tabs-items
        v-model="selectedTab"
      >
        <v-tab-item>
          <v-card
            dark
            color="secondary"
            flat
            tile
            height="100%"
            class="px-4 d-flex flex-column"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="1"
              />
              <v-col
                cols="3"
              >
                <div
                  class="title"
                  style="text-align: center;"
                >
                  Morning
                </div>
              </v-col>
              <v-col
                cols="2"
              >
                <div
                  class="title"
                  style="text-align: center;"
                >
                  Afternoon
                </div>
              </v-col>
              <v-col
                cols="2"
              >
                <div
                  class="title"
                  style="text-align: center;"
                >
                  Evening
                </div>
              </v-col>
              <v-col
                cols="2"
              >
                <div
                  class="title"
                  style="text-align: center;"
                >
                  Overnight
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="1"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subheading">
                      AFib/Flutter
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="3"
              >
                <v-list
                  color="secondary"
                  dense
                  class="py-0"
                >
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Burden:</v-list-item-title>
                    <v-list-item-subtitle>
                      59.62%
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: fit-content;"
                  >
                    <v-list-item-title>Longest Duration:</v-list-item-title>
                    <v-list-item-subtitle>
                      1 d 20 h
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: fit-content;"
                  >
                    <v-list-item-title>Max HR:</v-list-item-title>
                    <v-list-item-subtitle>
                      154 bpm
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                cols="2"
              >
                <div style="text-align: center;">
                  {{ Math.round(predictionWidget.today.AFIB.afternoon) }}%
                </div>
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                cols="2"
              >
                <div style="text-align: center;">
                  {{ Math.round(predictionWidget.today.AFIB.evening) }}%
                </div>
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                cols="2"
              >
                <div style="text-align: center;">
                  {{ Math.round(predictionWidget.today.AFIB.overnight) }}%
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="1"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subheading">
                      VT
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="3"
              >
                <v-list
                  color="secondary"
                  dense
                  class="py-0"
                >
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Episodes:</v-list-item-title>
                    <v-list-item-subtitle>
                      5
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Longest Episode:</v-list-item-title>
                    <v-list-item-subtitle>
                      57s
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                cols="2"
              >
                <div style="text-align: center;">
                  {{ Math.round(predictionWidget.today.VT.afternoon) }}%
                </div>
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                cols="2"
              >
                <div style="text-align: center;">
                  {{ Math.round(predictionWidget.today.VT.evening) }}%
                </div>
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                cols="2"
              >
                <div style="text-align: center;">
                  {{ Math.round(predictionWidget.today.VT.overnight) }}%
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="1"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subheading">
                      SVT
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="3"
              >
                <v-list
                  color="secondary"
                  dense
                  class="py-0"
                >
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Episodes:</v-list-item-title>
                    <v-list-item-subtitle>
                      5
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Longest Episode:</v-list-item-title>
                    <v-list-item-subtitle>
                      57s
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                cols="2"
              >
                <div style="text-align: center;">
                  {{ Math.round(predictionWidget.today.SVT.afternoon) }}%
                </div>
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                cols="2"
              >
                <div style="text-align: center;">
                  {{ Math.round(predictionWidget.today.SVT.evening) }}%
                </div>
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                cols="2"
              >
                <div style="text-align: center;">
                  {{ Math.round(predictionWidget.today.SVT.overnight) }}%
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card
            dark
            color="secondary"
            flat
            tile
            height="100%"
            class="px-4 d-flex flex-column"
          >
            <v-row
              no-gutters
            >
              <v-col />
              <v-col
                cols="2"
                class="title d-flex justify-center"
              >
                10AM
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                11AM
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                12PM
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                1PM
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                2PM
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                3PM
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                4PM
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                5PM
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                6PM
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                7PM
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subheading">
                      AFib/Flutter
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="2"
              >
                <v-list
                  color="secondary"
                  dense
                  class="py-0"
                >
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Burden:</v-list-item-title>
                    <v-list-item-subtitle>
                      59.62%
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: fit-content;"
                  >
                    <v-list-item-title>Longest Duration:</v-list-item-title>
                    <v-list-item-subtitle>
                      1 d 20 h
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: fit-content;"
                  >
                    <v-list-item-title>Max HR:</v-list-item-title>
                    <v-list-item-subtitle>
                      154 bpm
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.AFIB["1"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.AFIB["2"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.AFIB["3"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.AFIB["4"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.AFIB["5"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.AFIB["6"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.AFIB["7"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.AFIB["8"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.AFIB["9"]) }}%
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subheading">
                      VT
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="2"
              >
                <v-list
                  color="secondary"
                  dense
                  class="py-0"
                >
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Episodes:</v-list-item-title>
                    <v-list-item-subtitle>
                      5
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Longest Episode:</v-list-item-title>
                    <v-list-item-subtitle>
                      57s
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.VT["1"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.VT["2"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.VT["3"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.VT["4"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.VT["5"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.VT["6"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.VT["7"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.VT["8"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.VT["9"]) }}%
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subheading">
                      SVT
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="2"
              >
                <v-list
                  color="secondary"
                  dense
                  class="py-0"
                >
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Episodes:</v-list-item-title>
                    <v-list-item-subtitle>
                      5
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Longest Episode:</v-list-item-title>
                    <v-list-item-subtitle>
                      57s
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.SVT["1"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.SVT["2"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.SVT["3"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.SVT["4"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.SVT["5"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.SVT["6"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.SVT["7"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.SVT["8"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.hourly.SVT["9"]) }}%
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card
            dark
            color="secondary"
            flat
            tile
            height="100%"
            class="px-4 d-flex flex-column"
          >
            <v-row
              no-gutters
            >
              <v-col />
              <v-col
                cols="2"
                class="title d-flex justify-center"
              >
                Mon
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                Tues
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                Weds
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                Thurs
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                Fri
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                Sat
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                Sun
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                Mon
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                Tues
              </v-col>
              <v-col
                class="title d-flex justify-center"
              >
                Weds
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="1"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subheading">
                      AFib/Flutter
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="2"
              >
                <v-list
                  color="secondary"
                  dense
                  class="py-0"
                >
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Burden:</v-list-item-title>
                    <v-list-item-subtitle>
                      59.62%
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: fit-content;"
                  >
                    <v-list-item-title>Longest Duration:</v-list-item-title>
                    <v-list-item-subtitle>
                      1 d 20 h
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: fit-content;"
                  >
                    <v-list-item-title>Max HR:</v-list-item-title>
                    <v-list-item-subtitle>
                      154 bpm
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.AFIB["1"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.AFIB["2"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.AFIB["3"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.AFIB["4"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.AFIB["5"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.AFIB["6"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.AFIB["7"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.AFIB["8"]) }}%
              </v-col>
              <v-divider
                vertical
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.AFIB["9"]) }}%
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="1"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subheading">
                      VT
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="2"
              >
                <v-list
                  color="secondary"
                  dense
                  class="py-0"
                >
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Episodes:</v-list-item-title>
                    <v-list-item-subtitle>
                      5
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Longest Episode:</v-list-item-title>
                    <v-list-item-subtitle>
                      57s
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.VT["1"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.VT["2"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.VT["3"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.VT["4"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.VT["5"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.VT["6"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.VT["7"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.VT["8"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.VT["9"]) }}%
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="1"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subheading">
                      SVT
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="2"
              >
                <v-list
                  color="secondary"
                  dense
                  class="py-0"
                >
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Episodes:</v-list-item-title>
                    <v-list-item-subtitle>
                      5
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item
                    style="min-height: min-content;"
                  >
                    <v-list-item-title>Longest Episode:</v-list-item-title>
                    <v-list-item-subtitle>
                      57s
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                inset
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.SVT["1"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                inset
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.SVT["2"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                inset
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.SVT["3"]) }}%
              </v-col>
              <v-divider
                vertical
                class="mt-0"
                inset
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.SVT["4"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.SVT["5"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.SVT["6"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.SVT["7"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.SVT["8"]) }}%
              </v-col>
              <v-divider
                vertical
                inset
                class="mt-0"
                style="border-color: white;"
              />
              <v-col
                class="d-flex justify-center"
              >
                {{ Math.round(predictionWidget.daily.SVT["9"]) }}%
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-navigation-drawer
      v-if="showTCNotification"
      right
      absolute
      width="500px"
    >
      <TimeChartNotificationVue />
    </v-navigation-drawer>
  </v-row>
</template>
