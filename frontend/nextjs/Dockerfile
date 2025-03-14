# Node.js 18 kullan
FROM node:18

# Çalışma dizini
WORKDIR /app

# Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# Tüm frontend dosyalarını kopyala
COPY . .

# Next.js uygulamasını başlat
CMD ["npm", "run", "dev"]
