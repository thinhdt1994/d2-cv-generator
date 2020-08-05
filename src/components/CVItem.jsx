import React from 'react';
import DataContext from '../contexts/DataContext';

function CVItem(props) {
    function editCV(cvId, currentCv, setCurrentCv) {
        if (currentCv === null) {
            let cv = JSON.parse(localStorage.getItem('cv-' + cvId));
            setCurrentCv(cv);
        } else {
            if (cvId !== currentCv.id) {
                let cv = JSON.parse(localStorage.getItem('cv-' + cvId));
                setCurrentCv(cv);
            }
        }
    }

    function deleteCV(cvId, currentCv, setCurrentCv, updateValue, setUpdateValue) {
        localStorage.removeItem('cv-' + cvId);
        if (currentCv !== null) {
            if (cvId === currentCv.id) {
                setCurrentCv(null);
            }
        }
        setUpdateValue(!updateValue);
    }

    return (
        <DataContext.Consumer>
            {
                ({currentCv,setCurrentCv, updateValue, setUpdateValue}) => (
                    <>
                        <div className="col-lg-3 col-md-4 col-sm-2 template  mb-5">
                            <div className="template__preview">
                                <img src={process.env.REACT_APP_ROOT_URL + props.cv.thumbnail} alt={`cv-${props.cv.id}`} className="template__thumbnail"/>
                                {
                                    (currentCv !== null && currentCv.id === props.cv.id) && (
                                        <div className="template__status">
                                            <div className="template__overlay"></div>
                                            <i className="fa fa-check template__selected-icon" aria-hidden="true"></i>
                                        </div>
                                    )
                                }
                            </div>
                            <p className="template__name">{props.cv.name}</p>
                            <p className="template__description">
                                {props.cv.description}
                            </p>
                            <div className="text-center mb-5">
                                <button className="btn btn-success mr-5" onClick={() => {editCV(props.cv.id, currentCv, setCurrentCv)}}><i className="fa fa-pencil" aria-hidden="true"></i> Sửa</button>
                                <button className="btn btn-danger" onClick={() => {deleteCV(props.cv.id, currentCv, setCurrentCv, updateValue, setUpdateValue)}}><i className="fa fa-trash"></i> Xóa</button>
                            </div>
                        </div>
                    </>
                )
            }
            
        </DataContext.Consumer>
    );
  }
  
  export default CVItem;