export interface PkmnBaseStat{
  base: number
  ev: number
  iv: number
  nature: 'neutral'|'beneficial'|'hindering'
  lvl: number
}

export interface PkmnData extends PkmnBaseStat{
  name?: string
  imgLink?: string
}

export type Modifiers = 'iron_ball'|'active_ability'|'tailwind'|'choice_scarf'|'paralyze'