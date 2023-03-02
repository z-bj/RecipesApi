# Recipes API
![Typescript](https://img.shields.io/badge/Typescript-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) ![AdonisJS](https://img.shields.io/badge/AdonisJS-220052?style=for-the-badge&logo=adonisjs&logoColor=white) ![Create React App](https://img.shields.io/badge/Create%20React%20App-000000?style=for-the-badge&logo=create-react-app&logoColor=white)


A cooking recipe management app that allows users to create and manage recipes, and persist them on a server. The back-end is provided and managed with the Adonis Node.js framework, and the database is managed with SQLite.

## Features

-   User authentication system based on cookie
-   List of recipes with the possibility to consult and edit them in live
-   Ability to manage ingredients used in different recipes, and modify the quantities and units of measurement of the recipes
-   Add new recipes, with fields validation
-   API for CRUD operations on recipes and ingredients

## Demo

[Demo Link](https://recipes-api-zbj.netlify.app/)

## Installation

To start the server, navigate to the api folder and run the following commands:

Copy code

`yarn install yarn run build yarn run dev`

Then, to start the front-end app, navigate to the front folder and run:

sqlCopy code

`yarn install yarn start`

The app will run on [http://localhost:3000](http://localhost:3000/).

## Structure

The app's state is structured as follows:

-   App
    -   user
    -   LoginForm
        -   onConnect(user)
    -   Site
        -   page
        -   ingredients
        -   recipes
        -   currentRecipe
        -   Recipes
            -   recipes
        -   RecipeDetail
            -   id
            -   recipe
        -   RecipeEditForm
            -   recipe
            -   ingredients
            -   onSubmit(recipe, newRecipe)
        -   Ingredients
            -   ingredients
            -   onUpdate(ingredient, newIngredient)
            -   onDelete(ingredient)
            -   onCreate(ingredient)
        -   RecipeCreateForm
            -   ingredients
            -   onSubmit(newRecipe)

## Technologies Used

This project was bootstrapped with Create React App and uses Bootstrap classes for UI. The Adonis framework is used for back-end development and SQLite for database management.

## APIs

The following APIs are available:

-   /login: Endpoint for user authentication
-   /recipes: API for CRUD operations on recipes
-   /ingredients: API for CRUD operations on ingredients

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
