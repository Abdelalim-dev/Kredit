import React from 'react';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';

const LoaderContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
const Loader = () => (<LoaderContainer>
    <LottieView source={require('src/assets/animations/loading.json')} autoPlay loop />
</LoaderContainer>)


export default Loader