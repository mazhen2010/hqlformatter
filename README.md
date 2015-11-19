## HiveQL格式化工具

- 用于格式化HiveQL的查询语句的小工具，功能有限，[点此下载](https://raw.githubusercontent.com/wiki/yangziwen/hqlformatter/resources/release/hqlformatter.zip)。
- 工程中的后端代码仅用于验证思路，将前端文件打包或直接拷贝出来即可使用。
- 目前仅支持如下关键字  
`select`，`from`，`where`，`group by`，`join`，`inner join`，`left join`，`left outer join`，`full outer join`，`semi join`，`on`，`union all`  
`select`和`where`中不支持子查询，`from`和各种`join`支持嵌套各种子查询
- 格式化效果如下