import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/apiCalls'
import styled from 'styled-components'

const Container = styled.div`
display:flex;
align-items: center;
justify-content: center; 
height: 100vh; 
flex-direction: column; 
`;
const Input = styled.input`
padding : 10px; 
margin-bottom: 20px;
`;
const Button = styled.button`
padding : 10px;
width: 100px;
background-color: black; 
color: white;  `;
export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password })

    }
    return (
        <Container>
            <Input type='text' placeholder='username' onChange={e => setUsername(e.target.value)} />
            <Input type='password' placehoder="password" onChange={e => setPassword(e.target.value)} />
            <Button onClick={handleClick}>Login</Button>
        </Container>
    )
}
