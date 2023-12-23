import React from 'react';

export function cpf(e: React.ChangeEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14;
  let { value } = e.currentTarget;
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');
    e.currentTarget.value = value;
  }
  return e;
}
export function cell_phone(e: React.ChangeEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 16;
  const { value } = e.currentTarget;
  let mask = value.replace(/\D/g, '');
  mask = mask.replace(/^(\d{2})(\d)/g, '($1) $2');
  mask = mask.replace(/(\d{1})(\d{4})/, '$1 $2');
  mask = mask.replace(/(\d)(\d{4})$/, '$1-$2');
  e.currentTarget.value = mask;
  return mask;
}
export function cpf_cnpj(e: React.ChangeEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 18;
  let { value } = e.currentTarget;
  if (value.length <= 14) {
    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');
      e.currentTarget.value = value;
    }
  }
  if (value.length > 14) {
    if (!value.match(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})/)) {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1/$2');
      value = value.replace(/(\d{4})(\d{2})$/, '$1-$2');
      e.currentTarget.value = value;
    }
  }
  // Corrige um BUG do usuário digitar muito rápido e conseguir inserir um digito a mais
  if (value.length > 18) {
    value = value.replace(/\d/g, '');
    e.currentTarget.value = value;
  }
  return e;
}
