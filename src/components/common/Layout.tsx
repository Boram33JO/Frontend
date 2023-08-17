import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import { useState } from 'react'
import Side from './Side'

const Layout = () => {
    const [sideOpen, setSideOpen] = useState<boolean>(false);
    return (
        <Container>
            <Header setSideOpen={setSideOpen} />
            <Outlet />
            {/* <Footer /> */}
            <Inner $open={sideOpen} >
                <Side sideOpen={sideOpen} setSideOpen={setSideOpen} />
            </Inner>
        </Container>
    )
}

export default Layout

const Container = styled.div`
    position: relative;
    width: 390px;
    margin: 0 auto;
    background-color: #141414;
`

const Inner = styled.div<{ $open: boolean }>`
    position: fixed;
    width: inherit;
    height: 100%;
    min-height: 100%;
    
    overflow: hidden;
    top: 0;
    z-index: 3;
    visibility: ${(props) => (props.$open ? "visible" : "hidden")};
`