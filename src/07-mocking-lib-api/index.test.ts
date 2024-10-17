// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: (fn: (...args: unknown[]) => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockCreate = jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue(Promise.resolve({ data: null })),
    });
    (axios.create as jest.Mock).mockImplementation(mockCreate);

    await throttledGetDataFromApi('posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: 'test' }));

    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    await throttledGetDataFromApi('posts/1');

    expect(mockGet).toHaveBeenCalledWith('posts/1');
  });

  test('should return response data', async () => {
    const mockGet = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: 'test' }));

    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    const result = await throttledGetDataFromApi('posts/1');

    expect(result).toBe('test');
  });
});
