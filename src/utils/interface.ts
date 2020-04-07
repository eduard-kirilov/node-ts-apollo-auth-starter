export interface IUser {
  password?: string;
  email?: string;
  isModified: (a:string) => {};
  comparePassword?: (password:string, x?: any) => {};
}

export interface IPropsString {
  [key: string]: string;
}

export interface IProducts {
  title?: string;
}