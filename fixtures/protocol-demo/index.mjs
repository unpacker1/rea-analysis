/** Clean-room protocol illustration. NOT a copy of either private game client. */
export const FRAME_RELIABLE = 0;
export const FRAME_MOVEMENT = 1;
export function classifyFrame(data) {
  if (!(data instanceof Uint8Array) || data.length < 2) {
    throw new TypeError('A binary frame with payload is required');
  }
  if (data[0] === FRAME_RELIABLE) return 'reliable-msgpack';
  if (data[0] === FRAME_MOVEMENT) return 'movement-msgpack';
  throw new RangeError('Unknown frame channel');
}
export function validateMovementRows(rows) {
  if (!Array.isArray(rows) || rows.length > 256) {
    throw new RangeError('Movement batch must be an array of at most 256 rows');
  }
  return rows.map((row) => {
    if (!Array.isArray(row) || row.length !== 5) {
      throw new TypeError('Expected [vid, x, y, rotation, motion]');
    }
    const [vid, x, y, rotation, motion] = row;
    if (!Number.isSafeInteger(vid) || vid <= 0) throw new RangeError('Invalid VID');
    if (![x, y, rotation].every((n) => typeof n === 'number' && Number.isFinite(n))) {
      throw new RangeError('Movement coordinates must be finite numbers');
    }
    if (!Number.isInteger(motion) || motion < 0 || motion > 2) {
      throw new RangeError('This synthetic test accepts idle/walk/run states');
    }
    return [vid, x, y, rotation, motion];
  });
}
export function chooseSyntheticMotion({hasWalk, hasRun, moving, chasing}) {
  if (!moving) return 0;
  if (chasing && hasRun) return 2;
  if (hasWalk) return 1;
  if (hasRun) return 2;
  return 0;
}
