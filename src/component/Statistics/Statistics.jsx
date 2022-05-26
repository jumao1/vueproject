import React, { Component } from 'react';
import * as echarts from 'echarts';
import "./Statistics.css"
import axios from 'axios';
class Statistics extends Component {
    componentDidMount() {
        
        
        this.getMonthSaleByYear()
        this.getCountPayType()
    }
    getCountPayType=()=>{
        axios({
            method: 'get',
            url: '/api/statistics/getCountPayType',
          }).then((response) => {
            let item= response.data.data.map(item=>{
                return {
                    value: item.count,
                    name: item.paytype,
                }
            })
            console.log(item)
            this.pir(item)
          }).catch((error) => {
            console.error(error);
          }).finally(() => {
            // TODO
          });
    }
    getMonthSaleByYear=()=>{
        axios.get('/api/statistics/getMonthSaleByYear', {
            params: {
              year: '2022',
            },
          }).then((response) => {
            let month= response.data.data.map(item=>{
                return item.month+"月"
            })
            let price= response.data.data.map(item=>{
                
                    return item.price
               
            })
            console.log(month)
            console.log(price)
            this.zhe(month,price)
          }).catch((error) => {
            console.error(error);
          }).finally(() => {
            // TODO
          });
    }
    pir = (item) => {
        var chartDom = document.getElementById('pir');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    name: 'kun',
                    type: 'pie',
                    radius: [40, 150],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data:item
                }
            ]
        };

        option && myChart.setOption(option);
    }
    zhe = (month,price) => {
        var chartDom = document.getElementById('zhe');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            xAxis: {
                type: 'category',
                data: month
            },
            yAxis: {
                type: 'value',
                max:50000,
                min:0,
            },
            series: [
                {
                    data: price,
                    type: 'bar',
                    barWidth:40,
                    showBackground: true,
                    backgroundStyle: {
                      color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        };

        option && myChart.setOption(option);

    }
    render() {
        return (
            <div className='statistic'>
                <div id="pir"></div>
                <div id="zhe" ></div>
            </div>
        );
    }
}

export default Statistics;