from . import session, Resource
from models.user import User
from app_setup import db
from schemas.user_schema import UserSchema

user_schema = UserSchema(session=db.session)


class CheckSession(Resource):
    def get(self):
        if "user_id" not in session:
            return {"error": "Unauthorized"}, 403
        if user := db.session.get(User, session["user_id"]):
            return user_schema.dump(user), 200
        return {"error": "Unauthorized"}, 403
