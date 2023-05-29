import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function SeatsPage() {
    const params = useParams();
    const [assentos, setAssentos] = useState([]);
    useEffect(() => {
        
        axios
        .get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`)
        .then((response) => {
            console.log(response.data);
            setAssentos(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    if (!assentos) {
        return <div>Carregando...</div>
    } 

    function changeStateAssets() {

    }
    
    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {assentos.seats?.map(x => {
                    return (
                        <SeatItem
                            status = {x.seats.isAvailable}
                        >{x.id}</SeatItem>
                    )
                })}
            </SeatsContainer>
            {/* <SeatsContainer>
                <SeatItem>01</SeatItem>
                <SeatItem>02</SeatItem>
                <SeatItem>03</SeatItem>
                <SeatItem>04</SeatItem>
                <SeatItem>05</SeatItem>
            </SeatsContainer> */}

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    {/* {<img src={assentos.movie.postURL} alt="poster" />} */}
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                    <p>Sexta - 14h00</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const SeatItem = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: 'Roboto';
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  background-color: ${(props) => {
   /*  if (props.status === "selected") {
      return "rgba(26, 174, 158, 1)";
    } else */ 
    if (props.status) {
      return "rgba(195, 207, 217, 1)";
    } else if (!props.status) {
      return "rgba(251, 225, 146, 1)";
    }
  }};
  border: 1px solid ${(props) => {
    if (props.status === "selected") {
      return "rgba(14, 125, 113, 1)";
    } else if (props.status === "available") {
      return "rgba(123, 139, 153, 1)";
    } else if (props.status === "unavailable") {
      return "rgba(247, 197, 43, 1)";
    }
  }};
`;
/* const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px; 
`*/

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