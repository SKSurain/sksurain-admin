import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false
    },
    reducers: {
        //Get all data
        getProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false
            state.product = action.payload
        },
        getProductFail: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})

export const { getProductStart, getProductSuccess, getProductFail } = productSlice.actions
export default productSlice.reducer; 