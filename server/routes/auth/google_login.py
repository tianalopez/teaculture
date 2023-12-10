from .. import request, session, make_response, abort, g, Resource, ValidationError
import os
from models.user import User
from app_setup import api, db
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)
from schemas.user_schema import UserSchema
from google.auth.transport import requests
from google.oauth2 import id_token

user_schema = UserSchema(session=db.session)
CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")


class GLogin(Resource):
    def post(self):
        try:
            # get data from google id_token that was sent back
            token = request.json
            if not token:
                return {'error': 'Missing ID token'}, 400
            # verify and get information about the token
            id_info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

            # query data by user email
            user = User.query.filter_by(email=id_info.get("email")).first()
            # if the user exists/don't need to authenticate since this is google
            if user:
                #!jwt code
                jwt = create_access_token(identity=user.id)
                #!create a refresh token
                refresh_token = create_refresh_token(identity=user.id)
                # serialize the user
                serialized_user = user_schema.dump(user)
                # prepackage the response
                response = make_response(serialized_user, 200)
                #!set cookies on both tokens
                set_access_cookies(response, jwt)
                set_refresh_cookies(response, refresh_token)
                return response
            return {"error": "Invalid Credentials"}, 401
        except Exception as e:
            return {"error": str(e)}, 401
