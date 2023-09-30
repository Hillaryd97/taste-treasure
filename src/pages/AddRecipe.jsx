import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../createClient";
import { Link } from "react-router-dom";

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    userName: "Baker123",
    category: "Dessert",
    recipeName: "Chocolate Cake",
    instructions: "",
    ingredients: "", // Ingredients as a multiline string
    timeNeeded: "45 minutes",
  });

  const categories = [
    "African",
    "American",
    "Appetizer",
    "Asian",
    "BBQ",
    "Beverage",
    "Brunch",
    "Cocktail",
    "Dessert",
    "Dinner",
    "Gourmet",
    "Grill",
    "Healthy",
    "Holiday",
    "Indian",
    "Italian",
    "Lunch",
    "Main Course",
    "Mediterranean",
    "Mexican",
    "Nigerian",
    "Pasta",
    "Pizza",
    "Salad",
    "Sandwich",
    "Seafood",
    "Side Dish",
    "Smoothie",
    "Snack",
    "Soup",
    "Stir-Fry",
    "Vegetarian",
  ];

  const handleInputChange = (e, field) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe[field] = e.target.value;
    setRecipe(updatedRecipe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split the ingredients input by newlines and trim each item to form an array
    const ingredientsArray = recipe.ingredients
      .split("\n")
      .map((ingredient) => ingredient.trim());

    // Create a new recipe object with the updated data
    const newRecipe = {
      //   image: recipe.image,
      userName: recipe.userName,
      category: recipe.category,
      recipeName: recipe.recipeName,
      instructions: recipe.instructions,
      ingredients: ingredientsArray, // Ingredients as an array
      timeNeeded: recipe.timeNeeded,
    };

    try {
      // Insert the new recipe into the Supabase table
      const { data, error } = await supabase
        .from("userRecipes")
        .insert([newRecipe]);

      if (error) {
        console.error("Error inserting recipe:", error);
      } else {
        console.log("Recipe inserted successfully:", data);
        // Optionally, you can redirect the user or perform other actions after successful insertion.
      }
    } catch (error) {
      console.error("Error inserting recipe:", error);
    }
  };

  const handleFormatClick = (format) => {
    const textarea = document.getElementById("instructions");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    let updatedInstructions = recipe.instructions;

    switch (format) {
      case "bold":
        updatedInstructions =
          updatedInstructions.substring(0, start) +
          "**" +
          updatedInstructions.substring(start, end) +
          "**" +
          updatedInstructions.substring(end);
        break;
      case "italic":
        updatedInstructions =
          updatedInstructions.substring(0, start) +
          "*" +
          updatedInstructions.substring(start, end) +
          "*" +
          updatedInstructions.substring(end);
        break;
      case "underline":
        updatedInstructions =
          updatedInstructions.substring(0, start) +
          "__" +
          updatedInstructions.substring(start, end) +
          "__" +
          updatedInstructions.substring(end);
        break;
      default:
        break;
    }

    setRecipe({ ...recipe, instructions: updatedInstructions });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* Main Content Container */}
      <div className="container md:mx-auto md:px-0 px-2 py-4">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="text-primary md:text-2xl text-2xl font-bold z-10">
            <h1>
              {" "}
              Taste<span className=" text-secondary">Treasure</span>
            </h1>
          </div>
          <Link
            to={"/home"}
            className="bg-primary text-white font-bold hover:scale-105 px-2 py-1 rounded-2xl"
          >
            Go Back
          </Link>
          {/* <div className="text-primary md:text-2xl text-2xl font-bold z-10">
            <h2>Welcome, {recipe.userName}!</h2>
          </div> */}
        </div>

        {/* Recipe Form */}
        <form className="p-4" onSubmit={handleSubmit}>
          {/* Grid for Recipe Name and User Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-gray-600" htmlFor="recipeName">
                Recipe Name
              </label>
              <input
                type="text"
                id="recipeName"
                value={recipe.recipeName}
                onChange={(e) => handleInputChange(e, "recipeName")}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-600" htmlFor="userName">
                User Name
              </label>
              <input
                type="text"
                id="userName"
                disabled
                value={recipe.userName}
                onChange={(e) => handleInputChange(e, "userName")}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Grid for Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-2 text-gray-600" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={recipe.category}
                onChange={(e) => handleInputChange(e, "category")}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ingredients Textarea */}
          <div className="mt-4">
            <label className="block mb-2 text-gray-600" htmlFor="ingredients">
              Ingredients (Enter each ingredient on a new line)
            </label>
            <textarea
              id="ingredients"
              value={recipe.ingredients}
              onChange={(e) => handleInputChange(e, "ingredients")}
              rows="5"
              className="w-full h-10 px-3 py-2 border rounded-lg resize-none"
            ></textarea>
          </div>

          {/* Instructions Textarea */}
          <div className="mt-4">
            <label className="block text-gray-600" htmlFor="instructions">
              Instructions
            </label>
            <div className="flex items-center space-x-2 mt-2">
              <button
                type="button"
                onClick={() => handleFormatClick("bold")}
                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() => handleFormatClick("italic")}
                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
              >
                Italic
              </button>
              <button
                type="button"
                onClick={() => handleFormatClick("underline")}
                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
              >
                Underline
              </button>
            </div>
            <textarea
              id="instructions"
              value={recipe.instructions}
              onChange={(e) => handleInputChange(e, "instructions")}
              rows="6"
              className="w-full px-3 py-2 mt-2 border rounded-lg"
            ></textarea>
          </div>

          {/* Time Needed Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-2 text-gray-600" htmlFor="timeNeeded">
                Time Needed
              </label>
              <input
                type="text"
                id="timeNeeded"
                value={recipe.timeNeeded}
                onChange={(e) => handleInputChange(e, "timeNeeded")}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex items-center justify-end mt-4 md:mt-0">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Footer section */}
    </div>
  );
};

export default RecipeForm;
