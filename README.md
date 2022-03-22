### HTTP的架构模式

> Http是客户端/服务器模式中请求-响应所用的协议，在这种模式中，客户端(一般是web浏览器)向服务器提交HTTP请求，服务器响应请求的资源

`HTTP的特点`

- HTTP是半双工协议，也就是说，在同一时刻数据只能单向流动，客户端向服务器发送请求(单向的)，然后服务器响应请求(单向的)。

### 双向通信

> Comet是一种用于web的推送技术，能使服务器实时地将更新的信息传送到客户端，而无需客户端发出请求，目前有三种实现方式：轮询(polling)/长轮询(long-polling)/iframe流(streaming)。

`轮询`

- 轮询是客户端和服务器之间会一直进行连接，每隔一段时间就询问一次。
- 这种方式连接数会很多，一个接收，一个发送。而且每次发送请求都会有Http的Header，会很耗流量，也会消耗CPU的利用率。