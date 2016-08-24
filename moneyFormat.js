_mFormat:function(number, formatFixed, point){
			if(formatFixed === undefined) {
				formatFixed = 2;
			}
			if(point === undefined){
				point = 2;
			}
			var money = String(number);
			money = money.replace(/,/g,'');
			if(money.indexOf('.') == -1){
				money +='.0';
			}
			money = Number(money);
			money.toFixed(point);
			console.log(money)
			money = String(money);
			// 格式化方法
			function _splitByGroup(str) {
				var len = str.length,
					array = [],
					start = 0,
					end = len % 3,
					step = Math.ceil(len / 3);

				for(var i = 0; i <= step; i++) {
					var subStr = str.substring(start, end);
					if(subStr != '')
						array.push(subStr);
					start = end;
					end = start + 3;
				}
				return array.join(',') || "0";
			}
			var number = money;
			number = String(number) || "";
			var clearRegExp = /\D*/ig,
				empty = '';
			var minus = /\-/.test(number) ? -1 : 1;
			var numbers = number.split('.'),
				number0 = numbers[0].replace(clearRegExp, empty),
				number1 = (numbers[1] || "").replace(clearRegExp, empty);

			number0 = _splitByGroup(number0);
			number1 = (Number(number1) * Math.pow(0.1, number1.length)).toFixed(formatFixed) * Math.pow(10, formatFixed);
			number1 = parseInt(number1);

			if(number1 == 0) {
				number1 = new Array(formatFixed + 1).join("0");
			}

			if(formatFixed == 0) {
				number = number0;
			} else {
				number = number0 + "." + number1;
			}
			return number;
		}