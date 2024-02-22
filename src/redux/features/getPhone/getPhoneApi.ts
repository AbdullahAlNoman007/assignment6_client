import { Tfilter } from "../../../types/program.type";
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
        getSinglePhone: builder.query({
            query: (id) => ({
                url: `/product/get-product/${id}`,
                method: "GET"
            })
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
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((element: Tfilter) => {
                        params.append(element.name, element.value as string)
                    });
                }
                return {
                    url: `/product/get-product`,
                    method: 'GET',
                    params
                }

            },
            providesTags: ['phone']
        })
    })
})

export const { useGetallphoneQuery, useCreatephoneMutation, useDeletephoneMutation, useGetphoneQuery, useGetSinglePhoneQuery } = getPhoneApi