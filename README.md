## Vue-Pagination

### Usage

* 1. Include component:
```js
<script type="text/javascript" src="pagination.vue"></script>
```

* 2. Use component with required props: totalCount, p, numPerPage, clickCb
```html
<div>
	<pagination :total-count="0" :p="1" :num-per-page="30" :click-cb="onClickPageItem"></pagination>
</div>
```

* 3. Update pagination
```js
.setData({ totalCount: totalCount, p: p });
.render();
```


### Props

| Name          | Type     | Default | Required | Description
| :------------ | :--------| :-------| :--------| :-----------
| totalCount    | Number   | 0       | true     | total count of your data
| p             | Number   | 1       | true     | active page
| numPerPage    | Number   | 30      |          | the number per page
| clickCb       | Function |         |          | clicked callback


### API

```
* .setData(params={})
```
Set data of the pagination with json params:
{
	totalCount: totalCount,
	p: p
}

```
* .render()
```
Render the pagination.