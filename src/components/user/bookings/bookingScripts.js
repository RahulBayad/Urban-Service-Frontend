export const allOrderBtn = ()=>{
    let totalOrder = document.getElementById('totalOrder');
    let prevOrder = document.getElementById('prevOrder');
    let pendingOrder = document.getElementById('pendingOrder');
    let cancelledOrder = document.getElementById('cancelledOrder');

    totalOrder.style.borderBottom = "3px solid rgb(185, 99, 255)"
    pendingOrder.style.border = "none"
    prevOrder.style.border = "none"
    cancelledOrder.style.border = "none"
}
export const pendingOrderBtn = ()=>{
    let totalOrder = document.getElementById('totalOrder');
    let prevOrder = document.getElementById('prevOrder');
    let pendingOrder = document.getElementById('pendingOrder');
    let cancelledOrder = document.getElementById('cancelledOrder');

    pendingOrder.style.borderBottom = "3px solid rgb(185, 99, 255)"
    totalOrder.style.border = "none"
    prevOrder.style.border = "none"
    cancelledOrder.style.border = "none"
}
export const prevOrderBtn = ()=>{
    let totalOrder = document.getElementById('totalOrder');
    let prevOrder = document.getElementById('prevOrder');
    let pendingOrder = document.getElementById('pendingOrder');
    let cancelledOrder = document.getElementById('cancelledOrder');

    prevOrder.style.borderBottom = "3px solid rgb(185, 99, 255)"
    pendingOrder.style.border = "none"
    totalOrder.style.border = "none"
    cancelledOrder.style.border = "none"
}
export const cancelledOrderBtn = ()=>{
    let totalOrder = document.getElementById('totalOrder');
    let prevOrder = document.getElementById('prevOrder');
    let pendingOrder = document.getElementById('pendingOrder');
    let cancelledOrder = document.getElementById('cancelledOrder');

    cancelledOrder.style.borderBottom = "3px solid rgb(185, 99, 255)"
    pendingOrder.style.border = "none"
    prevOrder.style.border = "none"
    totalOrder.style.border = "none"
}