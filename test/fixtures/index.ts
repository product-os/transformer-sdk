import { InputManifest, Result } from '@balena/transformer-sdk'
import type { EmbryoContract, LarvaContract, PupaContract, AdultContract } from './types'

export async function embryo2larva (input: InputManifest<EmbryoContract>): Promise<Result<LarvaContract>[]> {
    // TODO: implement transformation
}

export async function larva2pupa (input: InputManifest<LarvaContract>): Promise<Result<PupaContract>[]> {
    // TODO: implement transformation
}

export async function pupa2adult (input: InputManifest<PupaContract>): Promise<Result<AdultContract>[]> {
    // TODO: implement transformation
}

