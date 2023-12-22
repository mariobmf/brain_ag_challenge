import { validateCnpj } from 'App/utils/cnpj-validator'
import { validateCpf } from 'App/utils/cpf-validator'

export class Document {
  private _value: string

  constructor(value: string) {
    this._value = value
  }

  static create(value: string) {
    if (!validateCpf(value) && !validateCnpj(value)) throw new Error('Invalid Document')
    return new Document(value)
  }

  public get value() {
    return this._value
  }
}
