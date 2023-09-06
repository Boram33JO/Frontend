import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { connect } from '../api/notify'
import { EventSourcePolyfill } from 'event-source-polyfill';

const NotifyPage = () => {
    const [eventData, setEventData] = useState("");


    useEffect(() => {
        const accessToken = localStorage.getItem("AccessToken");
        const eventSource = new EventSourcePolyfill('https://api.weare777team.store/notifications/connect',
            {
                headers: {
                    accessToken: accessToken,
                }
            })
        // const eventSource = new EventSource('https://api.weare777team.store/notifications/connect');

        eventSource.onopen = (e) => {
            console.log(e);
        }

        eventSource.addEventListener("message", function (e) {
            console.log(e);
        })
        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            setEventData(parsedData.message);
        };

        eventSource.onerror = (error) => {
            console.error('Error:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const handleButtonClick = async () => {
        const response = await connect();
        console.log(response);
    }

    return (
        <Container>
            <ConnectButton onClick={handleButtonClick}>
                Connect
            </ConnectButton>
        </Container>
    )
}

export default NotifyPage

const Container = styled.div`
    background: gray;
    width: 500px;
    height: 500px;
    box-sizing: border-box;
    padding: 20px;
`

const ConnectButton = styled.div`
    width: 100px;
    height: 50px;
    background: white;
    border: 1px solid black;
    color: black;
    font-size: 20px;
    line-height: 30px;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
`