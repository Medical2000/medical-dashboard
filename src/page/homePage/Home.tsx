import React, { useEffect, useState } from "react";
import "./dashboard.css";

import { Line } from '@ant-design/charts';
import { getCountUser } from "../../Api/countApi";

const Home = () => {
    const [dataCount, setDataCount] = useState<any>();
    const data = [
        { year: '2019', value: 3 },
        { year: '2020', value: 4 },
        { year: '2021', value: 3.5 },
        { year: '2022', value: 5 },
        { year: '2023', value: 4.9 },
        { year: '2024', value: 6 },
        { year: '2025', value: 7 },
        { year: '2026', value: 9 },
        { year: '2027', value: 13 },
    ];
    const config = {
        data,
        height: 220,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };

    useEffect(() => {
        getCountUser().then(res => {
            setDataCount(res.data);
        });
    }, [])

    return (
        <div>
            <div className="dashboard-container">
                <h1>Dashboard</h1>
                <div className="card-container">
                    <div className="card">
                        <h2>Tài khoản</h2>
                        <p>Tổnng số tài khoản: {dataCount?.user}</p>
                    </div>
                    <div className="card">
                        <h2>Cuộc hẹn</h2>
                        <p>Tổnng số cuộc hẹn: {dataCount?.appointment}</p>
                    </div>
                    <div className="card">
                        <h2>Cuộc gọi</h2>
                        <p>Tổnng số cuộc gọi: {dataCount?.videoCall}</p>
                    </div>
                </div>




            </div>
            <div style={{ marginTop: 70 }}>
                <Line {...config} />
            </div>
        </div>
    );
};

export default Home;
