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
- OOP: class-based

## Roadmap

- Objects
- Prototypes
- Async / Promises

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

(var foo 1)
(++ foo)
foo
>>> 2

(var foo 3)
(*= foo 2)
foo
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

**Block declaration with identifier resolution**

*Successive expressions must be wrapped inside a block.*
```
(begin
  (var foo 10)

  (begin
    (set foo 100)
  )

  foo
)

>>> 100
```

### Control flow

**If statement**
```
(var age 15)
(var can_drink false)

(if (>= age 21)
  (set can_drink true)
  (set can_drink false)
)

can_drink

>>> false
```

**Switch statement**
```
(var x 10)
(switch
  ((= x 10) 100)
  ((> x 10) 200)
  (else 300)
)

>>> 100
```

**While loop**
```
(var counter 0)
(var result 0)

(while (< counter 10)
  (begin
    (set result (+ result 1))
    (set counter (+ counter 1))
  )
)

result

>>> 10
```

**For loop**
```
(var result 10)
(for 
  (var i result)
  (>= i 0)
  (set i (- i 1))
  (set result i)
)

result

>>> 0
```

### Lists

**List declaration**
```
(var l (list "apple" "banana" "orange"))
(idx l 0)

>>> "apple"
```

**List push**
```
(var l (list "apple" "banana" "orange"))
(push l "pineapple")
(idx l 3)

>>> "pineapple"
```

**List pop**
```
(var l (list "apple" "banana" "orange"))
(pop l)
(push l "pineapple")
(idx l 2)

>>> "pineapple"
```

### Functions

**Function declaration and call**
```
(def square (x) 
  (* x x)
)

(square (2))

>>> 4
```

**Lambdas**
```
(def on_click (callback)
  (begin
    (var x 10)
    (var y 20)
    (callback (+ x y))
  )
)

(on_click (lambda (data) (* data 10)))

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
(class Point null
  (begin
    (def constructor (self x y)
      (begin
        (set (prop self x) x)
        (set (prop self y) y)
      )
    )

    (def translate_x (self other)
      (+= (prop self x) (prop other x))
    )

    (def translate_y (self other)
      (+= (prop self y) (prop other y))
    )
  )
)

(var p1 (new Point 10 20))
(var p2 (new Point 5 10))

((prop p1 translate_x) p1 p2)
(prop p1 x)

>>> 15
```

**Class inheritance**
```
(class Point3D Point
  (begin
    (def constructor (self x y z)
      (begin
        ((prop (super Point3D) constructor) self x y)
        (set (prop self z) z)
      )
    )

    (def translate_z (self other)
      (+= (prop self z) (prop other z))
    )

    (def translate (self other)
      (begin
        ((prop (super Point3D) translate_x) self other)
        ((prop (super Point3D) translate_y) self other)
        ((prop self translate_z) self other)
      )
    )
  )
)

(var p1 (new Point3D 10 20 60))
(var p2 (new Point3D 5 10 30))

((prop p1 translate) p1 p2)
(prop p1 x)

>>> 15
```

## Built-in functions

```
(print "Hello World")
>>> Hello World
```