<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { storeToRefs } from 'pinia';
import { useEpisodeDataStore } from '@/stores/EpisodeData';

export default defineComponent({
  name: 'HrNotification',
  setup() {
    const episodeStore = useEpisodeDataStore();
    const { showHrNotification } = storeToRefs(episodeStore);
    // const modal = ref(false);
    // const date = ref('');
    // const afibNotification = ref(false);
    // const vtNotification = ref(false);
    // const pauseNotification = ref(false);
    // const pvcNotification = ref(false);
    // const svtNotification = ref(false);
    const alertActions = ref({
      pvc: {
        checked: false,
        action: ['Sound', 'SMS', 'Notification'],
        expiration: '07/08/2021',
        burden: {
          operator: ['>', '<', '='],
          value: '20',
        },
      },
      svt: {
        checked: false,
        action: ['Sound', 'SMS', 'Notification'],
        expiration: '07/08/2021',
        hr: {
          operator: ['>', '<', '='],
          value: '150',
        },
      },
      vt: {
        checked: false,
        action: ['Sound', 'SMS', 'Notification'],
        expiration: '07/08/2021',
        hr: {
          operator: ['>', '<', '='],
          value: '150',
        },
        duration: {
          operator: ['>', '<', '='],
          value: '30',
        },
      },
      pause: {
        checked: false,
        action: ['Sound', 'SMS', 'Notification'],
        expiration: '07/08/2021',
        duration: {
          operator: ['>', '<', '='],
          value: '5',
        },
      },
      afib: {
        checked: false,
        action: ['Sound', 'SMS', 'Notification'],
        expiration: '07/08/2021',
        hr: {
          operator: ['>', '<', '='],
          value: '150',
        },
      },
    });

    return {
      showHrNotification,
      alertActions,
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
        @click="showHrNotification = false"
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
      class="px-2"
    >
      <v-checkbox
        v-model="alertActions.pvc.checked"
        color="#4A5060"
        dense
        label="Premature ventricular contractions (PVC)"
        class="pt-0"
      />
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex pa-2"
        >
          Action:
          <v-col
            cols="8"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.pvc.action"
              hide-selected
              dense
              value="Sound"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
        <v-col
          class="d-flex pa-2"
        >
          Expiration:

          <v-text-field
            v-model="alertActions.pvc.expiration"
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
          Burden:
          <v-col
            cols="4"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.pvc.burden.operator"
              color="#4A5060"
              dense
              hide-selected
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
            cols="4"
            class="pa-0 mx-2"
          >
            <v-text-field
              v-model="alertActions.pvc.burden.value"
              color="#4A5060"
              dense
              suffix="%"
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
            value="07/08/2021"
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
          HR:
          <v-col
            cols="4"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.svt.hr.operator"
              dense
              hide-selected
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
              v-model="alertActions.svt.hr.value"
              dense
              suffix="bpm"
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
          HR:
          <v-col
            cols="4"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.vt.hr.operator"
              dense
              hide-selected
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
              v-model="alertActions.vt.hr.value"
              dense
              suffix="bpm"
              class="mt-0 pt-0 mr-6"
            />
          </v-col>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="mx-2 mb-2"
      >
        AND/OR
      </v-row>
      <v-row
        no-gutters
        dense
      >
        <v-col
          class="d-flex px-2"
        >
          Duration:
          <v-col
            cols="4"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.vt.duration.operator"
              dense
              hide-selected
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
              v-model="alertActions.vt.duration.value"
              dense
              suffix="sec"
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
        v-model="alertActions.pause.checked"
        color="#4A5060"
        label="Pause"
        dense
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
              :items="alertActions.pause.action"
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
            v-model="alertActions.pause.expiration"
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
          Duration:
          <v-col
            cols="4"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.pause.duration.operator"
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
              v-model="alertActions.pause.duration.value"
              dense
              suffix="sec"
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
        v-model="alertActions.afib.checked"
        color="#4A5060"
        label="AFIB/Flutter "
        dense
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
          HR:
          <v-col
            cols="4"
            class="pa-0 mx-2"
          >
            <v-select
              :items="alertActions.afib.hr.operator"
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
              v-model="alertActions.afib.hr.value"
              dense
              suffix="bpm"
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
