import { KPICardType } from "../types/api/local";
import AddButton from "./AddButton";
import EditCard from "./EditCard";
import KPICard from "./KPICard";

const CardLayout = ({
  index,
  card,
  editingId,
  handleSave,
  handleEdit,
  handleAdd,
  length,
  handleCancel,
}: {
  index: number;
  card: any;
  editingId: any;
  handleEdit: (id: string) => void;
  handleAdd: (id: number) => void;
  handleSave: (metric: any, segment: any) => void;
  handleCancel: (card: KPICardType) => void;
  length: number;
}) => {
  return (
    <div
      className={`relative group   mr-1 pr-6  pl-6
        ${index % 3 !== 2 && length > 1 ? "lg:border-custom " : ""}
        ${index % 2 === 0 && length > 1 ? "sm:max-lg:border-custom" : ""}
        `}
    >
      {index === 0 && <AddButton index={index} onClick={handleAdd} left />}
      {editingId === card.id ? (
        <EditCard onSave={handleSave} card={card} handleCancel={handleCancel} />
      ) : (
        <KPICard card={card} onEdit={() => handleEdit(card.id)} />
      )}
      <AddButton index={index + 1} onClick={handleAdd} />
    </div>
  );
};

export default CardLayout;
