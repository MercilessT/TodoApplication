import React, { useState } from 'react'
import { Button, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import { useNavigate } from 'react-router-dom'
import { ROUTER_KEYS } from '../../../shared/keys'

interface UserProfileProps {
	user: { email: string }
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
	const navigate = useNavigate()
	const [isProfileOpen, setIsProfileOpen] = useState(false)

	const handleProfileClick = () => {
		setIsProfileOpen(!isProfileOpen)
	}

	const handleChangePasswordClick = () => {
		navigate(ROUTER_KEYS.FORGOT_PASSWORD)
	}

	return (
		<Popover
			isOpen={isProfileOpen}
			position={Position.BOTTOM}
			onInteraction={state => setIsProfileOpen(state)}
			content={
				<>
					<Menu>
						<MenuItem text={user.email} />
					</Menu>
					<Menu>
						<MenuItem
							text={'Change Password'}
							onClick={handleChangePasswordClick}
						/>
					</Menu>
				</>
			}>
			<Button intent="primary" onClick={handleProfileClick}>
				Profile
			</Button>
		</Popover>
	)
}

export default UserProfile
