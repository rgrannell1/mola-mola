
export default {
  ATOM_PATTERN: /\:[a-zA-Z0-9][a-zA-Z0-9\-]*[\-\!\?a-zA-Z0-9]?/,
  IDENTIFIER_PATTERN: /[\$a-zA-Z0-9][a-zA-Z0-9\-]*[\-\!\?a-zA-Z0-9]?/,
  NUMBER_PATTERN: /[+-]?([0-9]{0,10}[.])?[0-9]{1,10}/ // arbitrary bounds
}
