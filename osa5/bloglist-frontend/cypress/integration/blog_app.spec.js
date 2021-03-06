describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Olli',
			username: 'ollipo7',
			password: 'top secret7'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		const user2 = {
			name: 'Olli',
			username: 'ollipo8',
			password: 'top secret8'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user2)
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

		it('blogs are ordered descending', function() {
			cy.createBlog({ title: 'kodinykkönen', author: 'anttila', url: 'http://kodinykkonen.dot' })
			cy.createBlog({ title: 'patakakkonen', author: 'jaakko', url: 'http://tunnari.com' })
			cy.createBlog({ title: 'kokkikolmonen', author: 'aihinen', url: 'http://patajakattila.foo' })

			cy.contains('kodinykkönen').parent().as('blog1')
			cy.contains('patakakkonen').parent().as('blog2')
			cy.contains('kokkikolmonen').parent().as('blog3')

			cy.get('@blog1').contains('view').click()
			cy.get('@blog1').contains('like').click()

			cy.get('@blog2').contains('view').click()
			cy.get('@blog2').contains('like').click()
			cy.get('@blog2').contains('like').click()

			cy.get('@blog3').contains('view').click()
			cy.get('@blog3').contains('like').click()
			cy.get('@blog3').contains('like').click()
			cy.get('@blog3').contains('like').click()

			const blogShouldHaveNumberOfLikes = (order, likes) => {
				cy.get('.renderAfterViewButtonPressed')
					.eq(order)
					.within(() =>
						cy.get('#blogLikes')
							.contains(likes))
			}
			blogShouldHaveNumberOfLikes(0, 3)
			blogShouldHaveNumberOfLikes(1, 2)
			blogShouldHaveNumberOfLikes(2, 1)
		})

		describe('And a blog exists', function() {
			beforeEach(function () {
				cy.createBlog({
					title: 'another blog cypress',
					author: 'ollipo',
					url: 'www.existingblog.fi'
				})
			})

			it('A user can like a blog', function() {
				cy.contains('view').click()
				cy.contains('like').click()
				cy.get('#blogLikes').contains(1)
			})

			it('a blog creator can delete it', function() {
				cy.contains('view').click()
				cy.get('.remove').click()
				cy.contains('another blog cypress').should('not.exist')
			})

			it('other user than the blog creator can\'t delete the blog', function() {
				cy.contains('logout').click()
				cy.get('#username').type('ollipo8')
				cy.get('#password').type('top secret8')
				cy.get('#login-button').click()
				cy.contains('view').click()
				cy.get('.remove').should('not.exist')
			})
		})
	})

})
