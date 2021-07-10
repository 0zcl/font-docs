网络安全

如果没设置SameSite，登录后Info站点后，在极客时间获取Info站点的资源，会带上极客时间的cookie
（浏览器处理cookie的机制，做某个域的请求，自动会把这个域的cookie带上） csrf 一般是通过 img form 等构造请求发送的，这些请求不受跨域限制

cookie SameSite:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite