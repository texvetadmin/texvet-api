/* eslint-disable no-undef,one-var-declaration-per-line,no-unused-vars,one-var */
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

import makeResponseMock from '../../helpers/makeResponseMock';

describe('NotificationTemplate Controller Test', () => {
  let sandbox, mocks, notificationTemplateController, res, req, next;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = makeResponseMock(sandbox);
    mocks = {
      '../services/NotificationTemplateService': {
        getTemplates: sandbox.stub().returns([]),
        getTemplate: sandbox.stub().returns({}),
        '@noCallThru': true,
      },
    };
    notificationTemplateController = proxyquire('../../../src/controllers/NotificationTemplateController', mocks).default;
  });

  afterEach(() => {
    sandbox.restore();
    mocks = null;
    res = null;
    req = null;
    next = null;
  });
  describe('getTemplates', () => {
    let templates, templateCount;

    beforeEach(() => {
      templates = [
        { template: 'This is test template #1' },
        { template: 'This is test template #2' },
      ];
      templateCount = 2;
      req = {
        query: { skip: 0, limit: 10 },
      };

      notificationTemplateController.notificationTemplateService.getTemplates.resolves([templates, templateCount]);
    });

    it('should call notificationTemplateService.getTemplates with the expected arguments', async () => {
      // Act
      const response = await notificationTemplateController.getTemplates(req, res, next);
      // Assert

      //TODO except cases
      console.log('RES', response);
    });
  });
});
