import { IUser } from "./auth"

export interface IDegree {
    id?: string,
    name: string,
    abbreviation: string
}

export interface IDoctor {
    id?: string,
    specialty: string,
    license_number: string,
    about: string,
    exp: string,
    rating: string,
    user_id: string,
    id_workplace: string,
    id_degree: string,
    user: IUser,
}

export interface ICreateDoctor {
    id?: string,
    specialty: string,
    license_number: string,
    about: string,
    exp: string,
    rating: string,
    user_id: string,
    id_workplace: string,
    id_degree: string,
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
    status: string | boolean,
    roleId: string,
    role?: IRole,
}
