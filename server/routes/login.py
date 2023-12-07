from . import request, session, make_response, abort, g, Resource, ValidationError
from models.user import User
from app_setup import api, db
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
                session["user_id"] = user.id
                return user_schema.dump(user), 200
            return {"error": "Invalid Credentials"}, 403
        except Exception as e:
            return {"error": "Invalid Credentials"}, 403
