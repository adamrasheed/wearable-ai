# Wearable Weather App

A Next.js application that provides intelligent weather-based clothing recommendations using AI. Simply describe your location in natural language, and get personalized clothing suggestions based on the weather forecast.

## Features

- 🌍 **Smart Location Detection**: Describe your location naturally (e.g., "near the Golden Gate Bridge", "downtown Seattle")
- 🌤️ **Weather Integration**: Real-time weather data from OpenWeather API
- 👕 **AI-Powered Recommendations**: Get clothing suggestions for casual, work, and formal occasions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- OpenWeather API key
- OpenAI API key

### Environment Setup

1. **Create a `.env.local` file** in the root directory:

```bash
cp .env.example .env.local
```

2. **Add your API keys** to `.env.local`:

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
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. **Run the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
