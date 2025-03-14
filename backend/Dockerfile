# Python 3.11 Slim sürümünü kullan
FROM python:3.11-slim

# Çalışma dizini
WORKDIR /app

# Bağımlılıkları yükle
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Tüm backend dosyalarını kopyala
COPY . .

# Uygulamayı çalıştır
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
