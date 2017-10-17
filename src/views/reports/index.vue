<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.name">
      </el-input>

      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="用户名">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="邮件">
        <template scope="scope">
          <el-button size="small" @click="handleUpdate(scope.row)">{{scope.row.email}}</el-button>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="角色">
        <template scope="scope">
          <span>{{scope.row.role}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="状态">
        <template scope="scope">
          <span>{{scope.row.enabled==1?"启用":"停用"}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button v-if="false" size="small" @click="handleUpdate(scope.row)">修改
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog top="5%" title="测试报告" :visible.sync="dialogFormVisible" size="large" style="top: 0px;">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 90%; margin-left:50px;'>

        <table style="width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <tbody>
            <tr style="font-size: 20px; height: 28px; border: none;height: 38px;">
              <td style="text-align: center; width: 8.3333%;  border: none;">&nbsp;</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">&nbsp;</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">&nbsp;</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">&nbsp;</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">&nbsp;</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">病</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">例</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">&nbsp;</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">&nbsp;</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">&nbsp;</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">&nbsp;</td>
              <td style="text-align: center; width: 8.3333%;  border: none;">&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center;  ">姓名</td>
              <td style="text-align: center;  " colspan="4">&nbsp;</td>
              <td style="text-align: center;  ">性别</td>
              <td style="text-align: center;  ">男</td>
              <td style="text-align: center;  ">利手</td>
              <td style="text-align: center;  " colspan="4">&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; ">民族</td>
              <td style="text-align: center; " colspan="4">&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td style="text-align: center; ">&nbsp;日常口语</td>
              <td style="text-align: center; " colspan="2">&nbsp;&nbsp;</td>
              <td style="text-align: center; " colspan="2">&nbsp;&nbsp;母语方言</td>
              <td style="text-align: center; " colspan="2">&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; " colspan="2">&nbsp;施测时间&nbsp;</td>
              <td style="text-align: center; " colspan="4">年&nbsp; &nbsp;月&nbsp; &nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td style="text-align: center; " colspan="2">出生日期&nbsp;&nbsp;</td>
              <td style="text-align: center; " colspan="4">年 月 日&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; ">&nbsp;教育程度</td>
              <td style="text-align: center; " colspan="6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td style="text-align: center; " colspan="2">当前/此前职业&nbsp;&nbsp;</td>
              <td style="text-align: center; " colspan="3">&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; " colspan="3">&nbsp;是否熟练使用普通话&nbsp;&nbsp;</td>
              <td style="text-align: center; " colspan="4">&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td style="text-align: center; ">婚姻状况&nbsp;</td>
              <td style="text-align: center; " colspan="4">&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; ">&nbsp;家庭住址</td>
              <td style="text-align: center; " colspan="11">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; ">&nbsp;手机 / 电话</td>
              <td style="text-align: center; " colspan="4">&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td style="text-align: center; " colspan="2">&nbsp;&nbsp;电子邮箱</td>
              <td style="text-align: center; " colspan="5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; ">&nbsp;临床诊断</td>
              <td style="text-align: center; " colspan="11">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; ">&nbsp;偏瘫与否</td>
              <td style="text-align: center; " colspan="4">&nbsp;</td>
              <td style="text-align: center; ">偏瘫体侧&nbsp;&nbsp;</td>
              <td style="text-align: center; " colspan="2">&nbsp;</td>
              <td style="text-align: center; " colspan="2">偏瘫严重程度&nbsp;&nbsp;</td>
              <td style="text-align: center; " colspan="2">&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; ">&nbsp;发病日期</td>
              <td style="text-align: center; " colspan="4">&nbsp;</td>
              <td style="text-align: center; ">&nbsp;病变部位</td>
              <td style="text-align: center; " colspan="6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 24px;">
              <td style="text-align: center;  height: 42px;" rowspan="2">&nbsp;并发症</td>
              <td style="text-align: center;  height: 24px;" colspan="2">癫痫&nbsp;</td>
              <td style="text-align: center;  height: 24px;" colspan="2">颅脑损伤&nbsp;</td>
              <td style="text-align: center;  height: 24px;" colspan="2">&nbsp;心脏病&nbsp;</td>
              <td style="text-align: center;  height: 24px;" colspan="2">&nbsp;高血压&nbsp;</td>
              <td style="text-align: center;  height: 24px;" colspan="3">视觉缺陷&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; " colspan="2">&nbsp;抑郁&nbsp;</td>
              <td style="text-align: center; " colspan="2">助听器&nbsp;&nbsp;</td>
              <td style="text-align: center; " colspan="2">&nbsp;酗酒*&nbsp;</td>
              <td style="text-align: center; ">其他&nbsp;</td>
              <td style="text-align: center; " colspan="4">&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; ">&nbsp;目前用药</td>
              <td style="text-align: center; " colspan="11">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; ">听力筛查</td>
              <td style="text-align: center; ">&nbsp;</td>
              <td style="text-align: center; ">筛查日期</td>
              <td style="text-align: center; " colspan="2">&nbsp;</td>
              <td style="text-align: center; ">视力筛查</td>
              <td style="text-align: center; ">&nbsp;</td>
              <td style="text-align: center; ">筛查日期</td>
              <td style="text-align: center; " colspan="4">&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; " colspan="2">&nbsp;&nbsp;故事叙述录音</td>
              <td style="text-align: center; " colspan="10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; " colspan="2">流利度类型</td>
              <td style="text-align: center; " colspan="2">流畅性</td>
              <td style="text-align: center; " colspan="2">非流畅性</td>
              <td style="text-align: center; " colspan="2">失语症类型</td>
              <td style="text-align: center; " colspan="4">&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; " colspan="2">有无以下体内人<br />工植入物（MRI<br />安全）</td>
              <td style="text-align: center; " colspan="10">有（心脏起搏器□、内支架□、血管夹□、人工瓣膜□、静脉滤器□、<br />内固定器□、人工关节□、义齿□、不锈钢丝□、金属节育环□、其他<br />铁磁性物质□）；无□</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; " colspan="2" rowspan="2">西方失语症成套测验（WAB）分数</td>
              <td style="text-align: center; " colspan="2">自发言语</td>
              <td style="text-align: center; " colspan="2">听理解</td>
              <td style="text-align: center; " colspan="2">复述</td>
              <td style="text-align: center; " colspan="2">命名</td>
              <td style="text-align: center; " colspan="2">AQ失语商</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; " colspan="2">&nbsp;</td>
              <td style="text-align: center; " colspan="2">&nbsp;</td>
              <td style="text-align: center; " colspan="2">&nbsp;</td>
              <td style="text-align: center; " colspan="2">&nbsp;</td>
              <td style="text-align: center; " colspan="2">&nbsp;</td>
            </tr>
            <tr style="height: 28px;">
              <td style="text-align: center; ">联系人</td>
              <td style="text-align: center; " colspan="2">&nbsp;</td>
              <td style="text-align: center; ">与患者关系</td>
              <td style="text-align: center; " colspan="2">&nbsp;</td>
              <td style="text-align: center; " colspan="2">联系电话</td>
              <td style="text-align: center; " colspan="4">&nbsp;</td>
            </tr>
          </tbody>

        </table>
        <p>*本次发病前，平均每日饮酒量超过 2 瓶啤酒 /1 两白酒；或每周至少 1 次，每次饮酒量超过 5 瓶啤酒 /3 两白酒</p>

        <table style="width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; width: 20%;">施测者签名</td>
            <td style="text-align: center; width: 30%;">&nbsp;</td>
            <td style="text-align: center; width: 20%;">资格证书编号</td>
            <td style="text-align: center; width: 30%;">&nbsp;</td>
          </tr>
          <tr>
            <td style="text-align: center; width: 20%;">联系电话</td>
            <td style="text-align: center; width: 30%;">&nbsp;</td>
            <td style="text-align: center; width: 20%;">电子邮箱</td>
            <td style="text-align: center; width: 30%;">&nbsp;</td>
          </tr>
        </table>

        <h4>表 A　听觉辨识评分表</h4>

        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header">
              <th>序号</th>
              <th>项目</th>
              <th>被测反应</th>
              <th>标准答案</th>
              <th>反应类别</th>
            </tr>
          </thead>
          <tr>
            <td class="lian_xi">练习1</td>
            <td>xī / xǐ</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class="lian_xi">练习2</td>
            <td>xī / xǐ</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class="lian_xi">练习3</td>
            <td>xī / xǐ</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td  style="font-size: 28px;" colspan="5">&nbsp;</td>
          </tr>
          <tr>
            <td>1</td>
            <td>bó / bó</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">+</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="sheng_mu_bu_tong">
            <td>2</td>
            <td>kā / hā</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>3</td>
            <td>tóu / tòu</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>4</td>
            <td>cā / cā</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">+</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>5</td>
            <td>mēn / mén</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="sheng_mu_bu_tong">
            <td>6</td>
            <td>pí / dí</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="yun_mu_bu_tong">
            <td>7</td>
            <td>hé / hú</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>8</td>
            <td>yóu / yóu</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">+</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="yun_mu_bu_tong">
            <td>9</td>
            <td>duī / diū</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>10</td>
            <td>wāi / wài</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>11</td>
            <td>tiě / tiě</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">+</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="yun_mu_bu_tong">
            <td>12</td>
            <td>niǎo / niǔ</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="sheng_mu_bu_tong">
            <td>13</td>
            <td>kuò / ruò</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>14</td>
            <td>gǔ / gǔ</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">+</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>15</td>
            <td>jiā / jiǎ</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">+</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>16</td>
            <td>zhuā / zhuā</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">+</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="yun_mu_bu_tong">
            <td>17</td>
            <td>bò / bì</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="sheng_mu_bu_tong">
            <td>18</td>
            <td>jǔ / xǔ</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>19</td>
            <td>yuǎn / yuàn</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>20</td>
            <td>sì / sì</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">+</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>21</td>
            <td>shú / shǔ</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">-</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>22</td>
            <td>luè / luè</td>
            <td>&nbsp;</td>
            <td style="font-size: 28px;">+</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td rowspan="4">正确反应小计</td>
            <td>相同</td>
            <td colspan="3">/8</td>
          </tr>
          <tr>
            <td>声调不同</td>
            <td colspan="3">/6</td>
          </tr>
          <tr>
            <td>声母不同</td>
            <td colspan="3">/4</td>
          </tr>
          <tr>
            <td>韵母不同</td>
            <td colspan="3">/4</td>
          </tr>
          <tr>
            <td colspan="2">合计</td>
            <td colspan="3">/22</td>
          </tr>
        </table>
        <el-form-item label="管理员">
          <el-checkbox v-model="temp.isAdmin"></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="handleCreateUser">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible" size="small">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="渠道"> </el-table-column>
        <el-table-column prop="pv" label="pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, createUser, deleteUser } from '@/api/user'

import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'table_user',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: 'id,ASC'
      },
      temp: {
        id: undefined,
        name: '',
        email: '',
        isAdmin: false,
        status: '1'
      },
      sortOptions: [{ label: '按ID升序列', key: 'id,ASC' }, { label: '按ID降序', key: 'id,DESC' }],
      statusOptions: ['published', 'draft', 'deleted'],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      tableKey: 0
    }
  },
  filters: {
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    timeFilter(time) {
      if (!time[0]) {
        this.listQuery.start = undefined
        this.listQuery.end = undefined
        return
      }
      this.listQuery.start = parseInt(+time[0] / 1000)
      this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      deleteUser(row.id).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      }
      )
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleCreateUser() {
      this.temp.id = undefined
      this.dialogFormVisible = false
      var user = {}
      user.name = this.temp.name
      user.email = this.temp.email
      user.password = this.temp.password
      user.enabled = '1'
      user.role = this.temp.isAdmin ? ['admin'] : ['user']
      createUser(user).then(response => {
        // const data = response.data
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      }).catch(error => {
        this.$notify({
          title: '失败',
          message: '创建失败' + error.$message,
          type: 'fail',
          duration: 2000
        })
      })
    },
    update() {
      this.temp.timestamp = +this.temp.timestamp
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, this.temp)
          break
        }
      }
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        email: '',
        isAdmin: false,
        status: '1'
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $table-header-bg:rgb(141, 179, 225);
  $lian_xi:rgb(197, 217, 240);
  $sheng_diao_bu_tong:rgb(229, 184, 183);
  $sheng_mu_bu_tong:rgb(255, 229, 153);
  $yun_mu_bu_tong:rgb(168, 208, 141);
  $he_ji:rgb(0, 129, 204);

    .rtable-header {
          background: $table-header-bg;
    }
    .lian_xi {
          background: $lian_xi;
    }
    .sheng_mu_bu_tong {
          background: $sheng_mu_bu_tong;
    }
    .sheng_diao_bu_tong {
          background: $sheng_diao_bu_tong;
    }
    .yun_mu_bu_tong{
          background: $yun_mu_bu_tong;
    }
    .he_ji{
          background: $he_ji;
    }
</style>
