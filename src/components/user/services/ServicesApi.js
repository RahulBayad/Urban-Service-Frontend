import axios from "axios";

export const addToCart = async (service)=>{
    console.log("cart is",service);
    let user = sessionStorage.getItem('userEmail')
    try {
      if(user){
        const result = await axios.put(`/user/addToCart/${user}`,service);
        console.log("result is",result)
      }else{
        return null
      }
      
    } catch (error) {
      console.log("error",error);
    }
}

export const getCart = async ()=>{
    try {
      let user = sessionStorage.getItem('userEmail')
      if(user){
        let result = await axios.get(`/user/cart/${user}`)
        return result.data.data
      }
      // console.log("cart is ",result)
      return null
    } catch (error) {
      console.log("error in getcart",error)
    }
}
