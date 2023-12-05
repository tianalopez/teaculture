from marshmallow import fields, validate
from models.user import User
from app_setup import ma
from schemas.recipe_schema import RecipeSchema


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True
        fields = ["id", "username", "email", "location", "interests", "bio", "recipes"]

    username = fields.String(required=True, validate=validate.Length(min=3, max=20))
    password_hash = fields.String(validate=validate.Length(min=12, max=50))
    email = fields.String(required=True, validate=validate.Length(min=2, max=256))
    recipes = fields.List(fields.Nested(RecipeSchema)) #!check for recursion
