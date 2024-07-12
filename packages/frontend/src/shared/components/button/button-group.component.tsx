/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import { Button } from '@blueprintjs/core'

export enum ButtonName {
	ALL = 'All',
	PRIVATE = 'Private',
	PUBLIC = 'Public',
	COMPLETED = 'Completed',
}

const buttonGroupStyles = css`
	display: flex;
	gap: 10px;
`

const ButtonGroup: React.FunctionComponent<{
	selectedButton: ButtonName
	handleButtonClick: (buttonName: ButtonName) => void
}> = ({ selectedButton, handleButtonClick }) => {
	const renderButton = (buttonName: ButtonName) => (
		<Button
			className={`custom-button ${selectedButton === buttonName ? 'selected' : ''}`}
			intent={selectedButton === buttonName ? 'primary' : 'none'}
			onClick={() => handleButtonClick(buttonName)}>
			{buttonName}
		</Button>
	)

	return (
		<div css={buttonGroupStyles}>
			{renderButton(ButtonName.ALL)}
			{renderButton(ButtonName.PRIVATE)}
			{renderButton(ButtonName.PUBLIC)}
			{renderButton(ButtonName.COMPLETED)}
		</div>
	)
}

export default ButtonGroup
