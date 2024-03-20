import axios from "axios";

export const addToCart = async (service)=>{
    console.log("cart is",service);
    try {
      const result = await axios.post(`http://localhost:4001/user/cart/${sessionStorage.getItem('userEmail')}`,service);
      console.log("result is",result)
      
    } catch (error) {
      console.log("error",error);
    }
}

export const getCart = async ()=>{
    try {
      let result = await axios.get(`http://localhost:4001/user/cart/${sessionStorage.getItem('userEmail')}`)
      return result.data.data
    } catch (error) {
      console.log("error in getcart",error)
    }
}
