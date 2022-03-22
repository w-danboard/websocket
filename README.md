### HTTP的架构模式

> Http是客户端/服务器模式中请求-响应所用的协议，在这种模式中，客户端(一般是web浏览器)向服务器提交HTTP请求，服务器响应请求的资源

`HTTP的特点`

- HTTP是半双工协议，也就是说，在同一时刻数据只能单向流动，客户端向服务器发送请求(单向的)，然后服务器响应请求(单向的)。

### 双向通信

> Comet是一种用于web的推送技术，能使服务器实时地将更新的信息传送到客户端，而无需客户端发出请求，目前有三种实现方式：轮询(polling)/长轮询(long-polling)/iframe流(streaming)。

`轮询`

- 轮询是客户端和服务器之间会一直进行连接，每隔一段时间就询问一次。
- 这种方式连接数会很多，一个接收，一个发送。而且每次发送请求都会有Http的Header，会很耗流量，也会消耗CPU的利用率。

### iframe流

> 通过在HTML页面里嵌入一个隐藏的iframe，然后将这个iframe的src属性设为对一个长连接的请求，服务器端就能源源不断地往客户端推送数据。

### EventSource流 （不能跨域）

- HTML5规范中提供了服务端事件EventSource，浏览器实现了该规范的前提下，创建了一个EventSource连接后，便可收到服务端的发送消息，这些消息需要遵循一定的格式，对于前端开发人员而言，只需要在浏览器中侦听对应的事件即可。

- SSE的简单模型是：一个客户端去从服务器端订阅一条`流`，之后服务端可以发送消息给客户端，直到服务端或者客户端关闭该`流`，所以eventsource也叫做'serve-sent-event'

- EventSource流的实现方式对客户端开发人员而言非常简单，兼容性好

- 对于服务端，它可以兼容老的浏览器，无需upgrade为其他协议，在简单的服务端推送的场景下可以满足需求

> 浏览器端

- 浏览器端，需要创建一个`EventSource`对象，并且传入一个服务端的接口URI作为参数
- 默认`EventSource`对象通过侦听`message`事件获取服务端传来的消息
- `open`事件则在http连接建立后触发
- `error`事件会在通信错误(连接中断、服务端返回数据失败)的情况下触发
- 同时`EventSource`规范允许服务端指定自定义事件，客户端侦听该事件即可

> 服务端

- 事件流的对应MIME格式为`text/event-stream`，而且其基于HTTP长连接，针对HTTP1.1规范默认采用长连接，针对HTTP1.0的服务器需要特殊设置。
- `event-source`必须编码成`utf-8`的格式，消息的每个字段使用`\n`来做分割，并且需要下面4个规范定义好的字段
  - Event：事件类型
  - Data：发送的数据
  - ID：每一条事件流的ID
  - Retry：告知浏览器在所有的连接丢失之后重新开启新的连接等待的时间，在自动重新连接的过程中，之前收到的最后一个时间流ID会被发送到服务端

  ### websocket （可以跨域）

  - `WebSockets_API`规范定义了一个API用以在网页浏览器和服务端建立一个socket连接。通俗地讲：在客户端和服务器保有一个持久的连接，两边可以在任意时间开始发送数据。
  - HTML5开始提供的一种浏览器与服务器进行全双通讯的网络技术。
  - 属于应用层协议，它基于TCP传输协议，并复用HTTP的握手通信。

  `websocket优势`

  - 支持双向通信，实时性更强。
  - 更好的二进制支持
  - 较少的控制开销。连接创建后，ws客户端、服务端进行数据交换时，协议控制的数据包头部较小。