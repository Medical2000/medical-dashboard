import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { Doctor } from '../../page/doctorPage/doctor';
import Home from '../../page/homePage/Home';
import Workplace from '../../page/workplacePage/Workplace';
import Degree from '../../page/DegreePage/Degree';

const MainContainer = () => {
    return (
        <div>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="home/doctor" element={<Doctor />} />
                <Route path="home/workplace" element={<Workplace />} />
                <Route path="home/degree" element={<Degree />} />
            </Routes>
        </div>
    )
}

export default MainContainer
