import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethods"
import { getProductStart, getProductSuccess, getProductFail, deleteProductStart, deleteProductSuccess, deleteProductFail } from "./productRedux";

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