# nodejs-crud-api

## начало работы

1. `npm install`
2. переименовать файл `.env.example` в `.env` либо создать новый по примеру

## запуск проекта

- `npm run start:dev` для старта в режими разработки - проект запускается и изменения в коде отслеживаются при помощи **nodemon**
- `npm run start:prod` для старта в режими production - проект собирается при помощи **webpack** и запускается
- `npm run test` для запуска тестов
- `npm run start:multi` для запуска в режими мульти - запускается несколько серверов (по количеству ядер процессора). _Реслизованно частично, workerы общаются между собой, но общая база данных не создана._

## использование

### реализованы следующие методы

- **GET** + `api/users` - получить всех пользователей. Изначально возвращается пустой массив
- **GET** + `api/users/userId` - получить одного пользователя по его id
- **POST** + `api/users` - создать нового пользователя. Для этого в теле запроса необходимо передать объект с данными пользователя. Все поля явдяются обязательными, также проводится проверка на соответствие типов данных.
  - `{
  name: "user name",
  age: 28,
  hobbies: ["hobbie-1", "hobbie-2"] || []
}`
- **PUT** + `api/users/userId` - изменение существеющего пользователя. Для этого в теле запроса необходимо передать объект с данными пользователя. Все поля явдяются обязательными, также проводится проверка на соответствие типов данных.
- **DELETE** + `api/users/userId` - удаление пользователя.

### дополнительно реализовано

- **PATCH** + `api/users/userId` - изменение существеющего пользователя. Для этого в теле запроса необходимо передать объект с данными пользователя. Необходимо передать только поля, которые надо поменять.

## статус коды и сообщения

- **200**
  - успешное получение всех пользователей
  - успешное получение одного пользователя
  - успешное обновление пользователя
- **201**
  - создание нового пользователя
- **204**
  - удаление пользователя
- **400**
  - неверный формат id
  - неверный формат JSON
- **404**
  - пользователь не найден
  - отсутвие end-point'а, также как, неверный формат url (`api/users/` трактуется как неверный), несоответствие метода адресу (например, `POST` + `api/users/userId`)
- **500**
  - ошибка на стороне сервера.

## дополнительно

### в тестирование реализовано три сценария

1. Протестированно получение, создание и удаление пользователей, и соответствие данных требуемым.
2. Протестировано получение соответствующих статус кодов во всех вариантах
3. Протестированны получаемые сообщения.
