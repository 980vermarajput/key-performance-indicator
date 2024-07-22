export interface MatricsTypes {
  data: Array<MatricsDataTypes>;
}

export interface MatricsDataTypes {
  id: string;
  displayName: string;
  isPercentageMetric: boolean;
}
