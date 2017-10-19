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
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 90%; margin-left:50px;color: black;'>

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
            <td style="font-size: 28px;" colspan="5">&nbsp;</td>
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
          <tr class="sheng_diao_bu_tong">
            <td>声调不同</td>
            <td colspan="3">/6</td>
          </tr>
          <tr class="sheng_mu_bu_tong">
            <td>声母不同</td>
            <td colspan="3">/4</td>
          </tr>
          <tr class="yun_mu_bu_tong">
            <td>韵母不同</td>
            <td colspan="3">/4</td>
          </tr>
          <tr class="he_ji">
            <td colspan="2">合计</td>
            <td colspan="3">/22</td>
          </tr>
        </table>

        <h4>表 B　声调理解评分表</h4>

        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header">
              <th>序号</th>
              <th colspan="2">被测反应</th>
              <th>标准答案</th>
              <th>反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="lian_xi">练习1</td>
              <td>狗</td>
              <td>钩</td>
              <td>钩</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td>米</td>
              <td>蜜</td>
              <td>米</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="font-size: 28px;" colspan="5">&nbsp;</td>
            </tr>
            <tr>
              <td>1</td>
              <td>竹</td>
              <td>猪</td>
              <td>猪</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>2</td>
              <td>马</td>
              <td>妈</td>
              <td>马</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>3</td>
              <td>笔</td>
              <td>鼻</td>
              <td>鼻</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>4</td>
              <td>猫</td>
              <td>帽</td>
              <td>帽</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>5</td>
              <td>炉</td>
              <td>鹿</td>
              <td>炉</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>6</td>
              <td>鸭</td>
              <td>牙</td>
              <td>牙</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>7</td>
              <td>鼠</td>
              <td>树</td>
              <td>鼠</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>8</td>
              <td>花</td>
              <td>画</td>
              <td>花</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>9</td>
              <td>眼</td>
              <td>烟</td>
              <td>烟</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>10</td>
              <td>兔</td>
              <td>土</td>
              <td>兔</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>11</td>
              <td>河</td>
              <td>鹤</td>
              <td>鹤</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr>
              <td>12</td>
              <td>虎</td>
              <td>湖</td>
              <td>虎</td>
              <td style="font-size: 28px;">&nbsp;</td>
            </tr>
            <tr class="he_ji">
              <td colspan="2">合计</td>
              <td colspan="3">/22</td>
            </tr>
          </tbody>
        </table>

        <h4>表 C　听觉词汇判断评分表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header">
              <th style="width: 17.1996%;">序号</th>
              <th style="width: 10.1433%;">项目</th>
              <th style="width: 18.6329%;">被测反应</th>
              <th style="width: 26.6814%;">标准答案</th>
              <th style="width: 26.7916%;">反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="lian_xi" style="width: 17.1996%;">练习1</td>
              <td style="width: 10.1433%;">&nbsp;地 / 点</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">+</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td class="lian_xi" style="width: 17.1996%;">练习2</td>
              <td style="width: 10.1433%;">&nbsp;祛 / 候</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">-</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="font-size: 28px; width: 99.4487%;" colspan="5">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">1</td>
              <td style="width: 10.1433%;">铁 / 日&nbsp;</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">-</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">2</td>
              <td style="width: 10.1433%;">蝴 / 蝶</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">+</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">3</td>
              <td style="width: 10.1433%;">过 / 开</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">-</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">4</td>
              <td style="width: 10.1433%;">蚂 / 蟥</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">+</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">5</td>
              <td style="width: 10.1433%;">菊 / 花</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">+</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">6</td>
              <td style="width: 10.1433%;">合 / 眯</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">-</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">7</td>
              <td style="width: 10.1433%;">清 / 朵</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">-</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">8</td>
              <td style="width: 10.1433%;">樟 / 木</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">+</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">9</td>
              <td style="width: 10.1433%;">啤 / 然</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">-</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">10</td>
              <td style="width: 10.1433%;">手 / 工</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">+</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">11</td>
              <td style="width: 10.1433%;">白 / 水</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">+</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">12</td>
              <td style="width: 10.1433%;">倭 / 见</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">-</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">13</td>
              <td style="width: 10.1433%;">海 / 湾</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">+</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">14</td>
              <td style="width: 10.1433%;">沮 / 骈</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">-</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">15</td>
              <td style="width: 10.1433%;">礁 / 氓</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">-</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;">16</td>
              <td style="width: 10.1433%;">马 / 驹</td>
              <td style="width: 18.6329%;">&nbsp;</td>
              <td style="font-size: 28px; width: 26.6814%;">+</td>
              <td style="width: 26.7916%;">&nbsp;</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;" colspan="2">假词正确小计</td>
              <td style="width: 18.6329%;" colspan="3">/8</td>
            </tr>
            <tr>
              <td style="width: 17.1996%;" colspan="2">真词正确小计</td>
              <td style="width: 18.6329%;" colspan="3">/8</td>
            </tr>
            <tr class="he_ji">
              <td style="width: 27.3429%;" colspan="2">正确反应合计</td>
              <td style="width: 72.1058%;" colspan="3">/16</td>
            </tr>
          </tbody>
        </table>

        <h4>表 D　对证命名评分表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 10%; height: 18px;">序号</th>
              <th style="width: 10%; height: 18px;">项目</th>
              <th style="width: 30%; height: 18px;">反应内容</th>
              <th style="width: 10%; height: 18px;">反应类别</th>
              <th style="width: 30%; height: 18px;" colspan="3">听觉确认项目</th>
              <th style="width: 10%; height: 18px;">听觉确认反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="lian_xi">练习1</td>
              <td> 刀</td>
              <td> </td>
              <td> </td>
              <td> 切  </td>
              <td>猫 </td>
              <td> 刀</td>
              <td> </td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="8"> </td>
            </tr>
            <tr>
              <td>1</td>
              <td>青蛙</td>
              <td> </td>
              <td> </td>
              <td>池塘</td>
              <td>青蛙</td>
              <td>惊讶</td>
              <td> </td>
            </tr>
            <tr>
              <td>2</td>
              <td>骆驼</td>
              <td> </td>
              <td> </td>
              <td>骆驼</td>
              <td>萝卜</td>
              <td>沙漠</td>
              <td> </td>
            </tr>
            <tr>
              <td>3</td>
              <td>大象</td>
              <td> </td>
              <td> </td>
              <td>家乡</td>
              <td>蚂蚁</td>
              <td>大象</td>
              <td> </td>
            </tr>
            <tr>
              <td>4</td>
              <td>熊</td>
              <td> </td>
              <td> </td>
              <td>桶</td>
              <td>熊</td>
              <td>笨</td>
              <td> </td>
            </tr>
            <tr>
              <td>5</td>
              <td>兔子 </td>
              <td> </td>
              <td> </td>
              <td>胡子</td>
              <td>狼</td>
              <td>兔子 </td>
              <td> </td>
            </tr>
            <tr>
              <td>6</td>
              <td>蛇 </td>
              <td> </td>
              <td> </td>
              <td>绳子</td>
              <td>沙</td>
              <td>蛇 </td>
              <td> </td>
            </tr>
            <tr>
              <td>7</td>
              <td>老虎</td>
              <td> </td>
              <td> </td>
              <td>老虎</td>
              <td>来回</td>
              <td>恐怖</td>
              <td> </td>
            </tr>
            <tr>
              <td>8</td>
              <td>松鼠</td>
              <td> </td>
              <td> </td>
              <td>从属</td>
              <td>松鼠</td>
              <td>狮子</td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">动物小计 </td>
              <td colspan="2"> /8</td>
              <td colspan="4">                正确率 =　 正确确认数（）/ 需确认数（）</td>
            </tr>
            <tr>
              <td>9</td>
              <td>帽子</td>
              <td> </td>
              <td> </td>
              <td>贸易</td>
              <td>帽子</td>
              <td>头顶</td>
              <td> </td>
            </tr>
            <tr>
              <td>10</td>
              <td>手套 </td>
              <td> </td>
              <td> </td>
              <td>手套</td>
              <td>外套</td>
              <td>上头</td>
              <td> </td>
            </tr>
            <tr>
              <td>11</td>
              <td>裤子</td>
              <td> </td>
              <td> </td>
              <td>父子</td>
              <td>上衣</td>
              <td>裤子</td>
              <td> </td>
            </tr>
            <tr>
              <td>12</td>
              <td>鞋</td>
              <td> </td>
              <td> </td>
              <td>走路</td>
              <td>星</td>
              <td>鞋</td>
              <td> </td>
            </tr>
            <tr>
              <td>13</td>
              <td>衬衫 </td>
              <td> </td>
              <td> </td>
              <td>大衣</td>
              <td>衬衫</td>
              <td>人参</td>
              <td> </td>
            </tr>
            <tr>
              <td>14</td>
              <td>裙子</td>
              <td> </td>
              <td> </td>
              <td>裙子</td>
              <td>西装</td>
              <td>君子</td>
              <td> </td>
            </tr>
            <tr>
              <td>15</td>
              <td>袜子</td>
              <td> </td>
              <td> </td>
              <td>袜子</td>
              <td>袖子</td>
              <td>鸭子</td>
              <td> </td>
            </tr>
            <tr>
              <td>16</td>
              <td>腰带</td>
              <td> </td>
              <td> </td>
              <td>绑</td>
              <td>朝代</td>
              <td>腰带</td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">服装小计</td>
              <td colspan="2">/8</td>
              <td colspan="4">           正确率 =　 正确确认数（）/ 需确认数（） </td>
            </tr>
            <tr>
              <td>17</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>18</td>
              <td>膝盖</td>
              <td> </td>
              <td> </td>
              <td>膝盖</td>
              <td>手腕</td>
              <td>衣袋</td>
              <td> </td>
            </tr>
            <tr>
              <td>19</td>
              <td>耳朵</td>
              <td> </td>
              <td> </td>
              <td>花朵</td>
              <td>鼻子</td>
              <td>耳朵</td>
              <td> </td>
            </tr>
            <tr>
              <td>20</td>
              <td>眉毛</td>
              <td> </td>
              <td> </td>
              <td>额头</td>
              <td>眉毛</td>
              <td>肥皂</td>
              <td> </td>
            </tr>
            <tr>
              <td>21</td>
              <td>舌头</td>
              <td> </td>
              <td> </td>
              <td>舌头</td>
              <td>味道</td>
              <td>渗透</td>
              <td> </td>
            </tr>
            <tr>
              <td>22</td>
              <td>脖子</td>
              <td> </td>
              <td> </td>
              <td>嘴唇</td>
              <td>桌子</td>
              <td>脖子</td>
              <td> </td>
            </tr>
            <tr>
              <td>23</td>
              <td>牙齿</td>
              <td> </td>
              <td> </td>
              <td>牙齿</td>
              <td>咬</td>
              <td>架子</td>
              <td> </td>
            </tr>
            <tr>
              <td>24</td>
              <td>肩膀</td>
              <td> </td>
              <td> </td>
              <td>胳膊</td>
              <td>肩膀</td>
              <td>连忙</td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2"> 身体小计</td>
              <td colspan="2">/8</td>
              <td colspan="4">            正确率 =　 正确确认数（）/ 需确认数（）</td>
            </tr>
            <tr>
              <td>25</td>
              <td>苹果</td>
              <td> </td>
              <td> </td>
              <td>后果 </td>
              <td>饥饿</td>
              <td>苹果</td>
              <td> </td>
            </tr>
            <tr>
              <td>26</td>
              <td>玉米</td>
              <td> </td>
              <td> </td>
              <td>聚集 </td>
              <td>玉米</td>
              <td>小麦</td>
              <td> </td>
            </tr>
            <tr>
              <td>27</td>
              <td>葡萄</td>
              <td> </td>
              <td> </td>
              <td>无效 </td>
              <td>水果</td>
              <td>葡萄</td>
              <td> </td>
            </tr>
            <tr>
              <td>28</td>
              <td>辣椒</td>
              <td> </td>
              <td> </td>
              <td>辣椒 </td>
              <td>发酵</td>
              <td>萝卜</td>
              <td> </td>
            </tr>
            <tr>
              <td>29</td>
              <td>西瓜</td>
              <td> </td>
              <td> </td>
              <td>依法</td>
              <td>西瓜</td>
              <td>桃</td>
              <td> </td>
            </tr>
            <tr>
              <td>30</td>
              <td>白菜</td>
              <td> </td>
              <td> </td>
              <td>外在</td>
              <td>萝卜</td>
              <td>白菜</td>
              <td> </td>
            </tr>
            <tr>
              <td>31</td>
              <td>梨</td>
              <td> </td>
              <td> </td>
              <td>桃</td>
              <td>梨  </td>
              <td>席</td>
              <td> </td>
            </tr>
            <tr>
              <td>32</td>
              <td>花生</td>
              <td> </td>
              <td> </td>
              <td>花生</td>
              <td>发疯</td>
              <td>大豆</td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">  果蔬小计</td>
              <td colspan="2">/8  </td>
              <td colspan="4">            正确率 =　 正确确认数（）/ 需确认数（）    </td>
            </tr>
            <tr>
              <td>33</td>
              <td>手表 </td>
              <td> </td>
              <td> </td>
              <td> 钟头</td>
              <td>吼叫</td>
              <td>手表 </td>
              <td> </td>
            </tr>
            <tr>
              <td>34</td>
              <td>眼镜</td>
              <td> </td>
              <td> </td>
              <td> 前景 </td>
              <td>眼镜</td>
              <td>镜头</td>
              <td> </td>
            </tr>
            <tr>
              <td>35</td>
              <td>筷子</td>
              <td> </td>
              <td> </td>
              <td> 筷子 </td>
              <td>牌子</td>
              <td>棍子</td>
              <td> </td>
            </tr>
            <tr>
              <td>36</td>
              <td>被子</td>
              <td> </td>
              <td> </td>
              <td> 枕头 </td>
              <td>杯子</td>
              <td>被子</td>
              <td> </td>
            </tr>
            <tr>
              <td>37</td>
              <td>毛巾</td>
              <td> </td>
              <td> </td>
              <td> 瓶子 </td>
              <td>毛巾</td>
              <td>脑筋</td>
              <td> </td>
            </tr>
            <tr>
              <td>38</td>
              <td>锅</td>
              <td> </td>
              <td> </td>
              <td> 锅</td>
              <td>炒</td>
              <td>窝</td>
              <td> </td>
            </tr>
            <tr>
              <td>39</td>
              <td>钥匙</td>
              <td> </td>
              <td> </td>
              <td> 架子</td>
              <td>好似</td>
              <td>钥匙</td>
              <td> </td>
            </tr>
            <tr>
              <td>40</td>
              <td> 桶</td>
              <td> </td>
              <td> </td>
              <td> 涌</td>
              <td>桶 </td>
              <td>瓶子</td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">  工具小计</td>
              <td colspan="2">/8  </td>
              <td colspan="4">        正确率 =　 正确确认数（）/ 需确认数（）</td>
            </tr>
            <tr>
              <td>41</td>
              <td>红</td>
              <td> </td>
              <td> </td>
              <td>重</td>
              <td>红</td>
              <td>白</td>
              <td> </td>
            </tr>
            <tr>
              <td>42</td>
              <td>绿</td>
              <td> </td>
              <td> </td>
              <td>灰</td>
              <td>具</td>
              <td>绿</td>
              <td> </td>
            </tr>
            <tr>
              <td>43</td>
              <td>黄</td>
              <td> </td>
              <td> </td>
              <td>黄</td>
              <td>王</td>
              <td>黑</td>
              <td> </td>
            </tr>
            <tr>
              <td>44</td>
              <td>粉红</td>
              <td> </td>
              <td> </td>
              <td>蔚蓝</td>
              <td>门洞</td>
              <td>粉红</td>
              <td> </td>
            </tr>
            <tr>
              <td>45</td>
              <td>白</td>
              <td> </td>
              <td> </td>
              <td>红</td>
              <td>白</td>
              <td>台</td>
              <td> </td>
            </tr>
            <tr>
              <td>46</td>
              <td>蓝</td>
              <td> </td>
              <td> </td>
              <td>蓝</td>
              <td>弹 </td>
              <td>紫</td>
              <td> </td>
            </tr>
            <tr>
              <td>47</td>
              <td>黑</td>
              <td> </td>
              <td> </td>
              <td>白</td>
              <td>黑 </td>
              <td>飞</td>
              <td> </td>
            </tr>
            <tr>
              <td>48</td>
              <td>紫</td>
              <td> </td>
              <td> </td>
              <td>紫</td>
              <td>蓝 </td>
              <td>止</td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">颜色小计 </td>
              <td colspan="2">/8  </td>
              <td colspan="4">    正确率 =　 正确确认数（）/ 需确认数（）</td>
            </tr>
            <tr>
              <td>49</td>
              <td>熨斗</td>
              <td> </td>
              <td> </td>
              <td>干洗</td>
              <td>群殴</td>
              <td>熨斗</td>
              <td> </td>
            </tr>
            <tr>
              <td>50</td>
              <td>积木</td>
              <td> </td>
              <td> </td>
              <td>祈福</td>
              <td>积木</td>
              <td>陀螺</td>
              <td> </td>
            </tr>
            <tr>
              <td>51</td>
              <td>拖把</td>
              <td> </td>
              <td> </td>
              <td>拖把</td>
              <td>婆妈</td>
              <td>洒扫</td>
              <td> </td>
            </tr>
            <tr>
              <td>52</td>
              <td>古筝</td>
              <td> </td>
              <td> </td>
              <td>武圣</td>
              <td>古筝</td>
              <td>弹拨</td>
              <td> </td>
            </tr>
            <tr>
              <td>53</td>
              <td>掸子</td>
              <td> </td>
              <td> </td>
              <td>拂尘</td>
              <td>甘孜</td>
              <td>掸子</td>
              <td> </td>
            </tr>
            <tr>
              <td>54</td>
              <td>飞镖</td>
              <td> </td>
              <td> </td>
              <td>北漂</td>
              <td>飞镖</td>
              <td>弩箭</td>
              <td> </td>
            </tr>
            <tr>
              <td>55</td>
              <td>高跷</td>
              <td> </td>
              <td> </td>
              <td> 高跷</td>
              <td>旱船</td>
              <td>浩渺 </td>
              <td> </td>
            </tr>
            <tr>
              <td>56</td>
              <td>滑板</td>
              <td> </td>
              <td> </td>
              <td>挂毯</td>
              <td>滑板</td>
              <td>溜冰</td>
              <td> </td>
            </tr>
            <tr>
              <td>57</td>
              <td>窗花</td>
              <td> </td>
              <td> </td>
              <td>春联</td>
              <td>光华</td>
              <td>窗花</td>
              <td> </td>
            </tr>
            <tr>
              <td>58</td>
              <td>浴缸</td>
              <td> </td>
              <td> </td>
              <td>浴缸</td>
              <td>铝厂</td>
              <td>泡澡</td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">低频名词小计</td>
              <td colspan="2">/10</td>
              <td colspan="4">正确率 =　 正确确认数（）/ 需确认数（）</td>
            </tr>
            <tr>
              <td>练习2</td>
              <td>推</td>
              <td> </td>
              <td> </td>
              <td>举</td>
              <td>吹</td>
              <td>推</td>
              <td> </td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="8"> </td>
            </tr>
            <tr>
              <td>59</td>
              <td> 摔</td>
              <td> </td>
              <td> </td>
              <td>摔</td>
              <td>税</td>
              <td>滑</td>
              <td> </td>
            </tr>
            <tr>
              <td>60</td>
              <td>睡觉</td>
              <td> </td>
              <td> </td>
              <td>清醒</td>
              <td>数据</td>
              <td>睡觉</td>
              <td> </td>
            </tr>
            <tr>
              <td>61</td>
              <td>醉</td>
              <td> </td>
              <td> </td>
              <td>浸</td>
              <td>醉</td>
              <td>脆 </td>
              <td> </td>
            </tr>
            <tr>
              <td>62</td>
              <td>洗澡 </td>
              <td> </td>
              <td> </td>
              <td>洗澡</td>
              <td>起草</td>
              <td>清洁</td>
              <td> </td>
            </tr>
            <tr>
              <td>63</td>
              <td>跪 </td>
              <td> </td>
              <td> </td>
              <td>卧</td>
              <td>跪</td>
              <td>挥 </td>
              <td> </td>
            </tr>
            <tr>
              <td>64</td>
              <td>游泳 </td>
              <td> </td>
              <td> </td>
              <td>沟通</td>
              <td>体操</td>
              <td>游泳</td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">不及物动词小计</td>
              <td colspan="2">/6</td>
              <td colspan="4">正确率 =　 正确确认数（）/ 需确认数（）</td>
            </tr>
            <tr>
              <td>65</td>
              <td>剪 </td>
              <td> </td>
              <td> </td>
              <td>粘</td>
              <td>叠 </td>
              <td>剪</td>
              <td> </td>
            </tr>
            <tr>
              <td>66</td>
              <td>看望 </td>
              <td> </td>
              <td> </td>
              <td>赶忙</td>
              <td>看望</td>
              <td>礼物 </td>
              <td> </td>
            </tr>
            <tr>
              <td>67</td>
              <td>逮捕 </td>
              <td> </td>
              <td> </td>
              <td>地板</td>
              <td>罪犯</td>
              <td>逮捕 </td>
              <td> </td>
            </tr>
            <tr>
              <td>68</td>
              <td>骑 </td>
              <td> </td>
              <td> </td>
              <td>骑</td>
              <td>轮</td>
              <td>秋 </td>
              <td> </td>
            </tr>
            <tr>
              <td>69</td>
              <td>踢 </td>
              <td> </td>
              <td> </td>
              <td>扔</td>
              <td>踢</td>
              <td>兔 </td>
              <td> </td>
            </tr>
            <tr>
              <td>70</td>
              <td>表扬 </td>
              <td> </td>
              <td> </td>
              <td>表扬</td>
              <td>祝贺</td>
              <td>消亡 </td>
              <td> </td>
            </tr>
            <tr>
              <td>71</td>
              <td>奖励 </td>
              <td> </td>
              <td> </td>
              <td>剧烈</td>
              <td>惩罚</td>
              <td>奖励 </td>
              <td> </td>
            </tr>
            <tr>
              <td>72</td>
              <td>喂 </td>
              <td> </td>
              <td> </td>
              <td>喂</td>
              <td>费</td>
              <td>菜 </td>
              <td> </td>
            </tr>
            <tr>
              <td>73</td>
              <td>泼 </td>
              <td> </td>
              <td> </td>
              <td>撇</td>
              <td>泼</td>
              <td>趴 </td>
              <td> </td>
            </tr>
            <tr>
              <td>74</td>
              <td>询问 </td>
              <td> </td>
              <td> </td>
              <td>询问</td>
              <td>信任</td>
              <td>答案 </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">及物动词小计</td>
              <td colspan="2">/10</td>
              <td colspan="4">正确率 =　 正确确认数（）/ 需确认数（）</td>
            </tr>
          </tbody>
        </table>

        <h4>表 E　对证命名错误分析表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 7%; height: 18px;" rowspan="2">序号</th>
              <th style="width: 7%; height: 18px;" rowspan="2">项目</th>
              <th style="width: 36%; height: 18px;" colspan="6"> 词汇</th>
              <th style="width: 23%; height: 18px;" colspan="3"> 讲解</th>
              <th style="width: 21%; height: 18px;" colspan="3">其他   </th>
              <th style="width: 6%; height: 18px;" rowspan="2">合计</th>
            </tr>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 7%; height: 18px;"> 语义相关</th>
              <th style="width: 7%; height: 18px;">语义无关 </th>
              <th style="width: 6%; height: 18px;">音近假词 </th>
              <th style="width: 6%; height: 18px;">音近真词  </th>
              <th style="width: 6%; height: 18px;">假词 </th>
              <th style="width: 6%; height: 18px;">词类转换 </th>
              <th style="width: 6%; height: 18px;">语义关联 </th>
              <th style="width: 10%; height: 18px;"> 语法混乱/假词</th>
              <th style="width: 6%; height: 18px;"> 无用语</th>
              <th style="width: 6%; height: 18px;"> 视觉识别</th>
              <th style="width: 6%; height: 18px;"> 不知</th>
              <th style="width: 6%; height: 18px;"> 不可分类</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="lian_xi">练习1</td>
              <td> 刀</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="15"> </td>
            </tr>
            <tr>
              <td>1</td>
              <td>青蛙</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>2</td>
              <td>骆驼</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>3</td>
              <td>大象</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>4</td>
              <td>熊</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>5</td>
              <td>兔子 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>6</td>
              <td>蛇 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>7</td>
              <td>老虎</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>8</td>
              <td>松鼠</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">动物小计 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>9</td>
              <td>帽子</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>10</td>
              <td>手套 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>11</td>
              <td>裤子</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>12</td>
              <td>鞋</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>13</td>
              <td>衬衫 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>14</td>
              <td>裙子</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>15</td>
              <td>袜子</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>16</td>
              <td>腰带</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">服装小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>17</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>18</td>
              <td>膝盖</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>19</td>
              <td>耳朵</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>20</td>
              <td>眉毛</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>21</td>
              <td>舌头</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>22</td>
              <td>脖子</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>23</td>
              <td>牙齿</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>24</td>
              <td>肩膀</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2"> 身体小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>25</td>
              <td>苹果</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>26</td>
              <td>玉米</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>27</td>
              <td>葡萄</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>28</td>
              <td>辣椒</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>29</td>
              <td>西瓜</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>30</td>
              <td>白菜</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>31</td>
              <td>梨</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>32</td>
              <td>花生</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">  果蔬小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>33</td>
              <td>手表 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>34</td>
              <td>眼镜</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>35</td>
              <td>筷子</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>36</td>
              <td>被子</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>37</td>
              <td>毛巾</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>38</td>
              <td>锅</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>39</td>
              <td>钥匙</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>40</td>
              <td> 桶</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">  工具小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>41</td>
              <td>红</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>42</td>
              <td>绿</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>43</td>
              <td>黄</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>44</td>
              <td>粉红</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>45</td>
              <td>白</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>46</td>
              <td>蓝</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>47</td>
              <td>黑</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>48</td>
              <td>紫</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">颜色小计 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>49</td>
              <td>熨斗</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>50</td>
              <td>积木</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>51</td>
              <td>拖把</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>52</td>
              <td>古筝</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>53</td>
              <td>掸子</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>54</td>
              <td>飞镖</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>55</td>
              <td>高跷</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>56</td>
              <td>滑板</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>57</td>
              <td>窗花</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>58</td>
              <td>浴缸</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">低频名词小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>练习2</td>
              <td>推</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="15"> </td>
            </tr>
            <tr>
              <td>59</td>
              <td>摔</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>60</td>
              <td>睡觉</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>61</td>
              <td>醉</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>62</td>
              <td>洗澡</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>63</td>
              <td>跪</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>64</td>
              <td>游泳</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">不及物动词小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>65</td>
              <td>剪</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>66</td>
              <td>看望</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>67</td>
              <td>逮捕</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>68</td>
              <td>骑</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>69</td>
              <td>踢</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>70</td>
              <td>表扬</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>71</td>
              <td>奖励</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>72</td>
              <td>喂</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>73</td>
              <td>泼</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>74</td>
              <td>询问</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">及物动词小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">总计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
          </tbody>
        </table>

        <h4>表 F　听觉理解评分表</h4>
        <div style="display: inline-block; width: 48%;">
          <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
            <thead>
              <tr class="rtable-header" style="height: 18px;">
                <th style="width: 33.33%; height: 18px;">序号</th>
                <th style="width: 33.33%; height: 18px;">项目</th>
                <th style="width: 33.33%; height: 18px;">反应类别</th>
              </tr>
            </thead>
            <tbody>
              <tr style="height: 36px;">
                <td class="lian_xi" style="width: 17%; height: 36px;">练习1</td>
                <td style="width: 18%; height: 36px;">&nbsp;老鼠</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="height: 36px;" colspan="3">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">1</td>
                <td style="width: 18%; height: 36px;">&nbsp;兔子</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">2</td>
                <td style="width: 18%; height: 36px;">&nbsp;蛇</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">3</td>
                <td style="width: 18%; height: 36px;">&nbsp;青蛙</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">4</td>
                <td style="width: 18%; height: 36px;">&nbsp;大象</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">5</td>
                <td style="width: 18%; height: 36px;">&nbsp;骆驼</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">动物小计</td>
                <td style="width: 160.709%; height: 36px;">/5</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">6</td>
                <td style="width: 18%; height: 36px;">&nbsp;鞋</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">7</td>
                <td style="width: 18%; height: 36px;">&nbsp;裙子</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">8</td>
                <td style="width: 18%; height: 36px;">&nbsp;裤子</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">9</td>
                <td style="width: 18%; height: 36px;">&nbsp;袜子</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">10</td>
                <td style="width: 18%; height: 36px;">&nbsp;帽子</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">服装小计</td>
                <td style="width: 160.709%; height: 36px;">/5</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">11</td>
                <td style="width: 18%; height: 36px;">&nbsp;下巴</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">12</td>
                <td style="width: 18%; height: 36px;">&nbsp;肩膀</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">13</td>
                <td style="width: 18%; height: 36px;">&nbsp;舌头</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">14</td>
                <td style="width: 18%; height: 36px;">&nbsp;耳朵</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">15</td>
                <td style="width: 18%; height: 36px;">&nbsp;眉毛</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">身体小计</td>
                <td style="width: 160.709%; height: 36px;">/5</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">16</td>
                <td style="width: 18%; height: 36px;">&nbsp;葡萄</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">17</td>
                <td style="width: 18%; height: 36px;">&nbsp;玉米</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">18</td>
                <td style="width: 18%; height: 36px;">&nbsp;西瓜</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">19</td>
                <td style="width: 18%; height: 36px;">&nbsp;梨</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">20</td>
                <td style="width: 18%; height: 36px;">&nbsp;白菜</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">果蔬小计</td>
                <td style="width: 160.709%; height: 36px;">/5</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">21</td>
                <td style="width: 18%; height: 36px;">&nbsp;锅</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">22</td>
                <td style="width: 18%; height: 36px;">&nbsp;钥匙</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">23</td>
                <td style="width: 18%; height: 36px;">&nbsp;桶</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">24</td>
                <td style="width: 18%; height: 36px;">&nbsp;眼镜</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">25</td>
                <td style="width: 18%; height: 36px;">筷子&nbsp;</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">工具小计</td>
                <td style="width: 160.709%; height: 36px;">/5</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="display: inline-block; width: 48%;">
          <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
            <thead>
              <tr class="rtable-header" style="height: 18px;">
                <th style="width: 33.33%; height: 18px;">序号</th>
                <th style="width: 33.33%; height: 18px;">项目</th>
                <th style="width: 33.33%; height: 18px;">反应类别</th>
              </tr>
            </thead>
            <tbody>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">26</td>
                <td style="width: 18%; height: 36px;">&nbsp;红色</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">27</td>
                <td style="width: 18%; height: 36px;">&nbsp;黄色</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">28</td>
                <td style="width: 18%; height: 36px;">&nbsp;蓝色</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">29</td>
                <td style="width: 18%; height: 36px;">&nbsp;绿色</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">30</td>
                <td style="width: 18%; height: 36px;">&nbsp;黑色</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">颜色小计</td>
                <td style="width: 160.709%; height: 36px;">/5</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">31</td>
                <td style="width: 18%; height: 36px;">&nbsp;高跷</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">32</td>
                <td style="width: 18%; height: 36px;">&nbsp;滑板</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">33</td>
                <td style="width: 18%; height: 36px;">&nbsp;熨斗</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">34</td>
                <td style="width: 18%; height: 36px;">&nbsp;窗花</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">35</td>
                <td style="width: 18%; height: 36px;">&nbsp;浴缸</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">低频名词小计</td>
                <td style="width: 160.709%; height: 36px;">/5</td>
              </tr>
              <tr style="height: 36px;">
                <td class="lian_xi" style="width: 17%; height: 36px;">练习2</td>
                <td style="width: 18%; height: 36px;">&nbsp;坐</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="height: 36px;" colspan="3">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">36</td>
                <td style="width: 18%; height: 36px;">&nbsp;睡觉</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">37</td>
                <td style="width: 18%; height: 36px;">&nbsp;跪</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">38</td>
                <td style="width: 18%; height: 36px;">&nbsp;洗澡</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">39</td>
                <td style="width: 18%; height: 36px;">&nbsp;醉</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">40</td>
                <td style="width: 18%; height: 36px;">&nbsp;游泳</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">不及物动词小计</td>
                <td style="width: 160.709%; height: 36px;">/5</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">41</td>
                <td style="width: 18%; height: 36px;">&nbsp;剪</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">42</td>
                <td style="width: 18%; height: 36px;">&nbsp;看望</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">43</td>
                <td style="width: 18%; height: 36px;">&nbsp;逮捕</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">44</td>
                <td style="width: 18%; height: 36px;">&nbsp;踢</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">45</td>
                <td style="width: 18%; height: 36px;">&nbsp;表扬</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">46</td>
                <td style="width: 18%; height: 36px;">&nbsp;骑</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">47</td>
                <td style="width: 18%; height: 36px;">&nbsp;喂</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">48</td>
                <td style="width: 18%; height: 36px;">&nbsp;奖励</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">49</td>
                <td style="width: 18%; height: 36px;">&nbsp;泼</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 36px;">
                <td style="width: 17%; height: 36px;">50</td>
                <td style="width: 18%; height: 36px;">&nbsp;询问</td>
                <td style="width: 160.709%; height: 36px;">&nbsp;</td>
              </tr>
              <tr style="height: 72px;">
                <td style="width: 35%; height: 18px;" colspan="2">及物动词小计</td>
                <td style="width: 160.709%; height: 36px;">/5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>表 G　语义关联评分表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 20%; height: 18px;">序号</th>
              <th style="width: 20%; height: 18px;" colspan="2">项目</th>
              <th style="width: 20%; height: 18px;">标准答案</th>
              <th style="width: 20%; height: 18px;">反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 36px;">
              <td class="lian_xi" style="width: 17%; height: 36px;">练习1</td>
              <td style="width: 18%; height: 36px;">&nbsp;毛衣 / 毯子&nbsp;</td>
              <td style="width: 19%; height: 36px;">&nbsp;毛衣 / 枕头&nbsp;</td>
              <td style="height: 36px;">毛衣 / 毯子</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td class="lian_xi" style="width: 17%; height: 36px;">练习2</td>
              <td style="width: 18%; height: 36px;">&nbsp;毛衣 / 柜子&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">毛衣 / 书架&nbsp;</td>
              <td style="height: 36px;">毛衣 / 柜子&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td class="lian_xi" style="width: 17%; height: 36px;">练习3</td>
              <td style="width: 18%; height: 36px;">&nbsp;毛衣 / 磁铁&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">毛衣 / 裙子&nbsp;</td>
              <td style="height: 36px;">毛衣 / 裙子&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="height: 36px;" colspan="5">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">1</td>
              <td style="width: 18%; height: 36px;">&nbsp;骆驼 / 书桌&nbsp;</td>
              <td style="width: 19%; height: 36px;">&nbsp;骆驼 / 三轮车&nbsp;</td>
              <td style="height: 36px;">骆驼 / 三轮车&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">2</td>
              <td style="width: 18%; height: 36px;">&nbsp;兔子 / 萝卜&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">兔子 / 肉&nbsp;</td>
              <td style="height: 36px;">兔子 / 萝卜&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">3</td>
              <td style="width: 18%; height: 36px;">&nbsp;老鼠 / 钉子&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">老鼠 / 花生&nbsp;</td>
              <td style="fheight: 36px;">&nbsp;老鼠 / 花生</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">4</td>
              <td style="width: 18%; height: 36px;">&nbsp;碗 / 锅&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">&nbsp;碗 / 铅笔</td>
              <td style="height: 36px;">&nbsp;碗 / 锅</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">5</td>
              <td style="width: 18%; height: 36px;">&nbsp;松鼠 / 鸡蛋&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">松鼠 / 核桃&nbsp;</td>
              <td style="height: 36px;">松鼠 / 核桃</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">6</td>
              <td style="width: 18%; height: 36px;">骆驼 / 金字塔&nbsp;</td>
              <td style="width: 19%; height: 36px;">骆驼 / 东方明珠塔&nbsp;&nbsp;</td>
              <td style="fheight: 36px;">&nbsp;骆驼 / 金字塔</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">7</td>
              <td style="width: 18%; height: 36px;">&nbsp;剪刀 / 纸&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">剪刀 / 木头&nbsp;</td>
              <td style="height: 36px;">&nbsp;剪刀 / 纸&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">8</td>
              <td style="width: 18%; height: 36px;">碗 / 水槽&nbsp;</td>
              <td style="width: 19%; height: 36px;">&nbsp;碗 / 床&nbsp;</td>
              <td style="height: 36px;">&nbsp;碗 / 水槽</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">9</td>
              <td style="width: 18%; height: 36px;">眼镜 / 铅笔盒&nbsp;</td>
              <td style="width: 19%; height: 36px;">眼镜 / 眼镜盒&nbsp;&nbsp;</td>
              <td style="height: 36px;">眼镜 / 眼镜盒&nbsp;&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">10</td>
              <td style="width: 18%; height: 36px;">老鼠 / 垃圾箱&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">&nbsp;老鼠 / 鸟笼</td>
              <td style="height: 36px;">老鼠 / 垃圾箱&nbsp;&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">11</td>
              <td style="width: 18%; height: 36px;">&nbsp;锯子 / 木头&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">锯子 / 面包&nbsp;</td>
              <td style="height: 36px;">锯子 / 木头&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">12</td>
              <td style="width: 18%; height: 36px;">&nbsp;松鼠 / 树&nbsp;</td>
              <td style="width: 19%; height: 36px;">松鼠 / 氢气球&nbsp;&nbsp;</td>
              <td style="height: 36px;">松鼠 / 树&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">13</td>
              <td style="width: 18%; height: 36px;">&nbsp;剪刀 / 保险箱&nbsp;</td>
              <td style="width: 19%; height: 36px;">剪刀 / 桌子&nbsp;&nbsp;</td>
              <td style="height: 36px;">&nbsp;剪刀 / 桌子</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">14</td>
              <td style="width: 18%; height: 36px;">眼镜 / 耳朵&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">&nbsp;眼镜 / 眼睛</td>
              <td style="height: 36px;">眼镜 / 眼睛&nbsp;&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">15</td>
              <td style="width: 18%; height: 36px;">锯子 / 锅&nbsp;</td>
              <td style="width: 19%; height: 36px;">锯子 / 斧头&nbsp;</td>
              <td style="height: 36px;">锯子 / 斧头&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">16</td>
              <td style="width: 18%; height: 36px;">兔子 / 兔窝&nbsp;&nbsp;</td>
              <td style="width: 19%; height: 36px;">兔子 / 鸟笼&nbsp;</td>
              <td style="height: 36px;">&nbsp;兔子 / 兔窝&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 18px;">
              <td style="width: 35%; height: 18px;" colspan="2">动物小计</td>
              <td style="width: 19%; height: 18px;">/8</td>
              <td style="width: 21.2915%; height: 36px;" rowspan="2">合计</td>
              <td style="width: 160.709%; height: 36px;" rowspan="2">/16</td>
            </tr>
            <tr style="height: 18px;">
              <td style="width: 35%; height: 18px;" colspan="2">工具小计</td>
              <td style="width: 19%; height: 18px;">/8</td>
            </tr>
          </tbody>
        </table>

        <h4>表 H　假词复述评分表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 20%; height: 18px;">序号</th>
              <th style="width: 20%; height: 18px;">项目</th>
              <th style="width: 30%; height: 18px;">转写错误反应</th>
              <th style="width: 300%; height: 18px;">反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 36px;">
              <td class="lian_xi" style="width: 17%; height: 36px;">练习1</td>
              <td style="width: 18%; height: 36px;">祛 / 候</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="height: 36px;" colspan="4">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">1</td>
              <td style="width: 18%; height: 36px;">&nbsp;铁 / 日</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">2</td>
              <td style="width: 18%; height: 36px;">&nbsp;过 / 开</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">3</td>
              <td style="width: 18%; height: 36px;">&nbsp;合 / 眯</td>
              <td style="fheight: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">4</td>
              <td style="width: 18%; height: 36px;">&nbsp;清 / 朵</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">5</td>
              <td style="width: 18%; height: 36px;">啤 / 然&nbsp;</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">6</td>
              <td style="width: 18%; height: 36px;">&nbsp;倭 / 见</td>
              <td style="fheight: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">7</td>
              <td style="width: 18%; height: 36px;">&nbsp;沮 / 骈</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">8</td>
              <td style="width: 18%; height: 36px;">&nbsp;礁 / 氓</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 18px;">
              <td style="width: 35%; height: 18px;" colspan="3">合计</td>
              <td style="width: 160.709%; height: 36px;">/8</td>
            </tr>
          </tbody>
        </table>

        <h4>表 I　真词复述评分表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 20%; height: 18px;">序号</th>
              <th style="width: 20%; height: 18px;">项目</th>
              <th style="width: 30%; height: 18px;">转写错误反应</th>
              <th style="width: 300%; height: 18px;">反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 36px;">
              <td class="lian_xi" style="width: 17%; height: 36px;">练习1</td>
              <td style="width: 18%; height: 36px;">地 / 点</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="height: 36px;" colspan="4">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">1</td>
              <td style="width: 18%; height: 36px;">蝴 / 蝶</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">2</td>
              <td style="width: 18%; height: 36px;">蚂 / 蟥</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">3</td>
              <td style="width: 18%; height: 36px;">咳 / 嗽</td>
              <td style="fheight: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">4</td>
              <td style="width: 18%; height: 36px;">撺 / 掇</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">5</td>
              <td style="width: 18%; height: 36px;">菊 / 花</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">6</td>
              <td style="width: 18%; height: 36px;">樟 / 木</td>
              <td style="fheight: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">7</td>
              <td style="width: 18%; height: 36px;">孵 / 化</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">8</td>
              <td style="width: 18%; height: 36px;">捧 / 场</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">9</td>
              <td style="width: 18%; height: 36px;">手 / 工</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">10</td>
              <td style="width: 18%; height: 36px;">白 / 水</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">11</td>
              <td style="width: 18%; height: 36px;">转 / 动</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">12</td>
              <td style="width: 18%; height: 36px;">风 / 干</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">13</td>
              <td style="width: 18%; height: 36px;">海 / 湾</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">14</td>
              <td style="width: 18%; height: 36px;">马 / 驹</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">15</td>
              <td style="width: 18%; height: 36px;">分 / 泌</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 17%; height: 36px;">16</td>
              <td style="width: 18%; height: 36px;">打 / 嗝</td>
              <td style="height: 36px;">&nbsp;</td>
              <td style="width: 160.709%; height: 36px;">&nbsp;</td>
            </tr>
            <tr style="height: 18px;">
              <td style="width: 35%; height: 18px;" colspan="3">合计</td>
              <td style="width: 160.709%; height: 36px;">/16</td>
            </tr>
          </tbody>
        </table>

        <h4>表 X　命名分量表计分汇总表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th colspan="2">语音认知能力</th>
              <th colspan="3">语音分析能力</th>
              <th colspan="3">词汇加工能力</th>
              <th colspan="5">语义加工能力</th>
              <th colspan="2">认知能力</th>
            </tr>
            <tr class="rtable-header" style="height: 18px;">
              <th> 测验名称</th>
              <th>计分项目 </th>
              <th>语音解码</th>
              <th>声调解码</th>
              <th>语音输入输出</th>
              <th>听觉词汇理解</th>
              <th>语音词汇产出</th>
              <th>低频词</th>
              <th>名词分类</th>
              <th>生命度</th>
              <th>名动比</th>
              <th>语义关联</th>
              <th>动词论元</th>
              <th>视觉</th>
              <th>短记 </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="4">听觉辨识（表 A）    </td>
              <td>相同</td>
              <td>/8</td>
              <td>/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>声调不同</td>
              <td>/6 </td>
              <td>/6 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>声母不同</td>
              <td>/4 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>韵母不同</td>
              <td>/4 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td> 声调理解（表 B）</td>
              <td>正确合计</td>
              <td> </td>
              <td> /12</td>
              <td> </td>
              <td>/12 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td rowspan="2">  听觉词汇判断<br />（表 C）</td>
              <td>假词小计</td>
              <td>/8 </td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>真词小计</td>
              <td>/8 </td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td rowspan="10">对证命名<br />( 表 D)</td>
              <td>动物小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td>/8 </td>
              <td>/8 </td>
              <td>/8 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>果蔬小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td>/8 </td>
              <td>/8 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>服装小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td>/8</td>
              <td>/8</td>
              <td>/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>工具小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td>/8</td>
              <td>/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>身体小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>颜色小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>低频小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/10</td>
              <td>/10</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>不及小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/6</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/6</td>
              <td> </td>
              <td>/6</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>及动小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/10</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/10</td>
              <td> </td>
              <td>/10</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>听觉确认正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td rowspan="9">听觉理解（表 F）</td>
              <td>动物小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td>/5</td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>果蔬小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>服装小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td>/5</td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td> 工具小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>身体小计 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>颜色小计 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>低频小计 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>不及小计 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td>/5</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>及动小计 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/10 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/10 </td>
              <td> </td>
              <td>/10 </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td rowspan="2">语义关联（表 G）  </td>
              <td>动物小计 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>工具小计 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td> 假词复述（表 H）</td>
              <td>合计</td>
              <td>/8</td>
              <td> </td>
              <td>/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/8</td>
            </tr>
            <tr>
              <td> 真词复述（表 I）</td>
              <td>合计</td>
              <td> </td>
              <td> </td>
              <td>/16</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>/16</td>
            </tr>
          </tbody>
        </table>

        <h4>表 Z　语言认知能力评估表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 13%;"> 语言加工能力</th>
              <th style="width: 10%;"> </th>
              <th style="width: 10%;"> 原始得分</th>
              <th style="width: 10%;"> 正确率</th>
              <th style="width: 54%;"> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 13%;" rowspan="3">语音分析能力   </td>
              <td style="width: 10%;"> 语音解码</td>
              <td style="width: 10%;"> /46</td>
              <td style="width: 10%;">% </td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;"> 声调解码</td>
              <td style="width: 10%;"> /26</td>
              <td style="width: 10%;"> %</td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;">听觉输入到语音输出 </td>
              <td style="width: 10%;">/40 </td>
              <td style="width: 10%;">% </td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 13%;" rowspan="3">词汇加工能力   </td>
              <td style="width: 10%;">听觉词汇理解 </td>
              <td style="width: 10%;">/70 </td>
              <td style="width: 10%;"> %</td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;"> 语音词汇产出</td>
              <td style="width: 10%;">/74</td>
              <td style="width: 10%;">% </td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;">低频词提取 </td>
              <td style="width: 10%;">/15 </td>
              <td style="width: 10%;">% </td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 13%;" rowspan="5">语义加工能力  </td>
              <td style="width: 10%;">名词范畴分类</td>
              <td style="width: 10%;">/78</td>
              <td style="width: 10%;">%</td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;">名词生命度</td>
              <td style="width: 10%;">/52</td>
              <td style="width: 10%;">%</td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;">名词动词范畴分离</td>
              <td style="width: 10%;" colspan="2">/26： /31</td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;">语义关联 </td>
              <td style="width: 10%;">/ 16</td>
              <td style="width: 10%;">% </td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;">动词论元结构 </td>
              <td style="width: 10%;">/16 </td>
              <td style="width: 10%;">% </td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 13%;" rowspan="2">认知能力 </td>
              <td style="width: 10%;">视觉感知物体能力 </td>
              <td style="width: 10%;"> </td>
              <td style="width: 10%;">% </td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;">听觉短时记忆</td>
              <td style="width: 10%;">/24</td>
              <td style="width: 10%;">%</td>
              <td style="width: 54%;"> </td>
            </tr>
          </tbody>
        </table>

        <h4>表 K　动词命名评分表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 15%; height: 18px;">序号</th>
              <th style="width: 15%; height: 18px;">项目</th>
              <th style="width: 40%; height: 18px;">反应内容（10秒内）</th>
              <th style="width: 30%; height: 18px;">反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="lian_xi">练习1</td>
              <td>咬</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td>发抖</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="4"> </td>
            </tr>
            <tr>
              <td>1</td>
              <td>睡觉</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>2</td>
              <td>跪</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>3</td>
              <td>蹲</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>4</td>
              <td>游泳</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>5</td>
              <td>醉</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>6</td>
              <td>洗澡</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">一元动词小计</td>
              <td> </td>
              <td>正确次数  /6  正确率</td>
            </tr>
            <tr>
              <td>7</td>
              <td>骑</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>8</td>
              <td>表扬</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>9</td>
              <td>剪</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>10</td>
              <td>看望</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>11</td>
              <td>逮捕</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>12</td>
              <td>踢</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">二元动词小计</td>
              <td> </td>
              <td>正确次数  /6  正确率</td>
            </tr>
            <tr>
              <td>13</td>
              <td>赠送 </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>14</td>
              <td> 给</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">    强显性三元 (xyz) 小计</td>
              <td> </td>
              <td>正确次数  /2  正确率 </td>
            </tr>
            <tr>
              <td>15</td>
              <td>  奖励</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>16</td>
              <td>  喂</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">中显性三元 (xy) 小计</td>
              <td> </td>
              <td>正确次数  /2  正确率 </td>
            </tr>
            <tr>
              <td>17</td>
              <td>泼</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>18</td>
              <td>卖</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">  中显性三元 (xz) 小计</td>
              <td> </td>
              <td>正确次数  /2  正确率 </td>
            </tr>
            <tr>
              <td>19</td>
              <td>询问 </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>20</td>
              <td> 教</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2">  弱显性三元 (xy/z) 小计</td>
              <td> </td>
              <td> 正确次数  /2  正确率</td>
            </tr>
            <tr>
              <td colspan="2">  一元动词合计</td>
              <td>正确次数  /6</td>
              <td>正确率</td>
            </tr>
            <tr>
              <td colspan="2">  二元动词合计</td>
              <td>正确次数  /6</td>
              <td>正确率</td>
            </tr>
            <tr>
              <td colspan="2">  三元动词合计</td>
              <td>正确次数  /8 </td>
              <td>正确率</td>
            </tr>
            <tr>
              <td colspan="2"> 总计</td>
              <td>正确次数  /20</td>
              <td>正确率</td>
            </tr>
          </tbody>
        </table>

        <h4>表 L　动词理解评分表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 12%; height: 18px;">序号</th>
              <th style="width: 12%; height: 18px;">目标项</th>
              <th style="width: 12%; height: 18px;"> 同类干扰项</th>
              <th style="width: 24%; height: 18px;" colspan="2">非同类干扰项目  </th>
              <th style="width: 40%; height: 18px;">反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="lian_xi">练习1</td>
              <td>咬</td>
              <td>推 </td>
              <td>坐 </td>
              <td>投 </td>
              <td> </td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td>发抖</td>
              <td>跑步 </td>
              <td>搬 </td>
              <td>喝 </td>
              <td> </td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="6"> </td>
            </tr>
            <tr>
              <td>1</td>
              <td>睡觉</td>
              <td>洗澡</td>
              <td>批评</td>
              <td>盗窃</td>
              <td> </td>
            </tr>
            <tr>
              <td>2</td>
              <td>跪</td>
              <td>醉</td>
              <td>背</td>
              <td>罚</td>
              <td> </td>
            </tr>
            <tr>
              <td>3</td>
              <td>蹲</td>
              <td>跪</td>
              <td>追</td>
              <td>回答</td>
              <td> </td>
            </tr>
            <tr>
              <td>4</td>
              <td>游泳</td>
              <td>睡觉 </td>
              <td>埋葬</td>
              <td>指挥</td>
              <td> </td>
            </tr>
            <tr>
              <td>5</td>
              <td>醉</td>
              <td> 蹲  </td>
              <td>泼</td>
              <td>赏</td>
              <td> </td>
            </tr>
            <tr>
              <td>6</td>
              <td>洗澡</td>
              <td> 游泳 </td>
              <td>撞</td>
              <td>回答</td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="5">一元小计   </td>
              <td>正确次数  /6  正确率</td>
            </tr>
            <tr>
              <td>7</td>
              <td>骑</td>
              <td> 踢</td>
              <td>爬 </td>
              <td>泼 </td>
              <td> </td>
            </tr>
            <tr>
              <td>8</td>
              <td>表扬</td>
              <td>逮捕 </td>
              <td>起床 </td>
              <td>罚 </td>
              <td> </td>
            </tr>
            <tr>
              <td>9</td>
              <td>剪</td>
              <td>骑 </td>
              <td>摔 </td>
              <td>抢 </td>
              <td> </td>
            </tr>
            <tr>
              <td>10</td>
              <td>看望</td>
              <td>表扬 </td>
              <td>生病 </td>
              <td>咳嗽 </td>
              <td> </td>
            </tr>
            <tr>
              <td>11</td>
              <td>逮捕</td>
              <td>看望 </td>
              <td>盗窃 </td>
              <td>赏 </td>
              <td> </td>
            </tr>
            <tr>
              <td>12</td>
              <td>踢</td>
              <td>剪 </td>
              <td>抢 </td>
              <td>趴 </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="5">二元小计   </td>
              <td>正确次数  /6  正确率</td>
            </tr>
            <tr>
              <td>13</td>
              <td>赠送 </td>
              <td> 给</td>
              <td> 咳嗽</td>
              <td>批评 </td>
              <td> </td>
            </tr>
            <tr>
              <td>14</td>
              <td> 给</td>
              <td>赠送 </td>
              <td>背 </td>
              <td>飞 </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="5">    强显性三元 (xyz) 小计   </td>
              <td>正确次数  /2  正确率 </td>
            </tr>
            <tr>
              <td>15</td>
              <td>  奖励</td>
              <td>喂 </td>
              <td> 生病</td>
              <td>指挥 </td>
              <td> </td>
            </tr>
            <tr>
              <td>16</td>
              <td>  喂</td>
              <td>奖励 </td>
              <td>刷 </td>
              <td>起床 </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="5">中显性三元 (xy) 小计   </td>
              <td>正确次数  /2  正确率 </td>
            </tr>
            <tr>
              <td>17</td>
              <td>泼</td>
              <td>卖 </td>
              <td>埋葬</td>
              <td>指挥 </td>
              <td> </td>
            </tr>
            <tr>
              <td>18</td>
              <td>卖</td>
              <td>泼 </td>
              <td>摔 </td>
              <td>飞 </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="5">  中显性三元 (xz) 小计   </td>
              <td>正确次数  /2  正确率 </td>
            </tr>
            <tr>
              <td>19</td>
              <td>询问 </td>
              <td>教 </td>
              <td>追 </td>
              <td>刷 </td>
              <td> </td>
            </tr>
            <tr>
              <td>20</td>
              <td> 教</td>
              <td>询问 </td>
              <td>撞 </td>
              <td>爬 </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="5">  弱显性三元 (xy/z) 小计   </td>
              <td> 正确次数  /2  正确率</td>
            </tr>
            <tr>
              <td colspan="5">  一元动词合计  </td>
              <td>正确次数  /6  正确率</td>
            </tr>
            <tr>
              <td colspan="5">  二元动词合计  </td>
              <td>正确次数  /6  正确率</td>
            </tr>
            <tr>
              <td colspan="5">  三元动词合计   </td>
              <td>正确次数  /8  正确率</td>
            </tr>
            <tr>
              <td colspan="5"> 总计  </td>
              <td>正确次数  /20  正确率</td>
            </tr>
          </tbody>
        </table>

        <h4>表 M　论元结构产出评分表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 6%; height: 18px;" rowspan="2">序号</th>
              <th style="width: 6%; height: 18px;" rowspan="2">项目</th>
              <th style="width: 24%; height: 18px;" colspan="4">参考答案论元结构 </th>
              <th style="width: 40%; height: 18px;" rowspan="2">反应内容 </th>
              <th style="width: 24%; height: 18px;" colspan="6" rowspan="2">圈出准确产出的成分、论元和词汇      </th>
            </tr>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 6%; height: 18px;">x</th>
              <th style="width: 6%; height: 18px;">V</th>
              <th style="width: 6%; height: 18px;">y</th>
              <th style="width: 6%; height: 18px;">z</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="lian_xi">练习1</td>
              <td>咬</td>
              <td>狗</td>
              <td>在咬</td>
              <td>猫</td>
              <td> </td>
              <td> </td>
              <td>x</td>
              <td>V</td>
              <td> </td>
              <td>z</td>
              <td> 论元</td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td>发抖</td>
              <td>女人</td>
              <td>投了</td>
              <td>男人</td>
              <td>票</td>
              <td> </td>
              <td>x</td>
              <td>V</td>
              <td>y</td>
              <td>z</td>
              <td> 论元</td>
              <td>词汇 </td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="13"> </td>
            </tr>
            <tr>
              <td>1</td>
              <td>睡觉</td>
              <td>女人</td>
              <td>睡觉了</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>x</td>
              <td>V</td>
              <td> </td>
              <td> </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>2</td>
              <td>跪</td>
              <td>男人</td>
              <td>跪着</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>x</td>
              <td>V</td>
              <td> </td>
              <td> </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>3</td>
              <td>蹲</td>
              <td>女孩</td>
              <td>蹲着 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>x</td>
              <td>V</td>
              <td> </td>
              <td> </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>4</td>
              <td>游泳</td>
              <td>女人</td>
              <td>在游泳 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>x</td>
              <td>V</td>
              <td> </td>
              <td> </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>5</td>
              <td>醉</td>
              <td>男人</td>
              <td>醉了 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>x</td>
              <td>V</td>
              <td> </td>
              <td> </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>6</td>
              <td>洗澡</td>
              <td>男孩 </td>
              <td>在洗澡</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>x</td>
              <td>V</td>
              <td> </td>
              <td> </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">一元小计    </td>
              <td> </td>
              <td>/6 </td>
              <td>/6 </td>
              <td> </td>
              <td> </td>
              <td> /6</td>
              <td>/6 </td>
            </tr>
            <tr>
              <td>论元和词汇同时正确</td>
              <td colspan="6">/6      </td>
            </tr>
            <tr>
              <td>7</td>
              <td>骑</td>
              <td>男孩</td>
              <td>在骑 </td>
              <td> </td>
              <td>车 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td> </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>8</td>
              <td>表扬</td>
              <td>女人</td>
              <td> 表扬了</td>
              <td> </td>
              <td>男孩 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td> </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>9</td>
              <td>剪</td>
              <td>女人</td>
              <td>在剪</td>
              <td> </td>
              <td>纸 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td> </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>10</td>
              <td>看望</td>
              <td>男人</td>
              <td>在看望 </td>
              <td> </td>
              <td>女人 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td> </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>11</td>
              <td>逮捕</td>
              <td>男人</td>
              <td>逮捕了 </td>
              <td> </td>
              <td>女人 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td> </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>12</td>
              <td>踢</td>
              <td>女孩</td>
              <td>踢了 </td>
              <td> </td>
              <td>男孩 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td> </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">二元小计   </td>
              <td> </td>
              <td>/6 </td>
              <td>/6</td>
              <td> </td>
              <td>/6 </td>
              <td>/6 </td>
              <td>/6 </td>
            </tr>
            <tr>
              <td> 论元和词汇同时正确</td>
              <td colspan="6">/6      </td>
            </tr>
            <tr>
              <td>13</td>
              <td>赠送 </td>
              <td> 女人</td>
              <td>赠送了</td>
              <td>男孩</td>
              <td>礼物 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>14</td>
              <td> 给</td>
              <td>男人 </td>
              <td>在给 </td>
              <td>女孩</td>
              <td>钱 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">    强显性三元 (xyz) 小计    </td>
              <td> </td>
              <td> /2</td>
              <td>/2 </td>
              <td> /2</td>
              <td>/2 </td>
              <td>/2 </td>
              <td>/2 </td>
            </tr>
            <tr>
              <td>论元和词汇同时正确 </td>
              <td colspan="6"> /2     </td>
            </tr>
            <tr>
              <td>15</td>
              <td>奖励</td>
              <td>女人</td>
              <td>奖励了 </td>
              <td>男孩 </td>
              <td> </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td> </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>15</td>
              <td>奖励</td>
              <td>女人</td>
              <td>奖励了 </td>
              <td>男孩 </td>
              <td>书</td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>16</td>
              <td>喂</td>
              <td>男人</td>
              <td>在喂 </td>
              <td>女孩 </td>
              <td> </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td> </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>16</td>
              <td>喂</td>
              <td>男人</td>
              <td>在喂 </td>
              <td>女孩 </td>
              <td>饭</td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">中显性三元 (xy) 小计    </td>
              <td> </td>
              <td> /2</td>
              <td> /2</td>
              <td>/2 </td>
              <td> /2</td>
              <td> /2</td>
              <td>/2 </td>
            </tr>
            <tr>
              <td>论元和词汇同时正确 </td>
              <td colspan="6">  /2    </td>
            </tr>
            <tr>
              <td>17</td>
              <td>泼</td>
              <td>女人</td>
              <td>泼了</td>
              <td> </td>
              <td>水 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td> </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>17</td>
              <td>泼</td>
              <td>女人</td>
              <td>泼了</td>
              <td>男人 </td>
              <td>水 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>18</td>
              <td>卖</td>
              <td>男人</td>
              <td>在卖</td>
              <td> </td>
              <td>西瓜 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td> </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>18</td>
              <td>卖</td>
              <td>男人</td>
              <td>在卖</td>
              <td>女孩 </td>
              <td>西瓜 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">  中显性三元 (xz) 小计    </td>
              <td> </td>
              <td> /2</td>
              <td> /2</td>
              <td> /2</td>
              <td> /2</td>
              <td>/2 </td>
              <td>/2 </td>
            </tr>
            <tr>
              <td>论元和词汇同时正确 </td>
              <td colspan="6"> /2     </td>
            </tr>
            <tr>
              <td>19</td>
              <td>询问</td>
              <td>男孩 </td>
              <td>在询问 </td>
              <td>女人 </td>
              <td> </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td> </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>19</td>
              <td>询问</td>
              <td>男孩 </td>
              <td>在询问 </td>
              <td> </td>
              <td>事情 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td> </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>19</td>
              <td>询问</td>
              <td>男孩 </td>
              <td>在询问 </td>
              <td>女人 </td>
              <td>事情 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>20</td>
              <td>教</td>
              <td>女人 </td>
              <td>在教 </td>
              <td>男孩 </td>
              <td> </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td> </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>20</td>
              <td>教</td>
              <td>女人 </td>
              <td>在教 </td>
              <td> </td>
              <td>字母 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td> </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td>20</td>
              <td>教</td>
              <td>女人 </td>
              <td>在教 </td>
              <td>男孩 </td>
              <td>字母 </td>
              <td> </td>
              <td>x </td>
              <td>V </td>
              <td>y </td>
              <td>z </td>
              <td>论元 </td>
              <td>词汇 </td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">  弱显性三元 (xy/z) 小计    </td>
              <td> </td>
              <td>/2 </td>
              <td>/2 </td>
              <td> /2</td>
              <td> /2</td>
              <td>/2 </td>
              <td>/2 </td>
            </tr>
            <tr>
              <td>论元和词汇同时正确 </td>
              <td colspan="6">/2      </td>
            </tr>
          </tbody>
        </table>

        <h4>表 N　论元结构产出合计表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 20%; height: 18px;"> </th>
              <th style="width: 20%; height: 18px;" colspan="4">参考答案论元结构 </th>
              <th style="width: 60%; height: 18px;" colspan="6">语句     </th>
            </tr>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 20%; height: 18px;"> </th>
              <th style="width: 5%; height: 18px;">x</th>
              <th style="width: 5%; height: 18px;">V</th>
              <th style="width: 5%; height: 18px;">y</th>
              <th style="width: 5%; height: 18px;">z</th>
              <th style="width: 10%; height: 18px;">论元完整数</th>
              <th style="width: 10%; height: 18px;">论元完整%</th>
              <th style="width: 10%; height: 18px;">词汇准确数</th>
              <th style="width: 10%; height: 18px;">词汇准确率</th>
              <th style="width: 10%; height: 18px;">论元∩词汇数</th>
              <th style="width: 10%; height: 18px;">论元∩词汇% </th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;">一元小计</td>
              <td style="height: 18px;">/6 </td>
              <td style="height: 18px;">/6 </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;">/6 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;">/6 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;">% </td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;">二元小计</td>
              <td style="height: 18px;">/6 </td>
              <td style="height: 18px;">/6 </td>
              <td style="height: 18px;">/6 </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;">/6 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;">/6 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;">% </td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;"> 强显性三元 (xyz)</td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;">% </td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;">中显性三元 (xy)</td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;">% </td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;">中显性三元 (xz)</td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;">% </td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;"> 弱显性三元 (xy/z)</td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;">/2 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;">% </td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;"> 三元小计</td>
              <td style="height: 18px;">/8 </td>
              <td style="height: 18px;">/8 </td>
              <td style="height: 18px;">/8 </td>
              <td style="height: 18px;">/8 </td>
              <td style="height: 18px;">/8 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;">/8 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;">% </td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;"> 合计 ( 一元＋二元＋三元 )</td>
              <td style="height: 18px;">/8 </td>
              <td style="height: 18px;">/8 </td>
              <td style="height: 18px;">/8 </td>
              <td style="height: 18px;">/8 </td>
              <td style="height: 18px;">/20 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;">/20 </td>
              <td style="height: 18px;">% </td>
              <td style="height: 18px;"> </td>
              <td style="height: 18px;">% </td>
            </tr>
          </tbody>
        </table>

        <h4>表 O　语句启动产出计分表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 10%; height: 18px;">序号</th>
              <th style="width: 10%; height: 18px;">句型</th>
              <th style="width: 20%; height: 18px;">启动句</th>
              <th style="width: 30%; height: 18px;">反应内容</th>
              <th style="width: 10%; height: 18px;">反应类别</th>
              <th style="width: 10%; height: 18px;"> 小计</th>
              <th style="width: 10%; height: 18px;"> 正确率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="lian_xi">练习1</td>
              <td class="lian_xi"> </td>
              <td style="text-align: left;"> 女人撞了男人。</td>
              <td style="text-align: left;">
                <em> 男人撞了女人。</em>
              </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td class="lian_xi"> </td>
              <td style="text-align: left;"> 咬小狗的小猫戴着帽子。</td>
              <td style="text-align: left;">
                <em> 咬小猫的小狗戴着帽子。</em>
              </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td class="lian_xi">练习3</td>
              <td class="lian_xi"> </td>
              <td style="text-align: left;"> 男人在指挥谁？</td>
              <td style="text-align: left;">
                <em> 女人在指挥谁？</em>
              </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr style="height: 18px;">
              <td style="text-align: left;" colspan="7">
                <em> </em>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td rowspan="4">主动句</td>
              <td style="text-align: left;"> 小猫在追小狗。</td>
              <td style="text-align: left;">
                <em> 小狗在追小猫。</em>
              </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>2</td>
              <td style="text-align: left;"> 男人批评了女孩。</td>
              <td style="text-align: left;">
                <em> 女人批评了男孩。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>3</td>
              <td style="text-align: left;"> 男孩推了女孩。</td>
              <td style="text-align: left;">
                <em> 女孩推了男孩。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>4</td>
              <td style="text-align: left;"> 女人在埋葬男人。</td>
              <td style="text-align: left;">
                <em> 男人在埋葬女人。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>5</td>
              <td rowspan="4">把字句</td>
              <td style="text-align: left;"> 女孩把男孩推倒了。</td>
              <td style="text-align: left;">
                <em> 男孩把女孩推倒了。</em>
              </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>6</td>
              <td style="text-align: left;"> 男人把女人埋葬了。</td>
              <td style="text-align: left;">
                <em> 女人把男人埋葬了。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>7</td>
              <td style="text-align: left;"> 小狗把小猫追上了。</td>
              <td style="text-align: left;">
                <em> 小猫把小狗追上了。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>8</td>
              <td style="text-align: left;"> 女人把男孩批评了。</td>
              <td style="text-align: left;">
                <em> 男人把女孩批评了。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>9</td>
              <td rowspan="4">被字句</td>
              <td style="text-align: left;">小狗被小猫追上了。</td>
              <td style="text-align: left;">
                <em>小猫被小狗追上了。</em>
              </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>10</td>
              <td style="text-align: left;">女孩被男孩推倒了。</td>
              <td style="text-align: left;">
                <em>男孩被女孩推倒了。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>11</td>
              <td style="text-align: left;">男孩被女人批评了。</td>
              <td style="text-align: left;">
                <em>女孩被男人批评了。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>12</td>
              <td style="text-align: left;">男人被女人埋葬了。</td>
              <td style="text-align: left;">
                <em>女人被男人埋葬了。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>13</td>
              <td rowspan="4">主语疑问句</td>
              <td style="text-align: left;">谁批评了女孩？</td>
              <td style="text-align: left;">
                <em>谁批评了男孩？</em>
              </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>14</td>
              <td style="text-align: left;">谁推了男孩？</td>
              <td style="text-align: left;">
                <em>谁推了女孩？</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>15</td>
              <td style="text-align: left;">谁在埋葬男人？</td>
              <td style="text-align: left;">
                <em>谁在埋葬女人？</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>16</td>
              <td style="text-align: left;">谁在追小狗？</td>
              <td style="text-align: left;">
                <em>谁在追小猫？</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>17</td>
              <td rowspan="4">宾语疑问句</td>
              <td style="text-align: left;">男人在埋葬谁？</td>
              <td style="text-align: left;">
                <em>女人在埋葬谁？</em>
              </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>18</td>
              <td style="text-align: left;">女人批评了谁？</td>
              <td style="text-align: left;">
                <em>男人批评了谁？</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>19</td>
              <td style="text-align: left;">男孩推了谁？</td>
              <td style="text-align: left;">
                <em>女孩推了谁？</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>20</td>
              <td style="text-align: left;">小狗在追谁？</td>
              <td style="text-align: left;">
                <em>小猫在追谁？</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>21</td>
              <td rowspan="4">主语从句</td>
              <td style="text-align: left;">批评女孩的男人戴着帽子。</td>
              <td style="text-align: left;">
                <em>批评男孩的女人戴着帽子。</em>
              </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>22</td>
              <td style="text-align: left;">推男孩的女孩戴着帽子。</td>
              <td style="text-align: left;">
                <em>推女孩的男孩戴着帽子。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>23</td>
              <td style="text-align: left;">追小狗的小猫戴着帽子。</td>
              <td style="text-align: left;">
                <em>追小猫的小狗戴着帽子。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>24</td>
              <td style="text-align: left;">埋葬男人的女人戴着帽子。</td>
              <td style="text-align: left;">
                <em>埋葬女人的男人戴着帽子。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>25</td>
              <td rowspan="4">宾语从句</td>
              <td style="text-align: left;">小猫追的小狗戴着帽子。</td>
              <td style="text-align: left;">
                <em>小狗追的小猫戴着帽子。</em>
              </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>26</td>
              <td style="text-align: left;">女人批评的男孩戴着帽子。</td>
              <td style="text-align: left;">
                <em>男人批评的女孩戴着帽子。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>27</td>
              <td style="text-align: left;">男人埋葬的女人戴着帽子。</td>
              <td style="text-align: left;">
                <em>女人埋葬的男人戴着帽子。</em>
              </td>
              <td> </td>
            </tr>
            <tr>
              <td>28</td>
              <td style="text-align: left;">男孩推的女孩戴着帽子。</td>
              <td style="text-align: left;">
                <em>女孩推的男孩戴着帽子。</em>
              </td>
              <td> </td>
            </tr>
          </tbody>
        </table>

        <h4>表 P　语句理解计分表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 10%; height: 18px;">序号</th>
              <th style="width: 10%; height: 18px;">句型</th>
              <th style="width: 30%; height: 18px;">测试句</th>
              <th style="width: 10%; height: 18px;">正确答案</th>
              <th style="width: 10%; height: 18px;">被试反应</th>
              <th style="width: 10%; height: 18px;">反应类别</th>
              <th style="width: 10%; height: 18px;"> 小计</th>
              <th style="width: 10%; height: 18px;"> 正确率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="lian_xi">练习1</td>
              <td class="lian_xi"> </td>
              <td>女人撞了男人。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td class="lian_xi"> </td>
              <td>咬小猫的小狗戴着帽子。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td class="lian_xi">练习3</td>
              <td class="lian_xi"> </td>
              <td>男人在指挥谁？</td>
              <td>1</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="8"> </td>
            </tr>
            <tr>
              <td>1</td>
              <td rowspan="4">主动句</td>
              <td>小猫在追小狗。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>2</td>
              <td>男人批评了女孩。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>3</td>
              <td>女孩推了男孩。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>4</td>
              <td>男人在埋葬女人。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>5</td>
              <td rowspan="4">把字句</td>
              <td>女孩把男孩推倒了。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>6</td>
              <td>女人把男人埋葬了。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>7</td>
              <td>小狗把小猫追上了。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>8</td>
              <td>男人把女孩批评了。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>9</td>
              <td rowspan="4">被字句</td>
              <td>小猫被小狗追上了。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>10</td>
              <td>女孩被男孩推倒了。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>11</td>
              <td>男孩被女人批评了。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>12</td>
              <td>女人被男人埋葬了。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>13</td>
              <td rowspan="4">主语疑问句</td>
              <td>谁批评了男孩？</td>
              <td>2</td>
              <td> </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>14</td>
              <td>谁推了男孩？</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>15</td>
              <td>谁在埋葬女人？</td>
              <td>2</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>16</td>
              <td>谁在追小狗？</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>17</td>
              <td rowspan="4">宾语疑问句</td>
              <td>男人在埋葬谁？</td>
              <td>1</td>
              <td> </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>18</td>
              <td>男人批评了谁？</td>
              <td>2</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>19</td>
              <td>女孩推了谁？</td>
              <td>2</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>20</td>
              <td>小狗在追谁？</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>21</td>
              <td rowspan="4">主语从句</td>
              <td>批评男孩的女人戴着帽子。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>22</td>
              <td>推女孩的男孩戴着帽子。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>23</td>
              <td>追小狗的小猫戴着帽子。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>24</td>
              <td>埋葬男人的女人戴着帽子。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>25</td>
              <td rowspan="4">宾语从句</td>
              <td>小狗追的小猫戴着帽子。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
              <td rowspan="4">/4</td>
              <td rowspan="4">%</td>
            </tr>
            <tr>
              <td>26</td>
              <td>女人批评的男孩戴着帽子。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>27</td>
              <td>男人埋葬的女人戴着帽子。</td>
              <td>1</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>28</td>
              <td>女孩推的男孩戴着帽子。</td>
              <td>2</td>
              <td> </td>
              <td> </td>
            </tr>
          </tbody>
        </table>

        <h4>表 V　《动词语句分量表》计分汇总表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 30%;" colspan="3">动词语句加工能力</th>
              <th style="width: 20%;" colspan="2">动词加工能力</th>
              <th style="width: 50%;" colspan="3">语法加工能力</th>
            </tr>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 20%;" colspan="2"> 测验名称</th>
              <th style="width: 12%;">计分项目 </th>
              <th style="width: 10%;">动词产出</th>
              <th style="width: 10%;">动词理解</th>
              <th style="width: 16%;">论元结构</th>
              <th style="width: 12%;">词汇插入</th>
              <th style="width: 20%;">句法结构分析及转换</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2" rowspan="3">动词命名</td>
              <td>一元动词正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>二元动词正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>三元动词正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2" rowspan="3">动词理解</td>
              <td>一元动词正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>二元动词正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>三元动词正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2" rowspan="6">论元结构产出</td>
              <td>一元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>二元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>三元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>一元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>二元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>三元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td rowspan="7">语句产出启动</td>
              <td rowspan="3">典型语序</td>
              <td>主动句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>主语疑问句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>宾语从句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td rowspan="4">非典型语序</td>
              <td>把字句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>被字句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>宾语疑问句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>主语从句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td rowspan="7">语句理解</td>
              <td rowspan="3">典型语序</td>
              <td>主动句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>主语疑问句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>宾语从句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td rowspan="4">非典型语序</td>
              <td>把字句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>被字句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>宾语疑问句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>主语从句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
          </tbody>
        </table>

        <h4>表 W　动词语句加工能力评估表</h4>
        <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="width: 13%;" colspan="2"> 动词语句加工能力 </th>
              <th style="width: 10%;"> 正确率</th>
              <th style="width: 54%;"> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 13%;" rowspan="2">动词   </td>
              <td style="width: 10%;">动词产出</td>
              <td style="width: 10%;">%</td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;">动词理解</td>
              <td style="width: 10%;">%</td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 13%;" rowspan="3">语法加工能力   </td>
              <td style="width: 10%;">论元结构</td>
              <td style="width: 10%;">%</td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;">词汇插入</td>
              <td style="width: 10%;">%</td>
              <td style="width: 54%;"> </td>
            </tr>
            <tr>
              <td style="width: 10%;">句法结构分析及转换</td>
              <td style="width: 10%;">%</td>
              <td style="width: 54%;"> </td>
            </tr>
          </tbody>
        </table>

        <div class="components-container" style='height:100vh'>
          <div class='chart-container'>
            <e-chart height='100%' width='100%' :options="dongci_bar_options"></e-chart>
          </div>
        </div>

<div>{{series}}</div>
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
<div>{{series}}</div>
<div>{{mystr}}</div>
  </div>
</template>

<script>
import { fetchList, createUser, deleteUser } from '@/api/user'

import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'

import eChart from '@/components/Charts/eChart'

export default {
  name: 'table_user',
  directives: {
    waves
  },
  data() {
    return {
      series: [1, 2, 3],
      mystr: 'a',
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
      sortOptions: [
        { label: '按ID升序列', key: 'id,ASC' },
        { label: '按ID降序', key: 'id,DESC' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      tableKey: 0,
      dongci_bar_options: {
        title: {
          text: '动词语句加工能力'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %'
          },
          max: 100
        },
        yAxis: {
          type: 'category',
          data: ['句法结构分析及转换', '词汇插入', '论元结构', '动词理解', '动词产出']
        },
        series: [
          {
            name: '2012年',
            type: 'bar',
            data: [11, 22, 33, 44, 55]
          }
        ]
      }
    }
  },
  filters: {},
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
      this.series[2] = 5
      this.mystr = 'b'
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
      })
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
      createUser(user)
        .then(response => {
          // const data = response.data
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch(error => {
          this.$notify({
            title: '失败',
            message: '创建失败' + error.$message,
            type: 'fail',
            duration: 2000
          })
        })
    },
    update() {
      // this.series[1] = 10
      this.dongci_bar_options.series[0].data = [2, 4, 8, 33, 88]
      // this.mystr = 'tttttta'
      if (this.dongci_bar_options.series[0].data.length === 5) return
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
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  },
  components: { eChart }
}
</script>


<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/mixin.scss';
$table-header-bg: rgb(141, 179, 225);
$lian_xi: rgb(197, 217, 240);
$sheng_diao_bu_tong: rgb(229, 184, 183);
$sheng_mu_bu_tong: rgb(255, 229, 153);
$yun_mu_bu_tong: rgb(168, 208, 141);
$he_ji: rgb(0, 129, 204);

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

.yun_mu_bu_tong {
  background: $yun_mu_bu_tong;
}

.he_ji {
  background: $he_ji;
}

.chart-container {
  position: relative;
  width: 60%;
  height: 400px;
}
</style>
