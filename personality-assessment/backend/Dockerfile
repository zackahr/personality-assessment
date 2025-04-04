FROM python:3.11

WORKDIR /app

# Install dependencies first (caching optimization)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

EXPOSE 8000