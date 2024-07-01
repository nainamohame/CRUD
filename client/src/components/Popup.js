const Popup = ({setModalOpen, deleteForm}) => {
  return (
    <div className='modalBoxContainer'>
        <div className='modalBox'>
            <div>Are you sure to delete this form ?</div>
            <div className='button-group'>
                <button className='cancel-btn' onClick={()=>setModalOpen(false)}>Cancel</button>
                <button className='ok-btn' onClick={deleteForm}>Ok</button>
            </div>
        </div>
    </div>
  )
}

export default Popup;