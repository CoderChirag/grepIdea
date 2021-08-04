import React, { useContext } from "react";
import Modal from "./Modal";
import modalContext from "./modalContext";

const SignUp = () => {
  const [modal, setModal] = useContext(modalContext);

  function validateForm(e) {
    for (let text of document.getElementsByClassName("modal-validation-text")) {
      if (text.innerText !== "") {
        e.preventDefault();
      }
    }
  }

  function validateName(e, ind){
    const validationArea = document.getElementsByClassName(
      "modal-validation-text"
    )[ind];
    const inputBox = document.getElementsByClassName("modal-short-width-input")[ind];
    if (/^(?=.*[0-9])|(?=.*[`~!@#$%^&*()\-+=|\\[\]{}"':;?/.><,_])/.test( e.target.value)) {
      validationArea.innerText = "Please Enter a Valid Name";
      inputBox.style.outline = "none";
      inputBox.style.border = "2px solid red";
    } else {
      validationArea.innerText = null;
      inputBox.style.outline = null;
      inputBox.style.border = null;
    }
  }

  function emailValidate(e) {
    const validationArea = document.getElementsByClassName(
      "modal-validation-text"
    )[2];
    const inputBox = document.getElementsByClassName("modal-input")[0];
    if (!(/^[a-zA-Z0-9]\.{0,1}([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+@([a-z]+\.)+[a-z]{2,4}$/.test(e.target.value))) {
      validationArea.innerText = "Please Enter a Valid Email";
      inputBox.style.outline = "none";
      inputBox.style.border = "2px solid red";
    } else {
      validationArea.innerText = null;
      inputBox.style.outline = null;
      inputBox.style.border = null;
    }
  }

  function passwordValidate(e) {
    const validationArea = document.getElementsByClassName(
      "modal-validation-text"
    )[3];
    const inputBox = document.getElementsByClassName("modal-input")[1];
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()\-+=|\\[\]{}"':;?/.><,_])(?=.{8,})/.test(e.target.value)){
      validationArea.innerText =
        "The password must contain at least one lowercase letter, one uppercase letter, one number, one special character and must be at least 8 digits long";
      inputBox.style.outline = "none";
      inputBox.style.border = "2px solid red";
    } else {
      validationArea.innerText = null;
      inputBox.style.outline = null;
      inputBox.style.border = null;
    }
    retypePasswordValidate({
      target: {
        value: document.getElementsByClassName("modal-input")[2].value,
      },
    });
  }

  function retypePasswordValidate(e) {
    const password = document.getElementsByClassName("modal-input")[1].value;
    const validationArea = document.getElementsByClassName(
      "modal-validation-text"
    )[4];
    const inputBox = document.getElementsByClassName("modal-input")[2];
    if (e.target.value !== password) {
      validationArea.innerText = "Password does not match";
      inputBox.style.outline = "none";
      inputBox.style.border = "2px solid red";
    } else {
      validationArea.innerText = null;
      inputBox.style.outline = null;
      inputBox.style.border = null;
    }
  }

  return (
    <Modal>
      <i
        className="fas fa-times"
        id="close-icon"
        onClick={() => setModal(Object.assign({}, modal, {modalLink: ""}))}
      ></i>
      <form action="/signup" method="post">
        <div className="modal-flex">
          <h1 id="modal-header">GREPIDEA</h1>
          <div className="modal-short-row">
            <p className="modal-label">First Name</p>
            <input type="text" className="modal-short-width-input" name="firstName" required onChange={(e) => validateName(e, 0)}/>
            <p className="modal-validation-text"></p>
          </div>
          <div className="modal-short-row">
            <p className="modal-label">Last Name</p>
            <input type="text" className="modal-short-width-input" name="lastName" onChange={(e) => validateName(e, 1)}/>
            <p className="modal-validation-text"></p>
          </div>
          <div className="modal-row">
            <span className="modal-label">
              E-Mail Address
              <input
                type="email"
                name="username"
                className="modal-input"
                onChange={emailValidate}
              />
              <p className="modal-validation-text"></p>
            </span>
          </div>
          <div className="modal-row">
            <span className="modal-label">
              Password
              <input
                type="password"
                className="modal-input"
                name="password"
                onChange={passwordValidate}
                required
              />
              <p className="modal-validation-text"></p>
            </span>
          </div>
          <div className="modal-row">
            <span className="modal-label">
              Confirm Password
              <input
                className="modal-input"
                type="password"
                name="confirmPassword"
                onChange={retypePasswordValidate}
                required
              />
              <p className="modal-validation-text"></p>
            </span>
          </div>
          <div className="last-div">
            <button
              className="modal-button modal-button-login"
              type="submit"
              onClick={validateForm}
            >
              Sign Up
            </button>
            <p id="modal-button-below-text">
              Already a user? Sign in{" "}
              <span
                id="modal-button-below-text-span"
                onClick={() => setModal(Object.assign({}, modal, {modalLink: "login"}))}
              >
                here
              </span>
            </p>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SignUp;
