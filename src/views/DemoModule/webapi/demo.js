import config from '@/config';
import Generator from '@/webApi/generator'
export default new Generator({


     // 获取检验单列表
     GetCheckReport: {url: '/CheckReportService/GetAll', method: 'post'},
     // 获取批次列表
     GetBatchList: {url: '/CheckReportService/GetBatchList', method: 'post'},
     // 检验单新增&编辑
     SaveCheckReport: {url: '/CheckReportService/Save', method: 'post'},
     // 检验单删除
     delCheckReport: {url: '/CheckReportService/Delete', method: 'post'},
     // 获取单个检验单信息
     GetCheckReportById: {url: '/CheckReportService/Get', method: 'post'},

}, config.pgyerApiUrl);