
import P from 'parsimmon'

export enum LanguageParts {
  Call,
  Assignment
}

export interface Language {
  [key: string]: (p:P.Language) => P.Parser<any>
}
