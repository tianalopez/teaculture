from . import request, Resource
from models.user_community import UserCommunity
from schemas.user_community_schema import UserCommunitySchema
from app_setup import db

user_communities_schema = UserCommunitySchema(many=True, session=db.session)
user_community_schema = UserCommunitySchema(session=db.session)


class UserCommunities(Resource):
    def get(self):
        user_communities = user_communities_schema.dump(UserCommunity.query)
        return user_communities, 200

    def post(self):
        try:
            data = request.json
            #validate data
            user_communities_schema.validate(data)
            #deserialize with load()
            new_uc = user_communities_schema.load(data)
            #add new uc to uc table
            db.session.add(new_uc)
            db.session.commit()
            #serialize with dump()
            serialized_uc = user_communities_schema.dump(new_uc)
            return serialized_uc, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400
