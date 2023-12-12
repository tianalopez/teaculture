from marshmallow import fields, validate
from models.user import User
from app_setup import ma
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
            "reviews",
            "favorites",
        ]

    username = fields.String(required=True, validate=validate.Length(min=3, max=20))
    password_hash = fields.String(validate=validate.Length(min=12, max=50))
    email = fields.String(required=True, validate=validate.Length(min=2, max=256))
    owned_recipes = fields.List(fields.Nested("RecipeSchema", only=("id", "title", "creator_id")))
    communities = fields.List(fields.Nested(CommunitySchema, only=("id", "name", "description",)))
    reviews = fields.List(fields.Nested(ReviewSchema, only=("id", "rating", "comment","recipe_id",)))
    favorites = fields.List(fields.Nested("FavoriteSchema", only=("id","recipe_id",)))
