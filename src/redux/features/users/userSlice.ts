import {
  DraftUser,
  IUser,
  IUserState,
} from "@/components/module/users/user.interface";
import { RootState } from "@/redux/store";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserState = {
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
    },
  ],
};

const createUser = (user: DraftUser): IUser => {
  return {
    id: nanoid(),
    ...user,
  };
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // create user
    addUser: (state, action: PayloadAction<DraftUser>) => {
      const newUser = createUser(action.payload);
      state.users.push(newUser);
    },

    // delete user
    deleteUser: (state, action: PayloadAction<IUser["id"]>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },

    // edit user
    editUser: (state, action: PayloadAction<IUser>) => {
      const user = state.users.find((user) => user.id === action.payload.id);

      if (user) {
        user.name = action.payload.name;
        user.email = action.payload.email;
      }
    },
  },
});

export const selectUsers = (state: RootState) => state.userStore.users;

export const { addUser, deleteUser, editUser } = userSlice.actions;

export default userSlice;
