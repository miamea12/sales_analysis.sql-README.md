# Sales Analytics Project - README

## Project Overview
This is a comprehensive data analytics project designed for LinkedIn portfolio showcase, demonstrating skills in SQL, data visualization, and business intelligence dashboard development.

## Business Question
**"Why did sales drop in Q2 2024, and which products or regions were affected?"**

## Key Findings
- **25.9% sales decrease** in Q2 2024 vs Q2 2023
- **Office Supplies** most affected category ($42,752)
- **East Region** most impacted ($33,319)
- **$53,552** in lost revenue

## Technologies Used
- **SQL (SQLite)** - Database management and analysis
- **Python** - Data visualization (matplotlib, seaborn, pandas)
- **React** - Interactive dashboard development
- **Tailwind CSS** - Modern UI design

## Project Structure
```
├── superstore_sales_data.csv          # Simulated dataset
├── superstore_sales.db                # SQLite database
├── sales_analysis.sql                 # SQL queries
├── create_visualizations.py           # Python visualization script
├── sales_analysis_dashboard.png       # Generated charts
├── sales-dashboard/                   # React dashboard application
├── Sales_Analytics_Project_Report.md  # Comprehensive documentation
└── Sales_Analytics_Project_Report.pdf # PDF report
```

## How to Run

### 1. Database Analysis
```bash
sqlite3 superstore_sales.db < sales_analysis.sql
```

### 2. Generate Visualizations
```bash
python3 create_visualizations.py
```

### 3. Run Interactive Dashboard
```bash
cd sales-dashboard
pnpm run dev --host
```

## Key SQL Queries

### Quarterly Sales Trend
```sql
SELECT
  strftime("%Y", order_date) AS sales_year,
  CASE
    WHEN strftime("%m", order_date) BETWEEN "01" AND "03" THEN "Q1"
    WHEN strftime("%m", order_date) BETWEEN "04" AND "06" THEN "Q2"
    WHEN strftime("%m", order_date) BETWEEN "07" AND "09" THEN "Q3"
    WHEN strftime("%m", order_date) BETWEEN "10" AND "12" THEN "Q4"
  END AS sales_quarter,
  SUM(sales) AS total_sales
FROM sales
GROUP BY sales_year, sales_quarter
ORDER BY sales_year, sales_quarter;
```

## Dashboard Features
- **Overview Tab**: Visual dashboard with charts and KPIs
- **SQL Analysis Tab**: Display of actual queries used
- **Key Insights Tab**: Business recommendations and findings

## Business Impact
This analysis provides executives with:
1. Clear identification of the sales problem magnitude
2. Specific product categories requiring attention
3. Regional performance variations
4. Actionable recommendations for recovery

## Skills Demonstrated
- Advanced SQL query writing and database management
- Statistical analysis and data visualization
- Modern web development with React
- Business intelligence and executive reporting
- End-to-end data analytics project management

## Contact
This project showcases data analytics capabilities suitable for senior analyst and business intelligence roles. The methodology and technical implementation demonstrate real-world applicability for enterprise environments.

