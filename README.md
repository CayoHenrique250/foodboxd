# 🍽️ FoodBoxd

<div align="center">

![FoodBoxd Logo](frontend/public/logo-backGray-horizontal.png)

**A social platform for sharing and discovering gastronomic experiences**

[![Django](https://img.shields.io/badge/Django-5.2.6-092E20?style=flat&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Railway](https://img.shields.io/badge/Railway-Deployed-0B0D0E?style=flat&logo=railway&logoColor=white)](https://railway.app/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

[Live Demo](#) • [Documentation](#-api-documentation) • [Report Bug](https://github.com/CayoHenrique250/foodboxd/issues)

</div>

---

## 📋 About the Project

**FoodBoxd** is a full-stack web application inspired by Letterboxd, but focused on food and restaurants. It allows users to record their gastronomic experiences, discover new restaurants, share recommendations, and interact with friends through lists and meal diaries.

This project was developed as part of the **HCI (Human-Computer Interaction)** course, emphasizing user experience, interface design, and modern web development practices.

### ✨ Key Features

- 🔐 **User Authentication** - Complete registration and login system with JWT
- 📊 **Dashboard** - Personalized overview of activities and statistics
- 🎯 **Recommendations** - Discover new restaurants and dishes based on preferences
- 🔍 **Advanced Search** - Find restaurants, dishes, and users
- 👥 **Social Network** - Connect with friends and follow their activities
- 👤 **User Profile** - Manage personal information and preferences
- 📔 **Food Diary** - Daily log of gastronomic experiences
- 📝 **Custom Lists** - Create and share curated food lists
- ⭐ **Reviews & Ratings** - Rate dishes, ambiance, and service
- 🍽️ **Restaurant Database** - Comprehensive restaurant and dish catalog
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

---

## 🏗️ Architecture & Tech Stack

### Backend (Django REST API)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Django** | 5.2.6 | Web framework |
| **Django REST Framework** | 3.16.1 | RESTful API |
| **djangorestframework-simplejwt** | 5.5.1 | JWT authentication |
| **django-cors-headers** | 4.9.0 | CORS management |
| **PostgreSQL** | Latest | Production database |
| **SQLite** | 3.x | Development database |
| **Gunicorn** | 23.0.0 | WSGI HTTP server |
| **WhiteNoise** | 6.11.0 | Static files serving |
| **Pillow** | 12.0.0 | Image processing |
| **python-decouple** | 3.8 | Environment variables |

### Frontend (React + TypeScript)

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI library |
| **TypeScript** | 5.9.3 | Type safety |
| **Vite** | 7.2.2 | Build tool & dev server |
| **React Router DOM** | 7.9.6 | Client-side routing |
| **React Hook Form** | 7.66.0 | Form management |
| **Zustand** | 5.0.8 | State management |
| **Tailwind CSS** | 4.1.17 | Utility-first CSS |
| **React Icons** | 5.5.0 | Icon library |
| **Vitest** | 4.0.14 | Unit testing |
| **Testing Library** | 16.3.0 | Component testing |

### Deployment

- **Backend:** Railway (with PostgreSQL)
- **Frontend:** Vercel
- **CI/CD:** Automatic deployments on push

---

## 📁 Project Structure

```
foodboxd/
├── backend/                          # Django REST API
│   ├── api/                         # Main API application
│   │   ├── models.py               # Data models (User, Restaurant, Dish, Review, List, Friendship)
│   │   ├── serializers.py          # DRF serializers
│   │   ├── views.py                # API views
│   │   ├── urls.py                 # API routes
│   │   ├── admin.py                # Django admin configuration
│   │   └── migrations/             # Database migrations
│   ├── foodboxd_api/               # Django project settings
│   │   ├── settings.py             # Main settings (production-ready)
│   │   ├── urls.py                 # Main URL configuration
│   │   ├── wsgi.py                 # WSGI configuration
│   │   └── asgi.py                 # ASGI configuration
│   ├── manage.py                   # Django CLI
│   ├── requirements.txt            # Python dependencies
│   ├── Procfile                    # Railway deployment config
│   ├── railway.json                # Railway build settings
│   ├── env.example                 # Environment variables template
│   ├── check_deploy_ready.py       # Pre-deployment verification
│   └── .gitignore                  # Git ignore rules
│
└── frontend/                        # React application
    ├── src/
    │   ├── components/             # Reusable components
    │   │   ├── Layout.tsx          # Main app layout with navigation
    │   │   ├── ProtectedRoute.tsx  # Authentication guard
    │   │   └── FloatingButtons.tsx # Floating action buttons
    │   ├── pages/                  # Application pages
    │   │   ├── LoginPage.tsx       # Login page
    │   │   ├── RegisterPage.tsx    # Registration page
    │   │   ├── Dashboard.tsx       # Main dashboard
    │   │   ├── ProfilePage.tsx     # User profile
    │   │   ├── SearchPage.tsx      # Search functionality
    │   │   ├── RecommendationsPage.tsx  # Recommendations feed
    │   │   ├── FriendsPage.tsx     # Friends list
    │   │   ├── FollowingPage.tsx   # Following feed
    │   │   ├── DailyPage.tsx       # Daily diary
    │   │   ├── ListsPage.tsx       # Public lists
    │   │   ├── MyListPage.tsx      # Personal lists
    │   │   ├── YouPage.tsx         # User's own profile
    │   │   └── ReviewPage.tsx      # Review creation/editing
    │   ├── store/                  # State management
    │   │   └── auth.store.ts       # Authentication state (Zustand)
    │   ├── config/                 # Configuration
    │   │   └── api.ts              # API base URL configuration
    │   ├── test/                   # Test utilities
    │   │   ├── setup.ts            # Vitest setup
    │   │   └── test-utils.tsx      # Testing helpers
    │   ├── App.tsx                 # Root component
    │   ├── routes.tsx              # Route definitions
    │   └── main.tsx                # Entry point
    ├── public/                     # Static assets
    │   ├── logo.png
    │   └── dashboard-*.png         # Screenshots
    ├── package.json                # Node.js dependencies
    ├── vite.config.ts              # Vite configuration
    ├── vitest.config.ts            # Vitest configuration
    ├── tsconfig.json               # TypeScript configuration
    └── tailwind.config.js          # Tailwind CSS configuration
```

---

## 🗄️ Database Models

### CustomUser
Extended Django user model with custom authentication.

### Restaurante (Restaurant)
- `nome` - Restaurant name
- `endereco` - Address
- `telefone` - Phone number
- `tipo_cozinha` - Cuisine type
- `website` - Website URL

### Prato (Dish)
- `restaurante` - Foreign key to Restaurant
- `nome` - Dish name
- `descricao` - Description
- `preco` - Price

### Avaliacao (Review)
- `user` - Foreign key to User
- `restaurante` - Foreign key to Restaurant
- `prato` - Foreign key to Dish
- `nota_prato` - Dish rating (1-5)
- `nota_ambiente` - Ambiance rating (1-5)
- `nota_atendimento` - Service rating (1-5)
- `comentario` - Review text
- `foto` - Photo upload

### Lista (List)
- `user` - Foreign key to User
- `nome` - List name
- `descricao` - Description
- `pratos` - Many-to-many with Dishes

### Amizade (Friendship)
- `de_user` - From user
- `para_user` - To user
- `status` - Status (SOLICITADO, ACEITO, RECUSADO)

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.8 or higher
- **Node.js** 18 or higher
- **npm** or **yarn**
- **Git**

### Local Development Setup

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/CayoHenrique250/foodboxd.git
cd foodboxd
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

The backend will be available at `http://127.0.0.1:8000/`

#### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173/`

---

## 🔌 API Documentation

### Base URL
- **Development:** `http://127.0.0.1:8000/api/`
- **Production:** `https://your-project.railway.app/api/`

### Authentication Endpoints

#### Register User
```http
POST /api/register/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "password2": "securepassword",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "user@example.com",
  "name": "John",
  "last_name": "Doe"
}
```

#### Login
```http
POST /api/login/
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securepassword"
}
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Refresh Token
```http
POST /api/login/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Get Current User
```http
GET /api/users/me/
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "user@example.com",
  "email": "user@example.com",
  "name": "John",
  "last_name": "Doe"
}
```

### Admin Panel
Access the Django admin at `/admin/` with superuser credentials.

---

## 🎨 Frontend Routes

### Public Routes
- `/login` - Login page
- `/cadastro` - Registration page
- `/` - Redirects to dashboard if authenticated, login otherwise

### Protected Routes (Requires Authentication)
- `/app/dashboard` - Main dashboard with activity overview
- `/app/seguindo` - Feed from followed users
- `/app/recomendacoes` - Personalized recommendations
- `/app/pesquisa` - Search for restaurants, dishes, and users
- `/app/amigos` - Friends list and friend requests
- `/app/perfil` - User profile page
- `/app/diario` - Daily food diary
- `/app/listas` - Browse public lists
- `/app/minha-lista` - Personal lists management
- `/app/voce` - Your own profile view
- `/app/review` - Create/edit reviews

---

## 🔒 Authentication Flow

1. User registers with email and password
2. Backend validates and creates user account
3. User logs in with credentials
4. Backend returns JWT access and refresh tokens
5. Frontend stores access token in Zustand state
6. All authenticated requests include `Authorization: Bearer <token>` header
7. Protected routes verify token before rendering
8. Token refresh handled automatically on expiration

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- ✅ Component rendering tests
- ✅ User authentication flow
- ✅ Protected route guards
- ✅ Form validation
- ✅ API integration tests
- ✅ State management tests

---

## 🌐 Deployment

### Backend (Railway)

1. **Create Railway Account** at [railway.app](https://railway.app/)
2. **Create New Project** from GitHub repository
3. **Add PostgreSQL Database** to project
4. **Set Environment Variables:**
   - `SECRET_KEY` - Django secret key
   - `DEBUG` - `False`
   - `ALLOWED_HOSTS` - `.railway.app`
   - `CORS_ALLOWED_ORIGINS` - Your frontend URL
   - `DATABASE_URL` - Auto-generated by Railway

5. **Deploy** - Railway automatically builds and deploys

### Frontend (Vercel)

1. **Create Vercel Account** at [vercel.com](https://vercel.com/)
2. **Import GitHub Repository**
3. **Configure Build Settings:**
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Set Environment Variables:**
   - `VITE_API_URL` - Your Railway backend URL
5. **Deploy** - Vercel automatically builds and deploys

---

## 📝 Environment Variables

### Backend (`backend/env.example`)
```env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=.railway.app,localhost,127.0.0.1
DATABASE_URL=postgresql://user:password@host:port/database
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:5173
```

### Frontend
```env
VITE_API_URL=https://your-backend.railway.app
```

---

## 🛠️ Available Scripts

### Backend
```bash
python manage.py runserver          # Start development server
python manage.py migrate            # Run database migrations
python manage.py makemigrations     # Create new migrations
python manage.py createsuperuser    # Create admin user
python manage.py test               # Run tests
python manage.py collectstatic      # Collect static files
python check_deploy_ready.py        # Verify deployment readiness
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
```

---

## 🔧 Configuration

### CORS Settings
The backend accepts requests from configured origins. Update `CORS_ALLOWED_ORIGINS` in settings or environment variables.

### Static Files
Static files are served using WhiteNoise in production. Run `collectstatic` before deployment.

### Database
- **Development:** SQLite (automatic)
- **Production:** PostgreSQL (via `DATABASE_URL`)

---

## 🐛 Troubleshooting

### Backend Issues

**Database connection failed:**
- Verify `DATABASE_URL` is set correctly
- Check PostgreSQL is running
- Ensure migrations are applied

**CORS errors:**
- Add frontend URL to `CORS_ALLOWED_ORIGINS`
- Verify protocol (http/https) matches

**Static files not found:**
- Run `python manage.py collectstatic`
- Verify `STATIC_ROOT` is configured

### Frontend Issues

**API connection failed:**
- Check `VITE_API_URL` is set correctly
- Verify backend is running
- Check browser console for errors

**Authentication not working:**
- Clear browser localStorage
- Verify JWT tokens are being sent
- Check token expiration

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- **Backend:** Follow PEP 8 guidelines
- **Frontend:** ESLint configuration included
- Write tests for new features
- Update documentation as needed

---

## 📄 License

This is an academic project developed for the HCI (Human-Computer Interaction) course.

---

## 👥 Authors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/CayoHenrique250">
        <img src="https://github.com/CayoHenrique250.png" width="100px;" alt="Cayo Henrique"/><br>
        <sub><b>Cayo Henrique</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/aclaralins">
        <img src="https://github.com/aclaralins.png" width="100px;" alt="Anna Clara"/><br>
        <sub><b>Anna Clara</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/MauroSantosIf">
        <img src="https://github.com/MauroSantosIf.png" width="100px;" alt="Mauro Santos"/><br>
        <sub><b>Mauro Santos</b></sub>
      </a>
    </td>
  </tr>
</table>

---

## 🙏 Acknowledgments

- Inspired by [Letterboxd](https://letterboxd.com/)
- Built as part of the HCI course curriculum
- Thanks to all contributors and testers

---

## 📞 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/CayoHenrique250/foodboxd/issues)
- Contact the development team
- Check the [documentation](#-api-documentation)

---

<div align="center">

**⭐ If you liked this project, consider giving it a star!**

Made with ❤️ by the FoodBoxd Team

</div>
