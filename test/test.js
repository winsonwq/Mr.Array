module('Mr.Array.js');

function match(arr1, arr2){
	for(var i = 0, len = arr1.length ; i < len ; i++){
		strictEqual(arr1[i], arr2[i]);
	}
}

test('select', function(){
	expect(6);

	var source = [{ id : 1, month : 11 }, { id : 2, month : 12 }, { id : 3, month : 13  }];
	var idResult = source.select(function(o){ return o.id; });

	var monthResult = source.select(function(o){ return o.month; });

	match(idResult, [1, 2, 3]);
	match(monthResult, [11, 12, 13]);
});

test('selectMany', function(){
	var source = [{ a : [1,2,3]}, { a : [4,5,6] }, { a : [7,8,9] }];
	var result = source.selectMany(function(o){ return o.a; });

	match(result, [1,2,3,4,5,6,7,8,9]);
});

test('selectMany with exception', function(){
	var source = [{ a : [1,2,3]}, { a : 1 }, { a : [7,8,9] }];

	raises(function(){
		source.selectMany(function(o){ return o.a; });	
	}, 'return value must be array.');
});

test('where', function(){
	var source = [{ id : 1, month : 11 }, { id : 2, month : 12 }, { id : 3, month : 13  }];
	var idResult = source.where(function(o){ return o.id > 2; });

	equal(idResult.length, 1);
	equal(idResult[0].id, 3);
});

test('orderBy', function(){
	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4];
	var result = source.orderBy(function(a,b){ return a - b });

	match(result, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('groupBy', function(){
	var source = [{ name : 'Attach'}, { name : 'Charactor'}, { name : 'Bee'}, { name : 'Cycle'}, { name : 'Add'}];
	var result = 
		source
			.orderBy(function(a, b){ return a.name.charCodeAt(0) - b.name.charCodeAt(0); })
			.groupBy(function(obj){ return obj.name.charAt(0); });

	equal(result.length, 3);
	equal(result[0].length, 2);
	equal(result[1].length, 1);
	equal(result[2].length, 2);

	function predicate(obj){ return obj.name; }

	equal(result[0].select(predicate).containsAll(['Attach', 'Add']), true);
	equal(result[1].select(predicate).containsAll(['Bee']), true);
	equal(result[2].select(predicate).containsAll(['Charactor', 'Cycle']), true);
});


test('any', function(){
	var source = [{ name : 'Attach' }, { name : 'Charactor' }, { name : 'Bee' }, { name : 'Cycle' }, { name : 'Add' }];
	var result = 
		source.
			any(function(obj){ return obj.name.charAt(0) == 'B'; });

	strictEqual(result, true);
});

test('all', function(){
	var source = [{ name : 'Attach' }, { name : 'Charactor' }, { name : 'Bee' }, { name : 'Cycle' }, { name : 'Add' }];
	var result = source.all(function(obj){
		return obj.name.length > 3; 
	});

	strictEqual(result, false);

	var result = 
		source.
			all(function(obj){ return obj.name.length >= 3; });

	strictEqual(result, true);
});

test('take', function(){
	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4];
	var result = source.take(3);
	match(result, [2, 5, 6]);
});

test('skip', function(){
	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4];
	var result = source.skip(5);
	match(result, [8, 9, 3, 10, 4]);
});

test('each', function(){
	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4], i = 0;
	source.each(function(val, idx){
		equal(i++, idx);
		equal(source[idx], val);
	});
});

test('each with continue', function(){
	expect(16);

	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4], i = 0;
	source.each(function(val, idx){
		if(val > 6 && val < 9){
			i++;
			return 'CONTINUE';
		}

		equal(i++, idx);
		equal(source[idx], val);
	});
});

test('each with break', function(){
	expect(4);

	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4], i = 0;
	source.each(function(val, idx){
		if(val == 6){
			return 'BREAK';
		}

		equal(i++, idx);
		equal(source[idx], val);
	});
});

test('reduce_ltr without initialized value', function(){
	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4], i = 1;
	var result = source.reduce_ltr(function(curr, old, idx, array){
		equal(i++, idx);		
		return curr + old;
	});

	equal(result, 55);
});

test('reduce_ltr with initialized value', function(){
	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4], i = 0;
	var temp = 11;
	var result = source.reduce_ltr(function(curr, old, idx, array){
		equal(i++, idx);
		return curr + old;
	}, 11);

	equal(result, 66);
});

test('reduce_ltr to concat array with initialized value', function(){
	var source = [[2, 5], [6, 1], [7, 8]], i = 0;
	var result = source.reduce_ltr(function(curr, old, idx, array){
		equal(i++, idx);		
		return curr.concat(old);
	}, [0, 0]);

	match([0, 0, 2, 5, 6, 1, 7, 8], result);
});

test('reduce_rtl without initialized value', function(){
	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4], i = 8;
	var result = source.reduce_rtl(function(curr, old, idx, array){
		equal(i--, idx);
		
		return curr + old;
	});

	equal(result, 55);
});

test('reduce_rtl with initialized value', function(){
	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4], i = 9;
	var result = source.reduce_rtl(function(curr, old, idx, array){
		equal(i--, idx);
		
		return curr + old;
	}, 11);

	equal(result, 66);
});


test('except width numbers', function(){
	var source = [2, 2, 1, 10, 3, 9, 3];
	var source2 = [1, 10, 20, 4];
	var result = source.except(source2);

	equal(result.length, 3);
	match(result, [2, 3, 9]);
});

test('except width objects', function(){
	var source = [{ a : 1, b : 22 }, { a : 2, b : 77 }, { a : 2, b : 2 }, { a : 3, b : 5 }];
	var source2 = [{ a : 1, b : 11 }, { a : 2, b : 32 }, { a : 3, b : 30 }, { a : 4, b : 2 }];
	var result = source.except(source2, function(curr){ return curr.a == 1 || curr.a == 2; });

	equal(result.length, 1);
});

test('diff width numbers', function(){
	expect(5);

	var source = [2, 2, 1, 10, 3, 9, 4];
	var source2 = [1, 10, 20, 4];
	var result = source.diff(source2);

	equal(result.length, 4);
	result.each(function(val){
		equal(result.contains(val), true);
	});	
});

test('diff width objects', function(){
	expect(4);

	var source = [{ a : 1, b : 22 }, { a : 2, b : 77 }, { a : 2, b : 2 }, { a : 3, b : 5 }];
	var source2 = [{ a : 1, b : 11 }, { a : 2, b : 32 }, { a : 3, b : 30 }, { a : 4, b : 2 }];
	var result = source.diff(source2, function(curr, compare){ return curr.a == 1 || curr.a == 2; });

	equal(result.length, 3);
	result.each(function(val){
		equal(result.contains(val), true);
	});	
});

test('except width objects', function(){
	var source = [{ a : 1, b : 22 }, { a : 2, b : 77 }, { a : 2, b : 2 }, { a : 3, b : 5 }];
	var source2 = [{ a : 1, b : 11 }, { a : 2, b : 32 }, { a : 3, b : 30 }, { a : 4, b : 2 }];
	var result = source.except(source2, function(curr){ return curr.a == 1 || curr.a == 2; });

	equal(result.length, 1);
	result.each(function(val){
		equal(result.contains(val), true);
	});	
});

test('distinct with numbers', function(){
	expect(6);

	var source = [2, 2, 4, 4, 8, 9, 3, 9, 3];
	var result = source.distinct();
	equal(result.length, 5);
	match(result, [2,4,8,9,3]);
});

test('distinct with objects', function(){
	var source = [{ a : 1, b : 10 }, { a : 1, b : 20 }, { a : 2, b : 30 }, { a : 2, b : 40 }];
	var result = source.distinct(function(a, b){ return a.a == b.a; });
	equal(result.length, 2);
});

test('union', function(){
	expect(5);

	var source = [2, 2, 4, 4, 8], source2 = [9, 3, 9, 3];
	var result = source.union(source2);

	match(result, [2, 4, 8, 9, 3]);
});


test('union with objects', function(){
	var source = [{ a : 1, b : 10 }, { a : 1, b : 20 }, { a : 2, b : 30 }, { a : 1, b : 40 }];
	var source2 = [{ a : 1, b : 10 }, { a : 4, b : 20 }, { a : 2, b : 0 }];
	var result = source.union(source2, function(a, b){ return a.a == b.a; });

	equal(result.length, 3);
});

test('intersect width number', function(){
	var source = [1, 2, 3], source2 = [1, 2, 1, 3];
	var result = source.intersect(source2);

	match(result, [1,2,3]);
});

test('intersect with objects', function(){
	var source = [{ a : 1, b : 10 }, { a : 1, b : 10 }, { a : 2, b : 30 }, { a : 1, b : 40 }];
	var source2 = [{ a : 1, b : 10 }, { a : 4, b : 20 }, { a : 2, b : 0 }, ];
	var result = source.intersect(source2, function(curr, compare){ return curr.a == 1 && curr.b == 10 });

	equal(result.length, 1);
	equal(result[0].a, 1);
	equal(result[0].b, 10);
});

test('comprehensive : index of book', function(){
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

	equal(result.length, 18, 'all index number is 18.');

	ok(result[0]['A'], 'first one is start with "A".');
	equal(result[0]['A'].length, 6);

	ok(result[result.length - 1]['V'], 'last one is start with "V".');
	equal(result[result.length - 1]['V'].length, 2);
});



