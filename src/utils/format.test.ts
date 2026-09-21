import { describe, expect, it } from 'vitest'
import { formatNumber } from './format.ts'

describe('formatNumber', () => {
  it('usa o separador de milhar do pt-BR', () => {
    expect(formatNumber(324557)).toBe('324.557')
  })

  it('mantém números pequenos sem separador', () => {
    expect(formatNumber(42)).toBe('42')
  })
})
