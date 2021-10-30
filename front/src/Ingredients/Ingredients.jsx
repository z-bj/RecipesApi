import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Loader } from "../ui/Loader";

export function Ingredients({ ingredients, onDelete }) {
  return (
    <div>
      <h1>Ingredients</h1>

      {ingredients === null ? (
        <Loader />
      ) : (
        <IngredientsList ingredients={ingredients} onDelete={onDelete} />
      )}
    </div>
  );
}
function IngredientsList({ ingredients, onDelete }) {
  return (
    <ul>
      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function Ingredient({ ingredient, onDelete }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async function (e) {
    e.preventDefault();
    setLoading(true);
    await onDelete(ingredient);
  };
  return (
    <li>
      {ingredient.title}
      <Button type="danger" onClick={handleDelete} loading={loading}>
        Delete
      </Button>
    </li>
  );
}
