import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SuccessPage({ pedido }) {
    const [isLoading, setIsLoading] = useState(true);
    console.log(pedido);

    if (!pedido) {
        return <div>Carregando...</div>
    } 

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>
            <div data-test="movie-info">
                <TextContainer>
                    <strong><p>Filme e sessão</p></strong>
                    <p>{pedido.titu}</p>
                    <p>{pedido.data} - {pedido.hora}</p>
                </TextContainer>
            </div>
            <div data-test="seats-info">
                <TextContainer>
                    <strong><p>Ingressos</p></strong>
                    {pedido.sento?.map(x => {
                        return (
                            <p>Assento {x}</p>
                        )
                    })}
                </TextContainer>
            </div>
            <div data-test="client-info">
                <TextContainer>
                    <strong><p>Comprador</p></strong>
                    <p>Nome: {pedido.comp}</p>
                    <p>CPF: {pedido.cpif}</p>
                </TextContainer>
            </div>
            <Link to={'/'}>
                <button data-test="go-home-btn">Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`