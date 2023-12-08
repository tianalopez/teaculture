from . import request, session, make_response, abort, g, Resource, ValidationError
from models.user import User
from app_setup import api, db


class Logout(Resource):
    def delete(self):
        # if there is a user in session
        if session.get("user_id"):
            # remove user in session
            del session["user_id"]
            return {}, 204
        return {"error": "Unauthorized"}, 401
