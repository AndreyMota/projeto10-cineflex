import styled from "styled-components"
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Test() {
    const params = useParams();
    useEffect(() => {

    })
    axios.get(`/movies/2/showtimes`)
        .then(r => console.log(r))
        .catch(e => console.log(e));

    return (
        <Geral>
            <h2>TESTE</h2>
            <p>tyghjklpiouytgfcvbnhkjuyuytres</p>
        </Geral>
    )
}

const Geral = styled.div`
    margin-top: 300px
`;
