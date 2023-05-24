/* eslint-disable max-len */
import { defineStore } from 'pinia';
import { ref, Ref } from '@vue/composition-api';
import { ecgSummary } from '@/api/rest';

// eslint-disable-next-line import/prefer-default-export
export const useHeartRateStore = defineStore('hearRate', () => {
  const beatdata: Ref<number[][]> = ref([]);

  async function fetchEcgSummary() {
    const data = await ecgSummary();
    beatdata.value = data.heart_rate_chart;
  }
  fetchEcgSummary();

  return { beatdata };
});
