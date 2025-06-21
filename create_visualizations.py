import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Read the data
df = pd.read_csv('superstore_sales_data.csv')
df['order_date'] = pd.to_datetime(df['order_date'])

# Create quarter column
df['quarter'] = df['order_date'].dt.quarter
df['year'] = df['order_date'].dt.year

# Analysis 1: Quarterly sales trend
quarterly_sales = df.groupby(['year', 'quarter'])['sales'].sum().reset_index()
quarterly_sales['year_quarter'] = quarterly_sales['year'].astype(str) + ' Q' + quarterly_sales['quarter'].astype(str)

# Create visualizations
plt.style.use('seaborn-v0_8')
fig, axes = plt.subplots(2, 2, figsize=(16, 12))

# 1. Quarterly Sales Trend
axes[0, 0].plot(quarterly_sales['year_quarter'], quarterly_sales['sales'], marker='o', linewidth=2, markersize=8)
axes[0, 0].set_title('Quarterly Sales Trend', fontsize=14, fontweight='bold')
axes[0, 0].set_xlabel('Quarter')
axes[0, 0].set_ylabel('Sales ($)')
axes[0, 0].tick_params(axis='x', rotation=45)
axes[0, 0].grid(True, alpha=0.3)

# Highlight Q2 2024
q2_2024_idx = quarterly_sales[quarterly_sales['year_quarter'] == '2024 Q2'].index[0]
axes[0, 0].scatter(q2_2024_idx, quarterly_sales.iloc[q2_2024_idx]['sales'], 
                   color='red', s=100, zorder=5, label='Q2 2024 Drop')
axes[0, 0].legend()

# 2. Sales by Product Category in Q2 2024
q2_2024_data = df[(df['year'] == 2024) & (df['quarter'] == 2)]
category_sales = q2_2024_data.groupby('product_category')['sales'].sum().sort_values()

axes[0, 1].barh(category_sales.index, category_sales.values, color=['#ff7f7f', '#7fbfff', '#7fff7f'])
axes[0, 1].set_title('Q2 2024 Sales by Product Category', fontsize=14, fontweight='bold')
axes[0, 1].set_xlabel('Sales ($)')

# 3. Sales by Region in Q2 2024
region_sales = q2_2024_data.groupby('region')['sales'].sum().sort_values()

axes[1, 0].barh(region_sales.index, region_sales.values, color=['#ffb3b3', '#b3d9ff', '#b3ffb3', '#ffffb3'])
axes[1, 0].set_title('Q2 2024 Sales by Region', fontsize=14, fontweight='bold')
axes[1, 0].set_xlabel('Sales ($)')

# 4. Year-over-Year Q2 Comparison
q2_comparison = df[df['quarter'] == 2].groupby('year')['sales'].sum()
axes[1, 1].bar(q2_comparison.index.astype(str), q2_comparison.values, color=['#7fbfff', '#ff7f7f'])
axes[1, 1].set_title('Q2 Sales: Year-over-Year Comparison', fontsize=14, fontweight='bold')
axes[1, 1].set_xlabel('Year')
axes[1, 1].set_ylabel('Sales ($)')

# Add percentage change annotation
pct_change = ((q2_comparison[2024] - q2_comparison[2023]) / q2_comparison[2023]) * 100
axes[1, 1].text(1.5, max(q2_comparison.values) * 0.8, 
                f'{pct_change:.1f}% decrease', 
                fontsize=12, fontweight='bold', color='red',
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white", alpha=0.8))

plt.tight_layout()
plt.savefig('sales_analysis_dashboard.png', dpi=300, bbox_inches='tight')
plt.close()

# Create a summary table
print("=== SALES ANALYSIS SUMMARY ===")
print(f"Q2 2023 Sales: ${q2_comparison[2023]:,.2f}")
print(f"Q2 2024 Sales: ${q2_comparison[2024]:,.2f}")
print(f"Percentage Change: {pct_change:.1f}%")
print()
print("Q2 2024 Sales by Category:")
for category, sales in category_sales.items():
    print(f"  {category}: ${sales:,.2f}")
print()
print("Q2 2024 Sales by Region:")
for region, sales in region_sales.items():
    print(f"  {region}: ${sales:,.2f}")

