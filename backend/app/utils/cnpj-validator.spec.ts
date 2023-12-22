import { test } from '@japa/runner'
import { validateCnpj } from './cnpj-validator'

test.group('CnpjValidator', () => {
  test('Should return true for an valid CNPJ', async ({ expect }) => {
    expect(validateCnpj('64863839000136')).toBeTruthy()
    expect(validateCnpj('64.863.839/0001-36')).toBeTruthy()
  })
  test('Should return false for an invalid CNPJ', ({ expect }) => {
    expect(validateCnpj('11.111.111/1111-11')).toBeFalsy()
    expect(validateCnpj('11111111111111')).toBeFalsy()
    expect(validateCnpj('12345678900123')).toBeFalsy()
  })

  test('Should return false for a CNPJ with incorrect length', ({ expect }) => {
    expect(validateCnpj('123.456.789-091')).toBeFalsy()
  })

  test('Should return false for a CNPJ with non-numeric characters', ({ expect }) => {
    expect(validateCnpj('11.111.111/1111-1a')).toBeFalsy()
  })
})
