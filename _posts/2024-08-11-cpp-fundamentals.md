---
layout: post
category: notes
title: C++ fundamentals
snippet: Basic concepts in C++
tags: [data structures, algorithms, leetcode]
published: false
---
- TOC
{:toc .toc}
---

## Execution workflow

### Compiler

- Preprocessing statements `#include <iostream>` are 'pre-processed' before compilation.
- In this case `include` takes header files and pastes them into main file.
- `main` function returns `0` by default (special case). 
- for compilation, function declarations (but not definitions) are required.
- compiler makes an object file (`.obj`) for each `cpp` file.

### Linker

- linker takes multiple `.obj` (or essentially `.cpp`) files and 'links' them together, i.e. uses function definitions where required (before we only had declarations).
- this gives us a single(?) executable file.

### Make

The `make` command help with building (i.e. compiling and linking) multiple files, e.g.

```bash
CFLAG = -Wno-implicit-function-declaration

all: main.cpp func.cpp
    @echo "Compiling+linking files."
    g++ ${CFLAGS} main.cpp func.cpp -o output
    @chmod +x output

clean:
    rm output
```

Use `make all` followed by `./output` to execute the program.

## Primitive Types

```cpp
int variable = 8;           // -2b - 2b
unsigned int uvariable = 8; // 0 - 4b

bool b=true;                // 1 byte
char a='A';                 // 1 byte
short s=65;                 // 2 bytes
int i=65;                   // 4 bytes
long l=65;                  // 4 bytes
long long ll=65;            // 8 bytes
float f=3.14f;              // 4 bytes
double d=3.14;              // 8 bytes
```

## Headers

Includes function declarations in `.h` files. Definitions go in `.cpp` files.
```cpp
#pragma once            // prevents double declarations

void Func(const char* argument);
```

Use in `main.cpp`.
```cpp
#include "Func.h"       // relative path to main.cpp
#include <stdlib.h>     // C std lib has a .h extension
#include <iostream>     // C++ standard lib.
#include "iostream"     // also works, but <> are only for compiler input path files

int main () {
    // do something...
}
```

## Pointers

```cpp
int my_var = 8;
int* my_ptr = &my_var;
std::cout << printf(my_ptr);    // prints 0xMMMMMMMM
std::cout << printf(*my_ptr);   // prints 8
```

alternatively,

```cpp
int my_var = 8;
int* my_ptr = nullptr;          // similar to 0 or NULL
my_ptr = &my_var;
std::cout << printf(my_ptr);    // prints 0xMMMMMMMM
std::cout << printf(*my_ptr);   // prints 8
```

### Type casting for pointers

```cpp
int my_var = 8;
double* my_ptr = (double*)&my_var;
```

### Heap instead of stack

```cpp
char* buffer = new char[8];
memset(
    buffer,         // the pointer
    0,              // the value to be assigned/set
    8               // how many bytes
)
// do whatever with buffer...
delete[] buffer;    // de-allocate
```

### Pass by reference using pointers

```cpp

void Increment(int* number){
    (*number)++;    // incrementing takes precidence by default
}

int main(){
    int number = 8;
    Increment(&number);
}
```

## References

```cpp
int my_var = 8;
int& my_ref = my_var;
```

### Pass by reference

```cpp
void Increment(int& number){
    number++;    // incrementing takes precidence by default
}

int main(){
    int number = 8;
    Increment(number);
}
```
