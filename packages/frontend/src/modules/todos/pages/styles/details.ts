import { css } from '@emotion/react'

export const styles = {
	container: css`
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	`,
	card: css`
		width: 80%;
		max-width: 1600px;
		margin: 0 auto;
	`,
	details: css`
		text-align: center;
	`,
	marginTop20: css`
		margin-top: 20px;
	`,
	section: css`
		margin-top: 20px;
		display: flex;
		flex-direction: column;
	`,
	boldText: css`
		font-weight: bold;
	`,
	switchContainer: css`
		display: flex;
		align-items: center;
		margin-top: 20px;
		gap: 10px;
	`,
	switch: css`
		margin-bottom: 0;
	`,
	title: css`
		margin-top: 10px;
	`,
}
