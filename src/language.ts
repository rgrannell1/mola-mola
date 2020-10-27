
import P from 'parsimmon'

import {
  Language, LanguageParts
} from './types.js'

export const language:Language = { }

language.Atom = () => {
  return P.regexp(/\:[a-zA-Z0-9][a-zA-Z0-9\-]*[\-\!\?a-zA-Z0-9]?/)
}

language.Identier = () => {
  return P.regexp(/[\$a-zA-Z0-9][a-zA-Z0-9\-]*[\-\!\?a-zA-Z0-9]?/)
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
  return P.regexp(/[+-]?([0-9]*[.])?[0-9]+/).map(Number)
}

language.Assignment = ref => {
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
  return P.seq(
    P.string('(').trim(P.optWhitespace),
    P.sepBy(ref.Value, P.whitespace).trim(P.optWhitespace),
    P.string(')')
  )
}

language.Dictionary = ref => {
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
  return P.sepBy(ref.Value, ref.InterlineSpacing)
}
