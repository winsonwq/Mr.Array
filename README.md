# Mr.Array

Mr.Array is a JavaScript Array Object method extention library. It will help you operate every item in array in LINQ way. And at the same time, the static method invoke is accepted.

## Supported APIs
* select

```js
var source = [{ id : 1, month : 11 }, { id : 2, month : 12 }, { id : 3, month : 13  }];
var idResult = source.select(function(o){ return o.id; });
```

* selectMany

```js
var source = [{ a : [1,2,3]}, { a : [4,5,6] }, { a : [7,8,9] }];
var result = source.selectMany(function(o){ return o.a; });
```

* toDictionary

```js
var source = [{ name : 'a',  value : [1,2,3] }, { name : 'b',  value : [4,5,6] }, { name : 'c',  value : [7,8,9] }, { name : 'a', value : [10, 11, 12] }];
var result = 
    source.toDictionary(function(obj){
		return obj.name + '_group';
	}, function(obj){
		return obj.value[0];
	});
```

* where

```js
var source = [{ id : 1, month : 11 }, { id : 2, month : 12 }, { id : 3, month : 13  }];
var idResult = source.where(function(o){ return o.id > 2; });
```

* orderBy

```js
var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4];
var result = source.orderBy(function(a,b){ return a - b });
```

* groupBy

```js
var source = [{ name : 'Attach'}, { name : 'Charactor'}, { name : 'Bee'}, { name : 'Cycle'}, { name : 'Add'}];
var result = 
    source
	.orderBy(function(a, b){ return a.name.charCodeAt(0) - b.name.charCodeAt(0); })
	.groupBy(function(obj){ return obj.name.charAt(0); });
```

* any

```js
var source = [{ name : 'Attach' }, { name : 'Charactor' }, { name : 'Bee' }, { name : 'Cycle' }, { name : 'Add' }];
var result = 
    source.
	any(function(obj){ return obj.name.charAt(0) == 'B'; });
```

* all

```js
var source = [{ name : 'Attach' }, { name : 'Charactor' }, { name : 'Bee' }, { name : 'Cycle' }, { name : 'Add' }];
var result = source.all(function(obj){
    return obj.name.length > 3; 
});
```

* take

```js
var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4];
var result = source.take(3);
```

* skip

```js
var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4];
var result = source.skip(5);
```

* each

```js
var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4], i = 0;
source.each(function(val, idx){
    equal(i++, idx);
    equal(source[idx], val);
});
```

* reduce_rtl

```js
var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4], i = 8;
var result = source.reduce_rtl(function(curr, old, idx, array){
    return curr + old;
});
```

* reduce_ltr

```js
var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4], i = 1;
var result = source.reduce_ltr(function(curr, old, idx, array){	
    return curr + old;
});
```

* except

```js
var source = [{ a : 1, b : 22 }, { a : 2, b : 77 }, { a : 2, b : 2 }, { a : 3, b : 5 }];
var source2 = [{ a : 1, b : 11 }, { a : 2, b : 32 }, { a : 3, b : 30 }, { a : 4, b : 2 }];
var result = source.except(source2, function(curr){ return curr.a == 1 || curr.a == 2; });
```

* intersect

```js
var source = [{ a : 1, b : 10 }, { a : 1, b : 10 }, { a : 2, b : 30 }, { a : 1, b : 40 }];
var source2 = [{ a : 1, b : 10 }, { a : 4, b : 20 }, { a : 2, b : 0 }, ];
var result = source.intersect(source2, function(curr, compare){ return curr.a == 1 && curr.b == 10 });
```

* union

```js
var source = [2, 2, 4, 4, 8], source2 = [9, 3, 9, 3];
var result = source.union(source2);
```

* diff

```js
var source = [2, 2, 1, 10, 3, 9, 4];
var source2 = [1, 10, 20, 4];
var result = source.diff(source2);
```

* contains
* containsAll
* distinct

```js
var source = [2, 2, 4, 4, 8, 9, 3, 9, 3];
var result = source.distinct();
```

## Example: Group programming languages

```js
// 2011年排行
var langs = [
    'Java', 'C', 'C++', 'C#', 'PHP', 'Python', 'Visual Basic', 'Objective-C', 'Perl', 'JavaScript',
    'Ruby', 'Assembly*', 'Delphi', 'Go', 'Lisp', 'Lua', 'Ada', 'Pascal', 'NXT-G', 'Scheme*',
    'RPG(OS/40)', 'Visual Basic .NET', 'Transact-SQL', 'R', 'Groovy', 'SAS', 'MATLAB', 'ABAP', 'Scratch', 'PL/SQL',
    'Haskell', 'Logo', 'D', 'Object Pascal', 'Fortran', 'Alice', 'Forth', 'COBOL', 'Erlang', 'Bash', 
    'ML', 'MAD', 'APL', 'Scala', 'F#', 'ActionScript', 'Smalltalk', 'C Shell', 'CL(OS/400)', 'Prolog'
];

var result = 
    langs
	.orderBy(function(a, b){ return a.charCodeAt(0) - b.charCodeAt(0); }) // important !!
	.groupBy(function(name){ return name.charAt(0); })
	.select(function(group){
		var obj = {};
		obj[group[0].charAt(0)] = group.orderBy(function(a, b){ return a.length - b.length; });
		return obj;
	});
```
