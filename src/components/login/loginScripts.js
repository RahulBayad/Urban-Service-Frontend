export function openRegister(){
    
    let body = document.querySelector('#loginBody');
    let blackBKG = document.querySelector("#blackBKG");
    let registerBox = document.querySelector("#registerBox");
    
    // body.style.transform = "scaleX(0%)"
    blackBKG.style.transform = "scaleY(100%)"
    registerBox.style.transform = "scaleX(100%)"
}
export function closeRegister(){
    let body = document.querySelector('#loginBody');
    let blackBKG = document.querySelector("#blackBKG");
    let registerBox = document.querySelector("#registerBox");

    // body.style.transform = "scaleX(100%)"
    blackBKG.style.transform = "scaleX(0%)"
    registerBox.style.transform = "scaleX(0%)"
}