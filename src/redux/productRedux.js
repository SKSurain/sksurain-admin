import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false
    },
    reducers: {
        //Get all PRODUCT
        getProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false
            state.products = action.payload
        },
        getProductFail: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        //DELETE PRODUCT
        deleteProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload.id),
                1
            )
        },
        deleteProductFail: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        }
    }
})

export const { getProductStart, getProductSuccess, getProductFail, deleteProductStart, deleteProductSuccess, deleteProductFail } = productSlice.actions
export default productSlice.reducer; 