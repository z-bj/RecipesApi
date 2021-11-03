import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../../ui/Loader'
import { Modal } from '../../ui/Modal'

export function Recipe({ recipe, onClose }) {
    return (
        <Modal title={recipe.title} onClose={onClose}>
            {!recipe.ingredients ?
                <Loader /> :
                <RecipeDetail recipe={recipe} />
            }
        </Modal>
    )
}

function RecipeDetail({ recipe }) {
    const htmlContent = { __html: recipe.content.split("\n").join('<br/>') }

    return <>
        <div dangerouslySetInnerHTML={htmlContent}></div>
        <h4 className="mt-4">Ingrédients</h4>
        <ul>
            {recipe.ingredients.map(i => <IngredientRow ingredient={i} key={i.id} />)}
        </ul>
    </>
}

function IngredientRow({ ingredient }) {
    return <li>
        <strong>{ingredient.quantity} {ingredient.unit}</strong> {ingredient.title}
    </li>
}

Recipe.propTypes = {
    recipe: PropTypes.object.isRequired,
}

