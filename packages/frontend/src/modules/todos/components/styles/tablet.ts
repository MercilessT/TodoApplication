import { css } from '@emotion/react'
import { COLORS } from '~/shared/styles'

export const styles = {
	container: css`
		display: flex;
		gap: 10px;
		padding: 20px;
		justify-content: space-between;
	`,
	inputGroupContainer: css`
		display: flex;
		gap: 10px;
	`,
	sliderContainer: css`
		padding: 0 20px;
	`,
	button: css`
		margin-top: 20px;
	`,
	todoCard: css`
		padding: 10px;
		border: 1px solid ${COLORS.lightGray};
		background-color: ${COLORS.antiFlashWhite};
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	`,
	todoTitle: css`
		font-weight: bold;
		margin-bottom: 10px;
	`,
	todoActions: css`
		display: flex;
		gap: 10px;
		justify-content: flex-start;
		margin-top: 10px;
	`,
	buttonsCreateLogoutContainer: css`
		display: flex;
		justify-content: space-between;
		width: 100%;
	`,
}