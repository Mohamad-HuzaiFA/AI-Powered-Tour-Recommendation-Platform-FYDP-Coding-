---

# AI-Driven Tour Recommendation Platform

An AI-driven tour recommendation platform built with a Django backend (using PostgreSQL) and a Next.js frontend. This project leverages modern best practices including JWT authentication, RESTful APIs, SWR for data fetching, and a scalable architecture.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup (Django)](#backend-setup-django)
  - [Frontend Setup (Next.js)](#frontend-setup-nextjs)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Booking & Payment Process](#booking--payment-process)
  - [Review & Notification](#review--notification)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Features

- **User Authentication:**  
  - Signup, Login, and JWT token refresh using Django REST Framework SimpleJWT.
  
- **Role-Based Access Control:**  
  - Differentiates between Tourists and Tourism Companies.

- **Tour Management:**  
  - CRUD operations for tours and tour packages.
  - Upload and manage images for tours.

- **Booking System:**  
  - Tourists can book tours/tour packages.
  - Automatic booking confirmation upon successful payment.

- **Payment System:**  
  - Custom payment API to simulate payment processing.
  - Automatic update of booking status when payment is successful.
  
- **Reviews and Notifications:**  
  - Tourists can leave reviews for tour packages.
  - Notifications for booking confirmation and updates.

- **Frontend & Backend Integration:**  
  - Next.js frontend integrated with Django REST APIs.
  - Modern data fetching using Axios and SWR.

---

## Project Structure

```
tour_recommendation/
├── backend/                     # Django project folder
│   ├── manage.py
│   ├── requirements.txt
│   ├── tour_recommendation/     # Django settings and URLs
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   └── core/                    # App containing models, views, serializers, permissions
│       ├── models.py
│       ├── views.py
│       ├── serializers.py
│       ├── permissions.py
│       └── ...
└── frontend/                    # Next.js project folder
    ├── package.json
    ├── next.config.js
    ├── .env.local               # Frontend environment variables
    ├── public/                  # Static assets (images, etc.)
    │   └── assets/
    ├── src/
    │   ├── app/
    │   │   ├── layout.js
    │   │   ├── page.js
    │   │   └── Pages/
    │   │       ├── Login.jsx
    │   │       ├── SignUp.jsx
    │   │       ├── AboutUs.jsx
    │   │       └── ...          # Other pages/components
    │   ├── components/          # Reusable components
    │   ├── Styles/              # CSS/SCSS files
    │   └── utils/
    │       └── api.js           # Axios instance configuration
```

---

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Python 3.8+**
- **PostgreSQL**

---

## Installation

### Backend Setup (Django)

1. **Clone the repository and navigate to the backend folder:**

   ```bash
   cd ai_tour_platform/backend
   ```

2. **Create and activate a virtual environment:**

   ```bash
   python -m venv env
   # Activate on Windows:
   env\Scripts\activate
   # Activate on macOS/Linux:
   source env/bin/activate
   ```

3. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure your database in `settings.py`:**

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'tour_db',
           'USER': 'postgres',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

5. **Run migrations and start the server:**

   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup (Next.js)

1. **Navigate to the frontend folder:**

   ```bash
   cd ../frontend
   ```

2. **Install npm dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env.local` file** in the frontend root with:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
   ```

4. **Start the Next.js development server:**

   ```bash
   npm run dev
   ```

---

## Configuration

### Environment Variables

- **Frontend (`.env.local`):**
  ```env
  NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
  ```

- **Backend:**  
  Use Django settings or a `.env` file (with packages like `python-decouple`) to store secret keys and database credentials.

### Database Setup

- **PostgreSQL:**  
  Ensure PostgreSQL is installed and properly configured.  
  To share the database with teammates, use a database backup (`pg_dump`) or host on a cloud service like ElephantSQL.

---

## API Endpoints

### **Authentication**
- **POST /api/signup/** – User Signup  
- **POST /api/login/** – User Login  
- **POST /api/token/refresh/** – Refresh JWT Token  
- **GET /api/protected-endpoint/** – Protected route example

### **Tour Management**
- **GET /api/tours/** – List tours  
- **POST /api/tours/create/** – Create a tour  
- **GET /api/tours/<uuid:pk>/** – Retrieve/Update/Delete a tour  
- **POST /api/tours/upload-image/** – Upload tour images  
- **POST /api/tours/<uuid:tour_id>/upload-images/** – Upload multiple images

### **Tour Package Management**
- **GET /api/tour-packages/** – List tour packages  
- **POST /api/tour-packages/create/** – Create a tour package  
- **GET /api/tour-packages/<uuid:pk>/** – Retrieve/Update/Delete a tour package

### **Booking**
- **POST /api/bookings/create/** – Create a booking  
- **GET /api/bookings/** – Get bookings for a tourist  
- **GET /api/bookings/company/** – Get bookings for a tourism company  
- **PATCH /api/bookings/<uuid:pk>/update-status/** – Update booking status

### **Payment**
- **POST /api/payments/** – Create a payment (simulate processing)  
- **GET /api/payments/<uuid:payment_id>/** – Get payment details  
- **PATCH /api/payments/<uuid:payment_id>/update/** – Update payment status

### **Reviews**
- **POST /api/reviews/create/** – Create a review  
- **GET /api/reviews/tour/<uuid:tour_id>/** – List reviews for a tour

### **Notifications**
- **GET /api/notifications/** – Get user notifications  
- **PATCH /api/notifications/<uuid:notification_id>/mark-read/** – Mark a notification as read

---

## Usage

### Authentication
- **Signup & Login:**  
  The frontend signup form collects username, email, password, and user type (tourist or company).  
  Upon successful signup, JWT tokens are returned.

- **JWT Integration:**  
  The frontend uses Axios interceptors (or SWR with fetcher functions) to attach JWT tokens to API calls.  
  Use `/api/token/refresh/` to get a new access token when the current one expires.

### Booking & Payment Process
- **Booking Creation:**  
  Tourists create bookings, which start with a `pending` status.
  
- **Payment Processing:**  
  After booking, a custom payment API (using your Payment model) processes the payment.  
  When the payment status is updated to `successful` (ideally by an automated system or admin), the booking status automatically updates to `confirmed`.

### Reviews & Notifications
- **Reviews:**  
  Tourists can leave reviews for tour packages.
  
- **Notifications:**  
  Users receive notifications (e.g., booking confirmation, payment updates).  
  Notifications can be marked as read via an API.

---

## Frontend Integration

### Data Fetching & API Calls
- **Axios Instance:**  
  All API calls use a centralized Axios instance (`src/utils/api.js`), configured with a base URL and default headers.

- **SWR:**  
  For GET requests, SWR is used to fetch and cache data (e.g., test endpoint, booking lists).

### Form Handling & Validation
- **Signup Form:**  
  Uses controlled components with React hooks.  
  Client-side validation (e.g., password matching) is implemented before making API calls.

- **Error Handling:**  
  Robust error handling is in place, checking for network errors, server errors, and unexpected issues.

---

## Deployment

### Backend Deployment
- **Deploy Django:**  
  Use platforms like Heroku, DigitalOcean, or AWS.
- **Configure environment variables and secure your database.**

### Frontend Deployment
- **Deploy Next.js:**  
  Platforms like Vercel (ideal for Next.js) or Netlify are recommended.

---

## Troubleshooting

- **CORS Issues:**  
  Make sure `django-cors-headers` is configured in Django.
- **Module Not Found:**  
  Verify import paths in Next.js (e.g., assets should be in the `public/` folder).
- **JWT Errors:**  
  Ensure tokens are correctly attached in API headers.
- **Database Connection:**  
  Confirm PostgreSQL credentials and permissions.

---

## Future Enhancements

- **Email Notifications:**  
  Automatically send emails on signup, booking confirmation, etc.
- **Refund & Cancellation Policies:**  
  Implement automated refund handling and cancellation workflows.
- **AI-Driven Pricing:**  
  Integrate dynamic pricing based on weather, season, and availability.
- **Enhanced Frontend UI/UX:**  
  Use modern libraries like Tailwind CSS or Material UI for styling.
- **State Management:**  
  Consider using React Query or SWR for better state management.
