<template>
  <div id="app">
    <div v-show="maxValueNow>0">
      <div class="m-mainTitle">趋势对比图</div>
      <div class="m-controller">
        <span>请输入待测发动机序号（只接受1至{{maxValueNow}}）：</span>
        <span><InputNumber :max="maxValueNow" :min="1" v-model="numValue" class="m-numberInputer"></InputNumber></span>
        <span class="m-btn-here"><Button type="primary" @click="readyForDrawTrendChart()">确定</Button></span>
      </div>
      <br>
      <div id="echartHere" style="margin-left:150px;"></div>
      <!--<div id="rulLabelContainere">{{rulLabel}}</div>-->
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: 'TrendChart',
    components: {},
    props: [],
    data() {
      return {
        entireDataObj: {},
        numValue:1,
        maxValueNow:0,
        rulLabel:''
      }
    },
    computed: {},
    watch: {},
    mounted: function () {

      this.parseExternalJSONData();

    },
    methods: {

      parseExternalJSONData()
      {
        let url;

        if(window.location.href.indexOf("localhost")>-1)
        {
          url = '/static/result.json';
        }else{
          url = 'http://cnooc-demo.neuseer.cn/output/result.json?m='+Math.random();
        }

        this.axios({
          method: 'get',
          url: url
        }).then((res) => {

          console.log(JSON.stringify(res))

          this.entireDataObj = res.data;

          let k=0;
          for(var i in this.entireDataObj)
          {
            k+=1;
          }

          this.maxValueNow = k;

          this.readyForDrawTrendChart(1);

        }).catch((error) => {

            console.log("error " + error);

        });
      },

      readyForDrawTrendChart() {

        let currentDrawDataObj = this.entireDataObj[this.numValue];
        let xDataList = currentDrawDataObj["x1"];
        let y1DataList = currentDrawDataObj["y1"];

        let x2DataList = currentDrawDataObj["x2"];
        let x3DataList = currentDrawDataObj["x3"];
        let tempY2 = currentDrawDataObj["y2"];
        let tempY3 = currentDrawDataObj["y3"];
        let currentModelValue = currentDrawDataObj["model"];

        this.rulLabel = "rul: "+currentDrawDataObj["rul"];

        let y2DataList = [];
        let y3DataList = [];

        for(var i=0;i<xDataList.length;i++)
        {
          if(x2DataList.in_array(i))
          {
            y2DataList.push(tempY2[x2DataList.indexOf(i)]);
          } else {
            y2DataList.push("");
          }
          if(x3DataList.in_array(i))
          {
            y3DataList.push(tempY3[x3DataList.indexOf(i)]);
          } else {
            y3DataList.push("");
          }
        }

        // console.log("*****");
        // console.log("xDataList.length="+xDataList.length);
        // console.log("y1DataList.length="+y1DataList.length);
        // console.log(JSON.stringify(y2DataList));
        // console.log("y2DataList.length="+y2DataList.length);

        let option = {
          title: {
            text: '发动机序号为'+this.numValue+'的图（ RUL='+currentDrawDataObj["rul"]+' )'
          },
          tooltip: {
            trigger: 'axis',
            align:'left',
            padding:7,
            show: true,
            textStyle:{
              align:'left'
            },
          },
          legend: {
            data: ['model:'+currentModelValue, 'polyfitting', 'test'],
            symbol: 'none',
            textStyle:{
              fontSize:14
            },
          },
          color: ['#FFA500', '#008000', '#c23531'],
          xAxis: [{
            name: '',
            nameGap: 10,
            boundaryGap: false,
            data: xDataList,
            axisLine:{
              onZero:false
            },
            axisLabel: {
              interval: 'auto',
              showMinLabel: true,
              showMaxLabel: true,
              align: 'center',
              inside: false,
              textStyle: {
                color: '#000'
              }
            }
          }],
          yAxis: [{
            name: "",
            nameTextStyle: {
              width: '100%'
            },
            type:'value',
            scale:true
          }],
          dataZoom:[
            {
              type:'inside'
            }
          ],
          series: [{
            name: 'model:'+currentModelValue,
            type: 'line',
            symbol: 'none',
            data: y1DataList
          },
            {
              name: 'polyfitting',
              type: 'line',
              symbol: 'none',
              data: y2DataList
            },
            {
              name: 'test',
              type: 'line',
              symbol: 'none',
              data: y3DataList
            }
          ]
        };

        let leftPadding = 150, rightPadding = 150;

        let chartDomWidth = document.body.offsetWidth - leftPadding - rightPadding;

        let chartDom = this.d('echartHere');

        chartDom.style.width = chartDomWidth + "px";

        chartDom.style.height = 450 + "px";

        let currentChart = echarts.init(chartDom);

        currentChart.clear();

        currentChart.setOption(option, true);

      },

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }

  .m-mainTitle {
    width: 100%;
    text-align: center;
    margin: 3px 0;
    margin-bottom: 35px;
    font-size: 20px;
    font-weight: bold;
  }

  .m-controller {
    text-align: center;
    margin: 10px 0;
    margin-bottom: 35px;
    font-size: 14px;
  }

  .m-numberInputer {
    width: 60px;
  }

  .m-btn-here {
    padding-left: 20px;
  }

  #rulLabelContainere{
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }

</style>
