import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Set a seed for reproducibility
np.random.seed(42)

# Generate dates for 2 years
start_date = datetime(2023, 1, 1)
end_date = datetime(2024, 12, 31)
dates = [start_date + timedelta(days=x) for x in range((end_date - start_date).days + 1)]

# Simulate product categories and subcategories
product_categories = ['Technology', 'Office Supplies', 'Furniture']
product_subcategories = {
    'Technology': ['Phones', 'Accessories', 'Machines'],
    'Office Supplies': ['Paper', 'Pens', 'Storage'],
    'Furniture': ['Chairs', 'Tables', 'Bookcases']
}

# Simulate regions and states
regions = ['East', 'West', 'Central', 'South']
states = {
    'East': ['New York', 'Pennsylvania', 'Massachusetts'],
    'West': ['California', 'Washington', 'Arizona'],
    'Central': ['Illinois', 'Texas', 'Michigan'],
    'South': ['Florida', 'North Carolina', 'Georgia']
}

data = []
for date in dates:
    num_sales = np.random.randint(1, 10)  # Simulate 1 to 10 sales per day
    for _ in range(num_sales):
        category = np.random.choice(product_categories)
        subcategory = np.random.choice(product_subcategories[category])
        product_name = f'{category} {subcategory} Product {np.random.randint(1, 100)}'
        region = np.random.choice(regions)
        state = np.random.choice(states[region])
        sales = np.random.uniform(10, 1000)  # Simulate sales amount

        # Introduce a sales drop in Q2 2024
        if date.year == 2024 and date.month in [4, 5, 6]:
            sales *= np.random.uniform(0.5, 0.8)  # Reduce sales by 20-50%

        data.append({
            'order_date': date.strftime('%Y-%m-%d'),
            'product_category': category,
            'product_subcategory': subcategory,
            'product_name': product_name,
            'region': region,
            'state': state,
            'sales': sales
        })

df = pd.DataFrame(data)
df.to_csv('superstore_sales_data.csv', index=False)

print('superstore_sales_data.csv generated successfully.')


