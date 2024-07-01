import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Popup from './Popup';

const FormsView = () => {

    const [data, setData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const formData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/form')
            const resData = await response.data.form
            setData(resData)
            console.log(resData)
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const deleteForm = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/form/${deleteId}`)
            const reponseData = response.data
            console.log(reponseData)
            formData()
            setModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        formData()
    }, [])

    return (
        <div className='form'>
            <h5>Rationale List</h5>
            
            {data.length === 0 && <div className='nodata'>No Data Found</div> }
            {
                data?.map((form) => (
                    <div className='formContainer' key={form._id}>
                        <div className="icons">
                            <Link to={`/forms/${form._id}`}>
                                <FaEdit />
                            </Link>
                            <FaTrash onClick={() => {
                                setModalOpen(true)
                                setDeleteId(form._id)
                            }} />
                        </div>
                        <div className='formChildBox'>
                            <b>Rationale Summary : </b>
                            <div>{form.rationaleSummary} </div>
                        </div>
                        <div className='formChildBox'>
                            <b>Rationale Text : </b>
                            <div>{form.rationaleText}</div>
                        </div>
                        <div className='formChildBox'>
                            <b>Enable : </b>
                            <div><input type='checkbox' checked={form.enable} readOnly /></div>
                        </div>
                        <div className='formChildBox'>
                            <b>Group Id : </b>
                            <div>{form.groupID}</div>
                        </div>
                        <div className='formChildBox'>
                            <b>Sequence : </b>
                            <div>{form.sequence}</div>
                        </div>
                    </div>
                ))
            }
            {modalOpen &&
                <Popup setModalOpen={setModalOpen} deleteForm={deleteForm} />
            }
        </div>
    )
}

export default FormsView;