/**
 * @param {string?} string
 * @return {boolean}
 */
export function isEmpty(string) {
  return string === undefined || string === null || string === ""
}

/**
 * @param {string?} string
 * @return {boolean}
 */
export function isNotEmpty(string) {
  return !isEmpty(string)
}