import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import { blueGrey300, pink50, green100, orange900, grey900, grey300, white } from 'material-ui/styles/colors';

import C3Chart from 'react-c3js';

import { formatCurrency } from '../../services/common';

export default function TeamDetails({balance, teamAttributes, ...props}) {

  var barChartOptions = {
    data: {
      columns: [
        ["Total", parseInt(teamAttributes["attack"], 10), parseInt(teamAttributes["mid"], 10), parseInt(teamAttributes["defence"], 10)],
      ],
      type: "bar",
      labels: true,
      color: function (color, d) {
        var pattern = ['#FF0000', '#F97600', '#FAAA00', '#F6C600', '#99CC00', '#00AA00'];
        var threshold = [50, 60, 70, 80, 90, 100];
        var output = null;
        for (var i=0; i<pattern.length;i++) {
          if (d.value < threshold[i]) {
            output = pattern[i];
            break;
          }
        }
        return output;
      }
    },
    size: {
      height: 115
    },
    axis: {
      x: {
        type: 'category',
        categories: ['Attack', 'Mid', 'Defence'],
      },
      y: {
        show: false,
      }
    },
    tooltip: {
      show: false
    },
    legend: {
      show: false
    }
  }

  return (
      <Card initiallyExpanded={true} style={{ marginRight: 16, width: 248 }}>
        <CardHeader
          title="Team Overview"
          titleColor={white}
          subtitle={formatCurrency(balance) + " left"}
          subtitleColor={grey300}
          actAsExpander={true}
          showExpandableButton={false}
          style={{ backgroundColor: orange900 }} />
        <CardText expandable={true} >
          <C3Chart
            data={barChartOptions.data}
            size={barChartOptions.size}
            axis={barChartOptions.axis}
            legend={barChartOptions.legend}
            tooltip={barChartOptions.tooltip} />
        </CardText>
      </Card>
  )
}