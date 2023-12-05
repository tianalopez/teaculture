from marshmallow import fields, validate
from models.user import User
from app_setup import ma
from schemas.recipe_schema import RecipeSchema
from schemas.community_schema import CommunitySchema
from schemas.review_schema import ReviewSchema


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True
        fields = [
            "id",
            "username",
            "email",
            "location",
            "interests",
            "bio",
            "owned_recipes",
            "communities",
            "reviews"
        ]

    username = fields.String(required=True, validate=validate.Length(min=3, max=20))
    password_hash = fields.String(validate=validate.Length(min=12, max=50))
    email = fields.String(required=True, validate=validate.Length(min=2, max=256))
    owned_recipes = fields.List(fields.Nested(RecipeSchema), many=True)  #!check for recursion
    communities = fields.List(fields.Nested(CommunitySchema, only=("id", "name", "description",), many=True))  #!check for recursion
    reviews = fields.List(fields.Nested(ReviewSchema, only=("id", "rating", "comment",), many=True))
