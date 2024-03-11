const Mock = require('mockjs');

/**
 * 生成随机列表数据
 * @param {number} pageSize - 列表页大小
 * @param {Object} [mockTemplate] - 自定义的模板对象
 * @returns {Array} 生成的随机列表数据
 * 
 * Mock.mock(template):
 * 
 * 这是 Mock.js 提供的一个 API，用于根据指定的模板生成模拟数据。
 * template 参数是一个对象，表示数据模板，可以包含各种数据字段及其生成规则。
 * 'id|+1': 1:
 * 这是 Mock.js 中定义数据模板规则的语法之一，表示 id 字段以 1 为起始值，每次递增 1。
 * 'name': '@cname':
 * 
 * 在模拟数据中，'name' 字段使用了 '@cname'，表示生成中文姓名的随机数据。
 * 'age|18-60': 1:
 * 
 * 这里使用了 '|18-60' 的语法规则，表示生成范围在 18 到 60 之间的随机整数作为 age 的值。
 * 
 */
const generateRandomList = (
  pageSize,
  mockTemplate = {
    'id|+1': 1,
    'name': '@cname',
    'age|18-60': 1
  }
) => {
  const mockConfig = {};
  mockConfig[`list|${pageSize}`] = [mockTemplate];
  console.log('mockConfig: ', mockConfig);
  console.log('Mock.mock(mockConfig).list: ', Mock.mock(mockConfig).list);
  return Mock.mock(mockConfig).list;
};



// 默认表头数据
const defaultTableHeader = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' }
];
module.exports = {
  getList: ({ pageNum, pageSize, mockTemplate, ...param }) => {
    let dataList = generateRandomList(pageSize, mockTemplate);
    return {
      code: 'ZCWO0000',
      data: {
        list: dataList,
        total: dataList && dataList.length,
        pageNum,
        pageSize,
      },
      message: 'Success'
    }; // 返回默认格式的数据
  },
};
