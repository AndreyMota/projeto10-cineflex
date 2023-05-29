import styled from "styled-components"
import axios from "../axiosConfig.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            alert("chegou aqui");
            const response = await axios.get('/movies');
            console.log(response);
            setFilmes(response.data);
        } catch (error) {
            console.error('Erro ao obter os dados: ' + error);
        }
        };
        fetchData();
    }, []);
    /* axios.get('/movies')
        .then(r => {
            console.log(r);

        })
        .catch(e => console.log(e)); */
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {/* <MovieContainer>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster"/>
                </MovieContainer>

                <MovieContainer>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster"/>
                </MovieContainer>

                <MovieContainer>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster"/>
                </MovieContainer>

                <MovieContainer>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster"/>
                </MovieContainer> */}
                {filmes.map(x => {
                    return (
                        <Link to={`/sessoes/${x.id}`}>
                            <MovieContainer><img src={x.posterURL}/></MovieContainer>
                        </Link>
                    )
                })}
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`