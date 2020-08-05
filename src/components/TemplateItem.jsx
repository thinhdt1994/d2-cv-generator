import React from 'react';
import DataContext from '../contexts/DataContext';
const axios = require('axios');

function TemplateItem(props) {
    let src = process.env.REACT_APP_ROOT_URL + props.template.thumbnail;
    let date = new Date();
    function createCV(cvId, template, setCurrentCv)  {
        axios.get(process.env.REACT_APP_ROOT_URL + template.file)
        .then(function (response) {
            // handle success
            let cv = {
                id: cvId,
                thumbnail: template.thumbnail,
                name: 'CV-' + cvId,
                description: template.description,
                content: response.data
            };
            cv = JSON.stringify(cv);
            localStorage.setItem('cv-' + cvId, cv);
            setCurrentCv(cv);
        })
        .catch(function (error) {
            // handle error
        })
        .then(function () {
            // always executed
        });
    };

    return (
        <DataContext.Consumer>
            {
                ({setCurrentCv}) => {
                    return (
                        <>
                            <div className="col-lg-3 col-md-4 col-sm-2 template">
                                <div className="template__preview">
                                    <img src={src} alt={`template-${props.template.id}`} className="template__thumbnail"/>
                                </div>
                                <p className="template__name">{props.template.name}</p>
                                <p className="template__description">
                                    {props.template.description}
                                </p>
                                <div className="text-center mb-5">
                                    <button className="btn btn-primary" onClick={() => createCV(date.getTime(), props.template, setCurrentCv)}>
                                        <i className="fa fa-plus"></i>
                                        Tạo CV từ mẫu này
                                    </button>
                                </div>
                            </div>
                        </>
                    );
                }
            }
            
        </DataContext.Consumer>
    );
  }
  
  export default TemplateItem;