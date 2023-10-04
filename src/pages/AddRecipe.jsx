import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../createClient";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    category: "",
    recipeName: "",
    instructions: "",
    ingredients: "",
    description: "",
    timeNeeded: "",
  });

  const categories = [
    "African",
    "American",
    "Appetizer",
    "Asian",
    "BBQ",
    "Beverage",
    "Breakfast",
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
  const [userEmail, setUserEmail] = useState(""); // State to store user email
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    // Calculate the total character count from all lines
    const lines = formData.ingredients.split("\n");
    const totalCharacterCount = lines.reduce(
      (total, line) => total + line.length,
      0
    );
    setCharacterCount(totalCharacterCount);
  }, [formData.ingredients]);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    const updatedFormData = { ...formData };

    if (field === "ingredients") {
      const lines = value.split("\n");
      const updatedLines = lines.map((line) =>
        line.length <= 30 ? line : line.slice(0, 30)
      );
      updatedFormData.ingredients = updatedLines.join("\n");
    } else if (field === "userName") {
      // Extract the username from the email (everything before the @ symbol)
      const email = value;
      const atIndex = email.indexOf("@");

      if (atIndex !== -1) {
        updatedFormData.userName = email.substring(0, atIndex);
      } else {
        updatedFormData.userName = "";
      }
    } else {
      updatedFormData[field] = value;
    }

    setFormData(updatedFormData);
  };

  const showCharacterLimitMessage = (line) => {
    if (line.length === 30) {
      return (
        <p className="text-red-500">Character limit reached (30 characters).</p>
      );
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split the ingredients input by newlines and trim each item to form an array
    const ingredientsArray = formData.ingredients
      .split("\n")
      .map((ingredient) => ingredient.trim());

    // Create a new recipe object with the updated data
    const newRecipe = {
      userName: JSON.parse(sessionData).user.email.split("@")[0],
      category: formData.category,
      recipeName: formData.recipeName,
      instructions: formData.instructions,
      ingredients: ingredientsArray, // Ingredients as an array
      timeNeeded: formData.timeNeeded,
      description: formData.description,
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
        alert("Your recipe has been posted!");
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

    let updatedInstructions = formData.instructions;

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

    setFormData({ ...formData, instructions: updatedInstructions });
  };
  const sessionData = sessionStorage.getItem("user");

  useEffect(() => {
    const sessionData = sessionStorage.getItem("user");
    if (sessionData) {
      // Parse the session data as JSON
      const session = JSON.parse(sessionData);

      // Access user metadata to get the email
      const userEmail = session.user.email;
      setUserEmail(userEmail); // Set the user's email in state
      console.log(userEmail);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold text-primary">
            <h1>
              Taste<span className="text-secondary">Treasure</span>
            </h1>
          </div>
          <Link
            to={"/home"}
            className="bg-primary text-white font-bold hover:scale-105 px-2 py-1 rounded-2xl"
          >
            Go Back
          </Link>
        </div>
        {userEmail ? ( // Check if userEmail is available
          <form
            onSubmit={handleSubmit}
            className="lg:mx-10 rounded-xl mx-4 my-4 bg-blue-100 p-4 "
          >
            <h2 className="text-center lg:text-2xl text-xl font-bold mb-2">
              Add A New Recipe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-600 mb-1"
                  htmlFor="recipeName"
                >
                  Recipe Name
                </label>
                <input
                  type="text"
                  id="recipeName"
                  value={formData.recipeName}
                  onChange={(e) => handleInputChange(e, "recipeName")}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="userName">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  disabled
                  value={JSON.parse(sessionData).user.email.split("@")[0]}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
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
              <div>
                <label
                  className="block text-gray-600 mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter a short description of your recipe"
                  onChange={(e) => handleInputChange(e, "description")}
                  rows="5"
                  className="w-full h-24 px-3 py-2 border rounded-lg resize-none"
                ></textarea>
              </div>
            </div>
            <div className="mt-4">
      <label className="block text-gray-600 mb-1" htmlFor="ingredients">
        Ingredients (Enter each ingredient on a new line, max 30 characters per ingredient)
      </label>
      <textarea
        id="ingredients"
        value={formData.ingredients}
        onChange={(e) => handleInputChange(e, "ingredients")}
        rows="5"
        placeholder="What ingredients are needed?"
        className="w-full h-24 px-3 py-2 border rounded-lg resize-none"
      ></textarea>
      <div className="text-sm text-gray-400 mt-1">
        {showCharacterLimitMessage(formData.ingredients)}
        {/* {characterCount} */}
      </div>
    </div>
            <div className="mt-4">
              <label
                className="block text-gray-600 mb-1"
                htmlFor="instructions"
              >
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
                value={formData.instructions}
                onChange={(e) => handleInputChange(e, "instructions")}
                rows="6"
                placeholder="How is it made? Start each step with a number for clarity"
                className="w-full h-32 px-3 py-2 mt-2 border rounded-lg resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4 mt-4">
              <div>
                <label
                  className="block text-gray-600 mb-1"
                  htmlFor="timeNeeded"
                >
                  Time Needed
                </label>
                <input
                  type="text"
                  id="timeNeeded"
                  value={formData.timeNeeded}
                  placeholder="How much time will it take to prepare? (eg: 1 hour, 50 minutes)"
                  onChange={(e) => handleInputChange(e, "timeNeeded")}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-end justify-end mt-4 md:mt-0">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        ) : (
          // Display message to register or login if no session data
          <div className="text-center flex items-center justify-center h-96 text-xl text-gray-600">
            <p>
              Please{" "}
              <Link to="/login" className="text-blue-500">
                login
              </Link>{" "}
              or{" "}
              <Link to="/register" className="text-blue-500">
                register
              </Link>{" "}
              to add a recipe.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeForm;
