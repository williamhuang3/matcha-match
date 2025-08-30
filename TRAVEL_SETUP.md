# Travel Integration Setup

## Google Flights & Tours Search

This app now includes integration with Google Flights API and search functionality for matcha tours in Japan.

### Setup Instructions

1. **Get a SerpApi Account**
   - Visit [SerpApi.com](https://serpapi.com/)
   - Sign up for an account (they offer free tier with limited searches)
   - Get your API key from the dashboard

2. **Configure Environment Variables**
   - Add your SerpApi key to `.env`:
   ```
   SERPAPI_KEY=your_actual_serpapi_key_here
   ```

3. **Features Added**
   - **Flight Search**: Search for flights from major US airports (JFK, LAX, ORD) to Tokyo airports (NRT, HND)
   - **Tour Search**: Find matcha tours, tea ceremonies, and cultural experiences in the user's preferred region
   - **Integrated UI**: New travel section on the results page with flight prices and tour recommendations

### API Endpoints Created

- `/api/flights` - Search for flights using Google Flights API
- `/api/search-tours` - Search for matcha tours and experiences

### Components Added

- `FlightSearch.tsx` - Interactive flight search with date picker and results
- `MatchaTours.tsx` - Search and display matcha tours and experiences

### How It Works

1. When users see their matcha results, they'll also see a new "Visit Your Matcha Region" section
2. The flight search lets them pick dates and shows real flight prices to Tokyo
3. The tours section automatically searches for matcha experiences in their recommended region
4. All results link to external booking sites or Google searches for more details

### Demo Mode

If no SerpApi key is provided, the components will show fallback content with popular tour suggestions and links to Google Flights.
