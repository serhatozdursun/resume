# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts
COPY . .
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine
WORKDIR /app

# Create non-root user for nginx
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Copy built Next.js app from builder
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/next.config.js /app/next.config.js

# Copy Nginx config
COPY default /etc/nginx/conf.d/default.conf

# Change ownership of app files to non-root user
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port 80
EXPOSE 80

# Healthcheck using curl instead of wget for better security
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
