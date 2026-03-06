import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useToast } from '../../context/ToastContext';
import { getAlgorithmsAPI, createAlgorithmAPI } from '../../api/index.js';
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
        console.log(response);
        if (error) {
            showToast('에러 발생', 'error');
            return;
        }
        // const formattedData = response.data.data.content.map((item) => ({
        //     ...item,
        //     basicSalary: formatNumberWithCommas(item.basicSalary),
        //     deduction: formatNumberWithCommas(item.deduction),
        //     netSalary: formatNumberWithCommas(item.netSalary),
        // }));


        setAlgorithms(response.data);
    };

    // 추가 버튼 클릭시 실행되는 함수
    const handleCreate = () => {
        // formData 초기화
        const createFormData = formData.map((field) => ({
            ...field,
            value: '',
            options: ['name'].includes(field.key) ? [{ name: "선택", value: "" }] : field.options,
            isDisable: ['position', 'deptName', 'name'].includes(field.key) ? false :
                ['netSalary'].includes(field.key) ? true : field.isDisable,
        }));

        setFormData(createFormData);
        setModalType('create');
        setModalShow(true);
    };
    // 추가, 수정 api
    const handleSubmit = async (data, selectedDate, modalType) => {
        let params = {};
        
        // 알고리즘 정보 데이터 세팅
        data.forEach((item) => {
            if (item.value) {
                params[item.key] = item.value;
            }
        });
        console.log("data : ", data);

        const { response, error } = await createAlgorithmAPI(params);
            if (error) {
                showToast('에러 발생', 'error');
                return;
            }
            showToast(response.data.message, 'success');

        setModalShow(false);
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