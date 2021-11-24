import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Button
} from "@material-ui/core"

import FavoriteIcon from '@material-ui/icons/Favorite';

const ArticleCard = ({article}) => {
    return(
        <Card>
            <CardMedia
                style={{height:0,paddingTop:'56.25%'}}
                image="https://picsum.photos/200"
                title="Some title"
            />
            <CardContent>
                <Typography gutterBottom variant="h5"> 
                     Some Title
                </Typography>
                <Typography variant="body2" component="p"> 
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon/>
                </IconButton>
                <Button size="small" color="primary" component={RouterLink} to="/article/id">
                    View Article
                </Button>
            </CardActions>
        </Card>
    ) 
}

export default ArticleCard;   