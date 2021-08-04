const otpMsg = (data, otp) => { return ({
    to: data.userInfo.username, 
    from: 'jain.chirag0174@gmail.com', 
    subject: 'OTP for Verification',
    html: `<p>Hello ${data.userInfo.firstName} ${data.userInfo.lastName}, Thank You for registering on <b>GrepIdea</b>.</p><p>Use <span style="font-weight: bold; color: red; font-size: 1.5rem;">${otp}</span> as OTP for Verifying your email ID.</p><p>This OTP is unique to you, so please do not share it to anyone else.</p><p></p><p></p><p></p><p>If you have not Registered on GrepIdea, then feel free to ignore this mail.</p>`,
    });
}

export default otpMsg;