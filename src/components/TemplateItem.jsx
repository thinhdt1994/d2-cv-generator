import React from 'react';
import DataContext from '../contexts/DataContext';

function TemplateItem(props) {
    return (
        <DataContext.Consumer>
            {
                ({ currentTemplateId, setCurrentTemplateId }) => {
                    let displayClassName = currentTemplateId === props.template.id ? '' : 'd-none';
                    let src = process.env.REACT_APP_ROOT_URL + props.template.thumbnail;
                    return (
                        <>
                            <div className="col-lg-3 col-md-4 col-sm-2 template">
                                <div className="template__preview" onClick={() => {setCurrentTemplateId(props.template.id)}}>
                                    <img src={src} alt={`template-${props.template.id}`} className="template__thumbnail"/>
                                    <div className={`template__status ${displayClassName}`}>
                                        <div className="template__overlay"></div>
                                        <i className="fa fa-check template__selected-icon" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <p className="template__name">{props.template.name}</p>
                                <p className="template__description">
                                    {props.template.description}
                                </p>
                            </div>
                        </>
                    );
                }
            }
        </DataContext.Consumer>
    );
  }
  
  export default TemplateItem;