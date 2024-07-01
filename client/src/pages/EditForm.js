import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditForm() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [rationaleSummary, setRationaleSummary] = useState('');
    const [rationaleText, setRationaleText] = useState('');
    const [enable, setEnable] = useState(false);
    const [groupID, setGroupID] = useState('');
    const [sequence, setSequence] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/form/${id}`);
            const resData = response.data.form;
            console.log(resData);
            setRationaleSummary(resData.rationaleSummary || '');
            setRationaleText(resData.rationaleText || '');
            setEnable(resData.enable || false);
            setGroupID(resData.groupID || '');
            setSequence(resData.sequence || '');
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, fetchData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            rationaleSummary: rationaleSummary,
            rationaleText: rationaleText,
            enable: enable,
            groupID: groupID,
            sequence: sequence,
        };

        try {
            const response = await axios.put(`http://localhost:8000/api/v1/form/${id}`, formData);
            console.log('Form submitted successfully:', response.data);
            navigate('/forms')
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='editform'>
            <div className='edit-heading'>Edit Form</div>
            <div className="p-4 shadow rounded">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Rationale Summary</label>
                    <input
                        type="text"
                        name="RationaleSummary"
                        value={rationaleSummary}
                        onChange={(e) => setRationaleSummary(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Rationale Text</label>
                    <textarea
                        name="RationaleText"
                        value={rationaleText}
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
                        checked={enable}
                        onChange={(e) => setEnable(e.target.checked)}
                        className="form-checkbox"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Group ID</label>
                    <input
                        type="number"
                        name="GroupID"
                        value={groupID}
                        onChange={(e) => setGroupID(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Sequence</label>
                    <input
                        type="number"
                        name="Sequence"
                        value={sequence}
                        onChange={(e) => setSequence(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="flex space-x-2">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Save
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default EditForm;