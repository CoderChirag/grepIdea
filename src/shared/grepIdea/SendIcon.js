import React from 'react';

const SendIcon = (props) => {

    function addMsg(){
        console.log(true);
        let html = `<div class="message">
                        <div class="user-info">
                            <div class="user-img" style={"background-image: url(${props.userInfo.smallImgUri})"}></div>
                                ${props.userInfo.firstName} ${props.userInfo.lastName}
                            </div>
                        <div class="msg-content">
                            <p>
                                ${props.value}
                            </p>
                        </div>
                    </div>`
        document.getElementsByTagName('main')[0].innerHTML += html;
        let input = document.getElementById('send-msg');
        input.value = 'Share Your Ideas';
        input.style.textAlign = 'center';
        input.style.color = '#c4c4c4';
        document.getElementsByTagName('main')[0].scrollTop = document.getElementsByTagName('main')[0].scrollHeight;
    }

    return(
        <React.Fragment>
        <svg
            width="38"
            height="35"
            viewBox="0 0 38 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="send-icon"
            onClick={() => fetch(props.action,
                {
                    method: 'post',
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                    "Content-Type": "application/json",
                    }, 
                    body: JSON.stringify({
                        value: props.value,
                        topicName: props.topicName,
                         ...props.userInfo
                    })
                }
            ).then((res) => {!/\/error/.test(res.url) ? (/\/sendMsg/.test(res.url) ? addMsg() : window.location.href = res.url) : alert('Something Went Wrong.\nPlease Try Again')})}
        >
            <path
            d="M36.8509 15.7389L2.85328 0.185027C2.51094 0.0284195 2.12992 -0.0305635 1.75447 0.0149275C1.37903 0.0604186 1.02456 0.208517 0.732229 0.442025C0.439898 0.675533 0.221699 0.98487 0.102969 1.33412C-0.0157604 1.68336 -0.0301491 2.05819 0.0614744 2.41506L2.48531 11.8427L18.0002 17.4984L2.48531 23.1542L0.0614744 32.5818C-0.031873 32.9389 -0.0186852 33.3145 0.0994953 33.6646C0.217676 34.0148 0.435962 34.3249 0.728821 34.5589C1.02168 34.7928 1.377 34.9408 1.75322 34.9856C2.12944 35.0304 2.51101 34.9701 2.85328 34.8118L36.8509 19.258C37.1945 19.1009 37.485 18.8521 37.6885 18.5405C37.8919 18.229 38 17.8675 38 17.4984C38 17.1294 37.8919 16.7679 37.6885 16.4563C37.485 16.1447 37.1945 15.8959 36.8509 15.7389Z"
            fill="#0053F5"
            />
        </svg>
        </React.Fragment>
    );
}

export default SendIcon;