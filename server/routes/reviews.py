from . import request, Resource
from models.review import Review
from schemas.review_schema import ReviewSchema
from app_setup import db

reviews_schema = ReviewSchema(many=True, session=db.session)
review_schema = ReviewSchema(session=db.session)


class Reviews(Resource):
    def get(self, recipe_id):
        reviews = Review.query.filter_by(recipe_id=recipe_id).all()
        result = reviews_schema.dump(reviews)
        return result, 200

    def post(self, recipe_id):
        try:
            data = request.json
            review_schema.validate(data)
            new_review = review_schema.load(data)
            db.session.add(new_review)
            db.session.commit()
            serialized_review = review_schema.dump(new_review)
            return serialized_review, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400
