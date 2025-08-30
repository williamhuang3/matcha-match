'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface TourResult {
  title: string;
  link: string;
  snippet: string;
  displayed_link?: string;
  price?: string;
  rating?: number;
}

interface MatchaToursProps {
  regionName: string;
}

const MatchaTours: React.FC<MatchaToursProps> = ({ regionName }) => {
  const [tours, setTours] = useState<TourResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTours = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const query = `matcha tea ceremony tour ${regionName} Japan`;
      const response = await fetch('/api/search-tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          location: regionName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to search tours');
      }

      const data = await response.json();
      setTours(data.organic_results?.slice(0, 4) || []);
    } catch (err) {
      setError('Unable to search tours. Please try again later.');
      console.error('Tour search error:', err);
    } finally {
      setLoading(false);
    }
  }, [regionName]);

  // Auto-search on component mount
  useEffect(() => {
    if (regionName) {
      searchTours();
    }
  }, [regionName, searchTours]);

  const getTourType = (title: string, snippet: string) => {
    const text = (title + ' ' + snippet).toLowerCase();
    if (text.includes('tea ceremony') || text.includes('tea experience')) return '🍵 Tea Ceremony';
    if (text.includes('temple') || text.includes('shrine')) return '⛩️ Temple Visit';
    if (text.includes('farm') || text.includes('plantation')) return '🌱 Farm Tour';
    if (text.includes('workshop') || text.includes('class')) return '🎨 Workshop';
    if (text.includes('cultural') || text.includes('traditional')) return '🏛️ Cultural';
    return '🗾 Experience';
  };

  const popularTours = [
    {
      title: 'Traditional Matcha Tea Ceremony in Kyoto',
      snippet: 'Experience authentic Japanese tea ceremony with premium matcha from Uji region. Learn the art of preparing and serving matcha in a traditional setting.',
      link: 'https://www.google.com/search?q=traditional+matcha+tea+ceremony+kyoto',
      type: '🍵 Tea Ceremony'
    },
    {
      title: 'Matcha Farm Tour in Shizuoka',
      snippet: 'Visit organic matcha farms in the famous Shizuoka prefecture. See how matcha is grown, harvested, and processed from leaf to powder.',
      link: 'https://www.google.com/search?q=matcha+farm+tour+shizuoka',
      type: '🌱 Farm Tour'
    },
    {
      title: 'Matcha Making Workshop',
      snippet: 'Learn to stone-grind your own matcha powder and participate in traditional Japanese tea ceremony practices.',
      link: 'https://www.google.com/search?q=matcha+making+workshop+japan',
      type: '🎨 Workshop'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Search Button */}
      <button
        onClick={searchTours}
        disabled={loading}
        className="w-full bg-matcha-med text-white py-2 px-4 rounded-lg hover:bg-matcha-taupe disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Searching Tours...' : `Find Matcha Tours in ${regionName}`}
      </button>

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

      {/* Tour Results */}
      {tours.length > 0 ? (
        <div className="space-y-3">
          {tours.map((tour, index) => (
            <div key={index} className="border border-matcha-med/20 rounded-lg p-4 hover:bg-matcha-offwhite/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-matcha-med/20 text-matcha-taupe px-2 py-1 rounded-full">
                      {getTourType(tour.title, tour.snippet)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-matcha-taupe text-sm mb-1 line-clamp-2">
                    {tour.title}
                  </h4>
                  <p className="text-xs text-matcha-taupe/70 line-clamp-2 mb-2">
                    {tour.snippet}
                  </p>
                  {tour.displayed_link && (
                    <p className="text-xs text-matcha-med">
                      {tour.displayed_link}
                    </p>
                  )}
                </div>
                <a
                  href={tour.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 flex-shrink-0 p-2 text-matcha-med hover:text-matcha-taupe hover:bg-matcha-med/10 rounded-lg transition-colors"
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Popular Tours Fallback */
        !loading && (
          <div className="space-y-3">
            <p className="text-sm text-matcha-taupe/70 mb-3">
              Popular matcha experiences in Japan:
            </p>
            {popularTours.map((tour, index) => (
              <div key={index} className="border border-matcha-med/20 rounded-lg p-4 hover:bg-matcha-offwhite/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs bg-matcha-med/20 text-matcha-taupe px-2 py-1 rounded-full">
                        {tour.type}
                      </span>
                    </div>
                    <h4 className="font-semibold text-matcha-taupe text-sm mb-1">
                      {tour.title}
                    </h4>
                    <p className="text-xs text-matcha-taupe/70 line-clamp-2 mb-2">
                      {tour.snippet}
                    </p>
                  </div>
                  <a
                    href={tour.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 flex-shrink-0 p-2 text-matcha-med hover:text-matcha-taupe hover:bg-matcha-med/10 rounded-lg transition-colors"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Additional Resources */}
      <div className="pt-4 border-t border-matcha-med/20">
        <p className="text-xs text-matcha-taupe/70 mb-2">More resources:</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://www.google.com/search?q=matcha+tea+ceremony+${regionName}+Japan`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-matcha-med hover:text-matcha-taupe"
          >
            Tea Ceremonies
          </a>
          <span className="text-xs text-matcha-taupe/40">•</span>
          <a
            href={`https://www.google.com/search?q=matcha+farm+tour+${regionName}+Japan`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-matcha-med hover:text-matcha-taupe"
          >
            Farm Tours
          </a>
          <span className="text-xs text-matcha-taupe/40">•</span>
          <a
            href={`https://www.google.com/search?q=${regionName}+Japan+travel+guide`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-matcha-med hover:text-matcha-taupe"
          >
            Travel Guide
          </a>
        </div>
      </div>
    </div>
  );
};

export default MatchaTours;
