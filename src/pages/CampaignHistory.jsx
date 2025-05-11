import { useEffect, useState } from 'react';
import { fetchSegments } from '../api/api';
import Layout from '../components/Layout';

export default function CampaignHistory() {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSegments = async () => {
      try {
        const data = await fetchSegments();
        setSegments(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch segments:", err);
      }
    };

    getSegments();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Campaign History</h1>

        {loading ? (
          <p>Loading campaigns...</p>
        ) : segments.length === 0 ? (
          <p>No campaigns found.</p>
        ) : (
          <div className="space-y-4">
            {segments.map((seg) => (
              <div key={seg._id} className="p-4 bg-white shadow rounded-lg">
                <h2 className="text-lg font-semibold">{seg.name}</h2>
                <p className="text-sm text-gray-600">
                  Created on: {new Date(seg.createdAt).toLocaleString()}
                </p>
                <p className="mt-1 text-gray-800">
                  <strong>Rules:</strong> {seg.rules.length} rule(s) — Logic: <code>{seg.logic}</code>
                </p>

                {/* Placeholder delivery stats */}

                <div className="mt-2 text-sm text-gray-500">
                  <p>Audience Size: {seg.audienceSize ?? '—'}</p>
                  <p>Sent: {seg.sent ?? '—'}</p>
                  <p>Failed: {seg.failed ?? '—'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
