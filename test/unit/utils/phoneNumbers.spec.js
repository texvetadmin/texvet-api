
import { expect } from 'chai';

import parsePhoneNumber from '../../../src/utils/phoneNumbers';

describe('Utils (Phone Numbers) Test', () => {
  
    describe('parsePhoneNumber', () => {
  
        it('should parse +15555555555', () => {
          const originalValue = '+15555555555';
          const expectedValue = '+15555555555';
          // Act
          let actualValue = parsePhoneNumber(originalValue);
          // Assert
          expect(actualValue).to.be.equal(expectedValue);
        });
  
        it('should parse +1 5555555555', () => {
          const originalValue = '+1 5555555555';
          const expectedValue = '+15555555555';
          // Act
          let actualValue = parsePhoneNumber(originalValue);
          // Assert
          expect(actualValue).to.be.equal(expectedValue);
        });
  
        it('should parse +1 555-555-5555', () => {
          const originalValue = '+1 555-555-5555';
          const expectedValue = '+15555555555';
          // Act
          let actualValue = parsePhoneNumber(originalValue);
          // Assert
          expect(actualValue).to.be.equal(expectedValue);
        });
  
        it('should parse 5555555555', () => {
          const originalValue = '5555555555';
          const expectedValue = '+15555555555';
          // Act
          let actualValue = parsePhoneNumber(originalValue);
          // Assert
          expect(actualValue).to.be.equal(expectedValue);
        });
  
        it('should parse 555-555-5555', () => {
          const originalValue = '555-555-5555';
          const expectedValue = '+15555555555';
          // Act
          let actualValue = parsePhoneNumber(originalValue);
          // Assert
          expect(actualValue).to.be.equal(expectedValue);
        });
  
        it('should handle <EMPTY>', () => {
          const originalValue = '';
          const expectedValue = '';
          let actualValue = null;
          let error = null;

          // Act
          try {
            actualValue = parsePhoneNumber(originalValue);
          } catch(err) {
            error = err;
          }

          // Assert
          expect(actualValue).to.be.equal(expectedValue);
        });
  
        it('should not parse 555', () => {
          const originalValue = '555';
          const expectedValue = '+15555555555';
          let actualValue = null;
          let error = null;

          // Act
          try {
            actualValue = parsePhoneNumber(originalValue);
          } catch(err) {
            error = err;
          }
          // Assert
          expect(actualValue).to.be.a('null');
          expect(error).to.be.a('Error');
        });

    });
});