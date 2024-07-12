import { css } from '@emotion/css'
import { COLORS } from '../../styles'

export const btnStyles = (disabled: boolean): string => {
	return css`
		width: 100%;
		padding: 17px 0;
		font-size: 20px;
		font-weight: 700;
		color: ${disabled ? COLORS.imperial : COLORS.white};
		background-color: ${disabled
			? COLORS.americanPurple
			: COLORS.mediumVioletRed};
		border: none;
		border-radius: 28px;
		box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.06);
		text-align: center;
	`
}

export const btnContentWrapper = css`
	display: flex;
	justify-content: center;
	align-items: center;
`

export const iconWrapper = css`
	display: flex;
	align-items: center;
`

export const mr = css`
	margin-right: 15px;
`
