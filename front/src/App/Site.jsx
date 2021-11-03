import React, { useState, useEffect } from 'react'
import { Ingredients } from './Ingredients/Ingredients'
import { useIngredients } from '../hooks/ingredients'

export function Site() {

    const [page, setPage] = useState('ingredients')
    const {
        ingredients,
        fetchIngredients,
        deleteIngredient,
        updateIngredient,
        createIngredient,
    } = useIngredients()

    let content = null
    if (page === 'ingredients') {
        content = <Ingredients
            ingredients={ingredients}
            onDelete={deleteIngredient}
            onUpdate={updateIngredient}
            onCreate={createIngredient}
        />
    }

    useEffect(function () {
        if (page === 'ingredients') {
            fetchIngredients()
        }
    }, [page, fetchIngredients])

    return <>
        <NavBar currentPage={page} onClick={setPage} />
        {content}
    </>
}

function NavBar({ currentPage, onClick }) {

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
    </nav>
}