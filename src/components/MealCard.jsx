import { Link } from "react-router-dom";

const MealCard = ({ image, userName, category, recipe_name }) => {
  return (
    <div className="md:w-48 md:p-3 py-3 pl-3 bg-white shadow-sm border rounded-sm flex md:flex-col md:mb-10 items-center ease-in-out duration-300  md:space-x-0 space-x-3">
      <img
        src={image}
        className="w-28 md:w-40 md:h-32 h-24 md:-mt-8 shadow-md rounded-sm"
      />
      <div>
        <div>
          <h4 className="md:text-center pb-1 pt-3">{recipe_name}</h4>
          <p className="text-sm  md:text-center pb-0.5">
            By <span className="font-bold text-primary">{userName}</span> in{" "}
            <span className="">{category}</span>
          </p>
        </div>
        <div className="flex flex-row md:justify-center justify-start font-bold space-x-2 w-full py-1">
          <button className="hover:bg-opacity-80 rounded-full bg-red-500 py-0.5 px-3 text-white">
            Like
          </button>
          <Link to={"/recipeCard"} className="hover:bg-opacity-80 rounded-full bg-primary py-0.5 px-3 text-white">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
