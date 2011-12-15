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





