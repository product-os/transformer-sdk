import type { InputManifest, Result } from '@balena/transformer-sdk'
import type { EmbryoContract, LarvaContractDefinition, LarvaContract, PupaContractDefinition, PupaContract, AdultContractDefinition } from './types'

export async function embryo2larva (input: InputManifest<EmbryoContract>): Promise<Result<LarvaContractDefinition>[]> {
    // TODO: implement transformation
}

export async function larva2pupa (input: InputManifest<LarvaContract>): Promise<Result<PupaContractDefinition>[]> {
    // TODO: implement transformation
}

export async function pupa2adult (input: InputManifest<PupaContract>): Promise<Result<AdultContractDefinition>[]> {
    // TODO: implement transformation
}

