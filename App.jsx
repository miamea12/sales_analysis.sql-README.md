import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { TrendingDown, BarChart3, PieChart, MapPin, Database, FileText } from 'lucide-react'
import dashboardImage from './assets/sales_analysis_dashboard.png'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  const salesData = {
    q2_2023: 207024.23,
    q2_2024: 153472.42,
    percentageChange: -25.9,
    categories: [
      { name: 'Office Supplies', sales: 42752.12, color: '#ff7f7f' },
      { name: 'Furniture', sales: 53135.58, color: '#7fbfff' },
      { name: 'Technology', sales: 57584.72, color: '#7fff7f' }
    ],
    regions: [
      { name: 'East', sales: 33319.00, color: '#ffb3b3' },
      { name: 'West', sales: 35787.31, color: '#b3d9ff' },
      { name: 'Central', sales: 40750.76, color: '#b3ffb3' },
      { name: 'South', sales: 43615.36, color: '#ffffb3' }
    ]
  }

  const sqlQueries = [
    {
      title: "Quarterly Sales Trend Analysis",
      query: `SELECT
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
ORDER BY sales_year, sales_quarter;`
    },
    {
      title: "Q2 2024 Sales by Product Category",
      query: `SELECT
  product_category,
  SUM(sales) AS total_sales
FROM sales
WHERE strftime("%Y", order_date) = "2024" 
  AND strftime("%m", order_date) BETWEEN "04" AND "06"
GROUP BY product_category
ORDER BY total_sales ASC;`
    },
    {
      title: "Q2 2024 Sales by Region",
      query: `SELECT
  region,
  SUM(sales) AS total_sales
FROM sales
WHERE strftime("%Y", order_date) = "2024" 
  AND strftime("%m", order_date) BETWEEN "04" AND "06"
GROUP BY region
ORDER BY total_sales ASC;`
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sales Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Q2 2024 Sales Drop Analysis - Data Analytics Project
          </p>
          <Badge variant="destructive" className="text-lg px-4 py-2">
            <TrendingDown className="w-5 h-5 mr-2" />
            25.9% Sales Decrease in Q2 2024
          </Badge>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-md">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('overview')}
              className="flex items-center"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'sql' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('sql')}
              className="flex items-center"
            >
              <Database className="w-4 h-4 mr-2" />
              SQL Analysis
            </Button>
            <Button
              variant={activeTab === 'insights' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('insights')}
              className="flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Key Insights
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Main Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-6 h-6 mr-2" />
                  Sales Analysis Dashboard
                </CardTitle>
                <CardDescription>
                  Comprehensive view of Q2 2024 sales performance across categories and regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src={dashboardImage} 
                  alt="Sales Analysis Dashboard" 
                  className="w-full rounded-lg shadow-lg"
                />
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q2 Sales Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Q2 2023:</span>
                      <span className="font-semibold">${salesData.q2_2023.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Q2 2024:</span>
                      <span className="font-semibold text-red-600">${salesData.q2_2024.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Change:</span>
                      <span className="font-bold text-red-600">{salesData.percentageChange}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Category Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {salesData.categories.map((category, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{category.name}:</span>
                        <span className="font-semibold">${category.sales.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Regional Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {salesData.regions.map((region, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {region.name}:
                        </span>
                        <span className="font-semibold">${region.sales.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'sql' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-6 h-6 mr-2" />
                  SQL Analysis Queries
                </CardTitle>
                <CardDescription>
                  SQL queries used to analyze the sales data and identify the Q2 2024 drop
                </CardDescription>
              </CardHeader>
            </Card>

            {sqlQueries.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{item.query}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Key Business Insights
                </CardTitle>
                <CardDescription>
                  Executive summary of findings and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">🔍 Problem Identified</h3>
                  <p className="text-gray-700">
                    Sales dropped by 25.9% in Q2 2024 compared to Q2 2023, representing a loss of approximately $53,552 in revenue.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">📊 Product Category Impact</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><strong>Office Supplies</strong> had the lowest sales ($42,752) - most affected category</li>
                    <li><strong>Furniture</strong> performed moderately ($53,136)</li>
                    <li><strong>Technology</strong> had the highest sales ($57,585) but still underperformed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">🗺️ Regional Analysis</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><strong>East Region</strong> had the lowest sales ($33,319) - requires immediate attention</li>
                    <li><strong>West Region</strong> slightly better ($35,787) but still concerning</li>
                    <li><strong>Central and South</strong> regions performed relatively better</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">💡 Recommendations</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Focus marketing efforts on Office Supplies category</li>
                    <li>Investigate supply chain or competitive issues in East and West regions</li>
                    <li>Analyze customer feedback and market conditions for Q2 2024</li>
                    <li>Implement targeted promotions for underperforming categories and regions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p>Data Analytics Project | SQL + Tableau/Power BI Simulation | LinkedIn Portfolio</p>
        </div>
      </div>
    </div>
  )
}

export default App

