import {Authentication} from "../src/authentication";

describe('authenticate account is valid', function () {
  let authentication = new Authentication();
  let fakeNotify = jest.fn();
  beforeEach(() => {
    authentication = new Authentication();
    authentication.notify = fakeNotify;
  });


  it('should be valid', () => {
    givePassword('91');
    givenToken('000000');
    shouldBeValid('joey', '91000000');
  });

  it('should be invalid', () => {
    givePassword('91');
    givenToken('000000');
    shouldBeInvalid('joey', 'wrong password');
  });


  it('should notify', () => {
    givePassword('91');
    givenToken('000000');
    authentication.is_valid('joey', 'wrong password');
    shouldNotify('joey', 'failed');
  });


  function givePassword(password) {
    authentication.getPassword = jest.fn().mockReturnValue(password);
  }

  function givenToken(token) {
    authentication.getToken = jest.fn().mockReturnValue(token);
  }

  function shouldBeValid(account, password) {
    expect(authentication.is_valid(account, password)).toBe(true);
  }

  function shouldBeInvalid(account, password) {
    expect(authentication.is_valid(account, password)).toBe(false);
  }

  function shouldNotify(name, status) {
    expect(fakeNotify.mock.calls[0][0]).toEqual(expect.stringContaining(name)
        && expect.stringContaining(status))
  }
});