#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from app_setup import app, api

# Route Imports
from routes.check_session import CheckSession
from routes.communities import Communities
from routes.community_by_id import CommunityById
from routes.login import Login
from routes.logout import Logout
from routes.post_by_id import PostById
from routes.posts import Posts
from routes.recipe_by_id import RecipeById
from routes.recipes import Recipe
from routes.register import Register
from routes.review import Review
from routes.user_by_id import UserById
from routes.user_communities import UserCommunities
from routes.user_community_by_id import UserCommunityById
from routes.users import Users

# Add Resources
api.add_resource(CheckSession, "/checksession")
api.add_resource(Communities, "/communities")
api.add_resource(CommunityById, "/communities/<int:id>")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(PostById, "/posts/<int:id>")
api.add_resource(Posts, "/communities/<int:id>/posts")
api.add_resource(RecipeById, "/recipes/<int:id>")
api.add_resource(Recipe, "/recipes")
api.add_resource(Register, "/register")
api.add_resource(Review, "/reviews")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(UserCommunities, "/usercommunities")
api.add_resource(UserCommunityById, "usercommunities/<int:id>")
api.add_resource(Users, "/users")

# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
