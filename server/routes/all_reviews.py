from . import request, Resource
from models.review import Review
from schemas.review_schema import ReviewSchema
from app_setup import db

reviews_schema = ReviewSchema(many=True, session=db.session)
review_schema = ReviewSchema(session=db.session)


class AllReviews(Resource):
    def get(self):
        reviews = reviews_schema.dump(Review.query)
        return reviews, 200
