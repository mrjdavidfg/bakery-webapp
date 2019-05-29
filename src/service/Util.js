/**
 * Returns a promise that waits for milliseconds.
 * @param {*} ms MilliSeconds.
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms * 1000))
}

/**
 * Creates an Array of integers from a specific range.
 *
 * @param start Start of the range (inclusive).
 * @param end End of the range (exclusive).
 * @returns Array
 */
export function range(start, end) {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}
