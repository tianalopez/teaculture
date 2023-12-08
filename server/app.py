#!/usr/bin/env python3

# Standard library imports

# Local imports
from app_setup import app, db, ma, api

# Route Imports
from routes.check_session import CheckSession
from routes.communities import Communities
from routes.community_by_id import CommunityById
from server.routes.auth.login import Login
from server.routes.auth.logout import Logout
from routes.post_by_id import PostById
from routes.posts import Posts
from routes.recipe_by_id import RecipeById
from routes.recipes import Recipes
from server.routes.auth.register import Register
from routes.review_by_id import ReviewById
from routes.reviews import Reviews
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
api.add_resource(Recipes, "/recipes")
api.add_resource(Register, "/register")
api.add_resource(ReviewById, "/reviews/<int:id>")
api.add_resource(Reviews, "/reviews")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(UserCommunities, "/usercommunities")
api.add_resource(UserCommunityById, "/usercommunities/<int:id>")
api.add_resource(Users, "/users")

# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
