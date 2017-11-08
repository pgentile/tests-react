FROM nginx:latest

ADD ./build /usr/share/nginx/html/static
ADD ./index.html /usr/share/nginx/html/
ADD ./nginx.default.conf /etc/nginx/conf.d/default.conf
