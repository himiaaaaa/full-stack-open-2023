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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuserone')
      cy.get('#password').type('numberone')
      cy.get('#login-button').click()
      cy.contains('one logged in')
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#create-button').click({ force: true })
      cy.contains('test title test author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('test author')
        cy.get('#url').type('http://testurl.com')
        cy.get('#create-button').click({ force: true })
        cy.contains('test title test author')
      })

      it.only('user can add likes', function () {
        cy.contains('view').click()
        cy.contains('0')
          .contains('likes')
          .click()

        cy.contains('1')
      })
    })
  })
})