from marshmallow import fields, validate, validates, ValidationError
from models.recipe import Recipe
from app_setup import ma


class RecipeSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Recipe
        load_instance = True
        fields = [
            "id",
            "title",
            "instructions",
            "tags",
            "ingredients",
            "medicinal",
            "creator_id",
            "creator",
            "image",
            "created_at",
            "updated_at",
            "average_rating",
        ]

    title = fields.String(required=True, validate=validate.Length(min=2, max=80))
    instructions = fields.String(
        required=True, validate=validate.Length(min=3, max=5000)
    )
    tags = fields.String(required=True, validate=validate.Length(min=1))
    ingredients = fields.String(required=True, validate=validate.Length(min=1))
    medicinal = fields.Boolean(required=True)
    creator = fields.Nested("UserSchema", only=("username",))
    average_rating = fields.Method("calculate_average_rating", dump_only=True)
    image = fields.String(required=False, validate=validate.Length(min=1, max=255))

    # custom method for average_rating
    def calculate_average_rating(self, obj):
        reviews = obj.reviews
        if reviews:

            return int(sum(review.rating for review in reviews) / len(reviews))
        else:
            return None
