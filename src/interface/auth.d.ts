export type IUserLogin = {
  user_name: string;
  password: string
}

export interface IRole {
  id?: string,
  role_name: string
}
export interface IUser {
  id?: string,
  firstname: string,
  lastname: string,
  user_name: string,
  password: string,
  avatar_path: string,
  email: string,
  gender: string,
  phone: string,
  date_of_birth: string,
  formatDate?: string,
  address: string,
  status: boolean | string,
  roleId: string,
  role?: IRole,
}
