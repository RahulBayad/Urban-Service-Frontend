
export const todaySlotFunction = ()=>{
    let today = document.getElementById('today');
    let tomorrow = document.getElementById('tomorrow');
    let todayHeader = document.getElementById('todayHeader');
    let tomHeader = document.getElementById('tomHeader');
    todayHeader.style.borderBottom = "2px solid rgb(170, 0, 255)"
    tomHeader.style.borderBottom = "none"
    today.style.display = "flex"
    tomorrow.style.display = "none"
    let date = new Date()
    let result = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    return result
}
export const tomorrowSlotFunction = ()=>{
    let today = document.getElementById('today');
    let tomorrow = document.getElementById('tomorrow');
    let tomHeader = document.getElementById('tomHeader');
    let todayHeader = document.getElementById('todayHeader');
    tomHeader.style.borderBottom = "2px solid rgb(170, 0, 255)"
    todayHeader.style.borderBottom = "none"
    tomorrow.style.display = "flex"
    today.style.display = "none"
    let date = new Date()
    let result = (date.getDate()+1)+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    return result
}

export const openCard = ()=>{
    let card = document.getElementById("addCard");
    let upi = document.getElementById("upiVerify");
    card.style.display = 'flex'
    upi.style.display = 'none'
    changeBkgOfCard()
}
export const openUpi =()=>{
    let card = document.getElementById("addCard");
    let upi = document.getElementById("upiVerify");
    card.style.display = 'none'
    upi.style.display = 'block'
    changeBkgOfUpi()
}
export const closeAll =()=>{
    let card = document.getElementById("addCard");
    let upi = document.getElementById("upiVerify");
    card.style.display = 'none'
    upi.style.display = 'none'
    changeBkgOfCash();
}

const changeBkgOfCard = ()=>{
    let card = document.getElementById('cardContainer')
    let upi = document.getElementById('upiContainer')
    let cash = document.getElementById('cashContainer')
    card.style.background = "rgba(207, 147, 255, 0.2)"
    card.style.boxShadow = "0 0 4px rgb(200, 200, 200)"
    upi.style.background = "none"
    upi.style.boxShadow = "none"
    cash.style.background = "none"
    cash.style.boxShadow = "none"
}
const changeBkgOfUpi = ()=>{
    let card = document.getElementById('cardContainer')
    let upi = document.getElementById('upiContainer')
    let cash = document.getElementById('cashContainer')
    upi.style.background = "rgba(207, 147, 255, 0.2)"
    upi.style.boxShadow = "0 0 4px rgb(200, 200, 200)"
    card.style.background = "none"
    card.style.boxShadow = "none"
    cash.style.background = "none"
    cash.style.boxShadow = "none"
}
const changeBkgOfCash = ()=>{
    let card = document.getElementById('cardContainer')
    let upi = document.getElementById('upiContainer')
    let cash = document.getElementById('cashContainer')
    cash.style.background = "rgba(207, 147, 255, 0.2)"
    cash.style.boxShadow = "0 0 4px rgb(200, 200, 200)"
    upi.style.background = "none"
    upi.style.boxShadow = "none"
    card.style.background = "none"
    card.style.boxShadow = "none"
}