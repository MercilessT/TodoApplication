/** @jsxImportSource @emotion/react */
import React from 'react'
import { Button, Intent } from '@blueprintjs/core'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { ROUTER_KEYS } from '~/shared/keys'
import { styles as importedStyles } from './styles'

const styles = {
	...importedStyles,
	buttonStyles: css`
		${importedStyles.buttonStyles};
		width: 100px;
	`,
}

const HomeAuth: React.FC = () => (
	<div css={styles.container}>
		<div css={styles.appName}>Todo App</div>
		<div css={styles.buttonContainer}>
			<Link to={ROUTER_KEYS.LOGIN}>
				<Button
					css={styles.buttonStyles}
					intent={Intent.NONE}
					text={'Login'}
				/>
			</Link>

			<Link to={ROUTER_KEYS.REGISTER}>
				<Button
					css={styles.buttonStyles}
					intent={Intent.NONE}
					text={'Register'}
				/>
			</Link>
		</div>
		<div css={styles.forgotContainer}>
			<Link to={ROUTER_KEYS.FORGOT_PASSWORD} css={styles.forgotLink}>
				Forgot password?
			</Link>
		</div>
	</div>
)

export default HomeAuth
