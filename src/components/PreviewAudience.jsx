import { useEffect, useState } from 'react';
import { previewAudienceSize } from '../api/api';

export default function PreviewAudience({ rules, logic }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchSize = async () => {
      if (rules.length === 0) {
        setCount(null);
        return;
      }

      try {
        const data = await previewAudienceSize({ rules, logic });
        setCount(data.count);
      } catch (err) {
        console.error('Error fetching audience size:', err);
        setCount('Error');
      }
    };

    fetchSize();
  }, [rules, logic]);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold text-lg">Audience Preview</h2>
      {count === null ? (
        <p className="text-gray-500">Add rules to preview audience size.</p>
      ) : (
        <p>Estimated audience size: <strong>{count}</strong></p>
      )}
    </div>
  );
}
