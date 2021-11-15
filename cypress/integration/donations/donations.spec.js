describe('donations', () => {

  before(() => {
    //cy.visit('http://localhost:3000/test/generate_json_of_translation')
  })

  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    //cy.visit('https://example.cypress.io/todo')
  })

  it('visits pferdefutter, donates and expects change', () => {
    cy.visit('http://localhost:3000/')
    cy.get("[data-cy=pferdefutter]").click();
    cy.wait(5000);
    cy.contains("Kreditkarte").first().click();

    cy.fixture('test-credit-card.json').should((credit_card) => {
      cy.get('#cardno-widget').clear().type(credit_card.card_number);
      cy.get('#exp-widget').clear().type(credit_card.exp_date);
      cy.get('#cvv-widget').clear().type(credit_card.cvv);
    });


    cy.get('#stored_customer_firstname-widget').clear().type("Sandro");
    cy.get('#stored_customer_lastname-widget').clear().type("Räss");
    cy.get('#stored_customer_email-widget').clear().type("s.raess@me.com");
    cy.contains("Spendenbescheinigung").first().click();
    cy.contains("Ich möchte eine Patenschaft für Wizard übernehmen und die Futterkosten decken").first().click();
    cy.get('#stored_customer_street-widget').clear().type("Fohrenbühlstr. 4");
    cy.get('#stored_customer_zip_code-widget').clear().type("8253");
    cy.get('#stored_customer_city-widget').clear().type("Diessenhofen");
    cy.contains("Spende sicher übermitteln").first().click();

    cy.contains("Danke für die Unterstützung!");

    //cy.get('.rnw-widget-container').find('[name="stored_customer_donation_receipt"]').check();
    //cy.get('form').find('[name="emailUser"]').check()





    })

});
