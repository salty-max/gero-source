# GERO language

A dynamic programminbg language with simple syntax, functional heart and OOP support

## Features

- Simple syntax: (S-expression)
- Everything is an expression
- No explicit return, last evaluated expression is the result
- First-class functions: assign to variables, pass as arguments, return as values
- Static scope: all functions are closure
- Lambda functions, IILEs
- Function programming
- Imperative programming
- Namespaces and modules
- OOP: class-based, prototype-based

## Syntax

**Self-evaluation expression**
```
1
>>> 1

"Hello World"
>>> Hello World

true
>>> true
```

**Math operation**
```
(+ 2 3)
>>> 5

(- (+ (+ 2 3) (+ 2 3)) 20)
>>> 10
```

**Comparison**
```
(> 5 10)
>>> false

(= 5 5)
>>> true
```

**Variable declaration**
```
(var x 5)
x
>>> 5
```

**Variable assignment**
```
(var x 5)
(set x 10)
x
>>> 10
```

**Block declaration**

*Successive expressions must be wrapped inside a block.*
```
(begin
  (var foo "hello")
  (set foo "world")

  foo
)
>>> world
```

**If statements**
```
(begin
  (var age 15)
  (var can_drink false)

  (if (>= age 21)
    (set can_drink true)
    (set can_drink false)
  )

  can_drink
)
>>> false
```

**While loops**
```
(begin
  (var counter 0)
  (var result 0)

  (while (< counter 10)
    (begin
      (set result (+ result 1))
      (set counter (+ counter 1))
    )
  )

  result
)
>>> 10
```

**Functions**
```
(begin
  (def square (x) 
    (* x x)
  )

  (square (2))
)
>>> 4
```

**Lambdas**
```
(begin
  (def on_click (callback)
    (var x 10)
    (var y 20)
    (callback (+ x y))
  )

  (on_click (lambda (data) (* data 10)))
)
>>> 300
```

## Built-in functions

```
(print "Hello World")
>>> Hello World
```