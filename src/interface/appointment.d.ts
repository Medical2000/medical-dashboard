import { IUser } from "./auth";

export interface IDoctorUser {
    id?: string,
    firstname: string,
    lastname: string,
    user_name: string,
    password?: string,
    avatar_path: string,
    email: string,
    gender: string,
    phone: string,
    date_of_birth: string,
    address: string,
    doctor: {
        specialty: string,
        license_number: string,
    }
};

export interface IVideoCall {
    id: string;
    roomSid: string;
    start_time: Date;
    end_time: Date;
    duration: string;
    call_status: string;
    rating: string;
}

export interface IAppointment {
    id: string,
    date: string,
    time: string,
    notes: string,
    status: string,
    user: IUser,
    doctorUser: IDoctorUser,
    videoCall: IVideoCall
};

