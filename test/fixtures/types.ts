import type { Contract, ContractDefinition } from '@balena/transformer-sdk'

export interface EmbryoData {
	[k: string]: unknown;
}

export interface EmbryoContract extends Contract<EmbryoData> {
    type: 'embryo'
}

export interface EmbryoContractDefinition extends ContractDefinition<EmbryoData> {
    type: 'embryo'
}

export interface LarvaData {
	numLegs: number;
	[k: string]: unknown;
}

export interface LarvaContract extends Contract<LarvaData> {
    type: 'larva'
}

export interface LarvaContractDefinition extends ContractDefinition<LarvaData> {
    type: 'larva'
}

export interface PupaData {
	[k: string]: unknown;
}

export interface PupaContract extends Contract<PupaData> {
    type: 'pupa'
}

export interface PupaContractDefinition extends ContractDefinition<PupaData> {
    type: 'pupa'
}

export interface AdultData {
	numWings: number;
	[k: string]: unknown;
}

export interface AdultContract extends Contract<AdultData> {
    type: 'adult'
}

export interface AdultContractDefinition extends ContractDefinition<AdultData> {
    type: 'adult'
}

