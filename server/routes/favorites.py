from . import request, Resource
from models.favorite import Favorite
from schemas.favorite_schema import FavoriteSchema
from app_setup import db

favorites_schema = FavoriteSchema(many=True, session=db.session)
favorite_schema = FavoriteSchema(session=db.session)


class Favorites(Resource):
    def get(self):
        favorites = favorites_schema.dump(Favorite.query)
        return favorites, 200

    def post(self):
        try:
            data = request.json
            # validate data
            favorite_schema.validate(data)
            # deserialize with load()
            new_favorite = favorite_schema.load(data)
            # add new uc to favorite table
            db.session.add(new_favorite)
            db.session.commit()
            # serialize with dump()
            serialized_favorite = favorite_schema.dump(new_favorite)
            return serialized_favorite, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400
