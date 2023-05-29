import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
/* import axios from "../axiosConfig.jsx"; */


export default function SessionsPage() {
    const params = useParams()
    const [session, setSession] = useState([]);

    useEffect(() => {
        axios
        .get(`/movies/${params.idFilme}/showtimes`)
        .then((response) => {
            console.log(response.data);
            setSession(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {session.days?.map(x => {
                    return (
                        <SessionContainer>
                            {x.weekday} - {x.date}
                            <ButtonsContainer>
                                {x.showtimes.map(h => {
                                    return (
                                        <Link to={`/assentos/${h.id}`}>
                                            <ButtonHorario id={h.id}>{h.name}</ButtonHorario>
                                        </Link>
                                    )
                                })}
                            </ButtonsContainer>
                        </SessionContainer>
                    )
                })}
            </div>                
                

            <FooterContainer>
                <div>
                    <img src={session.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{session.title}</p>
                </div>
            </FooterContainer> 

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const ButtonHorario = styled.div`
    width: 83px;
    height: 43px;
    left: 23px;
    top: 227px;

    background: #E8833A;
    border-radius: 3px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 8px;

    color: white;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`


{/* <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                        <button>14:00</button>
                        <button>15:00</button>
                    </ButtonsContainer>
                </SessionContainer>

                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                        <button>14:00</button>
                        <button>15:00</button>
                    </ButtonsContainer>
                </SessionContainer>

                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                        <button>14:00</button>
                        <button>15:00</button>
                    </ButtonsContainer>
                </SessionContainer>
            /div> */}