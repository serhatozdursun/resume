server {
        server_name serhatozdursun.com www.serhatozdursun.com;
 
        location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
       }



    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/serhatozdursun.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/serhatozdursun.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    
    error_page 404 /root/repo/resume/.next/server/pages/404;
    error_page 500 /root/repo/resume/.next/server/pages/502;	


    if ($host = www.serhatozdursun.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = serhatozdursun.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


	listen 80;
        server_name serhatozdursun.com www.serhatozdursun.com;
    return 404; # managed by Certbot




}
