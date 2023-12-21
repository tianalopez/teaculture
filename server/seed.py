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
        Favorite.query.delete()
        Review.query.delete()
        Recipe.query.delete()
        Post.query.delete()
        UserCommunity.query.delete()
        Community.query.delete()
        User.query.delete()

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

        db.session.add_all(users)
        db.session.commit()

        print("Seeding user_communities...")
        communities = [
            Community(
                name="Coffee Corner",
                description="Join this community to talk all things coffee! If you love having coffee, and I don't mean just in the morning, then this is the perfect place for you!",

            ),
            Community(
                name="Health Teas",
                description="Let's discuss teas that can help improve our mental and physical health.",

            ),
            # Add more communities with names and descriptions as needed
            Community(
                name="Tea Blends",
                description="Explore unique tea blends and share your favorite recipes with fellow enthusiasts.",

            ),
            Community(
                name="Culinary Tea",
                description="For those who appreciate the culinary aspect of tea—share and discover delicious tea-infused recipes!",

            ),
            Community(
                name="Green Tea Lovers",
                description="A space dedicated to the wonders of green tea and its health benefits.",

            ),
            Community(
                name="Chai Enthusiasts",
                description="Join fellow chai lovers in celebrating the rich and aromatic world of chai tea.",

            ),
            Community(
                name="Herbal Infusions",
                description="Explore the world of herbal infusions and their natural remedies for a healthier lifestyle.",

            ),
            Community(
                name="Tea and Wellness",
                description="Discover teas that contribute to overall wellness and mindfulness practices.",

            ),
            Community(
                name="Tea Tasting Club",
                description="A community for tea connoisseurs to share tasting notes and recommendations.",

            ),
            Community(
                name="Tea Artistry",
                description="Explore the art of tea preparation and presentation with fellow tea artists.",

            ),
        ]
        for community in communities:
            community.owner_id = random.choice(users).id

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

        recipes.append(
            Recipe(
                title="Goji Berry & Red Date Tea",
                instructions="Rinse the goji berries and red dates under cool water. Combine the goji berries and red dates in a pot with water. Bring the water to a boil, then let simmer for an hour. You can add sugar if you would prefer this drink to be sweet. Enjoy this herbal tea hot or cold!",
                ingredients="8 dried Chinese red dates;1/2 cup dried goji berries;water",
                medicinal=True,
                tags="herbal",
                creator_id=random.choice(users).id,
                image=random.choice(randomImage),
            )
        )
        recipes.append(
            Recipe(
                title="Matcha Latte",
                instructions="Sift the matcha powder into your matcha bowl. Add around 2 tbs of hot water and whisk until there are no clumps and there are small bubbles at the top. Add sugar and whisk again until there are no clumps. Add ice and milk into a cup. Pour the frothed matcha into the cup and enjoy!",
                ingredients="1 tsp matcha;hot water;sugar (to taste);milk",
                medicinal=False,
                tags="creamy,caffeine",
                creator_id=random.choice(users).id,
                image=random.choice(randomImage),
            )
        )

        # Additional Realistic Recipes
        recipes.append(
            Recipe(
                title="Lemon Ginger Infusion",
                instructions="Slice fresh ginger and lemon. Steep them in hot water for a refreshing and immune-boosting tea. Add honey if desired.",
                ingredients="fresh ginger;lemon;hot water;honey (optional)",
                medicinal=True,
                tags="citrusy,herbal",
                creator_id=random.choice(users).id,
                image=random.choice(randomImage),
            )
        )

        recipes.append(
            Recipe(
                title="Turmeric Golden Milk",
                instructions="Mix turmeric, cinnamon, and ginger into warm milk. Sweeten with honey for a comforting and anti-inflammatory beverage.",
                ingredients="turmeric;cinnamon;ginger;warm milk;honey",
                medicinal=True,
                tags="spiced",
                creator_id=random.choice(users).id,
                image=random.choice(randomImage),
            )
        )

        recipes.append(
            Recipe(
                title="Iced Hibiscus Tea",
                instructions="Brew hibiscus tea and let it cool. Serve over ice with a slice of orange for a refreshing summer drink.",
                ingredients="hibiscus tea;ice;orange slice",
                medicinal=False,
                tags="citrusy",
                creator_id=random.choice(users).id,
                image=random.choice(randomImage),
            )
        )

        recipes.append(
            Recipe(
                title="Mango Mint Green Tea",
                instructions="Brew green tea and add fresh mango slices and mint leaves. Chill in the fridge for a fruity and cooling beverage.",
                ingredients="green tea;mango slices;mint leaves",
                medicinal=False,
                tags="fruity,herbal",
                creator_id=random.choice(users).id,
                image=random.choice(randomImage),
            )
        )

        recipes.append(
            Recipe(
                title="Spicy Chai Latte",
                instructions="Prepare chai tea with black tea, spices, and milk. Add a pinch of cayenne pepper for a spicy kick.",
                ingredients="black tea;spices (cinnamon,cardamom,cloves);milk;cayenne pepper",
                medicinal=False,
                tags="spiced,creamy",
                creator_id=random.choice(users).id,
                image=random.choice(randomImage),
            )
        )

        recipes.append(
            Recipe(
                title="Blueberry Lavender Lemonade",
                instructions="Make a lavender-infused simple syrup. Mix with fresh blueberry puree and lemon juice. Serve over ice for a delightful summer drink.",
                ingredients="lavender;blueberries;lemon juice;sugar;water;ice",
                medicinal=False,
                tags="fruity,floral",
                creator_id=random.choice(users).id,
                image=random.choice(randomImage),
            )
        )

        recipes.append(
            Recipe(
                title="Pineapple Mint Sparkler",
                instructions="Blend fresh pineapple with mint leaves. Mix with sparkling water and ice for a tropical and fizzy mocktail.",
                ingredients="pineapple;mint leaves;sparkling water;ice",
                medicinal=False,
                tags="fruity,herbal",
                creator_id=random.choice(users).id,
                image=random.choice(randomImage),
            )
        )

        recipes.append(
            Recipe(
                title="Chamomile Honey Vanilla Latte",
                instructions="Brew chamomile tea and mix with warm milk, honey, and a dash of vanilla extract. Perfect for a cozy evening.",
                ingredients="chamomile tea;warm milk;honey;vanilla extract",
                medicinal=True,
                tags="creamy,floral",
                creator_id=random.choice(users).id,
                image=random.choice(randomImage),
            )
        )

        db.session.add_all(recipes)
        db.session.commit()

        print("Seeding reviews...")
        reviews = []

        # Realistic Medicinal Recipe Reviews
        reviews.append(
            Review(
                rating=4,
                comment="This goji berry & red date tea is a hidden gem! The natural sweetness of the red dates is perfect.",
                user_id=random.choice(users).id,
                recipe_id=recipes[0].id,
            )
        )

        reviews.append(
            Review(
                rating=3,
                comment="Goji berry & red date tea didn't meet my expectations. The taste was somewhat bland, but maybe I need to add more sugar.",
                user_id=random.choice(users).id,
                recipe_id=recipes[0].id,
            )
        )

        # Fun Drink Recipe Reviews
        reviews.append(
            Review(
                rating=5,
                comment="Matcha latte is a matcha made in heaven! Creamy, rich, and simply delightful.",
                user_id=random.choice(users).id,
                recipe_id=recipes[1].id,
            )
        )

        reviews.append(
            Review(
                rating=3,
                comment="The matcha latte was interesting, but I found the flavor a bit too intense for my liking.",
                user_id=random.choice(users).id,
                recipe_id=recipes[1].id,
            )
        )

        # Additional Realistic Recipe Reviews
        reviews.append(
            Review(
                rating=4,
                comment="Lemon ginger infusion is a refreshing pick-me-up! The ginger adds a lovely kick to it.",
                user_id=random.choice(users).id,
                recipe_id=recipes[2].id,
            )
        )

        reviews.append(
            Review(
                rating=2,
                comment="Lemon ginger infusion was too gingery for me. Not my cup of tea.",
                user_id=random.choice(users).id,
                recipe_id=recipes[2].id,
            )
        )

        reviews.append(
            Review(
                rating=5,
                comment="Turmeric golden milk is liquid gold! A comforting and delicious beverage.",
                user_id=random.choice(users).id,
                recipe_id=recipes[3].id,
            )
        )

        reviews.append(
            Review(
                rating=4,
                comment="Turmeric golden milk was good, the spices were great.",
                user_id=random.choice(users).id,
                recipe_id=recipes[3].id,
            )
        )

        reviews.append(
            Review(
                rating=4,
                comment="Hibiscus tea is a burst of summer in a cup! The orange slice is a brilliant addition.",
                user_id=random.choice(users).id,
                recipe_id=recipes[4].id,
            )
        )

        reviews.append(
            Review(
                rating=2,
                comment="Hibiscus tea was too sour for my taste buds. Didn't enjoy it much.",
                user_id=random.choice(users).id,
                recipe_id=recipes[4].id,
            )
        )

        reviews.append(
            Review(
                rating=5,
                comment="Mango mint green tea is a tropical paradise in a glass! So fruity and refreshing.",
                user_id=random.choice(users).id,
                recipe_id=recipes[5].id,
            )
        )

        reviews.append(
            Review(
                rating=3,
                comment="Mango mint green tea had an unusual taste. Couldn't quite get used to it.",
                user_id=random.choice(users).id,
                recipe_id=recipes[5].id,
            )
        )

        reviews.append(
            Review(
                rating=5,
                comment="Spicy chai latte is a spicy symphony with a creamy finish. Truly satisfying.",
                user_id=random.choice(users).id,
                recipe_id=recipes[6].id,
            )
        )

        reviews.append(
            Review(
                rating=5,
                comment="Blueberry lavender lemonade is a delightful concoction! The lavender adds a unique floral note.",
                user_id=random.choice(users).id,
                recipe_id=recipes[7].id,
            )
        )

        reviews.append(
            Review(
                rating=5,
                comment="Chamomile honey vanilla latte is a warm hug in a cup. Perfect blend of flavors!",
                user_id=random.choice(users).id,
                recipe_id=recipes[9].id,
            )
        )

        # Make some recipes only have negative reviews
        reviews.append(
            Review(
                rating=2,
                comment="Pineapple mint sparkler tasted odd. The combination didn't work for me.",
                user_id=random.choice(users).id,
                recipe_id=recipes[8].id,
            )
        )

        reviews.append(
            Review(
                rating=1,
                comment="Pineapple mint sparkler was a disaster. I couldn't even finish it.",
                user_id=random.choice(users).id,
                recipe_id=recipes[8].id,
            )
        )

        # Add reviews to the database
        db.session.add_all(reviews)
        db.session.commit()

        print("Done seeding!")
