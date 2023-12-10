from .. import request, session, Resource, make_response
from models.user import User
from schemas.user_schema import UserSchema
from app_setup import db
from google.auth.transport import requests
from google.oauth2 import id_token
import os
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)

user_schema = UserSchema(session=db.session)
CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")


class GAuth(Resource):
    def post(self):
        try:
            # get data from google id_token
            data = request.json
            # data is sent back as a dictionary
            token = data.get("id_token")
            if not token:
                return {"error": "Missing ID token"}, 400
            # convert from string to bytes
            id_token_bytes = token.encode("utf-8")
            # verify and get information about the token
            id_info = id_token.verify_oauth2_token(
                id_token_bytes, requests.Request(), CLIENT_ID
            )

            # query the data to see if it exists in the database
            user = User.query.filter_by(email=id_info.get("email")).first()
            #!LOGIN
            if user:
                try:
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
                except Exception as e:
                    return {"error": "Invalid Credentials"}, 401
            #!REGISTER
            else:
                try:
                    user_data = {
                        "username": id_info.get("given_name"),
                        "email": id_info.get("email"),
                    }
                    # Validate user information
                    user_schema.validate(user_data)
                    # Create new user schema
                    new_user = user_schema.load(user_data)
                    # Hash password
                    new_user.password_hash = "passwordpass"
                    db.session.add(new_user)
                    db.session.commit()
                    #!jwt code
                    jwt = create_access_token(identity=new_user.id)
                    #!set a refresh token
                    refresh_token = create_refresh_token(identity=new_user.id)
                    # serialize user
                    serialized_user = user_schema.dump(new_user)
                    # prepackage the response
                    response = make_response(serialized_user, 201)
                    # set both cookies
                    set_access_cookies(response, jwt)
                    set_refresh_cookies(response, refresh_token)
                    return response
                except Exception as e:
                    db.session.rollback()
                    return {'error': str(e)}, 400
        except Exception as e:
            return {"error": str(e)}, 400
