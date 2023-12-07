from . import request, Resource
from models.recipe import Recipe
from schemas.recipe_schema import RecipeSchema
from app_setup import db

recipe_schema = RecipeSchema(session=db.session)
recipes_schema = RecipeSchema(many=True, session=db.session)


class Recipes(Resource):
    def get(self):
        recipes = recipes_schema.dump(Recipe.query)
        return recipes, 200

    def post(self):
        try:
            data = request.json
            # validate data
            recipe_schema.validate(data)
            # deserialize with load()
            new_recipe = recipe_schema.load(data)
            # add new recipe to recipe table
            db.session.add(new_recipe)
            db.session.commit()
            # serialize with dump()
            serialized_recipe = recipe_schema.dump(new_recipe)
            return serialized_recipe, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400
