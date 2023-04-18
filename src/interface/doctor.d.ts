import { IUser } from "./auth"

export interface IDegree {
    id?: string,
    name: string,
    abbreviation: string
}

export interface IDoctor{
    id?:string,
    specialty:string,
    license_number:string,
    about:string,
    exp:string,
    rating:string,
    user_id:string,
    id_workplace:string,
    id_degree:string,
    user:IUser
}