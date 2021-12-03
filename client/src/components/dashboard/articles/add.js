import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../../hoc/adminLayout';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { validation, formValues } from './validationSchema';

import { 
    TextField, 
    Button, 
    Divider, 
    Chip,
    Paper,
    InputBase,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const AddArticle = (props) => {

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValues,
        validationSchema: validation,
        onSubmit:(values,{resetForm}) => {
            console.log(values)
        }
    })

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true:false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values]:null
    });

    return(
        <AdminLayout section="Articles">
            <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>

                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name="title"
                        label="Enter a title"
                        variant="outlined"
                        {...formik.getFieldProps('title')}
                        {...errorHelper(formik,'title')}
                        />
                </div>

                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name="excerpt"
                        label="Enter a excerpt"
                        variant="outlined"
                        {...formik.getFieldProps('excerpt')}
                        {...errorHelper(formik,'excerpt')}
                        multiline
                        rows={4}
                        />
                </div>

                <Divider className="mt-3 mb-3"/>
                <h4>Movie data and score</h4>
                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name="score"
                        label="Enter score"
                        variant="outlined"
                        {...formik.getFieldProps('score')}
                        {...errorHelper(formik,'score')}
                        />
                </div>

                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name="director"
                        label="Enter a Director"
                        variant="outlined"
                        {...formik.getFieldProps('director')}
                        {...errorHelper(formik,'director')}
                        />
                </div>

                <FormControl variant="outlined">
                    <h5>Select a status</h5>
                    <Select
                        name="status"
                        {...formik.getFieldProps('status')}
                        error = {formik.errors.status && formik.touched.status ? true:false}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="public">Public</MenuItem>
                    </Select>

                    { formik.errors.status && formik.touched.status ?
                        <FormHelperText error={true}>
                            {formik.errors.status}
                        </FormHelperText>
                    :null}
                </FormControl>

                <Divider className="mt-3 mb-3"/>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit">
                    Add Article
                </Button>

            </form>
        </AdminLayout>
    )
}

export default AddArticle;