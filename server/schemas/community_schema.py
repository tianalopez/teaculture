from marshmallow import fields, validate, validates, ValidationError
from models.community import Community
from app_setup import ma


class CommunitySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Community
        load_instance = True
        fields = ["id", "name", "description", "owner_id", "users", "posts"]

    name = fields.String(required=True, validate=validate.Length(min=2, max=80))
    description = fields.String(validate=validate.Length(min=3, max=500))
    users = fields.List(fields.Nested("UserSchema", only=("id", "username",)))
    posts = fields.List(fields.Nested("PostSchema", exclude=("user_communities_id",), many=True))
