from . import request, Resource
from models.user_community import UserCommunity
from schemas.user_community_schema import UserCommunitySchema
from app_setup import db

user_communities_schema = UserCommunitySchema(many=True, session=db.session)
user_community_schema = UserCommunitySchema(session=db.session)

class UserCommunityById(Resource):
    def get(self, id):
        if user_community:= db.session.get(UserCommunity, id):
            user_community_schema = UserCommunitySchema()
            return user_community_schema.dump(user_community), 200
        return {'error', "Could not find User Community"}, 404

    def delete(self, id):
        if user_community:= db.session.get(UserCommunity, id):
            try:
                db.session.delete(user_community)
                db.session.commit()
                return {'message': f'User Community {id} has been deleted'}, 200
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'Cound not find User Community'}, 404
