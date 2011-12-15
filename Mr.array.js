(function(){

	/*
		select
		where
		orderBy
		orderByDescending
		groupBy
		distinct
		union
		intersect
		except
		reverse
		any
		take
		skip
	*/
	var ext = {
		select : function(predicate){
			__assert_function(predicate);

			var result = [];
			this.each(function(val, idx){
				result.push(predicate(val));
			});

			return result;
		},
		where : function(predicate){
			__assert_function(predicate);

			var result = [];
			this.each(function(val, idx){
				var ret = predicate(val);
				if(ret === true){
					result.push(val);
				}
			});
			return result;
		},
		orderBy : function(predicate){
			__assert_function(predicate);
			return this.sort(predicate);
		},
		groupBy : function(){
			
		},
		distinct : function(){
			
		},
		union : function(arr){
			__assert_array(arr);

			return this.concat(arr).distinct();
		},
		intersect : function(arr){
			__assert_array(arr);

			return this;
		},
		except : function(predicate){
			__assert_function(predicate);


		},
		reverse : function(){
			
		},
		any : function(predicate){
			__assert_function(predicate);

		},
		take : function(length){
			__assert_number(length);

		},
		skip : function(length){
			__assert_number(length);

		},
		each : function(callback){
			if(callback.isFunction()){
				for(var i = 0, len = this.length ; i < len ; i++ ){
					callback(this[i], i);
				}
			}
		}
	};

	function __assert_array(arr){
		if(!arr.isArray()){
			throw 'argument is not array.';
		}
	}

	function __assert_function(func){
		if(!func.isFunction()){
			throw 'argument is not array.';
		}
	}

	function __assert_number(num){
		if(!num.isNumber()){
			throw 'argument is not array.';
		}
	}

	function __extend(obj, extend){
		// static methods
		for(var key in extend){
			if(extend.hasOwnProperty(key)){
				obj[key] = extend[key];
			}
		}
	}

	__extend(Object.prototype, {
		isArray : function(){
			return {}.toString.call(this) === '[object Array]';
		},
		isFunction : function(){
			return {}.toString.call(this) === '[object Function]';
		},
		isNumber : function(){
			return {}.toString.call(this) === '[object Number]';
		}
	});

	__extend(Array.prototype, ext);
})();