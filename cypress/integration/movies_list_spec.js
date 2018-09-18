//Cypress Intern Coding Challenge

//Author: Anjana Balamourougan

//Version 1.0, 1/30/2018

describe('Testing functionality', function() {

	//useful functions 
	function movieSearch(name) {
		cy.get('input')
		.type(name)

		cy.get('button')
		.contains('Search')
		.click()
		} 

	//visits the webpage 
	beforeEach(() => {
		cy.visit('https://yegor-sytnyk.github.io/movies-list')
	})

	//check if text typed matched text that shows up in input
	it('accept input', () => {
		const typedText = 'Searched Movie'  

		cy.get('input')
			.type(typedText)
			.should('have.value', typedText)
	})

	//search for a movie, make sure the correct movie is in the search results 
	it('find correct movie', () => {
		const testTitle = 'Casablanca'

		movieSearch(testTitle)

		cy.get('.title a:first')
		.should('contain', testTitle)
	})

	//make sure all the page number buttons work 
	it('test page number buttons', () => {

		for (var i = 1; i < 16; i++ ) {

		cy.get('.pagination-md li a')
		.contains(i).click()

		cy.get('.pagination-md li')
		.should('have.class', 'active')
		.and('contain', i)
		}

	})

	//add a new movie and make sure it shows up in a search
	it('add new movie to movie list', () => {
		const addedTitle = 'The Incredibles'

			//open new movie form 
			cy.get('.btn-success').click()

			//input all attributes 
			cy.get('input[name="title"]')
			.type('{selectall}')
			.type('{backspace}')
			.type(addedTitle)

			cy.get('input[name="year"]')
			.type('{selectall}')
			.type('{backspace}')
			.type(2004)

			cy.get('input[name="runtime"]')
			.type('{selectall}')
			.type('{backspace}')
			.type(116)

			/* Genre 
			cy.get(".Select-placeholder").click()
			cy.get('input[role="combobox"]')
			.click()
			.type('Comedy')
			.type('{enter}')
			*/

			cy.get('input[name="director"]')
			.type('{selectall}')
			.type('{backspace}')
			.type("Brad Bird")

			cy.get('textarea[name="actors"]')
			.type('{selectall}')
			.type('{backspace}')
			.type("Brad Bird, Samuel Jackson, Spencer Fox, Jason Lee")

			cy.get('textarea[name="plot"]')
			.type('{selectall}')
			.type('{backspace}')
			.type('plot')

			//save it 
			cy.get('button')
			.contains('Save')
			.click()

			//confirmation message should pop up
			cy.get('.toast-message')
			.should('be.visible')

			//search for the movie you just added
			movieSearch(addedTitle)

			//make sure it shows up in the search 
			cy.get('.title a:first')
			.should('contain', addedTitle)

		})


	//deleting a movie from the list 
	it('delete movie', () => {

		const deletedTitle = 'Alive'

		//search for the movie 'Alive'
		movieSearch(deletedTitle)

		cy.get('.movie-row .title:first button:first')
		.click()
		//delete it 
		cy.get('.btn-danger')
		.click()
		//delete confirmation should show up 
		cy.get('.toast-message')
			.should('be.visible')
		//search for movie you just deleted 
		cy.get('input')
		.type('{selectall}')
		.type('{backspace}')
		.type(deletedTitle)

		cy.get('button')
		.contains('Search')
		.click()
		//it shouldn't show up in search results 
		cy.get('.title a:first')
		.should('not.contain', deletedTitle)
	})

	//change things in the forms, make sure it accepts input 
		it('update fields in form', () => {

		movieSearch('Black Swan')

		cy.get('.movie-row .title:first button:last')
		.click()

		//change title 
		cy.get('input[name=title]')
		.type(' Play')
		.should('have', 'Play')
		//change year
		cy.get('input[name=year]')
		.type('{selectall}')
		.type('{backspace}')
		.type(2017)
		.should('have.value', '2017')
		//change runtime
		cy.get('input[name=runtime]')
		.type('{selectall}')
		.type('{backspace}')
		.type(200)
		.should('have.value', '200')
		//change director
		cy.get('input[name=director]')
		.type('{selectall}')
		.type('{backspace}')
		.type('Jane Doe')
		.should('have.value', 'Jane Doe')
		//change actors 
		cy.get('textarea[name=actors]')
		.type('{selectall}')
		.type('{backspace}')
		.type(', Archer')
		.should('have', 'Archer')
		//change plot 
		cy.get('textarea[name=plot]')
		.type(' This movie is awesome!')
		.should('have', 'This movie is awesome!')
		//save your changes 
		cy.get('button')
		.contains('Save')
		.click()
		//confirmation toast should be visible
		cy.get('.toast-message')
			.should('be.visible')

		//check title 
		cy.get('.title a:first')
		.should('contain', 'Play')

		//check year & runtime 
		cy.get('.movie-row .movie-info')
		.should('contain', '2017')
		.and('contain', '200')

		//check director & actor
		cy.get('.movie-row .actors')
		.should('contain','Jane Doe')
		.and('contain','Archer')
		
		//check plot 
		cy.get('.plot')
		.should('contain', 'This movie is awesome!')
			
	})

	it('show error message when submitting empty new movie', () => {
		//click on + button
		cy.get('.btn-success')
		.click()

		//hit save without entering fields 
		cy.get('button')
		.contains('Save')
		.click()

		//toast should pop up 
		cy.get('.field')
		.children('.alert-danger')
		.should('be.visible')
	})

	it('display message if no movies are found', () => {

		movieSearch('zzzzzzzzz')
		//display message 
		cy.get('.row')
		.children()
		.contains('No movies.')
		.should('be.visible')

	})

	context('disable >> and << buttons appropriately', () => {

		it('check if << button is disabled', () => {

			//first button should be disabled when on the first page
			cy.get('.pagination-md li:first')
			.should('have.class', 'disabled')
		})

		it('check if >> button is disabled', () => {

			//go to page 15
			cy.get('.pagination-md li a')
			.contains(15)
			.click()
			//check that button is disabled 
			cy.get('.pagination-md li:last')
			.should('have.class', 'disabled')

		})
	})	

}) 