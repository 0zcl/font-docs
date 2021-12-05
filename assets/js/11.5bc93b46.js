(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{495:function(t,s,a){t.exports=a.p+"assets/img/1.bf33175c.png"},496:function(t,s,a){t.exports=a.p+"assets/img/2.813be928.png"},497:function(t,s,a){t.exports=a.p+"assets/img/3.c8a553e0.png"},498:function(t,s,a){t.exports=a.p+"assets/img/4.71aa5461.png"},499:function(t,s,a){t.exports=a.p+"assets/img/5.8a3c3ffd.png"},500:function(t,s,a){t.exports=a.p+"assets/img/6.c39eb52b.png"},501:function(t,s,a){t.exports=a.p+"assets/img/7.c5b10e8f.png"},502:function(t,s,a){t.exports=a.p+"assets/img/8.87eaf496.png"},729:function(t,s,a){"use strict";a.r(s);var v=a(35),i=Object(v.a)({},(function(){var t=this,s=t.$createElement,v=t._self._c||s;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h2",{attrs:{id:"http1-0"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#http1-0"}},[t._v("#")]),t._v(" http1.0")]),t._v(" "),v("p",[v("code",[t._v("HTTP1.0")]),t._v(" 特性\n无状态。HTTP1.0规定浏览器和服务器保持短暂的连接，浏览器的每次请求都需要与服务器建立一个TCP连接，服务器处理完成后立即断开TCP连接")]),t._v(" "),v("ol",[v("li",[t._v("支持多种类型的文件下载")]),t._v(" "),v("li",[t._v("状态码")]),t._v(" "),v("li",[t._v("Cache机制")])]),t._v(" "),v("h2",{attrs:{id:"http1-1"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#http1-1"}},[t._v("#")]),t._v(" http1.1")]),t._v(" "),v("ol",[v("li",[t._v("持久连接: 一个TCP连接可以传输多个HTTP请求，只要浏览器或者服务器没有明确断开连接，那么TCP连接会一直保持")])]),t._v(" "),v("div",{staticStyle:{display:"flex"}},[v("div",[v("p",[t._v("HTTP1.0")]),t._v(" "),v("img",{staticStyle:{display:"block"},attrs:{src:a(495)}})]),t._v(" "),v("div",[v("p",[t._v("HTTP1.1")]),t._v(" "),v("img",{staticStyle:{display:"block"},attrs:{src:a(496)}})])]),t._v(" "),v("div",{staticClass:"custom-block tip"},[v("p",{staticClass:"custom-block-title"},[t._v("Tips")]),t._v(" "),v("p",[t._v("如果你不想要采用持久连接，可以在 HTTP 请求头中加上"),v("code",[t._v("Connection: close")]),t._v("。\n目前浏览器中对于"),v("strong",[t._v("同一个域名，默认允许同时建立 6 个 TCP 持久连接")])])]),t._v(" "),v("ol",{attrs:{start:"2"}},[v("li",[t._v("Host 字段，表示当前的域名地址")]),t._v(" "),v("li",[t._v("Cookie 字段")])]),t._v(" "),v("h2",{attrs:{id:"http1-1存在问题"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#http1-1存在问题"}},[t._v("#")]),t._v(" http1.1存在问题")]),t._v(" "),v("p",[t._v("对带宽的利用率却并不理想")]),t._v(" "),v("ol",[v("li",[t._v("TCP慢启动。")])]),t._v(" "),v("div",{staticClass:"custom-block tip"},[v("p",{staticClass:"custom-block-title"},[t._v("Tips")]),t._v(" "),v("p",[t._v("一旦一个 TCP 连接建立之后，就进入了发送数据状态，刚开始 TCP 协议会采用一个非常慢的速度去发送数据，然后慢慢加快发送数据的速度，直到发送数据的速度达到一个理想状态，我们把这个过程称为慢启动.\n慢启动是 TCP 为了减少网络拥塞的一种策略")])]),t._v(" "),v("ol",{attrs:{start:"2"}},[v("li",[t._v("同时开启的多条TCP连接会竞争带宽")]),t._v(" "),v("li",[t._v("HTTP/1.1队头阻塞问题. 持久连接能公用一个TCP管道，但一个管道同一时刻只能处理一个请求。如果有一个请求阻塞5s，那么后续的请求都要延迟等待5s!")])]),t._v(" "),v("h2",{attrs:{id:"http2-0"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#http2-0"}},[t._v("#")]),t._v(" http2.0")]),t._v(" "),v("ol",[v("li",[t._v("多路复用。解决HTTP1.1队头阻塞问题。")]),t._v(" "),v("li",[t._v("可以设置请求的优先级")]),t._v(" "),v("li",[t._v("头部压缩。压缩请求头的数据\n"),v("img",{attrs:{src:a(497),alt:"multipy"}})])]),t._v(" "),v("h2",{attrs:{id:"http2-0存在的问题"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#http2-0存在的问题"}},[t._v("#")]),t._v(" http2.0存在的问题")]),t._v(" "),v("p",[v("img",{attrs:{src:a(498),alt:"multipy"}}),t._v(" "),v("img",{attrs:{src:a(499),alt:"multipy"}})]),t._v(" "),v("p",[t._v("HTTP/2 多路复用\n"),v("img",{attrs:{src:a(500),alt:"multipy"}})]),t._v(" "),v("p",[t._v("在 HTTP/2 中，多个请求是跑在一个 TCP 管道中的，如果其中任意一路数据流中出现了丢包的情况，那么就会阻塞该 TCP 连接中的所有请求。这不同于 HTTP/1.1，使用 HTTP/1.1 时，浏览器为每个域名开启了 6 个 TCP 连接，如果其中的 1 个 TCP 连接发生了队头阻塞，那么其他的 5 个连接依然可以继续传输数据。所以，"),v("code",[t._v("HTTP/2中，TCP队头阻塞造成的影响会更大")])]),t._v(" "),v("h2",{attrs:{id:"http3-0"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#http3-0"}},[t._v("#")]),t._v(" http3.0")]),t._v(" "),v("p",[t._v("HTTP3.0 使用了 基于UDP的"),v("code",[t._v("QUIC 协议")]),t._v(" "),v("img",{attrs:{src:a(501)}})]),t._v(" "),v("p",[t._v("通过上图我们可以看出，HTTP/3 中的 QUIC 协议集合了以下几点功能")]),t._v(" "),v("ol",[v("li",[t._v("传输可靠性。")]),t._v(" "),v("li",[t._v("TLS加密")]),t._v(" "),v("li",[t._v("多路复用")]),t._v(" "),v("li",[t._v("快速握手\n"),v("img",{attrs:{src:a(502),alt:"http3"}})])])])}),[],!1,null,null,null);s.default=i.exports}}]);