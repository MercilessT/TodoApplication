export const ROUTER_KEYS = {
	verificationLink: (token: string) => `verify/${token}`,
	changePasswordLink: (token: string) => `change-password?token=${token}`,
}
