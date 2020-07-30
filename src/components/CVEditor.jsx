import React, {useState, useContext, useEffect, useRef} from 'react';
import DataContext from '../contexts/DataContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import InnerHTML from 'dangerously-set-html-content';

const axios = require('axios');

function CVEditor(props) {
    const captureRef = useRef(null);
    const {templates, currentTemplateId} = useContext(DataContext);
    let currentTemplate = {};
    for(let template of templates) {
        if (template.id === currentTemplateId) {
            currentTemplate = template;
            break;
        }
    }
    const [content, setContent] = useState('');
    useEffect(() => {
        axios.get(process.env.REACT_APP_ROOT_URL + currentTemplate.file)
        .then(function (response) {
            // handle success
            setContent(response.data);
        })
        .catch(function (error) {
            // handle error
        })
        .then(function () {
            // always executed
        });
    }, [currentTemplateId]);

    function exportToPdf(captureRef) {
        let element = captureRef.current;
        let y = element.offsetParent.offsetTop + element.offsetTop;
        let options = {
            y: y,
            useCORS: true
        };
        html2canvas(element, options).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "mm", "a4");
            let width = pdf.internal.pageSize.getWidth();
            let height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save("cv.pdf"); 
        });
    }

    function exportToDocx(captureRef) {
        let element = captureRef.current;
        let headerString = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        let footerString = "</body></html>";
        let contentString = element.innerHTML;
        let htmlString = headerString + contentString +footerString;
        let href = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(htmlString);
        let filename = 'cv.doc';
        downloadFile(filename, href);
    }

    function downloadFile(filename, href) {
        let linkElement = document.createElement("a");
        document.body.appendChild(linkElement);
        linkElement.href = href;
        linkElement.download = filename;
        linkElement.click();
        document.body.removeChild(linkElement);
    }

    return (
        <div className="container cv-editor">
            <form>
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Chỉnh sửa CV</h3>
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
                            <InnerHTML html={content} />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-success mr-2" onClick={() => {exportToPdf(captureRef)}}><i className="fa fa-file-pdf-o" aria-hidden="true"></i> Xuất sang pdf và tải về</button>
                        <button type="button" className="btn btn-success" onClick={() => {exportToDocx(captureRef)}}><i className="fa fa-file-pdf-o" aria-hidden="true"></i> Xuất sang docx và tải về</button>
                    </div>
                </div>
            </form>
        </div>
    );
  }
  
  export default CVEditor;