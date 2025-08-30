'use client';

import { useState, useEffect } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Flight {
  airline: string;
  airline_logo: string;
  price: number;
  total_duration: number;
  departure_airport: {
    name: string;
    id: string;
    time: string;
  };
  arrival_airport: {
    name: string;
    id: string;
    time: string;
  };
  flights: Array<{
    departure_airport: {
      name: string;
      id: string;
      time: string;
    };
    arrival_airport: {
      name: string;
      id: string;
      time: string;
    };
    duration: number;
    airline: string;
    flight_number: string;
  }>;
  layovers?: Array<{
    duration: number;
    name: string;
    id: string;
  }>;
}

interface FlightSearchProps {
  regionName: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FlightSearch: React.FC<FlightSearchProps> = ({ regionName }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchDate, setSearchDate] = useState('');

  // Set default search date to 30 days from now

  // Set default search date to 30 days from now
  useEffect(() => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    setSearchDate(futureDate.toISOString().split('T')[0]);
  }, []);

  const searchFlights = async () => {
    if (!searchDate) return;

    setLoading(true);
    setError(null);

    try {
      // Calculate return date (7 days after departure)
      const departureDate = new Date(searchDate);
      const returnDate = new Date(departureDate);
      returnDate.setDate(departureDate.getDate() + 7);
      
      const returnDateStr = returnDate.toISOString().split('T')[0];

      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          departure_id: 'JFK,LAX,ORD', // Major US airports
          arrival_id: 'NRT,HND', // Tokyo airports (Narita and Haneda)
          outbound_date: searchDate,
          return_date: returnDateStr,
          currency: 'USD',
          adults: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }

      const data = await response.json();
      
      // Combine best_flights and other_flights, limit to top 3
      const allFlights = [...(data.best_flights || []), ...(data.other_flights || [])];
      setFlights(allFlights.slice(0, 3));
    } catch (err) {
      setError('Unable to fetch flights. Please try again later.');
      console.error('Flight search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-matcha-taupe mb-2">
            Departure Date
          </label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-matcha-med/30 rounded-lg focus:ring-2 focus:ring-matcha-med focus:border-transparent"
          />
        </div>
        <button
          onClick={searchFlights}
          disabled={loading || !searchDate}
          className="w-full bg-matcha-med text-white py-2 px-4 rounded-lg hover:bg-matcha-taupe disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Searching Flights...' : 'Search Flights to Tokyo'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-matcha-med rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-matcha-med rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-matcha-med rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      )}

      {/* Flight Results */}
      {flights.length > 0 && (
        <div className="space-y-3">
          {flights.map((flight, index) => (
            <div key={index} className="border border-matcha-med/20 rounded-lg p-4 hover:bg-matcha-offwhite/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  {flight.airline_logo && (
                    <Image 
                      src={flight.airline_logo} 
                      alt={flight.airline}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-matcha-taupe text-sm">
                      {flight.flights?.[0]?.departure_airport?.id} → {flight.flights?.[flight.flights.length - 1]?.arrival_airport?.id}
                    </p>
                    <p className="text-xs text-matcha-taupe/70">
                      {flight.layovers && flight.layovers.length > 0 
                        ? `${flight.layovers.length} stop${flight.layovers.length > 1 ? 's' : ''}`
                        : 'Direct'
                      }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-matcha-taupe">
                    ${flight.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-matcha-taupe/70">
                    {formatDuration(flight.total_duration)}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs text-matcha-taupe/70">
                <span>
                  {flight.flights?.[0]?.departure_airport?.time && 
                    formatDate(flight.flights[0].departure_airport.time)
                  }
                </span>
                <a
                  href={`https://www.google.com/travel/flights`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-matcha-med hover:text-matcha-taupe transition-colors"
                >
                  <span>Book</span>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
          
          <div className="text-center pt-2">
            <a
              href="https://www.google.com/travel/flights"
              target="_blank"
              rel="noopener noreferrer"
              className="text-matcha-med hover:text-matcha-taupe text-sm font-medium inline-flex items-center space-x-1"
            >
              <span>View all flights</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && flights.length === 0 && searchDate && (
        <div className="text-center py-6 text-matcha-taupe/70">
          <p>Click &ldquo;Search Flights&rdquo; to find flights to Tokyo</p>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
