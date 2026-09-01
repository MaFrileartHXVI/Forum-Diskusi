/**
 * skenario testing
 *
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button').contains(/Login/i).should('be.visible')
  })

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button').contains(/Login/i).click()

    // memverifikasi window.alert untuk menampilkan pesan dari browser
    cy.on('window:alert', (str) => {
      expect(str).to.equal('\"email\" is not allowed to be empty')
    })
  })

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('john@example.com')

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/Login/i).click()

    // memverifikasi window.alert untuk menampilkan pesan dari browser
    cy.on('window:alert', (str) => {
      expect(str).to.equal('\"password\" is not allowed to be empty')
    })
  })

  it('should display alert when email and password are wrong', () => {
    // mengisi email dan password yang salah
    cy.get('input[placeholder="Email"]').type('wrong@example.com')
    cy.get('input[placeholder="Password"]').type('wrongpassword')

    // klik tombol login
    cy.get('button').contains(/Login/i).click()

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong')
    })
  })

  it('should display homepage when email and password are correct', () => {
    // mengisi email dan password yang benar
    cy.get('input[placeholder="Email"]').type('forum@mail.com')
    cy.get('input[placeholder="Password"]').type('forum@mail.com')

    // klik tombol login
    cy.get('button').contains(/Login/i).click()

    // memverifikasi bahwa elemen yang ada di homepage tampil
    cy.get('nav').should('be.visible')
    // memverifikasi URL berubah ke homepage
    cy.url().should('eq', 'http://localhost:5173/')
  })
})
