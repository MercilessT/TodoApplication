import nodemailer, { Transporter } from 'nodemailer'

export default class EmailService {
	private transporter: Transporter

	constructor(
		host: string = process.env.SMTP_HOST,
		port: number = parseInt(process.env.SMTP_PORT as string, 10),
		secure: boolean = false,
		authUser: string = process.env.SMTP_MAIL,
		authPass: string = process.env.MAIL_KEY,
	) {
		this.transporter = nodemailer.createTransport({
			host,
			port,
			secure,
			auth: {
				user: authUser,
				pass: authPass,
			},
		})
	}

	async sendEmail(to: string, subject: string, html: string): Promise<void> {
		const mailOptions = {
			from: process.env.SMTP_MAIL,
			to,
			subject,
			html,
		}

		this.transporter.sendMail(mailOptions, (error, _info) => {
			if (error) {
				throw new Error('Failed to send email')
			}
		})
	}
}
