const express = require('express'); // 导入 Express 框架
const app = express(); // 创建 Express 应用程序实例
const port = 3000; // 定义服务器端口
const cors = require('cors'); // 导入 cors 模块

const listMockRoutes = require('./routes/List'); // 导入模拟路由模块

// 添加 CORS 中间件，允许所有来源访问
app.use(cors());

app.use(express.json()); // 使用 Express 中间件解析 JSON 格式的请求体

app.use('/api/mock', listMockRoutes); // 将 '/api/mock' 路由映射到 mockRoutes 路由处理程序

// 服务器路由
// 在这里可以添加处理服务器请求的路由

// GET 请求处理程序，当访问根路径时返回简单文本消息
app.get('/', (req, res) => {
  res.send('Hello from Express!'); // 返回简单文本消息给客户端
});

// 监听指定端口，启动服务器
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`); // 在控制台打印服务器启动信息
});
