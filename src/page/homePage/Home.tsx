import React from "react";
import "./dashboard.css";

import { Line } from '@ant-design/charts';

const Home = () => {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];
    const config = {
        data,
        height: 400,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };
    return (
        <div>
            <div className="dashboard-container">
                <h1>Dashboard</h1>
                <div className="card-container">
                    <div className="card">
                        <h2>Tài khoản</h2>
                        <p>Total users: 10</p>
                    </div>
                    <div className="card">
                        <h2>Cuộc hẹn</h2>
                        <p>Total appointments: 30</p>
                    </div>
                    <div className="card">
                        <h2>Cuộc gọi</h2>
                        <p>Total calls:40</p>
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
