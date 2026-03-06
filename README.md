# 🏙️ SmartCity Monitor - Infrastructure OS

A comprehensive, real-time dashboard designed for city administrators to monitor and manage urban infrastructure. This application provides a "digital twin" view of city operations, from traffic flow to healthcare capacity.

## 🚀 Overview

SmartCity Monitor (v2.4) is a high-performance monitoring suite that visualizes the health of a city's vital organs. It uses a sophisticated background simulation engine to mimic real-world usage patterns, allowing for proactive management of city resources.

## ✨ Key Features

- **Live Data Engine**: A background service that generates realistic usage data every 5 seconds for traffic, parking, hospitals, water, and power.
- **City Utilization Heatmap**: An interactive geospatial visualization using Leaflet to show infrastructure health across North, South, East, West, and Central zones.
- **Infrastructure Monitoring Table**: A detailed, color-coded data grid providing deep insights into max capacity, current usage, and utilization percentages.
- **Real-time Analytics**: Dynamic area charts for every asset showing utilization trends over time.
- **Smart Alert System**: Automated detection and reporting of "Congested," "Overloaded," or "Critical" infrastructure states.
- **Advanced Filtering**: Quickly drill down into specific city zones or infrastructure types (Transport, Energy, Healthcare, etc.).

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Data Visualization**: Recharts
- **Mapping**: Leaflet & React-Leaflet
- **Icons**: Lucide React
- **State Management**: React Hooks (Custom simulation engine)
- **Routing**: React Router

## 📊 Monitored Assets

- **Transport**: Traffic flow (Vehicles/hr) and Parking occupancy (Spaces).
- **Healthcare**: ICU bed availability.
- **Utilities**: Water reservoir levels (m³) and Power grid load (MW).
- **Waste**: Recycling center throughput (Tons/day).

---
*Built with precision for modern urban management.*