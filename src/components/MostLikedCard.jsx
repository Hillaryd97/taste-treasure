
const MostLikedCard = ({ recipeName, userName, category, image }) => {
  return (
    <div className="border-t">
      <div className="w-full px-3 py-3 bg-white space-x-2 flex items-center ease-in-out duration-300">
        <img
          src={image}
          className="w-[4.5rem] h-[4.5rem] shadow-md rounded-sm"
        />
        <div>
          <h4 className="pb-0.5 font-bold">{recipeName}</h4>
          <p className="text-sm">
            <span className="text-primary font-semibold">{userName}</span> in{" "}
            <span className="">{category}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MostLikedCard;
