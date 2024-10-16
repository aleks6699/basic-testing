// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Add })).toBe(1);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Add })).toBe(-1);
    expect(simpleCalculator({ a: 1, b: Infinity, action: Action.Add })).toBe(
      Infinity,
    );
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Subtract })).toBe(-3);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Subtract })).toBe(3);
    expect(
      simpleCalculator({ a: 1, b: Infinity, action: Action.Subtract }),
    ).toBe(-Infinity);
  });
  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toBe(2);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Multiply })).toBe(-2);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Multiply })).toBe(-2);
    expect(
      simpleCalculator({ a: 1, b: Infinity, action: Action.Multiply }),
    ).toBe(Infinity);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toBe(0.5);
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Divide })).toBe(-0.5);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Divide })).toBe(-0.5);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: -1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Exponentiate })).toBe(
      0,
    );
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Exponentiate })).toBe(
      -8,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'error' })).toBe(null);
    expect(simpleCalculator({ a: 1, b: 2, action: '' })).toBe(null);
    expect(simpleCalculator({ a: 1, b: 2, action: ' ' })).toBe(null);
    expect(simpleCalculator({ a: 1, b: 2, action: null })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'error', b: 2, action: Action.Add })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: 'error', b: 'error', action: Action.Add }),
    ).toBe(null);
    expect(simpleCalculator({ a: 1, b: 'error', action: Action.Add })).toBe(
      null,
    );
    expect(simpleCalculator({ a: 1, b: null, action: Action.Add })).toBe(null);
  });
});
