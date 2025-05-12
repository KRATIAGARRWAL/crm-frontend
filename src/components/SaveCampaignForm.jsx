import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSegment } from '../api/api'; 

export default function SaveCampaignForm({ rules, logic, message }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!name.trim() || rules.length === 0) {
      setError("Segment name and at least one rule are required.");
      return;
    }

    try {
      const response = await saveSegment({ name, rules, logic, message });


      if (!response.ok && response.status) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to save segment');
      }

      const data = await response.json(); // extract saved segment
      console.log('Segment saved:', data);

      navigate('/campaigns');
    } catch (err) {
      console.error('Save segment error:', err.message);
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded space-y-4">
      <h2 className="font-semibold text-lg">Save Segment</h2>
      <input
        placeholder="Segment Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">
        Save & Create Campaign
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
