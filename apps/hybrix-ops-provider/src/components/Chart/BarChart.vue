<template>
  <div ref="barChartRef" class="bar-chart-container"></div>

  <Teleport to="#teleport">
    <div ref="tooltipRef" class="bar-chart-tooltip">
      <div class="bar-chart-tooltip__date">9999.99.99</div>

      <div class="bar-chart-tooltip-content">
        <span class="bar-chart-tooltip__title">{{ tooltipTitle }}</span>
        <span class="bar-chart-tooltip__data">9999</span>
      </div>
    </div>
  </Teleport>
</template>

<!-- prettier-ignore -->
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import * as d3 from 'd3';

interface BarChartProps {
  data: any[];
  dimensions: {
    width: number;
    height: number;
    margin: { top: number; right: number; bottom: number; left: number };
  };
  ticks: number;
  tooltipTitle: string;
}

const props = withDefaults(defineProps<BarChartProps>(), {
  
});

const barChartRef = ref();
const tooltipRef = ref();

const viewBox = computed(() => {
  return `0 0 ${props.dimensions.width} ${props.dimensions.height}`;
});
const ctrWidth = computed(() => {
  return (
    props.dimensions.width -
    props.dimensions.margin.left -
    props.dimensions.margin.right
  );
});
const ctrHeight = computed(() => {
  return (
    props.dimensions.height -
    props.dimensions.margin.top -
    props.dimensions.margin.bottom
  );
});

const xAccessor = (d: any) => d.date;
const yAccessor = (d: any) => d.count;

const xScale = computed(() => {
  return d3
    .scaleBand()
    .domain(props.data.map(xAccessor))
    .range([0, ctrWidth.value])
    .padding(0.6)
    .round(true);
});
const yScale = computed(() => {
  return d3
    .scaleLinear()
    .domain([0, d3.max(props.data, yAccessor)])
    .range([ctrHeight.value, 0])
    .nice();
});

function draw() {
  const svg = d3.select(barChartRef.value).append('svg').attr('viewBox', viewBox.value);

  const ctr = svg
    .append('g')
    .attr(
      'transform',
      `translate(${props.dimensions.margin.right}, ${props.dimensions.margin.left})`
    );

  const xAxisDateGroup = ctr
    .append('g')
    .attr(
      'transform',
      `translate(${props.dimensions.margin.left}, ${
        props.dimensions.height - props.dimensions.margin.bottom
      })`
    );

  const xAxisMonthGroup = ctr
    .append('g')
    .attr(
      'transform',
      `translate(${props.dimensions.margin.left}, ${
        props.dimensions.height - props.dimensions.margin.bottom
      })`
    );

  const yAxisGroup = ctr
    .append('g')
    .attr(
      'transform',
      `translate(${props.dimensions.margin.left}, ${props.dimensions.margin.top})`
    );

  const barGroup = ctr
    .append('g')
    .attr(
      'transform',
      `translate(${props.dimensions.margin.left}, ${props.dimensions.margin.top})`
    );

  const tooltip = d3.select(tooltipRef.value);

  function barChart() {
    // Bar
    barGroup
      .selectAll('rect')
      .data(props.data)
      .join('rect')
      .attr('class', (d) => `bar ${d.status}`)
      // .attr('class', d => {
      //   console.log(d)
      //   return `bar ${d.status}`
      // })
      .attr('width', xScale.value.bandwidth())
      .attr('height', (d) => ctrHeight.value - yScale.value(yAccessor(d)))
      .attr('x', (d) => xScale.value(xAccessor(d)) as number)
      .attr('y', (d) => yScale.value(yAccessor(d)))
      .attr('rx', '12')
      .on('mouseenter', function (event, datum) {
        tooltip.style('display', 'block');

        const { width, height } = tooltip.node().getBoundingClientRect();
        const offset = 8;

        tooltip
          .style('top', `${event.pageY - height - offset}px`)
          .style('left', `${event.pageX - width - offset}px`);

        tooltip.select('.bar-chart-tooltip__date').text(xAccessor(datum));
        tooltip.select('.bar-chart-tooltip__data').text(yAccessor(datum));
      })
      .on('mouseleave', function (event) {
        tooltip.style('display', 'none');
      });

    // xAxis - 일
    xAxisDateGroup
      .call(
        d3
          .axisBottom(xScale.value)
          .tickFormat((d) => new Date(d).getDate().toString() + '일')
      )
      .call((g) => {
        g.selectAll('text')
          .attr('transform', 'translate(0, 8)')
          .attr('font-size', '16')
          .attr('fill', '#666');
        g.selectAll('.tick line').remove();
      });

    // xAxis - 월
    xAxisMonthGroup
      .call(
        d3
          .axisBottom(xScale.value)
          .tickFormat((d) => {
            return (new Date(d).getMonth() + 1).toString() + '월'
          })
      )
      .call((g) => {
        g.selectAll('text')
          .attr('transform', 'translate(0, 32)')
          .attr('font-size', '16')
          .attr('fill', '#ccc');
        g.selectAll('.tick line').remove();
        g.select('.domain').remove()
      });

    // yAxis
    yAxisGroup
      .call(d3.axisRight(yScale.value).ticks(props.ticks).tickSize(ctrWidth.value))
      .call((g) => {
        g.select('.domain').remove();
        g.selectAll('text').attr('font-size', '14px').attr('fill', '#666');
        g.selectAll('.tick line').attr('stroke', '#ebebeb');
        g.selectAll('.tick text').attr('x', '0').attr('dy', '-3');
      });
  }

  barChart();

  watch(
    () => props.data,
    () => barChart()
  );
}

onMounted(() => draw());
</script>

<style lang="scss">
.bar-chart {
  &-container {
    position: relative;
    width: 100%;
    height: 100%;
    & .bar {
      fill: #ccc;
      &.social {
        fill: #bfeaf5;
      }
      &.tenant {
        fill: #205295;
      }
      &.service {
        fill: #82aae3;
      }
      &.revenue {
        fill: #0014ff;
      }
      &.normal {
        fill: #03c988;
      }
      &.high {
        fill: #00337c;
      }
      &.low {
        fill: #ccc;
      }
    }
    & .separation-line {
      stroke-width: 1;
      stroke: #ccc;
    }
  }
  &-tooltip {
    z-index: 999;
    display: none;
    position: absolute;
    padding: var(--gap-sm-2);
    background: #fff;
    font-size: 1.6rem;
    border-radius: 10px 10px 0 10px;
    box-shadow: 0px 6px 16px #00000029;
    &-content {
      border-left: 2px solid var(--color-purple-deep);
      padding-left: var(--gap-sm-1);
    }
    &__date {
      margin-bottom: var(--gap-sm-1);
      font-weight: bold;
    }
    &__title {
      color: #999;
    }
    &__data {
      margin-left: 94px;
      font-weight: bold;
    }
  }
}
</style>
