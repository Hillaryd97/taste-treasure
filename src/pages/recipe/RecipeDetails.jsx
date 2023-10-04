import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from "../../createClient";

import img1 from "../../assets/img8.jpg";
import img2 from "../../assets/img2.jpg";
import img5 from "../../assets/img5.jpg";
import img4 from "../../assets/img4.jpg";
import img3 from "../../assets/img (7).jpeg";
import img9 from "../../assets/img (10).jpeg";
import img10 from "../../assets/img (13).jpeg";
import Nav from "../../components/Nav";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({
    image: "",
    userName: "",
    category: "",
    recipeName: "",
    instructions: "",
    ingredients: [],
    timeNeeded: "",
  });

  const { recipe_id } = useParams();

  function formatMarkdown(text) {
    // Replace double asterisks or underscores with bold tags
    text = text.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");

    // Replace single asterisks or underscores with italic tags
    text = text.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

    // Replace single underscores with underline tags
    text = text.replace(/(_)(.*?)\1/g, "<u>$2</u>");

    return text;
  }

  const formattedInstructions = recipe.instructions
    .split("\n")
    .map((instruction, index) => {
      // Add a line break before each numbered step
      return index === 0 ? instruction : `<br/>${instruction}`;
    })
    .join("");

  // Use the formattedInstructions in your component

  // Fetch recipe data from Supabase
  useEffect(() => {
    async function fetchRecipeData() {
      try {
        const { data, error } = await supabase
          .from("userRecipes")
          .select("*")
          .eq("recipe_id", recipe_id); // Remove the `${}` as recipe_id is already a string

        if (error) {
          console.error("Error fetching recipe data:", error);
          return;
        }

        if (data && data.length > 0) {
          // Assuming you only fetch one recipe for this example
          const fetchedRecipe = data[0];
          setRecipe({
            image: fetchedRecipe.image_url,
            userName: fetchedRecipe.userName,
            category: fetchedRecipe.category,
            recipeName: fetchedRecipe.recipeName,
            instructions: fetchedRecipe.instructions,
            ingredients: fetchedRecipe.ingredients, // Assuming ingredients is stored as an array in your database
            timeNeeded: fetchedRecipe.timeNeeded,
          });
        }
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    }
    fetchRecipeData();
  }, [recipe_id]); // Add recipe_id to the dependency array

  const backgroundImages = [
    img1,
    img2,
    img10,
    img3,
    img4,
    img5,
    img9,
    // Add more image URLs as needed
  ];

  const randomImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  return (
    <div>
      <Nav />
      <div className="sm:w-full p-3 bg-white shadow-sm rounded-sm mb-4">
        {/* Recipe name banner with background image */}
        <div className="relative">
          <div
            className=" w-full h-40 bg-cover flex items-center justify-center bg-center bg-opacity-50"
            style={{ backgroundImage: `url(${randomImage})` }}
          >
            <div className="absolute  flex items-center justify-center bg-black h-40 w-full bg-opacity-50">
              {" "}
              <h3 className="text-xl md:text-3xl font-semibold shadow-md text-white relative z-10 p-4">
                {recipe.recipeName}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-4 relative z-10">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold">
                {recipe.recipeName}
              </h3>
              <p className="text-sm lg:text-base text-gray-500">
                By{" "}
                <span className="font-bold text-primary">
                  {recipe.userName}
                </span>{" "}
                in <span className="">{recipe.category}</span>
              </p>
            </div>
            <button className="hover:bg-opacity-80 rounded-full bg-red-600 tracking-wide w-fit h-fit py-2 px-4 font-bold text-white">
              Like
            </button>
          </div>
          <div className="pt-2">
            <h4 className="text-lg font-semibold">Ingredients:</h4>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4 mt-1 text-sm md:text-base items-center grid-cols-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-primary text-white rounded-lg md:rounded-2xl"
                >
                  <p className="font-semibold text-center p-2">{ingredient}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mt-2">Instructions:</h4>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html: formatMarkdown(formattedInstructions),
              }}
            ></div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">
              Time Needed:{" "}
              <span className="font-bold">{recipe.timeNeeded}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecipeDetails;
