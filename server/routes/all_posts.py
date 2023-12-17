from . import request, Resource
from models.post import Post
from schemas.post_schema import PostSchema
from models.user_community import UserCommunity
from app_setup import db

# get method to get all posts within a community
# post method to make a new post within a community

post_schema = PostSchema(session=db.session)
posts_schema = PostSchema(many=True, session=db.session)


class AllPosts(Resource):
    def get(self):
        posts = posts_schema.dump(Post.query)
        return posts, 200
