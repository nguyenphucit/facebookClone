import * as yup from 'yup'
export const RegisterSchema=yup.object({
    firstname:yup
    .string()
    .required("firsname is required")
    ,
    surname:yup
    .string()
    .required("surname is required")
    ,
    email:yup
    .string()
    .email()
    .matches(/^(?!.*@[^,]*,)/)
    .required()
    .min(6)
    .max(50),
    password:yup
    .string()
    .required("password is required")
    .min(6)
    .max(50),
    gender: yup
    .string()
    .required()
})