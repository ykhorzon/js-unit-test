import {Authentication} from "../src/authentication";

describe('authenticate account is valid', function () {
  let authentication = new Authentication();
  beforeEach(() => {
    authentication = new Authentication();
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

  it('should be valid', () => {
    givePassword('91');
    givenToken('000000');
    shouldBeValid('joey', '91000000');
  });

  function shouldBeInvalid(account, password) {
    expect(authentication.is_valid(account, password)).toBe(false);
  }

  it('should be invalid', () => {
    givePassword('91');
    givenToken('000000');
    shouldBeInvalid('joey', 'wrong password');
  });


});