/* eslint-disable no-undef,one-var-declaration-per-line,no-unused-vars,one-var */
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

import makeControllerMocks from '../../helpers/makeControllerMocks';
import makeResponseMock from '../../helpers/makeResponseMock';

describe('Template Controller Test', () => {
  let sandbox, mocks, templateController, res, req, next;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = makeResponseMock(sandbox);
    mocks = makeControllerMocks(sandbox);
    templateController = proxyquire('../../../src/controllers/TemplateController', mocks).default;
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

      templateController.templateService.getTemplates.resolves([templates, templateCount]);
    });

    it('should call templateService.getTemplates with the expected arguments', async () => {
      // Act
      const response = await templateController.getTemplates(req, res, next);
      // Assert

      //TODO except cases
      console.log('RES', response);
    });
  });
});
