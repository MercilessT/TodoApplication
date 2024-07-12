/** @jsxImportSource @emotion/react */
import React, { FunctionComponent } from 'react'
import { css, SerializedStyles } from '@emotion/react'
import { FormGroup, InputGroup, Intent, TextArea } from '@blueprintjs/core'
import { useFormik } from 'formik'

interface CustomInputOrTextAreaProps {
	label?: string
	labelFor: string
	labelInfo?: string
	formik: ReturnType<typeof useFormik>
	fieldName: string
	inputComponent: typeof InputGroup | typeof TextArea
	placeholder?: string
	css?: SerializedStyles
	type?: 'text' | 'password'
}

const styledInput = css`
	width: 100%;
	resize: vertical;
	max-height: 200px;
`

const CustomInputOrTextArea: FunctionComponent<CustomInputOrTextAreaProps> = ({
	label,
	labelFor,
	labelInfo,
	formik,
	fieldName,
	inputComponent: InputComponent,
	css: customCss,
	type = 'text',
	...rest
}) => (
	<FormGroup
		label={label}
		labelFor={labelFor}
		labelInfo={labelInfo}
		intent={
			formik.errors[fieldName] && formik.touched[fieldName]
				? Intent.DANGER
				: Intent.NONE
		}
		helperText={
			formik.errors[fieldName] && formik.touched[fieldName]
				? (formik.errors[fieldName] as string)
				: undefined
		}>
		<InputComponent
			id={labelFor}
			{...formik.getFieldProps(fieldName)}
			{...rest}
			type={type}
			css={customCss || styledInput}
		/>
	</FormGroup>
)

export default CustomInputOrTextArea
