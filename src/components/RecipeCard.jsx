const RecipeCard = () => {
  const recipe = {
    image: "",
    userName: "Baker123",
    category: "Dessert",
    recipeName: "Chocolate Cake",
    instructions: `
        1. Preheat the oven to 350°F (175°C).
        2. In a mixing bowl, combine 2 cups of all-purpose flour, 1 cup of sugar, 1/2 cup of cocoa powder, 1 tsp of baking powder, and 1/2 tsp of salt.
        3. In another bowl, mix 2 eggs, 1 cup of milk, 1/2 cup of vegetable oil, and 1 tsp of vanilla extract.
        4. Gradually add the wet mixture to the dry mixture, stirring until well combined.
        5. Pour the batter into a greased and floured 9x9-inch baking pan.
        6. Bake for 30-35 minutes or until a toothpick inserted into the center comes out clean.
        7. Let the cake cool, then frost with your favorite chocolate icing.
        8. Enjoy your delicious chocolate cake!
      `,
    ingredients: [
      "2 cups all-purpose flour",
      "1 cup sugar",
      "1/2 cup cocoa powder",
      "1 tsp baking powder",
      "1/2 tsp salt",
      "2 eggs",
      "1 cup milk",
      "1/2 cup vegetable oil",
      "1 tsp vanilla extract",
    ],
    timeNeeded: "45 minutes",
  };

  return (
    <div className="lg:w-1/3 md:w-1/2 sm:w-full p-3 bg-white shadow-sm border rounded-sm mb-4">
      <img
        src={recipe.image}
        alt={recipe.recipeName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{recipe.recipeName}</h3>
        <p className="text-sm text-gray-500">
          By <span className="font-bold text-primary">{recipe.userName}</span>{" "}
          in <span className="">{recipe.category}</span>
        </p>
        <p className="text-gray-700 mt-2">{recipe.instructions}</p>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Ingredients</h4>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            Time Needed: <span className="font-bold">{recipe.timeNeeded}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between p-3">
        <button className="hover:bg-opacity-80 rounded-full bg-red-500 py-1 px-4 text-white">
          Like
        </button>
        <button className="hover:bg-opacity-80 rounded-full bg-primary py-1 px-4 text-white">
          View
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
