from .. import request, session, Resource, make_response
from flask import jsonify
from schemas.user_schema import UserSchema
from app_setup import db
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)
from google.auth.transport import requests
from google.oauth2 import id_token
import os

user_schema = UserSchema(session=db.session)
CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")


class Register(Resource):
    def post(self):
        try:
            # get data from google id_token
            token = request.json
            if not token:
                return {"error": "Missing ID token"}, 400
            id_info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            # Get user input data
            data = {
                "username": id_info.get("name"),
                "email": id_info.get("email"),
            }
            # Validate user information
            user_schema.validate(data)
            # Create new user schema
            new_user = user_schema.load(data)
            # Hash password
            new_user.password_hash = 'passwordpass'
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
            return {"error": str(e)}, 400
