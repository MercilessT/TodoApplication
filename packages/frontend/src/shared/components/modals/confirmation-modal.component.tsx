import React from 'react'
import { Button, Dialog, Classes } from '@blueprintjs/core'

interface ConfirmationModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

const ConfirmationModal: React.FunctionComponent<ConfirmationModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
}) => {
	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Confirmation">
			<div className={Classes.DIALOG_BODY}>
				Are you sure you want to delete this item?
			</div>
			<div className={Classes.DIALOG_FOOTER}>
				<div className={Classes.DIALOG_FOOTER_ACTIONS}>
					<Button intent="danger" onClick={onConfirm}>
						Yes
					</Button>
					<Button onClick={onClose}>No</Button>
				</div>
			</div>
		</Dialog>
	)
}

export default ConfirmationModal
