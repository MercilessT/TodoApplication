import { css } from '@emotion/react'
import { COLORS } from '~/shared/styles'

export const styles = {
	container: css`
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 10px;
		padding: 20px;
	`,
	tableContainer: css`
		padding: 0 20px;
	`,
	tableColumnName: css`
		background-color: ${COLORS.terraCotta};
		padding: 10px;
		border-right: 1px solid ${COLORS.lightGray};
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: ${COLORS.white};
		text-align: center;
	`,
	tableSettings: css`
		display: grid;
		grid-template-columns: 25% 50% 25%;
		margin-top: 20px;
		border: 1px solid ${COLORS.lightGray};
		border-collapse: collapse;
	`,
	tableColumn: css`
		padding: 10px;
		border-right: 1px solid ${COLORS.lightGray};
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	`,
	tableColumnActions: css`
		display: flex;
		gap: 10px;
		padding: 10px;
		justify-content: center;
	`,
	buttonsCreateLogoutContainer: css`
		display: flex;
		justify-content: space-between;
		width: 100%;
	`,
}
