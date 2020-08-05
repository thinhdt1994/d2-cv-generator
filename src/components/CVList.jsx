import React from 'react';
import CVItem from './CVItem';

function CVList(props) {
    let cvs = [];
    for (let key in localStorage){
        if (key.startsWith('cv-')) {
            let cv = JSON.parse(localStorage.getItem(key));
            cvs.push(cv);
        }
    }
    return (
        <div className="container template-list">
            <div className="card">
                <div className="card-header">
                    <h3 className="text-center">Quản lí CV</h3>
                </div>
                <div className="card-body">
                    <div className="row flex-nowrap scroll-x">
                        {
                            cvs.map((cv, index) => (
                                <CVItem key={index} cv={cv} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default CVList;