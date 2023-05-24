import { defineStore } from 'pinia';
import { ref } from '@vue/composition-api';
import { ChartData } from '@/stores/types';

// eslint-disable-next-line import/prefer-default-export
export const useEpisodeDataStore = defineStore('episodeData', () => {
  const showHrNotification = ref(false);

  const afib = ref({
    burden: '45%',
    'longest duration': '1 d 20 h',
    'hr range': '55-178 bpm',
    avg: '89 bpm',
  });

  const minHR = ref({
    value: ' 68 pbm',
    time: '07/10/2022 10:40 PM',
  });

  const maxHR = ref({
    value: ' 168 pbm',
    time: '07/10/2022 9:40 AM',
  });

  const psvc = ref({
    beats: '254 beats',
    'hr range': '55-178 bpm',
    avg: '89 bpm',
  });

  const pvc = ref({
    beats: '254 beats',
    'hr range': '55-178 bpm',
    avg: '89 bpm',
  });

  const otherBeats = ref({
    beats: '254 beats',
    'hr range': '55-178 bpm',
    avg: '89 bpm',
  });
  const sinus = ref({
    examples: '5 examples',
    'longest duration': '1 d 20 h',
    'hr range': '55-178 bpm',
    avg: '89 bpm',
  });

  const svt = ref({
    episodes: '1 episode',
    'longest duration': '1 d 20 h',
    'hr range': '55-178 bpm',
    avg: '89 bpm',
  });
  const vt = ref({
    episodes: '5 episodes',
    'longest duration': '1 d 20 h',
    'hr range': '55-178 bpm',
    avg: '89 bpm',
  });
  const pauses = ref({
    episodes: '3 episodes',
    'longest duration': '1 d 20 h',
    'hr range': '55-178 bpm',
    avg: '89 bpm',
  });
  const avBlock = ref({
    type: '--%',
    'longest duration': '1 d 20 h',
    'hr range': '55-178 bpm',
    avg: '89 bpm',
  });

  const episodeData = ref([
    [{
      x: [] as number[],
      y: [] as number[],
      type: 'scatter',
      line: {
        color: 'black',
      },
    }],
    [{
      x: [] as number[],
      y: [] as number[],
      type: 'scatter',
      line: {
        color: 'black',
      },
    }],
    [{
      x: [] as number[],
      y: [] as number[],
      type: 'scatter',
      line: {
        color: 'black',
      },
    }],
  ]);
  const afibEpisodesData = ref([
    [{
      x: [] as number[],
      y: [] as number[],
      type: 'scatter',
      line: {
        color: 'black',
      },
    }],
    [{
      x: [] as number[],
      y: [] as number[],
      type: 'scatter',
      line: {
        color: 'black',
      },
    }],
    [{
      x: [] as number[],
      y: [] as number[],
      type: 'scatter',
      line: {
        color: 'black',
      },
    }],
  ]);
  const episodeLayout = ref({
    xaxis: {
      showline: true,
      showgrid: false,
      showticklabels: false,
      zeroline: false,
    },
    yaxis: {
      fixedrange: true,
      showline: false,
      showgrid: false,
      showticklabels: false,
      zeroline: false,
    },

    margin: {
      b: 0,
      l: 10,
      r: 10,
      t: 0,
    },
    width: 500,
    hovermode: false,
  });

  const episodeChartData = ref<Record<string, ChartData>>({
    minHR: {
      episodeData: minHR.value,
      chartTitle: 'Min HR',
      chartId: 'minhr',
      data: episodeData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#ffa29e',
    },
    maxHR: {
      episodeData: maxHR.value,
      chartTitle: 'Max HR',
      chartId: 'maxhr',
      data: episodeData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#9274d5',
    },
    PSVC: {
      episodeData: psvc.value,
      chartTitle: 'PSVC',
      chartId: 'psvc',
      data: episodeData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#fffb82',
    },
    PVC: {
      episodeData: pvc.value,
      chartTitle: 'PVC',
      chartId: 'pvc',
      data: episodeData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#C5E1A5',
    },
    OtherBeats: {
      episodeData: otherBeats.value,
      chartTitle: 'Other Beats',
      chartId: 'other_beats',
      data: episodeData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#FFAB40',
    },
    sinus: {
      episodeData: sinus.value,
      chartTitle: 'Sinus',
      chartId: 'sinus',
      data: episodeData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#82B1FF',
    },
    AFib: {
      episodeData: afib.value,
      chartTitle: 'AFib/Flutter',
      chartId: 'afib',
      data: afibEpisodesData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#FF8A65',
    },
    SVT: {
      episodeData: svt.value,
      chartTitle: 'SVT',
      chartId: 'svt',
      data: episodeData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#9FA8DA',
    },
    VT: {
      episodeData: vt.value,
      chartTitle: 'VT',
      chartId: 'vt',
      data: episodeData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#B39DDB',
    },
    pauses: {
      episodeData: pauses.value,
      chartTitle: 'Pauses',
      chartId: 'pauses',
      data: episodeData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#E1BEE7',
    },
    avBlock: {
      episodeData: avBlock.value,
      chartTitle: 'AV Block',
      chartId: 'av_block',
      data: episodeData.value,
      layout: episodeLayout.value,
      checked: false,
      show: false,
      color: '#FF80AB',
    },
  });

  const selectedChartData = ref<ChartData>({
    episodeData: {},
    chartTitle: '',
    chartId: '',
    data: [{}],
    layout: {},
    checked: false,
    show: false,
    color: '',
  });

  return {
    afib,
    minHR,
    maxHR,
    pauses,
    psvc,
    pvc,
    otherBeats,
    sinus,
    svt,
    vt,
    avBlock,
    episodeChartData,
    selectedChartData,
    episodeData,
    episodeLayout,
    afibEpisodesData,
    showHrNotification,
  };
});
