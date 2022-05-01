import { ContractDefinition } from '@balena/transformer-sdk'

export interface EmbryoData {
	[k: string]: unknown;
}

export interface EmbryoContract extends ContractDefinition<EmbryoData > {
    type: 'embryo'
}

export interface LarvaData {
	numLegs: number;
	[k: string]: unknown;
}

export interface LarvaContract extends ContractDefinition<LarvaData > {
    type: 'larva'
}

export interface PupaData {
	[k: string]: unknown;
}

export interface PupaContract extends ContractDefinition<PupaData > {
    type: 'pupa'
}

export interface AdultData {
	numWings: number;
	[k: string]: unknown;
}

export interface AdultContract extends ContractDefinition<AdultData > {
    type: 'adult'
}

