import Layout from '../components/Layout.jsx';
import RuleBuilder from '../components/RuleBuilder.jsx';
import PreviewAudience from '../components/PreviewAudience.jsx';
import SaveCampaignForm from '../components/SaveCampaignForm.jsx';
import { useState } from 'react';

export default function SegmentBuilder() {
  const [rules, setRules] = useState([]);
  const [logic, setLogic] = useState('AND');

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Create Audience Segment</h1>
        <RuleBuilder rules={rules} setRules={setRules} logic={logic} setLogic={setLogic} />
        <PreviewAudience rules={rules} logic={logic} />
        <SaveCampaignForm rules={rules} logic={logic} />
      </div>
    </Layout>
  );
}
