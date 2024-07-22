export interface KPICardType {
  id: string;
  metricId: string;
  metric: string;
  segmentId: string;
  segment: string;
  values?: Array<{
    date: string;
    value: number;
  }>;
}
