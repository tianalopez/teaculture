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
            "created_at",
            "updated_at",
        ]

    title = fields.String(required=True, validate=validate.Length(min=2, max=80))
    instructions = fields.String(
        required=True, validate=validate.Length(min=3, max=5000)
    )
    tags = fields.String(required=True, validate=validate.Length(min=1))
    ingredients = fields.String(required=True, validate=validate.Length(min=1))
    medicinal = fields.Boolean(required=True)
