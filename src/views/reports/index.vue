<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="被测人" v-model="listQuery.testee">
      </el-input>

      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="被测人">
        <template scope="scope">
          <el-button size="small" @click="showReport(scope.row)">{{scope.row.testee}}</el-button>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="测试人">
        <template scope="scope">
          <span>{{scope.row.tester}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="center" label="日期">
        <template scope="scope">
          <span>{{new Date(scope.row.miliTime)| parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="操作">
        <template scope="scope">
          <el-button size="small" @click="showReport(scope.row)">查看</el-button>
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
      <tr style="font-size: 20px; height: 38px; border: none;">
      <td style="text-align: center; width: 8.3333%; border: none;">&nbsp;</td>
      <td style="text-align: center; width: 8.3333%; border: none;">&nbsp;</td>
      <td style="text-align: center; width: 8.3333%; border: none;">&nbsp;</td>
      <td style="text-align: center; width: 8.3333%; border: none;">&nbsp;</td>
      <td style="text-align: center; width: 8.3333%; border: none;">&nbsp;</td>
      <td style="text-align: center; width: 8.3333%; border: none;">病</td>
      <td style="text-align: center; width: 8.3333%; border: none;">例</td>
      <td style="text-align: center; width: 8.3333%; border: none;">&nbsp;</td>
      <td style="text-align: center; width: 8.3333%; border: none;">&nbsp;</td>
      <td style="text-align: center; width: 8.3333%; border: none;">&nbsp;</td>
      <td style="text-align: center; width: 8.3333%; border: none;">&nbsp;</td>
      <td style="text-align: center; width: 8.3333%; border: none;">&nbsp;</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;">姓名</td>
      <td style="text-align: center;" colspan="4">{{temp.info.name}}</td>
      <td style="text-align: center;">性别</td>
      <td style="text-align: center;">{{gendar_texts[temp.info.gendar]}}</td>
      <td style="text-align: center;">利手</td>
      <td style="text-align: center;" colspan="4">{{handedness_texts[temp.info.handedness]}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;">民族</td>
      <td style="text-align: center;" colspan="4">{{temp.info.minzu}}</td>
      <td style="text-align: center;">&nbsp;日常口语</td>
      <td style="text-align: center;" colspan="2">{{temp.info.kouyu}}</td>
      <td style="text-align: center;" colspan="2">&nbsp;&nbsp;母语方言</td>
      <td style="text-align: center;" colspan="2">{{temp.info.muyu}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="2">&nbsp;施测时间&nbsp;</td>
      <td style="text-align: center;" colspan="4">{{temp.info.testTime}}</td>
      <td style="text-align: center;" colspan="2">出生日期</td>
      <td style="text-align: center;" colspan="4">{{temp.info.birthday}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;">&nbsp;教育程度</td>
      <td style="text-align: center;" colspan="6">{{education_texts[temp.info.education]}}</td>
      <td style="text-align: center;" colspan="2">当前/此前职业&nbsp;&nbsp;</td>
      <td style="text-align: center;" colspan="3">{{temp.info.occupy}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="3">&nbsp;是否熟练使用普通话&nbsp;&nbsp;</td>
      <td style="text-align: center;" colspan="4">{{yn_texts[temp.info.putonghua]}}</td>
      <td style="text-align: center;">婚姻状况&nbsp;</td>
      <td style="text-align: center;" colspan="4">{{marriage_texts[temp.info.married]}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;">&nbsp;家庭住址</td>
      <td style="text-align: center;" colspan="11">{{temp.info.address}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;">&nbsp;手机 / 电话</td>
      <td style="text-align: center;" colspan="4">{{temp.info.mobile}}</td>
      <td style="text-align: center;" colspan="2">&nbsp;&nbsp;电子邮箱</td>
      <td style="text-align: center;" colspan="5">{{temp.info.email}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;">&nbsp;临床诊断</td>
      <td style="text-align: center;" colspan="11">{{((zd) => { return (zd.naogeng===1?'脑梗死  &nbsp;&nbsp;&nbsp; ':'') + (zd.naochuxue===1?'脑出血   ':'') + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其他：  ' + zd.others})(temp.info.zhenduan)}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;">&nbsp;偏瘫与否</td>
      <td style="text-align: center;" colspan="4">{{yn_texts[temp.info.piantan]}}</td>
      <td style="text-align: center;">偏瘫体侧&nbsp;&nbsp;</td>
      <td style="text-align: center;" colspan="2">{{piantan_texts[temp.info.piantanSide]}}</td>
      <td style="text-align: center;" colspan="2">偏瘫严重程度&nbsp;&nbsp;</td>
      <td style="text-align: center;" colspan="2">{{temp.info.piantanDes}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;">&nbsp;发病日期</td>
      <td style="text-align: center;" colspan="4">{{temp.info.piantanTime}}</td>
      <td style="text-align: center;">&nbsp;病变部位</td>
      <td style="text-align: center;" colspan="6">{{temp.info.piantanPart}}</td>
      </tr>
      <tr style="height: 24px;">
      <td style="text-align: center; height: 42px;" rowspan="3">&nbsp;并发症</td>
      <td style="text-align: center; height: 24px;" colspan="2"><input type="checkbox" :checked="temp.info.bingfazheng.dianxin===1" >癫痫&nbsp;</td>
      <td style="text-align: center; height: 24px;" colspan="2"><input type="checkbox" :checked="temp.info.bingfazheng.lusun===1" >颅脑损伤&nbsp;</td>
      <td style="text-align: center; height: 24px;" colspan="2"><input type="checkbox" :checked="temp.info.bingfazheng.xinzang===1" >心脏病&nbsp;</td>
      <td style="text-align: center; height: 24px;" colspan="2"><input type="checkbox" :checked="temp.info.bingfazheng.gaoxueya===1" >高血压&nbsp;</td>
      <td style="text-align: center; height: 24px;" colspan="3"><input type="checkbox" :checked="temp.info.bingfazheng.shijue===1" >视觉缺陷&nbsp;&nbsp;&nbsp;</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="2"><input type="checkbox" :checked="temp.info.bingfazheng.yiyu===1" >抑郁&nbsp;</td>
      <td style="text-align: center;" colspan="2"><input type="checkbox" :checked="temp.info.bingfazheng.zhuting===1" >助听器&nbsp;&nbsp;</td>
      <td style="text-align: center;" colspan="2"><input type="checkbox" :checked="temp.info.bingfazheng.xujiu===1" >酗酒*</td>
      <td style="text-align: center;">其他&nbsp;</td>
      <td style="text-align: center;" colspan="4">{{temp.info.bingfazheng.other}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="11">*本次发病前，平均每日饮酒量超过 2 瓶啤酒 /1 两白酒；或每周至少 1 次，每次饮酒量超过 5 瓶啤酒 /3 两白酒</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;">&nbsp;目前用药</td>
      <td style="text-align: center;" colspan="11">{{temp.info.medicine}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;">听力筛查</td>
      <td style="text-align: center;">{{yn_texts[temp.info.earTest]}}</td>
      <td style="text-align: center;">筛查日期</td>
      <td style="text-align: center;" colspan="2">{{temp.info.earTestTime}}</td>
      <td style="text-align: center;">视力筛查</td>
      <td style="text-align: center;">{{yn_texts[temp.info.eyeTest]}}</td>
      <td style="text-align: center;">筛查日期</td>
      <td style="text-align: center;" colspan="4">{{temp.info.eyeTestTime}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="2">&nbsp;&nbsp;故事叙述录音</td>
      <td style="text-align: center;" colspan="4">{{yn_texts[temp.info.storyRecord]}}</td>
      <td style="text-align: center;" colspan="6">{{temp.info.recordSavePlace}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="2">流利度类型</td>
      <td style="text-align: center;" colspan="2"><input type="checkbox" :checked="temp.info.liulidu===1" >流畅性</td>
      <td style="text-align: center;" colspan="2"><input type="checkbox" :checked="temp.info.liulidu===0" >非流畅性</td>
      <td style="text-align: center;" colspan="2">失语症类型</td>
      <td style="text-align: center;" colspan="4">{{temp.info.shiyuType}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="2">有无以下体内人<br />工植入物（MRI<br />安全）</td>
      <td style="text-align: center;" colspan="10">
      有（心脏起搏器<input type="checkbox" :checked="temp.info.zhiruwu.xinzang===1" >、
      内支架<input type="checkbox" :checked="temp.info.zhiruwu.zhijia===1" >、
      血管夹<input type="checkbox" :checked="temp.info.zhiruwu.xueguan===1" >、
      人工瓣膜<input type="checkbox" :checked="temp.info.zhiruwu.banmo===1" >、
      静脉滤器<input type="checkbox" :checked="temp.info.zhiruwu.jingmai===1" >、<br />
      内固定器<input type="checkbox" :checked="temp.info.zhiruwu.guding===1" >、
      人工关节<input type="checkbox" :checked="temp.info.zhiruwu.guanjie===1" >、
      义齿<input type="checkbox" :checked="temp.info.zhiruwu.yichi===1" >、
      不锈钢丝<input type="checkbox" :checked="temp.info.zhiruwu.gangsi===1" >、
      金属节育环<input type="checkbox" :checked="temp.info.zhiruwu.jieyu===1" >、
      其他铁磁性物质<input type="checkbox" :checked="temp.info.zhiruwu.cixing===1" >
       ）；无<input type="checkbox" :checked="temp.info.zhiruwu.no===1" ></td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="2" rowspan="2">西方失语症成套测验（WAB）分数</td>
      <td style="text-align: center;" colspan="2">自发言语</td>
      <td style="text-align: center;" colspan="2">听理解</td>
      <td style="text-align: center;" colspan="2">复述</td>
      <td style="text-align: center;" colspan="2">命名</td>
      <td style="text-align: center;" colspan="2">AQ失语商</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="2">{{temp.info.scores.zifa}}</td>
      <td style="text-align: center;" colspan="2">{{temp.info.scores.ting}}</td>
      <td style="text-align: center;" colspan="2">{{temp.info.scores.fushu}}</td>
      <td style="text-align: center;" colspan="2">{{temp.info.scores.mingming}}</td>
      <td style="text-align: center;" colspan="2">{{temp.info.scores.aq}}</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="2">联系人</td>
      <td style="text-align: center;" colspan="2">{{temp.info.contact}}</td>
      <td style="text-align: center;">与患者关系</td>
      <td style="text-align: center;" colspan="2">{{temp.info.relationship}}&nbsp;</td>
      <td style="text-align: center;" colspan="2">联系电话</td>
      <td style="text-align: center;" colspan="3">{{temp.info.cNo}}&nbsp;</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="2">施测者姓名</td>
      <td style="text-align: center;" colspan="2">{{temp.info.tester}}&nbsp;</td>
      <td style="text-align: center;">施测者签名</td>
      <td style="text-align: center;" colspan="2">&nbsp;</td>
      <td style="text-align: center;" colspan="2">资格证书号</td>
      <td style="text-align: center;" colspan="3">{{temp.info.certNo}}&nbsp;</td>
      </tr>
      <tr style="height: 28px;">
      <td style="text-align: center;" colspan="2">联系电话</td>
      <td style="text-align: center;" colspan="2">{{temp.info.tpNo}}&nbsp;</td>
      <td style="text-align: center;">&nbsp;</td>
      <td style="text-align: center;" colspan="2">&nbsp;</td>
      <td style="text-align: center;" colspan="2">E-mail</td>
      <td style="text-align: center;" colspan="3">{{temp.info.tEmail}}</td>
      </tr>
      </tbody>
      </table>
<p>&nbsp;</p>

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
            <td style="font-size: 28px;">{{temp.cases.namedTest.tingjuebianshi.results[0].react}}</td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;">{{temp.cases.namedTest.tingjuebianshi.results[0].reactType}}</td>
          </tr>
          <tr>
            <td class="lian_xi">练习2</td>
            <td>ké / ké</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[1]">{{temp.cases.namedTest.tingjuebianshi.results[1].react}}</span></td>
            <td style="font-size: 28px;">+</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[1]">{{temp.cases.namedTest.tingjuebianshi.results[1].reactType}}</span></td>
          </tr>
          <tr>
            <td class="lian_xi">练习3</td>
            <td>zuì / tuì</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[2]">{{temp.cases.namedTest.tingjuebianshi.results[2].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[2]">{{temp.cases.namedTest.tingjuebianshi.results[2].reactType}}</span></td>
          </tr>
          <tr>
            <td style="font-size: 28px;" colspan="5">&nbsp;</td>
          </tr>
          <tr>
            <td>1</td>
            <td>bó / bó</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[3]">{{temp.cases.namedTest.tingjuebianshi.results[3].react}}</span></td>
            <td style="font-size: 28px;">+</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[3]">{{temp.cases.namedTest.tingjuebianshi.results[3].reactType}}</span></td>
          </tr>
          <tr class="sheng_mu_bu_tong">
            <td>2</td>
            <td>kā / hā</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[4]">{{temp.cases.namedTest.tingjuebianshi.results[4].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[4]">{{temp.cases.namedTest.tingjuebianshi.results[4].reactType}}</span></td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>3</td>
            <td>tóu / tòu</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[5]">{{temp.cases.namedTest.tingjuebianshi.results[5].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[5]">{{temp.cases.namedTest.tingjuebianshi.results[5].reactType}}</span></td>
          </tr>
          <tr>
            <td>4</td>
            <td>cā / cā</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[6]">{{temp.cases.namedTest.tingjuebianshi.results[6].react}}</span></td>
            <td style="font-size: 28px;">+</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[6]">{{temp.cases.namedTest.tingjuebianshi.results[6].reactType}}</span></td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>5</td>
            <td>mēn / mén</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[7]">{{temp.cases.namedTest.tingjuebianshi.results[7].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[7]">{{temp.cases.namedTest.tingjuebianshi.results[7].reactType}}</span></td>
          </tr>
          <tr class="sheng_mu_bu_tong">
            <td>6</td>
            <td>pí / dí</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[8]">{{temp.cases.namedTest.tingjuebianshi.results[8].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[8]">{{temp.cases.namedTest.tingjuebianshi.results[8].reactType}}</span></td>
          </tr>
          <tr class="yun_mu_bu_tong">
            <td>7</td>
            <td>hé / hú</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[9]">{{temp.cases.namedTest.tingjuebianshi.results[9].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[9]">{{temp.cases.namedTest.tingjuebianshi.results[9].reactType}}</span></td>
          </tr>
          <tr>
            <td>8</td>
            <td>yóu / yóu</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[10]">{{temp.cases.namedTest.tingjuebianshi.results[10].react}}</span></td>
            <td style="font-size: 28px;">+</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[10]">{{temp.cases.namedTest.tingjuebianshi.results[10].reactType}}</span></td>
          </tr>
          <tr class="yun_mu_bu_tong">
            <td>9</td>
            <td>duī / diū</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[11]">{{temp.cases.namedTest.tingjuebianshi.results[11].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[11]">{{temp.cases.namedTest.tingjuebianshi.results[11].reactType}}</span></td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>10</td>
            <td>wāi / wài</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[12]">{{temp.cases.namedTest.tingjuebianshi.results[12].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[12]">{{temp.cases.namedTest.tingjuebianshi.results[12].reactType}}</span></td>
          </tr>
          <tr>
            <td>11</td>
            <td>tiě / tiě</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[13]">{{temp.cases.namedTest.tingjuebianshi.results[13].react}}</span></td>
            <td style="font-size: 28px;">+</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[13]">{{temp.cases.namedTest.tingjuebianshi.results[13].reactType}}</span></td>
          </tr>
          <tr class="yun_mu_bu_tong">
            <td>12</td>
            <td>niǎo / niǔ</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[14]">{{temp.cases.namedTest.tingjuebianshi.results[14].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[14]">{{temp.cases.namedTest.tingjuebianshi.results[14].reactType}}</span></td>
          </tr>
          <tr class="sheng_mu_bu_tong">
            <td>13</td>
            <td>kuò / ruò</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[15]">{{temp.cases.namedTest.tingjuebianshi.results[15].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[15]">{{temp.cases.namedTest.tingjuebianshi.results[15].reactType}}</span></td>
          </tr>
          <tr>
            <td>14</td>
            <td>gǔ / gǔ</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[16]">{{temp.cases.namedTest.tingjuebianshi.results[16].react}}</span></td>
            <td style="font-size: 28px;">+</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[16]">{{temp.cases.namedTest.tingjuebianshi.results[16].reactType}}</span></td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>15</td>
            <td>jiā / jiǎ</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[17]">{{temp.cases.namedTest.tingjuebianshi.results[17].react}}</span></td>
            <td style="font-size: 28px;">+</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[17]">{{temp.cases.namedTest.tingjuebianshi.results[17].reactType}}</span></td>
          </tr>
          <tr>
            <td>16</td>
            <td>zhuā / zhuā</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[18]">{{temp.cases.namedTest.tingjuebianshi.results[18].react}}</span></td>
            <td style="font-size: 28px;">+</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[18]">{{temp.cases.namedTest.tingjuebianshi.results[18].reactType}}</span></td>
          </tr>
          <tr class="yun_mu_bu_tong">
            <td>17</td>
            <td>bò / bì</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[19]">{{temp.cases.namedTest.tingjuebianshi.results[19].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[19]">{{temp.cases.namedTest.tingjuebianshi.results[19].reactType}}</span></td>
          </tr>
          <tr class="sheng_mu_bu_tong">
            <td>18</td>
            <td>jǔ / xǔ</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[20]">{{temp.cases.namedTest.tingjuebianshi.results[20].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[20]">{{temp.cases.namedTest.tingjuebianshi.results[20].reactType}}</span></td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>19</td>
            <td>yuǎn / yuàn</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[21]">{{temp.cases.namedTest.tingjuebianshi.results[21].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[21]">{{temp.cases.namedTest.tingjuebianshi.results[21].reactType}}</span></td>
          </tr>
          <tr>
            <td>20</td>
            <td>sì / sì</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[22]">{{temp.cases.namedTest.tingjuebianshi.results[22].react}}</span></td>
            <td style="font-size: 28px;">+</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[22]">{{temp.cases.namedTest.tingjuebianshi.results[22].reactType}}</span></td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>21</td>
            <td>shú / shǔ</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[23]">{{temp.cases.namedTest.tingjuebianshi.results[23].react}}</span></td>
            <td style="font-size: 28px;">-</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[23]">{{temp.cases.namedTest.tingjuebianshi.results[23].reactType}}</span></td>
          </tr>
          <tr>
            <td>22</td>
            <td>luè / luè</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[24]">{{temp.cases.namedTest.tingjuebianshi.results[24].react}}</span></td>
            <td style="font-size: 28px;">+</td>
            <td style="font-size: 28px;"><span v-if="temp.cases.namedTest.tingjuebianshi.results[24]">{{temp.cases.namedTest.tingjuebianshi.results[24].reactType}}</span></td>
          </tr>
          <tr>
            <td rowspan="4">正确反应小计</td>
            <td>相同</td>
            <td colspan="3">{{temp.cases.namedTest.tingjuebianshi.same}}/8</td>
          </tr>
          <tr class="sheng_diao_bu_tong">
            <td>声调不同</td>
            <td colspan="3">{{temp.cases.namedTest.tingjuebianshi.shengdiao}}/6</td>
          </tr>
          <tr class="sheng_mu_bu_tong">
            <td>声母不同</td>
            <td colspan="3">{{temp.cases.namedTest.tingjuebianshi.shengmu}}/4</td>
          </tr>
          <tr class="yun_mu_bu_tong">
            <td>韵母不同</td>
            <td colspan="3">{{temp.cases.namedTest.tingjuebianshi.yunmu}}/4</td>
          </tr>
          <tr class="he_ji">
            <td colspan="2">合计</td>
            <td colspan="3">{{temp.cases.namedTest.tingjuebianshi.total}}/22</td>
          </tr/>
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
            <tr :key='item[0]' v-for="item in temp.cases.namedTest.shengdiaolijie.mergedData">
              <td>{{item[0]}}</td>
              <td><input v-if="item[5]==0" type="checkbox" :checked="true" >{{item[1]}}</td>
              <td><input v-if="item[5]==1" type="checkbox" :checked="true" >{{item[2]}}</td>
              <td>{{item[3]}}</td>
              <td style="font-size: 28px;">{{item[4]}}</td>
            </tr>
            <tr class="he_ji">
              <td colspan="2">合计</td>
              <td colspan="3">{{temp.cases.namedTest.shengdiaolijie.total}}/22</td>
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
            <tr :key='item[0]' v-for="item in temp.cases.namedTest.tingjuecihui.mergedData">
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
              <td>{{item[2]}}</td>
              <td>{{item[3]}}</td>
              <td >{{item[4]}}</td>
            </tr>
            <tr>
              <td colspan="2">假词正确小计</td>
              <td colspan="3">{{temp.cases.namedTest.tingjuecihui.jiaci}}/8</td>
            </tr>
            <tr>
              <td colspan="2">真词正确小计</td>
              <td colspan="3">{{temp.cases.namedTest.tingjuecihui.zhenci}}/8</td>
            </tr>
            <tr class="he_ji">
              <td colspan="2">正确反应合计</td>
              <td colspan="3">{{temp.cases.namedTest.tingjuecihui.total}}/16</td>
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
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[0]">{{temp.cases.namedTest.duizhengmingming.results[0].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[0]">{{temp.cases.namedTest.duizhengmingming.results[0].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[0] && temp.cases.namedTest.duizhengmingming.results[0].assureReact==0" type="checkbox" :checked="true" >切</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[0] && temp.cases.namedTest.duizhengmingming.results[0].assureReact==1" type="checkbox" :checked="true" >猫</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[0] && temp.cases.namedTest.duizhengmingming.results[0].assureReact==2" type="checkbox" :checked="true" >刀</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[0]">{{temp.cases.namedTest.duizhengmingming.results[0].assureReactType}}</span></td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="8"> </td>
            </tr>
            <tr>
              <td>1</td>
              <td>青蛙</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[1]">{{temp.cases.namedTest.duizhengmingming.results[1].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[1]">{{temp.cases.namedTest.duizhengmingming.results[1].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[1] && temp.cases.namedTest.duizhengmingming.results[1].assureReact==0" type="checkbox" :checked="true" >池塘</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[1] && temp.cases.namedTest.duizhengmingming.results[1].assureReact==1" type="checkbox" :checked="true" >青蛙</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[1] && temp.cases.namedTest.duizhengmingming.results[1].assureReact==2" type="checkbox" :checked="true" >惊讶</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[1]">{{temp.cases.namedTest.duizhengmingming.results[1].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>骆驼</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[2]">{{temp.cases.namedTest.duizhengmingming.results[2].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[2]">{{temp.cases.namedTest.duizhengmingming.results[2].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[2] && temp.cases.namedTest.duizhengmingming.results[2].assureReact==0" type="checkbox" :checked="true" >骆驼</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[2] && temp.cases.namedTest.duizhengmingming.results[2].assureReact==1" type="checkbox" :checked="true" >萝卜</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[2] && temp.cases.namedTest.duizhengmingming.results[2].assureReact==2" type="checkbox" :checked="true" >沙漠</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[2]">{{temp.cases.namedTest.duizhengmingming.results[2].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>大象</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[3]">{{temp.cases.namedTest.duizhengmingming.results[3].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[3]">{{temp.cases.namedTest.duizhengmingming.results[3].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[3] && temp.cases.namedTest.duizhengmingming.results[3].assureReact==0" type="checkbox" :checked="true" >家乡</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[3] && temp.cases.namedTest.duizhengmingming.results[3].assureReact==1" type="checkbox" :checked="true" >蚂蚁</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[3] && temp.cases.namedTest.duizhengmingming.results[3].assureReact==2" type="checkbox" :checked="true" >大象</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[3]">{{temp.cases.namedTest.duizhengmingming.results[3].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>4</td>
              <td>熊</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[4]">{{temp.cases.namedTest.duizhengmingming.results[4].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[4]">{{temp.cases.namedTest.duizhengmingming.results[4].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[4] && temp.cases.namedTest.duizhengmingming.results[4].assureReact==0" type="checkbox" :checked="true" >桶</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[4] && temp.cases.namedTest.duizhengmingming.results[4].assureReact==1" type="checkbox" :checked="true" >熊</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[4] && temp.cases.namedTest.duizhengmingming.results[4].assureReact==2" type="checkbox" :checked="true" >笨</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[4]">{{temp.cases.namedTest.duizhengmingming.results[4].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>5</td>
              <td>兔子 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[5]">{{temp.cases.namedTest.duizhengmingming.results[5].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[5]">{{temp.cases.namedTest.duizhengmingming.results[5].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[5] && temp.cases.namedTest.duizhengmingming.results[5].assureReact==0" type="checkbox" :checked="true" >胡子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[5] && temp.cases.namedTest.duizhengmingming.results[5].assureReact==1" type="checkbox" :checked="true" >狼</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[5] && temp.cases.namedTest.duizhengmingming.results[5].assureReact==2" type="checkbox" :checked="true" >兔子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[5]">{{temp.cases.namedTest.duizhengmingming.results[5].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>6</td>
              <td>蛇 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[6]">{{temp.cases.namedTest.duizhengmingming.results[6].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[6]">{{temp.cases.namedTest.duizhengmingming.results[6].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[6] && temp.cases.namedTest.duizhengmingming.results[6].assureReact==0" type="checkbox" :checked="true" >绳子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[6] && temp.cases.namedTest.duizhengmingming.results[6].assureReact==1" type="checkbox" :checked="true" >沙</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[6] && temp.cases.namedTest.duizhengmingming.results[6].assureReact==2" type="checkbox" :checked="true" >蛇</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[6]">{{temp.cases.namedTest.duizhengmingming.results[6].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>7</td>
              <td>老虎</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[7]">{{temp.cases.namedTest.duizhengmingming.results[7].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[7]">{{temp.cases.namedTest.duizhengmingming.results[7].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[7] && temp.cases.namedTest.duizhengmingming.results[7].assureReact==0" type="checkbox" :checked="true" >老虎</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[7] && temp.cases.namedTest.duizhengmingming.results[7].assureReact==1" type="checkbox" :checked="true" >来回</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[7] && temp.cases.namedTest.duizhengmingming.results[7].assureReact==2" type="checkbox" :checked="true" >恐怖</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[7]">{{temp.cases.namedTest.duizhengmingming.results[7].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>8</td>
              <td>松鼠</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[8]">{{temp.cases.namedTest.duizhengmingming.results[8].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[8]">{{temp.cases.namedTest.duizhengmingming.results[8].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[8] && temp.cases.namedTest.duizhengmingming.results[8].assureReact==0" type="checkbox" :checked="true" >从属</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[8] && temp.cases.namedTest.duizhengmingming.results[8].assureReact==1" type="checkbox" :checked="true" >松鼠</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[8] && temp.cases.namedTest.duizhengmingming.results[8].assureReact==2" type="checkbox" :checked="true" >狮子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[8]">{{temp.cases.namedTest.duizhengmingming.results[8].assureReactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">动物小计 </td>
              <td colspan="2">{{temp.cases.namedTest.duizhengmingming.ani.correctCount}} /8</td>
              <td colspan="4">正确率 =　{{temp.cases.namedTest.duizhengmingming.ani.asureCorrectCount/temp.cases.namedTest.duizhengmingming.ani.asureCount===0?1:temp.cases.namedTest.duizhengmingming.ani.asureCount}}% 正确确认数（{{temp.cases.namedTest.duizhengmingming.ani.asureCorrectCount}}）/ 需确认数（{{temp.cases.namedTest.duizhengmingming.ani.asureCount}}）</td>
            </tr>
            <tr>
              <td>9</td>
              <td>帽子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[9]">{{temp.cases.namedTest.duizhengmingming.results[9].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[9]">{{temp.cases.namedTest.duizhengmingming.results[9].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[9] && temp.cases.namedTest.duizhengmingming.results[9].assureReact==0" type="checkbox" :checked="true" >贸易</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[9] && temp.cases.namedTest.duizhengmingming.results[9].assureReact==1" type="checkbox" :checked="true" >帽子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[9] && temp.cases.namedTest.duizhengmingming.results[9].assureReact==2" type="checkbox" :checked="true" >头顶</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[9]">{{temp.cases.namedTest.duizhengmingming.results[9].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>10</td>
              <td>手套 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[10]">{{temp.cases.namedTest.duizhengmingming.results[10].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[10]">{{temp.cases.namedTest.duizhengmingming.results[10].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[10] && temp.cases.namedTest.duizhengmingming.results[10].assureReact==0" type="checkbox" :checked="true" >手套</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[10] && temp.cases.namedTest.duizhengmingming.results[10].assureReact==1" type="checkbox" :checked="true" >外套</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[10] && temp.cases.namedTest.duizhengmingming.results[10].assureReact==2" type="checkbox" :checked="true" >上头</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[10]">{{temp.cases.namedTest.duizhengmingming.results[10].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>11</td>
              <td>裤子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[11]">{{temp.cases.namedTest.duizhengmingming.results[11].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[11]">{{temp.cases.namedTest.duizhengmingming.results[11].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[11] && temp.cases.namedTest.duizhengmingming.results[11].assureReact==0" type="checkbox" :checked="true" >父子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[11] && temp.cases.namedTest.duizhengmingming.results[11].assureReact==1" type="checkbox" :checked="true" >上衣</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[11] && temp.cases.namedTest.duizhengmingming.results[11].assureReact==2" type="checkbox" :checked="true" >裤子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[11]">{{temp.cases.namedTest.duizhengmingming.results[11].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>12</td>
              <td>鞋</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[12]">{{temp.cases.namedTest.duizhengmingming.results[12].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[12]">{{temp.cases.namedTest.duizhengmingming.results[12].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[12] && temp.cases.namedTest.duizhengmingming.results[12].assureReact==0" type="checkbox" :checked="true" >走路</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[12] && temp.cases.namedTest.duizhengmingming.results[12].assureReact==1" type="checkbox" :checked="true" >星</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[12] && temp.cases.namedTest.duizhengmingming.results[12].assureReact==2" type="checkbox" :checked="true" >鞋</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[12]">{{temp.cases.namedTest.duizhengmingming.results[12].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>13</td>
              <td>衬衫 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[13]">{{temp.cases.namedTest.duizhengmingming.results[13].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[13]">{{temp.cases.namedTest.duizhengmingming.results[13].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[13] && temp.cases.namedTest.duizhengmingming.results[13].assureReact==0" type="checkbox" :checked="true" >大衣</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[13] && temp.cases.namedTest.duizhengmingming.results[13].assureReact==1" type="checkbox" :checked="true" >衬衫</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[13] && temp.cases.namedTest.duizhengmingming.results[13].assureReact==2" type="checkbox" :checked="true" >人参</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[13]">{{temp.cases.namedTest.duizhengmingming.results[13].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>14</td>
              <td>裙子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[14]">{{temp.cases.namedTest.duizhengmingming.results[14].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[14]">{{temp.cases.namedTest.duizhengmingming.results[14].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[14] && temp.cases.namedTest.duizhengmingming.results[14].assureReact==0" type="checkbox" :checked="true" >裙子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[14] && temp.cases.namedTest.duizhengmingming.results[14].assureReact==1" type="checkbox" :checked="true" >西装</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[14] && temp.cases.namedTest.duizhengmingming.results[14].assureReact==2" type="checkbox" :checked="true" >君子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[14]">{{temp.cases.namedTest.duizhengmingming.results[14].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>15</td>
              <td>袜子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[15]">{{temp.cases.namedTest.duizhengmingming.results[15].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[15]">{{temp.cases.namedTest.duizhengmingming.results[15].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[15] && temp.cases.namedTest.duizhengmingming.results[15].assureReact==0" type="checkbox" :checked="true" >袜子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[15] && temp.cases.namedTest.duizhengmingming.results[15].assureReact==1" type="checkbox" :checked="true" >袖子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[15] && temp.cases.namedTest.duizhengmingming.results[15].assureReact==2" type="checkbox" :checked="true" >鸭子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[15]">{{temp.cases.namedTest.duizhengmingming.results[15].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>16</td>
              <td>腰带</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[16]">{{temp.cases.namedTest.duizhengmingming.results[16].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[16]">{{temp.cases.namedTest.duizhengmingming.results[16].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[16] && temp.cases.namedTest.duizhengmingming.results[16].assureReact==0" type="checkbox" :checked="true" >绑</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[16] && temp.cases.namedTest.duizhengmingming.results[16].assureReact==1" type="checkbox" :checked="true" >朝代</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[16] && temp.cases.namedTest.duizhengmingming.results[16].assureReact==2" type="checkbox" :checked="true" >腰带</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[16]">{{temp.cases.namedTest.duizhengmingming.results[16].assureReactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">服装小计</td>
              <td colspan="2">{{temp.cases.namedTest.duizhengmingming.cloth.correctCount}} /8</td>
              <td colspan="4">正确率 =　{{temp.cases.namedTest.duizhengmingming.cloth.asureCorrectCount/temp.cases.namedTest.duizhengmingming.cloth.asureCount===0?1:temp.cases.namedTest.duizhengmingming.cloth.asureCount}}% 正确确认数（{{temp.cases.namedTest.duizhengmingming.cloth.asureCorrectCount}}）/ 需确认数（{{temp.cases.namedTest.duizhengmingming.cloth.asureCount}}）</td>
            </tr>
            <tr>
              <td>17</td>
              <td>下巴 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[17]">{{temp.cases.namedTest.duizhengmingming.results[17].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[17]">{{temp.cases.namedTest.duizhengmingming.results[17].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[17] && temp.cases.namedTest.duizhengmingming.results[17].assureReact==0" type="checkbox" :checked="true" >指甲</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[17] && temp.cases.namedTest.duizhengmingming.results[17].assureReact==1" type="checkbox" :checked="true" >加压</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[17] && temp.cases.namedTest.duizhengmingming.results[17].assureReact==2" type="checkbox" :checked="true" >下巴</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[17]">{{temp.cases.namedTest.duizhengmingming.results[17].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>18</td>
              <td>膝盖</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[18]">{{temp.cases.namedTest.duizhengmingming.results[18].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[18]">{{temp.cases.namedTest.duizhengmingming.results[18].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[18] && temp.cases.namedTest.duizhengmingming.results[18].assureReact==0" type="checkbox" :checked="true" >膝盖</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[18] && temp.cases.namedTest.duizhengmingming.results[18].assureReact==1" type="checkbox" :checked="true" >手腕</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[18] && temp.cases.namedTest.duizhengmingming.results[18].assureReact==2" type="checkbox" :checked="true" >衣袋</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[18]">{{temp.cases.namedTest.duizhengmingming.results[18].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>19</td>
              <td>耳朵</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[19]">{{temp.cases.namedTest.duizhengmingming.results[19].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[19]">{{temp.cases.namedTest.duizhengmingming.results[19].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[19] && temp.cases.namedTest.duizhengmingming.results[19].assureReact==0" type="checkbox" :checked="true" >花朵</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[19] && temp.cases.namedTest.duizhengmingming.results[19].assureReact==1" type="checkbox" :checked="true" >鼻子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[19] && temp.cases.namedTest.duizhengmingming.results[19].assureReact==2" type="checkbox" :checked="true" >耳朵</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[19]">{{temp.cases.namedTest.duizhengmingming.results[19].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>20</td>
              <td>眉毛</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[20]">{{temp.cases.namedTest.duizhengmingming.results[20].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[20]">{{temp.cases.namedTest.duizhengmingming.results[20].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[20] && temp.cases.namedTest.duizhengmingming.results[20].assureReact==0" type="checkbox" :checked="true" >额头</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[20] && temp.cases.namedTest.duizhengmingming.results[20].assureReact==1" type="checkbox" :checked="true" >眉毛</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[20] && temp.cases.namedTest.duizhengmingming.results[20].assureReact==2" type="checkbox" :checked="true" >肥皂</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[20]">{{temp.cases.namedTest.duizhengmingming.results[20].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>21</td>
              <td>舌头</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[21]">{{temp.cases.namedTest.duizhengmingming.results[21].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[21]">{{temp.cases.namedTest.duizhengmingming.results[21].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[21] && temp.cases.namedTest.duizhengmingming.results[21].assureReact==0" type="checkbox" :checked="true" >舌头</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[21] && temp.cases.namedTest.duizhengmingming.results[21].assureReact==1" type="checkbox" :checked="true" >味道</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[21] && temp.cases.namedTest.duizhengmingming.results[21].assureReact==2" type="checkbox" :checked="true" >渗透</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[21]">{{temp.cases.namedTest.duizhengmingming.results[21].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>22</td>
              <td>脖子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[22]">{{temp.cases.namedTest.duizhengmingming.results[22].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[22]">{{temp.cases.namedTest.duizhengmingming.results[22].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[22] && temp.cases.namedTest.duizhengmingming.results[22].assureReact==0" type="checkbox" :checked="true" >嘴唇</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[22] && temp.cases.namedTest.duizhengmingming.results[22].assureReact==1" type="checkbox" :checked="true" >桌子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[22] && temp.cases.namedTest.duizhengmingming.results[22].assureReact==2" type="checkbox" :checked="true" >脖子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[22]">{{temp.cases.namedTest.duizhengmingming.results[22].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>23</td>
              <td>牙齿</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[23]">{{temp.cases.namedTest.duizhengmingming.results[23].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[23]">{{temp.cases.namedTest.duizhengmingming.results[23].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[23] && temp.cases.namedTest.duizhengmingming.results[23].assureReact==0" type="checkbox" :checked="true" >牙齿</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[23] && temp.cases.namedTest.duizhengmingming.results[23].assureReact==1" type="checkbox" :checked="true" >咬</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[23] && temp.cases.namedTest.duizhengmingming.results[23].assureReact==2" type="checkbox" :checked="true" >架子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[23]">{{temp.cases.namedTest.duizhengmingming.results[23].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>24</td>
              <td>肩膀</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[24]">{{temp.cases.namedTest.duizhengmingming.results[24].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[24]">{{temp.cases.namedTest.duizhengmingming.results[24].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[24] && temp.cases.namedTest.duizhengmingming.results[24].assureReact==0" type="checkbox" :checked="true" >胳膊</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[24] && temp.cases.namedTest.duizhengmingming.results[24].assureReact==1" type="checkbox" :checked="true" >肩膀</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[24] && temp.cases.namedTest.duizhengmingming.results[24].assureReact==2" type="checkbox" :checked="true" >连忙</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[24]">{{temp.cases.namedTest.duizhengmingming.results[24].assureReactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2"> 身体小计</td>
              <td colspan="2">{{temp.cases.namedTest.duizhengmingming.body.correctCount}} /8</td>
              <td colspan="4">正确率 =　{{temp.cases.namedTest.duizhengmingming.body.asureCorrectCount/temp.cases.namedTest.duizhengmingming.body.asureCount===0?1:temp.cases.namedTest.duizhengmingming.body.asureCount}}% 正确确认数（{{temp.cases.namedTest.duizhengmingming.body.asureCorrectCount}}）/ 需确认数（{{temp.cases.namedTest.duizhengmingming.body.asureCount}}）</td>
            </tr>
            <tr>
              <td>25</td>
              <td>苹果</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[25]">{{temp.cases.namedTest.duizhengmingming.results[25].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[25]">{{temp.cases.namedTest.duizhengmingming.results[25].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[25] && temp.cases.namedTest.duizhengmingming.results[25].assureReact==0" type="checkbox" :checked="true" >后果 </td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[25] && temp.cases.namedTest.duizhengmingming.results[25].assureReact==1" type="checkbox" :checked="true" >饥饿</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[25] && temp.cases.namedTest.duizhengmingming.results[25].assureReact==2" type="checkbox" :checked="true" >苹果</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[25]">{{temp.cases.namedTest.duizhengmingming.results[25].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>26</td>
              <td>玉米</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[26]">{{temp.cases.namedTest.duizhengmingming.results[26].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[26]">{{temp.cases.namedTest.duizhengmingming.results[26].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[26] && temp.cases.namedTest.duizhengmingming.results[26].assureReact==0" type="checkbox" :checked="true" >聚集 </td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[26] && temp.cases.namedTest.duizhengmingming.results[26].assureReact==1" type="checkbox" :checked="true" >玉米</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[26] && temp.cases.namedTest.duizhengmingming.results[26].assureReact==2" type="checkbox" :checked="true" >小麦</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[26]">{{temp.cases.namedTest.duizhengmingming.results[26].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>27</td>
              <td>葡萄</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[27]">{{temp.cases.namedTest.duizhengmingming.results[27].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[27]">{{temp.cases.namedTest.duizhengmingming.results[27].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[27] && temp.cases.namedTest.duizhengmingming.results[27].assureReact==0" type="checkbox" :checked="true" >无效 </td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[27] && temp.cases.namedTest.duizhengmingming.results[27].assureReact==1" type="checkbox" :checked="true" >水果</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[27] && temp.cases.namedTest.duizhengmingming.results[27].assureReact==2" type="checkbox" :checked="true" >葡萄</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[27]">{{temp.cases.namedTest.duizhengmingming.results[27].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>28</td>
              <td>辣椒</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[28]">{{temp.cases.namedTest.duizhengmingming.results[28].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[28]">{{temp.cases.namedTest.duizhengmingming.results[28].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[28] && temp.cases.namedTest.duizhengmingming.results[28].assureReact==0" type="checkbox" :checked="true" >辣椒 </td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[28] && temp.cases.namedTest.duizhengmingming.results[28].assureReact==1" type="checkbox" :checked="true" >发酵</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[28] && temp.cases.namedTest.duizhengmingming.results[28].assureReact==2" type="checkbox" :checked="true" >萝卜</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[28]">{{temp.cases.namedTest.duizhengmingming.results[28].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>29</td>
              <td>西瓜</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[29]">{{temp.cases.namedTest.duizhengmingming.results[29].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[29]">{{temp.cases.namedTest.duizhengmingming.results[29].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[29] && temp.cases.namedTest.duizhengmingming.results[29].assureReact==0" type="checkbox" :checked="true" >依法</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[29] && temp.cases.namedTest.duizhengmingming.results[29].assureReact==1" type="checkbox" :checked="true" >西瓜</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[29] && temp.cases.namedTest.duizhengmingming.results[29].assureReact==2" type="checkbox" :checked="true" >桃</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[29]">{{temp.cases.namedTest.duizhengmingming.results[29].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>30</td>
              <td>白菜</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[30]">{{temp.cases.namedTest.duizhengmingming.results[30].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[30]">{{temp.cases.namedTest.duizhengmingming.results[30].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[30] && temp.cases.namedTest.duizhengmingming.results[30].assureReact==0" type="checkbox" :checked="true" >外在</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[30] && temp.cases.namedTest.duizhengmingming.results[30].assureReact==1" type="checkbox" :checked="true" >萝卜</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[30] && temp.cases.namedTest.duizhengmingming.results[30].assureReact==2" type="checkbox" :checked="true" >白菜</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[30]">{{temp.cases.namedTest.duizhengmingming.results[30].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>31</td>
              <td>梨</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[31]">{{temp.cases.namedTest.duizhengmingming.results[31].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[31]">{{temp.cases.namedTest.duizhengmingming.results[31].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[31] && temp.cases.namedTest.duizhengmingming.results[31].assureReact==0" type="checkbox" :checked="true" >桃</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[31] && temp.cases.namedTest.duizhengmingming.results[31].assureReact==1" type="checkbox" :checked="true" >梨  </td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[31] && temp.cases.namedTest.duizhengmingming.results[31].assureReact==2" type="checkbox" :checked="true" >席</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[31]">{{temp.cases.namedTest.duizhengmingming.results[31].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>32</td>
              <td>花生</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[32]">{{temp.cases.namedTest.duizhengmingming.results[32].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[32]">{{temp.cases.namedTest.duizhengmingming.results[32].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[32] && temp.cases.namedTest.duizhengmingming.results[32].assureReact==0" type="checkbox" :checked="true" >花生</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[32] && temp.cases.namedTest.duizhengmingming.results[32].assureReact==1" type="checkbox" :checked="true" >发疯</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[32] && temp.cases.namedTest.duizhengmingming.results[32].assureReact==2" type="checkbox" :checked="true" >大豆</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[32]">{{temp.cases.namedTest.duizhengmingming.results[32].assureReactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">  果蔬小计</td>
              <td colspan="2">{{temp.cases.namedTest.duizhengmingming.fruit.correctCount}} /8</td>
              <td colspan="4">正确率 =　{{temp.cases.namedTest.duizhengmingming.fruit.asureCorrectCount/temp.cases.namedTest.duizhengmingming.fruit.asureCount===0?1:temp.cases.namedTest.duizhengmingming.fruit.asureCount}}% 正确确认数（{{temp.cases.namedTest.duizhengmingming.fruit.asureCorrectCount}}）/ 需确认数（{{temp.cases.namedTest.duizhengmingming.fruit.asureCount}}）</td>
            </tr>
            <tr>
              <td>33</td>
              <td>手表 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[33]">{{temp.cases.namedTest.duizhengmingming.results[33].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[33]">{{temp.cases.namedTest.duizhengmingming.results[33].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[33] && temp.cases.namedTest.duizhengmingming.results[33].assureReact==0" type="checkbox" :checked="true" >钟头</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[33] && temp.cases.namedTest.duizhengmingming.results[33].assureReact==1" type="checkbox" :checked="true" >吼叫</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[33] && temp.cases.namedTest.duizhengmingming.results[33].assureReact==2" type="checkbox" :checked="true" >手表 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[33]">{{temp.cases.namedTest.duizhengmingming.results[33].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>34</td>
              <td>眼镜</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[34]">{{temp.cases.namedTest.duizhengmingming.results[34].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[34]">{{temp.cases.namedTest.duizhengmingming.results[34].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[34] && temp.cases.namedTest.duizhengmingming.results[34].assureReact==0" type="checkbox" :checked="true" >前景</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[34] && temp.cases.namedTest.duizhengmingming.results[34].assureReact==1" type="checkbox" :checked="true" >眼镜</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[34] && temp.cases.namedTest.duizhengmingming.results[34].assureReact==2" type="checkbox" :checked="true" >镜头</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[34]">{{temp.cases.namedTest.duizhengmingming.results[34].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>35</td>
              <td>筷子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[35]">{{temp.cases.namedTest.duizhengmingming.results[35].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[35]">{{temp.cases.namedTest.duizhengmingming.results[35].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[35] && temp.cases.namedTest.duizhengmingming.results[35].assureReact==0" type="checkbox" :checked="true" >筷子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[35] && temp.cases.namedTest.duizhengmingming.results[35].assureReact==1" type="checkbox" :checked="true" >牌子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[35] && temp.cases.namedTest.duizhengmingming.results[35].assureReact==2" type="checkbox" :checked="true" >棍子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[35]">{{temp.cases.namedTest.duizhengmingming.results[35].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>36</td>
              <td>被子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[36]">{{temp.cases.namedTest.duizhengmingming.results[36].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[36]">{{temp.cases.namedTest.duizhengmingming.results[36].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[36] && temp.cases.namedTest.duizhengmingming.results[36].assureReact==0" type="checkbox" :checked="true" >枕头</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[36] && temp.cases.namedTest.duizhengmingming.results[36].assureReact==1" type="checkbox" :checked="true" >杯子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[36] && temp.cases.namedTest.duizhengmingming.results[36].assureReact==2" type="checkbox" :checked="true" >被子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[36]">{{temp.cases.namedTest.duizhengmingming.results[36].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>37</td>
              <td>毛巾</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[37]">{{temp.cases.namedTest.duizhengmingming.results[37].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[37]">{{temp.cases.namedTest.duizhengmingming.results[37].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[37] && temp.cases.namedTest.duizhengmingming.results[37].assureReact==0" type="checkbox" :checked="true" >瓶子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[37] && temp.cases.namedTest.duizhengmingming.results[37].assureReact==1" type="checkbox" :checked="true" >毛巾</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[37] && temp.cases.namedTest.duizhengmingming.results[37].assureReact==2" type="checkbox" :checked="true" >脑筋</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[37]">{{temp.cases.namedTest.duizhengmingming.results[37].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>38</td>
              <td>锅</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[38]">{{temp.cases.namedTest.duizhengmingming.results[38].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[38]">{{temp.cases.namedTest.duizhengmingming.results[38].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[38] && temp.cases.namedTest.duizhengmingming.results[38].assureReact==0" type="checkbox" :checked="true" >锅</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[38] && temp.cases.namedTest.duizhengmingming.results[38].assureReact==1" type="checkbox" :checked="true" >炒</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[38] && temp.cases.namedTest.duizhengmingming.results[38].assureReact==2" type="checkbox" :checked="true" >窝</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[38]">{{temp.cases.namedTest.duizhengmingming.results[38].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>39</td>
              <td>钥匙</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[39]">{{temp.cases.namedTest.duizhengmingming.results[39].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[39]">{{temp.cases.namedTest.duizhengmingming.results[39].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[39] && temp.cases.namedTest.duizhengmingming.results[39].assureReact==0" type="checkbox" :checked="true" >架子</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[39] && temp.cases.namedTest.duizhengmingming.results[39].assureReact==1" type="checkbox" :checked="true" >好似</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[39] && temp.cases.namedTest.duizhengmingming.results[39].assureReact==2" type="checkbox" :checked="true" >钥匙</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[39]">{{temp.cases.namedTest.duizhengmingming.results[39].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>40</td>
              <td> 桶</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[40]">{{temp.cases.namedTest.duizhengmingming.results[40].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[40]">{{temp.cases.namedTest.duizhengmingming.results[40].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[40] && temp.cases.namedTest.duizhengmingming.results[40].assureReact==0" type="checkbox" :checked="true" >涌</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[40] && temp.cases.namedTest.duizhengmingming.results[40].assureReact==1" type="checkbox" :checked="true" >桶 </td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[40] && temp.cases.namedTest.duizhengmingming.results[40].assureReact==2" type="checkbox" :checked="true" >瓶子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[40]">{{temp.cases.namedTest.duizhengmingming.results[40].assureReactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">  工具小计</td>
              <td colspan="2">{{temp.cases.namedTest.duizhengmingming.tool.correctCount}} /8</td>
              <td colspan="4">正确率 =　{{temp.cases.namedTest.duizhengmingming.tool.asureCorrectCount/temp.cases.namedTest.duizhengmingming.tool.asureCount===0?1:temp.cases.namedTest.duizhengmingming.tool.asureCount}}% 正确确认数（{{temp.cases.namedTest.duizhengmingming.tool.asureCorrectCount}}）/ 需确认数（{{temp.cases.namedTest.duizhengmingming.tool.asureCount}}）</td>
            </tr>
            <tr>
              <td>41</td>
              <td>红</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[41]">{{temp.cases.namedTest.duizhengmingming.results[41].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[41]">{{temp.cases.namedTest.duizhengmingming.results[41].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[41] && temp.cases.namedTest.duizhengmingming.results[41].assureReact==0" type="checkbox" :checked="true" >重</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[41] && temp.cases.namedTest.duizhengmingming.results[41].assureReact==1" type="checkbox" :checked="true" >红</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[41] && temp.cases.namedTest.duizhengmingming.results[41].assureReact==2" type="checkbox" :checked="true" >白</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[41]">{{temp.cases.namedTest.duizhengmingming.results[41].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>42</td>
              <td>绿</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[42]">{{temp.cases.namedTest.duizhengmingming.results[42].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[42]">{{temp.cases.namedTest.duizhengmingming.results[42].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[42] && temp.cases.namedTest.duizhengmingming.results[42].assureReact==0" type="checkbox" :checked="true" >灰</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[42] && temp.cases.namedTest.duizhengmingming.results[42].assureReact==1" type="checkbox" :checked="true" >具</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[42] && temp.cases.namedTest.duizhengmingming.results[42].assureReact==2" type="checkbox" :checked="true" >绿</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[42]">{{temp.cases.namedTest.duizhengmingming.results[42].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>43</td>
              <td>黄</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[43]">{{temp.cases.namedTest.duizhengmingming.results[43].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[43]">{{temp.cases.namedTest.duizhengmingming.results[43].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[43] && temp.cases.namedTest.duizhengmingming.results[43].assureReact==0" type="checkbox" :checked="true" >黄</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[43] && temp.cases.namedTest.duizhengmingming.results[43].assureReact==1" type="checkbox" :checked="true" >王</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[43] && temp.cases.namedTest.duizhengmingming.results[43].assureReact==2" type="checkbox" :checked="true" >黑</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[43]">{{temp.cases.namedTest.duizhengmingming.results[43].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>44</td>
              <td>粉红</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[44]">{{temp.cases.namedTest.duizhengmingming.results[44].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[44]">{{temp.cases.namedTest.duizhengmingming.results[44].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[44] && temp.cases.namedTest.duizhengmingming.results[44].assureReact==0" type="checkbox" :checked="true" >蔚蓝</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[44] && temp.cases.namedTest.duizhengmingming.results[44].assureReact==1" type="checkbox" :checked="true" >门洞</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[44] && temp.cases.namedTest.duizhengmingming.results[44].assureReact==2" type="checkbox" :checked="true" >粉红</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[44]">{{temp.cases.namedTest.duizhengmingming.results[44].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>45</td>
              <td>白</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[45]">{{temp.cases.namedTest.duizhengmingming.results[45].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[45]">{{temp.cases.namedTest.duizhengmingming.results[45].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[45] && temp.cases.namedTest.duizhengmingming.results[45].assureReact==0" type="checkbox" :checked="true" >红</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[45] && temp.cases.namedTest.duizhengmingming.results[45].assureReact==1" type="checkbox" :checked="true" >白</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[45] && temp.cases.namedTest.duizhengmingming.results[45].assureReact==2" type="checkbox" :checked="true" >台</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[45]">{{temp.cases.namedTest.duizhengmingming.results[45].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>46</td>
              <td>蓝</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[46]">{{temp.cases.namedTest.duizhengmingming.results[46].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[46]">{{temp.cases.namedTest.duizhengmingming.results[46].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[46] && temp.cases.namedTest.duizhengmingming.results[46].assureReact==0" type="checkbox" :checked="true" >蓝</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[46] && temp.cases.namedTest.duizhengmingming.results[46].assureReact==1" type="checkbox" :checked="true" >弹 </td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[46] && temp.cases.namedTest.duizhengmingming.results[46].assureReact==2" type="checkbox" :checked="true" >紫</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[46]">{{temp.cases.namedTest.duizhengmingming.results[46].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>47</td>
              <td>黑</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[47]">{{temp.cases.namedTest.duizhengmingming.results[47].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[47]">{{temp.cases.namedTest.duizhengmingming.results[47].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[47] && temp.cases.namedTest.duizhengmingming.results[47].assureReact==0" type="checkbox" :checked="true" >白</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[47] && temp.cases.namedTest.duizhengmingming.results[47].assureReact==1" type="checkbox" :checked="true" >黑 </td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[47] && temp.cases.namedTest.duizhengmingming.results[47].assureReact==2" type="checkbox" :checked="true" >飞</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[47]">{{temp.cases.namedTest.duizhengmingming.results[47].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>48</td>
              <td>紫</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[48]">{{temp.cases.namedTest.duizhengmingming.results[48].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[48]">{{temp.cases.namedTest.duizhengmingming.results[48].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[48] && temp.cases.namedTest.duizhengmingming.results[48].assureReact==0" type="checkbox" :checked="true" >紫</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[48] && temp.cases.namedTest.duizhengmingming.results[48].assureReact==1" type="checkbox" :checked="true" >蓝 </td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[48] && temp.cases.namedTest.duizhengmingming.results[48].assureReact==2" type="checkbox" :checked="true" >止</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[48]">{{temp.cases.namedTest.duizhengmingming.results[48].assureReactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">颜色小计 </td>
              <td colspan="2">{{temp.cases.namedTest.duizhengmingming.color.correctCount}} /8</td>
              <td colspan="4">正确率 =　{{temp.cases.namedTest.duizhengmingming.color.asureCorrectCount/temp.cases.namedTest.duizhengmingming.color.asureCount===0?1:temp.cases.namedTest.duizhengmingming.color.asureCount}}% 正确确认数（{{temp.cases.namedTest.duizhengmingming.color.asureCorrectCount}}）/ 需确认数（{{temp.cases.namedTest.duizhengmingming.color.asureCount}}）</td>
            </tr>
            <tr>
              <td>49</td>
              <td>熨斗</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[49]">{{temp.cases.namedTest.duizhengmingming.results[49].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[49]">{{temp.cases.namedTest.duizhengmingming.results[49].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[49] && temp.cases.namedTest.duizhengmingming.results[49].assureReact==0" type="checkbox" :checked="true" >干洗</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[49] && temp.cases.namedTest.duizhengmingming.results[49].assureReact==1" type="checkbox" :checked="true" >群殴</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[49] && temp.cases.namedTest.duizhengmingming.results[49].assureReact==2" type="checkbox" :checked="true" >熨斗</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[49]">{{temp.cases.namedTest.duizhengmingming.results[49].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>50</td>
              <td>积木</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[50]">{{temp.cases.namedTest.duizhengmingming.results[50].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[50]">{{temp.cases.namedTest.duizhengmingming.results[50].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[50] && temp.cases.namedTest.duizhengmingming.results[50].assureReact==0" type="checkbox" :checked="true" >祈福</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[50] && temp.cases.namedTest.duizhengmingming.results[50].assureReact==1" type="checkbox" :checked="true" >积木</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[50] && temp.cases.namedTest.duizhengmingming.results[50].assureReact==2" type="checkbox" :checked="true" >陀螺</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[50]">{{temp.cases.namedTest.duizhengmingming.results[50].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>51</td>
              <td>拖把</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[51]">{{temp.cases.namedTest.duizhengmingming.results[51].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[51]">{{temp.cases.namedTest.duizhengmingming.results[51].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[51] && temp.cases.namedTest.duizhengmingming.results[51].assureReact==0" type="checkbox" :checked="true" >拖把</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[51] && temp.cases.namedTest.duizhengmingming.results[51].assureReact==1" type="checkbox" :checked="true" >婆妈</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[51] && temp.cases.namedTest.duizhengmingming.results[51].assureReact==2" type="checkbox" :checked="true" >洒扫</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[51]">{{temp.cases.namedTest.duizhengmingming.results[51].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>52</td>
              <td>古筝</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[52]">{{temp.cases.namedTest.duizhengmingming.results[52].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[52]">{{temp.cases.namedTest.duizhengmingming.results[52].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[52] && temp.cases.namedTest.duizhengmingming.results[52].assureReact==0" type="checkbox" :checked="true" >武圣</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[52] && temp.cases.namedTest.duizhengmingming.results[52].assureReact==1" type="checkbox" :checked="true" >古筝</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[52] && temp.cases.namedTest.duizhengmingming.results[52].assureReact==2" type="checkbox" :checked="true" >弹拨</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[52]">{{temp.cases.namedTest.duizhengmingming.results[52].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>53</td>
              <td>掸子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[53]">{{temp.cases.namedTest.duizhengmingming.results[53].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[53]">{{temp.cases.namedTest.duizhengmingming.results[53].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[53] && temp.cases.namedTest.duizhengmingming.results[53].assureReact==0" type="checkbox" :checked="true" >拂尘</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[53] && temp.cases.namedTest.duizhengmingming.results[53].assureReact==1" type="checkbox" :checked="true" >甘孜</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[53] && temp.cases.namedTest.duizhengmingming.results[53].assureReact==2" type="checkbox" :checked="true" >掸子</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[53]">{{temp.cases.namedTest.duizhengmingming.results[53].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>54</td>
              <td>飞镖</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[54]">{{temp.cases.namedTest.duizhengmingming.results[54].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[54]">{{temp.cases.namedTest.duizhengmingming.results[54].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[54] && temp.cases.namedTest.duizhengmingming.results[54].assureReact==0" type="checkbox" :checked="true" >北漂</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[54] && temp.cases.namedTest.duizhengmingming.results[54].assureReact==1" type="checkbox" :checked="true" >飞镖</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[54] && temp.cases.namedTest.duizhengmingming.results[54].assureReact==2" type="checkbox" :checked="true" >弩箭</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[54]">{{temp.cases.namedTest.duizhengmingming.results[54].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>55</td>
              <td>高跷</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[55]">{{temp.cases.namedTest.duizhengmingming.results[55].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[55]">{{temp.cases.namedTest.duizhengmingming.results[55].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[55] && temp.cases.namedTest.duizhengmingming.results[55].assureReact==0" type="checkbox" :checked="true" >高跷</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[55] && temp.cases.namedTest.duizhengmingming.results[55].assureReact==1" type="checkbox" :checked="true" >旱船</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[55] && temp.cases.namedTest.duizhengmingming.results[55].assureReact==2" type="checkbox" :checked="true" >浩渺 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[55]">{{temp.cases.namedTest.duizhengmingming.results[55].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>56</td>
              <td>滑板</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[56]">{{temp.cases.namedTest.duizhengmingming.results[56].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[56]">{{temp.cases.namedTest.duizhengmingming.results[56].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[56] && temp.cases.namedTest.duizhengmingming.results[56].assureReact==0" type="checkbox" :checked="true" >挂毯</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[56] && temp.cases.namedTest.duizhengmingming.results[56].assureReact==1" type="checkbox" :checked="true" >滑板</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[56] && temp.cases.namedTest.duizhengmingming.results[56].assureReact==2" type="checkbox" :checked="true" >溜冰</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[56]">{{temp.cases.namedTest.duizhengmingming.results[56].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>57</td>
              <td>窗花</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[57]">{{temp.cases.namedTest.duizhengmingming.results[57].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[57]">{{temp.cases.namedTest.duizhengmingming.results[57].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[57] && temp.cases.namedTest.duizhengmingming.results[57].assureReact==0" type="checkbox" :checked="true" >春联</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[57] && temp.cases.namedTest.duizhengmingming.results[57].assureReact==1" type="checkbox" :checked="true" >光华</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[57] && temp.cases.namedTest.duizhengmingming.results[57].assureReact==2" type="checkbox" :checked="true" >窗花</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[57]">{{temp.cases.namedTest.duizhengmingming.results[57].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>58</td>
              <td>浴缸</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[58]">{{temp.cases.namedTest.duizhengmingming.results[58].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[58]">{{temp.cases.namedTest.duizhengmingming.results[58].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[58] && temp.cases.namedTest.duizhengmingming.results[58].assureReact==0" type="checkbox" :checked="true" >浴缸</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[58] && temp.cases.namedTest.duizhengmingming.results[58].assureReact==1" type="checkbox" :checked="true" >铝厂</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[58] && temp.cases.namedTest.duizhengmingming.results[58].assureReact==2" type="checkbox" :checked="true" >泡澡</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[58]">{{temp.cases.namedTest.duizhengmingming.results[58].assureReactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">低频名词小计</td>
              <td colspan="2">{{temp.cases.namedTest.duizhengmingming.low.correctCount}} /10</td>
              <td colspan="4">正确率 =　{{temp.cases.namedTest.duizhengmingming.low.asureCorrectCount/temp.cases.namedTest.duizhengmingming.low.asureCount===0?1:temp.cases.namedTest.duizhengmingming.low.asureCount}}% 正确确认数（{{temp.cases.namedTest.duizhengmingming.low.asureCorrectCount}}）/ 需确认数（{{temp.cases.namedTest.duizhengmingming.low.asureCount}}）</td>
            </tr>
            <tr>
              <td>练习2</td>
              <td>推</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[59]">{{temp.cases.namedTest.duizhengmingming.results[59].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[59]">{{temp.cases.namedTest.duizhengmingming.results[59].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[59] && temp.cases.namedTest.duizhengmingming.results[59].assureReact==0" type="checkbox" :checked="true" >举</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[59] && temp.cases.namedTest.duizhengmingming.results[59].assureReact==1" type="checkbox" :checked="true" >吹</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[59] && temp.cases.namedTest.duizhengmingming.results[59].assureReact==2" type="checkbox" :checked="true" >推</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[59]">{{temp.cases.namedTest.duizhengmingming.results[59].assureReactType}}</span></td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="8"> </td>
            </tr>
            <tr>
              <td>59</td>
              <td> 摔</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[60]">{{temp.cases.namedTest.duizhengmingming.results[60].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[60]">{{temp.cases.namedTest.duizhengmingming.results[60].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[60] && temp.cases.namedTest.duizhengmingming.results[60].assureReact==0" type="checkbox" :checked="true" >摔</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[60] && temp.cases.namedTest.duizhengmingming.results[60].assureReact==1" type="checkbox" :checked="true" >税</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[60] && temp.cases.namedTest.duizhengmingming.results[60].assureReact==2" type="checkbox" :checked="true" >滑</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[60]">{{temp.cases.namedTest.duizhengmingming.results[60].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>60</td>
              <td>睡觉</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[61]">{{temp.cases.namedTest.duizhengmingming.results[61].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[61]">{{temp.cases.namedTest.duizhengmingming.results[61].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[61] && temp.cases.namedTest.duizhengmingming.results[61].assureReact==0" type="checkbox" :checked="true" >清醒</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[61] && temp.cases.namedTest.duizhengmingming.results[61].assureReact==1" type="checkbox" :checked="true" >数据</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[61] && temp.cases.namedTest.duizhengmingming.results[61].assureReact==2" type="checkbox" :checked="true" >睡觉</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[61]">{{temp.cases.namedTest.duizhengmingming.results[61].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>61</td>
              <td>醉</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[62]">{{temp.cases.namedTest.duizhengmingming.results[62].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[62]">{{temp.cases.namedTest.duizhengmingming.results[62].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[62] && temp.cases.namedTest.duizhengmingming.results[62].assureReact==0" type="checkbox" :checked="true" >浸</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[62] && temp.cases.namedTest.duizhengmingming.results[62].assureReact==1" type="checkbox" :checked="true" >醉</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[62] && temp.cases.namedTest.duizhengmingming.results[62].assureReact==2" type="checkbox" :checked="true" >脆</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[62]">{{temp.cases.namedTest.duizhengmingming.results[62].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>62</td>
              <td>洗澡 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[63]">{{temp.cases.namedTest.duizhengmingming.results[63].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[63]">{{temp.cases.namedTest.duizhengmingming.results[63].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[63] && temp.cases.namedTest.duizhengmingming.results[63].assureReact==0" type="checkbox" :checked="true" >洗澡</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[63] && temp.cases.namedTest.duizhengmingming.results[63].assureReact==1" type="checkbox" :checked="true" >起草</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[63] && temp.cases.namedTest.duizhengmingming.results[63].assureReact==2" type="checkbox" :checked="true" >清洁</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[63]">{{temp.cases.namedTest.duizhengmingming.results[63].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>63</td>
              <td>跪 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[64]">{{temp.cases.namedTest.duizhengmingming.results[64].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[64]">{{temp.cases.namedTest.duizhengmingming.results[64].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[64] && temp.cases.namedTest.duizhengmingming.results[64].assureReact==0" type="checkbox" :checked="true" >卧</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[64] && temp.cases.namedTest.duizhengmingming.results[64].assureReact==1" type="checkbox" :checked="true" >跪</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[64] && temp.cases.namedTest.duizhengmingming.results[64].assureReact==2" type="checkbox" :checked="true" >挥</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[64]">{{temp.cases.namedTest.duizhengmingming.results[64].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>64</td>
              <td>游泳 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[65]">{{temp.cases.namedTest.duizhengmingming.results[65].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[65]">{{temp.cases.namedTest.duizhengmingming.results[65].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[65] && temp.cases.namedTest.duizhengmingming.results[65].assureReact==0" type="checkbox" :checked="true" >沟通</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[65] && temp.cases.namedTest.duizhengmingming.results[65].assureReact==1" type="checkbox" :checked="true" >体操</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[65] && temp.cases.namedTest.duizhengmingming.results[65].assureReact==2" type="checkbox" :checked="true" >游泳</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[65]">{{temp.cases.namedTest.duizhengmingming.results[65].assureReactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">不及物动词小计</td>
              <td colspan="2">{{temp.cases.namedTest.duizhengmingming.vi.correctCount}} /6</td>
              <td colspan="4">正确率 =　{{temp.cases.namedTest.duizhengmingming.vi.asureCorrectCount/temp.cases.namedTest.duizhengmingming.vi.asureCount===0?1:temp.cases.namedTest.duizhengmingming.vi.asureCount}}% 正确确认数（{{temp.cases.namedTest.duizhengmingming.vi.asureCorrectCount}}）/ 需确认数（{{temp.cases.namedTest.duizhengmingming.vi.asureCount}}）</td>
            </tr>
            <tr>
              <td>65</td>
              <td>剪 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[66]">{{temp.cases.namedTest.duizhengmingming.results[66].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[66]">{{temp.cases.namedTest.duizhengmingming.results[66].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[66] && temp.cases.namedTest.duizhengmingming.results[66].assureReact==0" type="checkbox" :checked="true" >粘</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[66] && temp.cases.namedTest.duizhengmingming.results[66].assureReact==1" type="checkbox" :checked="true" >叠</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[66] && temp.cases.namedTest.duizhengmingming.results[66].assureReact==2" type="checkbox" :checked="true" >剪</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[66]">{{temp.cases.namedTest.duizhengmingming.results[66].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>66</td>
              <td>看望 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[67]">{{temp.cases.namedTest.duizhengmingming.results[67].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[67]">{{temp.cases.namedTest.duizhengmingming.results[67].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[67] && temp.cases.namedTest.duizhengmingming.results[67].assureReact==0" type="checkbox" :checked="true" >赶忙</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[67] && temp.cases.namedTest.duizhengmingming.results[67].assureReact==1" type="checkbox" :checked="true" >看望</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[67] && temp.cases.namedTest.duizhengmingming.results[67].assureReact==2" type="checkbox" :checked="true" >礼物</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[67]">{{temp.cases.namedTest.duizhengmingming.results[67].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>67</td>
              <td>逮捕 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[68]">{{temp.cases.namedTest.duizhengmingming.results[68].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[68]">{{temp.cases.namedTest.duizhengmingming.results[68].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[68] && temp.cases.namedTest.duizhengmingming.results[68].assureReact==0" type="checkbox" :checked="true" >地板</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[68] && temp.cases.namedTest.duizhengmingming.results[68].assureReact==1" type="checkbox" :checked="true" >罪犯</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[68] && temp.cases.namedTest.duizhengmingming.results[68].assureReact==2" type="checkbox" :checked="true" >逮捕</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[68]">{{temp.cases.namedTest.duizhengmingming.results[68].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>68</td>
              <td>骑 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[69]">{{temp.cases.namedTest.duizhengmingming.results[69].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[69]">{{temp.cases.namedTest.duizhengmingming.results[69].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[69] && temp.cases.namedTest.duizhengmingming.results[69].assureReact==0" type="checkbox" :checked="true" >骑</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[69] && temp.cases.namedTest.duizhengmingming.results[69].assureReact==1" type="checkbox" :checked="true" >轮</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[69] && temp.cases.namedTest.duizhengmingming.results[69].assureReact==2" type="checkbox" :checked="true" >秋</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[69]">{{temp.cases.namedTest.duizhengmingming.results[69].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>69</td>
              <td>踢 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[70]">{{temp.cases.namedTest.duizhengmingming.results[70].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[70]">{{temp.cases.namedTest.duizhengmingming.results[70].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[70] && temp.cases.namedTest.duizhengmingming.results[70].assureReact==0" type="checkbox" :checked="true" >扔</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[70] && temp.cases.namedTest.duizhengmingming.results[70].assureReact==1" type="checkbox" :checked="true" >踢</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[70] && temp.cases.namedTest.duizhengmingming.results[70].assureReact==2" type="checkbox" :checked="true" >兔</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[70]">{{temp.cases.namedTest.duizhengmingming.results[70].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>70</td>
              <td>表扬 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[71]">{{temp.cases.namedTest.duizhengmingming.results[71].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[71]">{{temp.cases.namedTest.duizhengmingming.results[71].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[71] && temp.cases.namedTest.duizhengmingming.results[71].assureReact==0" type="checkbox" :checked="true" >表扬</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[71] && temp.cases.namedTest.duizhengmingming.results[71].assureReact==1" type="checkbox" :checked="true" >祝贺</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[71] && temp.cases.namedTest.duizhengmingming.results[71].assureReact==2" type="checkbox" :checked="true" >消亡</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[71]">{{temp.cases.namedTest.duizhengmingming.results[71].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>71</td>
              <td>奖励 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[72]">{{temp.cases.namedTest.duizhengmingming.results[72].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[72]">{{temp.cases.namedTest.duizhengmingming.results[72].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[72] && temp.cases.namedTest.duizhengmingming.results[72].assureReact==0" type="checkbox" :checked="true" >剧烈</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[72] && temp.cases.namedTest.duizhengmingming.results[72].assureReact==1" type="checkbox" :checked="true" >惩罚</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[72] && temp.cases.namedTest.duizhengmingming.results[72].assureReact==2" type="checkbox" :checked="true" >奖励</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[72]">{{temp.cases.namedTest.duizhengmingming.results[72].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>72</td>
              <td>喂 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[73]">{{temp.cases.namedTest.duizhengmingming.results[73].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[73]">{{temp.cases.namedTest.duizhengmingming.results[73].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[73] && temp.cases.namedTest.duizhengmingming.results[73].assureReact==0" type="checkbox" :checked="true" >喂</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[73] && temp.cases.namedTest.duizhengmingming.results[73].assureReact==1" type="checkbox" :checked="true" >费</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[73] && temp.cases.namedTest.duizhengmingming.results[73].assureReact==2" type="checkbox" :checked="true" >菜</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[73]">{{temp.cases.namedTest.duizhengmingming.results[73].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>73</td>
              <td>泼 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[74]">{{temp.cases.namedTest.duizhengmingming.results[74].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[74]">{{temp.cases.namedTest.duizhengmingming.results[74].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[74] && temp.cases.namedTest.duizhengmingming.results[74].assureReact==0" type="checkbox" :checked="true" >撇</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[74] && temp.cases.namedTest.duizhengmingming.results[74].assureReact==1" type="checkbox" :checked="true" >泼</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[74] && temp.cases.namedTest.duizhengmingming.results[74].assureReact==2" type="checkbox" :checked="true" >趴</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[74]">{{temp.cases.namedTest.duizhengmingming.results[74].assureReactType}}</span></td>
            </tr>
            <tr>
              <td>74</td>
              <td>询问 </td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[75]">{{temp.cases.namedTest.duizhengmingming.results[75].react}}</span></td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[75]">{{temp.cases.namedTest.duizhengmingming.results[75].reactType}}</span></td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[75] && temp.cases.namedTest.duizhengmingming.results[75].assureReact==0" type="checkbox" :checked="true" >询问</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[75] && temp.cases.namedTest.duizhengmingming.results[75].assureReact==1" type="checkbox" :checked="true" >信任</td>
              <td><input v-if="temp.cases.namedTest.duizhengmingming.results[75] && temp.cases.namedTest.duizhengmingming.results[75].assureReact==2" type="checkbox" :checked="true" >答案</td>
              <td><span v-if="temp.cases.namedTest.duizhengmingming.results[75]">{{temp.cases.namedTest.duizhengmingming.results[75].assureReactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">及物动词小计</td>
              <td colspan="2">{{temp.cases.namedTest.duizhengmingming.vt.correctCount}} /10</td>
              <td colspan="4">正确率 =　{{temp.cases.namedTest.duizhengmingming.vt.asureCorrectCount/temp.cases.namedTest.duizhengmingming.vt.asureCount===0?1:temp.cases.namedTest.duizhengmingming.vt.asureCount}}% 正确确认数（{{temp.cases.namedTest.duizhengmingming.vt.asureCorrectCount}}）/ 需确认数（{{temp.cases.namedTest.duizhengmingming.vt.asureCount}}）</td>
            </tr>
          </tbody>
        </table>
        <!-- 
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
        </table> -->

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
              <tr style="">
                <td class="lian_xi" style=" ">练习1</td>
                <td style=" ">&nbsp;老鼠</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[0]}}</td>
              </tr>
              <tr style="">
                <td style="" colspan="3">&nbsp;</td>
              </tr>
              <tr style="">
                <td style=" ">1</td>
                <td style=" ">&nbsp;兔子</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[1]}}</td>
              </tr>
              <tr style="">
                <td style=" ">2</td>
                <td style=" ">&nbsp;蛇</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[2]}}</td>
              </tr>
              <tr style="">
                <td style=" ">3</td>
                <td style=" ">&nbsp;青蛙</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[3]}}</td>
              </tr>
              <tr style="">
                <td style=" ">4</td>
                <td style=" ">&nbsp;大象</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[4]}}</td>
              </tr>
              <tr style="">
                <td style=" ">5</td>
                <td style=" ">&nbsp;骆驼</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[5]}}</td>
              </tr>
              <tr style="height: 18px;">
                <td style=" height: 18px;" colspan="2">动物小计</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.ani}}/5</td>
              </tr>
              <tr style="">
                <td style=" ">6</td>
                <td style=" ">&nbsp;鞋</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[6]}}</td>
              </tr>
              <tr style="">
                <td style=" ">7</td>
                <td style=" ">&nbsp;裙子</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[7]}}</td>
              </tr>
              <tr style="">
                <td style=" ">8</td>
                <td style=" ">&nbsp;裤子</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[8]}}</td>
              </tr>
              <tr style="">
                <td style=" ">9</td>
                <td style=" ">&nbsp;袜子</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[9]}}</td>
              </tr>
              <tr style="">
                <td style=" ">10</td>
                <td style=" ">&nbsp;帽子</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[10]}}</td>
              </tr>
              <tr style="height: 18px;">
                <td style=" height: 18px;" colspan="2">服装小计</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.cloth}}/5</td>
              </tr>
              <tr style="">
                <td style=" ">11</td>
                <td style=" ">&nbsp;下巴</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[11]}}</td>
              </tr>
              <tr style="">
                <td style=" ">12</td>
                <td style=" ">&nbsp;肩膀</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[12]}}</td>
              </tr>
              <tr style="">
                <td style=" ">13</td>
                <td style=" ">&nbsp;舌头</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[13]}}</td>
              </tr>
              <tr style="">
                <td style=" ">14</td>
                <td style=" ">&nbsp;耳朵</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[14]}}</td>
              </tr>
              <tr style="">
                <td style=" ">15</td>
                <td style=" ">&nbsp;眉毛</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[15]}}</td>
              </tr>
              <tr style="height: 18px;">
                <td style=" height: 18px;" colspan="2">身体小计</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.body}}/5</td>
              </tr>
              <tr style="">
                <td style=" ">16</td>
                <td style=" ">&nbsp;葡萄</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[16]}}</td>
              </tr>
              <tr style="">
                <td style=" ">17</td>
                <td style=" ">&nbsp;玉米</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[17]}}</td>
              </tr>
              <tr style="">
                <td style=" ">18</td>
                <td style=" ">&nbsp;西瓜</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[18]}}</td>
              </tr>
              <tr style="">
                <td style=" ">19</td>
                <td style=" ">&nbsp;梨</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[19]}}</td>
              </tr>
              <tr style="">
                <td style=" ">20</td>
                <td style=" ">&nbsp;白菜</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[20]}}</td>
              </tr>
              <tr style="height: 18px;">
                <td style=" height: 18px;" colspan="2">果蔬小计</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.fruit}}/5</td>
              </tr>
              <tr style="">
                <td style=" ">21</td>
                <td style=" ">&nbsp;锅</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[21]}}</td>
              </tr>
              <tr style="">
                <td style=" ">22</td>
                <td style=" ">&nbsp;钥匙</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[22]}}</td>
              </tr>
              <tr style="">
                <td style=" ">23</td>
                <td style=" ">&nbsp;桶</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[23]}}</td>
              </tr>
              <tr style="">
                <td style=" ">24</td>
                <td style=" ">&nbsp;眼镜</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[24]}}</td>
              </tr>
              <tr style="">
                <td style=" ">25</td>
                <td style=" ">筷子&nbsp;</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[25]}}</td>
              </tr>
              <tr style="height: 18px;">
                <td style=" height: 18px;" colspan="2">工具小计</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.tool}}/5</td>
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
              <tr style="">
                <td >26</td>
                <td >&nbsp;红色</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[26]}}</td>
              </tr>
              <tr style="">
                <td >27</td>
                <td >&nbsp;黄色</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[27]}}</td>
              </tr>
              <tr style="">
                <td >28</td>
                <td >&nbsp;蓝色</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[28]}}</td>
              </tr>
              <tr style="">
                <td >29</td>
                <td >&nbsp;绿色</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[29]}}</td>
              </tr>
              <tr style="">
                <td >30</td>
                <td >&nbsp;黑色</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[30]}}</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">颜色小计</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.color}}/5</td>
              </tr>
              <tr style="">
                <td >31</td>
                <td >&nbsp;高跷</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[31]}}</td>
              </tr>
              <tr style="">
                <td >32</td>
                <td >&nbsp;滑板</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[32]}}</td>
              </tr>
              <tr style="">
                <td >33</td>
                <td >&nbsp;熨斗</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[33]}}</td>
              </tr>
              <tr style="">
                <td >34</td>
                <td >&nbsp;窗花</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[34]}}</td>
              </tr>
              <tr style="">
                <td >35</td>
                <td >&nbsp;浴缸</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[35]}}</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">低频名词小计</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.low}}/5</td>
              </tr>
              <tr style="">
                <td class="lian_xi" >练习2</td>
                <td >&nbsp;坐</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[36]}}</td>
              </tr>
              <tr style="">
                <td style="" colspan="3">&nbsp;</td>
              </tr>
              <tr style="">
                <td >36</td>
                <td >&nbsp;睡觉</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[37]}}</td>
              </tr>
              <tr style="">
                <td >37</td>
                <td >&nbsp;跪</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[38]}}</td>
              </tr>
              <tr style="">
                <td >38</td>
                <td >&nbsp;洗澡</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[39]}}</td>
              </tr>
              <tr style="">
                <td >39</td>
                <td >&nbsp;醉</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[40]}}</td>
              </tr>
              <tr style="">
                <td >40</td>
                <td >&nbsp;游泳</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[41]}}</td>
              </tr>
              <tr style="height: 18px;">
                <td style="width: 35%; height: 18px;" colspan="2">不及物动词小计</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.vi}}/5</td>
              </tr>
              <tr style="">
                <td >41</td>
                <td >&nbsp;剪</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[42]}}</td>
              </tr>
              <tr style="">
                <td >42</td>
                <td >&nbsp;看望</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[43]}}</td>
              </tr>
              <tr style="">
                <td >43</td>
                <td >&nbsp;逮捕</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[44]}}</td>
              </tr>
              <tr style="">
                <td >44</td>
                <td >&nbsp;踢</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[45]}}</td>
              </tr>
              <tr style="">
                <td >45</td>
                <td >&nbsp;表扬</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[46]}}</td>
              </tr>
              <tr style="">
                <td >46</td>
                <td >&nbsp;骑</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[47]}}</td>
              </tr>
              <tr style="">
                <td >47</td>
                <td >&nbsp;喂</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[48]}}</td>
              </tr>
              <tr style="">
                <td >48</td>
                <td >&nbsp;奖励</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[49]}}</td>
              </tr>
              <tr style="">
                <td >49</td>
                <td >&nbsp;泼</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[50]}}</td>
              </tr>
              <tr style="">
                <td >50</td>
                <td >&nbsp;询问</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.results[51]}}</td>
              </tr>
              <tr style="height: 36px;">
                <td  colspan="2">及物动词小计</td>
                <td style=" ">{{temp.cases.namedTest.tingjuelijie.vt}}/5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>表 G　语义关联评分表</h4>
        <table style="width: 100%; text-align: center; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
            <tr class="rtable-header" style="height: 18px;">
              <th style="height: 18px;">序号</th>
              <th style="height: 18px;" colspan="2">项目</th>
              <th style="height: 18px;">标准答案</th>
              <th style="height: 18px;">反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr style="">
              <td class="lian_xi" style="">练习1</td>
              <td style="">&nbsp;毛衣 / 毯子&nbsp;</td>
              <td style="">&nbsp;毛衣 / 枕头&nbsp;</td>
              <td style="">毛衣 / 毯子</td>
                <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[0]">{{temp.cases.namedTest.yuyiguanlian.results[0].reactType}}</span></td>
            </tr>
            <tr style="">
              <td class="lian_xi" style="">练习2</td>
              <td style="">&nbsp;毛衣 / 柜子&nbsp;&nbsp;</td>
              <td style="">毛衣 / 书架&nbsp;</td>
              <td style="">毛衣 / 柜子&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[1]">{{temp.cases.namedTest.yuyiguanlian.results[1].reactType}}</span></td>
            </tr>
            <tr style="">
              <td class="lian_xi" style="">练习3</td>
              <td style="">&nbsp;毛衣 / 磁铁&nbsp;&nbsp;</td>
              <td style="">毛衣 / 裙子&nbsp;</td>
              <td style="">毛衣 / 裙子&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[2]">{{temp.cases.namedTest.yuyiguanlian.results[2].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="" colspan="5">&nbsp;</td>
            </tr>
            <tr style="">
              <td style="">1</td>
              <td style="">&nbsp;骆驼 / 书桌&nbsp;</td>
              <td style="">&nbsp;骆驼 / 三轮车&nbsp;</td>
              <td style="">骆驼 / 三轮车&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[3]">{{temp.cases.namedTest.yuyiguanlian.results[3].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">2</td>
              <td style="">&nbsp;兔子 / 萝卜&nbsp;&nbsp;</td>
              <td style="">兔子 / 肉&nbsp;</td>
              <td style="">兔子 / 萝卜&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[4]">{{temp.cases.namedTest.yuyiguanlian.results[4].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">3</td>
              <td style="">&nbsp;老鼠 / 钉子&nbsp;&nbsp;</td>
              <td style="">老鼠 / 花生&nbsp;</td>
              <td style="f">&nbsp;老鼠 / 花生</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[5]">{{temp.cases.namedTest.yuyiguanlian.results[5].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">4</td>
              <td style="">&nbsp;碗 / 锅&nbsp;&nbsp;</td>
              <td style="">&nbsp;碗 / 铅笔</td>
              <td style="">&nbsp;碗 / 锅</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[6]">{{temp.cases.namedTest.yuyiguanlian.results[6].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">5</td>
              <td style="">&nbsp;松鼠 / 鸡蛋&nbsp;&nbsp;</td>
              <td style="">松鼠 / 核桃&nbsp;</td>
              <td style="">松鼠 / 核桃</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[7]">{{temp.cases.namedTest.yuyiguanlian.results[7].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">6</td>
              <td style="">骆驼 / 金字塔&nbsp;</td>
              <td style="">骆驼 / 东方明珠塔&nbsp;&nbsp;</td>
              <td style="f">&nbsp;骆驼 / 金字塔</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[8]">{{temp.cases.namedTest.yuyiguanlian.results[8].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">7</td>
              <td style="">&nbsp;剪刀 / 纸&nbsp;&nbsp;</td>
              <td style="">剪刀 / 木头&nbsp;</td>
              <td style="">&nbsp;剪刀 / 纸&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[9]">{{temp.cases.namedTest.yuyiguanlian.results[9].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">8</td>
              <td style="">碗 / 水槽&nbsp;</td>
              <td style="">&nbsp;碗 / 床&nbsp;</td>
              <td style="">&nbsp;碗 / 水槽</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[10]">{{temp.cases.namedTest.yuyiguanlian.results[10].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">9</td>
              <td style="">眼镜 / 铅笔盒&nbsp;</td>
              <td style="">眼镜 / 眼镜盒&nbsp;&nbsp;</td>
              <td style="">眼镜 / 眼镜盒&nbsp;&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[11]">{{temp.cases.namedTest.yuyiguanlian.results[11].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">10</td>
              <td style="">老鼠 / 垃圾箱&nbsp;&nbsp;</td>
              <td style="">&nbsp;老鼠 / 鸟笼</td>
              <td style="">老鼠 / 垃圾箱&nbsp;&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[12]">{{temp.cases.namedTest.yuyiguanlian.results[12].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">11</td>
              <td style="">&nbsp;锯子 / 木头&nbsp;&nbsp;</td>
              <td style="">锯子 / 面包&nbsp;</td>
              <td style="">锯子 / 木头&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[13]">{{temp.cases.namedTest.yuyiguanlian.results[13].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">12</td>
              <td style="">&nbsp;松鼠 / 树&nbsp;</td>
              <td style="">松鼠 / 氢气球&nbsp;&nbsp;</td>
              <td style="">松鼠 / 树&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[14]">{{temp.cases.namedTest.yuyiguanlian.results[14].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">13</td>
              <td style="">&nbsp;剪刀 / 保险箱&nbsp;</td>
              <td style="">剪刀 / 桌子&nbsp;&nbsp;</td>
              <td style="">&nbsp;剪刀 / 桌子</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[15]">{{temp.cases.namedTest.yuyiguanlian.results[15].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">14</td>
              <td style="">眼镜 / 耳朵&nbsp;&nbsp;</td>
              <td style="">&nbsp;眼镜 / 眼睛</td>
              <td style="">眼镜 / 眼睛&nbsp;&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[16]">{{temp.cases.namedTest.yuyiguanlian.results[16].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">15</td>
              <td style="">锯子 / 锅&nbsp;</td>
              <td style="">锯子 / 斧头&nbsp;</td>
              <td style="">锯子 / 斧头&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[17]">{{temp.cases.namedTest.yuyiguanlian.results[17].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="">16</td>
              <td style="">兔子 / 兔窝&nbsp;&nbsp;</td>
              <td style="">兔子 / 鸟笼&nbsp;</td>
              <td style="">&nbsp;兔子 / 兔窝&nbsp;</td>
              <td style=" "><span v-if="temp.cases.namedTest.yuyiguanlian.results[18]">{{temp.cases.namedTest.yuyiguanlian.results[18].reactType}}</span></td>
            </tr>
            <tr style="">
              <td style="" colspan="2">动物小计</td>
              <td style="">{{temp.cases.namedTest.yuyiguanlian.ani}}/8</td>
              <td style="" rowspan="2">合计</td>
              <td style="" rowspan="2">{{temp.cases.namedTest.yuyiguanlian.total}}/16</td>
            </tr>
            <tr style="">
              <td style="" colspan="2">工具小计</td>
              <td style="">{{temp.cases.namedTest.yuyiguanlian.tool}}/8</td>
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
              <th style="width: 30%; height: 18px;">反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td class="lian_xi" >练习1</td>
              <td >祛 / 候</td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[0]">{{temp.cases.namedTest.jiacifushu.results[0].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[0]">{{temp.cases.namedTest.jiacifushu.results[0].reactType}}</span></td>
            </tr>
            <tr >
              <td  colspan="4">&nbsp;</td>
            </tr>
            <tr >
              <td >1</td>
              <td >&nbsp;铁 / 日</td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[1]">{{temp.cases.namedTest.jiacifushu.results[1].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[1]">{{temp.cases.namedTest.jiacifushu.results[1].reactType}}</span></td>
            </tr>
            <tr >
              <td >2</td>
              <td >&nbsp;过 / 开</td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[2]">{{temp.cases.namedTest.jiacifushu.results[2].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[2]">{{temp.cases.namedTest.jiacifushu.results[2].reactType}}</span></td>
            </tr>
            <tr >
              <td >3</td>
              <td >&nbsp;合 / 眯</td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[3]">{{temp.cases.namedTest.jiacifushu.results[3].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[3]">{{temp.cases.namedTest.jiacifushu.results[3].reactType}}</span></td>
            </tr>
            <tr >
              <td >4</td>
              <td >&nbsp;清 / 朵</td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[4]">{{temp.cases.namedTest.jiacifushu.results[4].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[4]">{{temp.cases.namedTest.jiacifushu.results[4].reactType}}</span></td>
            </tr>
            <tr >
              <td >5</td>
              <td >啤 / 然&nbsp;</td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[5]">{{temp.cases.namedTest.jiacifushu.results[5].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[5]">{{temp.cases.namedTest.jiacifushu.results[5].reactType}}</span></td>
            </tr>
            <tr >
              <td >6</td>
              <td >&nbsp;倭 / 见</td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[6]">{{temp.cases.namedTest.jiacifushu.results[6].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[6]">{{temp.cases.namedTest.jiacifushu.results[6].reactType}}</span></td>
            </tr>
            <tr >
              <td >7</td>
              <td >&nbsp;沮 / 骈</td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[7]">{{temp.cases.namedTest.jiacifushu.results[7].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[7]">{{temp.cases.namedTest.jiacifushu.results[7].reactType}}</span></td>
            </tr>
            <tr >
              <td >8</td>
              <td >&nbsp;礁 / 氓</td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[7]">{{temp.cases.namedTest.jiacifushu.results[7].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.jiacifushu.results[7]">{{temp.cases.namedTest.jiacifushu.results[7].reactType}}</span></td>
            </tr>
            <tr >
              <td  colspan="3">合计</td>
              <td >{{temp.cases.namedTest.jiacifushu.total}}/8</td>
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
              <th style="width: 30%; height: 18px;">反应类别</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td class="lian_xi" >练习1</td>
              <td >地 / 点</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[0]">{{temp.cases.namedTest.zhencifushu.results[0].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[0]">{{temp.cases.namedTest.zhencifushu.results[0].reactType}}</span></td>
            </tr>
            <tr >
              <td  colspan="4">&nbsp;</td>
            </tr>
            <tr >
              <td >1</td>
              <td >蝴 / 蝶</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[1]">{{temp.cases.namedTest.zhencifushu.results[1].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[1]">{{temp.cases.namedTest.zhencifushu.results[1].reactType}}</span></td>
            </tr>
            <tr >
              <td >2</td>
              <td >蚂 / 蟥</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[2]">{{temp.cases.namedTest.zhencifushu.results[2].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[2]">{{temp.cases.namedTest.zhencifushu.results[2].reactType}}</span></td>
            </tr>
            <tr >
              <td >3</td>
              <td >咳 / 嗽</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[3]">{{temp.cases.namedTest.zhencifushu.results[3].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[3]">{{temp.cases.namedTest.zhencifushu.results[3].reactType}}</span></td>
            </tr>
            <tr >
              <td >4</td>
              <td >撺 / 掇</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[4]">{{temp.cases.namedTest.zhencifushu.results[4].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[4]">{{temp.cases.namedTest.zhencifushu.results[4].reactType}}</span></td>
            </tr>
            <tr >
              <td >5</td>
              <td >菊 / 花</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[5]">{{temp.cases.namedTest.zhencifushu.results[5].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[5]">{{temp.cases.namedTest.zhencifushu.results[5].reactType}}</span></td>
            </tr>
            <tr >
              <td >6</td>
              <td >樟 / 木</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[6]">{{temp.cases.namedTest.zhencifushu.results[6].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[6]">{{temp.cases.namedTest.zhencifushu.results[6].reactType}}</span></td>
            </tr>
            <tr >
              <td >7</td>
              <td >孵 / 化</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[7]">{{temp.cases.namedTest.zhencifushu.results[7].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[7]">{{temp.cases.namedTest.zhencifushu.results[7].reactType}}</span></td>
            </tr>
            <tr >
              <td >8</td>
              <td >捧 / 场</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[8]">{{temp.cases.namedTest.zhencifushu.results[8].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[8]">{{temp.cases.namedTest.zhencifushu.results[8].reactType}}</span></td>
            </tr>
            <tr >
              <td >9</td>
              <td >手 / 工</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[9]">{{temp.cases.namedTest.zhencifushu.results[9].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[9]">{{temp.cases.namedTest.zhencifushu.results[9].reactType}}</span></td>
            </tr>
            <tr >
              <td >10</td>
              <td >白 / 水</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[10]">{{temp.cases.namedTest.zhencifushu.results[10].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[10]">{{temp.cases.namedTest.zhencifushu.results[10].reactType}}</span></td>
            </tr>
            <tr >
              <td >11</td>
              <td >转 / 动</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[11]">{{temp.cases.namedTest.zhencifushu.results[11].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[11]">{{temp.cases.namedTest.zhencifushu.results[11].reactType}}</span></td>
            </tr>
            <tr >
              <td >12</td>
              <td >风 / 干</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[12]">{{temp.cases.namedTest.zhencifushu.results[12].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[12]">{{temp.cases.namedTest.zhencifushu.results[12].reactType}}</span></td>
            </tr>
            <tr >
              <td >13</td>
              <td >海 / 湾</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[13]">{{temp.cases.namedTest.zhencifushu.results[13].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[13]">{{temp.cases.namedTest.zhencifushu.results[13].reactType}}</span></td>
            </tr>
            <tr >
              <td >14</td>
              <td >马 / 驹</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[14]">{{temp.cases.namedTest.zhencifushu.results[14].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[14]">{{temp.cases.namedTest.zhencifushu.results[14].reactType}}</span></td>
            </tr>
            <tr >
              <td >15</td>
              <td >分 / 泌</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[15]">{{temp.cases.namedTest.zhencifushu.results[15].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[15]">{{temp.cases.namedTest.zhencifushu.results[15].reactType}}</span></td>
            </tr>
            <tr >
              <td >16</td>
              <td >打 / 嗝</td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[16]">{{temp.cases.namedTest.zhencifushu.results[16].react}}</span></td>
              <td ><span v-if="temp.cases.namedTest.zhencifushu.results[16]">{{temp.cases.namedTest.zhencifushu.results[16].reactType}}</span></td>
            </tr>
            <tr >
              <td  colspan="3">合计</td>
              <td >{{temp.cases.namedTest.zhencifushu.total}}/16</td>
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
              <td>{{temp.cases.namedTest.huizong.yyjm[0]}}/8</td>
              <td>{{temp.cases.namedTest.huizong.sdjm[0]}}/8</td>
              <td> </td>
              <td> </td>
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
              <td>{{temp.cases.namedTest.huizong.yyjm[1]}}/6</td>
              <td>{{temp.cases.namedTest.huizong.sdjm[1]}}/6</td>
              <td> </td>
              <td> </td>
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
              <td>{{temp.cases.namedTest.huizong.yyjm[2]}}/4</td>
              <td> </td>
              <td> </td>
              <td> </td>
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
              <td>{{temp.cases.namedTest.huizong.yyjm[3]}}/4</td>
              <td> </td>
              <td> </td>
              <td> </td>
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
              <td>{{temp.cases.namedTest.huizong.sdjm[2]}}/12</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.tjch[0]}}/12</td>
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
              <td>{{temp.cases.namedTest.huizong.yyjm[4]}}/8</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.yyio[0]}}/8</td>
              <td> </td>
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
              <td>{{temp.cases.namedTest.huizong.yyjm[5]}}/8</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.yyio[1]}}/8</td>
              <td> </td>
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
              <td>{{temp.cases.namedTest.huizong.yych[0]}}/8</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[0]}}/8</td>
              <td>{{temp.cases.namedTest.huizong.smd[0]}}/8</td>
              <td>{{temp.cases.namedTest.huizong.mdb[0]}}/8</td>
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
              <td>{{temp.cases.namedTest.huizong.yych[1]}}/8</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[1]}}/8</td>
              <td>{{temp.cases.namedTest.huizong.smd[1]}}/8</td>
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
              <td>{{temp.cases.namedTest.huizong.yych[2]}}/8</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[2]}}/8</td>
              <td>{{temp.cases.namedTest.huizong.smd[2]}}/8</td>
              <td>{{temp.cases.namedTest.huizong.mdb[1]}}/8</td>
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
              <td>{{temp.cases.namedTest.huizong.yych[3]}}/8</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[3]}}/8</td>
              <td>{{temp.cases.namedTest.huizong.smd[3]}}/8</td>
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
              <td>{{temp.cases.namedTest.huizong.yych[4]}}/8</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[4]}}/8</td>
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
              <td>{{temp.cases.namedTest.huizong.yych[5]}}/8</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[5]}}/8</td>
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
              <td>{{temp.cases.namedTest.huizong.yych[6]}}/10</td>
              <td>{{temp.cases.namedTest.huizong.dpc[0]}}/10</td>
              <td></td>
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
              <td>{{temp.cases.namedTest.huizong.yych[7]}}/6</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mdb[2]}}/6</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.dcly[0]}}/6</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>及动小计</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.yych[8]}}/10</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mdb[3]}}/10</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.dcly[1]}}/10</td>
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
              <td>{{temp.cases.namedTest.huizong.tjch[1]}}/5</td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[6]}}/5</td>
              <td>{{temp.cases.namedTest.huizong.smd[4]}}/5</td>
              <td>{{temp.cases.namedTest.huizong.mdb[4]}}/5</td>
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
              <td>{{temp.cases.namedTest.huizong.tjch[2]}}/5</td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[7]}}/5</td>
              <td>{{temp.cases.namedTest.huizong.smd[5]}}/5</td>
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
              <td>{{temp.cases.namedTest.huizong.tjch[3]}}/5</td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[8]}}/5</td>
              <td>{{temp.cases.namedTest.huizong.smd[6]}}/5</td>
              <td>{{temp.cases.namedTest.huizong.mdb[5]}}/5</td>
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
              <td>{{temp.cases.namedTest.huizong.tjch[4]}}/5</td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[9]}}/5</td>
              <td>{{temp.cases.namedTest.huizong.smd[7]}}/5</td>
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
              <td>{{temp.cases.namedTest.huizong.tjch[5]}}/5</td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[10]}}/5</td>
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
              <td>{{temp.cases.namedTest.huizong.tjch[6]}}/5</td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mcfl[11]}}/5</td>
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
              <td>{{temp.cases.namedTest.huizong.tjch[7]}}/5</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.dpc[1]}}/5</td>
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
              <td>{{temp.cases.namedTest.huizong.tjch[8]}}/5</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mdb[6]}}/5</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.dcly[2]}}/5</td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>及动小计 </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.tjch[9]}}/10</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.mdb[7]}}/10</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.dcly[3]}}/10</td>
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
              <td>{{temp.cases.namedTest.huizong.yygl[0]}}/8</td>
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
              <td>{{temp.cases.namedTest.huizong.yygl[1]}}/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td> 假词复述（表 H）</td>
              <td>合计</td>
              <td>{{temp.cases.namedTest.huizong.yyjm[6]}}/8</td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.yyio[2]}}/8</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.dj[0]}}/8</td>
            </tr>
            <tr>
              <td> 真词复述（表 I）</td>
              <td>合计</td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.yyio[3]}}/16</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.namedTest.huizong.dj[1]}}/16</td>
            </tr>
          </tbody>
        </table>

        <h4>表 Z　语言认知能力评估表</h4>
        <div style="width: 40%; display: inline-block; margin-bottom: 35px;">
          <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
          <thead>
          <tr class="rtable-header" style="height: 18px;">
          <th style="width: 13%;"> 语言加工能力</th>
          <th style="width: 10%;"> </th>
          <th style="width: 10%;"> 原始得分</th>
          <th style="width: 10%;"> 正确率</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td rowspan="3">语音分析能力   </td>
          <td> 语音解码</td>
          <td>{{temp.cases.namedTest.pinggu.yyjm.correct}}/46</td>
          <td>{{temp.cases.namedTest.pinggu.yyjm.rate}}% </td>
          </tr>
          <tr>
          <td> 声调解码</td>
          <td>{{temp.cases.namedTest.pinggu.sdjm.correct}}/26</td>
          <td>{{temp.cases.namedTest.pinggu.sdjm.rate}}% </td>
          </tr>
          <tr>
          <td>听觉输入到语音输出 </td>
          <td>{{temp.cases.namedTest.pinggu.yyio.correct}}/40</td>
          <td>{{temp.cases.namedTest.pinggu.yyio.rate}}% </td>
          </tr>
          <tr>
          <td rowspan="3">词汇加工能力   </td>
          <td>听觉词汇理解 </td>
          <td>{{temp.cases.namedTest.pinggu.tjch.correct}}/70</td>
          <td>{{temp.cases.namedTest.pinggu.tjch.rate}}% </td>
          </tr>
          <tr>
          <td> 语音词汇产出</td>
          <td>{{temp.cases.namedTest.pinggu.yych.correct}}/74</td>
          <td>{{temp.cases.namedTest.pinggu.yych.rate}}% </td>
          </tr>
          <tr>
          <td>低频词提取 </td>
          <td>{{temp.cases.namedTest.pinggu.dpc.correct}}/15</td>
          <td>{{temp.cases.namedTest.pinggu.dpc.rate}}% </td>
          </tr>
          <tr>
          <td rowspan="5">语义加工能力  </td>
          <td>名词范畴分类</td>
          <td>{{temp.cases.namedTest.pinggu.mcfl.correct}}/78</td>
          <td>{{temp.cases.namedTest.pinggu.mcfl.rate}}% </td>
          </tr>
          <tr>
          <td>名词生命度</td>
          <td>{{temp.cases.namedTest.pinggu.smd.correct}}/52</td>
          <td>{{temp.cases.namedTest.pinggu.smd.rate}}% </td>
          </tr>
          <tr>
          <td>名词动词范畴分离</td>
          <td colspan="2">{{temp.cases.namedTest.pinggu.mdb.correct}}/26： /31</td>
          </tr>
          <tr>
          <td>语义关联 </td>
          <td>{{temp.cases.namedTest.pinggu.yygl.correct}}/16</td>
          <td>{{temp.cases.namedTest.pinggu.yygl.rate}}% </td>
          </tr>
          <tr>
          <td>动词论元结构 </td>
          <td>{{temp.cases.namedTest.pinggu.dcly.correct}}/16</td>
          <td>{{temp.cases.namedTest.pinggu.dcly.rate}}% </td>
          </tr>
          <tr>
          <td rowspan="2">认知能力 </td>
          <td>视觉感知物体能力 </td>
          <td> </td>
          <td>{{temp.cases.namedTest.pinggu.sj.rate}}% </td>
          </tr>
          <tr>
          <td>听觉短时记忆</td>
          <td>{{temp.cases.namedTest.pinggu.dj.correct}}/24</td>
          <td>{{temp.cases.namedTest.pinggu.dj.rate}}% </td>
          </tr>
          </tbody>
          </table>
        </div>
        <div style='width: 50%; height:300px; display: inline-block;'>
            <e-chart height='400px' width='100%' :options="renzhi_bar_options"></e-chart>
        </div>

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
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[0]">{{temp.cases.verbTest.dongcimingming.results[0].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[0]">{{temp.cases.verbTest.dongcimingming.results[0].reactType}}</span></td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td>发抖</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[1]">{{temp.cases.verbTest.dongcimingming.results[1].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[1]">{{temp.cases.verbTest.dongcimingming.results[1].reactType}}</span></td>
            </tr>
            <tr style="height: 18px;">
              <td colspan="4"> </td>
            </tr>
            <tr>
              <td>1</td>
              <td>睡觉</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[2]">{{temp.cases.verbTest.dongcimingming.results[2].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[2]">{{temp.cases.verbTest.dongcimingming.results[2].reactType}}</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>跪</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[3]">{{temp.cases.verbTest.dongcimingming.results[3].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[3]">{{temp.cases.verbTest.dongcimingming.results[3].reactType}}</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>蹲</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[4]">{{temp.cases.verbTest.dongcimingming.results[4].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[4]">{{temp.cases.verbTest.dongcimingming.results[4].reactType}}</span></td>
            </tr>
            <tr>
              <td>4</td>
              <td>游泳</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[5]">{{temp.cases.verbTest.dongcimingming.results[5].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[5]">{{temp.cases.verbTest.dongcimingming.results[5].reactType}}</span></td>
            </tr>
            <tr>
              <td>5</td>
              <td>醉</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[6]">{{temp.cases.verbTest.dongcimingming.results[6].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[6]">{{temp.cases.verbTest.dongcimingming.results[6].reactType}}</span></td>
            </tr>
            <tr>
              <td>6</td>
              <td>洗澡</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[7]">{{temp.cases.verbTest.dongcimingming.results[7].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[7]">{{temp.cases.verbTest.dongcimingming.results[7].reactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">一元动词小计</td>
              <td></td>
              <td>正确次数 {{temp.cases.verbTest.dongcimingming.one.correct}}/6  正确率{{temp.cases.verbTest.dongcimingming.one.rate}}%</td>
            </tr>
            <tr>
              <td>7</td>
              <td>骑</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[8]">{{temp.cases.verbTest.dongcimingming.results[8].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[8]">{{temp.cases.verbTest.dongcimingming.results[8].reactType}}</span></td>
            </tr>
            <tr>
              <td>8</td>
              <td>表扬</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[9]">{{temp.cases.verbTest.dongcimingming.results[9].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[9]">{{temp.cases.verbTest.dongcimingming.results[9].reactType}}</span></td>
            </tr>
            <tr>
              <td>9</td>
              <td>剪</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[10]">{{temp.cases.verbTest.dongcimingming.results[10].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[10]">{{temp.cases.verbTest.dongcimingming.results[10].reactType}}</span></td>
            </tr>
            <tr>
              <td>10</td>
              <td>看望</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[11]">{{temp.cases.verbTest.dongcimingming.results[11].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[11]">{{temp.cases.verbTest.dongcimingming.results[11].reactType}}</span></td>
            </tr>
            <tr>
              <td>11</td>
              <td>逮捕</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[12]">{{temp.cases.verbTest.dongcimingming.results[12].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[12]">{{temp.cases.verbTest.dongcimingming.results[12].reactType}}</span></td>
            </tr>
            <tr>
              <td>12</td>
              <td>踢</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[13]">{{temp.cases.verbTest.dongcimingming.results[13].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[13]">{{temp.cases.verbTest.dongcimingming.results[13].reactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">二元动词小计</td>
              <td> </td>
              <td>正确次数 {{temp.cases.verbTest.dongcimingming.tow.correct}}/6  正确率{{temp.cases.verbTest.dongcimingming.tow.rate}}%</td>
            </tr>
            <tr>
              <td>13</td>
              <td>赠送 </td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[14]">{{temp.cases.verbTest.dongcimingming.results[14].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[14]">{{temp.cases.verbTest.dongcimingming.results[14].reactType}}</span></td>
            </tr>
            <tr>
              <td>14</td>
              <td> 给</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[15]">{{temp.cases.verbTest.dongcimingming.results[15].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[15]">{{temp.cases.verbTest.dongcimingming.results[15].reactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">    强显性三元 (xyz) 小计</td>
              <td> </td>
              <td>正确次数 {{temp.cases.verbTest.dongcimingming.three1.correct}}/2  正确率{{temp.cases.verbTest.dongcimingming.three1.rate}}%</td>
            </tr>
            <tr>
              <td>15</td>
              <td>  奖励</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[16]">{{temp.cases.verbTest.dongcimingming.results[16].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[16]">{{temp.cases.verbTest.dongcimingming.results[16].reactType}}</span></td>
            </tr>
            <tr>
              <td>16</td>
              <td>  喂</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[17]">{{temp.cases.verbTest.dongcimingming.results[17].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[17]">{{temp.cases.verbTest.dongcimingming.results[17].reactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">中显性三元 (xy) 小计</td>
              <td> </td>
              <td>正确次数 {{temp.cases.verbTest.dongcimingming.three2.correct}}/2  正确率{{temp.cases.verbTest.dongcimingming.three2.rate}}%</td>
            </tr>
            <tr>
              <td>17</td>
              <td>泼</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[18]">{{temp.cases.verbTest.dongcimingming.results[18].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[18]">{{temp.cases.verbTest.dongcimingming.results[18].reactType}}</span></td>
            </tr>
            <tr>
              <td>18</td>
              <td>卖</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[19]">{{temp.cases.verbTest.dongcimingming.results[19].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[19]">{{temp.cases.verbTest.dongcimingming.results[19].reactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">  中显性三元 (xz) 小计</td>
              <td> </td>
              <td>正确次数 {{temp.cases.verbTest.dongcimingming.three3.correct}}/2  正确率{{temp.cases.verbTest.dongcimingming.three3.rate}}%</td>
            </tr>
            <tr>
              <td>19</td>
              <td>询问 </td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[20]">{{temp.cases.verbTest.dongcimingming.results[20].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[20]">{{temp.cases.verbTest.dongcimingming.results[20].reactType}}</span></td>
            </tr>
            <tr>
              <td>20</td>
              <td> 教</td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[21]">{{temp.cases.verbTest.dongcimingming.results[21].react}}</span></td>
              <td ><span v-if="temp.cases.verbTest.dongcimingming.results[21]">{{temp.cases.verbTest.dongcimingming.results[21].reactType}}</span></td>
            </tr>
            <tr>
              <td colspan="2">  弱显性三元 (xy/z) 小计</td>
              <td> </td>
              <td>正确次数 {{temp.cases.verbTest.dongcimingming.three4.correct}}/2  正确率{{temp.cases.verbTest.dongcimingming.three4.rate}}%</td>
            </tr>
            <tr>
              <td colspan="2">  一元动词合计</td>
              <td>正确次数  {{temp.cases.verbTest.dongcimingming.one.correct}}/6</td>
              <td>正确率{{temp.cases.verbTest.dongcimingming.one.rate}}%</td>
            </tr>
            <tr>
              <td colspan="2">  二元动词合计</td>
              <td>正确次数  {{temp.cases.verbTest.dongcimingming.tow.correct}}/6</td>
              <td>正确率{{temp.cases.verbTest.dongcimingming.tow.rate}}%</td>
            </tr>
            <tr>
              <td colspan="2">  三元动词合计</td>
              <td>正确次数  {{temp.cases.verbTest.dongcimingming.three1.correct + temp.cases.verbTest.dongcimingming.three2.correct + temp.cases.verbTest.dongcimingming.three3.correct + temp.cases.verbTest.dongcimingming.three4.correct}}/8</td>
              <td>正确率{{temp.cases.verbTest.dongcimingming.three1.correct + temp.cases.verbTest.dongcimingming.three2.correct + temp.cases.verbTest.dongcimingming.three3.correct + temp.cases.verbTest.dongcimingming.three4.correct /8}}%</td>
            </tr>
            <tr>
              <td colspan="2"> 总计</td>
              <td>正确次数  {{temp.cases.verbTest.dongcimingming.total.correct}}/20</td>
              <td>正确率{{temp.cases.verbTest.dongcimingming.total.rate}}%</td>
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
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[0]">{{temp.cases.verbTest.dongcilijie.results[0].react}}</span></td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td>发抖</td>
              <td>跑步 </td>
              <td>搬 </td>
              <td>喝 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[1]">{{temp.cases.verbTest.dongcilijie.results[1].react}}</span></td>
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
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[2]">{{temp.cases.verbTest.dongcilijie.results[2].react}}</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>跪</td>
              <td>醉</td>
              <td>背</td>
              <td>罚</td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[3]">{{temp.cases.verbTest.dongcilijie.results[3].react}}</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>蹲</td>
              <td>跪</td>
              <td>追</td>
              <td>回答</td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[4]">{{temp.cases.verbTest.dongcilijie.results[4].react}}</span></td>
            </tr>
            <tr>
              <td>4</td>
              <td>游泳</td>
              <td>睡觉 </td>
              <td>埋葬</td>
              <td>指挥</td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[5]">{{temp.cases.verbTest.dongcilijie.results[5].react}}</span></td>
            </tr>
            <tr>
              <td>5</td>
              <td>醉</td>
              <td> 蹲  </td>
              <td>泼</td>
              <td>赏</td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[6]">{{temp.cases.verbTest.dongcilijie.results[6].react}}</span></td>
            </tr>
            <tr>
              <td>6</td>
              <td>洗澡</td>
              <td> 游泳 </td>
              <td>撞</td>
              <td>回答</td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[7]">{{temp.cases.verbTest.dongcilijie.results[7].react}}</span></td>
            </tr>
            <tr>
              <td colspan="5">一元小计   </td>
              <td>正确次数 {{temp.cases.verbTest.dongcilijie.one.correct}}/6  正确率{{temp.cases.verbTest.dongcilijie.one.rate}}%</td>
            </tr>
            <tr>
              <td>7</td>
              <td>骑</td>
              <td> 踢</td>
              <td>爬 </td>
              <td>泼 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[8]">{{temp.cases.verbTest.dongcilijie.results[8].react}}</span></td>
            </tr>
            <tr>
              <td>8</td>
              <td>表扬</td>
              <td>逮捕 </td>
              <td>起床 </td>
              <td>罚 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[9]">{{temp.cases.verbTest.dongcilijie.results[9].react}}</span></td>
            </tr>
            <tr>
              <td>9</td>
              <td>剪</td>
              <td>骑 </td>
              <td>摔 </td>
              <td>抢 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[10]">{{temp.cases.verbTest.dongcilijie.results[10].react}}</span></td>
            </tr>
            <tr>
              <td>10</td>
              <td>看望</td>
              <td>表扬 </td>
              <td>生病 </td>
              <td>咳嗽 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[11]">{{temp.cases.verbTest.dongcilijie.results[11].react}}</span></td>
            </tr>
            <tr>
              <td>11</td>
              <td>逮捕</td>
              <td>看望 </td>
              <td>盗窃 </td>
              <td>赏 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[12]">{{temp.cases.verbTest.dongcilijie.results[12].react}}</span></td>
            </tr>
            <tr>
              <td>12</td>
              <td>踢</td>
              <td>剪 </td>
              <td>抢 </td>
              <td>趴 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[13]">{{temp.cases.verbTest.dongcilijie.results[13].react}}</span></td>
            </tr>
            <tr>
              <td colspan="5">二元小计   </td>
              <td>正确次数 {{temp.cases.verbTest.dongcilijie.tow.correct}}/6  正确率{{temp.cases.verbTest.dongcilijie.tow.rate}}%</td>
            </tr>
            <tr>
              <td>13</td>
              <td>赠送 </td>
              <td> 给</td>
              <td> 咳嗽</td>
              <td>批评 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[14]">{{temp.cases.verbTest.dongcilijie.results[14].react}}</span></td>
            </tr>
            <tr>
              <td>14</td>
              <td> 给</td>
              <td>赠送 </td>
              <td>背 </td>
              <td>飞 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[15]">{{temp.cases.verbTest.dongcilijie.results[15].react}}</span></td>
            </tr>
            <tr>
              <td colspan="5">    强显性三元 (xyz) 小计   </td>
              <td>正确次数 {{temp.cases.verbTest.dongcilijie.three1.correct}}/2  正确率{{temp.cases.verbTest.dongcilijie.three1.rate}}%</td>
            </tr>
            <tr>
              <td>15</td>
              <td>  奖励</td>
              <td>喂 </td>
              <td> 生病</td>
              <td>指挥 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[16]">{{temp.cases.verbTest.dongcilijie.results[16].react}}</span></td>
            </tr>
            <tr>
              <td>16</td>
              <td>  喂</td>
              <td>奖励 </td>
              <td>刷 </td>
              <td>起床 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[17]">{{temp.cases.verbTest.dongcilijie.results[17].react}}</span></td>
            </tr>
            <tr>
              <td colspan="5">中显性三元 (xy) 小计   </td>
              <td>正确次数 {{temp.cases.verbTest.dongcilijie.three2.correct}}/2  正确率{{temp.cases.verbTest.dongcilijie.three2.rate}}%</td>
            </tr>
            <tr>
              <td>17</td>
              <td>泼</td>
              <td>卖 </td>
              <td>埋葬</td>
              <td>指挥 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[18]">{{temp.cases.verbTest.dongcilijie.results[18].react}}</span></td>
            </tr>
            <tr>
              <td>18</td>
              <td>卖</td>
              <td>泼 </td>
              <td>摔 </td>
              <td>飞 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[19]">{{temp.cases.verbTest.dongcilijie.results[19].react}}</span></td>
            </tr>
            <tr>
              <td colspan="5">  中显性三元 (xz) 小计   </td>
              <td>正确次数 {{temp.cases.verbTest.dongcilijie.three3.correct}}/2  正确率{{temp.cases.verbTest.dongcilijie.three3.rate}}%</td>
            </tr>
            <tr>
              <td>19</td>
              <td>询问 </td>
              <td>教 </td>
              <td>追 </td>
              <td>刷 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[20]">{{temp.cases.verbTest.dongcilijie.results[20].react}}</span></td>
            </tr>
            <tr>
              <td>20</td>
              <td> 教</td>
              <td>询问 </td>
              <td>撞 </td>
              <td>爬 </td>
              <td ><span v-if="temp.cases.verbTest.dongcilijie.results[21]">{{temp.cases.verbTest.dongcilijie.results[21].react}}</span></td>
            </tr>
            <tr>
              <td colspan="5">  弱显性三元 (xy/z) 小计   </td>
              <td>正确次数 {{temp.cases.verbTest.dongcilijie.three4.correct}}/2  正确率{{temp.cases.verbTest.dongcilijie.three4.rate}}%</td>
            </tr>
            <tr>
              <td colspan="5">  一元动词合计</td>
              <td>正确次数  {{temp.cases.verbTest.dongcilijie.one.correct}}/6 正确率{{temp.cases.verbTest.dongcilijie.one.rate}}%</td>
            </tr>
            <tr>
              <td colspan="5">  二元动词合计</td>
              <td>正确次数  {{temp.cases.verbTest.dongcilijie.tow.correct}}/6 正确率{{temp.cases.verbTest.dongcilijie.tow.rate}}%</td>
            </tr>
            <tr>
              <td colspan="5">  三元动词合计</td>
              <td>正确次数  {{temp.cases.verbTest.dongcilijie.three1.correct + temp.cases.verbTest.dongcilijie.three2.correct + temp.cases.verbTest.dongcilijie.three3.correct + temp.cases.verbTest.dongcilijie.three4.correct}}/8 正确率{{temp.cases.verbTest.dongcilijie.three1.correct + temp.cases.verbTest.dongcilijie.three2.correct + temp.cases.verbTest.dongcilijie.three3.correct + temp.cases.verbTest.dongcilijie.three4.correct /8}}%</td>
            </tr>
            <tr>
              <td colspan="5"> 总计</td>
              <td>正确次数  {{temp.cases.verbTest.dongcilijie.total.correct}}/20 正确率{{temp.cases.verbTest.dongcilijie.total.rate}}%</td>
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
              <td></td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.results[0].react}}</td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[0].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[0].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[0].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[0].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[0].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[0].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td>发抖</td>
              <td>女人</td>
              <td>投了</td>
              <td>男人</td>
              <td>票</td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[1]">{{temp.cases.verbTest.lunyuanjiegou.results[1].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[1]&&temp.cases.verbTest.lunyuanjiegou.results[1].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[1]&&temp.cases.verbTest.lunyuanjiegou.results[1].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[1]&&temp.cases.verbTest.lunyuanjiegou.results[1].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[1]&&temp.cases.verbTest.lunyuanjiegou.results[1].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[1]&&temp.cases.verbTest.lunyuanjiegou.results[1].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[1]&&temp.cases.verbTest.lunyuanjiegou.results[1].cihui==1">词汇</span></td>
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
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[2]">{{temp.cases.verbTest.lunyuanjiegou.results[2].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[2]&&temp.cases.verbTest.lunyuanjiegou.results[2].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[2]&&temp.cases.verbTest.lunyuanjiegou.results[2].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[2]&&temp.cases.verbTest.lunyuanjiegou.results[2].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[2]&&temp.cases.verbTest.lunyuanjiegou.results[2].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[2]&&temp.cases.verbTest.lunyuanjiegou.results[2].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[2]&&temp.cases.verbTest.lunyuanjiegou.results[2].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>跪</td>
              <td>男人</td>
              <td>跪着</td>
              <td> </td>
              <td> </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[3]">{{temp.cases.verbTest.lunyuanjiegou.results[3].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[3]&&temp.cases.verbTest.lunyuanjiegou.results[3].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[3]&&temp.cases.verbTest.lunyuanjiegou.results[3].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[3]&&temp.cases.verbTest.lunyuanjiegou.results[3].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[3]&&temp.cases.verbTest.lunyuanjiegou.results[3].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[3]&&temp.cases.verbTest.lunyuanjiegou.results[3].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[3]&&temp.cases.verbTest.lunyuanjiegou.results[3].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>蹲</td>
              <td>女孩</td>
              <td>蹲着 </td>
              <td> </td>
              <td> </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[4]">{{temp.cases.verbTest.lunyuanjiegou.results[4].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[4]&&temp.cases.verbTest.lunyuanjiegou.results[4].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[4]&&temp.cases.verbTest.lunyuanjiegou.results[4].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[4]&&temp.cases.verbTest.lunyuanjiegou.results[4].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[4]&&temp.cases.verbTest.lunyuanjiegou.results[4].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[4]&&temp.cases.verbTest.lunyuanjiegou.results[4].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[4]&&temp.cases.verbTest.lunyuanjiegou.results[4].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>4</td>
              <td>游泳</td>
              <td>女人</td>
              <td>在游泳 </td>
              <td> </td>
              <td> </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[5]">{{temp.cases.verbTest.lunyuanjiegou.results[5].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[5]&&temp.cases.verbTest.lunyuanjiegou.results[5].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[5]&&temp.cases.verbTest.lunyuanjiegou.results[5].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[5]&&temp.cases.verbTest.lunyuanjiegou.results[5].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[5]&&temp.cases.verbTest.lunyuanjiegou.results[5].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[5]&&temp.cases.verbTest.lunyuanjiegou.results[5].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[5]&&temp.cases.verbTest.lunyuanjiegou.results[5].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>5</td>
              <td>醉</td>
              <td>男人</td>
              <td>醉了 </td>
              <td> </td>
              <td> </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[6]">{{temp.cases.verbTest.lunyuanjiegou.results[6].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[6]&&temp.cases.verbTest.lunyuanjiegou.results[6].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[6]&&temp.cases.verbTest.lunyuanjiegou.results[6].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[6]&&temp.cases.verbTest.lunyuanjiegou.results[6].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[6]&&temp.cases.verbTest.lunyuanjiegou.results[6].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[6]&&temp.cases.verbTest.lunyuanjiegou.results[6].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[6]&&temp.cases.verbTest.lunyuanjiegou.results[6].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>6</td>
              <td>洗澡</td>
              <td>男孩 </td>
              <td>在洗澡</td>
              <td> </td>
              <td> </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[7]">{{temp.cases.verbTest.lunyuanjiegou.results[7].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[7]&&temp.cases.verbTest.lunyuanjiegou.results[7].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[7]&&temp.cases.verbTest.lunyuanjiegou.results[7].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[7]&&temp.cases.verbTest.lunyuanjiegou.results[7].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[7]&&temp.cases.verbTest.lunyuanjiegou.results[7].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[7]&&temp.cases.verbTest.lunyuanjiegou.results[7].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[7]&&temp.cases.verbTest.lunyuanjiegou.results[7].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">一元小计    </td>
              <td> </td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.one.x}}/6</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.one.V}}/6</td>
              <td></td>
              <td></td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.one.lunyuan}}/6</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.one.cihui}}/6</td>
            </tr>
            <tr>
              <td>论元和词汇同时正确</td>
              <td colspan="6">{{temp.cases.verbTest.lunyuanjiegou.one.both}}/6</td>
            </tr>
            <tr>
              <td>7</td>
              <td>骑</td>
              <td>男孩</td>
              <td>在骑 </td>
              <td> </td>
              <td>车 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[8]">{{temp.cases.verbTest.lunyuanjiegou.results[8].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[8]&&temp.cases.verbTest.lunyuanjiegou.results[8].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[8]&&temp.cases.verbTest.lunyuanjiegou.results[8].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[8]&&temp.cases.verbTest.lunyuanjiegou.results[8].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[8]&&temp.cases.verbTest.lunyuanjiegou.results[8].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[8]&&temp.cases.verbTest.lunyuanjiegou.results[8].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[8]&&temp.cases.verbTest.lunyuanjiegou.results[8].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>8</td>
              <td>表扬</td>
              <td>女人</td>
              <td> 表扬了</td>
              <td> </td>
              <td>男孩 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[9]">{{temp.cases.verbTest.lunyuanjiegou.results[9].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[9]&&temp.cases.verbTest.lunyuanjiegou.results[9].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[9]&&temp.cases.verbTest.lunyuanjiegou.results[9].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[9]&&temp.cases.verbTest.lunyuanjiegou.results[9].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[9]&&temp.cases.verbTest.lunyuanjiegou.results[9].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[9]&&temp.cases.verbTest.lunyuanjiegou.results[9].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[9]&&temp.cases.verbTest.lunyuanjiegou.results[9].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>9</td>
              <td>剪</td>
              <td>女人</td>
              <td>在剪</td>
              <td> </td>
              <td>纸 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[10]">{{temp.cases.verbTest.lunyuanjiegou.results[10].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[10]&&temp.cases.verbTest.lunyuanjiegou.results[10].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[10]&&temp.cases.verbTest.lunyuanjiegou.results[10].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[10]&&temp.cases.verbTest.lunyuanjiegou.results[10].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[10]&&temp.cases.verbTest.lunyuanjiegou.results[10].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[10]&&temp.cases.verbTest.lunyuanjiegou.results[10].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[10]&&temp.cases.verbTest.lunyuanjiegou.results[10].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>10</td>
              <td>看望</td>
              <td>男人</td>
              <td>在看望 </td>
              <td> </td>
              <td>女人 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[11]">{{temp.cases.verbTest.lunyuanjiegou.results[11].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[11]&&temp.cases.verbTest.lunyuanjiegou.results[11].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[11]&&temp.cases.verbTest.lunyuanjiegou.results[11].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[11]&&temp.cases.verbTest.lunyuanjiegou.results[11].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[11]&&temp.cases.verbTest.lunyuanjiegou.results[11].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[11]&&temp.cases.verbTest.lunyuanjiegou.results[11].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[11]&&temp.cases.verbTest.lunyuanjiegou.results[11].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>11</td>
              <td>逮捕</td>
              <td>男人</td>
              <td>逮捕了 </td>
              <td> </td>
              <td>女人 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[12]">{{temp.cases.verbTest.lunyuanjiegou.results[12].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[12]&&temp.cases.verbTest.lunyuanjiegou.results[12].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[12]&&temp.cases.verbTest.lunyuanjiegou.results[12].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[12]&&temp.cases.verbTest.lunyuanjiegou.results[12].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[12]&&temp.cases.verbTest.lunyuanjiegou.results[12].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[12]&&temp.cases.verbTest.lunyuanjiegou.results[12].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[12]&&temp.cases.verbTest.lunyuanjiegou.results[12].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>12</td>
              <td>踢</td>
              <td>女孩</td>
              <td>踢了 </td>
              <td> </td>
              <td>男孩 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[13]">{{temp.cases.verbTest.lunyuanjiegou.results[13].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[13]&&temp.cases.verbTest.lunyuanjiegou.results[13].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[13]&&temp.cases.verbTest.lunyuanjiegou.results[13].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[13]&&temp.cases.verbTest.lunyuanjiegou.results[13].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[13]&&temp.cases.verbTest.lunyuanjiegou.results[13].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[13]&&temp.cases.verbTest.lunyuanjiegou.results[13].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[13]&&temp.cases.verbTest.lunyuanjiegou.results[13].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">二元小计   </td>
              <td> </td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.two.x}}/6</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.two.V}}/6</td>
              <td></td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.two.z}}/6</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.two.lunyuan}}/6</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.two.cihui}}/6</td>
            </tr>
            <tr>
              <td> 论元和词汇同时正确</td>
              <td colspan="6">{{temp.cases.verbTest.lunyuanjiegou.two.both}}/6      </td>
            </tr>
            <tr>
              <td>13</td>
              <td>赠送 </td>
              <td> 女人</td>
              <td>赠送了</td>
              <td>男孩</td>
              <td>礼物 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[14]">{{temp.cases.verbTest.lunyuanjiegou.results[14].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[14]&&temp.cases.verbTest.lunyuanjiegou.results[14].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[14]&&temp.cases.verbTest.lunyuanjiegou.results[14].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[14]&&temp.cases.verbTest.lunyuanjiegou.results[14].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[14]&&temp.cases.verbTest.lunyuanjiegou.results[14].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[14]&&temp.cases.verbTest.lunyuanjiegou.results[14].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[14]&&temp.cases.verbTest.lunyuanjiegou.results[14].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>14</td>
              <td> 给</td>
              <td>男人 </td>
              <td>在给 </td>
              <td>女孩</td>
              <td>钱 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[15]">{{temp.cases.verbTest.lunyuanjiegou.results[15].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[15]&&temp.cases.verbTest.lunyuanjiegou.results[15].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[15]&&temp.cases.verbTest.lunyuanjiegou.results[15].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[15]&&temp.cases.verbTest.lunyuanjiegou.results[15].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[15]&&temp.cases.verbTest.lunyuanjiegou.results[15].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[15]&&temp.cases.verbTest.lunyuanjiegou.results[15].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[15]&&temp.cases.verbTest.lunyuanjiegou.results[15].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">    强显性三元 (xyz) 小计    </td>
              <td> </td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three1.x}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three1.V}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three1.y}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three1.z}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three1.lunyuan}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three1.cihui}}/2</td>
            </tr>
            <tr>
              <td>论元和词汇同时正确 </td>
              <td colspan="6"> {{temp.cases.verbTest.lunyuanjiegou.three1.both}}/2     </td>
            </tr>
            <tr>
              <td>15</td>
              <td>奖励</td>
              <td>女人</td>
              <td>奖励了 </td>
              <td>男孩 </td>
              <td> </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[16]">{{temp.cases.verbTest.lunyuanjiegou.results[16].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[16]&&temp.cases.verbTest.lunyuanjiegou.results[16].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[16]&&temp.cases.verbTest.lunyuanjiegou.results[16].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[16]&&temp.cases.verbTest.lunyuanjiegou.results[16].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[16]&&temp.cases.verbTest.lunyuanjiegou.results[16].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[16]&&temp.cases.verbTest.lunyuanjiegou.results[16].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[16]&&temp.cases.verbTest.lunyuanjiegou.results[16].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>15</td>
              <td>奖励</td>
              <td>女人</td>
              <td>奖励了 </td>
              <td>男孩 </td>
              <td>书</td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[17]">{{temp.cases.verbTest.lunyuanjiegou.results[17].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[17]&&temp.cases.verbTest.lunyuanjiegou.results[17].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[17]&&temp.cases.verbTest.lunyuanjiegou.results[17].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[17]&&temp.cases.verbTest.lunyuanjiegou.results[17].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[17]&&temp.cases.verbTest.lunyuanjiegou.results[17].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[17]&&temp.cases.verbTest.lunyuanjiegou.results[17].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[17]&&temp.cases.verbTest.lunyuanjiegou.results[17].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>16</td>
              <td>喂</td>
              <td>男人</td>
              <td>在喂 </td>
              <td>女孩 </td>
              <td> </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[18]">{{temp.cases.verbTest.lunyuanjiegou.results[18].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[18]&&temp.cases.verbTest.lunyuanjiegou.results[18].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[18]&&temp.cases.verbTest.lunyuanjiegou.results[18].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[18]&&temp.cases.verbTest.lunyuanjiegou.results[18].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[18]&&temp.cases.verbTest.lunyuanjiegou.results[18].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[18]&&temp.cases.verbTest.lunyuanjiegou.results[18].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[18]&&temp.cases.verbTest.lunyuanjiegou.results[18].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>16</td>
              <td>喂</td>
              <td>男人</td>
              <td>在喂 </td>
              <td>女孩 </td>
              <td>饭</td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[19]">{{temp.cases.verbTest.lunyuanjiegou.results[19].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[19]&&temp.cases.verbTest.lunyuanjiegou.results[19].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[19]&&temp.cases.verbTest.lunyuanjiegou.results[19].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[19]&&temp.cases.verbTest.lunyuanjiegou.results[19].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[19]&&temp.cases.verbTest.lunyuanjiegou.results[19].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[19]&&temp.cases.verbTest.lunyuanjiegou.results[19].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[19]&&temp.cases.verbTest.lunyuanjiegou.results[19].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">中显性三元 (xy) 小计    </td>
              <td> </td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three2.x}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three2.V}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three2.y}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three2.z}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three2.lunyuan}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three2.cihui}}/2</td>
            </tr>
            <tr>
              <td>论元和词汇同时正确 </td>
              <td colspan="6">  {{temp.cases.verbTest.lunyuanjiegou.three2.both}}/2</td>
            </tr>
            <tr>
              <td>17</td>
              <td>泼</td>
              <td>女人</td>
              <td>泼了</td>
              <td> </td>
              <td>水 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[20]">{{temp.cases.verbTest.lunyuanjiegou.results[20].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[20]&&temp.cases.verbTest.lunyuanjiegou.results[20].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[20]&&temp.cases.verbTest.lunyuanjiegou.results[20].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[20]&&temp.cases.verbTest.lunyuanjiegou.results[20].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[20]&&temp.cases.verbTest.lunyuanjiegou.results[20].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[20]&&temp.cases.verbTest.lunyuanjiegou.results[20].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[20]&&temp.cases.verbTest.lunyuanjiegou.results[20].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>17</td>
              <td>泼</td>
              <td>女人</td>
              <td>泼了</td>
              <td>男人 </td>
              <td>水 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[21]">{{temp.cases.verbTest.lunyuanjiegou.results[21].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[21]&&temp.cases.verbTest.lunyuanjiegou.results[21].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[21]&&temp.cases.verbTest.lunyuanjiegou.results[21].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[21]&&temp.cases.verbTest.lunyuanjiegou.results[21].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[21]&&temp.cases.verbTest.lunyuanjiegou.results[21].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[21]&&temp.cases.verbTest.lunyuanjiegou.results[21].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[21]&&temp.cases.verbTest.lunyuanjiegou.results[21].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>18</td>
              <td>卖</td>
              <td>男人</td>
              <td>在卖</td>
              <td> </td>
              <td>西瓜 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[22]">{{temp.cases.verbTest.lunyuanjiegou.results[22].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[22]&&temp.cases.verbTest.lunyuanjiegou.results[22].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[22]&&temp.cases.verbTest.lunyuanjiegou.results[22].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[22]&&temp.cases.verbTest.lunyuanjiegou.results[22].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[22]&&temp.cases.verbTest.lunyuanjiegou.results[22].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[22]&&temp.cases.verbTest.lunyuanjiegou.results[22].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[22]&&temp.cases.verbTest.lunyuanjiegou.results[22].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>18</td>
              <td>卖</td>
              <td>男人</td>
              <td>在卖</td>
              <td>女孩 </td>
              <td>西瓜 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[23]">{{temp.cases.verbTest.lunyuanjiegou.results[23].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[23]&&temp.cases.verbTest.lunyuanjiegou.results[23].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[23]&&temp.cases.verbTest.lunyuanjiegou.results[23].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[23]&&temp.cases.verbTest.lunyuanjiegou.results[23].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[23]&&temp.cases.verbTest.lunyuanjiegou.results[23].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[23]&&temp.cases.verbTest.lunyuanjiegou.results[23].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[23]&&temp.cases.verbTest.lunyuanjiegou.results[23].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">  中显性三元 (xz) 小计    </td>
              <td> </td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three3.x}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three3.V}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three3.y}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three3.z}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three3.lunyuan}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three3.cihui}}/2</td>
            </tr>
            <tr>
              <td>论元和词汇同时正确 </td>
              <td colspan="6"> {{temp.cases.verbTest.lunyuanjiegou.three3.both}}/2</td>
            </tr>
            <tr>
              <td>19</td>
              <td>询问</td>
              <td>男孩 </td>
              <td>在询问 </td>
              <td>女人 </td>
              <td> </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[24]">{{temp.cases.verbTest.lunyuanjiegou.results[24].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[24]&&temp.cases.verbTest.lunyuanjiegou.results[24].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[24]&&temp.cases.verbTest.lunyuanjiegou.results[24].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[24]&&temp.cases.verbTest.lunyuanjiegou.results[24].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[24]&&temp.cases.verbTest.lunyuanjiegou.results[24].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[24]&&temp.cases.verbTest.lunyuanjiegou.results[24].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[24]&&temp.cases.verbTest.lunyuanjiegou.results[24].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>19</td>
              <td>询问</td>
              <td>男孩 </td>
              <td>在询问 </td>
              <td> </td>
              <td>事情 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[25]">{{temp.cases.verbTest.lunyuanjiegou.results[25].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[25]&&temp.cases.verbTest.lunyuanjiegou.results[25].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[25]&&temp.cases.verbTest.lunyuanjiegou.results[25].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[25]&&temp.cases.verbTest.lunyuanjiegou.results[25].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[25]&&temp.cases.verbTest.lunyuanjiegou.results[25].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[25]&&temp.cases.verbTest.lunyuanjiegou.results[25].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[25]&&temp.cases.verbTest.lunyuanjiegou.results[25].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>19</td>
              <td>询问</td>
              <td>男孩 </td>
              <td>在询问 </td>
              <td>女人 </td>
              <td>事情 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[26]">{{temp.cases.verbTest.lunyuanjiegou.results[26].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[26]&&temp.cases.verbTest.lunyuanjiegou.results[26].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[26]&&temp.cases.verbTest.lunyuanjiegou.results[26].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[26]&&temp.cases.verbTest.lunyuanjiegou.results[26].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[26]&&temp.cases.verbTest.lunyuanjiegou.results[26].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[26]&&temp.cases.verbTest.lunyuanjiegou.results[26].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[26]&&temp.cases.verbTest.lunyuanjiegou.results[26].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>20</td>
              <td>教</td>
              <td>女人 </td>
              <td>在教 </td>
              <td>男孩 </td>
              <td> </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[27]">{{temp.cases.verbTest.lunyuanjiegou.results[27].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[27]&&temp.cases.verbTest.lunyuanjiegou.results[27].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[27]&&temp.cases.verbTest.lunyuanjiegou.results[27].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[27]&&temp.cases.verbTest.lunyuanjiegou.results[27].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[27]&&temp.cases.verbTest.lunyuanjiegou.results[27].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[27]&&temp.cases.verbTest.lunyuanjiegou.results[27].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[27]&&temp.cases.verbTest.lunyuanjiegou.results[27].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>20</td>
              <td>教</td>
              <td>女人 </td>
              <td>在教 </td>
              <td> </td>
              <td>字母 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[28]">{{temp.cases.verbTest.lunyuanjiegou.results[28].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[28]&&temp.cases.verbTest.lunyuanjiegou.results[28].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[28]&&temp.cases.verbTest.lunyuanjiegou.results[28].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[28]&&temp.cases.verbTest.lunyuanjiegou.results[28].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[28]&&temp.cases.verbTest.lunyuanjiegou.results[28].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[28]&&temp.cases.verbTest.lunyuanjiegou.results[28].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[28]&&temp.cases.verbTest.lunyuanjiegou.results[28].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td>20</td>
              <td>教</td>
              <td>女人 </td>
              <td>在教 </td>
              <td>男孩 </td>
              <td>字母 </td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[29]">{{temp.cases.verbTest.lunyuanjiegou.results[29].react}}</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[29]&&temp.cases.verbTest.lunyuanjiegou.results[29].x==1">x</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[29]&&temp.cases.verbTest.lunyuanjiegou.results[29].V==1">V</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[29]&&temp.cases.verbTest.lunyuanjiegou.results[29].y==1">y</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[29]&&temp.cases.verbTest.lunyuanjiegou.results[29].z==1">z</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[29]&&temp.cases.verbTest.lunyuanjiegou.results[29].lunyuan==1">论元</span></td>
              <td><span v-if="temp.cases.verbTest.lunyuanjiegou.results[29]&&temp.cases.verbTest.lunyuanjiegou.results[29].cihui==1">词汇</span></td>
            </tr>
            <tr>
              <td colspan="6" rowspan="2">  弱显性三元 (xy/z) 小计    </td>
              <td> </td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three4.x}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three4.V}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three4.y}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three4.z}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three4.lunyuan}}/2</td>
              <td>{{temp.cases.verbTest.lunyuanjiegou.three4.cihui}}/2</td>
            </tr>
            <tr>
              <td>论元和词汇同时正确 </td>
              <td colspan="6">{{temp.cases.verbTest.lunyuanjiegou.three4.both}}/2      </td>
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
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.one.x}}/6</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.one.V}}/6</td>
              <td style="height: 18px;"></td>
              <td style="height: 18px;"></td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.one.lunyuan}}/6</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.one.lunyuan/6 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.one.cihui}}/6</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.one.cihui/6 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.one.both}}/6 </td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.one.both/6 * 100 )}}%</td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;">二元小计</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.two.x}}/6</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.two.V}}/6</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.two.y}}/6</td>
              <td style="height: 18px;"></td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.two.lunyuan}}/6</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.two.lunyuan/6 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.two.cihui}}/6</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.two.cihui/6 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.two.both}}/6 </td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.two.both/6 * 100 )}}%</td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;"> 强显性三元 (xyz)</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.x}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.V}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.y}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.z}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.lunyuan}}/2</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three1.lunyuan/2 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.cihui}}/2</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three1.cihui/2 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.both}}/2 </td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three1.both/2 * 100 )}}%</td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;">中显性三元 (xy)</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three2.x}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three2.V}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three2.y}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three2.z}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three2.lunyuan}}/2</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three2.lunyuan/2 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three2.cihui}}/2</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three2.cihui/2 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three2.both}}/2 </td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three2.both/2 * 100 )}}%</td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;">中显性三元 (xz)</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three3.x}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three3.V}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three3.y}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three3.z}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three3.lunyuan}}/2</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three3.lunyuan/2 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three3.cihui}}/2</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three3.cihui/2 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three3.both}}/2 </td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three3.both/2 * 100 )}}%</td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;"> 弱显性三元 (xy/z)</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three4.x}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three4.V}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three4.y}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three4.z}}/2</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three4.lunyuan}}/2</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three4.lunyuan/2 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three4.cihui}}/2</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three4.cihui/2 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three4.both}}/2 </td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three4.both/2 * 100 )}}%</td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;"> 三元小计</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.x + temp.cases.verbTest.lunyuanjiegou.three2.x + temp.cases.verbTest.lunyuanjiegou.three3.x + temp.cases.verbTest.lunyuanjiegou.three4.x}}/8</td>
              <td style="height: 18pV;">{{temp.cases.verbTest.lunyuanjiegou.three1.V + temp.cases.verbTest.lunyuanjiegou.three2.V + temp.cases.verbTest.lunyuanjiegou.three3.V + temp.cases.verbTest.lunyuanjiegou.three4.V}}/8</td>
              <td style="height: 18py;">{{temp.cases.verbTest.lunyuanjiegou.three1.y + temp.cases.verbTest.lunyuanjiegou.three2.y + temp.cases.verbTest.lunyuanjiegou.three3.y + temp.cases.verbTest.lunyuanjiegou.three4.y}}/8</td>
              <td style="height: 18pz;">{{temp.cases.verbTest.lunyuanjiegou.three1.z + temp.cases.verbTest.lunyuanjiegou.three2.z + temp.cases.verbTest.lunyuanjiegou.three3.z + temp.cases.verbTest.lunyuanjiegou.three4.z}}/8</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.lunyuan + temp.cases.verbTest.lunyuanjiegou.three2.lunyuan + temp.cases.verbTest.lunyuanjiegou.three3.lunyuan + temp.cases.verbTest.lunyuanjiegou.three4.lunyuan}}/8</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three1.lunyuan + temp.cases.verbTest.lunyuanjiegou.three2.lunyuan + temp.cases.verbTest.lunyuanjiegou.three3.lunyuan + temp.cases.verbTest.lunyuanjiegou.three4.lunyuan/8 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.cihui + temp.cases.verbTest.lunyuanjiegou.three2.cihui + temp.cases.verbTest.lunyuanjiegou.three3.cihui + temp.cases.verbTest.lunyuanjiegou.three4.cihui}}/8</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three1.cihui + temp.cases.verbTest.lunyuanjiegou.three2.cihui + temp.cases.verbTest.lunyuanjiegou.three3.cihui + temp.cases.verbTest.lunyuanjiegou.three4.cihui/8 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.three1.both + temp.cases.verbTest.lunyuanjiegou.three2.both + temp.cases.verbTest.lunyuanjiegou.three3.both + temp.cases.verbTest.lunyuanjiegou.three4.both}}/8 </td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.three1.both + temp.cases.verbTest.lunyuanjiegou.three2.both + temp.cases.verbTest.lunyuanjiegou.three3.both + temp.cases.verbTest.lunyuanjiegou.three4.both/8 * 100 )}}% </td>
            </tr>
            <tr style="height: 18px;">
              <td class="lian_xi" style="height: 18px;"> 合计 ( 一元＋二元＋三元 )</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.one.x + temp.cases.verbTest.lunyuanjiegou.two.x + temp.cases.verbTest.lunyuanjiegou.three1.x + temp.cases.verbTest.lunyuanjiegou.three2.x + temp.cases.verbTest.lunyuanjiegou.three3.x + temp.cases.verbTest.lunyuanjiegou.three4.x}}/20</td>
              <td style="height: 18pV;">{{temp.cases.verbTest.lunyuanjiegou.one.V + temp.cases.verbTest.lunyuanjiegou.two.V + temp.cases.verbTest.lunyuanjiegou.three1.V + temp.cases.verbTest.lunyuanjiegou.three2.V + temp.cases.verbTest.lunyuanjiegou.three3.V + temp.cases.verbTest.lunyuanjiegou.three4.V}}/20</td>
              <td style="height: 18py;">{{temp.cases.verbTest.lunyuanjiegou.one.y + temp.cases.verbTest.lunyuanjiegou.two.y + temp.cases.verbTest.lunyuanjiegou.three1.y + temp.cases.verbTest.lunyuanjiegou.three2.y + temp.cases.verbTest.lunyuanjiegou.three3.y + temp.cases.verbTest.lunyuanjiegou.three4.y}}/14</td>
              <td style="height: 18pz;">{{temp.cases.verbTest.lunyuanjiegou.one.z + temp.cases.verbTest.lunyuanjiegou.two.z + temp.cases.verbTest.lunyuanjiegou.three1.z + temp.cases.verbTest.lunyuanjiegou.three2.z + temp.cases.verbTest.lunyuanjiegou.three3.z + temp.cases.verbTest.lunyuanjiegou.three4.z}}/8</td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.one.lunyuan + temp.cases.verbTest.lunyuanjiegou.two.lunyuan + temp.cases.verbTest.lunyuanjiegou.three1.lunyuan + temp.cases.verbTest.lunyuanjiegou.three2.lunyuan + temp.cases.verbTest.lunyuanjiegou.three3.lunyuan + temp.cases.verbTest.lunyuanjiegou.three4.lunyuan}}/20</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.one.lunyuan + temp.cases.verbTest.lunyuanjiegou.two.lunyuan + temp.cases.verbTest.lunyuanjiegou.three1.lunyuan + temp.cases.verbTest.lunyuanjiegou.three2.lunyuan + temp.cases.verbTest.lunyuanjiegou.three3.lunyuan + temp.cases.verbTest.lunyuanjiegou.three4.lunyuan/20 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.one.cihui + temp.cases.verbTest.lunyuanjiegou.two.cihui + temp.cases.verbTest.lunyuanjiegou.three1.cihui + temp.cases.verbTest.lunyuanjiegou.three2.cihui + temp.cases.verbTest.lunyuanjiegou.three3.cihui + temp.cases.verbTest.lunyuanjiegou.three4.cihui}}/20</td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.one.cihui + temp.cases.verbTest.lunyuanjiegou.two.cihui + temp.cases.verbTest.lunyuanjiegou.three1.cihui + temp.cases.verbTest.lunyuanjiegou.three2.cihui + temp.cases.verbTest.lunyuanjiegou.three3.cihui + temp.cases.verbTest.lunyuanjiegou.three4.cihui/20 * 100 )}}% </td>
              <td style="height: 18px;">{{temp.cases.verbTest.lunyuanjiegou.one.both + temp.cases.verbTest.lunyuanjiegou.two.both + temp.cases.verbTest.lunyuanjiegou.three1.both + temp.cases.verbTest.lunyuanjiegou.three2.both + temp.cases.verbTest.lunyuanjiegou.three3.both + temp.cases.verbTest.lunyuanjiegou.three4.both}}/20 </td>
              <td style="height: 18px;">{{Math.round(temp.cases.verbTest.lunyuanjiegou.one.both + temp.cases.verbTest.lunyuanjiegou.two.both + temp.cases.verbTest.lunyuanjiegou.three1.both + temp.cases.verbTest.lunyuanjiegou.three2.both + temp.cases.verbTest.lunyuanjiegou.three3.both + temp.cases.verbTest.lunyuanjiegou.three4.both/20 * 100 )}}% </td>
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
                <!-- <em> 男人撞了女人。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[0]"><em>{{temp.cases.verbTest.yujuqidong.results[0].react}}</em></span>
              </td>
              <td><span v-if="temp.cases.verbTest.yujuqidong.results[0]">{{temp.cases.verbTest.yujuqidong.results[0].reactType}}</span> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td class="lian_xi"> </td>
              <td style="text-align: left;"> 咬小狗的小猫戴着帽子。</td>
              <td style="text-align: left;">
                <!-- <em> 咬小猫的小狗戴着帽子。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[1]"><em>{{temp.cases.verbTest.yujuqidong.results[1].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[1]">{{temp.cases.verbTest.yujuqidong.results[1].reactType}}</span> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td class="lian_xi">练习3</td>
              <td class="lian_xi"> </td>
              <td style="text-align: left;"> 男人在指挥谁？</td>
              <td style="text-align: left;">
                <!-- <em> 女人在指挥谁？</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[2]"><em>{{temp.cases.verbTest.yujuqidong.results[2].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[2]">{{temp.cases.verbTest.yujuqidong.results[2].reactType}}</span> </td>
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
                <!-- <em> 小狗在追小猫。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[3]"><em>{{temp.cases.verbTest.yujuqidong.results[3].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[3]">{{temp.cases.verbTest.yujuqidong.results[3].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.zhudong.correct}}/4</td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.zhudong.rate}}%</td>
            </tr>
            <tr>
              <td>2</td>
              <td style="text-align: left;"> 男人批评了女孩。</td>
              <td style="text-align: left;">
                <!-- <em> 女人批评了男孩。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[4]"><em>{{temp.cases.verbTest.yujuqidong.results[4].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[4]">{{temp.cases.verbTest.yujuqidong.results[4].reactType}}</span> </td>
            </tr>
            <tr>
              <td>3</td>
              <td style="text-align: left;"> 男孩推了女孩。</td>
              <td style="text-align: left;">
                <!-- <em> 女孩推了男孩。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[5]"><em>{{temp.cases.verbTest.yujuqidong.results[5].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[5]">{{temp.cases.verbTest.yujuqidong.results[5].reactType}}</span> </td>
            </tr>
            <tr>
              <td>4</td>
              <td style="text-align: left;"> 女人在埋葬男人。</td>
              <td style="text-align: left;">
                <!-- <em> 男人在埋葬女人。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[6]"><em>{{temp.cases.verbTest.yujuqidong.results[6].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[6]">{{temp.cases.verbTest.yujuqidong.results[6].reactType}}</span> </td>
            </tr>
            <tr>
              <td>5</td>
              <td rowspan="4">把字句</td>
              <td style="text-align: left;"> 女孩把男孩推倒了。</td>
              <td style="text-align: left;">
                <!-- <em> 男孩把女孩推倒了。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[7]"><em>{{temp.cases.verbTest.yujuqidong.results[7].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[7]">{{temp.cases.verbTest.yujuqidong.results[7].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.bazi.correct}}/4</td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.bazi.rate}}%</td>
            </tr>
            <tr>
              <td>6</td>
              <td style="text-align: left;"> 男人把女人埋葬了。</td>
              <td style="text-align: left;">
                <!-- <em> 女人把男人埋葬了。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[8]"><em>{{temp.cases.verbTest.yujuqidong.results[8].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[8]">{{temp.cases.verbTest.yujuqidong.results[8].reactType}}</span> </td>
            </tr>
            <tr>
              <td>7</td>
              <td style="text-align: left;"> 小狗把小猫追上了。</td>
              <td style="text-align: left;">
                <!-- <em> 小猫把小狗追上了。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[9]"><em>{{temp.cases.verbTest.yujuqidong.results[9].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[9]">{{temp.cases.verbTest.yujuqidong.results[9].reactType}}</span> </td>
            </tr>
            <tr>
              <td>8</td>
              <td style="text-align: left;"> 女人把男孩批评了。</td>
              <td style="text-align: left;">
                <!-- <em> 男人把女孩批评了。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[10]"><em>{{temp.cases.verbTest.yujuqidong.results[10].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[10]">{{temp.cases.verbTest.yujuqidong.results[10].reactType}}</span> </td>
            </tr>
            <tr>
              <td>9</td>
              <td rowspan="4">被字句</td>
              <td style="text-align: left;">小狗被小猫追上了。</td>
              <td style="text-align: left;">
                <!-- <em>小猫被小狗追上了。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[11]"><em>{{temp.cases.verbTest.yujuqidong.results[11].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[11]">{{temp.cases.verbTest.yujuqidong.results[11].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.beizi.correct}}/4</td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.beizi.rate}}%</td>
            </tr>
            <tr>
              <td>10</td>
              <td style="text-align: left;">女孩被男孩推倒了。</td>
              <td style="text-align: left;">
                <!-- <em>男孩被女孩推倒了。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[12]"><em>{{temp.cases.verbTest.yujuqidong.results[12].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[12]">{{temp.cases.verbTest.yujuqidong.results[12].reactType}}</span> </td>
            </tr>
            <tr>
              <td>11</td>
              <td style="text-align: left;">男孩被女人批评了。</td>
              <td style="text-align: left;">
                <!-- <em>女孩被男人批评了。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[13]"><em>{{temp.cases.verbTest.yujuqidong.results[13].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[13]">{{temp.cases.verbTest.yujuqidong.results[13].reactType}}</span> </td>
            </tr>
            <tr>
              <td>12</td>
              <td style="text-align: left;">男人被女人埋葬了。</td>
              <td style="text-align: left;">
                <!-- <em>女人被男人埋葬了。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[14]"><em>{{temp.cases.verbTest.yujuqidong.results[14].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[14]">{{temp.cases.verbTest.yujuqidong.results[14].reactType}}</span> </td>
            </tr>
            <tr>
              <td>13</td>
              <td rowspan="4">主语疑问句</td>
              <td style="text-align: left;">谁批评了女孩？</td>
              <td style="text-align: left;">
                <!-- <em>谁批评了男孩？</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[15]"><em>{{temp.cases.verbTest.yujuqidong.results[15].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[15]">{{temp.cases.verbTest.yujuqidong.results[15].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.zhuyuyiwen.correct}}/4</td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.zhuyuyiwen.rate}}%</td>
            </tr>
            <tr>
              <td>14</td>
              <td style="text-align: left;">谁推了男孩？</td>
              <td style="text-align: left;">
                <!-- <em>谁推了女孩？</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[16]"><em>{{temp.cases.verbTest.yujuqidong.results[16].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[16]">{{temp.cases.verbTest.yujuqidong.results[16].reactType}}</span> </td>
            </tr>
            <tr>
              <td>15</td>
              <td style="text-align: left;">谁在埋葬男人？</td>
              <td style="text-align: left;">
                <!-- <em>谁在埋葬女人？</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[17]"><em>{{temp.cases.verbTest.yujuqidong.results[17].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[17]">{{temp.cases.verbTest.yujuqidong.results[17].reactType}}</span> </td>
            </tr>
            <tr>
              <td>16</td>
              <td style="text-align: left;">谁在追小狗？</td>
              <td style="text-align: left;">
                <!-- <em>谁在追小猫？</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[18]"><em>{{temp.cases.verbTest.yujuqidong.results[18].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[18]">{{temp.cases.verbTest.yujuqidong.results[18].reactType}}</span> </td>
            </tr>
            <tr>
              <td>17</td>
              <td rowspan="4">宾语疑问句</td>
              <td style="text-align: left;">男人在埋葬谁？</td>
              <td style="text-align: left;">
                <!-- <em>女人在埋葬谁？</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[19]"><em>{{temp.cases.verbTest.yujuqidong.results[19].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[19]">{{temp.cases.verbTest.yujuqidong.results[19].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.binyuyiwen.correct}}/4</td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.binyuyiwen.rate}}%</td>
            </tr>
            <tr>
              <td>18</td>
              <td style="text-align: left;">女人批评了谁？</td>
              <td style="text-align: left;">
                <!-- <em>男人批评了谁？</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[20]"><em>{{temp.cases.verbTest.yujuqidong.results[20].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[20]">{{temp.cases.verbTest.yujuqidong.results[20].reactType}}</span> </td>
            </tr>
            <tr>
              <td>19</td>
              <td style="text-align: left;">男孩推了谁？</td>
              <td style="text-align: left;">
                <!-- <em>女孩推了谁？</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[21]"><em>{{temp.cases.verbTest.yujuqidong.results[21].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[21]">{{temp.cases.verbTest.yujuqidong.results[21].reactType}}</span> </td>
            </tr>
            <tr>
              <td>20</td>
              <td style="text-align: left;">小狗在追谁？</td>
              <td style="text-align: left;">
                <!-- <em>小猫在追谁？</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[22]"><em>{{temp.cases.verbTest.yujuqidong.results[22].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[22]">{{temp.cases.verbTest.yujuqidong.results[22].reactType}}</span> </td>
            </tr>
            <tr>
              <td>21</td>
              <td rowspan="4">主语从句</td>
              <td style="text-align: left;">批评女孩的男人戴着帽子。</td>
              <td style="text-align: left;">
                <!-- <em>批评男孩的女人戴着帽子。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[23]"><em>{{temp.cases.verbTest.yujuqidong.results[23].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[23]">{{temp.cases.verbTest.yujuqidong.results[23].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.zhuyu.correct}}/4</td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.zhuyu.rate}}%</td>
            </tr>
            <tr>
              <td>22</td>
              <td style="text-align: left;">推男孩的女孩戴着帽子。</td>
              <td style="text-align: left;">
                <!-- <em>推女孩的男孩戴着帽子。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[24]"><em>{{temp.cases.verbTest.yujuqidong.results[24].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[24]">{{temp.cases.verbTest.yujuqidong.results[24].reactType}}</span> </td>
            </tr>
            <tr>
              <td>23</td>
              <td style="text-align: left;">追小狗的小猫戴着帽子。</td>
              <td style="text-align: left;">
                <!-- <em>追小猫的小狗戴着帽子。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[25]"><em>{{temp.cases.verbTest.yujuqidong.results[25].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[25]">{{temp.cases.verbTest.yujuqidong.results[25].reactType}}</span> </td>
            </tr>
            <tr>
              <td>24</td>
              <td style="text-align: left;">埋葬男人的女人戴着帽子。</td>
              <td style="text-align: left;">
                <!-- <em>埋葬女人的男人戴着帽子。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[26]"><em>{{temp.cases.verbTest.yujuqidong.results[26].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[26]">{{temp.cases.verbTest.yujuqidong.results[26].reactType}}</span> </td>
            </tr>
            <tr>
              <td>25</td>
              <td rowspan="4">宾语从句</td>
              <td style="text-align: left;">小猫追的小狗戴着帽子。</td>
              <td style="text-align: left;">
                <!-- <em>小狗追的小猫戴着帽子。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[27]"><em>{{temp.cases.verbTest.yujuqidong.results[27].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[27]">{{temp.cases.verbTest.yujuqidong.results[27].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.binyu.correct}}/4</td>
              <td rowspan="4">{{temp.cases.verbTest.yujuqidong.binyu.rate}}%</td>
            </tr>
            <tr>
              <td>26</td>
              <td style="text-align: left;">女人批评的男孩戴着帽子。</td>
              <td style="text-align: left;">
                <!-- <em>男人批评的女孩戴着帽子。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[28]"><em>{{temp.cases.verbTest.yujuqidong.results[28].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[28]">{{temp.cases.verbTest.yujuqidong.results[28].reactType}}</span> </td>
            </tr>
            <tr>
              <td>27</td>
              <td style="text-align: left;">男人埋葬的女人戴着帽子。</td>
              <td style="text-align: left;">
                <!-- <em>女人埋葬的男人戴着帽子。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[29]"><em>{{temp.cases.verbTest.yujuqidong.results[29].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[29]">{{temp.cases.verbTest.yujuqidong.results[29].reactType}}</span> </td>
            </tr>
            <tr>
              <td>28</td>
              <td style="text-align: left;">男孩推的女孩戴着帽子。</td>
              <td style="text-align: left;">
                <!-- <em>女孩推的男孩戴着帽子。</em> -->
                <span v-if="temp.cases.verbTest.yujuqidong.results[30]"><em>{{temp.cases.verbTest.yujuqidong.results[30].react}}</em></span>
              </td>
              <td> <span v-if="temp.cases.verbTest.yujuqidong.results[30]">{{temp.cases.verbTest.yujuqidong.results[30].reactType}}</span> </td>
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
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[0]"><em>{{temp.cases.verbTest.yujulijie.results[0].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[0]">{{temp.cases.verbTest.yujulijie.results[0].reactType}}</span> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td class="lian_xi">练习2</td>
              <td class="lian_xi"> </td>
              <td>咬小猫的小狗戴着帽子。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[1]"><em>{{temp.cases.verbTest.yujulijie.results[1].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[1]">{{temp.cases.verbTest.yujulijie.results[1].reactType}}</span> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td class="lian_xi">练习3</td>
              <td class="lian_xi"> </td>
              <td>男人在指挥谁？</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[2]"><em>{{temp.cases.verbTest.yujulijie.results[2].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[2]">{{temp.cases.verbTest.yujulijie.results[2].reactType}}</span> </td>
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
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[3]"><em>{{temp.cases.verbTest.yujulijie.results[3].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[3]">{{temp.cases.verbTest.yujulijie.results[3].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujulijie.zhudong.correct}}/4</td>
              <td rowspan="4">{{Math.round(temp.cases.verbTest.yujulijie.zhudong.correct/4 *100)}}%</td>
            </tr>
            <tr>
              <td>2</td>
              <td>男人批评了女孩。</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[4]"><em>{{temp.cases.verbTest.yujulijie.results[4].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[4]">{{temp.cases.verbTest.yujulijie.results[4].reactType}}</span> </td>
            </tr>
            <tr>
              <td>3</td>
              <td>女孩推了男孩。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[5]"><em>{{temp.cases.verbTest.yujulijie.results[5].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[5]">{{temp.cases.verbTest.yujulijie.results[5].reactType}}</span> </td>
            </tr>
            <tr>
              <td>4</td>
              <td>男人在埋葬女人。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[6]"><em>{{temp.cases.verbTest.yujulijie.results[6].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[6]">{{temp.cases.verbTest.yujulijie.results[6].reactType}}</span> </td>
            </tr>
            <tr>
              <td>5</td>
              <td rowspan="4">把字句</td>
              <td>女孩把男孩推倒了。</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[7]"><em>{{temp.cases.verbTest.yujulijie.results[7].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[7]">{{temp.cases.verbTest.yujulijie.results[7].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujulijie.bazi.correct}}/4</td>
              <td rowspan="4">{{Math.round(temp.cases.verbTest.yujulijie.bazi.correct/4 *100)}}%</td>
            </tr>
            <tr>
              <td>6</td>
              <td>女人把男人埋葬了。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[8]"><em>{{temp.cases.verbTest.yujulijie.results[8].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[8]">{{temp.cases.verbTest.yujulijie.results[8].reactType}}</span> </td>
            </tr>
            <tr>
              <td>7</td>
              <td>小狗把小猫追上了。</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[9]"><em>{{temp.cases.verbTest.yujulijie.results[9].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[9]">{{temp.cases.verbTest.yujulijie.results[9].reactType}}</span> </td>
            </tr>
            <tr>
              <td>8</td>
              <td>男人把女孩批评了。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[10]"><em>{{temp.cases.verbTest.yujulijie.results[10].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[10]">{{temp.cases.verbTest.yujulijie.results[10].reactType}}</span> </td>
            </tr>
            <tr>
              <td>9</td>
              <td rowspan="4">被字句</td>
              <td>小猫被小狗追上了。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[11]"><em>{{temp.cases.verbTest.yujulijie.results[11].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[11]">{{temp.cases.verbTest.yujulijie.results[11].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujulijie.beizi.correct}}/4</td>
              <td rowspan="4">{{Math.round(temp.cases.verbTest.yujulijie.beizi.correct/4 *100)}}%</td>
            </tr>
            <tr>
              <td>10</td>
              <td>女孩被男孩推倒了。</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[12]"><em>{{temp.cases.verbTest.yujulijie.results[12].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[12]">{{temp.cases.verbTest.yujulijie.results[12].reactType}}</span> </td>
            </tr>
            <tr>
              <td>11</td>
              <td>男孩被女人批评了。</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[13]"><em>{{temp.cases.verbTest.yujulijie.results[13].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[13]">{{temp.cases.verbTest.yujulijie.results[13].reactType}}</span> </td>
            </tr>
            <tr>
              <td>12</td>
              <td>女人被男人埋葬了。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[14]"><em>{{temp.cases.verbTest.yujulijie.results[14].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[14]">{{temp.cases.verbTest.yujulijie.results[14].reactType}}</span> </td>
            </tr>
            <tr>
              <td>13</td>
              <td rowspan="4">主语疑问句</td>
              <td>谁批评了男孩？</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[15]"><em>{{temp.cases.verbTest.yujulijie.results[15].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[15]">{{temp.cases.verbTest.yujulijie.results[15].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujulijie.zhuyuyiwen.correct}}/4</td>
              <td rowspan="4">{{Math.round(temp.cases.verbTest.yujulijie.zhuyuyiwen.correct/4 *100)}}%</td>
            </tr>
            <tr>
              <td>14</td>
              <td>谁推了男孩？</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[16]"><em>{{temp.cases.verbTest.yujulijie.results[16].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[16]">{{temp.cases.verbTest.yujulijie.results[16].reactType}}</span> </td>
            </tr>
            <tr>
              <td>15</td>
              <td>谁在埋葬女人？</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[17]"><em>{{temp.cases.verbTest.yujulijie.results[17].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[17]">{{temp.cases.verbTest.yujulijie.results[17].reactType}}</span> </td>
            </tr>
            <tr>
              <td>16</td>
              <td>谁在追小狗？</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[18]"><em>{{temp.cases.verbTest.yujulijie.results[18].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[18]">{{temp.cases.verbTest.yujulijie.results[18].reactType}}</span> </td>
            </tr>
            <tr>
              <td>17</td>
              <td rowspan="4">宾语疑问句</td>
              <td>男人在埋葬谁？</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[19]"><em>{{temp.cases.verbTest.yujulijie.results[19].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[19]">{{temp.cases.verbTest.yujulijie.results[19].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujulijie.binyuyiwen.correct}}/4</td>
              <td rowspan="4">{{Math.round(temp.cases.verbTest.yujulijie.binyuyiwen.correct/4 *100)}}%</td>
            </tr>
            <tr>
              <td>18</td>
              <td>男人批评了谁？</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[20]"><em>{{temp.cases.verbTest.yujulijie.results[20].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[20]">{{temp.cases.verbTest.yujulijie.results[20].reactType}}</span> </td>
            </tr>
            <tr>
              <td>19</td>
              <td>女孩推了谁？</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[21]"><em>{{temp.cases.verbTest.yujulijie.results[21].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[21]">{{temp.cases.verbTest.yujulijie.results[21].reactType}}</span> </td>
            </tr>
            <tr>
              <td>20</td>
              <td>小狗在追谁？</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[22]"><em>{{temp.cases.verbTest.yujulijie.results[22].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[22]">{{temp.cases.verbTest.yujulijie.results[22].reactType}}</span> </td>
            </tr>
            <tr>
              <td>21</td>
              <td rowspan="4">主语从句</td>
              <td>批评男孩的女人戴着帽子。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[23]"><em>{{temp.cases.verbTest.yujulijie.results[23].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[23]">{{temp.cases.verbTest.yujulijie.results[23].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujulijie.zhuyu.correct}}/4</td>
              <td rowspan="4">{{Math.round(temp.cases.verbTest.yujulijie.zhuyu.correct/4 *100)}}%</td>
            </tr>
            <tr>
              <td>22</td>
              <td>推女孩的男孩戴着帽子。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[24]"><em>{{temp.cases.verbTest.yujulijie.results[24].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[24]">{{temp.cases.verbTest.yujulijie.results[24].reactType}}</span> </td>
            </tr>
            <tr>
              <td>23</td>
              <td>追小狗的小猫戴着帽子。</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[25]"><em>{{temp.cases.verbTest.yujulijie.results[25].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[25]">{{temp.cases.verbTest.yujulijie.results[25].reactType}}</span> </td>
            </tr>
            <tr>
              <td>24</td>
              <td>埋葬男人的女人戴着帽子。</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[26]"><em>{{temp.cases.verbTest.yujulijie.results[26].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[26]">{{temp.cases.verbTest.yujulijie.results[26].reactType}}</span> </td>
            </tr>
            <tr>
              <td>25</td>
              <td rowspan="4">宾语从句</td>
              <td>小狗追的小猫戴着帽子。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[27]"><em>{{temp.cases.verbTest.yujulijie.results[27].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[27]">{{temp.cases.verbTest.yujulijie.results[27].reactType}}</span> </td>
              <td rowspan="4">{{temp.cases.verbTest.yujulijie.binyu.correct}}/4</td>
              <td rowspan="4">{{Math.round(temp.cases.verbTest.yujulijie.binyu.correct/4 *100)}}%</td>
            </tr>
            <tr>
              <td>26</td>
              <td>女人批评的男孩戴着帽子。</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[28]"><em>{{temp.cases.verbTest.yujulijie.results[28].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[28]">{{temp.cases.verbTest.yujulijie.results[28].reactType}}</span> </td>
            </tr>
            <tr>
              <td>27</td>
              <td>男人埋葬的女人戴着帽子。</td>
              <td>1</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[29]"><em>{{temp.cases.verbTest.yujulijie.results[29].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[29]">{{temp.cases.verbTest.yujulijie.results[29].reactType}}</span> </td>
            </tr>
            <tr>
              <td>28</td>
              <td>女孩推的男孩戴着帽子。</td>
              <td>2</td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[30]"><em>{{temp.cases.verbTest.yujulijie.results[30].react}}</em></span> </td>
              <td> <span v-if="temp.cases.verbTest.yujulijie.results[30]">{{temp.cases.verbTest.yujulijie.results[30].reactType}}</span> </td>
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
              <td>{{temp.cases.verbTest.huizong.dccc[0]}} </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.lyjg[0]}} </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>二元动词正确率</td>
              <td>{{temp.cases.verbTest.huizong.dccc[1]}} </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.lyjg[1]}} </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>三元动词正确率</td>
              <td>{{temp.cases.verbTest.huizong.dccc[2]}} </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.lyjg[2]}} </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2" rowspan="3">动词理解</td>
              <td>一元动词正确率</td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.dclj[0]}} </td>
              <td>{{temp.cases.verbTest.huizong.lyjg[3]}} </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>二元动词正确率</td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.dclj[1]}} </td>
              <td>{{temp.cases.verbTest.huizong.lyjg[4]}} </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>三元动词正确率</td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.dclj[2]}} </td>
              <td>{{temp.cases.verbTest.huizong.lyjg[5]}} </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td colspan="2" rowspan="6">论元结构产出</td>
              <td>一元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.lyjg[6]}} </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>二元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.lyjg[7]}} </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>三元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.lyjg[8]}} </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>一元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.chcr[0]}} </td>
              <td> </td>
            </tr>
            <tr>
              <td>二元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.chcr[1]}} </td>
              <td> </td>
            </tr>
            <tr>
              <td>三元动词论元正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.chcr[2]}} </td>
              <td> </td>
            </tr>
            <tr>
              <td rowspan="7">语句产出启动</td>
              <td rowspan="3">典型语序</td>
              <td>主动句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.chcr[3]}} </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[0]}} </td>
            </tr>
            <tr>
              <td>主语疑问句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.chcr[4]}} </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[1]}} </td>
            </tr>
            <tr>
              <td>宾语从句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.chcr[5]}} </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[2]}} </td>
            </tr>
            <tr>
              <td rowspan="4">非典型语序</td>
              <td>把字句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.chcr[6]}} </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[3]}} </td>
            </tr>
            <tr>
              <td>被字句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.chcr[7]}} </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[4]}} </td>
            </tr>
            <tr>
              <td>宾语疑问句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.chcr[8]}} </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[5]}} </td>
            </tr>
            <tr>
              <td>主语从句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.chcr[9]}} </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[6]}} </td>
            </tr>
            <tr>
              <td rowspan="7">语句理解</td>
              <td rowspan="3">典型语序</td>
              <td>主动句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[7]}} </td>
            </tr>
            <tr>
              <td>主语疑问句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[8]}} </td>
            </tr>
            <tr>
              <td>宾语从句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[9]}} </td>
            </tr>
            <tr>
              <td rowspan="4">非典型语序</td>
              <td>把字句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[10]}} </td>
            </tr>
            <tr>
              <td>被字句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[11]}} </td>
            </tr>
            <tr>
              <td>宾语疑问句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[12]}} </td>
            </tr>
            <tr>
              <td>主语从句正确率</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{{temp.cases.verbTest.huizong.jfjg[13]}} </td>
            </tr>
          </tbody>
        </table>

        <h4>表 W　动词语句加工能力评估表</h4>
        <div style="width: 40%; display: inline-block; margin-bottom: 20px;">
          <table style="text-align: center; width: 100%; border: none; border-color: gray; border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1 solid" cellspacing="0" cellpadding="0">
            <thead>
              <tr class="rtable-header" style="height: 18px;">
                <th style="width: 13%;" colspan="2"> 动词语句加工能力 </th>
                <th style="width: 10%;"> 正确率</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="width: 13%;" rowspan="2">动词   </td>
                <td style="width: 10%;">动词产出</td>
                <td style="width: 10%;">{{temp.cases.verbTest.pinggu.dccc.rate}}%</td>
              </tr>
              <tr>
                <td style="width: 10%;">动词理解</td>
                <td style="width: 10%;">{{temp.cases.verbTest.pinggu.dclj.rate}}%</td>
              </tr>
              <tr>
                <td style="width: 13%;" rowspan="3">语法加工能力   </td>
                <td style="width: 10%;">论元结构</td>
                <td style="width: 10%;">{{temp.cases.verbTest.pinggu.lyjg.rate}}%</td>
              </tr>
              <tr>
                <td style="width: 10%;">词汇插入</td>
                <td style="width: 10%;">{{temp.cases.verbTest.pinggu.chcr.rate}}%</td>
              </tr>
              <tr>
                <td style="width: 10%;">句法结构分析及转换</td>
                <td style="width: 10%;">{{temp.cases.verbTest.pinggu.jfjg.rate}}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style='width: 50%; height:300px; display: inline-block;'>
            <e-chart id="chart2" height='200px' width='100%' :options="dongci_bar_options"></e-chart>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="handleCreateUser">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList } from '@/api/report'

import waves from '@/directive/waves/index.js' // 水波纹指令
// import { parseTime } from '@/utils'

import eChart from '@/components/Charts/eChart'

function tableBMerge(results) {
  var static_data = [
    ['练习1', '狗', '钩', '钩', ''], // 0,1,2,3, reactType, reactIndex
    ['练习2', '米', '蜜', '米', ''],
    ['1', '竹', '猪', '猪', ''],
    ['2', '马', '妈', '马', ''],
    ['3', '笔', '鼻', '鼻', ''],
    ['4', '猫', '帽', '帽', ''],
    ['5', '炉', '鹿', '炉', ''],
    ['6', '鸭', '牙', '牙', ''],
    ['7', '鼠', '树', '鼠', ''],
    ['8', '花', '画', '花', ''],
    ['9', '眼', '烟', '烟', ''],
    ['10', '兔', '土', '兔', ''],
    ['11', '河', '鹤', '鹤', ''],
    ['12', '虎', '湖', '虎', '']
  ]
  results.forEach(function(element, i) {
    static_data[i][4] = element.reactType
    static_data[i][5] = element.react
  }, this)
  return static_data
}

function tableCMerge(results) {
  var static_data = [
    ['练习1', '地 / 点', '', '+', ''],
    ['练习2', '祛 / 候', '', '-', ''],
    ['1', '铁 / 日', '', '-', ''],
    ['2', '蝴 / 蝶', '', '+', ''],
    ['3', '过 / 开', '', '-', ''],
    ['4', '蚂 / 蟥', '', '+', ''],
    ['5', '菊 / 花', '', '+', ''],
    ['6', '合 / 眯', '', '-', ''],
    ['7', '清 / 朵', '', '-', ''],
    ['8', '樟 / 木', '', '+', ''],
    ['9', '啤 / 然', '', '-', ''],
    ['10', '手 / 工', '', '+', ''],
    ['11', '白 / 水', '', '+', ''],
    ['12', '倭 / 见', '', '-', ''],
    ['13', '海 / 湾', '', '+', ''],
    ['14', '沮 / 骈', '', '-', ''],
    ['15', '礁 / 氓', '', '-', ''],
    ['16', '马 / 驹', '', '+', '']
  ]
  results.forEach(function(element, i) {
    static_data[i][2] = element.react
    static_data[i][4] = element.reactType
  }, this)
  return static_data
}
export default {
  name: 'table_user',
  directives: {
    waves
  },
  data() {
    return {
      series: [1, 2, 3],
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
        tester: '',
        testee: '',
        time: '',
        cases: {
          namedTest: {
            duizhengmingming: {
              ani: { asureCorrectCount: 0, asureCount: 0, correctCount: 0 },
              body: { asureCorrectCount: 0, asureCount: 0, correctCount: 0 },
              cloth: { asureCorrectCount: 0, asureCount: 0, correctCount: 0 },
              color: { asureCorrectCount: 0, asureCount: 0, correctCount: 0 },
              fruit: { asureCorrectCount: 0, asureCount: 0, correctCount: 0 },
              low: { asureCorrectCount: 0, asureCount: 0, correctCount: 0 },
              results: [
                {
                  assureReact: '1',
                  assureReactType: '+',
                  react: '+',
                  reactType: '+'
                }
              ],
              tool: { asureCorrectCount: 0, asureCount: 0, correctCount: 0 },
              vi: { asureCorrectCount: 0, asureCount: 0, correctCount: 0 },
              vt: { asureCorrectCount: 0, asureCount: 0, correctCount: 0 }
            },
            huizong: {
              dcly: [0, 0, 0, 0],
              dj: [0, 0],
              dpc: [0, 0],
              mcfl: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              mdb: [0, 0, 0, 0, 0, 0, 0, 0],
              sdjm: [0, 0, 0],
              sj: [],
              smd: [0, 0, 0, 0, 0, 0, 0, 0],
              tjch: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              yych: [0, 0, 0, 0, 0, 0, 0, 0, 0],
              yygl: [0, 0],
              yyio: [0, 0, 0, 0],
              yyjm: [0, 0, 0, 0, 0, 0, 0]
            },
            jiacifushu: { results: ['+'], total: 0 },
            pinggu: {
              dcly: { correct: 0, rate: 0 },
              dj: { correct: 0, rate: 0 },
              dpc: { correct: 0, rate: 0 },
              mcfl: { correct: 0, rate: 0 },
              mdb: { correct: 0, rate: 0 },
              sdjm: { correct: 0, rate: 0 },
              sj: { correct: 0, rate: 0 },
              smd: { correct: 0, rate: 0 },
              tjch: { correct: 0, rate: 0 },
              yych: { correct: 0, rate: 0 },
              yygl: { correct: 0, rate: 0 },
              yyio: { correct: 0, rate: 0 },
              yyjm: { correct: 0, rate: 0 }
            },
            shengdiaolijie: {
              results: [{ react: '1', reactType: '+' }],
              total: 0
            },
            tingjuebianshi: {
              results: [{ react: '+', reactType: '+' }],
              same: 0,
              shengdiao: 0,
              shengmu: 0,
              total: 0,
              yunmu: 0
            },
            tingjuecihui: {
              jiaci: 0,
              results: [{ react: '+', reactType: '+' }],
              total: 0,
              zhenci: 0
            },
            tingjuelijie: {
              ani: 0,
              body: 0,
              cloth: 0,
              color: 0,
              fruit: 0,
              low: 0,
              results: ['+'],
              tool: 0,
              vi: 0,
              vt: 0
            },
            yuyiguanlian: {
              ani: 0,
              results: [{ react: '1', reactType: '+' }],
              tool: 0,
              total: 0
            },
            zhencifushu: { results: ['+'], total: 0 }
          },
          verbTest: {
            dongcilijie: {
              one: { correct: 0, rate: 0 },
              results: [{ react: '' }],
              three: { correct: 0, rate: 0 },
              three1: { correct: 0, rate: 0 },
              three2: { correct: 0, rate: 0 },
              three3: { correct: 0, rate: 0 },
              three4: { correct: 0, rate: 0 },
              total: { correct: 0, rate: 0 },
              tow: { correct: 0, rate: 0 }
            },
            dongcimingming: {
              one: { correct: 0, rate: 0 },
              results: [{ react: '', reactType: '+' }],
              three: { correct: 0, rate: 0 },
              three1: { correct: 0, rate: 0 },
              three2: { correct: 0, rate: 0 },
              three3: { correct: 0, rate: 0 },
              three4: { correct: 0, rate: 0 },
              total: { correct: 0, rate: 0 },
              tow: { correct: 0, rate: 0 }
            },
            huizong: {
              chcr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              dccc: [0, 0, 0],
              dclj: [0, 0, 0],
              jfjg: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              lyjg: [0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            lunyuanjiegou: {
              one: {
                V: 0,
                both: 0,
                cihui: 0,
                lunyuan: 0,
                react: '',
                x: 0,
                y: 0,
                z: 0
              },
              results: [
                {
                  V: 0,
                  cihui: 0,
                  lunyuan: 0,
                  react: '',
                  x: 0,
                  y: 0,
                  z: 0
                }
              ],
              three1: {
                V: 0,
                both: 0,
                cihui: 0,
                lunyuan: 0,
                react: '',
                x: 0,
                y: 0,
                z: 0
              },
              three2: {
                V: 0,
                both: 0,
                cihui: 0,
                lunyuan: 0,
                react: '',
                x: 0,
                y: 0,
                z: 0
              },
              three3: {
                V: 0,
                both: 0,
                cihui: 0,
                lunyuan: 0,
                react: '',
                x: 0,
                y: 0,
                z: 0
              },
              three4: {
                V: 0,
                both: 0,
                cihui: 0,
                lunyuan: 0,
                react: '',
                x: 0,
                y: 0,
                z: 0
              },
              two: {
                V: 0,
                both: 0,
                cihui: 0,
                lunyuan: 0,
                react: '',
                x: 0,
                y: 0,
                z: 0
              }
            },
            pinggu: {
              chcr: { correct: 0, rate: 0 },
              dccc: { correct: 0, rate: 0 },
              dclj: { correct: 0, rate: 0 },
              jfjg: { correct: 0, rate: 0 },
              lyjg: { correct: 0, rate: 0 }
            },
            yujulijie: {
              results: [{ react: '1', reactType: '+' }],
              bazi: { correct: 0, rate: 0 },
              beizi: { correct: 0, rate: 0 },
              binyu: { correct: 0, rate: 0 },
              binyuyiwen: { correct: 0, rate: 0 },
              zhudong: { correct: 0, rate: 0 },
              zhuyu: { correct: 0, rate: 0 },
              zhuyuyiwen: { correct: 0, rate: 0 }
            },
            yujuqidong: {
              results: [{ react: '1', reactType: '+' }],
              bazi: { correct: 0, rate: 0 },
              beizi: { correct: 0, rate: 0 },
              binyu: { correct: 0, rate: 0 },
              binyuyiwen: { correct: 0, rate: 0 },
              zhudong: { correct: 0, rate: 0 },
              zhuyu: { correct: 0, rate: 0 },
              zhuyuyiwen: { correct: 0, rate: 0 }
            }
          }
        },
        info: {
          address: '',
          bingfazheng: {
            dianxin: 0,
            gaoxueya: 0,
            lusun: 0,
            others: '',
            shijue: 0,
            xinzang: 0,
            xujiu: 0,
            yiyu: 0,
            zhuting: 0
          },
          birthday: '',
          cNo: '',
          certNo: '',
          contact: '',
          earTest: 0,
          earTestTime: '',
          education: 0,
          email: '',
          eyeTest: 0,
          eyeTestTime: '',
          gendar: 0,
          handedness: 0,
          kouyu: '',
          liulidu: 0,
          married: 0,
          medicine: '',
          minzu: '',
          mobile: '',
          muyu: '',
          name: '',
          occupy: '',
          piantan: 0,
          piantanDes: '',
          piantanPart: '',
          piantanSide: 0,
          piantanTime: '',
          putonghua: 0,
          recordSavePlace: '',
          relationship: '',
          scores: { aq: 0, fushu: 0, mingming: 0, ting: 0, zifa: 0 },
          shiyuType: '',
          storyRecord: 0,
          tEmail: '',
          testTime: '',
          tester: '',
          tpNo: '',
          zhenduan: { naochuxue: 0, naogeng: 0, others: '' },
          zhiruwu: {
            banmo: 0,
            cixing: 0,
            gangsi: 0,
            guanjie: 0,
            guding: 0,
            jieyu: 0,
            jingmai: 0,
            no: 0,
            xinzang: 0,
            xueguan: 0,
            yichi: 0,
            zhijia: 0
          }
        },
        miliTime: 1509074114876
      },
      yn_texts: ['否', '是'],
      gendar_texts: ['男', '女'],
      handedness_texts: ['左利手', '右利手'],
      education_texts: ['中学以下', '中学', '大学', '大学以上'],
      marriage_texts: ['单身', '已婚', '丧偶', '离异'],
      piantan_texts: ['左侧', '右侧', '双侧'],
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
      tableKey: 0,
      dongci_bar_options: {
        title: {
          text: ''
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
            name: '',
            type: 'bar',
            data: [11, 22, 33, 44, 55]
          }
        ]
      },
      renzhi_bar_options: {
        title: {
          text: ''
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
          data: [
            '听觉短时记忆',
            '视觉感知物体能力',
            '动词论元结构',
            '语义关联',
            '名词动词范畴分离',
            '名词生命度',
            '名词范畴分类',
            '低频词提取',
            '语音词汇产出',
            '听觉词汇理解',
            '听觉输入到语音输出',
            '声调解码',
            '语音解码'
          ]
        },
        series: [
          {
            name: '',
            type: 'bar',
            data: [11, 22, 33, 44, 55, 66, 77, 88, 99, 10, 11, 12, 13]
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
        var reportList = []
        response.data.content.forEach(function(element) {
          element.cases = JSON.parse(element.cases)
          element.info = JSON.parse(element.info)
          reportList.push(element)
        }, this)
        this.list = reportList
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    tableAMerge(data) {
      var static_data = [
        // ['序号', '项目', '被测反应', '标准答案', '反应类别'],
        ['练习1', 'xī / xǐ', '', '-', ''],
        ['练习2', 'ké / ké', '', '-', ''],
        ['练习3', 'zuì / tuì', '', '-', ''],
        ['1', 'bó / bó', '', '+', ''],
        ['2', 'kā / hā', '', '-', ''],
        ['3', 'tóu / tòu', '', '-', ''],
        ['4', 'cā / cā', '', '+', ''],
        ['5', 'mēn / mén', '', '-', ''],
        ['6', 'pí / dí', '', '-', ''],
        ['7', 'hé / hú', '', '-', ''],
        ['8', 'yóu / yóu', '', '+', ''],
        ['9', 'duī / diū', '', '-', ''],
        ['10', 'wāi / wài', '', '-', ''],
        ['11', 'tiě / tiě', '', '+', ''],
        ['12', 'niǎo / niǔ', '', '-', ''],
        ['13', 'kuò / ruò', '', '-', ''],
        ['14', 'gǔ / gǔ', '', '+', ''],
        ['15', 'jiā / jiǎ', '', '-', ''],
        ['16', 'zhuā / zhuā', '', '+', ''],
        ['17', 'bò / bì', '', '-', ''],
        ['18', 'jǔ / xǔ', '', '-', ''],
        ['19', 'yuǎn / yuàn', '', '-', ''],
        ['20', 'sì / sì', '', '+', ''],
        ['21', 'shú / shǔ', '', '-', ''],
        ['22', 'luè / luè', '', '+', '']
      ]
      console.log(static_data)
    },
    handleFilter() {
      this.series[2] = 5
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
    showReport(row) {
      row.cases.namedTest.shengdiaolijie.mergedData = tableBMerge(
        row.cases.namedTest.shengdiaolijie.results
      )
      row.cases.namedTest.tingjuecihui.mergedData = tableCMerge(
        row.cases.namedTest.tingjuecihui.results
      )

      this.temp = Object.assign({}, row)
      this.renzhi_bar_options.series[0].data = [
        this.temp.cases.namedTest.pinggu.dj.rate,
        this.temp.cases.namedTest.pinggu.sj.rate,
        this.temp.cases.namedTest.pinggu.dcly.rate,
        this.temp.cases.namedTest.pinggu.yygl.rate,
        this.temp.cases.namedTest.pinggu.mdb.rate,
        this.temp.cases.namedTest.pinggu.smd.rate,
        this.temp.cases.namedTest.pinggu.mcfl.rate,
        this.temp.cases.namedTest.pinggu.dpc.rate,
        this.temp.cases.namedTest.pinggu.yych.rate,
        this.temp.cases.namedTest.pinggu.tjch.rate,
        this.temp.cases.namedTest.pinggu.yyio.rate,
        this.temp.cases.namedTest.pinggu.sdjm.rate,
        this.temp.cases.namedTest.pinggu.yyjm.rate
      ]

      this.dongci_bar_options.series[0].data = [
        this.temp.cases.verbTest.pinggu.jfjg.rate,
        this.temp.cases.verbTest.pinggu.chcr.rate,
        this.temp.cases.verbTest.pinggu.lyjg.rate,
        this.temp.cases.verbTest.pinggu.dclj.rate,
        this.temp.cases.verbTest.pinggu.dccc.rate
      ]
      // this.renzhi_bar_options.series[0].data[12] = this.temp.cases.namedTest.pinggu.yyjm.rate
      // this.renzhi_bar_options.series[0].data[11] = this.temp.cases.namedTest.pinggu.sdjm.rate
      // this.renzhi_bar_options.series[0].data[10] = this.temp.cases.namedTest.pinggu.yyio.rate
      // this.renzhi_bar_options.series[0].data[9] = this.temp.cases.namedTest.pinggu.tjch.rate
      // this.renzhi_bar_options.series[0].data[8] = this.temp.cases.namedTest.pinggu.yych.rate
      // this.renzhi_bar_options.series[0].data[7] = this.temp.cases.namedTest.pinggu.dpc.rate
      // this.renzhi_bar_options.series[0].data[6] = this.temp.cases.namedTest.pinggu.mcfl.rate
      // this.renzhi_bar_options.series[0].data[5] = this.temp.cases.namedTest.pinggu.smd.rate
      // this.renzhi_bar_options.series[0].data[4] = this.temp.cases.namedTest.pinggu.mdb.rate
      // this.renzhi_bar_options.series[0].data[3] = this.temp.cases.namedTest.pinggu.yygl.rate
      // this.renzhi_bar_options.series[0].data[2] = this.temp.cases.namedTest.pinggu.dcly.rate
      // this.renzhi_bar_options.series[0].data[1] = this.temp.cases.namedTest.pinggu.sj.rate
      // this.renzhi_bar_options.series[0].data[0] = this.temp.cases.namedTest.pinggu.dj.rate
      // this.temp.report = JSON.parse(this.temp.report)
      // TODO get/set report detail
      this.dialogFormVisible = true
    },
    update() {
      // this.series[1] = 10
      this.dongci_bar_options.series[0].data = [2, 4, 8, 33, 88]
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
    undoBingFaZheng(type) {
      console.log('bingfazheng clicked: ' + type)
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
$grey: rgb(217, 217, 217);

.grey_bg {
  background-color: $grey;
}

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
}
</style>
