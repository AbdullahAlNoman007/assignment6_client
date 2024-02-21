import { baseApi } from "../../api/baseApi";

const userManagementAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSuperAdmin: builder.mutation({
            query: (data) => ({
                url: '/user/create-superAdmin',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['user']
        }),
        createManager: builder.mutation({
            query: (data) => ({
                url: '/user/create-manager',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['user']
        }),
        createSeller: builder.mutation({
            query: (data) => ({
                url: '/user/create-seller',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['user']
        }),
        getAllSuperAdmin: builder.query({
            query: () => ({
                url: '/member/getAllSuperAdmin',
                method: "GET"
            }),
            providesTags: ['user']
        }),
        getAllManager: builder.query({
            query: () => ({
                url: '/member/getAllManager',
                method: "GET"
            }),
            providesTags: ['user']
        }),
        getAllSeller: builder.query({
            query: () => ({
                url: '/member/getAllSeller',
                method: "GET"
            }),
            providesTags: ['user']
        }),
        getSuperAdmin: builder.query({
            query: (id) => ({
                url: `/member/getSuperAdmin/${id}`,
                method: "GET"
            })
        }),
        getManager: builder.query({
            query: (id) => ({
                url: `/member/getManager/${id}`,
                method: "GET"
            })
        }),
        getSeller: builder.query({
            query: (id) => ({
                url: `/member/getSeller/${id}`,
                method: "GET"
            })
        }),
        updateSuperAdmin: builder.mutation({
            query: (data) => ({
                url: `/member/updateSuperAdmin/${data.id}`,
                method: "PUT",
                body: data.body
            }),
            invalidatesTags: ['user']
        }),
        updateManager: builder.mutation({
            query: (data) => ({
                url: `/member/updateManager/${data.id}`,
                method: "PUT",
                body: data.body
            }),
            invalidatesTags: ['user']
        }),
        updateSeller: builder.mutation({
            query: (data) => ({
                url: `/member/updateSeller/${data.id}`,
                method: "PUT",
                body: data.body
            }),
            invalidatesTags: ['user']
        }),
        deleteSuperAdmin: builder.mutation({
            query: (id) => ({
                url: `/member/deleteSuperAdmin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['user']
        }),
        deleteManager: builder.mutation({
            query: (id) => ({
                url: `/member/deleteManager/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['user']
        }),
        deleteSeller: builder.mutation({
            query: (id) => ({
                url: `/member/deleteSeller/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['user']
        }),

    })
})

export const { useCreateSuperAdminMutation, useCreateSellerMutation, useCreateManagerMutation, useGetAllSuperAdminQuery, useGetAllManagerQuery, useGetAllSellerQuery, useGetSuperAdminQuery, useGetManagerQuery, useGetSellerQuery, useDeleteSuperAdminMutation, useDeleteManagerMutation, useDeleteSellerMutation, useUpdateSuperAdminMutation, useUpdateManagerMutation, useUpdateSellerMutation } = userManagementAPI