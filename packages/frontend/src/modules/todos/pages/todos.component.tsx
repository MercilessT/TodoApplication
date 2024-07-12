import React from 'react'
import MobileComponent from '../components/mobile.component'
import TabletComponent from '../components/tablet.component'
import DesktopComponent from '../components/desktop.component'
import { useMediaQuery } from 'react-responsive'

const TodosComponent: React.FunctionComponent = () => {
	const isMobile = useMediaQuery({ maxWidth: 425 })
	const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 767 })

	return (
		<div>
			{isMobile && <MobileComponent />}
			{isTablet && <TabletComponent />}
			{!isMobile && !isTablet && <DesktopComponent />}
		</div>
	)
}

export default TodosComponent
