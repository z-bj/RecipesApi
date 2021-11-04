import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Field } from '../../ui/Field'
import { Loader } from '../../ui/Loader'
import { Trash } from '../../ui/Icon'
import { Button } from '../../ui/Button'
import { ApiErrors } from '../../utils/api'

export function CreateRecipeForm({ ingredients, onSubmit }) {
    return <RecipeForm ingredients={ingredients} onSubmit={onSubmit} button="Ajouter" />
}

export function EditRecipeForm({ ingredients, onSubmit, recipe }) {
    return <RecipeForm ingredients={ingredients} onSubmit={onSubmit} recipe={recipe} button="Editer" />
}

function RecipeForm({ ingredients, onSubmit, recipe = {}, button }) {

    const {
        ingredients: recipeIngredients,
        addIngredient,
        updateQuantity,
        deleteIngredient,
        resetIngredients,
    } = useIngredients(recipe.ingredients)
    const [errors, setErrors] = useState({})

    const filteredIngredients = (ingredients || []).filter(ingredient => {
        return !recipeIngredients.some(i => i.id === ingredient.id)
    })

    const handleSubmit = async function (e) {
        e.preventDefault()
        const form = e.target
        const data = Object.fromEntries(new FormData(form))
        data.ingredients = recipeIngredients
        setErrors({})
        try {
            await onSubmit(data)
            form.reset()
            resetIngredients()
        } catch (e) {
            if (e instanceof ApiErrors) {
                setErrors(e.errorsPerField)
            } else {
                throw e
            }
        }

    }

    return <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
            <Field name="title" required error={errors.title} defaultValue={recipe.title}>Titre</Field>
            <Field name="short" required type="textarea" error={errors.short} defaultValue={recipe.short}>Description courte</Field>
            <Field name="content" required type="textarea" error={errors.content} defaultValue={recipe.content}>Description</Field>
        </div>
        <div className="col-md-6">
            <h5>Ingrédients</h5>
            {recipeIngredients.map(i => <IngredientRow ingredient={i} key={i.id} onChange={updateQuantity} onDelete={deleteIngredient} />)}
            {ingredients ? <Select ingredients={filteredIngredients} onChange={addIngredient} /> : <Loader />}
        </div>
        <div className="col-md-12 mt-3">
            <Button type="submit">{button}</Button>
        </div>
    </form>
}

RecipeForm.propTypes = {
    ingredients: PropTypes.array,
}

function useIngredients(initial) {
    const [ingredients, setIngredients] = useState(initial || [])

    return {
        ingredients: ingredients,
        addIngredient: useCallback(function (ingredient) {
            setIngredients(state => [...state, ingredient])
        }, []),
        updateQuantity: useCallback(function (ingredient, quantity) {
            setIngredients(state => state.map(i => i === ingredient ? { ...i, quantity } : i))
        }, []),
        deleteIngredient: useCallback(function (ingredient) {
            setIngredients(state => state.filter(i => i !== ingredient))
        }, []),
        resetIngredients: useCallback(function () {
            setIngredients([])
        }, [])
    }
}


function IngredientRow({ ingredient, onChange, onDelete }) {

    const handleChange = function (e) {
        onChange(ingredient, e.target.value)
    }

    return <div className="d-flex mb-3 align-items-center">
        <div className="mr-2">{ingredient.title}</div>
        <Field className="mb-0" defaultValue={ingredient.quantity} placeholder="quantité" onChange={handleChange} required type="number" />
        <div className="ml-2">{ingredient.unit}</div>
        <Button type="danger" onClick={() => onDelete(ingredient)}><Trash /></Button>
    </div>
}

/**
 * Select pour sélectionner un ingrédient
 * 
 * @param {{ingredients: array}} state 
 */
function Select({ ingredients, onChange }) {
    const handleChange = function (e) {
        onChange(ingredients[parseInt(e.target.value, 10)])
    }

    return <select className="form-control" onChange={handleChange}>
        <option>Sélectionner un ingrédient</option>
        {ingredients.map((i, k) => <option key={i.id} value={k}>
            {i.title}
        </option>)}
    </select>
}