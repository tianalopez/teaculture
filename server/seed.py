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
        users = [
            User(
                username="john_doe",
                email="john@example.com",
                bio="Passionate about cooking and sharing delicious recipes with the community.",
            ),
            User(
                username="sara_smith",
                email="sara@example.com",
                bio="Food enthusiast exploring the world of flavors and culinary delights.",
            ),
            User(
                username="david_chef",
                email="david@example.com",
                bio="Professional chef with a love for experimenting with unique ingredients.",
            ),
            User(
                username="olivia_gastronome",
                email="olivia@example.com",
                bio="Gastronome on a mission to discover and savor the best dishes around the globe.",
            ),
            User(
                username="michael_homecook",
                email="michael@example.com",
                bio="Home cook sharing family recipes and tips for creating delicious meals at home.",
            ),
            User(
                username="emily_foodblogger",
                email="emily@example.com",
                bio="Food blogger documenting culinary adventures and sharing tried-and-true recipes.",
            ),
            User(
                username="ryan_culinaryartist",
                email="ryan@example.com",
                bio="Culinary artist specializing in creating visually stunning and delectable dishes.",
            ),
            User(
                username="lily_veganchef",
                email="lily@example.com",
                bio="Passionate vegan chef promoting plant-based living through flavorful and sustainable cooking.",
            ),
            User(
                username="peter_bbqenthusiast",
                email="peter@example.com",
                bio="BBQ enthusiast mastering the art of grilling and smoking to perfection.",
            ),
            User(
                username="natalie_sweettooth",
                email="natalie@example.com",
                bio="Dessert lover with a sweet tooth, indulging in the world of pastries and confections.",
            ),
        ]
        for user in users:
            user.password_hash = "passwordpass"
            db.session.add(user)

        db.session.commit()

        print("Seeding user_communities...")
        communities = [
            Community(
                name="Coffee Corner",
                description="Join this community to talk all things coffee! If you love having coffee, and I don't mean just in the morning, then this is the perfect place for you!",
                owner_id=1,
            ),
            Community(
                name="Health Teas",
                description="Let's discuss teas that can help improve our mental and physical health.",
                owner_id=2,
            ),
            # Add more communities with names and descriptions as needed
            Community(
                name="Tea Blends",
                description="Explore unique tea blends and share your favorite recipes with fellow enthusiasts.",
                owner_id=1,
            ),
            Community(
                name="Culinary Tea",
                description="For those who appreciate the culinary aspect of tea—share and discover delicious tea-infused recipes!",
                owner_id=2,
            ),
            Community(
                name="Green Tea Lovers",
                description="A space dedicated to the wonders of green tea and its health benefits.",
                owner_id=5,
            ),
            Community(
                name="Chai Enthusiasts",
                description="Join fellow chai lovers in celebrating the rich and aromatic world of chai tea.",
                owner_id=6,
            ),
            Community(
                name="Herbal Infusions",
                description="Explore the world of herbal infusions and their natural remedies for a healthier lifestyle.",
                owner_id=7,
            ),
            Community(
                name="Tea and Wellness",
                description="Discover teas that contribute to overall wellness and mindfulness practices.",
                owner_id=8,
            ),
            Community(
                name="Tea Tasting Club",
                description="A community for tea connoisseurs to share tasting notes and recommendations.",
                owner_id=9,
            ),
            Community(
                name="Tea Artistry",
                description="Explore the art of tea preparation and presentation with fellow tea artists.",
                owner_id=9,
            ),
        ]

        db.session.add_all(communities)
        db.session.commit()

        user_communities = []
        for u in users:
            # Determine the number of communities the user will join (1 to 3)
            num_communities_to_join = randint(1, 3)
            for i in range(num_communities_to_join):
                com = rc(communities)
                # Ensure the owner doesn't join their own community
                while com.owner_id == u.id:
                    com = rc(communities)
                user_communities.append(
                    UserCommunity(user_id=u.id, community_id=com.id)
                )
        db.session.add_all(user_communities)
        db.session.commit()

        print("Seeding posts...")
        posts = []

        for uc in user_communities:
            # Greetings
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content=f"Hi! I'm excited to join the {uc.community.name} community! I look forward to connecting with everyone!",
                    user_communities_id=uc.id,
                )
            )

        # Additional topic-related posts
        if uc.community.name == "Tea Blends":
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="I recently tried a new tea blend with chamomile and lavender. It was so soothing! Has anyone else experimented with calming blends?",
                    user_communities_id=uc.id,
                )
            )
        elif uc.community.name == "Herbal Infusions":
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="Looking for recommendations on the best green tea brands. Any favorites?",
                    user_communities_id=uc.id,
                )
            )
        elif uc.community.name == "Tea Tasting Club":
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="Has anyone attended a tea tasting event? Share your experiences!",
                    user_communities_id=uc.id,
                )
            )
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="I'm located near Chicago. Does anyone know of any good tea shops in the area? Ideally would like to sample some tea before trying",
                    user_communities_id=uc.id,
                )
            )
        elif uc.community.name == "Tea and Wellness":
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="I'm on a mission to reduce my caffeine intake. What are your favorite caffeine-free teas?",
                    user_communities_id=uc.id,
                )
            )
        elif uc.community.name == "Culinary Tea":
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="Curious about the health benefits of matcha. Any insights or personal experiences?",
                    user_communities_id=uc.id,
                )
            )
        elif uc.community.name == "Tea Artistry":
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="Let's talk about unique tea accessories! What's your must-have tea gadget?",
                    user_communities_id=uc.id,
                )
            )
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="Share your favorite tea-infused recipes for desserts. I'm in the mood for something sweet!",
                    user_communities_id=uc.id,
                )
            )
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="Has anyone tried their hand at latte art? I'd love some inspiration!",
                    user_communities_id=uc.id,
                )
            )
        elif uc.community.name == "Green Tea Lovers":
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="Looking for advice on growing my own tea herbs at home. Any green thumbs in the community?",
                    user_communities_id=uc.id,
                )
            )
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="Anyone know the difference between matcha, sencha, and hojicha? Is it something to do with when the leaf was picked?",
                    user_communities_id=uc.id,
                )
            )
        elif uc.community.name == "Coffee Corner":
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="Greetings, Coffee Corner! As a coffee lover, I'm thrilled to be part of this community.",
                    user_communities_id=uc.id,
                )
            )
            posts.append(
                Post(
                    author_id=uc.user.id,
                    content="Alright, let's discuss a major debate. Black coffee or coffee with milk? Am I starting a war?",
                    user_communities_id=uc.id,
                )
            )

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
