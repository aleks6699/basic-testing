import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);

    expect(() => {
      account.withdraw(2000)
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      getBankAccount(1000).transfer(6600, getBankAccount(200));
    }).toThrowError(InsufficientFundsError);
  });
  test('should throw error when transferring to the same account', () => {

    const account = getBankAccount(1000);
    expect(() => account.transfer(5000, account)).toThrowError(
      TransferFailedError,
    );
    expect(() => account.transfer(5000, account)).toThrowError(
      'Transfer failed',
    );


  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    expect(account.deposit(100).getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(100).withdraw(100).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    expect(getBankAccount(100).transfer(100, getBankAccount(100)).getBalance()).toBe(0);
  });

  test('fetchBalance should return number if request did not fail', async () => {
    const fetchBalance = jest.fn().mockResolvedValue(100);
    const account = getBankAccount(100);
    account.fetchBalance = fetchBalance;
    expect(await account.fetchBalance()).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(200);
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(100));
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(200);
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(null));
    expect(() => account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
