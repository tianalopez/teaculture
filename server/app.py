#!/usr/bin/env python3

# Standard library imports

# Local imports
from app_setup import app, db, ma, api, jwt
from models.user import User
from flask import render_template

# Route Imports
# from routes.check_session import CheckSession
from routes.communities import Communities
from routes.community_by_id import CommunityById
from routes.post_by_id import PostById
from routes.posts import Posts
from routes.all_posts import AllPosts
from routes.recipe_by_id import RecipeById
from routes.recipes import Recipes
from routes.review_by_id import ReviewById
from routes.reviews import Reviews
from routes.all_reviews import AllReviews
from routes.user_by_id import UserById
from routes.user_communities import UserCommunities
from routes.user_community_by_id import UserCommunityById
from routes.users import Users
from routes.favorites import Favorites
from routes.favorite_by_id import FavoriteById

# auth routes
from routes.auth.register import Register
from routes.auth.login import Login
from routes.auth.google_auth import GAuth
from routes.auth.logout import Logout
from routes.auth.current_user import CurrentUser
from routes.auth.refresh import Refresh

# Add Resources
# api.add_resource(CheckSession, "/checksession")
api.add_resource(Communities, "/communities")
api.add_resource(CommunityById, "/communities/<int:id>")
api.add_resource(PostById, "/posts/<int:id>")
api.add_resource(Posts, "/communities/<int:id>/posts")
api.add_resource(AllPosts, "/posts")
api.add_resource(RecipeById, "/recipes/<int:id>")
api.add_resource(Recipes, "/recipes")
api.add_resource(ReviewById, "/reviews/<int:id>")
api.add_resource(AllReviews, "/reviews")
api.add_resource(Reviews, "/reviews/journal<int:recipe_id>")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(UserCommunities, "/usercommunities")
api.add_resource(UserCommunityById, "/usercommunities/<int:user_id>/<int:community_id>")
api.add_resource(Users, "/users")
api.add_resource(Favorites, "/favorites")
api.add_resource(FavoriteById, "/favorites/<int:user_id>/<int:recipe_id>")
# Auth Resources
api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(GAuth, "/googleauth")
api.add_resource(Logout, "/logout")
api.add_resource(CurrentUser, "/current-user")
api.add_resource(Refresh, "/refresh")

# Views go here!


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return db.session.get(User, identity)


@app.route("/")
@app.route("/login")
@app.route("/drinklab")
@app.route("/drinklab/<int:id>")
@app.route("/users/<int:id>/dashboard")
@app.route("/users/<int:id>/addrecipe")
@app.route("/siphub")
@app.route("/siphub/<int:id>")
@app.route("/users/:id/profile")
def index(id=0):
    return render_template("index.html")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
