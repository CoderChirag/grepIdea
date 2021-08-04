import React, {useContext} from "react";
import modalContext from "./modalContext";
import Modal from "./Modal";

const Verify = () => {
    const [modal, setModal] = useContext(modalContext);

    function validateOtp(e, currEle, ind){
        if((/^\D/.test(e.key) && e.key !== "Backspace") || (currEle.value.length === 1 && e.key !== "Backspace")){
            e.preventDefault();
        }
        if(ind !== 4 && e.key !== "Backspace" && /^\d/.test(e.key)){
            setTimeout(() =>{
                document.getElementById(`otp-${ind+1}`).focus();
                currEle.blur();
            }, 200)
        }
    }


    return(
        <Modal>
            <i className="fas fa-times" id="close-icon" onClick={() => setModal(Object.assign({}, modal, {modalLink: ""}))}></i>
            <form action="/verify" method="post">
                <div className="modal-flex">
                   <h1 id="modal-header">GREPIDEA</h1>
                    <h2 id="verify-heading">Verify Email</h2>
                    <p id="otp-text">An OTP is sent to {modal.userInfo.username}. Please enter the OTP to Verify your email.</p>
                    <input type="email" name="username" value= {modal.userInfo.username} style = {{display: "none"}}/>
                    <input type="password" name="password" value={modal.userInfo.password} style = {{display: "none"}}/>
                    <div id="otp-input-div">
                        <input type="number" name="first" id="otp-1" className="otp-input" min="0" max="9" onKeyDown={(e) => validateOtp(e, document.getElementById("otp-1"), 1)} required/>
                        <input type="number" name="second" id="otp-2" className="otp-input" min="0" max="9" onKeyDown={(e) => validateOtp(e, document.getElementById("otp-2"), 2)} required/>
                        <input type="number" name="third" id="otp-3" className="otp-input" min="0" max="9" onKeyDown={(e) => validateOtp(e, document.getElementById("otp-3"), 3)} required/>
                        <input type="number" name="fourth" id="otp-4" className="otp-input" min="0" max="9" onKeyDown={(e) => validateOtp(e, document.getElementById("otp-4"), 4)} required/>
                        {modal.wrongOTP && <p className="modal-validation-text">Wrong OTP. Please Try Again.</p>}
                        <button type="submit" className="modal-button modal-button-verify">Verify OTP</button>
                        <form action="/resend" method="post">
                            <p id="modal-button-below-text">
                                Didnt get the OTP? Click {" "}
                                <button type="submit" id="resend-otp-btn">
                                    <span id="modal-button-below-text-span">here</span>
                                </button>
                                to resend.
                            </p>
                        </form>
                    </div>
                </div>
            </form>
        </Modal>
    );
}


export default Verify;
