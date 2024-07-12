declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TEST: string
			DATABASE_URL: string
			FRONTEND_URL: string
			JWT_SECRET: string
			SMTP_HOST: string
			SMTP_PORT: string
			SMTP_MAIL: string
			MAIL_KEY: string
			JWT_RESET_SECRET: string
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
