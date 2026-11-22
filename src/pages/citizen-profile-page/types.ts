import citizens from '@/data/citizens.json';

export type Citizen = (typeof citizens)[number];

export type FamilyMember = Citizen['family'][number];
export type Education = Citizen['education'][number];
export type Employment = Citizen['employment'][number];
