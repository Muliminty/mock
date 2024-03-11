# 使用文档

## 安装

首先，你需要安装 `json-server` 和 Express 依赖：

```shell
npm install json-server express
```

## 创建 JSON 数据文件

在项目根目录下创建一个 JSON 数据文件（例如 `db.json`），用于存储模拟的数据。

```json
{
  "users": [
    { "id": 1, "name": "John Doe", "age": 25 },
    { "id": 2, "name": "Jane Smith", "age": 30 }
  ],
  "posts": [
    { "id": 1, "title": "First Post", "content": "Lorem ipsum..." },
    { "id": 2, "title": "Second Post", "content": "Dolor sit amet..." }
  ]
}
```

## 创建 Express 应用

在项目根目录下创建一个 `server.js` 文件，用于创建 Express 应用。

```javascript
const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

// 创建 Express 应用
const app = express();
const port = 3000;

// 将 JSON Server 路由挂载到 /api 路径
const apiRouter = jsonServer.router('db.json');
app.use('/api', apiRouter);

// 添加自定义的 Express 路由
app.get('/custom', (req, res) => {
  res.json({ message: 'This is a custom route in Express' });
});

// 设置 Express 应用的静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 启动 Express 服务器
app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
```

## 启动应用

运行以下命令启动应用：

```shell
node server.js
```

现在，你可以通过访问 `http://localhost:3000/api/users` 来获取模拟的用户数据，或者访问 `http://localhost:3000/custom` 来访问自定义的 Express 路由。

## 使用模拟 API

`json-server` 为你提供了一组默认的路由规则，可以通过发送 HTTP 请求来访问模拟的 API。

例如，使用 `curl` 或者工具如 `Postman` 发送以下请求：

- 获取所有用户信息：

  ```
  GET http://localhost:3000/api/users
  ```

- 获取特定用户的信息（使用用户 ID）：

  ```
  GET http://localhost:3000/api/users/1
  ```

- 创建新用户：

  ```
  POST http://localhost:3000/api/users
  Content-Type: application/json

  {
    "name": "New User",
    "age": 35
  }
  ```

- 更新用户信息（使用用户 ID）：

  ```
  PUT http://localhost:3000/api/users/1
  Content-Type: application/json

  {
    "name": "Updated User",
    "age": 40
  }
  ```

- 删除用户（使用用户 ID）：

  ```
  DELETE http://localhost:3000/api/users/1
  ```

`json-server` 将根据请求的 HTTP 方法和路径自动匹配并处理相应的数据操作。

## 使用自定义后端逻辑

除了使用 `json-server` 提供的模拟 API，你还可以在 Express 应用中添加自定义的后端逻辑。

在 `server.js` 文件中，我们添加了一个自定义的 Express 路由 `/custom`，用于处理自定义的后端逻辑。你可以根据项目需求添加更多自定义路由。

## 静态文件服务

在 `server.js` 文件中，我们使用了 Express 的静态文件中间件，将 `public` 目录设置为 Express 应用的静态文件目录。你可以将前端代码放置在该目录下，并通过访问对应的文件来提供静态文件服务。
