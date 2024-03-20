
export const todaySlotFunction = ()=>{
    let today = document.getElementById('today');
    let tomorrow = document.getElementById('tomorrow');
    let todayHeader = document.getElementById('todayHeader');
    let tomHeader = document.getElementById('tomHeader');
    todayHeader.style.borderBottom = "2px solid rgb(170, 0, 255)"
    tomHeader.style.borderBottom = "none"
    today.style.display = "flex"
    tomorrow.style.display = "none"

    let date = new Date();  
    return date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()
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

    let date = new Date();  
    return (date.getDate()+1)+"-"+date.getMonth()+"-"+date.getFullYear()
}