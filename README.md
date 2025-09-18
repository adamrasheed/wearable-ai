# Wearable Weather App

A Next.js application that provides intelligent weather-based clothing recommendations using AI. Simply describe your location in natural language, and get personalized clothing suggestions based on the weather forecast.

## Working Website: [Click here](https://wearable-ai-lake.vercel.app/)

## Features

- 🌍 **Smart Location Detection**: Describe your location naturally (e.g., "near the Golden Gate Bridge", "downtown Seattle", or "I love having carne asada burritos after surfing")
- 🌤️ **Weather Integration**: Real-time weather data from OpenWeather API
- 👕 **AI-Powered Recommendations**: Get clothing suggestions for casual, work, and formal occasions

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- OpenWeather API key
- OpenAI API key

### Environment Setup

1. **Add your API keys** to `.env.local`:

```env
# Required: OpenWeather API Key
# Get your free API key at: https://openweathermap.org/api
OPENWEATHER_API_KEY=your_openweather_api_key_here

# Required: OpenAI API Key
# Get your API key at: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Base URL (defaults to http://localhost:3000)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. **Install dependencies**:

```bash
yarn install
```

4. **Run the development server**:

```bash
yarn dev
```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variable Validation

The app includes built-in environment variable validation in `src/lib/env.ts`. This ensures:

- All required API keys are present
- API keys are in the correct format
- URLs are properly formatted
- Clear error messages if configuration is missing

If you see environment variable errors, check that your `.env.local` file is properly configured.

## API Keys Setup

### OpenWeather API

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to the API keys section
4. Copy your API key and add it to `.env.local`

### OpenAI API

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the key and add it to `.env.local`

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   └── page.tsx          # Main page
├── lib/                   # Utility libraries
│   ├── env.ts            # Environment variable validation
│   ├── constants.ts      # App constants
│   └── utils.ts          # Helper functions
├── services/              # External service integrations
│   └── ai.ts             # OpenAI integration
└── types/                 # TypeScript type definitions
```

### Project Improvements

I spent around 4 hours building this out, most of the time being used to determine the final data model of the recommendations. If I were to spend more time on the project, I'd work on the following:

- Adding the calculated weather lat and lon to the browser url query parameters so that we can persist the location data on reload, and on reload it would only require a single call to the OpenAI api
- Adding auth and creating creating a database that adds the users locations
- Utilizing Redis for the location cache, would should speed things up, especially as more users add in more locations
- Adding actual items of clothing from a marketplace, and allowing a user to upvote teh recommendations. We would then add the user-liked items (along with metdata such as the weather it was recommended for etc) on the db and the nuse that to recommend similar items in future forecasted reccomendations
- Limit tries to only 10/queries per day for fee users. Add $5/month subscription fee for higher usage. Premium features could also include adding users favorite brands during sign up for more personalized recommendations
