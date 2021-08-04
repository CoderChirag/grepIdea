const generateOTP = () => {
    let otp = 0;
    while(otp.toString().length !== 4){
        otp = (Math.floor(Math.random()*9999)+1000);
    }
    return otp;
}

export default generateOTP;