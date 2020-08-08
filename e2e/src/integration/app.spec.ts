import {
  getBody,
  getByline,
  getFromField,
  getModalTitle,
  getResults,
  getSubmitButton,
  getTitle,
  getToastMessage,
  getToField
} from '../support/app.po';

describe('UnitsOfMeasure App', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the title and byline', () => {
    getTitle().contains('Easy Unit Converter');
    getByline().contains('by Notice Everything Creative');
  });

  describe('keyboard shortcuts', () => {

    it('focuses the input fields', () => {
      getBody().type('[');
      cy.focused().should('have.attr', 'id', 'from');
      getBody().type(']');
      cy.focused().should('have.attr', 'id', 'to');
    });

    it('clears the form and blurs the inputs', () => {
      getFromField().type('g');
      getToField().type('kg');
      getBody().type('x');
      getFromField().then((e: any) => e.value === '');
      getToField().then((e: any) => e.value === '');
      getFromField().should('not.have.focus');
      getToField().should('not.have.focus');
    });

    it('opens the examples modal', () => {
      getBody().type('E');
      getModalTitle().contains('Examples');
    });

    it('opens the shortcuts modal', () => {
      getBody().type('S');
      getModalTitle().contains('Keyboard Shortcuts');
    });
  });

  describe('when converting units', () => {

    it('fails to convert incompatible units', () => {
      getFromField().type('g');
      getToField().type('cups');
      getSubmitButton().click();
      getToastMessage().contains('Incompatible units: g and cu');
    });

    it('fails to convert nonexistent units', () => {
      getFromField().type('g');
      getToField().type('fake');
      getSubmitButton().click();
      getToastMessage().contains('Unit not recognized');
    });

    it('converts units', () => {
      getFromField().type('g');
      getToField().type('kg');
      getSubmitButton().click();
      getResults().contains('0.001 kg');
    });
  });
});
