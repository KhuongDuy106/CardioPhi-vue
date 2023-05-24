import { defineStore } from 'pinia';
import { ref, Ref } from '@vue/composition-api';
import { ecgSummary } from '@/api/rest';

// eslint-disable-next-line import/prefer-default-export
export const useEpisodesChartStore = defineStore('afibEpisodeData', () => {
  const AfibChart1:Ref<Record<string, number[]|string>> = ref({
    afibEpisode1: [],
    afibEpisode2: [],
    afibEpisode3: [],
    duration: '',
    date_time: '',
  });
  const avBlockChart:Ref<Record<string, number[]>> = ref({
    chart1: [],
    chart2: [],
    chart3: [],
  });
  const maxHRChart:Ref<Record<string, number[]>> = ref({
    chart1: [],
    chart2: [],
    chart3: [],
  });
  const minHRChart:Ref<Record<string, number[]>> = ref({
    chart1: [],
    chart2: [],
    chart3: [],
  });
  const otherBeatsChart:Ref<Record<string, number[]>> = ref({
    chart1: [],
    chart2: [],
    chart3: [],
  });
  const pausesChart:Ref<Record<string, number[]>> = ref({
    chart1: [],
    chart2: [],
    chart3: [],
  });
  const psvcChart:Ref<Record<string, number[]>> = ref({
    chart1: [],
    chart2: [],
    chart3: [],
  });
  const pvcChart:Ref<Record<string, number[]>> = ref({
    chart1: [],
    chart2: [],
    chart3: [],
  });
  const sinusChart:Ref<Record<string, number[]>> = ref({
    chart1: [],
    chart2: [],
    chart3: [],
  });
  const svtChart:Ref<Record<string, number[]>> = ref({
    chart1: [],
    chart2: [],
    chart3: [],
  });
  const vtChart:Ref<Record<string, number[]>> = ref({
    chart1: [],
    chart2: [],
    chart3: [],
  });

  const afibData = ref({
    burden: '',
    longest_duration: '',
    hr_range: '',
    avg: '',
  });

  async function fetchEcgSummary() {
    const data = await ecgSummary();
    AfibChart1.value.afibEpisode1 = data.episode_data.afib.chart_1.afib_episode_1;
    AfibChart1.value.afibEpisode2 = data.episode_data.afib.chart_1.afib_episode_2;
    AfibChart1.value.afibEpisode3 = data.episode_data.afib.chart_1.afib_episode_3;
    AfibChart1.value.duration = data.episode_data.afib.chart_1.duration;
    AfibChart1.value.date_time = data.episode_data.afib.chart_1.date_time;
    afibData.value.burden = data.episode_data.afib.burden;
    afibData.value.longest_duration = data.episode_data.afib.longest_duration;
    afibData.value.hr_range = data.episode_data.afib.hr_range;
    afibData.value.avg = data.episode_data.afib.avg;

    avBlockChart.value.chart1 = data.episode_data.av_block.chart_1;
    avBlockChart.value.chart2 = data.episode_data.av_block.chart_2;
    avBlockChart.value.chart3 = data.episode_data.av_block.chart_3;

    maxHRChart.value.chart1 = data.episode_data.max_hr.chart_1;
    maxHRChart.value.chart2 = data.episode_data.max_hr.chart_2;
    maxHRChart.value.chart3 = data.episode_data.max_hr.chart_3;

    minHRChart.value.chart1 = data.episode_data.min_hr.chart_1;
    minHRChart.value.chart2 = data.episode_data.min_hr.chart_2;
    minHRChart.value.chart2 = data.episode_data.min_hr.chart_3;

    otherBeatsChart.value.chart1 = data.episode_data.other_beats.chart_1;
    otherBeatsChart.value.chart2 = data.episode_data.other_beats.chart_2;
    otherBeatsChart.value.chart2 = data.episode_data.other_beats.chart_3;

    pausesChart.value.chart1 = data.episode_data.pauses.chart_1;
    pausesChart.value.chart2 = data.episode_data.pauses.chart_2;
    pausesChart.value.chart2 = data.episode_data.pauses.chart_3;

    psvcChart.value.chart1 = data.episode_data.psvc.chart_1;
    psvcChart.value.chart2 = data.episode_data.psvc.chart_2;
    psvcChart.value.chart2 = data.episode_data.psvc.chart_3;

    pvcChart.value.chart1 = data.episode_data.pvc.chart_1;
    pvcChart.value.chart2 = data.episode_data.pvc.chart_2;
    pvcChart.value.chart2 = data.episode_data.pvc.chart_3;

    sinusChart.value.chart1 = data.episode_data.sinus.chart_1;
    sinusChart.value.chart2 = data.episode_data.sinus.chart_2;
    sinusChart.value.chart2 = data.episode_data.sinus.chart_3;

    svtChart.value.chart1 = data.episode_data.svt.chart_1;
    svtChart.value.chart2 = data.episode_data.svt.chart_2;
    svtChart.value.chart2 = data.episode_data.svt.chart_3;

    svtChart.value.chart1 = data.episode_data.svt.chart_1;
    svtChart.value.chart2 = data.episode_data.svt.chart_2;
    svtChart.value.chart2 = data.episode_data.svt.chart_3;
  }
  fetchEcgSummary();

  return {
    fetchEcgSummary,
    AfibChart1,
    afibData,
    avBlockChart,
    maxHRChart,
    minHRChart,
    otherBeatsChart,
    pausesChart,
    psvcChart,
    pvcChart,
    sinusChart,
    svtChart,
    vtChart,
  };
});
