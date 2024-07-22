import { useState } from "react";
import CardLayout from "./CardLayout";
import { useQuery } from "@tanstack/react-query";
import { KPICardType } from "../types/api/local";
import { axiosHandler } from "../libs/axios";
import { generateRandomId } from "../libs/helper";

const Cards = () => {
  useQuery({
    queryKey: ["metrics-data"],
    queryFn: async () => {
      const response = await axiosHandler.get("/metrics");
      return response?.data;
    },
  });
  useQuery({
    queryKey: ["segmant-data"],
    queryFn: async () => {
      const response = await axiosHandler.get("/segments");
      return response?.data;
    },
  });
  const [cards, setCards] = useState<KPICardType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string, newCard: KPICardType) => {
    const updatedArray = cards.map((card) =>
      card.id === id ? { ...card, ...newCard } : card
    );
    setCards(updatedArray);
    setEditingId(null);
  };
  const handleCancel = (card: KPICardType) => {
    if (card?.segmentId?.length > 1) setEditingId(null);
    else {
      const filteredArr = cards?.filter((ele) => ele.id !== card?.id);
      setCards(filteredArr);
    }
  };

  const handleAdd = (index: number) => {
    const newId = generateRandomId();
    const newCard: KPICardType = {
      id: newId,
      metric: "",
      metricId: "",
      segmentId: "",
      segment: "",
    };
    setCards([...cards.slice(0, index), newCard, ...cards.slice(index)]);
    setEditingId(newId);
  };
  return cards?.length === 0 ? (
    <div className="flex justify-center items-center min-h-32 rounded-md bg-green-100 cursor-pointer mx-6">
      <div onClick={() => handleAdd(0)} className="flex gap-2">
        <span className="text-sm font-medium">Click to add KPI</span>
        <span className="green-btn ">+</span>
      </div>
    </div>
  ) : (
    <div
      className={`grid grid-cols-1 ${
        cards?.length === 1
          ? ""
          : cards?.length === 2
          ? "lg:grid-cols-2"
          : "sm:grid-cols-2 lg:grid-cols-3"
      }  gap-y-6`}
    >
      {cards.map((card, index) => (
        <CardLayout
          key={index}
          card={card}
          editingId={editingId}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleAdd={handleAdd}
          handleCancel={handleCancel}
          index={index}
          length={cards?.length}
        />
      ))}
    </div>
  );
};

export default Cards;
