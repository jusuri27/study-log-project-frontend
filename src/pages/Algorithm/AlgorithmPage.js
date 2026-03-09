import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useToast } from '../../context/ToastContext';
import { getAlgorithmsAPI, createAlgorithmAPI, updateAlgorithmAPI } from '../../api/index.js';
import "./AlgorithmPage.css";
import AlgorithmModalPage from "./AlgorithmModalPage";

const AlgorithmPage = () => {
    const [algorithms, setAlgorithms] = useState([]);
    const { showToast } = useToast();
    const [modalShow, setModalShow] = useState(false); // 모달 사용 여부
    const [modalType, setModalType] = useState(''); // 모달 화면 타입(추가: create, 수정: update)

    const [formData, setFormData] = useState([
        { key: 'id', value: '', label: '알고리즘Id', type: 'custom', isDisable: false },
        { key: 'lv', value: '', label: '난이도', type: 'input', isDisable: false },
        { key: 'name', value: '', label: '문제명', type: 'input', isDisable: false }
    ]);

    useEffect(() => {
    getAlgorithms()
    }, []);

    const getAlgorithms = async () => {
        const { response, error } = await getAlgorithmsAPI();
        if (error) {
            showToast('에러 발생', 'error');
            return;
        }
        setAlgorithms(response.data);
    };

    // 추가 버튼 클릭시
    const handleCreate = () => {
        // formData 초기화
        const createFormData = formData.map((field) => ({
            ...field,
            value: ''
        }));
        console.log("formData : ", formData);

        setFormData(createFormData);
        setModalType('create');
        setModalShow(true);
    };

    // 수정 버튼 클릭시
    const handleRowDoubleClick = (algorithm) => {
        const updatedFormData = formData.map((item) => ({
            ...item,
            value: algorithm[item.key] ?? ''
        }));
        setFormData(updatedFormData);
        setModalShow(true);
        setModalType('update');
    };

    // 추가, 수정 api
    const handleSubmit = async (data, modalType) => {
        let params = {};
        
        // 알고리즘 정보 데이터 세팅
        data.forEach((item) => {
            if (item.value) {
                params[item.key] = item.value;
            }
        });

        if(modalType === 'create') {
            const { response, error } = await createAlgorithmAPI(params);
            if (error) {
                showToast('에러 발생', 'error');
                return;
            }
            showToast(response.data.message, 'success');
        } else if(modalType === 'update') {
            const { response, error } = await updateAlgorithmAPI(params, params.id);
            if (error) {
                showToast('에러 발생', 'error');
                return;
            }
            showToast(response.data.message, 'success');
        }
        
        setModalShow(false);
        getAlgorithms();
    };

  return (
    <div className="algorithm-container">
          <h2 className="algorithm-container-h2">알고리즘 목록</h2>
          <div className="mb-3" style={{ textAlign: "right" }}>
                <button className="me-2 algorithm-primary-btn" onClick={handleCreate}>
                    추가
                </button>
              {/* <button className="algorithm-primary-btn" onClick={handleExcelDownload}>
                  엑셀 다운로드
              </button> */}
          </div>
          <div className="algorithm-table-responsive">
              <Table className="">
                  <thead>
                  <tr>
                      <th>난이도</th>
                      <th>문제명</th>
                      <th>푼 횟수</th>
                  </tr>
                  </thead>
                  <tbody>
                      {algorithms.map(algorithm => (
                          <tr key={algorithm.id}>
                              <td>{algorithm.lv || 'N/A'}</td>
                              <td>{algorithm.name || 'N/A'}</td>
                              <td>{algorithm.tryCount || 'N/A'}</td>
                              <td>
                                    <button className='algorithm-table-btn' onClick={() => handleRowDoubleClick(algorithm)}>
                                        수정
                                    </button>
                                </td>
                          </tr>
                      ))}
                  </tbody>
              </Table>
          </div>
          <AlgorithmModalPage
              show={modalShow}
              onHide={() => setModalShow(false)}
              handleSubmit={handleSubmit}
              formData={formData}
              modalType={modalType}
          />
      </div>
  );
};

export default AlgorithmPage;