from . import request, Resource
from models.post import Post
from schemas.post_schema import PostSchema
from models.user_community import UserCommunity
from app_setup import db

post_schema = PostSchema(session=db.session)
posts_schema = PostSchema(many=True, session=db.session)


class Posts(Resource):
    def get(self):
      posts = posts_schema.dump(Post.query)
      return posts, 200

    def post(self):
      try:
        data = request.json
        post_schema.validate(data)
        new_post = post_schema.load(data)
        db.session.add(new_post)
        db.session.commit()
        serialized_post = post_schema.dump(new_post)
        return serialized_post, 201
      except Exception as e:
        db.session.rollback()
        return {'error': str(e)}, 400
