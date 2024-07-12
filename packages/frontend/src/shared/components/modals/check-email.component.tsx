import React from 'react'
import { Button, Dialog, Classes } from '@blueprintjs/core'

interface CheckEmailModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	description: string
}

const CheckEmailModal: React.FunctionComponent<CheckEmailModalProps> = ({
	isOpen,
	onClose,
	title,
	description,
}) => {
	return (
		<Dialog isOpen={isOpen} onClose={onClose} title={title}>
			<div className={Classes.DIALOG_BODY}>{description}</div>
			<div className={Classes.DIALOG_FOOTER}>
				<div className={Classes.DIALOG_FOOTER_ACTIONS}>
					<Button onClick={onClose}>OK</Button>
				</div>
			</div>
		</Dialog>
	)
}

export default CheckEmailModal
