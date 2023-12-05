from marshmallow import fields, validate, validates, ValidationError
from models.review import Review
from app_setup import ma


class ReviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Review
        load_instance = True
        fields = ["id", "rating", "comment"]

    rating = fields.Integer(validate=validate.Range(min=1, max=5))
    comment = fields.Integer(validate=validate.Length(min=3, max=300))
