from marshmallow import fields, validate, validates, ValidationError
from models.recipe import Recipe
from app_setup import ma

class RecipeSchema(ma.SQLAlchemySchema):
    pass
