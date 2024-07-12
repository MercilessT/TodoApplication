import * as React from 'react'
import { Route } from 'react-router-dom'
import { ROUTER_KEYS } from '~/shared/keys'
import HomeAuth from '~/modules/auth/pages/home.component'
import Login from '~/modules/auth/pages/login.component'
import Register from '~/modules/auth/pages/register.component'
import TodosComponent from '~/modules/todos/pages/todos.component'
import EditTodoPage from '~/modules/todos/pages/edit.component'
import DetailsTodoPage from '~/modules/todos/pages/details.component'
import ChangePassword from '../modules/auth/pages/change-password.component'
import SendEmail from '../modules/auth/pages/send-email-change-password.component'

export const publicRoutes = (
	<>
		<Route path={ROUTER_KEYS.HOME} element={<HomeAuth />} />
		<Route path={ROUTER_KEYS.LOGIN} element={<Login />} />
		<Route path={ROUTER_KEYS.REGISTER} element={<Register />} />
		<Route path={ROUTER_KEYS.FORGOT_PASSWORD} element={<SendEmail />} />
		<Route
			path={ROUTER_KEYS.CHANGE_PASSWORD}
			element={<ChangePassword />}
		/>
	</>
)

export const privateRoutes = (
	<>
		<Route path={ROUTER_KEYS.TODOS} element={<TodosComponent />} />
		<Route path={ROUTER_KEYS.EDIT} element={<EditTodoPage />} />
		<Route path={ROUTER_KEYS.VIEW} element={<DetailsTodoPage />} />
	</>
)
