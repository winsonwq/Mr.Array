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

test('where', function(){
	var source = [{ id : 1, month : 11 }, { id : 2, month : 12 }, { id : 3, month : 13  }];
	var idResult = source.where(function(o){ return o.id > 2; });

	equal(idResult.length, 1);
	equal(idResult[0].id, 3);
});

test('orderBy', function(){
	var source = [2, 5, 6, 1, 7, 8, 9, 3, 10, 4];
	var result = source.orderBy(function(a,b){ return a > b });

	match(result, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('groupBy', function(){
	var source = [{ name : 'Attach'}, { name : 'Charactor'}, { name : 'Bee'}, { name : 'Cycle'}, { name : 'Add'}];
	var result = 
		source
			.orderBy(function(a, b){ return a.name.charCodeAt(0) > b.name.charCodeAt(0); })
			.groupBy(function(obj){ return obj.name[0]; });

	console.log(result);
	equal(result.length, 3);
	equal(result[0].length, 2);
	equal(result[1].length, 1);
	equal(result[2].length, 2);

	match(result[0].select(function(obj){ return obj.name; }), ['Attach', 'Add']);
	match(result[1].select(function(obj){ return obj.name; }), ['Bee']);
	match(result[2].select(function(obj){ return obj.name; }), ['Charactor', 'Cycle']);
});





