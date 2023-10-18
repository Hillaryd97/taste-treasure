import { useState, useEffect } from "react";

const IngredientCard = () => {
  const [currentIngredientIndex, setCurrentIngredientIndex] = useState(0);

  const ingredients = [
    {
      id: 1,
      name: "Strawberries",
      quick_facts: "Sweet and juicy, excellent in desserts and smoothies.",
      fun_facts: "Strawberries are the only fruit with seeds on the outside.",
      recipe_ideas: [
        "Strawberry Shortcake",
        "Berry Smoothie",
        "Strawberry Jam",
      ],
    },
    {
      id: 2,
      name: "Avocado",
      quick_facts: "High in healthy fats and great for making guacamole.",
      fun_facts: "Avocado is a fruit and a berry, but not a vegetable!",
      recipe_ideas: ["Guacamole", "Avocado Toast", "Avocado and Chicken Salad"],
    },
    {
      id: 3,
      name: "Tomatoes",
      quick_facts: "Rich in vitamin C, commonly used in salads and sauces.",
      fun_facts:
        "Tomatoes are technically berries! They're also known for their umami flavor.",
      recipe_ideas: [
        "Classic Tomato Soup",
        "Caprese Salad",
        "Spaghetti Pomodoro",
      ],
    },
    {
      id: 4,
      name: "Bananas",
      quick_facts: "High in potassium and a great source of energy.",
      fun_facts: "Bananas are technically berries!",
      recipe_ideas: ["Banana Bread", "Banana Smoothie", "Banana Pancakes"],
    },
    {
      id: 5,
      name: "Spinach",
      quick_facts: "Packed with vitamins and minerals, especially iron.",
      fun_facts: "Spinach was Popeye's secret for super strength!",
      recipe_ideas: [
        "Spinach and Feta Stuffed Chicken",
        "Spinach Salad",
        "Creamed Spinach",
      ],
    },
    {
      id: 6,
      name: "Chicken",
      quick_facts:
        "A lean source of protein and versatile for various cuisines.",
      fun_facts: "There are more chickens on Earth than people!",
      recipe_ideas: [
        "Chicken Alfredo",
        "Grilled Chicken Tacos",
        "Chicken Curry",
      ],
    },
    {
      id: 7,
      name: "Broccoli",
      quick_facts: "High in fiber and vitamin C, great for stir-fries.",
      fun_facts: "Broccoli is a cousin of cauliflower!",
      recipe_ideas: [
        "Roasted Broccoli",
        "Broccoli and Cheddar Soup",
        "Chicken and Broccoli Stir-Fry",
      ],
    },
    {
      id: 8,
      name: "Eggs",
      quick_facts:
        "An excellent source of protein and versatile for breakfast dishes.",
      fun_facts: "An ostrich egg is equivalent to 24 chicken eggs!",
      recipe_ideas: ["Scrambled Eggs", "Eggs Benedict", "Deviled Eggs"],
    },
    {
      id: 9,
      name: "Potatoes",
      quick_facts: "Versatile and a great source of carbohydrates.",
      fun_facts: "Potatoes were the first vegetable to be grown in space!",
      recipe_ideas: ["Mashed Potatoes", "French Fries", "Potato Soup"],
    },
    {
      id: 10,
      name: "Onions",
      quick_facts: "A staple in many cuisines, adds flavor to dishes.",
      fun_facts: "Onions were used as currency in some ancient cultures!",
      recipe_ideas: ["Caramelized Onions", "Onion Rings", "French Onion Soup"],
    },
    {
      id: 11,
      name: "Chocolate",
      quick_facts: "A beloved sweet ingredient for desserts and treats.",
      fun_facts:
        "The world's largest chocolate bar weighed over 12,000 pounds!",
      recipe_ideas: [
        "Chocolate Cake",
        "Chocolate Chip Cookies",
        "Hot Chocolate",
      ],
    },
    {
      id: 12,
      name: "Lemons",
      quick_facts: "Tangy and zesty, rich in vitamin C.",
      fun_facts: "Lemons can power a small digital watch with their acidity!",
      recipe_ideas: ["Lemonade", "Lemon Bars", "Lemon Garlic Chicken"],
    },
    {
      id: 13,
      name: "Garlic",
      quick_facts:
        "Adds a robust flavor to dishes, known for its health benefits.",
      fun_facts: "The world consumes over 80 million tons of garlic each year!",
      recipe_ideas: [
        "Garlic Butter Shrimp",
        "Roasted Garlic Hummus",
        "Garlic Bread",
      ],
    },
    {
      id: 14,
      name: "Pasta",
      quick_facts:
        "A staple in Italian cuisine, comes in various shapes and sizes.",
      fun_facts: "There are over 600 different pasta shapes around the world!",
      recipe_ideas: ["Spaghetti Bolognese", "Fettuccine Alfredo", "Lasagna"],
    },
    {
      id: 15,
      name: "Salmon",
      quick_facts: "Rich in omega-3 fatty acids, a popular fish for cooking.",
      fun_facts: "Some salmon can jump up to 12 feet in the air!",
      recipe_ideas: [
        "Grilled Salmon",
        "Salmon Teriyaki",
        "Smoked Salmon Bagel",
      ],
    },
    {
      id: 16,
      name: "Rice",
      quick_facts:
        "A staple food for many cultures, comes in different varieties.",
      fun_facts:
        "Rice is the primary food source for over half of the world's population!",
      recipe_ideas: ["Fried Rice", "Rice Pudding", "Sushi Rolls"],
    },
    {
      id: 17,
      name: "Cilantro",
      quick_facts: "A fresh herb with a bright, citrusy flavor.",
      fun_facts:
        "Cilantro is also known as coriander leaf and is widely used in Asian and Latin American cuisines.",
      recipe_ideas: ["Cilantro Lime Rice", "Fresh Salsa", "Cilantro Pesto"],
    },
    {
      id: 18,
      name: "Olive Oil",
      quick_facts: "A heart-healthy oil used for cooking and dressing.",
      fun_facts: "Olive oil has been produced for over 5,000 years!",
      recipe_ideas: [
        "Olive Oil Vinaigrette",
        "Roasted Vegetables",
        "Mediterranean Salad",
      ],
    },
    {
      id: 19,
      name: "Carrots",
      quick_facts: "Rich in vitamin A, excellent for snacking and cooking.",
      fun_facts: "Carrots were originally purple and not orange!",
      recipe_ideas: ["Carrot Cake", "Roasted Carrots", "Carrot Soup"],
    },
    {
      id: 20,
      name: "Apples",
      quick_facts: "A popular fruit known for its sweet and crisp taste.",
      fun_facts: "There are over 7,500 apple varieties grown worldwide!",
      recipe_ideas: ["Apple Pie", "Caramel Apples", "Apple Crisp"],
    },
    {
      id: 21,
      name: "Pineapple",
      quick_facts: "Tropical fruit with a sweet and tangy flavor.",
      fun_facts:
        "Pineapple is actually a collection of berries fused together!",
      recipe_ideas: [
        "Pineapple Salsa",
        "Pineapple Upside-Down Cake",
        "Grilled Pineapple",
      ],
    },
    {
      id: 22,
      name: "Peppers",
      quick_facts: "Come in various colors, adds color and flavor to dishes.",
      fun_facts: "Bell peppers are related to chili peppers!",
      recipe_ideas: [
        "Stuffed Bell Peppers",
        "Pepper Steak Stir-Fry",
        "Roasted Red Pepper Hummus",
      ],
    },
    {
      id: 23,
      name: "Mushrooms",
      quick_facts:
        "Fungi with a unique earthy flavor, versatile for many dishes.",
      fun_facts: "Mushrooms are more closely related to humans than plants!",
      recipe_ideas: [
        "Creamy Mushroom Risotto",
        "Stuffed Mushrooms",
        "Mushroom Gravy",
      ],
    },
    {
      id: 24,
      name: "Honey",
      quick_facts:
        "Natural sweetener produced by bees, used in baking and cooking.",
      fun_facts:
        "Honey never spoils; archaeologists have found pots of honey in ancient Egyptian tombs!",
      recipe_ideas: [
        "Honey Glazed Salmon",
        "Honey Mustard Dressing",
        "Honey Roasted Carrots",
      ],
    },
    {
      id: 25,
      name: "Lettuce",
      quick_facts: "Crunchy and refreshing, a staple in salads and sandwiches.",
      fun_facts: "Lettuce is part of the daisy family!",
      recipe_ideas: ["Caesar Salad", "BLT Sandwich", "Lettuce Wraps"],
    },
    {
      id: 26,
      name: "Cucumbers",
      quick_facts: "Cool and hydrating, great for salads and pickling.",
      fun_facts:
        "Cucumbers belong to the same plant family as pumpkins and zucchinis!",
      recipe_ideas: [
        "Cucumber Salad",
        "Tzatziki Sauce",
        "Cucumber Sushi Rolls",
      ],
    },
    {
      id: 27,
      name: "Peaches",
      quick_facts: "Sweet and juicy stone fruit, a summer favorite.",
      fun_facts: "Georgia is known as the Peach State in the U.S.!",
      recipe_ideas: ["Peach Cobbler", "Grilled Peaches", "Peach Smoothie"],
    },
    {
      id: 28,
      name: "Basil",
      quick_facts: "A fragrant herb used in Italian and Mediterranean dishes.",
      fun_facts: "Basil is considered a symbol of love in some cultures!",
      recipe_ideas: ["Caprese Salad", "Pesto Pasta", "Tomato Basil Soup"],
    },
    {
      id: 29,
      name: "Black Beans",
      quick_facts: "Protein-rich legume used in various cuisines.",
      fun_facts: "Black beans are a staple in Latin American cuisine!",
      recipe_ideas: [
        "Black Bean Burritos",
        "Black Bean Soup",
        "Black Bean Salad",
      ],
    },
    {
      id: 30,
      name: "Pears",
      quick_facts: "Sweet and juicy fruit with a pear-shaped appearance.",
      fun_facts: "There are over 3,000 varieties of pears worldwide!",
      recipe_ideas: ["Pear Tart", "Pear and Walnut Salad", "Poached Pears"],
    },
  ];

  useEffect(() => {
    const ingredientCount = ingredients.length;

    // Set an interval to cycle through ingredients every 8 hours.
    const intervalId = setInterval(() => {
      // Increment the current ingredient index, and reset to 0 when reaching the end.
      setCurrentIngredientIndex(
        (prevIndex) => (prevIndex + 1) % ingredientCount
      );
    }, 3600000);

    // Clean up the interval when the component unmounts.
    return () => {
      clearInterval(intervalId);
    };
  }, [ingredients]);

  const currentIngredient = ingredients[currentIngredientIndex];

  return (
    <div>
      {currentIngredient && (
        // Check if there's a currentIngredient
        <div key={currentIngredient.id}>
          <div className="pt-2 px-3">
            <h4 className="font-semibold text-lg text-center uppercase text-primary">
              {currentIngredient.name}
            </h4>
            <h4 className="font-black">Facts: </h4>
            <ul className="list-disc list-inside text-gray-800">
              <li className="">{currentIngredient.quick_facts}</li>
              <li>{currentIngredient.fun_facts}</li>
            </ul>
          </div>
          <div className="pt-1 px-3">
            <h4 className="font-black">Recipe Ideas: </h4>
            <ul className="list-disc list-inside">
              {currentIngredient.recipe_ideas.map((idea, index) => (
                <li className="text-gray-800" key={index}>
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientCard;
