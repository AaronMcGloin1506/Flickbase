import React from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'

const MainLayout = (props) => {

    const siteLayout = useSelector(state=>state.site.layout)

    return(
        <Container className={`app_container mb-5 ${siteLayout}`}>
            {props.children}
            <ToastContainer/>
        </Container>
    )
}

export default MainLayout