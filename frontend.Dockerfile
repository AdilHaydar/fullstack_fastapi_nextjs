# Node.js temel imajını kullan
FROM node:18-alpine AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY frontend/nextjs/package.json frontend/nextjs/package-lock.json* ./

# Bağımlılıkları yükle
RUN npm ci

# Kaynak kodları kopyala
COPY frontend/nextjs/ ./

# Uygulamayı derle
RUN npm run build

# Üretim aşaması
FROM node:18-alpine AS runner

WORKDIR /app

# Üretim ortamını ayarla
ENV NODE_ENV=production

# Derlenen uygulamayı kopyala
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Uygulamayı çalıştır
CMD ["npm", "start"] 