import React, {useState, useContext, useEffect, useRef} from 'react';
import DataContext from '../contexts/DataContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import InnerHTML from 'dangerously-set-html-content';
const axios = require('axios');

function CVEditor(props) {
    const captureRef = useRef(null);

    // function exportToPdf(captureRef) {
    //     let element = captureRef.current;
    //     let y = element.offsetParent.offsetTop + element.offsetTop;
    //     let options = {
    //         y: y,
    //         useCORS: true
    //     };
    //     html2canvas(element, options).then(canvas => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF("p", "mm", "a4");
    //         let width = pdf.internal.pageSize.getWidth();
    //         let height = pdf.internal.pageSize.getHeight();
    //         pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    //         pdf.save("cv.pdf"); 
    //     });
    // }

    // function exportToDoc(captureRef) {
    //     let element = captureRef.current;
    //     let headerString = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    //         "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    //         "xmlns='http://www.w3.org/TR/REC-html40'>" +
    //         "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    //     let footerString = "</body></html>";
    //     let contentString = element.innerHTML;
    //     let htmlString = headerString + contentString +footerString;
    //     let href = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(htmlString);
    //     let filename = 'cv.doc';
    //     downloadFile(filename, href);
    // }

    function downloadFile(filename, href) {
        let linkElement = document.createElement("a");
        document.body.appendChild(linkElement);
        linkElement.href = href;
        linkElement.download = filename;
        linkElement.click();
        document.body.removeChild(linkElement);
    }

    function exportToPdf(captureRef) {
        let html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <title>Template 2</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
            </head>
            <body>
                ${captureRef.current.innerHTML}
            </body>
            </html>
        `;
        let url = 'https://api.html2pdf.app/v1/test';
        let data = {
            html: html
        };
        axios.post(url, data, {
            responseType: 'arraybuffer'
        })
        .then(function (response) {
            // handle success
            let blob = new Blob([response.data],{type:"application/pdf"});
            let href = window.URL.createObjectURL(blob);
            let filename = 'cv.pdf';
            downloadFile(filename, href);
        })
        .catch(function (error) {
            // handle error
        })
        .then(function () {
            // always executed
        });
    }

    function saveCV(currentCv, captureRef, updateValue, setUpdateValue) {
        let element = captureRef.current;
        let cv = Object.assign({}, currentCv, {content: element.innerHTML});
        cv = JSON.stringify(cv);
        localStorage.setItem('cv-' + currentCv.id, cv);
        setUpdateValue(!updateValue);
    }

    function updateCvName(event, currentCv, setCurrentCv) {
        let cv = Object.assign({}, currentCv, {name: event.target.value});
        setCurrentCv(cv);
    }

    function updateCvDescription(event, currentCv, setCurrentCv) {
        let cv = Object.assign({}, currentCv, {description: event.target.value});
        setCurrentCv(cv);
    }

    return (
        <DataContext.Consumer>
            {
                ({currentCv, setCurrentCv, updateValue, setUpdateValue}) => {
                    if (currentCv === null) {
                        return <div className="container cv-editor"></div>;
                    } else {
                        return (
                            <div className="container cv-editor">
                                <form>
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="text-center">Chỉnh sửa CV</h3>
                                            <div className="form-group">
                                                <label>Tên:</label>
                                                <input type="text" className="form-control" value={currentCv.name} onChange={(event) => {updateCvName(event, currentCv, setCurrentCv)}}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Mô tả:</label>
                                                <textarea className="form-control" value={currentCv.description} onChange={(event) => {updateCvDescription(event, currentCv, setCurrentCv)}}/>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div ref={captureRef}
                                                className="mt4" 
                                                style={{
                                                    width: '210mm',
                                                    minHeight: '297mm',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto'
                                                }} 
                                            >
                                                <InnerHTML html={currentCv.content} />
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="button" className="btn btn-primary mr-2" onClick={() => {saveCV(currentCv, captureRef, updateValue, setUpdateValue)}}><i className="fa fa-save"></i> Lưu CV</button>
                                            <button type="button" className="btn btn-success" onClick={() => {exportToPdf(captureRef)}}><i className="fa fa-file-pdf-o" aria-hidden="true"></i> Xuất sang pdf và tải về</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        );
                    }
                    
                }
            }
            
        </DataContext.Consumer>
    );
  }
  
  export default CVEditor;