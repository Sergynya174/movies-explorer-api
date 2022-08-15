# Бэкенд Диплома

### Описание проекта: 
Репозиторий для дипломной работы Movies Explorer, включающий бэкенд часть приложения со следующими возможностями: авторизации и регистрации пользователей, операции с фильмами и пользователями.

### Технологии:
+ NodeJS
+ Express
+ MongoDB
+ Mongoose

### Функционал: 

+ Регистрация
+ Авторизация
+ Обновление данных пользователя
+ Получение информации о текущем пользователе
+ Получение списка фильмов
+ Создание фильма
+ Удаление фильма
+ Центральная обработка ошибок
+ Валидация входящих данных
  
### Подготовка и запуск проекта

`npm i` — установка зависимостей

`mongod` — запускает mongodDB

`npm run start` — запускает сервер

`npm run dev` — запускает сервер с hot-reload


### Адреса сервера

+ https://api.sergynya174.developer.diplom.nomoredomains.xyz/signup
+ https://api.sergynya174.developer.diplom.nomoredomains.xyz/signin
+ https://api.sergynya174.developer.diplom.nomoredomains.xyz/users/me
+ https://api.sergynya174.developer.diplom.nomoredomains.xyz/movies
+ https://api.sergynya174.developer.diplom.nomoredomains.xyz/movies/:id
