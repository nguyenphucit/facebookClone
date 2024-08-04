import * as yup from 'yup'

export const LoginSchema=yup.object({
    email:yup
    .string()
    .email()
    .matches(/^(?!.*@[^,]*,)/)
    .required()
    .min(6)
    .max(50),
    password:yup
    .string()
    .required()
    .min(6)
    .max(50)
})