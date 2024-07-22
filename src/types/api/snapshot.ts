export interface SnapshotRequestBody {
  metric: string;
  segmentKey: string;
  segmentId: string;
}

export interface SnapshotResponseTypes {
  data: {
    metric: string;
    segmentKey: string;
    segmentId: string;
    // values is an array of data points for last 28 days,
    // starting from the date provided in request body
    values: Array<ChartValueTypes>;
  };
}

export interface ChartValueTypes {
  date: string;
  value: number;
}
