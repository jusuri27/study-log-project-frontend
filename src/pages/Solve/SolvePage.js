import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useToast } from '../../context/ToastContext';
import { getSolvesAPI, createSolveAPI, updateSolveAPI } from '../../api/index.js';
import "./SolvePage.css";
import SolveModalPage from "./SolveModalPage";

const SolvePage = () => {
    const [solves, setSolves] = useState([]);
    const { showToast } = useToast();
    const [modalShow, setModalShow] = useState(false); // 모달 사용 여부
    const [modalType, setModalType] = useState(''); // 모달 화면 타입(추가: create, 수정: update)

    const [formData, setFormData] = useState([
        { key: 'id', value: '', label: '알고리즘Id', type: 'custom', isDisable: false },
        { key: 'lv', value: '', label: '난이도', type: 'input', isDisable: false },
        { key: 'name', value: '', label: '문제명', type: 'input', isDisable: false }
    ]);

    useEffect(() => {
    getSolves()
    }, []);

    const getSolves = async () => {
        const { response, error } = await getSolvesAPI();
        if (error) {
            showToast('에러 발생', 'error');
            return;
        }
        setSolves(response.data);
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
    const handleRowDoubleClick = (solve) => {
        const updatedFormData = formData.map((item) => ({
            ...item,
            value: solve[item.key] ?? ''
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
            const { response, error } = await createSolveAPI(params);
            if (error) {
                showToast('에러 발생', 'error');
                return;
            }
            showToast(response.data.message, 'success');
        } else if(modalType === 'update') {
            const { response, error } = await updateSolveAPI(params, params.id);
            if (error) {
                showToast('에러 발생', 'error');
                return;
            }
            showToast(response.data.message, 'success');
        }
        
        setModalShow(false);
        getSolves();
    };

  return (
    <div className="solve-container">
          <h2 className="solve-container-h2">알고리즘 목록</h2>
          <div className="mb-3" style={{ textAlign: "right" }}>
                <button className="me-2 solve-primary-btn" onClick={handleCreate}>
                    추가
                </button>
              {/* <button className="solve-primary-btn" onClick={handleExcelDownload}>
                  엑셀 다운로드
              </button> */}
          </div>
          <div className="solve-table-responsive">
              <Table className="">
                  <thead>
                  <tr>
                      <th>난이도</th>
                      <th>문제명</th>
                      <th>푼 횟수</th>
                  </tr>
                  </thead>
                  <tbody>
                      {solves.map(solve => (
                          <tr key={solve.id}>
                              <td>{solve.lv || 'N/A'}</td>
                              <td>{solve.name || 'N/A'}</td>
                              <td>{solve.tryCount || 'N/A'}</td>
                              <td>
                                    <button className='solve-table-btn' onClick={() => handleRowDoubleClick(solve)}>
                                        수정
                                    </button>
                                </td>
                          </tr>
                      ))}
                  </tbody>
              </Table>
          </div>
          <SolveModalPage
              show={modalShow}
              onHide={() => setModalShow(false)}
              handleSubmit={handleSubmit}
              formData={formData}
              modalType={modalType}
          />
      </div>
  );
};

export default SolvePage;