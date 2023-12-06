from . import request, Resource
from models.review import Review
from schemas.review_schema import ReviewSchema
from app_setup import db

reviews_schema = ReviewSchema(many=True, session=db.session)
review_schema = ReviewSchema(session=db.session)


class Reviews(Resource):
    def get(self):
        reviews = reviews_schema.dump(Review.query)
        return reviews, 200

    def post(self):
        try:
            data = request.json
            reviews_schema.validate(data)
            new_review = reviews_schema.load(data)
            db.session.add(new_review)
            db.session.commit()
            serialized_review = reviews_schema.dump(new_review)
            return serialized_review, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400
