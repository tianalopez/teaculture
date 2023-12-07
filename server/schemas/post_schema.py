from marshmallow import fields, validate, validates, ValidationError
from models.post import Post
from app_setup import ma


class PostSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Post
        load_instance = True
        fields = ["id", "title", "content", "user_communities_id"]

    title = fields.String(required=True, validate=validate.Length(min=2, max=80))
    content = fields.String(required=True, validate=validate.Length(min=3, max=5000))
