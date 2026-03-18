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
        { key: 'id', value: '', label: '푼 문제ID', type: 'custom', isDisable: false },
        { key: 'title', value: '', label: '문제 이름', type: 'input', isDisable: false },
        { key: 'level', value: '', label: '난이도', type: 'input', isDisable: false },
        { key: 'solvedCount', value: '', label: '푼 횟수', type: 'input', isDisable: false },
        { key: 'tag', value: '', label: '문제 유형', type: 'input', isDisable: false },
        { key: 'description', value: '', label: '설명', type: 'input', isDisable: false },
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

    const getTierInfo = (level) => {
        const tiers = [
            { name: 'Bronze', color: '#cd7f32' },
            { name: 'Silver', color: '#c0c0c0' },
            { name: 'Gold', color: '#ffd700' },
            { name: 'Platinum', color: '#27e2a4' },
            { name: 'Diamond', color: '#00b4fc' },
            { name: 'Ruby', color: '#ff0062' },
        ];

        const tierIndex = Math.floor((level - 1) / 5); // 5단계씩
        const tierLevel = 5 - ((level - 1) % 5); // V ~ I

        const roman = ['I', 'II', 'III', 'IV', 'V'];

        return {
            name: `${tiers[tierIndex]?.name || 'Unknown'} ${roman[tierLevel - 1]}`,
            color: tiers[tierIndex]?.color || '#999'
        };
    };

  return (
    <div className="solve-container">
          <h2 className="solve-container-h2">해결한 문제</h2>
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
                      <th>문제 이름</th>
                      <th>난이도</th>
                      <th>푼 횟수</th>
                      <th>문제 유형</th>
                      <th>설명</th>
                      <th>첫 풀이</th>
                      <th>마지막 풀이</th>
                      <th>관리</th>
                  </tr>
                  </thead>
                  <tbody>
                      {solves.map(solve => (
                          <tr key={solve.id}>
                              <td>{solve.title || 'N/A'}</td>
                              <td>
                                {(() => {
                                    const tier = getTierInfo(solve.level);
                                    return (
                                        <span
                                            style={{
                                                backgroundColor: tier.color,
                                                color: 'white',
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                display: 'inline-block',
                                                minWidth: '80px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {tier.name}
                                        </span>
                                    );
                                })()}
                            </td>
                              <td>{solve.solvedCount || 'N/A'}</td>
                              <td>{solve.tag || 'N/A'}</td>
                              <td>{solve.description || 'N/A'}</td>
                              <td>{solve.createdAt?.substring(0, 10)}</td>
                              <td>{solve.updatedAt?.substring(0, 10)}</td>
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