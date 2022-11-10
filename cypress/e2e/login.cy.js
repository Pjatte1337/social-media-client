//testuser Pjatte123@stud.noroff.no
//testuser Pjatte123@stud.noroff.no

describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('login', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('.btn-close:visible').click();
    cy.wait(500);
    cy.get("button[data-auth='login']:visible").click();
    cy.wait(1500);
    cy.get("input[type='email']:visible")
      .should('exist')
      .type('Pjatte123@stud.noroff.no');
    cy.get("input[type='password']:visible").should('exist').type('Olebrum94');
    cy.get('.btn-success:visible').click();
    cy.wait(3000);
    cy.then(
      () => expect(window.localStorage.getItem('profile')).to.not.be.null
    );
    cy.then(() => expect(window.localStorage.getItem('token')).to.not.be.null);
    cy.url().should('include', 'profile');
  });

  it('Validates email input', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('.btn-close:visible').click();
    cy.wait(500);
    cy.get("button[data-auth='login']:visible").click();
    cy.wait(1500);
    cy.get("input[type='email']:visible")
      .should('exist')
      .type('fake@faker.com');
    cy.get("input[type='password']:visible").should('exist').type('Olebrum94');
    cy.get('.btn-success:visible').click();
    cy.wait(3000);
    cy.then(() => expect(window.localStorage.getItem('profile')).to.be.null);
    cy.then(() => expect(window.localStorage.getItem('token')).to.be.null);
    cy.url().should('not.include', 'profile');
  });

  it('Validates password', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('.btn-close:visible').click();
    cy.wait(500);
    cy.get("button[data-auth='login']:visible").click();
    cy.wait(1500);
    cy.get("input[type='email']:visible")
      .should('exist')
      .type('Pjatte123@stud.noroff.no');
    cy.get("input[type='password']:visible").should('exist').type('1234');
    cy.get('.btn-success:visible').click();
    cy.wait(3000);
    cy.then(() => expect(window.localStorage.getItem('profile')).to.be.null);
    cy.then(() => expect(window.localStorage.getItem('token')).to.be.null);
    cy.url().should('not.include', 'profile');
  });
});
