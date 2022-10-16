# GERO language

A dynamic programming language with simple syntax, functional heart and OOP support

## Features

- Simple syntax: (S-expression)
- Everything is an expression
- No explicit return, last evaluated expression is the result
- First-class functions: assign to variables, pass as arguments, return as values
- Static scope: all functions are closure
- Lambda functions, IILEs
- Functional programming
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

(begin
  (var foo 1)
  (++ foo)
  foo
)
>>> 2

(begin
  (var foo 3)
  (*= foo 2)
  foo
)
>>> 6
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

### Control flow

**If statement**
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

**Switch statement**
```
(begin
  (var x 10)
  (switch
    ((= x 10) 100)
    ((> x 10) 200)
    (else 300)
  )
)
>>> 100
```

**While loop**
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

**For loop**
```
(begin
  (var result 10)
  (for 
    (var i result)
    (>= i 0)
    (set i (- i 1))
    (set result i)
  )

  result
)
>>> 0
```

### Functions

**Function declaration and call**
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

**IILE (Immediately-invoked Lambda Expression)**
```
((lambda (x) (* x x)) 2)
>>> 4
```

### OOP

**Class definition and instantation**
*Self reference is explicit!*
```
(begin
  (class Point null
    (begin
      (def constructor (self x y)
        (begin
          (set (prop self x) x)
          (set (prop self y) y)
        )
      )

      (def add (self other)
          (+= (prop self x) (prop other x))
          (+= (prop self y) (prop other y))
      )
    )
  )

  (var p1 (new Point 10 20))
  (var p2 (new Point 5 10))

  ((prop p1 add) p1 p2)
  (prop p1 x)
)
>>> 15
```

## Built-in functions

```
(print "Hello World")
>>> Hello World
```