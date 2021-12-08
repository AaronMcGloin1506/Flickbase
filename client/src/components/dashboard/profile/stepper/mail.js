import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { changeEmail } from '../../../../store/actions/users_actions'

import {
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel
} from '@material-ui/core'

const EmailStepper = ({users}) => {

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Enter old email','Enter new email','Are you sure ?']

    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{email:'',newEmail:''},
        validationSchema:Yup.object({
            email: Yup.string()
            .required('This is required')
            .email('This is not a valid email')
            .test('match','incorrect email',(email)=>{
                return email === users.data.email
            }),
            newEmail: Yup.string()
            .required('This is required')
            .email('This is not a valid email')
            .test('equal','New email cannot be old email',(email)=>{
                return email !== users.data.email
            }),
        }),
        onSubmit:(values,{resetForm})=>{
            dispatch(changeEmail(values))
        }
    })

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true:false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values]:null
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep+1 )
    }

    const handlePrev = () => {
        setActiveStep((prevActiveStep) => prevActiveStep-1 )
    }

    const nextBtn = () => ( 
        <Button className="mt-3" variant="contained" color="primary" onClick={handleNext}>
            Next
        </Button>
    )

    const prevBtn = () => ( 
        <Button className="mt-3 ml-2" variant="contained"  onClick={handlePrev}>
            Previous 
        </Button>
    )


    return (
        <>
            <Stepper activeStep={activeStep}>
                { steps.map((label)=>{
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
                { activeStep === 0 ?
                <div className="form-group">
                    <TextField 
                        style={{width:'100%'}}
                        name="email"
                        label="Enter your email"
                        variant="outlined"
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik,'email')}
                    />
                    
                    { formik.values.email && !formik.errors.email ?
                        nextBtn()
                    :null}
                </div>
                :null}
                { activeStep === 1 ?
                <div className="form-group">
                    <TextField 
                        style={{width:'100%'}}
                        name="newEmail"
                        label="Enter your new email"
                        variant="outlined"
                        {...formik.getFieldProps('newEmail')}
                        {...errorHelper(formik,'newEmail')}
                    />
                   
                    { formik.values.newEmail && !formik.errors.newEmail ?
                        nextBtn()
                    :null}
                     {prevBtn()}
                </div>
                :null}

                { activeStep === 2 ?
                    <div className="form-group">
                        <Button className="mt-3" variant="contained" color="primary" onClick={formik.submitForm}>
                            Yes change the email
                        </Button>
                        {prevBtn()}
                    </div>
                :null}
            </form>
        </>
    )
}

export default EmailStepper