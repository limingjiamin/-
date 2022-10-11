## 1.订单列表 (偷懒做法：order_list与consumer表全部取出来)

### 请求URL：

```
/order_list
```

### 请求方式：

```
GET
```

### 参数类型: 请求体

```
|参数		|是否必选 |类型     |说明
无
```

### 返回示例：

```javascript
* 成功
	{
		"code": 0,
		"data": [
        {
            "id" : 1 ,
            "order_num" : "20222380951031",
            "commite_time" : "2022-08-27 08:11:16",
            "price" : 231.75,
            "way" : "未支付",
            "source" : "APP订单",
            "type" : "秒杀订单",
            "status" : "已关闭",
            "consumer_id" : 8,
            "goods_id" : 4,
            "account" : "GVideU",
			"phone" : "15178811301",
             "postal_code" : "901957",
             "address" : "中山天河区大信商圈大信南路570号44号楼",
             "name" : "龚云熙",
             "delivery" : "暂无",
            "logistics" : "暂无",
        }, {},{}.....
    ]
	}
* 失败
	{
		"code": 1, 
		"msg": "请求失败"
	}
```


## 2.订单搜索

### 请求URL：

```
/order_list_search
```

### 请求方式：

```
POST
```

### 参数类型: 请求体

```
|参数			|是否必选 	|类型     	|说明
|order_num     |N      	  |string   	|订单编号
|status        |N         |string   	|订单状态
|type		   |N		|string		  |订单类型
|commite_time   |N		 |datatime		|提交时间
|source			|N		|string			|订单来源
|account		|N		|string			|用户账号名
```

### 返回示例：

```javascript
* 成功
  {
    "code": 0,
    "data": [
        {
            "id" : 1 ,
            "order_num" : "20222380951031",
            "commite_time" : "2022-08-27 08:11:16",
            "price" : 231.75,
            "way" : "未支付",
            "source" : "APP订单",
            "type" : "秒杀订单",
            "status" : "已关闭",
            "consumer_id" : 8,
            "goods_id" : 4,
            "account" : "GVideU",
        },{},{}{}......
    ]
  }
* 失败
  {
    "code": 1,
    "msg": "未找到符合条件的数据"
  }
```

## 3.查看订单(order_list与consumer链表查询)

### 请求URL：

```
/order_view
```

### 请求方式：

```
GET
```

### 参数类型: query

|参数		|是否必选 |类型     |说明
|id       |Y       |int   	 |订单列表的id



### 返回示例：

```javascript
* 成功:
	{
		"code": 0,
		"data": [
        {
        	//基本信息
            "id" : 1 ,  //订单id
            "order_num" : "20222380951031",
            "account" : "GVideU",
            "way" : "未支付",
            "source" : "APP订单",
            "type" : "秒杀订单",
            "delivery" : "暂无",
            "logistics" : "暂无",
            "growth_value" : 185,
            "currency": 305,
            
            //收货人信息
            "phone" : "15178811301",
            "postal_code" : "901957",
            "address" : "中山天河区大信商圈大信南路570号44号楼",
            "name" : "龚云熙",

            //商品信息

        }]
	}
* 失败:
	{
		"code": 1, 
		"msg": "数据获取失败"
	}
```

## 4.删除订单

### 请求URL：

```
/order_delete
```

### 请求方式

```
get
```

### 参数类型: 请求体

```
|参数		|是否必选 |类型     |说明
|id       |Y       |int   	 |订单列表的id
```

### 返回示例：

```javascript
* 登陆成功
  {
    "code": 0,
    "msg": "删除成功"
  }
* 登陆失败
  {
    "code": 1,
    "msg": "删除失败"
  }
```
## 5.确认订单发货（修改order_list表）

### 请求URL：

```
/deliver_goods_edit
```

### 请求方式：

```
post
```

### 参数类型: query

```
|参数			|是否必选 	|类型     |说明
|id				|Y		|Number		|商品订单id
|delivery    	|Y       |string   |配送方式
|logistics		|Y		|string		|物流单号
```

### 返回示例：

```javascript
* 成功:
	{
		"code": 0,
		"msg": "操作成功"
	}
* 失败:
	{
		"code": 1, 
		"msg": "操作失败"
	}
```

## 6.订单设置

### 请求URL：

```
 /order_setting
```

### 请求方式：

```
POST
```

### 参数类型: query

```
|参数				|是否必选 |类型     	|说明
|seckill_order		|Y		|number		|秒杀商品未付款订单超时的时间
|normal_order		|Y		|number		|正常商品未付款自动关闭订单时间
|delivery_time		|Y		|number		|未发货超时的时间
|close_transaction	|Y		|number		|自动结束交易超时的时间
|praise				|Y		|number		|自动五星好评时间

```

### 返回示例：

```javascript
* 成功:
	{
		"code": 0,
		"msg": "设置成功"
	}
* 失败:
	{
		"code": 1, 
		"msg": "设置失败"
	}
```
## 7.退货申请处理表单

### 请求URL：

```
/return_application
```

### 请求方式：

```
get
```

### 参数类型: query

```
|参数	|是否必选 |类型     |说明
无
```

### 返回示例：

```javascript
* 成功
	{
		"code": 0,
		"data": [
        {
            "id" : 1 ,
            "application_time" : "2022-08-17 17:37:50",
            "processing_time" : "2022-09-09 00:25:26",
            "status" : "已完成",
            "consumer_id" : 6,
            "account" : "GVideU"
            "order_id" : 2,
            "price" : 231.75,
        },{},{}.....
    ]
	}
* 失败
	{
		"code": 1, 
		"msg": "请求失败"
	}
```

## 8.退货申请详情

## （偷懒就取对应id的return_application与consumer与order_list及商品表所有信息）

### 请求URL：

```
/return_application_details
```

### 请求方式：

```
get
```

### 参数类型: query

```
|参数	 |是否必选   |类型       |说明
|id		|Y		|Number		|退货申请 id
```

### 返回示例：

```javascript
* 成功:
	{
		"code": 0,
		"data": {
		 	//商品信息
		 	
		 	//订单服务信息
		 	"id" : 1 ,
            "order_num" : "20222380951031",
            "commite_time" : "2022-08-27 08:11:16",
            "price" : 231.75,
            "way" : "未支付",
            "source" : "APP订单",
            "type" : "秒杀订单",
            "status" : "已关闭",
            "consumer_id" : 8,
            "goods_id" : 4,
            "account" : "GVideU",
			"phone" : "15178811301",
             "postal_code" : "901957",
             "address" : "中山天河区大信商圈大信南路570号44号楼",
             "name" : "龚云熙",
		}
	}
* 失败:
	{
		"code": 1, 
		"msg": "请求失败"
	}             
```

## 9.搜索退货申请

### 请求URL：

```
/return_application_search
```

### 请求方式：

```
post
```

### 参数类型: query

```
|参数					|是否必选 	|类型     	|说明
|id     				|N      |Number   		|退货申请id(服务单号)
|application_time        |N        |datetime   		|申请时间
|processing_time		|N		|datetime		  |处理时间
|status   				|N		 |string		|申请状态
```

### 返回示例：

```javascript
* 成功
	{
		"code": 0,
		"data": [
        {
            "id" : 1 ,
            "application_time" : "2022-08-17 17:37:50",
            "processing_time" : "2022-09-09 00:25:26",
            "status" : "已完成",
            "consumer_id" : 6,
            "account" : "GVideU"
            "order_id" : 2,
            "price" : 231.75,
        },{},{}.....
    ]
	}
* 失败
	{
		"code": 1, 
		"msg": "请求失败"
	}
```

## 10.退货原因设置(表)

### 请求URL：

```
/return_reason
```

### 请求方式：

```
get
```

### 参数类型: query

```
|参数	|是否必选 |类型     |说明
无
```

### 返回示例：

```javascript
* 成功
	{
		"code": 0,
		"data": [
        	{
                "id" : 1 ,
                "reason" : "质量问题",
                "add_time" : "2022-08-21 04:48:19",
                "status" : 0,
                "sort" : 1,
       		 },{},{}.....
    	]
	}
* 失败
	{
		"code": 1, 
		"msg": "请求失败"
	}
```
## 11.退货原因编辑

### 请求URL：

```
/return_reason_edit
```

### 请求方式：

```
post
```

### 参数类型: query

```
|参数	  	  |是否必选  |类型     |说明
|reason 	|Y		|string		|原因类型
|sort		|Y		|number		|排序
|status		|Y		|emun		|状态
```

### 返回示例：

```javascript
* 成功:
	{
		"code": 0,
		"msg": "修改成功"
	}
* 失败:
	{
		"code": 1, 
		"msg": "修改失败"
	}
```

## 12.退货原因删除

### 请求URL：

```
/return_reason_delete
```

### 请求方式：

```
get
```

### 参数类型: query

```
|参数	  	  |是否必选  |类型     |说明
|id 		|Y		|Number		|退货原因id
```

### 返回示例：

```javascript
* 成功:
	{
		"code": 0,
		"msg": "删除成功"
	}
* 失败:
	{
		"code": 1, 
		"msg": "删除失败"
	}
```

## 

## 13.添加退货原因

### 请求URL：

```
/return_reason_add
```

### 请求方式：

```
post
```

### 参数类型: query

```
|参数	  	  |是否必选  |类型     |说明
|reason 	|Y		|string		|原因类型
|sort		|Y		|number		|排序
|status		|Y		|emun		|状态
```

### 返回示例：

```javascript
* 成功:
	{
		"code": 0,
		"msg": "修改成功"
	}
* 失败:
	{
		"code": 1, 
		"msg": "修改失败"
	}
```

## 