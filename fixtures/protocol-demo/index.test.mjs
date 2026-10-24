import {test} from 'node:test';
import assert from 'node:assert/strict';
import {classifyFrame, validateMovementRows, chooseSyntheticMotion} from './index.mjs';

test('channel marker is not WebSocket opcode', () => {
  assert.equal(classifyFrame(Uint8Array.from([0,0x80])), 'reliable-msgpack');
  assert.equal(classifyFrame(Uint8Array.from([1,0x90])), 'movement-msgpack');
  assert.throws(() => classifyFrame(Uint8Array.from([2,0x90])), RangeError);
  assert.throws(() => classifyFrame(Uint8Array.from([1])), TypeError);
});
test('movement rows must have safe VIDs, five fields and finite values', () => {
  assert.deepEqual(validateMovementRows([[1234,100,200,Math.PI/2,2]]), [[1234,100,200,Math.PI/2,2]]);
  assert.throws(() => validateMovementRows([[1,Number.NaN,2,0,1]]), RangeError);
  assert.throws(() => validateMovementRows([[1,2,3,4]]), TypeError);
  assert.throws(() => validateMovementRows([[0,1,2,0,1]]), RangeError);
  assert.throws(() => validateMovementRows([[1,2,3,0,9]]), RangeError);
  assert.throws(() => validateMovementRows(Array.from({length:257}, () => [1,0,0,0,0])), RangeError);
});
test('walking clip absent means never fabricate a walk animation', () => {
  assert.equal(chooseSyntheticMotion({hasWalk:false,hasRun:true,moving:true,chasing:false}),2);
  assert.equal(chooseSyntheticMotion({hasWalk:false,hasRun:false,moving:true,chasing:true}),0);
  assert.equal(chooseSyntheticMotion({hasWalk:true,hasRun:true,moving:true,chasing:false}),1);
  assert.equal(chooseSyntheticMotion({hasWalk:true,hasRun:true,moving:true,chasing:true}),2);
  assert.equal(chooseSyntheticMotion({hasWalk:true,hasRun:true,moving:false,chasing:true}),0);
});
