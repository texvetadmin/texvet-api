/* eslint-disable no-undef,one-var-declaration-per-line,no-unused-vars,one-var */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

import makeResponseMock from '../../helpers/makeResponseMock';

describe('NotificationType Controller Test', () => {
  let sandbox, mocks, notificationTypeController, res, req, next;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = makeResponseMock(sandbox);
    mocks = {
      '../services/NotificationTypeService': {
        getTypes: sandbox.stub().returns([]),
        getType: sandbox.stub().returns({}),
        createType: sandbox.stub().returns({}),
        updateType: sandbox.stub().returns({}),
        deleteType: sandbox.stub().returns({}),
        '@noCallThru': true,
      },
    };
    notificationTypeController = proxyquire('../../../src/controllers/NotificationTypeController', mocks).default;
  });

  afterEach(() => {
    sandbox.restore();
    mocks = null;
    res = null;
    req = null;
    next = null;
  });

  describe('getTypes', () => {
    let types, typeCount;

    beforeEach(() => {
      types = [{ name: 'Type #1' }, { name: 'Type #2' }];
      typeCount = 2;
      req = {
        query: { skip: 0, limit: 10 },
      };

      notificationTypeController.notificationTypeService.getTypes.resolves([types, typeCount]);
    });

    it('should call notificationTypeController.getTypes with the expected arguments', async () => {
      // Act
      await notificationTypeController.getTypes(req, res, next);

      // Assert
      //todo expect
    });
  });

  describe('getType', () => {
    let type;

    beforeEach(() => {
      type = { name: 'Type #1' };
      req = {
        query: { skip: 0, limit: 10 },
      };

      notificationTypeController.notificationTypeService.getType.resolves(type);
    });

    it('should call notificationTypeController.getType with the expected arguments', async () => {
      // Act
      await notificationTypeController.getType(req, res, next);

      // Assert
      //todo expect
    });
  });

  describe('Create type', () => {
    beforeEach(() => {
      const createTypeData = {
        _id: 123456,
        code: 'SET-APPOINTMENT',
        name: 'Type #1',
        description: 'Description test',
        template_name: 'transcript',
      };

      notificationTypeController.notificationTypeService.createType.resolves(createTypeData);
    });

    it('should call notificationTypeController.notificationTypeService with the expected arguments', async () => {
      // Act
      await notificationTypeController.createType(req, res, next);

      // Assert
      //todo expect
    });
  });

  describe('Update type', () => {
    let updatedTypeData;

    beforeEach(() => {
      const original = {
        _id: 123456,
        code: 'SET-APPOINTMENT',
        name: 'Type #1',
        description: 'Description test',
        template_name: 'transcript',
      };

      const updated = {
        _id: 123457,
        code: 'APPOINTMENT-REMINDER',
        name: 'Type #2',
        description: 'Description test',
        template_name: 'transcript',
      };

      updatedTypeData = {
        original,
        updated,
      };

      notificationTypeController.notificationTypeService.getType.resolves(original);
      notificationTypeController.notificationTypeService.updateType.resolves(updated);
    });

    it('should call notificationTypeController.updateType with the expected arguments', async () => {
      // Act
      await notificationTypeController.updateType(req, res, next);

      // Assert
      //todo expect
    });
  });
});
