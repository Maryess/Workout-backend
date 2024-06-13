export const prevExercisesLogValue = (log, prevLog = null) => {
	return log.times.map((item, index) => ({
		...item,
		prevWeight: prevLog ? prevLog.times[index].weight : 0,
		prevRepeat: prevLog ? prevLog.times[index].reppeat : 0
	}))
}
