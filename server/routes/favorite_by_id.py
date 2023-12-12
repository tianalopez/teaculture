from . import request, Resource
from models.favorite import Favorite
from app_setup import db
from schemas.favorite_schema import FavoriteSchema

favorite_schema = FavoriteSchema(session=db.session)
favorites_schema = FavoriteSchema(many=True, session=db.session)


class FavoriteById(Resource):
    def get(self, user_id, recipe_id):
        if (
            favorite := db.session.get(Favorite)
            .filter_by(user_id=user_id, recipe_id=recipe_id)
            .first()
        ):
            favorite_schema = FavoriteSchema()
            return favorite_schema.dump(favorite), 200
        return {"error": "Could not find favorite relationship"}, 404

    def patch(self, user_id, recipe_id):
        if (
            favorite := db.session.get(Favorite)
            .filter_by(user_id=user_id, recipe_id=recipe_id)
            .first()
        ):
            try:
                data = request.json
                favorite_schema.validate(data)
                updated_favorite = favorite_schema.load(
                    data, instance=favorite, partial=True
                )
                db.session.commit()
                return favorite_schema.dump(updated_favorite), 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
        return {"error": "Could not find favorite"}, 404

    # delete specifically with user_id and recipe_id
    def delete(self, user_id, recipe_id):
        if (
            favorite := db.session.get(Favorite)
            .filter_by(user_id=user_id, recipe_id=recipe_id)
            .first()
        ):
            try:
                db.session.delete(favorite)
                db.session.commit()
                return {"message": f"Favorite {id} has been deleted"}, 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
        return {"error": "Could not find favorite"}
