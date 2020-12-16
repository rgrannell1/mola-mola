
//import revexp from 'revexp'
import P from 'parsimmon'
import constants from './constants.js'

const {
  ATOM_PATTERN,
  IDENTIFIER_PATTERN,
  NUMBER_PATTERN
} = constants

import {
  Language, LanguageParts
} from './types.js'

export const language:Language = { }

language.Atom = () => {
  return P.regexp(ATOM_PATTERN)
}

language.Identier = () => {
  return P.regexp(IDENTIFIER_PATTERN)
}

language.True = () => {
  return P.string('#t')
}

language.False = () => {
  return P.string('#f')
}

language.Inert = () => {
  return P.string('#inert')
}

language.Number = () => {
  return P.regexp(NUMBER_PATTERN).map(Number)
}

language.Assignment = ref => {
  if (ref === undefined) {
    throw new Error('ref not defined.')
  }
  return P.seq(
    ref.Identier.trim(P.optWhitespace),
    P.string('<-').trim(P.optWhitespace),
    P.alt(
      ref.True,
      ref.False,
      ref.Inert,
      ref.Number,
      ref.String,
      ref.Call
    )
  ).map(parts => {
    const [id, _, val] = parts

    return {
      id,
      val,
      type: LanguageParts.Assignment
    }
  })
}

language.Call = ref => {
  if (ref === undefined) {
    throw new Error('ref not defined.')
  }

  return P.seq(
    ref.Identier,
    P.string('('),
    P.sepBy(ref.Value, P.whitespace).trim(P.optWhitespace),
    P.string(')')
  ).map(parts => {
    return {
      calleable: parts[0],
      args: parts[2],
      type: LanguageParts.Call
    }
  })
}

language.Value = ref => {
  if (ref === undefined) {
    throw new Error('ref not defined.')
  }

  return P.alt(
    ref.True,
    ref.False,
    ref.Inert,
    ref.Number,
    ref.String,
    ref.Dictionary,
    ref.Assignment,
    ref.Call,
    ref.List,
    ref.Identier
  )
}

language.List = ref => {
  if (ref === undefined) {
    throw new Error('ref not defined.')
  }

  return P.seq(
    P.string('(').trim(P.optWhitespace),
    P.sepBy(ref.Value, P.whitespace).trim(P.optWhitespace),
    P.string(')')
  )
}

language.Dictionary = ref => {
  if (ref === undefined) {
    throw new Error('ref not defined.')
  }

  return P.seq(
    P.string('{').trim(P.optWhitespace),
    P.sepBy(ref.Value, P.whitespace).trim(P.optWhitespace),
    P.string('}')
  ).map((parts:any[]) => {
    return parts[1]
  })
}

language.String = ref => {
  return P.regexp(/"[^\"]*"/).map(parts => parts[0].slice(1, -1))
}

language.InterlineSpacing = () => {
  return P.regexp(/\s*\n\s*/)
}

language.Program = ref => {
  if (ref === undefined) {
    throw new Error('ref not defined.')
  }

  return P.sepBy(ref.Value, ref.InterlineSpacing)
}
