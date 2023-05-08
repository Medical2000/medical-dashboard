import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Doctor from '../../page/doctorPage/doctor';
import Home from '../../page/homePage/Home';
import Workplace from '../../page/workplacePage/Workplace';
import Degree from '../../page/degreePage/Degree';
import User from '../../page/userPage/User';
import Role from '../../page/rolePage/Role';
import BloodGroups from '../../page/bloodGroups/BloodGroups';
import Patient from '../../page/patient/Patient';
import Appointment from '../../page/appointment/Appointment';

const MainContainer = () => {
    return (
        <div>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="home/doctor" element={<Doctor />} />
                <Route path="home/workplace" element={<Workplace />} />
                <Route path="home/degree" element={<Degree />} />
                <Route path="home/user" element={<User />} />
                <Route path="home/role" element={<Role />} />
                <Route path="home/patient" element={<Patient />} />
                <Route path="home/bloodGroup" element={<BloodGroups />} />
                <Route path="home/appointment" element={<Appointment />} />
            </Routes>
        </div>
    )
}

export default MainContainer
