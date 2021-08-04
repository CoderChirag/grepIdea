import React, { useContext } from "react";
import Modal from "./Modal";
import modalContext from "./modalContext";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [modal, setModal] = useContext(modalContext);
  return (
    <Modal>
      <i
        className="fas fa-times"
        id="close-icon"
        onClick={() => setModal(Object.assign({}, modal, {modalLink: ""}))}
      ></i>
      <form action="/login" method="post" className="modal-form">
        <div className="modal-flex">
          <h1 id="modal-header">GREPIDEA</h1>
          <div className="modal-row">
            <p className="modal-label">Username</p>
            <input type="text" className="modal-input" name="username" required />
          </div>
          <div className="modal-row">
            <p className="modal-label">Password</p>
            <input type="password" className="modal-input" name="password" required />
          </div>
          <div className="last-div">
            <button className="modal-button modal-button-login">Log In</button>
            <p id="modal-button-below-text">
              New User? Register{" "}
              <span
                id="modal-button-below-text-span"
                onClick={() =>
                  setModal(Object.assign({}, modal, {modalLink: "signup"}))
                }
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

export default Login;
