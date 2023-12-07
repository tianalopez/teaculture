from sqlalchemy.orm import validates
import re
from models.user import User
from app_setup import db
from sqlalchemy.ext.associationproxy import association_proxy


class Recipe(db.Model):
    __tablename__ = "recipes"

    # Columns for recipes table
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    instructions = db.Column(db.String)
    tags = db.Column(db.String)
    ingredients = db.Column(db.String)
    medicinal = db.Column(db.Boolean)
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    creator = db.relationship("User", back_populates="owned_recipes")
    reviews = db.relationship(
        "Review", back_populates="recipe", cascade="all, delete-orphan"
    )
    # associations
    reviewers = association_proxy("reviews", "user")

    # validations
    @validates("title")
    def validate_title(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Title must be a string")
        elif len(value) < 2 or len(value) > 80:
            raise ValueError(f"Title must be between 2 and 80 characters")
        return value

    @validates("instructions")
    def validate_instructions(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Instructions must be a string")
        elif len(value) < 3 or len(value) > 5000:
            raise ValueError(f"Instructions must be between 3 and 5000 characters")
        return value

    @validates("tags")
    def validate_tags(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Tags must be a string")
        elif len(value) < 1:
            raise ValueError("Tags must be longer than one character")
        return value

    @validates("ingredients")
    def validate_ingredients(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Ingredients must be a string")
        elif len(value) < 1:
            raise ValueError("Ingredients must be longer than one character")
        return value

    @validates("creator_id")
    def validate_creator_id(self, _, value):
        if not isinstance(value, int):
            raise TypeError(f"Creator id must be an integer")
        elif value < 1:
            raise ValueError(f"Creator id must be a positive integer")
        elif not db.session.get(User, value):
            raise ValueError(f"Creator id has to correspond to an existing user")
        return value

    def __repr__(self):
        return (
            f"<Recipe #{self.id} {self.title} {self.instructions} {self.medicinal} />"
        )
