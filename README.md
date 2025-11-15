# 🍽️ FoodBoxd

FoodBoxd is a fullstack web application for sharing and discovering gastronomic experiences, inspired by the Letterboxd concept, but focused on food and restaurants.

## 📋 About the Project

FoodBoxd allows users to record their gastronomic experiences, discover new restaurants, share recommendations, and interact with friends through lists and meal diaries.

### Main Features

- 🔐 **User Authentication**: Complete login and registration system with JWT
- 📊 **Dashboard**: Overview of activities and statistics
- 🎯 **Recommendations**: Discover new restaurants and dishes
- 🔍 **Search**: Search for restaurants, dishes, and users
- 👥 **Friends**: Connect with other users
- 👤 **Profile**: Manage your personal information
- 📔 **Diary**: Record your gastronomic experiences
- 📝 **Lists**: Create and share custom lists

## 🛠️ Technologies Used

### Backend
- **Django 5.2.8** - Python web framework
- **Django REST Framework 3.16.1** - RESTful API
- **Django REST Framework SimpleJWT 5.5.1** - JWT Authentication
- **Django CORS Headers 4.9.0** - CORS management
- **SQLite** - Database (development)

### Frontend
- **React 19.2.0** - JavaScript library for UI
- **TypeScript 5.9.3** - Typed superset of JavaScript
- **Vite 7.2.2** - Build tool and dev server
- **React Router DOM 7.9.6** - Routing
- **React Hook Form 7.66.0** - Form management
- **Zustand 5.0.8** - State management
- **Tailwind CSS 4.1.17** - Utility-first CSS framework

## 📁 Project Structure

```
foodboxd/
├── backend/
│   ├── api/                    # Main API app
│   │   ├── models.py          # Data models
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   └── urls.py            # API routes
│   ├── foodboxd_api/          # Django settings
│   │   ├── settings.py        # Main settings
│   │   └── urls.py            # Main URLs
│   ├── manage.py              # Django CLI
│   ├── db.sqlite3             # Database
│   └── venv/                  # Python virtual environment
│
└── frontend/
    ├── src/
    │   ├── components/        # Reusable components
    │   │   ├── Layout.tsx
    │   │   └── ProtectedRoute.tsx
    │   ├── pages/             # Application pages
    │   │   ├── LoginPage.tsx
    │   │   └── RegisterPage.tsx
    │   ├── store/             # State management
    │   │   └── auth.store.ts
    │   ├── App.tsx            # Main component
    │   ├── routes.tsx         # Route configuration
    │   └── main.tsx           # Entry point
    ├── package.json           # Node.js dependencies
    └── vite.config.ts         # Vite configuration
```

## 🚀 How to Run the Project

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend (Django)

1. Navigate to the backend folder:
```bash
cd backend
```

2. Create and activate the virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
```

4. Run migrations:
```bash
python manage.py migrate
```

5. (Optional) Create a superuser:
```bash
python manage.py createsuperuser
```

6. Start the development server:
```bash
python manage.py runserver
```

The backend will be available at `http://127.0.0.1:8000/`

### Frontend (React + Vite)

1. Navigate to the frontend folder:
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

The frontend will be available at `http://localhost:5173/`

## 🔌 API Endpoints

### Authentication
- `POST /api/register/` - Register new user
- `POST /api/login/` - Login (obtain JWT token)
- `POST /api/login/refresh/` - Refresh JWT token

### Users
- `GET /api/users/me/` - Get authenticated user data (requires authentication)

## 🎨 Frontend Routes

### Public
- `/login` - Login page
- `/cadastro` - Registration page

### Protected (requires authentication)
- `/app/dashboard` - Main dashboard
- `/app/recomendacoes` - Recommendations
- `/app/pesquisa` - Search
- `/app/amigos` - Friends list
- `/app/perfil` - User profile
- `/app/diario` - Meal diary
- `/app/listas` - Public lists
- `/app/minha-lista` - Personal list

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in with email and password
2. Backend returns an access token (`access`) and a refresh token
3. Access token is stored in global state (Zustand)
4. All authenticated requests include the header: `Authorization: Bearer <token>`
5. Protected routes verify token presence before rendering

## 🧪 Available Scripts

### Backend
```bash
python manage.py runserver      # Start development server
python manage.py migrate         # Run migrations
python manage.py makemigrations  # Create new migrations
python manage.py createsuperuser # Create superuser
python manage.py test            # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linter
```

## 📝 Important Settings

### CORS
The backend is configured to accept requests from:
- `http://localhost:5173`
- `http://127.0.0.1:5173`

To add other origins, edit `CORS_ALLOWED_ORIGINS` in `backend/foodboxd_api/settings.py`.

### Environment Variables

For production, consider configuring:
- `SECRET_KEY` - Django secret key
- `DEBUG` - Debug mode (False in production)
- `ALLOWED_HOSTS` - Allowed hosts
- `DATABASE_URL` - Database URL

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -m 'Add MyFeature'`)
4. Push to the branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

## 📄 License

This is an academic project developed for the HCI (Human-Computer Interaction) course.

## 👥 Authors

Project developed as part of the HCI course.

---

⭐ If you liked this project, consider giving it a star!
