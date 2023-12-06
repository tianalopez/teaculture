from . import request, Resource
from models.recipe import Recipe
from schemas.recipe_schema import RecipeSchema
from app_setup import db

recipe_schema = RecipeSchema(session=db.session)
recipes_schema = RecipeSchema(many=True, session=db.session)

class RecipeById(Resource):
    def get(self, id):
        if recipe:= db.session.get(Recipe, id):
            recipe_schema = RecipeSchema()
            return recipe_schema.dump(recipe), 200
        return {'error', "Could not find recipe"}, 404

    def delete(self, id):
        if recipe:= db.session.get(Recipe, id):
            try:
                db.session.delete(recipe)
                db.session.commit()
                return {'message': f'recipe {id} has been deleted'}, 200
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'Cound not find recipe'}, 404
