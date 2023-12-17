from sqlalchemy.orm import validates
import re
from app_setup import db


class Favorite(db.Model):
    __tablename__ = "favorites"

    # Columns for favorites Table
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # relationships
    user = db.relationship("User", back_populates="favorites")
    recipe = db.relationship("Recipe", back_populates="favorites")

    def __repr__(self):
        return f"<Favorite #{self.id, self.user_id, self.recipe_id} />"
