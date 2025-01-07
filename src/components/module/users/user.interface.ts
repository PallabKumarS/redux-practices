export interface IUser {
  id: string;
  name: string;
  email: string;
}
export interface IPropUser {
  user: IUser;
}

export interface IUserState {
  users: IUser[];
}

export type DraftUser = Omit<IUser, "id">;
