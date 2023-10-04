import React from "react";
import Nav from "../components/Nav";
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../createClient";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

const Profile = () => {
  const user = {
    id: 121212,
    name: "John Doe",
    bio: "Food lover and recipe enthusiast. Exploring new flavors is my passion!",
    dietaryPreferences: "Vegetarian",
    allergies: "None",
    email: "johndoe@example.com",
    avatar: "/path-to-avatar.jpg",
  };
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const sessionData = sessionStorage.getItem("user");
  const userEmail = JSON.parse(sessionData).user.email;
  useEffect(() => {
    // Fetch recipes data from the "recipelikes" table
    async function fetchSavedRecipes() {
      const { data, error } = await supabase
        .from("recipelikes")
        .select("*")
        .eq("userid", userEmail);

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        // Create an array to store fetched recipes
        const fetchedRecipes = [];

        // Loop through the "recipelikes" data and fetch corresponding recipe data
        for (const like of data) {
          const recipeId = like.recipeid;

          // Fetch the recipe data from the "userRecipes" table based on recipeId
          const { data: recipeData, error: recipeError } = await supabase
            .from("userRecipes")
            .select("*")
            .eq("recipe_id", recipeId);

          if (recipeError) {
            console.error("Error fetching recipe data:", recipeError);
          } else if (recipeData.length > 0) {
            // Add the fetched recipe data to the array
            fetchedRecipes.push(recipeData[0]);
          }
        }

        // Set the fetched recipes in your state variable
        setSavedRecipes(fetchedRecipes);
      }
    }

    fetchSavedRecipes();
  }, [userEmail]); // Add userEmail to the dependency array
  function formatMarkdown(text) {
    // Replace double asterisks or underscores with bold tags
    text = text.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");

    // Replace single asterisks or underscores with italic tags
    text = text.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

    // Replace single underscores with underline tags
    text = text.replace(/(_)(.*?)\1/g, "<u>$2</u>");

    return text;
  }

  const handleUnsaveClick = async (recipe_id, event) => {
    event.stopPropagation(); // Prevent event propagation to the Link element

    try {
      // Send a DELETE request to remove the saved recipe from the 'recipeLikes' table
      const { data, error } = await supabase
        .from("recipelikes")
        .delete()
        .eq("recipeid", recipe_id)
        .eq("userid", userEmail);

      if (error) {
        console.error("Error unsaving recipe:", error);
        // Handle the error as needed (e.g., show an error message)
      } else {
        // Recipe unsaved successfully
        console.log("Recipe unsaved:", data);
        alert("Recipe Unsaved!");
        // You can update the UI to reflect that the recipe has been unsaved, if needed
      }
    } catch (error) {
      console.error("Error unsaving recipe:", error);
      // Handle the error as needed (e.g., show an error message)
    }
  };

  useEffect(() => {
    // Fetch recipes data from the "recipes" table
    async function fetchUserProfile() {
      const { data, error } = await supabase
        .from("userProfiles")
        .select("*")
        .eq("email", userEmail);

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setUserProfile(data);
        console.log(userProfile);
      }
    }

    fetchUserProfile();
  }, []);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [formData, setFormData] = useState({
    userName: "", // Initialize with an empty string or default value
    bio: "",
    dietaryPreferences: "",
    allergies: "",
  });

  // Event handler for input changes
  const handleInputChange = (e, field) => {
    const updatedFormData = { ...formData };
    updatedFormData[field] = e.target.value;
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract user email from session data
    const userEmail = JSON.parse(sessionData).user.email;
    const usersName = userEmail.split("@")[0];

    // Create a new profile object with the updated data
    const updatedProfile = {
      name: formData.userName,
      bio: formData.bio,
      dietary_preferences: formData.dietaryPreferences,
      allergies: formData.allergies,
    };

    try {
      // Check if the user's profile already exists
      const { data: existingProfile, error: profileError } = await supabase
        .from("userProfiles")
        .select("*")
        .eq("username", usersName);

      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        return; // Handle the error as needed
      }

      if (existingProfile.length === 0) {
        // User's profile doesn't exist, create a new one
        const { data: newProfile, error: newProfileError } = await supabase
          .from("userProfiles")
          .upsert([
            {
              // Use the user's email as the unique identifier
              email: userEmail,
              username: usersName,
              ...updatedProfile,
            },
          ]);

        if (newProfileError) {
          console.error("Error creating new profile:", newProfileError);
          return; // Handle the error as needed
        }

        console.log("New profile created successfully:", newProfile);
      } else {
        // User's profile exists, update the existing row with the new data
        const { data, error } = await supabase.from("userProfiles").upsert([
          {
            // Use the user's email as the unique identifier
            email: userEmail,
            username: usersName,
            ...updatedProfile,
          },
        ]);

        if (error) {
          console.error("Error updating profile:", error);
          return; // Handle the error as needed
        }

        console.log("Profile updated successfully:", data);
      }

      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      console.error("Error updating/creating profile:", error);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-purple-50">
      <div className="container md:mx-auto px-2 py-4">
        <Nav />
        <div className="bg-blue-50 bg-opacity-70 shadow-md rounded p-4">
          {userProfile[0] ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="">
                  <h1 className="text-3xl font-semibold">
                    {userProfile[0].name || "Your Name"}
                  </h1>
                  <p className="text-gray-600">
                    {userProfile[0].email || "Your Email"}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingProfile(true)} // Set isEditingProfile to true when clicked
                  className={`bg-primary text-white px-3 py-1.5 rounded-2xl ${
                    userProfile[0]
                      ? "disabled:opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={userProfile[0]}
                >
                  Edit Profile
                </button>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold">Bio</h2>
                <p className="text-gray-700">
                  {userProfile[0].bio || "No Bio set"}
                </p>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold">Dietary Preferences</h2>
                <p className="text-gray-700">
                  {userProfile[0].dietary_preferences || "Not Set"}
                </p>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold">Allergies</h2>
                <p className="text-gray-700">
                  {userProfile[0].allergies || "Not Set"}
                </p>
              </div>
            </div>
          ) : (
            <p>
              It seems you have not added a profile...
              <button
                onClick={() => setIsEditingProfile(true)} // Set isEditingProfile to true when clicked
                className="bg-primary text-white px-3 py-1.5 rounded-2xl"
              >
                Add Profile
              </button>
            </p>
          )}
        </div>
        <div>
          <h2 className="font-bold text-xl lg:text-2xl text-center py-5">
            Saved Recipes
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {savedRecipes?.length > 0 ? (
              savedRecipes.map((recipe) => (
                <div
                  className="bg-white shadow-lg rounded-lg overflow-hidden mb-4"
                  key={recipe.recipe_id}
                >
                  <Link
                    to={`/recipe/${recipe.recipe_id}`}
                    key={recipe.recipe_id}
                    className=""
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
                      <h4 className="text-lg font-semibold">Ingredients:</h4>
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
                  </Link>

                  <div className="flex justify-between px-4 py-2 flex-row">
                    <div className=" py-2">
                      <p className="text-sm text-gray-600">
                        By{" "}
                        <span className="font-semibold text-primary">
                          {recipe.userName}
                        </span>{" "}
                        in{" "}
                        <span className="text-gray-600">{recipe.category}</span>
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className=" bg-red-500 flex items-center hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() =>
                          handleUnsaveClick(recipe.recipe_id, event)
                        }
                      >
                        <AiFillHeart size={20} className="mr-2" /> Unsave
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-2">
                You have not saved any recipe yet!
              </p>
            )}
          </div>
        </div>
        <div className={` ${isEditingProfile ? "flex" : "hidden"}`}>
          <div
            className={`fixed inset-0 justify-center items-center flex top-[5rem] left-50`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/5"
            >
              <div className="mb-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  disabled
                  value={JSON.parse(sessionData).user.email.split("@")[0]}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>{" "}
              <div className="mb-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={JSON.parse(sessionData).user.email}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  onChange={(e) => handleInputChange(e, "userName")}
                  value={formData.userName}
                />
              </div>
              <div className="mb-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="bio"
                  placeholder="Your Bio"
                  rows="4"
                  onChange={(e) => handleInputChange(e, "bio")}
                  value={formData.bio}
                ></textarea>
              </div>
              <div className="mb-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="dietaryPreferences"
                >
                  Dietary Preferences
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dietaryPreferences"
                  type="text"
                  placeholder="Your Dietary Preferences"
                  // You can bind this input value to a state variable for dietary preferences
                  value={formData.dietaryPreferences}
                  onChange={(e) => handleInputChange(e, "dietaryPreferences")}
                />
              </div>
              <div className="mb-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="allergies"
                >
                  Allergies
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="allergies"
                  type="text"
                  onChange={(e) => handleInputChange(e, "allergies")}
                  value={formData.allergies}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setIsEditingProfile(false)} // Set isEditingProfile to false to cancel editing
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setIsEditingProfile(false)} // Set isEditingProfile to false to cancel editing
                  type="submit"
                  // Add a function to handle the form submission and update the user's profile
                  // onClick={handleProfileUpdate}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
