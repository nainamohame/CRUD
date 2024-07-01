import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RationaleForm() {
  const [RationaleSummary, setRationaleSummary] = useState('');
  const [RationaleText, setRationaleText] = useState('');
  const [Enable, setEnable] = useState(false);
  const [GroupID, setGroupID] = useState('');
  const [Sequence, setSequence] = useState('');

  const navigate = useNavigate()

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      rationaleSummary: RationaleSummary,
      rationaleText: RationaleText,
      enable: Enable,
      groupID: GroupID,
      sequence: Sequence,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/form', formData);
      const resData = await response.data;
      console.log('Form submitted successfully:', resData);
      navigate('/forms')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <form onSubmit={formSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Rationale Summary</label>
          <input
            type="text"
            name="RationaleSummary"
            value={RationaleSummary}
            onChange={(e) => setRationaleSummary(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rationale Text</label>
          <textarea
            name="RationaleText"
            value={RationaleText}
            onChange={(e) => setRationaleText(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-2">Enable</label>
          <input
            type="checkbox"
            name="Enable"
            checked={Enable}
            onChange={(e) => setEnable(e.target.checked)}
            className="form-checkbox"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Group ID</label>
          <input
            type="number"
            name="GroupID"
            value={GroupID}
            onChange={(e) => setGroupID(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Sequence</label>
          <input
            type="number"
            name="Sequence"
            value={Sequence}
            onChange={(e) => setSequence(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default RationaleForm;
