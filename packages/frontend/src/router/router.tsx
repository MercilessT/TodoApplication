import * as React from 'react'
import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { publicRoutes } from './routes'
import { privateRoutes } from './routes'
import { useAuthStore } from '~/store/auth.store'

const AppRouter: React.FunctionComponent = () => {
	const { accessToken } = useAuthStore()

	return (
		<Router>
			<Routes>
				{accessToken && privateRoutes}
				{publicRoutes}
			</Routes>
		</Router>
	)
}

export default AppRouter
