import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { Doctor } from '../../page/doctorPage/doctor';

const MainContainer = () => {
    return (
        <div>
            <Routes>
                {/* <Route path="home" element={<Login />} /> */}
                <Route path="home/doctor" element={<Doctor />} />
                {/* <Route path="app/project" element={<Project />} /> */}
            </Routes>
        </div>
    )
}

export default MainContainer
