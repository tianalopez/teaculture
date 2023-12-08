from .. import request, session, Resource
from flask import jsonify
from schemas.user_schema import UserSchema
from app_setup import db
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)

user_schema = UserSchema(session=db.session)


class Register(Resource):
    def post(self):
        try:
            # Get user input data
            data = {
                "username": request.json.get("username"),
                "email": request.json.get("email"),
            }
            # Validate user information
            user_schema.validate(data)
            # Create new user schema
            new_user = user_schema.load(data)
            # Hash password
            new_user.password_hash = request.json.get("password")
            db.session.add(new_user)
            db.session.commit()
            #!jwt code
            jwt = create_access_token(identity=new_user.id)
            #!set a refresh token
            refresh_token = create_refresh_token(identity=new_user.id)
            # serialize user
            serialized_user = user_schema.dump(new_user)
            import ipdb

            ipdb.set_trace()
            # prepackage the response
            response = jsonify(serialized_user)
            # set both cookies
            set_access_cookies(response, jwt)
            set_refresh_cookies(response, refresh_token)
            import ipdb; ipdb.set_trace()
            return serialized_user, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400
