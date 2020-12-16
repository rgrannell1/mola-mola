
import tap from 'tap'
import { language } from '../src/language.js'
import * as revexp from 'revexp'
import constants from '../src/constants.js'

const {
  ATOM_PATTERN,
  IDENTIFIER_PATTERN,
  NUMBER_PATTERN
} = constants

const { parts: R } = revexp

tap.test('test generated-atoms parse as expected', async (childTest:any) => {
  const atom = R.regexp(ATOM_PATTERN)
  const atomParser = language.Atom()

  for (const tcase of revexp.tools.firehose(atom, 10_000)) {
    try {
      atomParser.tryParse(tcase)
    } catch (err) {
      throw new Error(`failed for ${tcase}: ${err.message}`)
    }
  }

  childTest.end()
})

tap.test('test generated-numbers parse as expected', async (childTest: any) => {
  const number = R.regexp(NUMBER_PATTERN)
  const numberParser = language.Number()

  for (const tcase of revexp.tools.firehose(number, 10_000)) {
    try {
      numberParser.tryParse(tcase)
    } catch (err) {
      throw new Error(`failed for ${tcase}: ${err.message}`)
    }
  }

  childTest.end()
})
