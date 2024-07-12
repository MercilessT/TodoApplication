import { Prisma } from '@prisma/client'

export enum TodoStatus {
	PRIVATE = 'private',
	PUBLIC = 'public',
	COMPLETED = 'completed',
	ALL = 'all',
}

export function buildTodoFilterClause(
	userId: number,
	search?: string,
	status?: TodoStatus,
): Prisma.TodoWhereInput {
	const whereClause: Prisma.TodoWhereInput = {
		title: { contains: search || undefined },
	}

	switch (status) {
		case TodoStatus.PRIVATE:
			whereClause.userId = userId
			whereClause.isPrivate = true
			break
		case TodoStatus.PUBLIC:
			whereClause.userId = userId
			whereClause.isPrivate = false
			break
		case TodoStatus.COMPLETED:
			whereClause.userId = userId
			whereClause.isCompleted = true
			break
		case TodoStatus.ALL:
			whereClause.OR = [{ userId }, { isPrivate: false }]
			break
		default:
			whereClause.userId = userId
	}

	return whereClause
}
