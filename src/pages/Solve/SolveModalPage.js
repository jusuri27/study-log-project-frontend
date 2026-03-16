import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useToast } from '../../context/ToastContext';

const SolveModalPage = (props) => {
    const [modalType, setModalType] = useState('');
    const [formData, setFormData] = useState([
        { key: 'id', value: '', label: '알고리즘Id', type: 'custom', isDisable: false },
        { key: 'name', value: '', label: '문제명', type: 'input', isDisable: false },
        { key: 'lv', value: '', label: '난이도', type: 'input', isDisable: false },
    ]);

    useEffect(() => {
        if (props.formData) {
            setFormData(prevFormData =>
                prevFormData.map(field => {
                    const updatedField = props.formData.find(item => item.key === field.key);
                    return updatedField;
                })
            );
        }
    }, [props.formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) =>
            prevFormData.map((field) =>
                field.key === name ? { ...field, value } : field
            )
        );
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    알고리즘 {props.modalType === 'update' ? '수정' : '추가'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formData.map((field) => (
                    <div key={field.key}>
                        {field.type != 'custom' ? ( <Form.Label htmlFor={field.key}>{field.label}</Form.Label> ) : null}
                        {field.type === 'select' ? (
                            <Form.Select
                                id={field.key}
                                name={field.key}
                                value={field.value}
                                onChange={handleChange}
                                disabled={field.isDisable}
                            >
                                {field.options?.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.name}
                                    </option>
                                ))}
                            </Form.Select>
                        ) : field.type === 'input' ? (
                            <Form.Control
                                type="text"
                                name={field.key}
                                value={field.value}
                                onChange={handleChange}
                                disabled={field.isDisable}
                            />
                        ) : null}
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <button className='solve-secondary-btn' onClick={props.onHide}>
                    닫기
                </button>
                <button className='solve-primary-btn' onClick={() => props.handleSubmit(formData, props.modalType)}>
                    저장
                </button>
            </Modal.Footer>
        </Modal>
    );
}


export default SolveModalPage;