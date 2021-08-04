import React, {useState, useEffect, useContext} from "react";
import { navigate } from "@reach/router";
import {useParams} from "react-router-dom";
import modalContext from "../modals/modalContext";
import SendIcon from './SendIcon';
import {colors, whiteFg} from "./randomColors";
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/react'

const GrepIdea = () => {

    const {topicName} = useParams();
    const [modal, setModal] = useContext(modalContext);
    const [topicsData, setTopicsData] = useState(undefined);
    const [colorsArr, setColorsArr] = useState([]);
    const [msgData, setMsgData] = useState(undefined);
    const [searchInputVal, setSearchInputVal] = useState("Search Topics");
    const [createTopicInputVal, setCreateTopicInputVal] = useState("Create New Topic");
    const [sendMsgInputVal, setSendMsgInputVal] = useState("Share Your Ideas");

    useEffect(() =>{
        setModal(window.__ROUTE_DATA__);
        // delete window.__ROUTE_DATA__;

        fetch("/get/data/topics")
        .then(res => res.json())
        .then(data => {
            let tempColorsArr = [];
            for(let i=0; i<data.topics.length; i++){
                let nextColor = colors[Math.floor(Math.random()*colors.length)];
                if(i !== 0){
                    while((whiteFg.includes(tempColorsArr[i-1]) && whiteFg.includes(nextColor)) || (!whiteFg.includes(tempColorsArr[i-1]) && !whiteFg.includes(nextColor)) || tempColorsArr[i-1] === nextColor){
                        nextColor = colors[Math.floor(Math.random()*colors.length)];
                    }
                    tempColorsArr.push(nextColor);
                }else{
                    tempColorsArr.push(nextColor);
                }    
            }
            setColorsArr(tempColorsArr);
            setTopicsData(data);
        });

        fetch(`/get/data/messages/${topicName.toLowerCase()}`)
        .then(res => res.json())
        .then(data => setMsgData(data));
        // function refreshData()
        // {

        //     fetch(`/get/data/messages/${topicName.toLowerCase()}`)
        //     .then(res => res.json())
        //     .then(data => setMsgData(data));

        //     setTimeout(refreshData, 3000);
        // }
        // refreshData();
    }, [setModal, topicName]);
    
    function focusIn(e, text){
        if(e.target === e.currentTarget){
            if(e.target.value === text){
                e.target.value = "";
            }
            e.target.style.color = "#000";
            e.target.style.textAlign = 'left';
            if(text !== "Share Your Ideas"){
                e.target.select();
            }
        }
    }

    function focusOut(e, text){
        if(e.target === e.currentTarget && e.target.value === ""){
            e.target.value = text;
            e.target.style.color = "#c4c4c4";
            e.target.style.textAlign = 'center';
        }
    }

    function textAreaExpand(e){
        setSendMsgInputVal(e.target.value);
        if(e.target.value.includes("\n") || e.target.value.length >= 85){
            e.target.rows = 10;
            e.target.style.marginBottom = '80px';
            e.target.style.width = '90%';
            document.getElementById('bottom-bar').style.marginBottom = '500px';
            document.querySelector('body').style.overflowY = 'hidden';
            document.getElementById('msg-sending-div').style.width = '75%';
        }else{
            e.target.rows = 2;
            e.target.style.marginBottom = null;
            e.target.style.width = null;
            document.getElementById('bottom-bar').style.marginBottom = null;
            document.querySelector('body').style.overflowY = null;
            document.getElementById('msg-sending-div').style.width = '70%';
        }
    }

    function scrollDown(){
        document.getElementsByTagName('main')[0].scrollTop = document.getElementsByTagName('main')[0].scrollHeight;
    }

    return(
        <div id="grepidea">
            <nav id="navbar">
            <div></div>
            <h1 id="heading">
                GREPIDEA
            </h1>
            {modal.userInfo ? <div id="profile-pic" css={css`background-image: url(${modal.userInfo.imgUri})`}></div> : <div id="profile-pic" className="animate"></div>}
            </nav>  
        <aside>
            <input type="text" className="topics-input" id="search-topics" defaultValue={searchInputVal}  onFocus={(e) => focusIn(e, 'Search Topics')} onBlur={(e) => focusOut(e, 'Search Topics')} />
            {topicsData ? 
                topicsData.topics.map(
                    (value, index) => {
                        if(value !== topicName){
                            return <div css={css`
                                        background-color: ${colorsArr[index]};
                                        color: ${whiteFg.includes(colorsArr[index]) ? '#fff' : '#000'};
                                        border: 1px solid black;
                                        box-shadow: 0px 0px 10px rgb(0 0 0 / 50%) inset;
                                        cursor: pointer;
                                    `}
                                    className="topics" onClick={() => {navigate(`/topics/${value}`);window.location.reload();}} onMouseEnter={(e) => e.target.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)'} onMouseLeave={(e) => e.target.style.boxShadow = '0px 0px 10px rgb(0 0 0 / 50%) inset'}>{value.toUpperCase()}</div>
                        }else{
                            return null
                        }
                    }) 
                        : 
                    <div className="topics animate"></div>
            }
            {topicsData ? null : <div className="topics animate"></div>}
            {topicsData ? null : <div className="topics animate"></div>}
            {topicsData ? null : <div className="topics animate"></div>}
            {topicsData ? null : <div className="topics animate"></div>}
            {topicsData ? null : <div className="topics animate"></div>}
            {topicsData ? null : <div className="topics animate"></div>}
            {topicsData ? null : <div className="topics animate"></div>}
            {topicsData ? null : <div className="topics animate"></div>}
            {topicsData ? null : <div className="topics animate"></div>}
            {topicsData ? null : <div className="topics animate"></div>}
            {topicsData ? null : <div className="topics animate"></div>}
        </aside>  
        <main>
            <div id="topic-name">
                <h1>{topicName.toUpperCase()}</h1>
            </div>
            {msgData ? 
                msgData.msgs.map((obj) => {
                    return (
                        <div className="message">
                            <div className="user-info">
                                <div className="user-img" css={css`background-image: url(${obj.smallImgUri})`}></div>
                                {`${obj.firstName} ${obj.lastName}`}
                            </div>
                            <div className="msg-content">
                                <p>
                                    {obj.value}
                                </p>
                            </div>
                        </div>
                    )
                })
                    : 
                <div className="message">
                    <div className="user-info">
                        <div className="user-img animate"></div>
                        <div className="username-animate animate"></div>
                    </div>
                    <div className="msg-content">
                        <div className="msg-content-animate animate"></div>
                        <div className="msg-content-animate animate"></div>
                        <div className="msg-content-animate animate"></div>
                        <div className="msg-content-animate animate"></div>
                        <div className="msg-content-animate animate"></div>
                        <div className="msg-content-animate animate"></div>
                    </div>
                </div>
            }
            {msgData ? null : 
                            <div className="message">
                                <div className="user-info">
                                    <div className="user-img animate"></div>
                                    <div className="username-animate animate"></div>
                                </div>
                                <div className="msg-content">
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                </div>
                            </div>
            }
            {msgData ? null : 
                            <div className="message">
                                <div className="user-info">
                                    <div className="user-img animate"></div>
                                    <div className="username-animate animate"></div>
                                </div>
                                <div className="msg-content">
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                </div>
                            </div>
            }
            {msgData ? null : 
                            <div className="message">
                                <div className="user-info">
                                    <div className="user-img animate"></div>
                                    <div className="username-animate animate"></div>
                                </div>
                                <div className="msg-content">
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                    <div className="msg-content-animate animate"></div>
                                </div>
                            </div>
            }
        </main>
        <nav id="bottom-bar">
            <div>
                <input type="text" className="topics-input" id="create-topic" defaultValue={createTopicInputVal} onFocus={(e) => focusIn(e, 'Create New Topic')} onBlur={(e) => focusOut(e, "Create New Topic")} onChange={(e) => setCreateTopicInputVal(e.target.value)} />
                <SendIcon value={createTopicInputVal !== 'Create New Topic' ? createTopicInputVal : null} action="/createTopic" userInfo={{}}/>
            </div>
            <div id="msg-sending-div" style={{width: '70%'}}>
                <textarea name="" id="send-msg" cols="30" rows="2" defaultValue={sendMsgInputVal} onFocus={(e) => focusIn(e, 'Share Your Ideas')}  onBlur={(e) => focusOut(e, "Share Your Ideas")} onChange={(e) => textAreaExpand(e)} ></textarea>
                <SendIcon value={sendMsgInputVal !== 'Share Your Ideas' ? sendMsgInputVal : null} action="/sendMessage" userInfo = {modal.userInfo} topicName={topicName}/>
            </div>
        </nav>
        {msgData && scrollDown()}
    </div>
    );
}

export default GrepIdea;