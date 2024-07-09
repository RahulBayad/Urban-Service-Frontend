export function openRegister(){
    
    let blackBKG = document.querySelector("#blackBKG");
    let registerBox = document.querySelector("#registerBox");
    
    blackBKG.style.transform = "scaleY(100%)"
    registerBox.style.transform = "scaleX(100%)"
}
export function closeRegister(){
    let blackBKG = document.querySelector("#blackBKG");
    let registerBox = document.querySelector("#registerBox");

    blackBKG.style.transform = "scaleX(0%)"
    registerBox.style.transform = "scaleX(0%)"
}