/** @jsxImportSource @emotion/react */
import * as React from 'react'
import { css } from '@emotion/react'
import { Spinner } from '@blueprintjs/core'

const loadingSpinnerStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px;
`

const LoadingSpinner: React.FunctionComponent = () => (
	<div css={loadingSpinnerStyles}>
		<Spinner />
	</div>
)

export default LoadingSpinner
