import { baseApi } from "../../api/baseApi";

export const getPhoneApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getallphone: builder.query({
            query: () => ({
                url: '/product/get-products',
                method: "GET"
            }),
            providesTags: ['phone']
        }),
        createphone: builder.mutation({
            query: (info) => ({
                url: '/product/create-product',
                method: "POST",
                body: info
            }),
            invalidatesTags: ['phone']
        }),
        deletephone: builder.mutation({
            query: (info) => ({
                url: '/product/delete-products',
                method: 'DELETE',
                body: info
            }),
            invalidatesTags: ['phone']
        }),
        getphone: builder.query({
            query: (info) => ({
                url: `/product/get-product${info}`,
                method: 'GET'
            })
        })
    })
})

export const { useGetallphoneQuery, useCreatephoneMutation, useDeletephoneMutation, useGetphoneQuery } = getPhoneApi