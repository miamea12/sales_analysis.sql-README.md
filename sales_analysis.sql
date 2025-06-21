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
GROUP BY
  sales_year,
  sales_quarter
ORDER BY
  sales_year,
  sales_quarter;

SELECT
  strftime("%Y", order_date) AS sales_year,
  CASE
    WHEN strftime("%m", order_date) BETWEEN "01" AND "03" THEN "Q1"
    WHEN strftime("%m", order_date) BETWEEN "04" AND "06" THEN "Q2"
    WHEN strftime("%m", order_date) BETWEEN "07" AND "09" THEN "Q3"
    WHEN strftime("%m", order_date) BETWEEN "10" AND "12" THEN "Q4"
  END AS sales_quarter,
  product_category,
  SUM(sales) AS total_sales
FROM sales
WHERE sales_year = "2024" AND sales_quarter = "Q2"
GROUP BY
  sales_year,
  sales_quarter,
  product_category
ORDER BY
  total_sales ASC;

SELECT
  strftime("%Y", order_date) AS sales_year,
  CASE
    WHEN strftime("%m", order_date) BETWEEN "01" AND "03" THEN "Q1"
    WHEN strftime("%m", order_date) BETWEEN "04" AND "06" THEN "Q2"
    WHEN strftime("%m", order_date) BETWEEN "07" AND "09" THEN "Q3"
    WHEN strftime("%m", order_date) BETWEEN "10" AND "12" THEN "Q4"
  END AS sales_quarter,
  region,
  SUM(sales) AS total_sales
FROM sales
WHERE sales_year = "2024" AND sales_quarter = "Q2"
GROUP BY
  sales_year,
  sales_quarter,
  region
ORDER BY
  total_sales ASC;


