(function($) {
	window.lyb = window.lyb || {_index: this._index || 1};
	lyb.Remind = function(id) {
		if (id)
			this.el = $(id);
		else {
			this.el = $('<div id="' + this.getUUID()
					+ '" class="lyb-remind"></div>');
			this.el.appendTo(document.body);
		}
		this.init();
		this.delegateEvents();
	};
	lyb.Remind.prototype = {
		init : function() {
			this.headEl = $('<div class="remind-title">提醒</div>');
			this.bodyEl = $('<div class="content"></div>');
			this.closeEl = $('<span class="remind-close"><a class="close-ico" href="javascript:;"></a></span>');
			this.el.append(this.headEl);
			this.el.append(this.bodyEl);
			this.el.append(this.closeEl);
		},
		delegateEvents: function(){
			var self = this;
			this.el.delegate('.close-ico', 'click', function(e){
				self._closeClick.call(self, e);
			});
		},
		_closeClick: function(e){
			var self = this; 
			this.el.animate({
				bottom : -200,
				right : 30
			}, 200, function(){
				self.el.undelegate();
				self.el.remove();
			});
		},
		getUUID : function() {
			return 'notify-' + lyb._index++;
		},
		load : function(url, data) {
			if($.type(url) == 'string')
				$.ajax({
					url : url,
					type : 'post',
					dataType : 'json',
					data: data || {},
					context : this,
					success : this._success
				});
			else
				this._success({data: url});	
		},
		_show : function(id) {
			this.el.animate({
				bottom : 0,
				right : 30
			}, 500)
		},
		close: function(){
			this.el.undelegate();
			this.el.remove();
		},
		_success : function(result) {
			// result = {msg: '接收成功', success: true, data: [me,you,he]};
			// TODO 处理数据
			this.data = result.data || [];
			this._render();
			this._show();
		},
		_render : function() {
			var html = '';
			for (var i = 0; i < this.data.length; i++) {
				var row = this.data[i];
				html += this.render && this.render(row, i) || '';
			}
			this.bodyEl.html(html);
		}
	}
})(jQuery);