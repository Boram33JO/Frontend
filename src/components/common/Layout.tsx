import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'

const Layout = () => {
    return (
        <Container>
            <Header />
            <Outlet />
            <Footer />
        </Container>
    )
}

export default Layout

const Container = styled.div`
    width: 390px;
    margin: 0 auto;
    border: 1px solid black;
`