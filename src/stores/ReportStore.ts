import { defineStore } from 'pinia';
import { ref } from '@vue/composition-api';
import { ecgSummary } from '@/api/rest';

// eslint-disable-next-line import/prefer-default-export
export const useReportInfo = defineStore('reportInfo', () => {
  const reportInfo = ref({
    patientInfo: {
      'Patient Name': 'John Smith',
      'Date of Birth': '02/02/2000 (22 yrs)',
      'Patient ID': 89854262,
      Sex: 'Male',
      'Primary Indication': 'Atrial Fibrillation',
      Physician: 'Dr. Will',
      Location: 'Kaiser Permanente',
      From: '01/18/22, 10:36am',
      To: '02/19/22, 06:19pm',
      'Monitoring Time': '20h 52min',
      'Analysis Time': '20h 52min',
    },
    'Heart Rate': {
      Avg: '75 bpm',
      Min: {
        val: '50 bpm',
        time: '01/18, 10:36am',
      },
      Max: {
        val: '102 bpm',
        time: '01/18, 10:36am',
      },
    },
    Ectopics: {
      'Premature Supraventricular Complexes': {
        Count: 150,
        'PSVC Per 24h': '168 (0.15 %)',
      },
      'Premature Ventricular Complexes': {
        Count: 140,
        'PVC Per 24h': '120 (0.15 %)',
      },
    },
    Other: {
      'Patient Events (count)': 2,
      'Noise (Burden)': '0.5 %',
    },
    'AFib/Flutter': {
      Burden: '45%',
      'Longest Duration': '1 d 20 h',
      'HR Range': '55-178 bpm',
      Avg: '89 bpm',
      episode_info: {
        label: 'Fastest AF',
        value: 'Avg HR 105 bpm',
        date: '03/02/20',
        time: '10:20am',
      },
    },
    Pauses: {
      Episodes: 4,
      'Longest pause': '5.9 s',
      Range: '2.9-5.9 s,',
    },
    VT: {
      Episodes: 3,
      'Longest episode': '57 s',
      'HR Range': '115-130 bpm',
      HR: '128 bpm',
    },
    SVT: {
      Episodes: 3,
      'Longest episode': '57 s',
      'HR Range': '115-130 bpm',
      HR: '128 bpm',
    },
    'AV Block': 'None Found',
    Findings: 'Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ... Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ... Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ... Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ... Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ... Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ... Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ... Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ... Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ... Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ... Patient had a min HR of 78 bpm, max HR of 158 bpm, and avg HR of 80 bpm. There were total ...',

    '1. AFib / Flutter Episode': {
      Duration: '1 d 20 h',
      'HR Range': '55-178 bpm',
      Avg: '89 bpm',
      '03/02/20': '10:20:am',
    },
    '2. AFib / Flutter Episode': {
      Duration: '1 d 20 h',
      'HR Range': '55-178 bpm',
      Avg: '89 bpm',
      '03/02/20': '10:20:am',
    },
  });

  async function fetchEcgSummary() {
    const data = await ecgSummary();
    reportInfo.value.patientInfo = data.reportInfo.patientInfo;
    reportInfo.value['Heart Rate'] = data.reportInfo['Heart Rate'];
    reportInfo.value.Ectopics = data.reportInfo.Ectopics;
    reportInfo.value.Other = data.reportInfo.Other;
    reportInfo.value['AFib/Flutter'] = data.reportInfo['AFib/Flutter'];
    reportInfo.value.Pauses = data.reportInfo.Pauses;
    reportInfo.value.VT = data.reportInfo.VT;
    reportInfo.value.SVT = data.reportInfo.SVT;
    reportInfo.value['AV Block'] = data.reportInfo['AV Block'];
    reportInfo.value['1. AFib / Flutter Episode'] = data.reportInfo['1. AFib / Flutter Episode'];
    reportInfo.value['2. AFib / Flutter Episode'] = data.reportInfo['2. AFib / Flutter Episode'];
  }
  return { reportInfo };
});
