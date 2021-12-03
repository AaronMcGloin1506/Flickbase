import * as Yup from 'yup';

export const formValues = {
    title:'',
    content:'',
    excerpt:'',
    score:'',
    director:'',
    actors:[],
    status:'draft'
}

export const validation = () => {
    Yup.object({
        title: Yup.string()
        .required('Sorry the title is required'),
        content: Yup.string()
        .required('Sorry content is required')
        .min(50,'That is it? Write some more'),
        excerpt: Yup.string()
        .required('Sorry excerpt is required')
        .max(500, 'Sorry it is 500 max'),
        score: Yup.number()
        .required('Sorry score is required')
        .min(0,'0 is the minimum')
        .max(100,'100 is the max'),
        director: Yup.string()
        .required('Sorry director is required'),
        actors: Yup.array()
        .required('Sorry actors required')
        .min(3,"Minimum is 3"),
        status: Yup.string()
        .required('Sorry the status is required')
    })
}