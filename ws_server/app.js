//websocket服务器文件
var ws = require("nodejs-websocket")

//创建连接通道数组
let connList = []

// Scream server example: "hi" -> "HI!!!"
//创建websocket服务器，conn->连接通道
var server = ws.createServer(function (conn) {
  //将连接通道放到数组中保存
  connList.push(conn);
  //连接成功，conn与客户的连接通道
  console.log("Websocket连接成功...", "客户端数量：", connList.length)
  //接收客户端发送的数据
  conn.on("text", function (str) {
    console.log("收到的客户端数据： " + str)
    //将数据发送给当前连接的客户端
    //遍历连接数组并发送数据
    for (let i = 0; i < connList.length; i++) {
      connList[i].sendText(str)
    }
    // conn.sendText("Hello Websocket Client!")
  })
  //关闭连接
  conn.on("close", function (code, reason) {
    console.log("Connection closed")
    //将当前连接通道从数组中移除
    connList.splice(connList.indexOf(conn), 1)
    console.log("当前连接数量：", connList.length)
  })

  //异常事件触发
  conn.on("error", function (code, reason) {
    console.log('异常事件：', reason)
  })
}).listen(8001, function () {
  console.log('websocket server is listening on port 8001')
})