// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([1, 2]);

    expect(linkedList).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: null,
          next: null
        }
      },
    })
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(linkedList).toMatchSnapshot();
  });
});
