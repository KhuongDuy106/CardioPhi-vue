import { defineStore } from 'pinia';
import { ref, Ref } from '@vue/composition-api';
import { ecgSummary } from '@/api/rest';

// eslint-disable-next-line import/prefer-default-export
export const useEcgStore = defineStore('graphData', () => {
  const metaData = ref({});
  const liveGraph: Ref<Record<string, any>> = ref({
    raw_signal: [],
    hr: { min: 0, max: 0, current: 0 },
    detections: [],
  });
  // eslint-disable-next-line max-len
  const tickvals = [0, 350, 700, 1050, 1400, 1750, 2100, 2450, 2800, 3150, 3590, 3940, 4290, 4640, 4990, 5340, 5690, 6040, 6390, 6740, 7090, 7440, 7790, 8140, 8490, 8840, 9190, 9540, 9890, 10240, 10590, 10940, 11290, 11640, 11990, 12340, 12690, 13040, 13390, 13740, 14090, 14440, 14790, 15140, 15490, 15840, 16190, 16540, 16890, 17240, 17590, 17940, 18290, 18640, 18990, 19340, 19690, 20040, 20390, 20740, 21090, 21440, 21790, 22140, 22490, 22840, 23190, 23540, 23890, 24240, 24590, 24940, 25290, 25640, 25990, 26340, 26690, 27040, 27390, 27740, 28090, 28440, 28790, 29140, 29490, 29840, 30190, 30540, 30890, 31240, 31590, 31940, 32290, 32640, 32990, 33340, 33690, 34040, 34390, 34740, 35090, 35440, 35790, 36140, 36490, 36840, 37190, 37540, 37890, 38240, 38590, 38940, 39290, 39640, 39990, 40340, 40690, 41040, 41390, 41740, 42090, 42440, 42790, 43140, 43490, 43840, 44190, 44540, 44890, 45240, 45590, 45940, 46290, 46640, 46990, 47340, 47690, 48040, 48390, 48740, 49090, 49440, 49790, 50140, 50490, 50840, 51190, 51540, 51890, 52240, 52590, 52940, 53290, 53640, 53990, 54340, 54690, 55040, 55390, 55740, 56090, 56440, 56790, 57140, 57490, 57840, 58190, 58540, 58890, 59240, 59590, 59940, 60290, 60640, 60990, 61340, 61690, 62040, 62390, 62740, 63090, 63440, 63790, 64140, 64490, 64840, 65190, 65540, 65890, 66240, 66590, 66940, 67290, 67640, 67990, 68340, 68690, 69040, 69390, 69740, 70090, 70440, 70790, 71140, 71490, 71840, 72190, 72540, 72890, 73240, 73590, 73940, 74290, 74640, 74990, 75340, 75690, 76040, 76390, 76740, 77090, 77440, 77790, 78140, 78490, 78840, 79190, 79540, 79890, 80240, 80590, 80940, 81290, 81640, 81990, 82340, 82690, 83040, 83390, 83740, 84090, 84440, 84790, 85140, 85490, 85840, 86190, 86540, 86890, 87240, 87590, 87940, 88290, 88640, 88990, 89340, 89690, 90040, 90390, 90740, 91090, 91440, 91790, 92140, 92490, 92840, 93190, 93540, 93890, 94240, 94590, 94940, 95290, 95640, 95990, 96340, 96690, 97040, 97390, 97740, 98090, 98440, 98790, 99140, 99490, 99840, 100190, 100540, 100890, 101240, 101590, 101940, 102290, 102640, 102990, 103340, 103690, 104040, 104390, 104740, 105090];
  const ticktext = ['00:00:00', '', '', '', '', '00:00:05', '', '', '', '', '00:00:10', '', '', '', '', '00:00:15', '', '', '', '', '00:00:20', '', '', '', '', '00:00:25', '', '', '', '', '00:00:30', '', '', '', '', '00:00:35', '', '', '', '', '00:00:40', '', '', '', '', '00:00:45', '', '', '', '', '00:00:50', '', '', '', '', '00:00:55', '', '', '', '', '00:001:00', '', '', '', '', '00:01:05', '', '', '', '', '00:01:10', '', '', '', '', '00:01:15', '', '', '', '', '00:01:20', '', '', '', '', '00:01:25', '', '', '', '', '00:01:30', '', '', '', '', '00:01:35', '', '', '', '', '00:01:40', '', '', '', '', '00:01:45', '', '', '', '', '00:01:50', '', '', '', '', '00:01:55', '', '', '', '', '00:002:00', '', '', '', '', '00:02:05', '', '', '', '', '00:02:10', '', '', '', '', '00:02:15', '', '', '', '', '00:02:20', '', '', '', '', '00:02:25', '', '', '', '', '00:02:30', '', '', '', '', '00:02:35', '', '', '', '', '00:02:40', '', '', '', '', '00:02:45', '', '', '', '', '00:02:50', '', '', '', '', '00:02:55', '', '', '', '', '00:003:00', '', '', '', '', '00:03:05', '', '', '', '', '00:03:10', '', '', '', '', '00:03:15', '', '', '', '', '00:03:20', '', '', '', '', '00:03:25', '', '', '', '', '00:03:30', '', '', '', '', '00:03:35', '', '', '', '', '00:03:40', '', '', '', '', '00:03:45', '', '', '', '', '00:03:50', '', '', '', '', '00:03:55', '', '', '', '', '00:004:00', '', '', '', '', '00:04:05', '', '', '', '', '00:04:10', '', '', '', '', '00:04:15', '', '', '', '', '00:04:20', '', '', '', '', '00:04:25', '', '', '', '', '00:04:30', '', '', '', '', '00:04:35', '', '', '', '', '00:04:40', '', '', '', '', '00:04:45', '', '', '', '', '00:04:50', '', '', '', '', '00:04:55', '', '', '', '', '00:005:00'];
  const predictionWidget = ref({
    daily: { AFIB: {}, SVT: {}, VT: {} },
    hourly: { AFIB: {}, SVT: {}, VT: {} },
    today: { AFIB: {}, SVT: {}, VT: {} },
  });
  const showTCNotification = ref(false);

  async function fetchEcgSummary() {
    const data = await ecgSummary();
    metaData.value = data.metadata;
    liveGraph.value = data.live_graph;
    predictionWidget.value = data.prediction_widget;
  }
  return {
    metaData, liveGraph, fetchEcgSummary, predictionWidget, showTCNotification, tickvals, ticktext,
  };
});
