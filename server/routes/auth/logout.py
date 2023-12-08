from .. import request, session, make_response, abort, g, Resource, ValidationError
from models.user import User
from app_setup import api, db
from flask_jwt_extended import (
    unset_access_cookies,
    unset_refresh_cookies
)


class Logout(Resource):
    def delete(self):
        response = make_response({'message': "User has been successfully logged out"}, 204)
        unset_access_cookies(response)
        unset_refresh_cookies(response)
        return response
