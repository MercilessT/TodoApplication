import { css } from '@emotion/react'
import { COLORS } from '~/shared/styles'

export const styles = {
	container: css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 20px;
		box-sizing: border-box;
	`,
	form: css`
		width: 80%;
		max-width: 1600px;
		margin: 0 auto;
		border: 1px solid ${COLORS.lightGray};
		padding: 20px;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	`,
	title: css`
		text-align: center;
	`,
	switchContainer: css`
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		gap: 10px;
	`,
	buttonContainer: css`
		display: flex;
		gap: 10px;
		margin-top: 20px;
	`,
	switch: css`
		margin-bottom: 0;
	`,
}
