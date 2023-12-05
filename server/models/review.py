from sqlalchemy.orm import validates
import re
from app_setup import db


class Review(db.Model):
    __tablename__ = "reviews"

    # Columns for user_communities Table
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))

    # relationships
    user = db.relationship("User", back_populates="reviews")
    recipe = db.relationship("Recipe", back_populates="reviews")

    # validations
    @validates("rating")
    def validate_rating(self, _, value):
        if not isinstance(int, value):
            raise TypeError("Rating must be an integer")
        elif value < 1 or value > 5:
            raise ValueError("Rating must be between 1 and 5")
        return value

    @validates("comment")
    def validate_comment(self, _, value):
        if not isinstance(str, value):
            raise TypeError("Comment must be a string")
        elif len(value) < 3 or len(value) > 300:
            raise ValueError("Comment must be between 3 and 300 characters")
        return value

    def __repr__(self):
        return f"<Review #{self.id} />"
