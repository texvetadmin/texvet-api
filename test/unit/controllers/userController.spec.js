/* eslint-disable no-undef,one-var-declaration-per-line,no-unused-vars,one-var */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

import makeResponseMock from '../../helpers/makeResponseMock';

describe('User Controller Test', () => {
  let sandbox, mocks, userController, res, req, next;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = makeResponseMock(sandbox);
    mocks = {
      '../services/UserService': {
        getUsers: sandbox.stub().returns([]),
        getUser: sandbox.stub().returns({}),
        createUser: sandbox.stub().returns({}),
        updateUser: sandbox.stub().returns({}),
        '@noCallThru': true,
      },
    };
    userController = proxyquire('../../../src/controllers/UserController', mocks).default;
  });

  afterEach(() => {
    sandbox.restore();
    mocks = null;
    res = null;
    req = null;
    next = null;
  });

  describe('getUsers', () => {
    let users, userCount;

    beforeEach(() => {
      users = [{ userName: 'johndoe' }, { userName: 'janedoe' }];
      userCount = 2;
      req = {
        query: { skip: 0, limit: 10 },
      };

      userController.userService.getUsers.resolves([users, userCount]);
    });

    it('should call userService.getUsers with the expected arguments', async () => {
      // Act
      await userController.getUsers(req, res, next);

      // Assert
      expect(userController.userService.getUsers.callCount).to.be.equal(1);
      expect(userController.userService.getUsers.args[0][0]).to.deep.equal(req);
    });

    it('should return an object with the expected properties', async () => {
      // Act
      const r = await userController.getUsers(req, res, next);

      // Assert
      expect(r)
        .to.have.property('object')
        .that.equals('list');
      expect(r)
        .to.have.property('data')
        .that.is.an('array')
        .that.deep.equals(users);
      expect(r)
        .to.have.property('has_more')
        .that.equals(false);
      expect(r)
        .to.have.property('pageCount')
        .that.equals(1);
      expect(r)
        .to.have.property('currentPage')
        .that.equals(1);
    });
  
  });

  describe('Create user', () => {
    beforeEach(() => {
      const createUserData = {
        _id: 123456,
        userName: 'test.user',
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@fakemail.com',
        postalCode: 'BADA55',
      };

      userController.userService.createUser.resolves(createUserData);
    });

    it('should call userController.userService with the expected arguments', async () => {
      // Act
      await userController.createUser(req, res, next);

      // Assert
      expect(userController.userService.createUser.callCount).to.be.equal(1);
      expect(userController.userService.createUser.args[0][0]).to.deep.equal(req);
    });

    it('should create a user object with expected properties', async () => {
      // Act
      const response = await userController.createUser(req, res, next);

      // Assert
      expect(response)
        .to.have.property('object')
        .that.equals('object');
      expect(response)
        .to.have.property('data')
        .that.is.an('object')
        .that.has.all.keys('_id', 'userName', 'firstName', 'lastName', 'email', 'postalCode');
    });
  });

  describe('Update user', () => {
    let updatedUserData;

    beforeEach(() => {
      const original = {
        _id: 123456,
        userName: 'test.user',
        firstName: 'test',
        lastName: 'User',
        email: 'test.user@fakemail.com',
        postalCode: 'BADA55',
      };

      const updated = {
        _id: 123456,
        userName: 'test.user',
        firstName: 'Updated',
        lastName: 'Data',
        email: 'test.user@fakemail.com',
        postalCode: 'BADA55',
      };

      updatedUserData = {
        original,
        updated,
      };

      userController.userService.getUser.resolves(original);
      userController.userService.updateUser.resolves(updated);
    });

    it('should call userController.updateUser with the expected arguments', async () => {
      // Act
      await userController.updateUser(req, res, next);

      // Assert
      expect(userController.userService.getUser.callCount).to.be.equal(1);
      expect(userController.userService.updateUser.callCount).to.be.equal(1);
      expect(userController.userService.updateUser.args[0][0]).to.deep.equal(req);
    });

    it('should update a user object with expected properties', async () => {
      // Act
      const response = await userController.updateUser(req, res, next);

      // Assert
      expect(response)
        .to.have.property('data')
        .that.is.an('object')
        .that.is.deep.include(updatedUserData);
    });
  });
});
