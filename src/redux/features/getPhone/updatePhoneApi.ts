import { baseApi } from "../../api/baseApi";

export const getPhoneUpdateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updatephone: builder.mutation({
            query: (info) => ({
                url: `/product/update-product/${info.id}`,
                method: 'POST',
                body: info.body
            }),
            invalidatesTags: ['phone']
        }),
        buyphone: builder.mutation({
            query: (info) => ({
                url: `/buy/${info.id}`,
                method: "POST",
                body: info.body
            }),
            invalidatesTags: ['phone', 'sale']
        }),
        salehistory: builder.query({
            query: (info) => ({
                url: `/salehistory?${info}`,
                method: "GET"
            }),
            providesTags: ['sale']
        })
    })
})

export const { useUpdatephoneMutation, useBuyphoneMutation, useSalehistoryQuery } = getPhoneUpdateApi