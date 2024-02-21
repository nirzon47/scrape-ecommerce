import json
from faker import Faker
import random

fake = Faker()

products = []

# Generate 100 products
for _ in range(100):
    product = {
        "product_name": fake.word() + " " + fake.word(),
        "price": round(random.uniform(10.0, 100.0), 2),
        "availability": random.choice(["In Stock", "Out of Stock"]),
        "product_rating": round(random.uniform(1.0, 5.0), 1) if random.choice([True, False]) else None,
    }
    products.append(product)

# Save products to JSON file
with open("data.json", "w") as file:
    json.dump(products, file, indent=2)

print("JSON file created successfully: product_data.json")
