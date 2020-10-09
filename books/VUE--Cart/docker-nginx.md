# docker-nginx 部署

预览地址:[http://101.200.60.73:3000](http://101.200.60.73:3000)

```js
  // docker-compose.yml
  // 创建nginx镜像
  nginx:
        image: nginx
        restart: always
        ports:
                - 8092:80  // 将80端口映射到8092端口
        volumes: // 将文件映射到镜像中
                - ./nginx/nginx.conf:/etc/nginx/nginx.conf // 配置文件 主要修功 user 与当前用户匹配解决403问题
                - ./nginx/conf.d/:/etc/nginx/conf.d
                - /root/www/cart/demo/shop-app/dist/:/root/www/test //

// nginx/conf.d/docker.conf
server {
	listen 80;

	location / {
		try_files $uri $uri/ /index.html; // 解决vue-router histroy模式刷新404错误
		root /root/www/test/; //
		index index.html index.htm;
		autoindex  on;

    // 反向代理 解决跨越问题
		location ^~/api {
			rewrite ^/api/(.*)$ /$1 break; // 重写url
			proxy_pass http://101.200.60.73:3000;
		}
	}
}


```
