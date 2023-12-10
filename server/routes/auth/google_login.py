from .. import request, session, make_response, abort, g, Resource, ValidationError
from models.user import User
from app_setup import api, db
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)
from schemas.user_schema import UserSchema

user_schema = UserSchema(session=db.session)
