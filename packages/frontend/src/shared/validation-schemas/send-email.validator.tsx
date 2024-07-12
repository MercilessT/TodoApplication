import * as Yup from 'yup'

const sendEmailSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
})

export default sendEmailSchema
