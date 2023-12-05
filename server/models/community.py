from sqlalchemy.orm import validates
import re
from app_setup import db
from sqlalchemy.ext.associationproxy import association_proxy
from .user_community import UserCommunity
from .user import User


class Community(db.Model):
    __tablename__ = "communities"

    # Columns for communities Table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))

    # relationships
    user_communities = db.relationship("UserCommunity", back_populates="community", cascade="all, delete-orphan")
    owner = db.relationship("User", back_populates="communities")

    users = db.relationship("User", secondary ="user_communities")
    posts = db.relationship("Post", secondary="user_communities", back_populates="community")

    # associations
    users = association_proxy("user_communities", "user")
    posts = association_proxy("user_communities", "posts")

    # validations
    @validates("name")
    def validate_name(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Name must be a string")
        elif len(value) < 2 or len(value) > 80:
            raise ValueError(f"Name must be between 2 and 80 characters")
        return value

    @validates("description")
    def validate_description(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Description must be a string")
        elif len(value) < 3 or len(value) > 500:
            raise ValueError(f"Description must be between 3 and 500 characters")
        return value

    @validates("owner_id")
    def validate_ownerid(self, _, value):
        if not isinstance(value, int):
            raise TypeError(f"Owner id must be an integer")
        elif value < 1:
            raise ValueError(f"Owner id must be a positive integer")
        elif not db.session.get(User, value):
            raise ValueError(f"Owner id has to correspond to an existing user")
        return value

    def __repr__(self):
        return f"<Community #{self.id} {self.name} />"
