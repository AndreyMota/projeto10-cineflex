import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";


export default function SeatsPage({ pedido, setPedido }) {
    const params = useParams();
    const [assentos, setAssentos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ass, setAss] = useState([]);
    const [nome, setNome] = useState("");
	const [cpf, setCpf] = useState("");
    const sento = [];
    useEffect(() => {
        
        axios
        .get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`)
        .then((response) => {
            console.log(response.data);
            setAssentos(response.data);
            setAss(response.data.seats)
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    }, []);
    if (isLoading) {
        return <div>Carregando...</div>
    } 

    function changeStateAssets(aid) {
        sento.push(aid)
    }

    function soSucces (event) {
		event.preventDefault();
        alert('clicou');
        const novo = {
            titu: assentos.movie.title,
            data: assentos.day.date,
            hora: assentos.name,
            seto: sento,
            comp: nome,
            cpif: cpf
        };
        console.log(novo);

        setPedido(novo);

    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {ass.map(x => {
                    return (
                        <div data-test="seat" onClick={() => changeStateAssets(x.id)}>
                            <SeatItem
                            status = {x.isAvailable}
                            selecionado = {false}
                            >{x.id}</SeatItem>
                        </div>
                    )
                })}
            </SeatsContainer>

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
                <form>
                    Nome do Comprador:
                    <input data-test="client-name" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome..." required/>

                    CPF do Comprador:
                    <input data-test="client-cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="Digite seu CPF..." required/>
                    
                    <Link to={'/sucesso'}><button data-test="book-seat-btn" onClick={soSucces} type="submit">Reservar Assento(s)</button></Link>
                </form>
            </FormContainer>
            
            
                <FooterContainer>
                    <div data-test="footer">
                        <div>
                            <img src={assentos?.movie.posterURL} alt="" />
                        </div>
                        <div>
                            <p>{assentos.movie.title}</p>
                            <p>{assentos.day.weekday} - {assentos.name}</p>
                        </div>
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
    if (props.selecionado && !props.status) {
      return "rgba(26, 174, 158, 1)";
    } else 
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