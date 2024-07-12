export type ModelWithFindUnique<T> = {
	findUnique: (args: { where: { id: number } }) => Promise<T | null>
}
