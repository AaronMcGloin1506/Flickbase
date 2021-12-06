import React, { useEffect } from 'react';
import AdminLayout from '../../../hoc/adminLayout';
import { getPaginateArticles } from '../../../store/actions/article_actions'
import { useDispatch, useSelector } from 'react-redux';
import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Articles = () => {

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getPaginateArticles())
        
    },[dispatch])

    return (
        <AdminLayout section="Articles">
            <div className="articles-table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="mr-2">
                        <LinkContainer to="/dashboard/articles/add">
                            <Button variant="secondary">Add article</Button> 
                        </LinkContainer>
                    </ButtonGroup>
                    <form onSubmit={()=> alert('search')}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id='btmGroupAddOn2'>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="text"
                                placeholder="example"
                            />
                        </InputGroup>
                    </form>
                </ButtonToolbar>




            </div>
        </AdminLayout>
    )
}

export default Articles 