---
layout: post
category: notes
title: Baisc data structures & algorithms in python
snippet: Pyhton snippets for popular data structures and algorithms.
tags: [data structures, algorithms, leetcode]
---
- TOC
{:toc .toc}
---
## Data Structures

### Linked List

```python
class ListNode:
    def __init__(self, val: int=0, next: Optional[ListNode]=None):
        self.val = val
        self.next = next

def nextNode(node : Optional[ListNode]) -> Optional[ListNode]:
    return node.next if node else None

pre, cur, nxt = None, head, nextNode(head)
```


### Stack

```python
class Stack:
    def __init__(self):
        self.stack = []
        
    def push(self, n: str):
        self.stack += [n]
    
    def peek(self) -> str:
        if self.stack:
            n = self.stack[-1]
        else:
            n = ""
        return n
    
    def pop(self) -> str:
        n = self.peek()
        self.stack = self.stack[:-1]
        return n
```

Note, this implementation uses `list`, which is a python implementation of a dynamic array. Using a linkedin-list based `deque` would be (slightly) better for memory (`O(2*N)` worst-case vs. `O(N)`) and time (`O(1)` amortized vs. `O(1)`).

```python
from collections import deque

stack = deque(some_list)    # initializaiton, also accepts maxlen parameter
val = stack.pop()           # pop val from RIGHT
stack.extend([val])         # append val to RIGHT
stack.append(val)           # equivalent to above
```


### Queue

```python
from collections import deque

queue = deque(some_list)    # initializaiton, also accepts maxlen parameter
val = queue.popleft()       # pop val from LEFT
queue.extend([val])         # append val to RIGHT
queue.append(val)           # equivalent to above
```


### Binary Tree

```python
class TreeNode:
    def __init__(
            self,
            val: int=0,
            left: Optional[TreeNode]=None,
            right: Optional[TreeNode]=None
        ):
        self.val = val
        self.left = left
        self.right = right
```


### Heap

```python
# min-heap
heapq.heappush(arr, val)
val = heapq.heappop(arr)
# max-heap
heapq.heappush(arr, -1 * val)
val = -1 * heapq.heappop(arr)
```


### Prefix Tree/ Trie

```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.children = {}

END = "*"
class Trie:
    def __init__(self):
        self.root = TreeNode("")

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char in node.children:
                node = node.children[char]
            else:
                node.children[char] = TreeNode(char)
                node = node.children[char]
        
        if END not in node.children:
            node.children[END] = TreeNode(END)

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char in node.children:
                node = node.children[char]
            else:
                return False
        
        if END in node.children:
            return True
        else:
            return False
        

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char in node.children:
                node = node.children[char]
            else:
                return False
        return True
```

## Algorithms

### Array Search

#### Binary Search

```python
def binarySearch(number: int, arr: List[int]) -> int:
    """
    Time Complexity:    O(log(N))
    Space Complexity:   O(1)
    """
    n = len(arr) - 1
    left, right = 0, n
    
    while left <= right:
        mid = (left + right)//2
        
        if number < arr[mid]:
            right = mid - 1
        elif arr[mid] < number:
            left = mid + 1
        else:
            return mid
        
    return (left + right)/2.0
```


### Graph Search

#### Breadth First Search
Using the [number of islands problem](https://leetcode.com/problems/number-of-islands/description/) as an example.

```python
def numIslands(self, grid: List[List[str]]) -> int:
        """
        Time Complexity:    O(N)
        Space Complexity:   O(N)
        """
        M, N = len(grid), len(grid[0])
        
        visited = set()
        # BFS to explore/visit current island
        def exploreIsland(x, y):
            queue = deque()
            queue.append( (x, y) )
            while queue:                            # until visited all
                # x, y = queue.pop()                # use for DFS
                x, y = queue.popleft()

                STEPS = ([
                    (0, 1),
                    (1, 0),
                    (0, -1),
                    (-1, 0)
                ])
                neighbors = [(y + dy, x + dx) for dy, dx in STEPS]
                for xn, yn in neighbors:
                    if (0 <= xn < M and             # x_ in range
                        0 <= yn < N and             # y_ in range
                        grid[xn][yn] == "1" and     # land coordinate
                        (xn, yn) not in visited):   # not visited

                        queue.append( (xn, yn) )    # make sure to visit
                        
                visited.add( (x, y) )
            
            return
        
        islands = 0
        for x in range(M):
            for y in range(N):
                if (grid[x][y] == "1" and
                    (x, y) not in visited):
                    islands += 1
                    exploreIsland(x, y)
                    
        return islands
```

#### Deapth First Search
Use `stack` instead of `queue` (i.e. use `x, y = queue.pop()` instead of `x, y = queue.popleft()`) in BFS.

### Sorting

#### Merge Sort

```python
def mergeSort(arr: List[int]) -> List[int]:
    """
    Time Complexity:    O(N*log(N))
    Space Complexity:   O(N)
    """
    n = len(arr)
    if n <= 1:
        return arr
    else:
        left_sorted = mergeSort(arr[:n//2])     # sort left
        right_sorted = mergeSort(arr[n//2:])    # sort right
        all_sorted = left_sorted+right_sorted   # merge
        return all_sorted
```