# RecipesApi
**A Cooking recipe management app**

### Objectives:

This is a Front-End app to manage cooking recipes and that will allow to persist these recipes on a server.

The back-end is provided and managed with the **Adonis node-js framework & the DB is managed with sqlite**.

In a first time I configured the user's **authentification system**.

It is simply be **based on a cookie system**.

After sign in, we arrive on the list of recipes.

Here we have the possibility to consult any of these recipes and edit them in Live.

Automatically when saving ,the data are persisted on the server and if we update the page, the recipe is updated.
You can also manage the ingredients that will be used in the different recipes as well as modify the quantities and units of measurement of the recipes.

We can also add new recipes.

### Demo

![Demo](https://github.com/BjzArchi/RecipesApi/blob/master/Loom-_-RecipesApi.gif)


###  CRUD API

To Sign in, the App calls the Endpoint => **/login** and pass it the user and password.

The Api allows to consult the different recipes, we access it on the endpoint => **/recipes**.

there is also an Api to consult a particular recipe, to access to the first one, type => **/recipes/1**

and there is the same thing for the ingredients. => **/ingredients**

For the moment it is a relatively classic **CRUD API**.

This project was bootstrapped with **Create React App**.

UI is crafted with **Bootstrap** classes.

### To start server:
`cd api`

`yarn install`

`yarn run build`

`yarn run dev`

Open http://localhost:3333 to view it in the browser.

### To start front:
`cd front`

`yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.


## Structure
### StateVariable
  
Data (props) goes down⬇️,
State comes up⬆️


App
- user

LoginForm
- error
- loading
- ⬆️ onConnect(user)

Site
- page
- ingredients
- recipes
- currentRecipe

Recipes
- ⬇️ recipes

RecipeDetail
- ⬇️ id
- ⬇️ recipe

RecipeEditForm
- ⬇️ recipe
- ⬇️ ingredients
- ⬆️ onSubmit(recipe, newRecipe)

Ingredients
- ⬇️ ingredients
- ⬆️ onUpdate(ingredient, newIngredient)
- ⬆️ onDelete(ingredient)
- ⬆️ onCreate(ingredient)

RecipeCreateForm
- ⬇️ ingredients
- ⬆️ onSubmit(newRecipe)

