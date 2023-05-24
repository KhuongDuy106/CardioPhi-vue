export type ChartData = {
    episodeData: Record<string, unknown>;
    chartTitle: string;
    chartId: string;
    // eslint-disable-next-line max-len
    data: Array<Record<string, unknown>> | Array<Array<Record<string, number[]|string|Record<string, unknown>>>>;
    layout: Record<string, unknown>;
    checked: boolean;
    show: boolean;
    color: string;
}
