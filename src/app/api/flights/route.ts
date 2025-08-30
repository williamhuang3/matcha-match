import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      departure_id = 'JFK,LAX,ORD',
      arrival_id = 'NRT,HND',
      outbound_date,
      return_date,
      currency = 'USD',
      adults = 1 
    } = body;

    // You'll need to get your SerpApi key from environment variables
    const SERPAPI_KEY = process.env.SERPAPI_KEY;
    
    if (!SERPAPI_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      engine: 'google_flights',
      departure_id,
      arrival_id,
      outbound_date,
      return_date,
      currency,
      adults: adults.toString(),
      hl: 'en',
      api_key: SERPAPI_KEY,
    });

    const response = await fetch(`https://serpapi.com/search.json?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add a 20 second timeout for the external API call
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      console.error(`SerpApi HTTP error: ${response.status} ${response.statusText}`);
      throw new Error(`SerpApi request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if SerpApi returned an error
    if (data.error) {
      console.error('SerpApi error:', data.error);
      throw new Error(`SerpApi error: ${data.error}`);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Flight search error:', error);
    
    if (error instanceof Error) {
      if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Flight search request timed out. Please try again.' },
          { status: 504 }
        );
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to search flights' },
      { status: 500 }
    );
  }
}
