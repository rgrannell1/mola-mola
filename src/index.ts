
import * as fs from 'fs'
import P from 'parsimmon'
import { language } from './language.js'

const lang = P.createLanguage(language)

const script = fs.readFileSync('./script.vp').toString()

console.log(script)

const tree = lang.Program.tryParse(script)
console.log(JSON.stringify(tree, null, 2))
