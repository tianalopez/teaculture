from marshmallow import fields, validate, validates, ValidationError
from models.review import Review
from models.recipe import Recipe
from app_setup import ma

#!PREVENT someone from reviewing their own
class ReviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Review
        load_instance = True
        fields = ["id", "rating", "comment", "user_id", "user","recipe_id", "recipe", "created_at"]

    rating = fields.Integer(required=True, validate=validate.Range(min=1, max=5))
    comment = fields.String(validate=validate.Length(min=3, max=300))
    user = fields.Nested('UserSchema', only=("id", "username",))
    recipe = fields.Nested('RecipeSchema', only=("id", "title",))
