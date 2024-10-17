// Uncomment the code below and write your tests
import { join } from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const callback = jest.fn();
  const timeout = 100;

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(setInterval).toHaveBeenCalledTimes(1);

    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 100;
    doStuffByInterval(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(2);
  });
});
jest.mock('fs/promises');
jest.mock('fs');
jest.mock('path');

describe('readFileAsynchronously', () => {
  const mockedPathToFile = 'path/to/file/file.txt';
  const mockedFileContent = 'file content';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockedPathToFile);
    expect(join).toHaveBeenCalledWith(expect.any(String), mockedPathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const fileContent = await readFileAsynchronously(mockedPathToFile);
    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockedFileContent));

    const fileContent = await readFileAsynchronously(mockedPathToFile);
    expect(fileContent).toBe(mockedFileContent);
  });
});
