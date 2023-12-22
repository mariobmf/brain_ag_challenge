import { test } from '@japa/runner'
import { validateCpf } from './cpf-validator'

test.group('CpfValidator', () => {
  test('Should return true for an valid CPF', async ({ expect }) => {
    expect(validateCpf('71779879083')).toBeTruthy()
    expect(validateCpf('717.798.790-83')).toBeTruthy()
  })
  test('Should return false for an invalid CPF', ({ expect }) => {
    expect(validateCpf('111.111.111-11')).toBeFalsy()
    expect(validateCpf('11111111111')).toBeFalsy()
    expect(validateCpf('12345678900')).toBeFalsy()
  })

  test('Should return false for a CPF with incorrect length', ({ expect }) => {
    expect(validateCpf('123.456.789-091')).toBeFalsy()
  })

  test('Should return false for a CPF with non-numeric characters', ({ expect }) => {
    expect(validateCpf('123.456.789-0a')).toBeFalsy()
  })
})
