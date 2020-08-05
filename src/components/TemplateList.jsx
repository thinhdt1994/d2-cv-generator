import React from 'react';
import TemplateItem from './TemplateItem';
import DataContext from '../contexts/DataContext';
function TemplateList(props) {
    return (
        <DataContext.Consumer>
            {
                ({templates}) => (
                    <div className="container template-list">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Chọn mẫu CV</h3>
                            </div>
                            <div className="card-body">
                                <div className="row flex-nowrap scroll-x">
                                    {
                                        templates.map((template, index) => (
                                            <TemplateItem key={index} template={template} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            
        </DataContext.Consumer>
    );
  }
  
  export default TemplateList;