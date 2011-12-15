(function(){

	/*
		select
		where
		orderBy
		groupBy
		except
		any
		all
		take
		skip
		reduce_rtl
		reduce_ltr
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
				if(predicate(val) === true){
					result.push(val);
				}
			});
			return result;
		},
		orderBy : function(predicate){
			__assert_function(predicate);
			return this.sort(predicate);
		},
		groupBy : function(predicate){
			__assert_function(predicate);

			var map = {};
			var result = [];

			this.each(function(val, idx){
				var key = predicate(val);
				if(map[key] == null){
					map[key] = [];
				}
				map[key].push(val);
			});

			for(var key in map){
				if(map[key].isArray())
					result.push(map[key]);
			}

			return result;
		},
		except : function(predicate){
			__assert_function(predicate);

			var result = [];
			this.each(function(val, idx){
				if(predicate(val) === false){
					result.push(val);
				}
			});
		},
		any : function(predicate){
			__assert_function(predicate);
			var ret = false;
			this.each(function(val, idx){
				if(predicate(val) === true){
					ret = true;
					return 'BREAK';
				}
			});
			return ret;
		},
		all : function(predicate){
			return this.any(predicate);
		},
		take : function(length){
			__assert_number(length);
			return this.slice(0, length);
		},
		skip : function(length){
			__assert_number(length);
			var idx = length - 1;
			return this.slice(idx < 0 ? 0 : idx);
		},
		each : function(callback){
			if(callback.isFunction()){
				for(var i = 0, len = this.length ; i < len ; i++ ){
					var ret = callback.call(this, this[i], i);
					if(ret == 'CONTINUE')
						continue;
					else if(ret == 'BREAK')
						break;
				}
			}
		},
		reduce_ltr : function(callback, initValue){
			__assert_function(callback);

			var temp = initValue, len = this.length, i;
			if(len == 0){
				throw 'Array length is 0 and no second argument.';
			}

			if(temp == null){
				temp = this[0];
				i = 1;
			}

			for(i = i || 0 ; i < len ; i++){
				callback.call(this, temp, this[i], i, this);
			}
			
			return temp;
		},
		reduce_rtl : function(callback, initValue){
			__assert_function(callback);

			var temp = initValue, len = this.length, i;
			if(len == 0){
				throw 'Array length is 0 and no second argument.';
			}

			if(temp == null){
				temp = this[len - 1];
				i = len - 2;
			}

			for(i = i || len - 1 ; i > 0 ; i--){
				callback.call(this, temp, this[i], this);
			}

			return temp;
		}
	};


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
})();