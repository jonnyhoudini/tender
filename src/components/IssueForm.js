import React, { useState, useEffect } from 'react';
// import { postDinosaur, getAddress } from '../services/services';
import { useNavigate } from 'react-router-dom';
import { Alert, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import LeafletMap from './LeafletMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const IssueForm = ({ category }) => {

    const [showAlert, setShowAlert] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        category: category,
        description: "",
        location: "",
        email: "",
        address: "",
        map: ""
    })

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setFileName(e.target.files[0] ? e.target.files[0].name : 'No file chosen');
    };

    const navigate = useNavigate();

    const onChange = (e) => {
        const newFormData = Object.assign({}, formData);
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('formData', formData);
        const tempFormData = formData;

        const newFormData = new FormData();

        Object.keys(tempFormData).forEach((key) => {
            newFormData.append(key, tempFormData[key]);
        });

        if (selectedFile) {
            newFormData.append('photo', selectedFile);
        }

        for (let [key, value] of newFormData.entries()) {
            console.log(key, value);
        }

        // postDinosaur(newFormData).then((data) => {
        //     console.log('report sent', data);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate('/');
        }, 4000);
        // });


        // Reset the form input values   
        setFormData({
            name: "",
            category: category,
            description: "",
            location: {
                lat: "",
                lng: ""
            },
            email: "",
            address: "",
            map: ""
        });
    }

    const close = <FontAwesomeIcon icon={faXmark} />
    const plane = <FontAwesomeIcon icon={faPaperPlane} />

    return (
        <>

            <div className="content-wrapper">


                <div id="form-container">
                    <div className="close-button" onClick={() => navigate('/')}>{close}</div>

                    <p id='info'>Please select the location on the map and provide details about the issue.</p>

                    {showAlert &&
                        <Alert variant="dark" onClose={() => setShowAlert(false)} dismissible>
                            Your report has been sent to Cllr James McPhilemy. Thank you for your help!
                        </Alert>
                    }

                    <Form onSubmit={onSubmit} id="issue-form">
                        <Form.Group>
                            <Form.Control
                                onChange={onChange}
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="Your Name"
                                value={formData.name}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                onChange={onChange}
                                id="description"
                                name="description"
                                value={formData.description}
                                placeholder="Describe the issue..."
                                rows="4"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                onChange={onChange}
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                name="email"
                                required
                                value={formData.email}
                            />
                        </Form.Group>
                        <div id="buttons-container">
                            <Button type="submit" id="save" className="formheader send-button">{plane} Send</Button>
                        </div>
                    </Form>

                </div>
                <div id="map-container">
                    <LeafletMap formData={formData} setFormData={setFormData} />
                </div>
            </div>
        </>

    )
}

export default IssueForm