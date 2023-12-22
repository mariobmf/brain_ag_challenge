import { UseCaseError } from 'App/core/app-error'

export class RuralProducerNotFound extends Error implements UseCaseError {
  constructor() {
    super(`Rural producer not found`)
    this.message = 'Rural producer not found'
  }
}
