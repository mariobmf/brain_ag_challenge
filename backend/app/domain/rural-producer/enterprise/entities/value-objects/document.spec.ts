import { test } from '@japa/runner'
import { Document } from './document'

test.group('DocumentValueObject', () => {
  test('Should create an Document with CPF type', async ({ expect }) => {
    const cpfMock = '11409036677'
    const document = Document.create(cpfMock)
    expect(document.value).toEqual(cpfMock)
  })
  test('Should create an Document with CNPJ type', async ({ expect }) => {
    const cnpjMock = '64863839000136'
    const document = Document.create(cnpjMock)
    expect(document.value).toEqual(cnpjMock)
  })
  test('Should throw an error for an invalid CPF', async ({ assert }) => {
    const invalidCpf = '111.111.111-11'
    assert.throws(() => Document.create(invalidCpf), 'Invalid Document')
  })
  test('Should throw an error for an invalid CNPJ', async ({ assert }) => {
    const invalidCnpj = '11111111111111'
    assert.throws(() => Document.create(invalidCnpj), 'Invalid Document')
  })
})
