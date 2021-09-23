describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Olli',
			username: 'ollipo7',
			password: 'top secret7'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('login')
	})

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('ollipo7')
			cy.get('#password').type('top secret7')
			cy.get('#login-button').click()
			cy.contains('Olli logged in')
		})

		it('fails with wrong credentials', function() {
			cy.get('#username').type('ollipo7')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()

			cy.get('.errorMessage').contains('Wrong or missing username or password')
			cy.get('.errorMessage').should('have.css', 'color', 'rgb(255, 0, 0)')
		})
	})

})
