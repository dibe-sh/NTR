import { useState, useEffect } from 'react';

interface ApiHealth {
  status: string;
  timestamp: string;
  service: string;
}

function App() {
  const [apiMessage, setApiMessage] = useState<string>('');
  const [apiHealth, setApiHealth] = useState<ApiHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hello message
        const helloResponse = await fetch('http://localhost:3001');
        const helloData = await helloResponse.text();
        setApiMessage(helloData);

        // Fetch health status
        const healthResponse = await fetch('http://localhost:3001/health');
        const healthData = await healthResponse.json();
        setApiHealth(healthData);
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setApiMessage('Failed to connect to API');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            🚀 NTR
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* API Connection Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                API Connection
              </h2>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Message:</span> {apiMessage}
                  </p>
                  {apiHealth && (
                    <>
                      <p className="text-gray-600">
                        <span className="font-medium">Status:</span>{' '}
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            apiHealth.status === 'OK'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {apiHealth.status}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Service:</span>{' '}
                        {apiHealth.service}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Project Stack
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-gray-600">React + TypeScript</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-600">Tailwind CSS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-600">Vite</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600">NestJS API</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-600">Turborepo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Frontend:{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">
                http://localhost:3000
              </code>
              {' | '}
              Backend:{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">
                http://localhost:3001
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
