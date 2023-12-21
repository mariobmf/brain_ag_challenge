export class Document {
  private _value: string

  constructor(value: string) {
    this._value = value
  }

  static create(document: string) {
    return new Document(document)
  }

  public get value() {
    return this._value
  }
}
