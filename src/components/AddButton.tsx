const AddButton = ({
  onClick,
  index,
  left,
  hover = true,
}: {
  onClick: (index: number) => void;
  index: number;
  left?: boolean;
  hover?: boolean;
}) => {
  return (
    <div
      className={`absolute ${
        left ? "left-0" : " right-1 w-1"
      } top-1/2 transform -translate-y-1/2 -translate-x-full ${
        hover ? "opacity-0" : "opacity-100"
      } hover:opacity-100 max-lg:opacity-100  transition-opacity h-full cursor-pointer`}
      onClick={() => onClick(index)}
    >
      <div
        className={`absolute ${
          left ? "left-0" : ""
        } top-1/2 transform -translate-y-1/2 translate-x-full custom-green-btn-right`}
      >
        <span className="green-btn ">+</span>
      </div>
    </div>
  );
};

export default AddButton;
