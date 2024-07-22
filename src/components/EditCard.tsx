import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputSelect from "./InputSelect";
import { MatricsDataTypes, MatricsTypes } from "../types/api/matrics";
import { SegmentTypes, SegmentValuesTypes } from "../types/api/segment";
import { KPICardType } from "../types/api/local";
import { axiosHandler } from "../libs/axios";
import {
  SnapshotRequestBody,
  SnapshotResponseTypes,
} from "../types/api/snapshot";

const EditCard: React.FC<{
  onSave: (metric: any, segment: any) => void;
  handleCancel: (card: KPICardType) => void;
  card: KPICardType;
}> = ({ onSave, card, handleCancel }) => {
  const [metric, setMetric] = useState<any>("");
  const [segmant, setSegmant] = useState<any>("");
  const [segmentsArray, setSegmentsArray] = useState<any>([]);
  const [matricsArray, setMatricsArray] = useState<any>([]);
  const queryClient = useQueryClient();
  const metricData: MatricsTypes | undefined = queryClient.getQueryData([
    "metrics-data",
  ]);
  const segmentData: SegmentTypes | undefined = queryClient.getQueryData([
    "segmant-data",
  ]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      const payload: SnapshotRequestBody = {
        metric,
        segmentId: segmant,
        segmentKey: "country",
      };
      const response = await axiosHandler.post("/snapshot", payload);
      return response.data;
    },
    mutationKey: ["snapshot"],
    onSuccess: async (data: SnapshotResponseTypes) => {
      const matricDisplayName: string =
        (metricData?.data?.find((ele) => ele?.id === metric)
          ?.displayName as string) || "";

      const segmentDisplayName = segmentsArray?.find(
        (ele: SegmentValuesTypes) => ele?.segmentId === segmant
      )?.displayName;

      const newCard: KPICardType = {
        id: card.id,
        metric: matricDisplayName,
        segment: segmentDisplayName,
        metricId: metric,
        segmentId: segmant,
        values: data?.data?.values,
      };
      onSave(card?.id, newCard);
    },
  });

  useEffect(() => {
    if (segmentData?.data?.length) {
      const countrySegment = segmentData?.data?.find(
        (ele) => ele?.segmentKey === "country"
      );
      setSegmentsArray(countrySegment?.values);
    }
    if (metricData?.data?.length) {
      setMatricsArray(metricData?.data);
    }
  }, [segmentData, metricData]);

  useEffect(() => {
    if (card?.metricId) {
      setMetric(card?.metricId);
    }
    if (card?.segmentId) {
      setSegmant(card?.segmentId);
    }
  }, [card]);

  return (
    <div className="">
      <div className="flex flex-col ga p-2">
        <InputSelect
          onChange={(e) => setMetric(e.target.value as string)}
          options={matricsArray?.map((ele: MatricsDataTypes) => ({
            label: ele?.displayName,
            value: ele?.id,
          }))}
          value={metric}
          placeholder="Daily Active Users"
        />
        <InputSelect
          onChange={(e) => setSegmant(e.target.value as string)}
          options={segmentsArray?.map((ele: SegmentValuesTypes) => ({
            label: ele?.displayName,
            value: ele?.segmentId,
          }))}
          value={segmant}
          placeholder="Country"
        />
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="secondary" onClick={() => handleCancel(card)}>
          Cancel
        </Button>
        <Button
          onClick={() => mutate()}
          disabled={metric?.length === 0 || segmant?.length === 0}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditCard;
