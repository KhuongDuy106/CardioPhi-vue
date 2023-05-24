<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { storeToRefs } from 'pinia';
import { useEcgStore } from '@/stores/EcgStore';

export default defineComponent({
  name: 'TimeChartNotification',
  setup() {
    const ecgstore = useEcgStore();
    const { showTCNotification } = storeToRefs(ecgstore);

    const alertActions = ref({

      afib: {
        checked: false,
        action: ['Sound', 'SMS', 'Notification'],
        expiration: '07/08/2021',
        prob: {
          operator: ['>', '<', '='],
          value: '50',
        },
        rolling: ['Hourly', '6 hour', 'Daily'],
      },
      vt: {
        checked: false,
        action: ['Sound', 'SMS', 'Notification'],
        expiration: '07/08/2021',
        prob: {
          operator: ['>', '<', '='],
          value: '50',
        },
        rolling: ['Hourly', '6 hour', 'Daily'],
      },
      svt: {
        checked: false,
        action: ['Sound', 'SMS', 'Notification'],
        expiration: '07/08/2021',
        prob: {
          operator: ['>', '<', '='],
          value: '50',
        },
        rolling: ['Hourly', '6 hour', 'Daily'],
      },
    });

    return {
      showTCNotification, alertActions,
    };
  },
});
</script>

<template>
  <v-card
    flat
    tile
    color="primary"
    height="100%"
  >
    <v-toolbar
      dense
      dark
      tile
      flat
      color="secondary"
    >
      <v-toolbar-title
        class="d-flex"
      >
        Alert Editor
        <v-icon>
          mdi-bell-outline
        </v-icon>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click="showTCNotification = false"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-toolbar>

    <v-card
      color="primary"
      flat
      tile
      class="pa-2"
    >
      <v-checkbox
        v-model="alertActions.afib.checked"
        color="#4A5060"
        dense
        label="AFIB/Flutter"
        class="pt-0"
      />
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex px-2"
        >
          Action:
          <v-col
            cols="8"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.afib.action"
              hide-selected
              dense
              value="Sound"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
        <v-col
          class="d-flex px-2"
        >
          Expiration:
          <v-text-field
            v-model="alertActions.afib.expiration"
            dense
            prepend-icon="mdi-calendar"
            readonly
            color="#4A5060"
            class="mt-0 pt-0 px-1"
          />
        </v-col>
      </v-row>
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex px-2"
        >
          Prob:
          <v-col
            cols="4"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.afib.prob.operator"
              hide-selected
              dense
              value=">"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
        <v-col
          class="d-flex px-2"
        >
          Value:
          <v-col
            cols="5"
            class="pa-0 mx-2"
          >
            <v-text-field
              v-model="alertActions.afib.prob.value"
              dense
              value="50"
              suffix="%"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex px-2"
        >
          Rolling:
          <v-col
            cols="3"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.afib.rolling"
              hide-selected
              dense
              value="Hourly"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
      </v-row>
    </v-card>
    <v-divider
      light
      style="border-color: #4A5060;"
    />
    <v-card
      color="primary"
      flat
      tile
      class="pa-2"
    >
      <v-checkbox
        v-model="alertActions.vt.checked"
        color="#4A5060"
        dense
        label="Ventricular tachycardia (VT)"
        class="pt-0"
      />
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex px-2"
        >
          Action:
          <v-col
            cols="8"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.vt.action"
              hide-selected
              dense
              value="Sound"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
        <v-col
          class="d-flex px-2"
        >
          Expiration:

          <v-text-field
            v-model="alertActions.vt.expiration"
            dense
            prepend-icon="mdi-calendar"
            readonly
            color="#4A5060"
            class="mt-0 pt-0 px-1"
          />
        </v-col>
      </v-row>
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex px-2"
        >
          Prob.:
          <v-col
            cols="4"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.vt.prob.operator"
              hide-selected
              dense
              value=">"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
        <v-col
          class="d-flex px-2"
        >
          Value:
          <v-col
            cols="5"
            class="pa-0 mx-2"
          >
            <v-text-field
              v-model="alertActions.vt.prob.value"
              dense
              suffix="%"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex px-2"
        >
          Rolling:
          <v-col
            cols="3"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.vt.rolling"
              hide-selected
              dense
              value="Hourly"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
      </v-row>
    </v-card>
    <v-divider
      light
      style="border-color: #4A5060;"
    />
    <v-card
      color="primary"
      flat
      tile
      class="pa-2"
    >
      <v-checkbox
        v-model="alertActions.svt.checked"
        color="#4A5060"
        dense
        label="Supraventricular tachycardia (SVT)"
        class="pt-0"
      />
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex px-2"
        >
          Action:
          <v-col
            cols="8"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.svt.action"
              hide-selected
              dense
              value="Sound"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
        <v-col
          class="d-flex px-2"
        >
          Expiration:
          <v-text-field
            v-model="alertActions.svt.expiration"
            dense
            prepend-icon="mdi-calendar"
            readonly
            color="#4A5060"
            class="mt-0 pt-0 px-1"
          />
        </v-col>
      </v-row>
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex px-2"
        >
          Prob.:
          <v-col
            cols="4"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.svt.prob.operator"
              hide-selected
              dense
              value=">"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
        <v-col
          class="d-flex px-2"
        >
          Value:
          <v-col
            cols="5"
            class="pa-0 mx-2"
          >
            <v-text-field
              v-model="alertActions.svt.prob.value"
              dense
              value="50"
              suffix="%"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex px-2"
        >
          Rolling:
          <v-col
            cols="3"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.svt.rolling"
              hide-selected
              dense
              value="Hourly"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
      </v-row>
    </v-card>
    <v-divider
      light
      style="border-color: #4A5060;"
    />
  </v-card>
</template>
