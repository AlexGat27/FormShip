FROM node:latest AS client-app

# Устанавливаем рабочую директорию для фронтенда
WORKDIR /code/ship-forntend

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости фронтенда
RUN npm install

# Копируем все файлы фронтенда в рабочую директорию
COPY . .

# Собираем фронтенд приложение
RUN npm run build

# Запускаем приложение при старте контейнера
CMD ["npm", "start"]