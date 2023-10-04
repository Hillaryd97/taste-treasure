import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RecipeCard from "./components/RecipeCard";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/recipe/RecipeDetails";
import ExternalRecipes from "./pages/other_recipes/ExternalRecipes";
import Profile from "./pages/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/recipeCard" element={<RecipeCard />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recipe/:recipe_id" element={<RecipeDetails />} />
      <Route path="/other_recipes/:idMeal" element={<ExternalRecipes />} />

    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
