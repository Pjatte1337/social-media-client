//testuser Pjatte123@stud.noroff.no

describe('Create a Post', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(1000);
    cy.get('.btn-close:visible').click();
    cy.wait(500);
    cy.get("button[data-auth='login']:visible").click();
    cy.wait(1000);
    cy.get("input[type='email']:visible")
      .should('exist')
      .type('Pjatte123@stud.noroff.no');
    cy.get("input[type='password']:visible").should('exist').type('Olebrum94');
    cy.get('.btn-success:visible').click();
    cy.wait(3500);
    cy.visit('/');
  });

  it('Can create a post', () => {
    cy.wait(1000);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(2000);
    cy.url().should('include', 'post');
    cy.get('input[name=title]')
      .should('exist')
      .type('Creating a post in Cypress');
    cy.get('input[name=tags]')
      .should('exist')
      .type('Testing, Cypress, KillMePls');
    cy.get('input[name=media]')
      .should('exist')
      .type(
        'https://cdn.mos.cms.futurecdn.net/L3bp6yZujRgLQdtfJq4SyB-970-80.jpg.webp'
      );
    cy.get('textarea[name=body]')
      .should('exist')
      .type('creating a post with cypress test');
    cy.get('button[data-action="submit"]').click();
    cy.wait(5000);
    cy.url().should('include', 'view=post&postId=');
    cy.wait(1000);
    cy.get('button[data-action="delete"]:visible').click();
    cy.wait(1000);
    cy.url().should('include', '/');
  });

  it('Throws error if auth key is missing', () => {
    cy.wait(1000);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(2000);
    cy.url().should('include', 'post');
    cy.clearLocalStorage();
    cy.get('#postTitle').should('exist').type('Creating a post in Cypress');
    cy.get('button[data-action="submit"]').click();
    cy.wait(2000);
    cy.get('.alert').contains('Error message text');
    cy.url().should('include', '/');
  });

  it('Cannot resolve an empty request', () => {
    cy.wait(1000);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(2000);
    cy.url().should('include', 'post');
    cy.get('button[data-action="submit"]').click();
    cy.get('#postTitle:invalid')
      .invoke('prop', 'validationMessage')
      .should('include', 'Please fill out this field');
  });

  it('Will validate an incorrect URL, and return a message if it fails', () => {
    cy.wait(1000);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(1000);
    cy.url().should('include', 'post');
    cy.get('#postTitle').should('exist').type('Creating a post in Cypress');
    cy.get('#postTags').should('exist').type('Testing, Cypress, KillMePls');
    cy.get('#postMedia')
      .should('exist')
      .type('This is a string, not a URL lol');
    cy.get('#postBody')
      .should('exist')
      .type('creating a post with cypress test');
    cy.get('button[data-action="submit"]').click();
    cy.get('#postMedia:invalid')
      .invoke('prop', 'validationMessage')
      .should('include', 'Please enter a URL');
  });

  it('Requires a post title', () => {
    cy.wait(500);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(2000);
    cy.url().should('include', 'post');
    cy.get('#postTags').should('exist').type('Testing, Cypress, KillMePls');
    cy.get('#postMedia')
      .should('exist')
      .type(
        'https://cdn.mos.cms.futurecdn.net/L3bp6yZujRgLQdtfJq4SyB-970-80.jpg.webp'
      );
    cy.get('#postBody')
      .should('exist')
      .type('creating a post with cypress test');
    cy.get('button[data-action="submit"]').click();
    cy.get('#postTitle:invalid')
      .invoke('prop', 'validationMessage')
      .should('include', 'Please fill out this field');
  });
});