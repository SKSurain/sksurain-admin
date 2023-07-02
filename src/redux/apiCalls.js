import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethods"
import {
    getProductStart,
    getProductSuccess,
    getProductFail,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFail,
    updateProductSuccess,
    updateProductStart,
    updateProductFail,
    addProductStart,
    addProductSuccess,
    addProductFail
} from "./productRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("auth/login", user);
        dispatch(loginSuccess(res.data))
    } catch (err) { dispatch(loginFailure()) }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data))
    } catch (err) { dispatch(getProductFail(err.message)) }
}


export const deleteProducts = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`products/${id}`);
        dispatch(deleteProductSuccess(id))
    } catch (err) { dispatch(deleteProductFail(err.message)) }
}

export const updateProducts = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put(`products/${id}`);
        dispatch(updateProductSuccess({ id: id, product: product }))
    } catch (err) { dispatch(updateProductFail(err.message)) }
}

export const addProducts = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`products`, product);
        dispatch(addProductSuccess(res.data))
    } catch (err) { dispatch(addProductFail(err.message)) }
}