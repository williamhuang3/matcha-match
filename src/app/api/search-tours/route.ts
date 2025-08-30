import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, location } = body;

    // You'll need to get your SerpApi key from environment variables
    const SERPAPI_KEY = process.env.SERPAPI_KEY;
    
    if (!SERPAPI_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const searchQuery = query || `matcha tea ceremony tour ${location} Japan`;

    const params = new URLSearchParams({
      engine: 'google',
      q: searchQuery,
      gl: 'us',
      hl: 'en',
      num: '10',
      api_key: SERPAPI_KEY,
    });

    const response = await fetch(`https://serpapi.com/search.json?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`SerpApi request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter results to focus on tours, experiences, and travel-related content
    const filteredResults = data.organic_results?.filter((result: {
      title: string;
      snippet: string;
    }) => {
      const text = (result.title + ' ' + result.snippet).toLowerCase();
      return text.includes('tour') || 
             text.includes('experience') || 
             text.includes('tea ceremony') || 
             text.includes('cultural') || 
             text.includes('travel') ||
             text.includes('visit') ||
             text.includes('temple') ||
             text.includes('traditional');
    }) || [];

    return NextResponse.json({
      organic_results: filteredResults,
      search_metadata: data.search_metadata
    });
  } catch (error) {
    console.error('Tour search error:', error);
    return NextResponse.json(
      { error: 'Failed to search tours' },
      { status: 500 }
    );
  }
}
