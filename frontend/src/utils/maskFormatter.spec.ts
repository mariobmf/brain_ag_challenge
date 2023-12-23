import { phoneNumberMask, cpfMask, cpfCnpjMask } from './maskFormatter';

describe('maskFormatter', () => {
  describe('phoneNumberMask', () => {
    it('should format phone number with 11 digits', () => {
      const result = phoneNumberMask('11987654321');
      expect(result).toBe('(11) 9 8765-4321');
    });

    it('should format phone number with 10 digits', () => {
      const result = phoneNumberMask('1187654321');
      expect(result).toBe('(11) 8765-4321');
    });
  });

  describe('cpfMask', () => {
    it('should format CPF', () => {
      const result = cpfMask('12345678909');
      expect(result).toBe('123.456.789-09');
    });
  });

  describe('cpfCnpjMask', () => {
    it('should format CPF', () => {
      const result = cpfCnpjMask('12345678909');
      expect(result).toBe('123.456.789-09');
    });
    it('should format CNPJ', () => {
      const result = cpfCnpjMask('66745796000110');
      expect(result).toBe('66.745.796/0001-10');
    });
  });
});
