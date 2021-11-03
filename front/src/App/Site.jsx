import React, { useState, useEffect } from 'react'
import { Ingredients } from './Ingredients/Ingredients'
import { useIngredients } from '../hooks/ingredients'
import { Recipes } from './Recipes/Recipes'
import { useRecipes } from '../hooks/recipes'
import { Recipe } from './Recipes/Recipe'
import { useToggle } from '../hooks'
import { CreateRecipeForm } from './Recipes/CreateRecipeForm'
import { Modal } from '../ui/Modal'

export function Site() {

    const [page, setPage] = useState('recipes')
    const [add, toggleAdd] = useToggle(true)

    const {
        ingredients,
        fetchIngredients,
        deleteIngredient,
        updateIngredient,
        createIngredient,
    } = useIngredients()
    const {
        recipes,
        recipe,
        fetchRecipes,
        fetchRecipe,
        deselectRecipe,
        createRecipe,
    } = useRecipes()

    let content = null
    if (page === 'ingredients') {
        content = <Ingredients
            ingredients={ingredients}
            onDelete={deleteIngredient}
            onUpdate={updateIngredient}
            onCreate={createIngredient}
        />
    } else if (page === 'recipes') {
        content = <Recipes recipes={recipes} onClick={fetchRecipe} />
    }

    useEffect(function () {
        if (page === 'ingredients' || add === true) {
            fetchIngredients()
        }
        if (page === 'recipes') {
            fetchRecipes()
        }
    }, [page, fetchIngredients, add])

    return <>
        <NavBar currentPage={page} onClick={setPage} onButtonClick={toggleAdd} />
        <div className="container">
            {recipe ? <Recipe recipe={recipe} onClose={deselectRecipe} /> : null}
            {add && <Modal title="Créer une recette" onClose={toggleAdd}>
                <CreateRecipeForm ingredients={ingredients} onSubmit={createRecipe} />
            </Modal>}
            {content}
        </div>
    </>
}

function NavBar({ currentPage, onClick, onButtonClick }) {

    const navClass = function (page) {
        let className = 'nav-item'
        if (page === currentPage) {
            className = ' active'
        }
        return className;
    }

    return <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <a href="#recipes" className="navbar-brand" onClick={() => onClick('recipes')}>Recettes</a>
        <ul className="navbar-nav mr-auto">
            <li className={navClass('recipes')}>
                <a href="#recipes" className="nav-link" onClick={() => onClick('recipes')}>Recettes</a>
            </li>
            <li className={navClass('ingredients')}>
                <a href="#ingredients" className=" nav-link" onClick={() => onClick('ingredients')}>Ingrédients</a>
            </li>
        </ul>
        <button onClick={onButtonClick} className="btn btn-outline-light">
            Ajouter
        </button>
    </nav>
}