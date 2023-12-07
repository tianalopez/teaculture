from . import request, Resource
from models.post import Post
from schemas.post_schema import PostSchema
from models.user_community import UserCommunity
from app_setup import db

# get method to get all posts within a community
# post method to make a new post within a community

post_schema = PostSchema(session=db.session)
posts_schema = PostSchema(many=True, session=db.session)


class Posts(Resource):
    def get(self, id):
        uc_id = UserCommunity.query.filter_by(community_id=id).first().id
        posts = posts_schema.dump(Post.query.filter_by(user_communities_id=uc_id))
        return posts, 200

    def post(self, id):
        if uc_id := UserCommunity.query.filter_by(community_id=id).first().id:
            try:
                data = request.json
                post_schema.validate(data)
                data["user_communities_id"] = uc_id
                new_post = post_schema.load(data)
                db.session.add(new_post)
                db.session.commit()
                serialized_post = post_schema.dump(new_post)
                return serialized_post, 201
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
        return {"error": "Community not found"}
