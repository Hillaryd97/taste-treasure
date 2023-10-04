import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import img9 from "../assets/img (4).jpeg";
import img10 from "../assets/img4.jpg";
import img5 from "../assets/img3.jpg";
import img6 from "../assets/img2.jpg";
import img7 from "../assets/img8.jpg";
import img1 from "../assets/img (1).jpeg";
import MostLikedCard from "../components/MostLikedCard";
import IngredientCard from "../components/IngredientCard";
import { supabase } from "../createClient";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";
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

const Home = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes data from the "recipes" table
    async function fetchRecipes() {
      const { data, error } = await supabase.from("userRecipes").select("*"); // You can specify columns you want to select here

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setRecipes(data);
      }
    }

    fetchRecipes();
  }, []); // Run this effect once on component mount
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const fetchRandomRecipes = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?f=e"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch random recipes");
      }

      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error fetching random recipes:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      const randomRecipes = await fetchRandomRecipes(); // Fetch 3 random recipes
      setFeaturedRecipes(randomRecipes.slice(0, 3));
    };

    fetchFeaturedRecipes();
  }, []);

  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  const [apiRecipes, setApiRecipes] = useState([]);

  useEffect(() => {
    // Function to fetch recipes from the MealDB API
    const fetchApiRecipes = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=c"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch API recipes");
        }
        const data = await response.json();
        setApiRecipes(data.meals || []); // Assuming the API response has a "meals" property
      } catch (error) {
        console.error("Error fetching API recipes:", error);
      }
    };

    // Call the function to fetch API recipes
    fetchApiRecipes();
  }, []);

  const searchApiRecipes = (query) => {
    if (query.trim() === "") {
      // If the search query is empty, return all API recipes
      return apiRecipes;
    } else {
      // Perform search based on query
      const results = apiRecipes.filter((recipe) => {
        const recipeName = recipe.strMeal.toLowerCase();
        const category = recipe.strCategory.toLowerCase();
        const ingredients = [
          recipe.strIngredient1,
          recipe.strIngredient2,
          recipe.strIngredient3,
          // Add more ingredients as needed
        ].map((ingredient) => ingredient.toLowerCase());

        const search = query.toLowerCase();

        return (
          recipeName.includes(search) ||
          category.includes(search) ||
          ingredients.some((ingredient) => ingredient.includes(search))
        );
      });

      return results;
    }
  };
  const searchResults = searchApiRecipes(searchQuery);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      // If the search query is empty, reset the search results
      setFilteredRecipes(recipes);
      setSearchResultsVisible(false);
    } else {
      // Perform search based on query
      const results = recipes.filter((recipe) => {
        const recipeName = recipe.recipeName.toLowerCase();
        const category = recipe.category.toLowerCase();
        const timeNeeded = recipe.timeNeeded.toLowerCase();
        const ingredients = recipe.ingredients.join(" ").toLowerCase();
        const search = query.toLowerCase();

        return (
          recipeName.includes(search) ||
          category.includes(search) ||
          timeNeeded.includes(search) ||
          ingredients.includes(search)
        );
      });

      // Update the search results
      setFilteredRecipes(results);
      setSearchResultsVisible(results.length > 0);
    }
  };
  const sessionData = sessionStorage.getItem("user");

  function formatMarkdown(text) {
    // Replace double asterisks or underscores with bold tags
    text = text.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");

    // Replace single asterisks or underscores with italic tags
    text = text.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

    // Replace single underscores with underline tags
    text = text.replace(/(_)(.*?)\1/g, "<u>$2</u>");

    return text;
  }

  const handleSaveClick = async (recipe_id, userId) => {
    try {
      // Send a POST request to the 'recipeLikes' table
      const { data, error } = await supabase.from('recipelikes').upsert([
        {
          recipeid: recipe_id,
          userid: userId,
        },
      ]);
  
      if (error) {
        console.error('Error saving recipe:', error);

        // Handle the error as needed (e.g., show an error message)
      } else {
        // Recipe saved successfully
        console.log('Recipe saved:', data);
        alert("Saved!")
        // You can update the UI to reflect that the recipe has been saved, if needed
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      // Handle the error as needed (e.g., show an error message)
    }
  };
  
  const [viewUserRecipes, setViewUserRecipes] = useState(true);

  return (
    <div className="min-h-screen overflow-hidden bg-purple-50">
      <div className="container md:mx-auto px-2 py-4">
        <Nav />
        <div className="flex flex-col justify-center ">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center mb-4">
              <button
                className={`${
                  viewUserRecipes
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-700 duration-300"
                } px-4 py-2 rounded-l-md`}
                onClick={() => setViewUserRecipes(true)}
              >
                User Recipes
              </button>
              <button
                className={`${
                  !viewUserRecipes
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-700 duration-300"
                } px-4 py-2 rounded-r-md`}
                onClick={() => setViewUserRecipes(false)}
              >
                Other Recipes
              </button>
            </div>
            <div
              className={`${
                viewUserRecipes ? "flex" : "hidden"
              } duration-300 flex-col justify-center items-center pb-8`}
            >
              <h3
                className={`font-playfair-display font-bold text-2xl pb-1 md:pt-10 lg:pt-4 pt-4`}
              >
                Explore Recipes
              </h3>
              <p className="text-gray-500 font-bold">
                Discover recipes added by other{" "}
                <span className="font-black">TasteTreasure</span> users
              </p>
            </div>
            <div
              className={`${
                !viewUserRecipes ? "flex" : "hidden"
              } duration-300 flex-col justify-center items-center pb-8`}
            >
              <h3
                className={`font-playfair-display font-bold text-2xl pb-1 md:pt-10 lg:pt-4 pt-4`}
              >
                Find New Recipes
              </h3>
              <p className="text-gray-500 font-bold">
                Discover a diverse collection of recipes from other sources!
              </p>
            </div>
          </div>

          {/* <div className="flex justify-between">
            <div className="bg-white px-6 py-1 font-bold flex justify-between w-full lg:w-[65%] items-center rounded-full text-lg">
              <p className="text-primary lg:mr-6">Categories:</p>
              <div className="relative">
                <button
                  className="focus:text-primary border border-transparent focus:border-primary px-2 py-0.5 rounded-full duration-100 flex items-center"
                  onClick={() => {
                    const dropdown =
                      document.getElementById("categoryDropdown");
                    dropdown.classList.toggle("hidden");
                  }}
                >
                  <span className="mr-2">{selectedCategory}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 5.293a1 1 0 011.414 0L10 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  id="categoryDropdown"
                  className="hidden overflow-y-scroll absolute h-72 top-10 right-0 bg-white shadow-lg rounded-lg border border-primary z-20"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-4 py-2 hover:bg-primary hover:text-white duration-300"
                      onClick={() => {
                        setSelectedCategory(category);
                        const dropdown =
                          document.getElementById("categoryDropdown");
                        dropdown.classList.add("hidden");
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
          <div
            className={`items-center justify-center md:items-start md:justify-normal pl-4 drop-shadow-sm ${
              viewUserRecipes ? "flex" : "hidden"
            }`}
          >
            <input
              className="border md:w-full lg:w-[58%] p-1 px-2 bg-gray-100 border-primary rounded-xl rounded-r-none focus:outline-none focus:bg-secondary duration-300 placeholder:focus:text-white"
              type="text"
              placeholder="Search Recipes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            <button
              className="bg-primary border border-primary rounded-xl rounded-l-none text-white py-1 px-2 hover:bg-opacity-80 duration-300"
              onClick={() => handleSearch(searchQuery)}
            >
              Search
            </button>
          </div>
          <div
            className={`items-center justify-center md:items-start md:justify-normal pl-4 drop-shadow-sm ${
              !viewUserRecipes ? "flex" : "hidden"
            }`}
          >
            <input
              className="border md:w-full lg:w-[58%] p-1 px-2 bg-gray-100 border-primary rounded-xl rounded-r-none focus:outline-none focus:bg-secondary duration-300 placeholder:focus:text-white"
              type="text"
              placeholder="Search Recipes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchApiRecipes(e.target.value);
              }}
            />
            <button
              className="bg-primary border border-primary rounded-xl rounded-l-none text-white py-1 px-2 hover:bg-opacity-80 duration-300"
              onClick={() => searchApiRecipes(searchQuery)}
            >
              Search
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col w-full z-10 p-3 rounded-sm col-span-3   lg:col-span-2">
              {searchResultsVisible && (
                <div className={`${viewUserRecipes ? "block" : "hidden"}`}>
                  <p className="font-bold text-primary pb-2 flex items-center justify-center">
                    {filteredRecipes.length} results found for "{searchQuery}"
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredRecipes.map((recipe) => (
                      <Link
                        to={`/recipe/${recipe.recipe_id}`}
                        key={recipe.recipe_id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden mb-4"
                      >
                        <div className="bg-primary text-white py-2 px-4 flex justify-between items-center">
                          <h2 className="text-xl font-semibold">
                            {recipe.recipeName}
                          </h2>
                          <p>{recipe.timeNeeded}</p>
                        </div>
                        <div className="px-4 py-2">
                          <div
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: formatMarkdown(
                                recipe.description ||
                                  "No Description"
                                    .split("\n")
                                    .map((description, index) => {
                                      // Add a line break before each numbered step
                                      return index === 0
                                        ? description
                                        : `<br/>${description}`;
                                    })
                                    .join("")
                                    .slice(0, 200)
                              ),
                            }}
                          ></div>
                        </div>
                        <div className="px-4 py-2">
                          <h4 className="text-lg font-semibold">
                            Ingredients:
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {recipe.ingredients
                              .slice(0, 4)
                              .map((ingredient, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                  {ingredient}
                                </span>
                              ))}
                          </div>
                        </div>
                        <div className="flex justify-between px-4 py-2 flex-row-reverse">
                          <div className="flex space-x-3">
                            {" "}
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                              View
                            </button>
                            <button className="bg-red-500 flex items-center hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                              <AiFillHeart size={20} className="mr-2" /> Love
                            </button>
                          </div>
                          <div className=" py-2">
                            <p className="text-sm text-gray-600">
                              By{" "}
                              <span className="font-semibold text-primary">
                                {recipe.userName}
                              </span>{" "}
                              in{" "}
                              <span className="text-gray-600">
                                {recipe.category}
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {searchResults.length > 0 ? (
                <div
                  className={`${
                    !viewUserRecipes
                      ? "grid grid-cols-1 md:grid-cols-2 gap-3"
                      : "hidden"
                  } `}
                >
                  {searchResults.map((result) => (
                    <Link
                      to={`/other_recipes/${result.idMeal}`} // Use the appropriate recipe ID property
                      key={result.idMeal}
                      className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 flex flex-col"
                    >
                      <div className="bg-primary text-white py-2 px-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                          {result.strMeal}
                        </h2>
                        {/* <p></p> */}
                      </div>
                      <div className="px-4 py-2">
                        <div className="text-gray-600">
                          {formatMarkdown(
                            (result.strInstructions || "No Description")
                              .split("\n")
                              .map((description, index) => {
                                if (index === 0) {
                                  if (description.length > 120) {
                                    return `${description.slice(0, 120)}...`;
                                  } else {
                                    return description;
                                  }
                                }
                              })
                              .join("")
                          )}
                        </div>
                      </div>

                      <div className="px-4 py-2">
                        <h4 className="text-lg font-semibold">Ingredients:</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {result.strIngredient1}
                          </span>
                          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {result.strIngredient2}
                          </span>
                          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {result.strIngredient3}
                          </span>
                          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {result.strIngredient4}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p>No results found</p>
              )}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {viewUserRecipes
                    ? recipes.map((recipe) => (
                        <Link
                          to={`/recipe/${recipe.recipe_id}`}
                          key={recipe.recipe_id}
                          className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 flex flex-col" // Add flex flex-col
                        >
                          <div className="bg-primary text-white py-2 px-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                              {recipe.recipeName}
                            </h2>
                            <p>{recipe.timeNeeded}</p>
                          </div>
                          <div className="px-4 py-2">
                            <div
                              className="text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html: formatMarkdown(
                                  (recipe.description || "No Description")
                                    .split("\n")
                                    .map((description, index) => {
                                      if (index === 0) {
                                        if (description.length > 120) {
                                          return (
                                            description.slice(0, 120) + "..."
                                          );
                                        } else {
                                          return description;
                                        }
                                      } else {
                                        return `<br/>${description}`;
                                      }
                                    })
                                    .join("")
                                ),
                              }}
                            ></div>
                          </div>
                          <div className="px-4 py-2">
                            <h4 className="text-lg font-semibold">
                              Ingredients:
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {recipe.ingredients
                                .slice(0, 4)
                                .map((ingredient, index) => (
                                  <span
                                    key={index}
                                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                                  >
                                    {ingredient}
                                  </span>
                                ))}
                            </div>
                          </div>
                          <div className="flex justify-between px-4 py-2 flex-row-reverse">
                            <div className="flex space-x-3">
                              {" "}
                              {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                View
                              </button> */}
                              <button
                              onClick={() => handleSaveClick(recipe.recipe_id, JSON.parse(sessionData).user.email)}
                              className="bg-red-500 flex items-center hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                <AiFillHeart size={20} className="mr-2" /> Save
                              </button>
                            </div>
                            <div className="py-2">
                              <p className="text-sm text-gray-600">
                                By{" "}
                                <span className="font-semibold text-primary">
                                  {recipe.userName}
                                </span>{" "}
                                in{" "}
                                <span className="text-gray-600">
                                  {recipe.category}
                                </span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    : null}
                </div>
              </div>

              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {!viewUserRecipes
                    ? apiRecipes.map((recipe) => (
                        <Link
                          to={`/other_recipes/${recipe.idMeal}`} // Use the appropriate recipe ID property
                          key={recipe.idMeal}
                          className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 flex flex-col"
                        >
                          <div className="bg-primary text-white py-2 px-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                              {recipe.strMeal}
                            </h2>
                            {/* <p></p> */}
                          </div>
                          <div className="px-4 py-2">
                            <div className="text-gray-600">
                              {formatMarkdown(
                                (recipe.strInstructions || "No Description")
                                  .split("\n")
                                  .map((description, index) => {
                                    if (index === 0) {
                                      if (description.length > 120) {
                                        return `${description.slice(
                                          0,
                                          120
                                        )}...`;
                                      } else {
                                        return description;
                                      }
                                    }
                                  })
                                  .join("")
                              )}
                            </div>
                          </div>

                          <div className="px-4 py-2">
                            <h4 className="text-lg font-semibold">
                              Ingredients:
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {recipe.strIngredient1}
                              </span>
                              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {recipe.strIngredient2}
                              </span>
                              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {recipe.strIngredient3}
                              </span>
                              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {recipe.strIngredient4}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="hidden lg:flex absolute flex-col right-3 top-[13.5rem] z-10 space-y-4 w-2/6 mt-8 col-span-1">
              <div className="bg-white  py-4 rounded-sm shadow-md">
                <h4 className="font-bold pb-2 px-3 border-b">
                  INGREDIENT SPOTLIGHT
                </h4>
                <IngredientCard />
              </div>
              <div className="bg-white pt-4 rounded-sm shadow-md">
                <div className="flex justify-between px-3 pb-3">
                  <h4 className="font-bold">FEATURED RECIPES</h4>
                  {/* <Link className="font-bold text-primary">VIEW ALL</Link> */}
                </div>
                {featuredRecipes.map((recipe) => (
                  <Link
                    to={`/other_recipes/${recipe.idMeal}`} key={recipe.idMeal} // Use the appropriate recipe ID property
                  >
                    <MostLikedCard
                      // userName={"Park Jimin"}
                      recipeName={recipe.strMeal}
                      category={recipe.strCategory}
                      image={recipe.strMealThumb}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
