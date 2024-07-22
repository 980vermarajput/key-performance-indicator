export interface SegmentTypes {
  data: Array<{
    segmentKey: string;
    displayName: string;
    values: Array<SegmentValuesTypes>;
  }>;
}

export interface SegmentValuesTypes {
  segmentId: string;
  displayName: string;
}
