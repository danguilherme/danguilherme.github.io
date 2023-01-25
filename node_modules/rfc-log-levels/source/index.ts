/**
 * The found combination of a log number to its original log name
 */
export interface LevelInfo {
	/** the log level number */
	levelNumber: number
	/** the log level name */
	levelName: string
}

/**
 * Mapping of log names to log numbers
 * Aliases should come after names
 */
export interface LevelsMap {
	[name: string]: number
}

/** Default levels are according to the [RFC Standard](http://www.faqs.org/rfcs/rfc3164.html) */
export const rfcLogLevels: LevelsMap = {
	emergency: 0,
	alert: 1,
	critical: 2,
	error: 3,
	warning: 4,
	notice: 5,
	info: 6,
	debug: 7,
	emerg: 0,
	crit: 2,
	err: 3,
	warn: 4,
	note: 5,
}

/**
 * Determine the level number from a level name
 */
export function getLevelNumber(
	name: string,
	levels: LevelsMap = rfcLogLevels
): number | null {
	if (levels[name] == null) {
		return null
	} else {
		return levels[name]
	}
}

/**
 * Determine the level name from a level number
 */
export function getLevelName(
	number: number,
	levels: LevelsMap = rfcLogLevels
): string | null {
	for (const name in levels) {
		if (levels.hasOwnProperty(name)) {
			const value = levels[name]
			if (value === number) {
				return name
			}
		}
	}
	return null
}

/**
 * Receive either the level name or number and return the combination.
 * @param level Either a log name or a log number that is contained within the levels mapping
 * @param levels A mapping of permitted log names to their log numbers to determine the correct log level name and number combination
 * @returns The found combination, which if provided an alias, expands it. If an invalid level was provided, `null` is returned.
 * @example input
 * ``` javascript
 * import getLevelInfo, { rfcLogLevels } from 'rfc-log-levels'
 * getLevelInfo('note')
 * getLevelInfo('note', rfcLogLevels)
 * getLevelInfo('note', { note: 5 })
 * ```
 * @example result
 * ``` json
 * {
 * 	"levelNumber": 5,
 * 	"levelName": "notice"
 * }
 * ```
 */
export default function getLevelInfo(
	level: string | number,
	levels: LevelsMap = rfcLogLevels
): LevelInfo | null {
	if (typeof level === 'string') {
		// get number from input name
		const levelNumber = getLevelNumber(level, levels)
		if (levelNumber == null) return null
		// input name could have been shortened, so get the expanded name
		const levelName = getLevelName(levelNumber, levels)
		if (levelName == null) return null
		// return
		return { levelNumber, levelName }
	} else if (typeof level === 'number') {
		// get the expanded name from the input number
		const levelName = getLevelName(level, levels)
		if (levelName == null) return null
		// return
		return { levelNumber: level, levelName }
	} else {
		return null
	}
}
