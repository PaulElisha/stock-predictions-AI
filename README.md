<!-- @format -->

# Stock Predictions AI

A powerful full-stack application that leverages Artificial Intelligence to analyze stock market data and generate performance reports. This project uses a microservices-inspired architecture with an Express.js backend and Cloudflare Workers for efficient data fetching and AI processing.

## 🚀 Features

- **Stock Data Retrieval**: Fetches real-time/historical stock data using Polygon.io (via a dedicated Cloudflare Worker).
- **AI Analysis**: Generates insightful stock performance reports using OpenAI/Mistral AI (via a dedicated Cloudflare Worker).
- **Microservices Architecture**: Decoupled services for better scalability and maintainability.
- **TypeScript**: Fully typed codebase for reliability and developer experience.
- **MongoDB**: Persistent storage for application data (configured).

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **database**: MongoDB (Mongoose)
- **Serverless Workers**: Cloudflare Workers
- **AI Integration**: @mistralai/mistralai (and OpenAI support)
- **Data Provider**: Polygon.io
- **HTTP Client**: Axios

## 📋 Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- MongoDB (Local instance or Atlas connection string)
- Cloudflare Wrangler CLI (for running workers)

## ⚙️ Configuration

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/PaulElisha/stock-predictions-ai.git
    cd stock-predictions-ai
    ```

2.  **Environment Variables**:
    Create a `.env` file in the root directory by copying `.env.example` (or using the keys below) and filling in your credentials:

    ```env
    # Server Configuration
    PORT=8000
    HOST_NAME=http://localhost

    # Database
    MONGODB_URI=mongodb://localhost:27017/stock-predictions

    # API Keys
    OPENAI_API_KEY=your_openai_api_key
    POLYGON_API_KEY=your_polygon_api_key
    MISTRAL_AI_API_KEY=your_mistral_api_key

    # External Services
    POLYGON_BASE_URL=https://api.polygon.io
    MISTRAL_SERVER_URL=https://api.mistral.ai

    # Worker URLs (Local dev URLs or deployed Cloudflare URLs)
    OPENAI_WORKER_URL=http://localhost:8787 # Example
    POLYGON_WORKER_URL=http://localhost:8788 # Example
    ```

## 📦 Installation & Running

### 1. Backend Server

Install dependencies and start the Express server:

```bash
# Install dependencies
npm install

# Run in development mode (with hot reload)
npm run dev

# Build and run
npm run build
npm start
```

### 2. Cloudflare Workers

The project contains two workers in `src/workers`. You need to run them separately (or deploy them) for the application to function fully.

**OpenAI Worker:**

```bash
cd src/workers/openai-worker
npm install
npm run dev
```

**Polygon Worker:**

```bash
cd src/workers/polygon-worker
npm install
npm run dev
```

> **Note:** Make sure the `OPENAI_WORKER_URL` and `POLYGON_WORKER_URL` in your root `.env` match the URLs where your workers are running (usually printed in the terminal by Wrangler).

## 📐 Architecture Overview

The application follows a clean separation of concerns:

1.  **Controller (`src/controllers`)**: Handles incoming HTTP requests (e.g., `POST /api`). Validate inputs and delegates logic.
2.  **Service (`src/services`)**: Contains business logic. Orchestrates calls to the external workers.
    - Calls **Polygon Worker** to get raw stock data.
    - Calls **OpenAI Worker** to analyze that data and generate a report.
3.  **Workers (`src/workers`)**:
    - `polygon-worker`: Proxies requests to Polygon.io, handling authentication and formatting.
    - `openai-worker`: Interfaces with AI models (Mistral/OpenAI) to generate text summaries based on the provided stock data.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
