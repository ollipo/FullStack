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

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'ollipo7', password: 'top secret7' })
		})

		it('A blog can be created', function() {
			cy.contains('create new blog').click()
			cy.get('#title').type('a blog created by cypress')
			cy.get('#author').type('ollipo')
			cy.get('#url').type('www.ollipo.fi')
			cy.get('.create').click()
			cy.contains('a blog created by cypress')
			cy.contains('ollipo')
		})

		describe('And a blog exists', function() {
			beforeEach(function () {
				cy.createBlog({
					title: 'another blog cypress',
					author: 'ollipo',
					url: 'www.existingblog.fi'
				})
			})

			it.only('A user can like a blog', function() {
				cy.contains('view').click()
				cy.contains('like').click()
				cy.get('#blogLikes').contains(1)
			})
		})
	})

})
