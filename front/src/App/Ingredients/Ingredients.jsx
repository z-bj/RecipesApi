import React, { useState, memo } from "react";
import { Loader } from "../../ui/Loader";
import { Button } from "../../ui/Button";
import { Trash, Upload } from "../../ui/Icon";
import { ApiErrors } from "../../utils/api";
import { Field } from "../../ui/Field";

export function Ingredients({ ingredients, onDelete, onUpdate, onCreate }) {
  return (
    <div>
      <h1>Ingredients</h1>
      <CreateIngredientForm onSubmit={onCreate} />
      {ingredients === null ? (
        <Loader />
      ) : (
        <IngredientsList
          ingredients={ingredients}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}

function IngredientsList({ ingredients, onDelete, onUpdate }) {
  return (
    <div>
      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

const Ingredient = memo(function ({ ingredient, onDelete, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleDelete = async function (e) {
    e.preventDefault();
    setLoading(true);
    await onDelete(ingredient);
  };
  const handleSubmit = async function (e) {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      await onUpdate(ingredient, new FormData(e.target));
    } catch (e) {
      if (e instanceof ApiErrors) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    }
    setLoading(false);
  };
  const errorFor = function (field) {
    const error = errors.find((e) => e.field === field);
    if (error) {
      return error.message;
    }
    return null;
  };

  return (
    <form className="d-flex align-items-start" onSubmit={handleSubmit}>
      <Field
        defaultValue={ingredient.title}
        name="title"
        className="mr-2"
        error={errorFor("title")}
      />
      <Field
        defaultValue={ingredient.unit}
        name="unit"
        className="mr-2"
        error={errorFor("unit")}
      />
      <Button type="submit" loading={loading}>
        <Upload />
      </Button>
      <Button type="danger" onClick={handleDelete} loading={loading}>
        <Trash />
      </Button>
    </form>
  );
});

function CreateIngredientForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async function (e) {
    const form = e.target;
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      await onSubmit(new FormData(form));
      form.reset();
      form.querySelector("input").focus();
    } catch (e) {
      if (e instanceof ApiErrors) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    }
    setLoading(false);
  };
  const errorFor = function (field) {
    const error = errors.find((e) => e.field === field);
    if (error) {
      return error.message;
    }
    return null;
  };

  return (
    <form className="d-flex align-items-start" onSubmit={handleSubmit}>
      <Field
        placeholder="Name of ingredient"
        name="title"
        className="mr-2"
        error={errorFor("title")}
      />
      <Field
        placeholder="Unit of measurement"
        name="unit"
        className="mr-2"
        error={errorFor("unit")}
      />
      <Button type="submit" loading={loading}>
        Create
      </Button>
    </form>
  );
}
