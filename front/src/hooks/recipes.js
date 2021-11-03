import { useReducer, useCallback } from "react"
import { apiFetch } from "../utils/api"

function reducer(state, action) {
    console.log('RECIPES REDUCE', action.type, action)
    switch (action.type) {
        case 'FETCHING_RECIPES':
            return { ...state, loading: true }
        case 'SET_RECIPES':
            return { ...state, loading: false, recipes: action.payload }
        case 'FETCHING_RECIPE':
            return { ...state, recipeId: action.payload.id }
        case 'DESELECT_RECIPE':
            return { ...state, recipeId: null }
        case 'SET_RECIPE':
            return {
                ...state,
                recipes: state.recipes.map(r => r.id === action.payload.id ? action.payload : r)
            }
        default:
            throw new Error('Action inconnue ' + action.type)
    }
}

export function useRecipes() {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        recipes: null,
        recipeId: null
    })

    const recipe = state.recipes ? state.recipes.find(r => r.id === state.recipeId) : null

    return {
        recipes: state.recipes,
        recipe: recipe,
        fetchRecipes: async function () {
            if (state.loading || state.recipes !== null) {
                return
            }
            dispatch({ type: 'FETCHING_RECIPES' })
            const recipes = await apiFetch('/recipes')
            dispatch({ type: 'SET_RECIPES', payload: recipes })
        },
        fetchRecipe: useCallback(async function (recipe) {
            dispatch({ type: 'FETCHING_RECIPE', payload: recipe })
            if (!recipe.content) {
                recipe = await apiFetch('/recipes/' + recipe.id)
                dispatch({ type: 'SET_RECIPE', payload: recipe })
            }
        }, []),
        deselectRecipe: function () {
            dispatch({ type: 'DESELECT_RECIPE' })
        }
    }
}