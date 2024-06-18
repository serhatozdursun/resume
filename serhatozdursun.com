# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name serhatozdursun.com www.serhatozdursun.com;

    location / {
        return 301 https://$host$request_uri;
    }
}

# Main HTTPS server block
server {
    listen 443 ssl; # managed by Certbot
    server_name serhatozdursun.com www.serhatozdursun.com;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/serhatozdursun.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/serhatozdursun.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    # Proxy pass configuration
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Custom error pages
    error_page 404 /404.html;
    error_page 500 /500.html;

    location = /404.html {
        internal;
        root /repo/resume/.next/server/pages;
    }

    location = /502.html {
        internal;
        root /repo/resume/.next/server/pages;
    }
}
