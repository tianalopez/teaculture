from marshmallow import fields, validate, validates, ValidationError
from models.favorite import Favorite
from app_setup import ma

class FavoriteSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Favorite
        load_instance = True
        fields =["id", "user_id", "recipe_id"]
