/* eslint-disable no-restricted-globals */
import React, { useContext, useEffect } from "react";
import { navigate } from "@reach/router";
import Logo from "../assets/logo/logo.jpg";
import Public from "../assets/featuresImgs/public.svg";
import Private from "../assets/featuresImgs/private.svg";
import Chirag from "../assets/creditImgs/chirag.jpg";
import Dhyata from "../assets/creditImgs/dhyata.jpg";
import modalContext from "../modals/modalContext";
import Login from "../modals/Login";
import SignUp from "../modals/SignUp";
import Verify from "../modals/Verify";

const HomePage = () => {
  const [modal, setModal] = useContext(modalContext);
  useEffect(() => {
    setModal(window.__ROUTE_DATA__);
    //   delete window.__ROUTE_DATA__;
  }, [setModal]);
  function showGithubIcon(ind) {
    document.querySelectorAll("#credits>div>div>img")[ind].style.opacity =
      "0.5";
    document.getElementsByClassName("github-icon")[ind].style.visibility =
      "visible";
  }
  function hideGithubIcon(ind) {
    document.querySelectorAll("#credits>div>div>img")[ind].style.opacity = null;
    document.getElementsByClassName("github-icon")[ind].style.visibility = null;
  }

  function userAlreadyExist() {
    setModal(Object.assign(modal, { userAlreadyExist: null }));
    alert(
      `Error\nUser with the given email ID already exists\nPlease try to login`
    );
  }
  function userNotFound() {
    setModal(
      Object.assign(modal, { userAlreadyExist: null, userNotFound: null })
    );
    alert(
      `Error\nUser with the given email ID do not exists\nPlease try to sign up first`
    );
  }

  return (
    <React.Fragment>
      <div id="top">
        <div id="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div id="top-buttons">
          <button
            id="btn-signup"
            onClick={() => setModal({ modalLink: "signup" })}
          >
            Sign Up
          </button>
          <button
            id="btn-login"
            onClick={() => setModal({ modalLink: "login" })}
          >
            Login
          </button>
        </div>
      </div>
      <div id="middle">
        <h1>For Greppers, by Grepians</h1>
        <div id="first-line"></div>
        <div id="second-line"></div>
        <div id="third-line"></div>
        <p style={{ marginBottom: 0 }}>
          GrepIdea is an <span style={{ color: "blue" }}>open community</span>{" "}
          to find Ideas and make something Innovative.
        </p>
        <p style={{ marginTop: 0 }}>
          Here people can discuss the Problems which needs to be focused on,
          Ideas to solve them, give their solutions for the problems and come
          together and Meet-up with the other Developers, and Crazy Thinkers to
          make something Out Of The Box.{" "}
        </p>
      </div>
      <div id="features">
        <div>
          <div>
            <img src={Public} alt="public" />
          </div>
          <h2>Public Discussions</h2>
          <p>
            Discuss your Ideas with the people all over the globe and get new
            Ideas
          </p>
          <button>Browse Topics</button>
        </div>
        <div style={{ marginTop: "-250px" }}>
          <div>
            <img src={Private} alt="private" />
          </div>
          <h2>Private Ideaspace</h2>
          <p>Discuss your projects with your teammates privately</p>
          <button
            style={{
              color: "#fff",
              backgroundColor: "#36393F",
              WebkitTextStrokeWidth: "0px",
              width: "90%",
              fontSize: "1rem",
            }}
          >
            Create New Ideaspace
          </button>
        </div>
        <div>
          <div>
            <img src={Public} alt="public" />
          </div>
          <h2>One to One Chats</h2>
          <p>
            Meet new Innovative people and talk to them on private one to one
            chat
          </p>
          <button>Browse Topics</button>
        </div>
      </div>
      <div id="credits">
        <h2>Made with 🖤 by: </h2>
        <div>
          <div>
            <img
              src={Chirag}
              onMouseMove={() => screen.width > 1024 && showGithubIcon(0)}
              onMouseOut={() => hideGithubIcon(0)}
              alt="Chirag Jain"
              onClick={() => {
                navigate("https://github.com/coderchirag");
              }}
            />
            <p>Chirag Jain</p>
            <i
              className="fab fa-github github-icon"
              onMouseMove={() => screen.width > 1024 && showGithubIcon(0)}
              onMouseOut={() => hideGithubIcon(0)}
              onClick={() => {
                navigate("https://github.com/coderchirag");
              }}
            ></i>
          </div>
        </div>
      </div>
      {modal.modalLink === "login" && <Login />}
      {modal.modalLink === "signup" && <SignUp />}
      {modal.modalLink === "verify" && <Verify />}
      {modal.userAlreadyExist && userAlreadyExist()}
      {modal.userNotFound && userNotFound()}
    </React.Fragment>
  );
};

export default HomePage;
