import { UseCaseError } from 'App/core/app-error'

export class RuralProducerAlreadyExists extends Error implements UseCaseError {
  constructor() {
    super(`Rural producer already exists`)
    this.message = 'Rural producer already exists'
  }
}
