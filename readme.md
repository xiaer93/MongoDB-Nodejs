node最牛逼的特性：事件驱动和异步事件支持起大并发请求

json的特性：

json是纯文本，所有字符串必须双引号括起
CRUD操作：create/read/update/delete

use database db.dropDatabase

db.collection.drop() db.collection.insert() db.collection.find() db.collection.update() db.collection.remove()

$set $unset $lt $gt $regex

express重要的是中间件模块

mongoose是一个很有用的mongodb连接工具，提供schemas/数据验证/方法/虚拟属性等功能

rest是一种很好的http进行CRUD的方式
• GET: This retrieves data
• POST: This submits data for a new record
• PUT: This submits data to update an existing record
• PATCH: This submits a date to update only specific parts of an existing record
• DELETE: This deletes a specific record

http几种方式的区别？

阅读至，77页


<div>
    {{> stats this}}
</div>
<div>
    {{> popular this}}
</div>
<div>
    {{> comments this}}
</div>