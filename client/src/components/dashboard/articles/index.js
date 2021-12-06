import React, { useEffect } from 'react';
import AdminLayout from '../../../hoc/adminLayout';
import { getPaginateArticles } from '../../../store/actions/article_actions'
import PaginationComponent from './paginate';
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

    const articles = useSelector(state=>state.articles)
    const dispatch = useDispatch();

    let arts = articles.adminArticles;
    
    useEffect(()=>{
        dispatch(getPaginateArticles())
    },[dispatch])

    const goToPrevPage = (page) => {
        dispatch(getPaginateArticles(page))
    }

    const goToNextPage = (page) => {
        dispatch(getPaginateArticles(page))
    }

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

                <PaginationComponent 
                    arts={arts}
                    prev={(page)=>goToPrevPage(page)} 
                    next={(page)=>goToNextPage(page)}   
                />


            </div>
        </AdminLayout>
    )
}

export default Articles 