export default function RuleBuilder({ rules, setRules, logic, setLogic }) {
  const addRule = () => setRules([...rules, { field: '', operator: '', value: '' }]);

  const updateRule = (i, field, value) => {
    const updated = [...rules];
    updated[i][field] = value;
    setRules(updated);
  };

  const removeRule = (i) => {
    const updated = [...rules];
    updated.splice(i, 1);
    setRules(updated);
  };

  return (
    <div className="bg-white p-4 shadow rounded space-y-4">
      <h2 className="font-semibold text-lg">Define Rules</h2>
      <select value={logic} onChange={e => setLogic(e.target.value)} className="border p-2 rounded">
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>

      {rules.map((rule, i) => (
        <div key={i} className="flex gap-2">
          <select value={rule.field} onChange={e => updateRule(i, 'field', e.target.value)} className="border p-2 rounded w-1/3">
            <option value="">Field</option>
            <option value="totalSpend">Total Spend</option>
            <option value="visits">Visits</option>
            <option value="lastActive">Last Active Days Ago</option>
          </select>
          <select value={rule.operator} onChange={e => updateRule(i, 'operator', e.target.value)} className="border p-2 rounded w-1/4">
            <option value="">Op</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="=">=</option>
          </select>
          <input
            value={rule.value}
            onChange={e => updateRule(i, 'value', e.target.value)}
            className="border p-2 rounded w-1/3"
            type="number"
          />
          <button onClick={() => removeRule(i)} className="text-red-600">X</button>
        </div>
      ))}

      <button onClick={addRule} className="bg-blue-600 text-white px-4 py-2 rounded">
        + Add Rule
      </button>
    </div>
  );
}
