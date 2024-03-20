const validateServProProfile = (formData)=>{

    var flag = true;

    if(formData.profilePictureUrl.length === 0){
        console.log("Please select a picture")
        document.getElementById('selectedImgMsg').textContent = "(Please upload your picture)";
        flag = false;

    }else{
        document.getElementById('selectedImgMsg').textContent = "";
    }

    if(!formData.fname){
        console.log("Please enter your fisrt name");
        document.getElementById('fname').textContent = "(Please enter your first name)";
        flag = false;
    }else{
        document.getElementById('fname').textContent = "";
    }

    if(!formData.lname){
        console.log("Please enter your Last name");
        document.getElementById('lname').textContent = "(Please enter your Last name)";
        flag = false;
    }else{
        document.getElementById('lname').textContent = "";
    }

    if(!formData.dob){
        console.log("Please enter your dob");
        document.getElementById('dob').textContent = "(Please enter your DOB)";
        flag = false;
    }else{
        document.getElementById('dob').textContent = "";
    }

    if(formData.gender === "select"){
        console.log("Please enter your gender");
        document.getElementById('gender').textContent = "(Please select your gender)";
        flag = false;
    }else{
        document.getElementById('gender').textContent = "";
    }

    if(!formData.email){
        console.log("Please enter your email");
        document.getElementById('email').textContent = "(Please enter your email)";
        flag = false;
    }else{
        document.getElementById('email').textContent = "";
    }

    if(!formData.phone){
        console.log("Please enter your phone");
        document.getElementById('phone').textContent = "(Please enter your phone)";
        flag = false;
    }else{
        
        if(formData.phone.length !== 10 ){
            console.log("Only 10 characters are allowed");
            document.getElementById('phone').textContent = "Phone number is not valid";
            flag = false;
        }else{
            document.getElementById('phone').textContent = "";
        }
    }

    if(!formData.password){
        console.log("Please enter your password");
        document.getElementById('password').textContent = "(Please enter your password)";
        flag = false;
    }else{
        document.getElementById('password').textContent = "";
    }

    if(formData.qualification === "select"){
        console.log("Please enter your qualification");
        document.getElementById('qualification').textContent = "(Please enter your qualification)";
        flag = false;
    }else{
        document.getElementById('qualification').textContent = "";
    }

    if(formData.country === "select"){
        console.log("Please enter your country");
        document.getElementById('country').textContent = "(Please select your country)";
        flag = false;
    }else{
        document.getElementById('country').textContent = "";
    }

    if(!formData.street){
        console.log("Please enter your street");
        document.getElementById('street').textContent = "(Please enter your street)";
        flag = false;
    }else{
        document.getElementById('street').textContent = "";
    }

    if(!formData.city){
        console.log("Please enter your city");
        document.getElementById('city').textContent = "(Please enter your city)";
        flag = false;
    }else{
        document.getElementById('city').textContent = "";
    }

    if(!formData.state){
        console.log("Please enter your state");
        document.getElementById('state').textContent = "(Please enter your state)";
        flag = false;
    }else{
        document.getElementById('state').textContent = "";
    }

    if(!formData.pincode){
        console.log("Please enter your pincode");
        document.getElementById('pincode').textContent = "(Please enter your pincode)";
        flag = false;
    }else{
        document.getElementById('pincode').textContent = "";
    }

    if(!formData.accountHolder){
        console.log("Please enter account holder name");
        document.getElementById('accountHolder').textContent = "(Please enter account holder name)";
        flag = false;
    }else{
        document.getElementById('accountHolder').textContent = "";
    }

    if(!formData.accountNumber){
        console.log("Please enter your bank account number");
        document.getElementById('accountNumber').textContent = "(Please enter bank account number)";
        flag = false;
    }else{
        document.getElementById('accountNumber').textContent = "";
    }

    if(!formData.bank){
        console.log("Please enter your bank name");
        document.getElementById('bank').textContent = "(Please enter your bank name)";
        flag = false;
    }else{
        document.getElementById('bank').textContent = '';
    }

    if(!formData.ifsc){
        console.log("Please enter your IFSC code");
        document.getElementById('ifsc').textContent = "(Please enter your IFSC code)";
        flag = false;
    }else{
        document.getElementById('ifsc').textContent = '';

    }

    return flag;
}
module.exports = {validateServProProfile};
