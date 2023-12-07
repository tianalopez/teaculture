from . import request, Resource
from models.review import Review
from app_setup import db
from schemas.review_schema import ReviewSchema

review_schema = ReviewSchema(session=db.session)
reviews_schema = ReviewSchema(many=True, session=db.session)


class ReviewById(Resource):
    def get(self, id):
        if review := db.session.get(Review, id):
            review_schema = ReviewSchema()
            return review_schema.dump(review), 200
        return {"error": "Could not find review"}, 404

    def patch(self, id):
        if review := db.session.get(Review, id):
            try:
                data = request.json
                review_schema.validate(data)
                updated_review = review_schema.load(data, instance=review, partial=True)
                db.session.commit()
                return review_schema.dump(updated_review), 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
        return {"error": "Could not find review"}, 404

    def delete(self, id):
        if review := db.session.get(Review, id):
            try:
                db.session.delete(review)
                db.session.commit()
                return {"message": f"Review {id} has been deleted"}, 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
        return {"error": "Could not find review"}
