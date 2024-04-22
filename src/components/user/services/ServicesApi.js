import axios from "axios";

export const addToCart = async (service)=>{
    console.log("cart is",service);
    try {
      const result = await axios.put(`/user/addToCart/${sessionStorage.getItem('userEmail')}`,service);
      console.log("result is",result)
      
    } catch (error) {
      console.log("error",error);
    }
}

export const getCart = async ()=>{
    try {
      let result = await axios.get(`/user/cart/${sessionStorage.getItem('userEmail')}`)
      // console.log("cart is ",result)
      return result.data.data
    } catch (error) {
      console.log("error in getcart",error)
    }
}
