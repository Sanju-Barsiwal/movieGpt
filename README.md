# MovieGPT - AI-Powered Movie Recommendation Platform

## Overview

MovieGPT is an intelligent movie discovery platform that combines the power of AI with The Movie Database (TMDB) API to deliver personalized movie recommendations. Users can describe what they're in the mood to watch, and the AI will suggest relevant movies with detailed information, trailers, and browsing capabilities.

## Problem Solution

### Challenge
Create an engaging movie discovery experience that goes beyond traditional search and filtering to understand user preferences in natural language.

### Solution
- **AI-Powered Search**: Natural language processing to understand movie preferences and moods
- **Smart Recommendations**: Integration with OpenRouter AI to generate contextual movie suggestions
- **Rich Movie Data**: Real-time data from TMDB API with posters, ratings, and descriptions
- **User Authentication**: Secure Firebase authentication with personalized experiences
- **Responsive Design**: Modern glassmorphism UI with smooth animations and mobile-first approach
- **Multi-language Support**: Language preference system for international audiences

## Tech Stack

- **React 18** - Component-based UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **Firebase Auth** - User authentication and management
- **OpenRouter AI** - AI-powered movie recommendations
- **TMDB API** - Movie database and metadata
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Lucide React** - Icon library
- **React Router** - Client-side routing

## Project Structure

```
src/
├── components/
│   ├── GptSearchBar.tsx         # AI search input with suggestions
│   ├── GptMovieSuggestions.tsx  # Display AI recommendations
│   ├── MovieList.tsx            # Horizontal movie list component
│   ├── MovieCard.tsx            # Individual movie card
│   ├── Header.tsx               # Navigation header
│   ├── Logo.tsx                 # Brand logo component
│   ├── BackgroundEffects.tsx    # Visual effects
│   └── ui/                      # shadcn/ui components
├── pages/
│   ├── Login.tsx                # Authentication page
│   ├── Browse.tsx               # Main movie browsing page
│   ├── Watch.tsx                # Movie detail/watch page
│   └── NotFound.tsx             # 404 page
├── utils/
│   ├── firebase.ts              # Firebase configuration
│   ├── OpenAI.ts                # OpenRouter AI client
│   ├── constants.ts             # App constants and API keys
│   ├── appStore.ts              # Redux store configuration
│   ├── userSlice.ts             # User state management
│   ├── gptSlice.ts              # GPT search state
│   ├── configSlice.ts           # App configuration
│   ├── Validate.ts              # Form validation utilities
│   └── languageConstants.ts     # Multi-language support
└── types/                       # TypeScript type definitions
```

## How It Works

### 1. User Authentication
- Sign up with email/password via Firebase
- Secure session management
- Protected routes for authenticated users
- User profile with avatar and display name

### 2. AI Movie Search
- Natural language input (e.g., "action movies with cars")
- AI processes query and suggests 5 relevant movies
- Searches TMDB for exact movie matches
- Displays results with posters and metadata

### 3. Movie Browsing
- Browse trending, popular, and top-rated movies
- Horizontal scrolling movie lists by category
- Click movies to view detailed information
- Watch trailers and view cast/crew

### 4. Personalization
- Language preference selection
- Search history (via Redux state)
- Personalized recommendations based on queries
- User-specific authentication state

## Building the Code

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Firebase account (for authentication)
- TMDB API key
- OpenRouter API key

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd moviegpt

# Install dependencies
npm install
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Build for development (with source maps)
npm run build:dev
```

### Build Output
- Minified JavaScript bundles
- Optimized CSS with Tailwind
- Tree-shaken dependencies
- Ready for deployment to Vercel, Netlify, or any static host

## Running the Application

### Development Mode

```bash
# Start development server with hot reload
npm run dev
```

The app will be available at:
- Local: `http://localhost:3000`
- Network: `http://192.168.1.2:3000`

### Preview Production Build

```bash
# Build and preview production version
npm run build
npm run preview
```

### Testing the Features

1. **User Authentication**
   - Navigate to the login page
   - Sign up with email and password
   - Sign in with existing credentials
   - Automatic redirect to browse page

2. **Browse Movies**
   - View trending movies on homepage
   - Scroll through different categories
   - Click movie cards to view details
   - Watch trailers and read descriptions

3. **AI Search**
   - Click the search/GPT button in header
   - Enter natural language query (e.g., "funny romantic movies")
   - View AI-generated recommendations
   - Results display with exact TMDB matches

4. **Language Support**
   - Select language from header dropdown
   - Interface updates to selected language
   - Search placeholder and labels change

5. **Responsive Testing**
   - Test on mobile devices (320px+)
   - Verify tablet layouts (768px+)
   - Check desktop experience (1024px+)
   - Test touch interactions and gestures

## Key Features

- ✅ AI-powered natural language movie search
- ✅ Real-time TMDB API integration
- ✅ Firebase authentication with protected routes
- ✅ Redux Toolkit state management
- ✅ Multi-language interface support
- ✅ Glassmorphism design with animations
- ✅ Fully responsive mobile-first design
- ✅ Type-safe with TypeScript
- ✅ Movie trailers and detailed information
- ✅ Horizontal scrolling movie lists
- ✅ Loading states and error handling
- ✅ Secure environment variable management

## Design Principles

1. **Modern UI**: Glassmorphism effects, smooth animations, and contemporary design
2. **Performance**: Optimized API calls, lazy loading, and efficient rendering
3. **Accessibility**: Keyboard navigation, ARIA labels, and semantic HTML
4. **Security**: Protected routes, environment variables, and secure authentication
5. **User Experience**: Intuitive navigation, clear feedback, and responsive interactions

## API Integration

### TMDB API
- **Movie Search**: Query movies by title
- **Movie Details**: Get full information including cast, crew, and trailers
- **Trending Movies**: Fetch currently popular movies
- **Categories**: Access movies by genre, rating, and popularity

### OpenRouter AI
- **Model Used**: `google/gemini-2.0-flash-exp:free`
- **Purpose**: Generate movie recommendations based on user queries
- **Format**: Returns comma-separated list of 5 movie titles
- **Fallback**: Error handling with user-friendly messages

### Firebase Authentication
- **Email/Password**: Standard authentication flow
- **User Profile**: Display name and photo URL storage
- **Session Management**: Automatic token refresh
- **Protected Routes**: Auth state verification

## Future Enhancements

- User watchlists and favorites
- Movie rating and review system
- Social features (share recommendations)
- Advanced filters (year, genre, rating)
- Personalized recommendation algorithm
- Integration with streaming services
- Movie collection management
- Collaborative watchlists
- Push notifications for new releases
- Dark/light theme toggle

## Troubleshooting

### Common Issues

1. **CORS Error on Port Mismatch**
   - Ensure dev server runs on configured port
   - Update Firebase authorized domains
   - Check VITE port configuration

2. **AI Model Not Found**
   - Verify OpenRouter API key is valid
   - Use correct model name: `google/gemini-2.0-flash-exp:free`
   - Check OpenRouter service status

3. **TMDB Results Not Showing**
   - Confirm TMDB API key is active
   - Check network requests in DevTools
   - Verify API rate limits not exceeded

4. **Authentication Issues**
   - Clear browser cache and localStorage
   - Check Firebase project configuration
   - Verify Firebase API key is correct

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- **TMDB** for comprehensive movie database
- **OpenRouter** for AI model access
- **Firebase** for authentication services
- **shadcn/ui** for beautiful components
- **Tailwind CSS** for styling utilities# movie-GPT
