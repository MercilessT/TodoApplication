import { css } from '@emotion/react'
import { COLORS } from '~/shared/styles'

export const styles = {
	appName: css`
		position: absolute;
		top: 200px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 24px;
	`,
	buttonContainer: css`
		display: flex;
		flex-direction: column;
		gap: 16px;
	`,
	forgotContainer: css`
		margin-top: 20px;
	`,
	forgotLink: css`
		color: ${COLORS.blue};
		text-align: center;
	`,
	container: css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	`,
	formContainer: css`
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 300px;
		padding: 20px;
		border: 1px solid ${COLORS.lightGray};
		border-radius: 4px;
		background-color: ${COLORS.cultured};
		margin-bottom: 20px;
	`,
	buttonStyles: css`
		width: 100%;
		height: 36px;
	`,
	linkStyles: css`
		margin-top: 10px;
		text-align: center;
	`,
}
