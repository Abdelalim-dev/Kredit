import React from 'react';
import styled from 'styled-components';


const LoaderContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: pink;
`

const Loading = styled.Image`
`

const Loader = () => (<LoaderContainer>
    <Loading source={require('../assets/images/logo.png')} />
</LoaderContainer>)


export default Loader