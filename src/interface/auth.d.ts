export type IUserLogin = {
  user_name: string;
  password: string
}

export interface IRole {
  id?: string,
  role_name: string
}
export interface IUser {
  id?:string,
  firstname: string,
  lastname: string,
  user_name: string,
  password: string,
  avatar_path: string,
  email: string,
  avatar?:any,
  gender: string,
  phone: string,
  date_of_birth: string,
  address: string,
  status: string,
  roleId: string,
  role?: IRole,
}
