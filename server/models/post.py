from sqlalchemy.orm import validates
import re
from app_setup import db
from sqlalchemy.ext.associationproxy import association_proxy

# from .user_community import UserCommunity


class Post(db.Model):
    __tablename__ = "posts"

    # Columns for posts Table
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_communities_id = db.Column(db.Integer, db.ForeignKey("user_communities.id"))

    # relationships
    user_communities = db.relationship("UserCommunity", back_populates="post")

    # associations
    user = association_proxy("user_communities", "user")
    community = association_proxy("user_communities", "community")

    # serializations

    # validations
    @validates("title")
    def validate_title(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Title must be a string")
        elif len(value) < 2 or len(value) > 80:
            raise ValueError(f"Title must be between 2 and 80 characters")
        return value

    @validates("content")
    def validate_content(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Content must be a string")
        elif len(value) < 3 or len(value) > 5000:
            raise ValueError(f"Content must be between 3 and 5000 characters")
        return value

    # @validates("user_communities_id")
    # def validate_user_communities_id(self, _, value):
    #     if not isinstance(value, int):
    #         raise TypeError(f"{value} must be an integer")
    #     elif value < 1:
    #         raise ValueError(f"{value} must be a positive integer")
    #     elif not db.session.get(UserCommunity, value):
    #         raise ValueError(f"{value} has to correspond to an existing user_community")
    #     return value

    def __repr__(self):
        return f"<Post #{self.id} {self.title} />"
