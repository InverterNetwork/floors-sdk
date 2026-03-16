import { describe, expect, it } from 'bun:test'

import { deduplicateParticipations, type ParticipationRecord } from '../src/graphql/api/mappers'

function makeParticipation(
  overrides: Partial<ParticipationRecord> & { transactionHash: string }
): ParticipationRecord {
  return {
    positionId: null,
    mintedAmountRaw: null,
    mintedAmountFormatted: null,
    ...overrides,
  }
}

describe('deduplicateParticipations', () => {
  it('keeps single records unchanged', () => {
    const records = [
      makeParticipation({
        transactionHash: '0xaaa',
        positionId: '1',
        mintedAmountRaw: '1000',
        mintedAmountFormatted: '1000.0',
      }),
    ]
    const result = deduplicateParticipations(records)
    expect(result).toHaveLength(1)
    expect(result[0].mintedAmountRaw).toBe('1000')
  })

  it('deduplicates by txHash', () => {
    const records = [
      makeParticipation({
        transactionHash: '0xaaa',
        positionId: null,
        mintedAmountRaw: '500',
        mintedAmountFormatted: '500.0',
      }),
      makeParticipation({
        transactionHash: '0xaaa',
        positionId: '1',
        mintedAmountRaw: '500',
        mintedAmountFormatted: '500.0',
      }),
    ]
    const result = deduplicateParticipations(records)
    expect(result).toHaveLength(1)
  })

  it('prefers record with both positionId AND mintedAmountRaw', () => {
    const records = [
      makeParticipation({
        transactionHash: '0xaaa',
        positionId: null,
        mintedAmountRaw: '500',
        mintedAmountFormatted: '500.0',
      }),
      makeParticipation({
        transactionHash: '0xaaa',
        positionId: '1',
        mintedAmountRaw: '500',
        mintedAmountFormatted: '500.0',
      }),
    ]
    const result = deduplicateParticipations(records)
    expect(result[0].positionId).toBe('1')
    expect(result[0].mintedAmountRaw).toBe('500')
  })

  it('merges mintedAmount from PresaleBought into PositionCreated when latter has zero', () => {
    // PresaleBought has mintedAmount but no positionId
    // PositionCreated has positionId but mintedAmount is "0"
    const records = [
      makeParticipation({
        transactionHash: '0xaaa',
        positionId: null,
        mintedAmountRaw: '1000',
        mintedAmountFormatted: '1000.0',
      }),
      makeParticipation({
        transactionHash: '0xaaa',
        positionId: '1',
        mintedAmountRaw: '0',
        mintedAmountFormatted: '0',
      }),
    ]
    const result = deduplicateParticipations(records)
    expect(result).toHaveLength(1)
    expect(result[0].positionId).toBe('1')
    expect(result[0].mintedAmountRaw).toBe('1000')
    expect(result[0].mintedAmountFormatted).toBe('1000.0')
  })

  it('merges mintedAmount from PresaleBought into PositionCreated when latter has null', () => {
    const records = [
      makeParticipation({
        transactionHash: '0xaaa',
        positionId: null,
        mintedAmountRaw: '750',
        mintedAmountFormatted: '750.0',
      }),
      makeParticipation({
        transactionHash: '0xaaa',
        positionId: '2',
        mintedAmountRaw: null,
        mintedAmountFormatted: null,
      }),
    ]
    const result = deduplicateParticipations(records)
    expect(result).toHaveLength(1)
    expect(result[0].positionId).toBe('2')
    expect(result[0].mintedAmountRaw).toBe('750')
  })

  it('keeps different txHashes as separate entries', () => {
    const records = [
      makeParticipation({
        transactionHash: '0xaaa',
        positionId: '1',
        mintedAmountRaw: '100',
        mintedAmountFormatted: '100.0',
      }),
      makeParticipation({
        transactionHash: '0xbbb',
        positionId: '2',
        mintedAmountRaw: '200',
        mintedAmountFormatted: '200.0',
      }),
    ]
    const result = deduplicateParticipations(records)
    expect(result).toHaveLength(2)
  })

  it('handles empty array', () => {
    expect(deduplicateParticipations([])).toEqual([])
  })
})
