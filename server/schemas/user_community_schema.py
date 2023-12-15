from marshmallow import fields, validate, validates, ValidationError
from models.user_community import UserCommunity
from app_setup import ma


class UserCommunitySchema(ma.SQLAlchemySchema):
    class Meta:
        model = UserCommunity
        load_instance = True
        fields = ["id", "user_id", "user","community_id"]

    user = fields.Nested("UserSchema", only=("id", "username",))
