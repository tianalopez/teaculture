from . import request, Resource
from models.user_community import UserCommunity
from schemas.user_community_schema import UserCommunitySchema
from app_setup import db

user_communities_schema = UserCommunitySchema(many=True, session=db.session)


class UserCommunities(Resource):
    def get(self):
        user_communities = user_communities_schema.dump(UserCommunity.query)
        return user_communities, 200
