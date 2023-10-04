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

  const { idMeal } = useParams();
  console.log(idMeal);
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
  const [apiRecipes, setApiRecipes] = useState([]);

  useEffect(() => {
    // Function to fetch recipes from the MealDB API
    const fetchApiRecipes = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch API recipes");
        }
        const data = await response.json();
        setApiRecipes(data.meals || []); // Assuming the API response has a "meals" property
        console.log(data);
      } catch (error) {
        console.error("Error fetching API recipes:", error);
      }
    };

    // Call the function to fetch API recipes
    fetchApiRecipes();
  }, [idMeal]);
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
      {apiRecipes.length > 0 ? (
        <div className="sm:w-full p-3 bg-white shadow-sm rounded-sm mb-4">
          {/* Recipe name banner with background image */}
          <div className="relative">
            <div
              className="w-full h-40 bg-cover flex items-center justify-center bg-center bg-opacity-50"
              style={{ backgroundImage: `url(${apiRecipes[0].strMealThumb})` }}
            >
              <div className="absolute flex items-center justify-center bg-black h-40 w-full bg-opacity-50">
                {" "}
                <h3 className="text-xl md:text-3xl font-semibold shadow-md text-white relative z-10 p-4">
                  {apiRecipes[0].strMeal}
                </h3>
              </div>
            </div>
          </div>

          <div className="p-4 relative z-10">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold">
                  {apiRecipes[0].strMeal}
                </h3>{" "}
                <span className="font-bold text-primary">
                  Category: {apiRecipes[0].strCategory}
                </span>
                {/* <p className="text-sm lg:text-base text-gray-500">
                    By{" "}
                    <span className="font-bold text-primary">
                      {apiRecipes[0].strCategory}
                    </span>{" "}
                    in <span className="">{apiRecipes[0].strArea}</span>
                  </p> */}
              </div>

              {/* <button className="hover:bg-opacity-80 rounded-full bg-red-600 tracking-wide w-fit h-fit py-2 px-4 font-bold text-white">
                  Like
                </button> */}
            </div>
            <div className="pt-2">
              <h4 className="text-lg font-semibold">Ingredients:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {apiRecipes[0].strIngredient1}
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {apiRecipes[0].strIngredient2}
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {apiRecipes[0].strIngredient3}
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {apiRecipes[0].strIngredient4}
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {apiRecipes[0].strIngredient5}
                </span>
                {/* <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {apiRecipes[0].strIngredient6}
                  </span>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {apiRecipes[0].strIngredient7 || 'Ingredient'}
                  </span> */}
                {/* Add more ingredient spans as needed */}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mt-2">Instructions:</h4>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: apiRecipes[0].strInstructions
                    .split("\n")
                    .map((instruction, index) => {
                      return index === -1
                        ? instruction
                        : `<br/> ${instruction} <br/>`;
                    })
                    .join(""),
                }}
              ></div>
            </div>
            {/* <div className="mt-4">
                <p className="text-gray-700">
                  Time Needed:{" "}
                  <span className="font-bold">{apiRecipes[0].strTime}</span>
                </p>
              </div> */}
            <br /> <br />
            <div className="flex items-center justify-center">
              <img
                src={`${apiRecipes[0].strMealThumb}`}
                className="lg:w-1/3"
                alt={`${apiRecipes[0].strMealThumb}`}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default RecipeDetails;
