from marshmallow import fields, validate, validates, ValidationError
from models.favorite import Favorite
from app_setup import ma

class FavoriteSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Favorite
        load_instance = True
        fields =["id", "user_id", "user", "recipe_id", "recipe", "created_at",]

    recipe = fields.Nested('RecipeSchema', only=("id", "title","creator_id",))
    user = fields.Nested('UserSchema', only=("id", "username",))
