describe('Central de Atendimento ao Cliente - TAT', () => {
  beforeEach(() => {
    cy.visit('../../src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()
    

    const longText = Cypress._.repeat('0123456789', 20)

    cy.get('#firstName').type('Eduardo', { delay: 0 })
    cy.get('#lastName').type('Henicka', { delay: 0 })
    cy.get('#email').type('eduardohenicka2k@gmail.com', { delay: 0 })
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('teste de erro ao enviar o formulário com email com formatação inválida', () => {
    cy.clock()

    cy.get('#firstName').type('Eduardo', { delay: 0 })
    cy.get('#lastName').type('Henicka', { delay: 0 })
    cy.get('#email').type('eduardohenicka2k@gmail,com', { delay: 0 })
    cy.get('#open-text-area').type('Teste de erro ao enviar o formulário com email com formatação inválida', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('teste para validar que o campo telefone aceita apenas números', () => {
    cy.get('#phone')
      .type('Eduardo')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido', () => {

    cy.get('#firstName').type('Eduardo')
    cy.get('#lastName').type('Henicka')
    cy.get('#email').type('eduardohenicka2k')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste de erro ao enviar o formulário com numero vazio')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName')
        .type('Eduardo')
        .should('have.value', 'Eduardo')
        .clear()
        .should('have.value', '')

      cy.get('#lastName')
        .type('Henicka')
        .should('have.value', 'Henicka')
        .clear()
        .should('have.value', '')

      cy.get('#email')
        .type('eduardohenicka2k@gmail.com')
        .should('have.value', 'eduardohenicka2k@gmail.com')
        .clear()
        .should('have.value', '')
      
      cy.get('#phone')
        .type('99999999999')
        .should('have.value', '99999999999')
        .clear()
        .should('have.value', '')
    })
      
    it('submete sem preencher os campos obrigatórios', () => {
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')
        .and('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
        .each(typeOfService => {
          cy.wrap(typeOfService)
            .check()
            .should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do', () => {
      cy.get('#firstName').type('Eduardo')
      cy.get('#lastName').type('Henicka')
      cy.get('#email').type('eduardohenicka2k@gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste de erro ao enviar o formulário com numero vazio')

      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json')
        .should(file => {
          expect(file[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(file => {
          expect(file[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('sampleFile')

      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(file => {
          expect(file[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem precisar de um clique', () => {
      cy.get('#privacy a')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.get('#title').should('be.visible')
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
    })

    it('testa a página da política de privacidade de forma independente', () => {
      cy.visit('../../src/privacy.html')

      cy.get('#title').should('be.visible')
      cy.title().should('contains', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')  
    })

    Cypress._.times(5, () => {
      it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()

        cy.get('#firstName').type('Eduardo', { delay: 0 })
        cy.get('#lastName').type('Henicka', { delay: 0 })
        cy.get('#email').type('eduardohenicka2k@gmail.com', { delay: 0 })
        cy.get('#open-text-area').type('Teste teste teste', { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(3000)

        cy.get('.success').should('not.be.visible')
      })
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')

      cy.get('.success')
        .invoke('hide')
        .should('not.be.visible')

      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')

      cy.get('.error')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preencha uma area de texto usando o comando invoke', () => {
      const longText = Cypress._.repeat('0123456789', 20)

      cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    })

    it('faz uma requisição HTTP', () => {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
        
      cy.get('@getRequest')
        .its('statusText')
        .should('be.equal', 'OK')

      cy.get('@getRequest')
      .its('body')
      .should('include', '<title>Central de Atendimento ao Cliente TAT</title>')
    })

    it('encontre o gato', () => {
      cy.get('#cat')
      .should('not.be.visible')

      cy.get('#cat')
      .invoke('show')
      .should('be.visible')

      cy.get('#title')
      .invoke('text', 'CAT TAT')

      cy.get('#subtitle')
      .invoke('text', 'eu amo gatos <3')
    })
})