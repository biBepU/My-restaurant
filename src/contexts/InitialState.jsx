import { fetchCart, fetchUser } from "../utils/fetchLoclStorageData"

const userInfo = fetchUser( )  
const cartInfo = fetchCart()


export const initialState = {
    user : userInfo,
    cartShow : false,
    cartItems : cartInfo
}