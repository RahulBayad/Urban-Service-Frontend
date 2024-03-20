var uploadedImg = uploadIcon;
    
var selectedImg = document.getElementById('selectedImg');
var imgMessage = document.getElementById('image-message');
var dropBox = document.getElementById('dropBox');

// selectedImg.addEventListener("drag",(events)=>{
//     events.preventDefault();
// })
// selectedImg.addEventListener("drop",(events)=>{
//     events.preventDefault();
// })

const uploadImage = ()=>{
    
    try{
        let fileUrl = selectedImg.files[0];
        console.log(fileUrl);
        // setImgIcon(URL.createObjectURL(selectedImg.files[0])); 
        imgMessage.textContent = "Image Selected";
        return URL.createObjectURL(selectedImg.files[0]);
        
    }catch(err){
        console.log("error is...",err);
    }
}