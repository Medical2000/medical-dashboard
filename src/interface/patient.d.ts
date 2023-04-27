import { IUser } from "./auth";

export interface IBloodGroup {
    id?: string,
    blood_name: string,
}
export interface IPatient {
    id: string,
    weight: string,
    health_insurance_number: string,
    height: string,
    user: IUser,
    bloodGroup: IBloodGroup,
}

export interface ICreatePatient {
    id: string,
    weight: string,
    health_insurance_number: number,
    height: string,
    firstname: string,
    lastname: string,
    user_name: string,
    password: string,
    avatar_path: string,
    avatar?: any,
    email: string,
    gender: string,
    phone: string,
    date_of_birth: string,
    formatDate?: string,
    address: string,
    status: any,
    id_blood_groups:string,

}
