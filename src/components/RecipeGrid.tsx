import { useState } from "react";
import MenuCard from "./public/MenuCard";

interface Recipe {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export default function RecipeGrid() {
  const [recipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem("dishes");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {recipes.map((recipe) => (
        <MenuCard
          key={recipe.id}
          name={recipe.name}
          description={recipe.description}
          image={recipe.image}
          price={recipe.price}
          category={recipe.category}
        />
      ))}
    </div>
  );
}
