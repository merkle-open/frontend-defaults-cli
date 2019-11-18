const promptMap = new Map();

export function promptCache<TResult extends Function>(question: TResult) {
	return (function() {
		if (promptMap.has(question)) {
			return promptMap.get(question) as TResult;
		}
		// eslint-disable-next-line
		const result = question.apply(this, arguments) as TResult;
		promptMap.set(question, result);
		return result;
	} as any) as TResult;
}
