Vue.component('pagination', {
	// declare props
	//props: ['totalCount', 'numPerPage', 'p', 'clickCb'], // use [total-count], [num-per-page] in HTML
	props: {
		totalCount: { type: Number, required: true, 'default': 0 },
		numPerPage: { type: Number, 'default': 30 },
	    p: { type: Number, required: true, 'default': 1 },
	    clickCb: { type: Function },
    },
	template: (
		'<nav>' +
			'<ul class="pagination justify-content-end">' +
				'<li v-if="(pageStart-1) > 0" class="page-item" @click.prevent="clickPrevSection">' +
					'<a class="page-link" href="#" tabindex="-1">Prev</a>' +
				'</li>' +
				'<template v-for="dispP in pageRange">' + 
					'<li :class="{ \'page-item\': true, \'active\': (dispP == active_page) }" @click.prevent="clickPageItem(dispP)"><a class="page-link" href="javascript:void(0)">{{ dispP }}</a></li>' +
				'</template>' +
				
				'<li v-if="pageEnd < totalPages" class="page-item" @click.prevent="clickNextSection">' +
					'<a class="page-link" href="#" >Next</a>' +
				'</li>' +
			'</ul>' +
		'</nav>'
	),
	data: function() {
		return {
			total_count: this.totalCount,
			active_page: this.p
		};
	},
	computed: {
		totalPages: function() {
			var totalCount = this.total_count;
			var numPerPage = this.numPerPage;
			var totalPages = parseInt( (totalCount % numPerPage == 0) ? totalCount/numPerPage : totalCount/numPerPage + 1 );
			console.log("totalPages=" + totalPages);
			return totalPages;
		},
		pageStart: function() {   
			var pageStart = this.getPaginationStart(this.active_page);
			return pageStart;
		},
		pageEnd: function() {   
			var totalPages = this.totalPages;
			var pageStart = this.getPaginationStart(this.active_page);
			var len = (pageStart+9 <= totalPages) ? 10 : (totalPages-pageStart+1); // len of <<1-2-3-4-5-6>> is 6
			var pageEnd = pageStart + len - 1;
			return pageEnd;
		},
		pageRange: function() {
			var start = this.pageStart;
			var end = this.pageEnd;
			
			var range = [];
			for(var i=start; i<=end; ++i) {
				range.push(i);
			}
			//console.log("page range = " + range);
			return range;
		},
	},
	methods: {	
		// ----- public methods -----
		setData: function(params) {
			params = params || {};
			if(params.totalCount !== 'undefined') {				
				this.total_count = params.totalCount;
			}
			if(params.p !== 'undefined') {				
				this.active_page = params.p;
			}
		},
		render: function() {
			this.$forceUpdate();
		},
		
		
		// ----- private methods -----
		getPaginationStart: function(pageNum) {
			// ex: page 25 = 20 + 5, starts from 21~30, return 21
			// ex: page 20 = 20 + 0, starts from 11~20, return 11
			if(pageNum > 0) {
				var val = Math.floor(pageNum/10);
				if(pageNum % 10 == 0)
					val -= 1;
				return (val*10 + 1);
			}
			return 1;
		},
		clickPageItem: function(newPageNum) {
			this.active_page = newPageNum;
			this.$forceUpdate();
			
			if(this.clickCb) {				
				this.clickCb(newPageNum);
			}
		},
		clickPrevSection: function() {
			var newPageNum = this.pageStart - 10;
			if(newPageNum <= 0) {
				newPageNum = 1;
			} 
			
			this.active_page = newPageNum;
			this.$forceUpdate();
			
			if(this.clickCb) {				
				this.clickCb(newPageNum);
			}
		},
		clickNextSection: function() {
			var newPageNum = this.pageStart + 10;
			if(newPageNum > this.totalPages) {
				newPageNum = this.totalPages;
			} 
			
			this.active_page = newPageNum;
			this.$forceUpdate();
			
			if(this.clickCb) {				
				this.clickCb(newPageNum);
			}
		},
	}
});