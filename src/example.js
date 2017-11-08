function loadList(p) {	
	
	var totalCount = 3000;
	vList.p = p;
	vList.drawPagination(totalCount, p);
}

var vList = new Vue({
	el: '#listWrapper',
	data: {
		p: 1
	},
	methods: {
		onClickPageItem: function(newPageNum) {
			console.log("[vList#onClickPageItem] clicked page = " + newPageNum);
			loadList(newPageNum);
		},
		drawPagination: function(totalCount, p) {
			var children = this.$root.$children;
			children.forEach(function(child) {
				if(child.$options.name == "pagination") {
					// update pagination
					child.setData({ totalCount: totalCount, p: p });
					child.render();
					return false;
				}
			});
		}
	}
});

loadList(1);
