# KAP - Just-in-Time Supply Chain Management Portal

A comprehensive supply chain management system that connects Suppliers, Companies, and Warehouses in a seamless just-in-time delivery ecosystem.

## Project Overview

KAP is a modern web application that streamlines the supply chain process by connecting three key stakeholders:
- **Suppliers**: Manufacture and ship parts to warehouses
- **Companies**: Order and purchase parts from suppliers
- **Warehouses**: Store and manage inventory, dispatch parts to companies

## Features

- User authentication and role-based access control
- Real-time inventory tracking
- Order management system
- Shipment tracking
- AI-powered document processing
- Executive dashboards with AI-generated summaries
- Automated form filling from uploaded documents

## Technology Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Python (Django)
- **Database**: MySQL
- **AI Integration**: OpenAI API for document processing and summarization
- **Authentication**: JWT-based authentication
- **API Documentation**: Swagger/OpenAPI

## Project Structure

```
kap/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
│
├── backend/                 # Django backend application
│   ├── kap/                # Main Django project
│   │   ├── settings/       # Django settings
│   │   ├── urls/          # URL configurations
│   │   └── wsgi.py        # WSGI configuration
│   ├── apps/              # Django applications
│   │   ├── users/         # User management
│   │   ├── inventory/     # Inventory management
│   │   ├── orders/        # Order processing
│   │   ├── shipments/     # Shipment tracking
│   │   └── ai/            # AI integration
│   └── requirements/       # Python dependencies
│
└── docs/                   # Project documentation
    ├── api/               # API documentation
    └── setup/            # Setup guides
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)
- MySQL (v8.0 or higher)
- Git

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r backend/requirements/dev.txt
   ```

3. Set up the database:
   ```bash
   python manage.py migrate
   ```

4. Start the development server:
   ```bash
   python manage.py runserver
   ```

## Environment Variables

Create `.env` files in both frontend and backend directories with the following variables:

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_AI_API_KEY=your_openai_api_key
```

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your_django_secret_key
DATABASE_URL=mysql://user:password@localhost:3306/kap_db
OPENAI_API_KEY=your_openai_api_key
```

## Contributing

Please read our [Contributing Guidelines](docs/CONTRIBUTING.md) before submitting pull requests.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.


