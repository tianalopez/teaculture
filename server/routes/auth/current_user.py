from .. import Resource
from flask_jwt_extended import (
    jwt_required,
    current_user,
)
from schemas.user_schema import UserSchema
from app_setup import db

user_schema = UserSchema(session=db.session)


class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        return user_schema.dump(current_user), 200

#!every post/patch/delete form
class CheckToken(Resource):
    @jwt_required()
    def get(self):
        return {}, 202 #!success message

    #!if the request is bad for checkToken, fire refresh
    #!if refresh fails, then front-end you would navigate
