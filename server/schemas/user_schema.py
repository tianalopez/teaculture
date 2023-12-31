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
            "interests",
            "bio",
            "owned_recipes",
            "owned_communities",
            "communities",
            "reviews",
            "favorites",
            "created_at",
        ]

    username = fields.String(required=True, validate=validate.Length(min=3, max=20))
    password_hash = fields.String(validate=validate.Length(min=12, max=50))
    email = fields.String(required=True, validate=validate.Length(min=2, max=256))
    owned_recipes = fields.List(
        fields.Nested("RecipeSchema", only=("id", "title", "creator_id", "created_at",))
    )
    owned_communities = fields.List(fields.Nested("CommunitySchema", only=("id", "name")))
    communities = fields.List(
        fields.Nested(
            CommunitySchema,
            only=(
                "id",
                "name",
                "description",
            ),
        )
    )
    reviews = fields.List(
        fields.Nested(
            ReviewSchema,
            only=(
                "id",
                "rating",
                "comment",
                "recipe_id",
                "created_at",
                "recipe",
            ),
        )
    )
    favorites = fields.List(
        fields.Nested(
            "FavoriteSchema",
            only=(
                "id",
                "recipe_id",
                "created_at",
            ),
        )
    )
