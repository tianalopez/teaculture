#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random

# Remote library imports
from faker import Faker

# Local imports
from app_setup import app, db
from models.community import Community
from models.post import Post
from models.recipe import Recipe
from models.review import Review
from models.user_community import UserCommunity
from models.user import User
from models.favorite import Favorite

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Seed code goes here!
        print("Clearing db...")
        User.query.delete()
        Community.query.delete()
        Post.query.delete()
        UserCommunity.query.delete()
        Review.query.delete()
        Recipe.query.delete()
        Favorite.query.delete()

        print("Seeding users...")
        users = []
        for i in range(10):
            u = User(
                username=fake.name(),
                email=fake.email(),
                bio=fake.sentence(),
            )
            u.password_hash = "passwordpass"
            users.append(u)
            db.session.add(u)
        db.session.commit()

        print("Seeding user_communities...")
        communities = []
        user_communities = []
        for u in users:
            for i in range(1):
                communities.append(
                    Community(
                        name=fake.catch_phrase(),
                        description=fake.paragraph(nb_sentences=2),
                        owner_id=u.id,
                    )
                )
                user_communities.append(
                    UserCommunity(user_id=u.id, community_id=len(communities))
                )
        db.session.add_all(communities)
        db.session.commit()

        for u in users:
            for i in range(1):
                com = rc(communities)
                user_communities.append(
                    UserCommunity(user_id=u.id, community_id=com.id)
                )
                if len(user_communities) >= 5:
                    break
            if len(user_communities) >= 5:
                break
        db.session.add_all(user_communities)
        db.session.commit()

        print("Seeding posts...")
        posts = []
        for u in user_communities:
            for i in range(1):
                uc = rc(user_communities)
                user = rc(users)
                posts.append(
                    Post(
                        author_id=user.id,
                        content=fake.paragraph(nb_sentences=3),
                        user_communities_id=uc.id,
                    )
                )
            if len(posts) >= 20:
                break
        db.session.add_all(posts)
        db.session.commit()

        print("Seeding recipes...")
        tags_options = ["creamy", "caffeine", "citrusy", "herbal", "spiced"]
        recipes = []
        randomImage = [
            "/images/img1.jpg",
            "/images/img2.jpg",
            "/images/img3.jpg",
            "/images/img4.jpg",
            "/images/img5.jpg",
            "/images/img6.jpg",
        ]
        for u in users:
            for i in range(1):
                selected_tags = random.sample(tags_options, 2)
                recipes.append(
                    Recipe(
                        title=fake.catch_phrase(),
                        instructions=fake.paragraph(nb_sentences=7),
                        tags=",".join(selected_tags),
                        ingredients=",".join(fake.words(nb=3)),
                        medicinal=fake.random_element(elements=(True, False)),
                        image=random.choice(randomImage),
                        creator_id=u.id,
                    )
                )
        db.session.add_all(recipes)
        db.session.commit()

        print("Seeding reviews...")
        reviews = []
        for u in users:
            for r in recipes:
                for i in range(1):
                    reviews.append(
                        Review(
                            rating=fake.random_int(min=1, max=5),
                            comment=fake.paragraph(nb_sentences=2),
                            user_id=u.id,
                            recipe_id=r.id,
                        )
                    )
                    if len(reviews) >= 10:
                        break
            if len(reviews) >= 10:
                break
        db.session.add_all(reviews)
        db.session.commit()

        print("Done seeding!")
