import { css } from '@emotion/react'
import { COLORS } from '~/shared/styles'

export const styles = {
	container: css`
		display: flex;
		flex-direction: column;
		padding: 20px;
		gap: 20px;
	`,
	buttonGroupContainer: css`
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: flex-start;
	`,
	todoCard: css`
		margin-bottom: 20px;
		padding: 10px;
		background-color: ${COLORS.antiFlashWhite};
	`,
	todoTitle: css`
		margin-bottom: 10px;
		font-weight: bold;
	`,
	todoActions: css`
		display: flex;
		gap: 10px;
		justify-content: flex-start;
		margin-top: 10px;
	`,
	contentPadding: css`
		padding: 0 20px;
	`,
	marginTop20: css`
		margin-top: 20px;
	`,
	description: css`
		margin-top: 10px;
	`,
	buttonsCreateLogoutContainer: css`
		display: flex;
		justify-content: space-between;
		width: 100%;
	`,
}