const express = require('express');
const router = express.Router();
const mockData = require('./mockData'); // 导入 mockData 模块，用于处理模拟数据

// GET 请求处理程序，获取列表数据
// http://localhost:3000/api/mock/list?pageNum=1&pageSize=20
router.get('/list', (req, res) => {
  const list = mockData.getList(); // 调用 mockData 模块中的 getList 方法获取列表数据
  res.json(list); // 将列表数据以 JSON 格式返回
});

// POST 请求处理程序，添加新项到列表
router.post('/list', (req, res) => {
  const newItem = req.body; // 获取 POST 请求中的请求体数据
  if (!newItem || Object.keys(newItem).length === 0) { // 检查请求数据是否为空
    res.status(400).json({ error: 'Invalid data. Please provide a valid item.' }); // 返回错误信息
  } else {
    const addedItem = mockData.addToList(newItem); // 调用 mockData 模块中的 addToList 方法添加新项
    res.json(addedItem); // 返回添加成功的新项数据
  }
});

// DELETE 请求处理程序，从列表中删除指定 ID 的项
router.delete('/list/:id', (req, res) => {
  const id = parseInt(req.params.id); // 获取 URL 中的参数 ID，并转换为整数
  if (isNaN(id)) { // 检查 ID 是否为有效数字
    res.status(400).json({ error: 'Invalid ID. Please provide a valid ID.' }); // 返回错误信息
  } else {
    const result = mockData.deleteFromList(id); // 调用 mockData 模块中的 deleteFromList 方法删除指定 ID 的项
    if (result) {
      res.json(result); // 返回删除成功的项数据
    } else {
      res.status(404).json({ error: 'Item not found with the provided ID.' }); // 返回未找到指定 ID 的项的错误信息
    }
  }
});

// PUT 请求处理程序，更新列表中指定 ID 的项
router.put('/list/:id', (req, res) => {
  const id = parseInt(req.params.id); // 获取 URL 中的参数 ID，并转换为整数
  const updatedItem = req.body; // 获取 PUT 请求中的请求体数据
  if (isNaN(id) || !updatedItem || Object.keys(updatedItem).length === 0) { // 检查 ID 和数据是否有效
    res.status(400).json({ error: 'Invalid ID or data. Please provide a valid ID and item.' }); // 返回错误信息
  } else {
    const result = mockData.updateListItem(id, updatedItem); // 调用 mockData 模块中的 updateListItem 方法更新指定 ID 的项
    if (result) {
      res.json(result); // 返回更新成功的项数据
    } else {
      res.status(404).json({ error: 'Item not found with the provided ID.' }); // 返回未找到指定 ID 的项的错误信息
    }
  }
});

module.exports = router; // 导出路由处理程序
