import { Link } from "react-router-dom";

const MealCard = ({ userName, category, recipe_name, ingredientList }) => {
  // Split the ingredients by newline character and map them to individual <p> elements
  // const ingredientList = ingredients.split("\n").map((ingredient, index) => (
  //   <p key={index} className="text-sm md:text-center pb-0.5 pr-1">
  //     {ingredient}
  //   </p>
  // ));

  return (
    <div className="md:w-48 md:p-3 py-3 pl-3 bg-white shadow-sm border rounded-sm flex md:flex-col md:mb-10 items-center ease-in-out duration-300 md:space-x-0 space-x-3">
      <div>
        <div>
          <h4 className="md:text-center pb-1 pt-3">{recipe_name}</h4>
          <p className="text-sm md:text-center pb-0.5 pr-1">
            By <span className="font-bold text-primary">{userName}</span> in{" "}
            <span className="">{category}</span>
          </p>
        </div>
        <div className="mt-3">
          <h5 className="text-sm font-semibold">Ingredients:</h5>
          {ingredientList}
        </div>
        <div className="flex flex-row md:justify-center justify-start font-bold space-x-2 w-full py-1">
          <button className="hover:bg-opacity-80 rounded-full bg-red-500 py-0.5 px-3 text-white">
            Like
          </button>
          <Link
            to={"/recipeCard"}
            className="hover:bg-opacity-80 rounded-full bg-primary py-0.5 px-3 text-white"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
