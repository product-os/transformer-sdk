import type { InputManifest, Result } from '@balena/transformer-sdk'
import type { EmbryoContract, LarvaContractDefinition, LarvaContract, PupaContractDefinition, PupaContract, AdultContractDefinition } from './types'

export async function embryo2Larva (input: InputManifest<EmbryoContract>): Promise<Result<LarvaContractDefinition>[]> {
    // TODO: implement transformation
}

export async function larva2Pupa (input: InputManifest<LarvaContract>): Promise<Result<PupaContractDefinition>[]> {
    // TODO: implement transformation
}

export async function pupa2Adult (input: InputManifest<PupaContract>): Promise<Result<AdultContractDefinition>[]> {
    // TODO: implement transformation
}

