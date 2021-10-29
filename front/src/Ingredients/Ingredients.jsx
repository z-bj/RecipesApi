import React from "react";
import PropTypes from "prop-types";
export function Ingredients({ ingredients }) {
  return (
    <div>
      <h1>Ingredients</h1>
      {JSON.stringify(ingredients)}
    </div>
  );
}

Ingredients.propTypes = {
  ingredients: PropTypes.array,
};
