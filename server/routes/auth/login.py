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


class Login(Resource):
    def post(self):
        try:
            # get email and password
            data = request.json
            # query db by user email
            user = User.query.filter_by(email=data.get("email")).first()
            # if user exists and authenticate
            if user and user.authenticate(data.get("password")):
                #!jwt code
                jwt = create_access_token(identity=user.id)
                #!create a refresh token
                refresh_token = create_refresh_token(identity=user.id)
                #serialize the user
                serialized_user = user_schema.dump(user)
                #prepackage the response
                response = make_response(serialized_user, 200)
                #!set cookies on both tokens
                set_access_cookies(response, jwt)
                set_refresh_cookies(response, refresh_token)
                return response
            return {"error": "Invalid Credentials"}, 403
        except Exception as e:
            return {"error": "Invalid Credentials"}, 403
