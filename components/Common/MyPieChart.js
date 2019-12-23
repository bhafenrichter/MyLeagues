import React from 'react'
import { View } from 'react-native'
import {PieChart} from 'react-native-chart-kit'

import {chartConfig} from './../../utils/ChartHelper'

const MyPieChart = (props) => {
  const {data} = props;

  const chartData = [];
  chartData.push({
    name: "Wins",
    population: 5,
    color: "green",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  });
  chartData.push({
    name: "Losses",
    population: 4,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  });
  console.log(chartData);
  return (
    <View>
        <PieChart
          data={chartData}
          width={250}
          height={100}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
          /> 
    </View>
  
  )
}

export default MyPieChart
