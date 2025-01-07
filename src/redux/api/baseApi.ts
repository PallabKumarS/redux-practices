import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["tasks", "users"],
  endpoints: (builder) => ({
    // get tasks
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["tasks"],
    }),

    // get users
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["users"],
    }),

    // add task
    createTask: builder.mutation({
      query: (taskData) => ({
        url: "/tasks",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["tasks"],
    }),

    // add user
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["users"],
    }),

    // delete task by id
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),

    // delete user by id
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    // update task by id
    updateTask: builder.mutation({
      query: ({ id, taskData }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: taskData,
      }),
      invalidatesTags: ["tasks"],
    }),

    // update user by id
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteTaskMutation,
  useDeleteUserMutation,
  useUpdateTaskMutation,
  useUpdateUserMutation,
} = baseApi;
