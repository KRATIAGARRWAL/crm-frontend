import Layout from '../components/Layout';
import RuleBuilder from '../components/RuleBuilder.jsx';
import PreviewAudience from '../components/PreviewAudience.jsx';
import SaveCampaignForm from '../components/SaveCampaignForm.jsx';
import { useState } from 'react';
import { generateMessages } from '../api/api.jsx';


export default function SegmentBuilder() {
  const [rules, setRules] = useState([]);
  const [logic, setLogic] = useState('AND');
  const [objective, setObjective] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState('');

  const handleGenerateMessages = async () => {
    try {
      const msgs = await generateMessages(objective);
      setMessages(msgs);
    } catch (err) {
      alert('Could not generate messages.' + err);
    }
  };


  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Create Audience Segment</h1>
        <RuleBuilder rules={rules} setRules={setRules} logic={logic} setLogic={setLogic} />
        <PreviewAudience rules={rules} logic={logic} />

        <div className="mt-4">
          <textarea
            className="w-full border p-2"
            placeholder=" write your own message..."
            value={selectedMessage}
            onChange={(e) => setSelectedMessage(e.target.value)}
          />
        </div>
        <input value={objective} onChange={e => setObjective(e.target.value)} placeholder="Campaign Objective" />
        <button onClick={handleGenerateMessages}>Generate Messages</button>
        <ul className="space-y-2">
          {messages.map((msg, idx) => (
            <li key={idx}>
              <label className="flex items-start space-x-2">
                <input
                  type="radio"
                  name="message"
                  value={msg}
                  checked={selectedMessage === msg}
                  onChange={() => setSelectedMessage(msg)}
                />
                <span>{msg}</span>
              </label>
            </li>
          ))}
        </ul>


        <SaveCampaignForm
          rules={rules}
          logic={logic}
          message={selectedMessage}
        />

      </div>
    </Layout>
  );
}
