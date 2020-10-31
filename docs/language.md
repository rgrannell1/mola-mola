
# Language Design

## Function Syntax

```
$fn(x x)
$fn((x) x)
$fn((x y) x)
$fn((x y ...rest) x)
$fn((x 0 y {"a" 1 "b" 2} ...rest) x)
```

## Assignment Syntax

list and map destructuring, with defaults
```
(x y) <- fn()
(x y 20) <- fn()
{x y} <- fn()
```
rest parameters.
```
x <- fn()
(x y ...rest) <- fn()
{x y ...rest} <- fn()
```
nested destructuring.
```
((x y) ...rest) <- fn()
```

## Language

Unlike most language, Mola has two types of calleable; operatives and applicatives. Applicatives are standard lambda functions, while operatives receive unevaluated arguments and an additional environment variables. In other words, applicatives are operatives that simply evaluate their arguments in their construction environment.

Mola uses latent typing - values, not variables - have types associated with them, so type checks are performed at runtime.

Error handling is not through exceptions; errors are handled through multiple returns.

Environments bind symbols to a value, and includes zero or more references to other environments. Depth-first search to resolve.

Names:
- $operative
- is-true?
- update-thing!

[ ] describe #inert, #ignore, and #\
