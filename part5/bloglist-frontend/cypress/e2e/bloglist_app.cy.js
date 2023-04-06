describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'one',
      username: 'testuserone',
      password: 'numberone'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuserone')
      cy.get('#password').type('numberone')
      cy.get('#login-button').click()
      cy.contains('one logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuserone')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
    })
  })
})
