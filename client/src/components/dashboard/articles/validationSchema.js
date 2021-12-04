import * as Yup from 'yup';

export const formValues = {
    title:'Contrary to popular belief',
    content:'',
    excerpt:'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    score:'72',
    director:'John Joe',
    actors:['John Joe','Steve Smith','Dave Don'],
    status:'draft'
}

export const validation = () => (
    Yup.object({
        title:Yup.string()
        .required('Sorry the title is required'),
        content:Yup.string()
        .required('Sorry the content is required')
        .min(50,'That is it ? ...write some more'),
        excerpt:Yup.string()
        .required('Sorry the excerpt is required')
        .max(500,'Sorry its 500 max'),
        score: Yup.number()
        .required('Sorry the score is required')
        .min(0,'0 is the minimum')
        .max(100,'100 is the max'),
        director:Yup.string()
        .required('Sorry the director is required'),
        actors:Yup.array()
        .required('Must have actors')
        .min(3,'Minimum is 3'),
        status:Yup.string()
        .required('Sorry the status is required')
    })
)