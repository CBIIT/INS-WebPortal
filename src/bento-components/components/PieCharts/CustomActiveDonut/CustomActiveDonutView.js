import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, ResponsiveContainer,
} from 'recharts';
import injectSheet from 'react-jss';

const DEFAULT_COLORS_EVEN = [
  '#D4D4D4',
  '#057EBD',
  '#0C3151',
  '#F78F49',
  '#79287C',
  '#7CC242',
  '#61479D',
];

const DEFAULT_COLORS_ODD = [
  '#057EBD',
  '#0C3151',
  '#F78F49',
  '#79287C',
  '#7CC242',
  '#61479D',
  '#D4D4D4',
];

const renderActiveShape = (props) => {
  // const RADIAN = Math.PI / 180;
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value, textColor, fontSize, fontWeight, fontFamily,
    // eslint-disable-next-line no-unused-vars
    titleLocation, titleAlignment, titleText, totalCount, showTotalCount,
  } = props;
  // const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + 2) * cos;
  // const sy = cy + (outerRadius + 2) * sin;
  // const mx = cx + (outerRadius + 5) * cos;
  // const my = cy + (outerRadius + 5) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 20;
  // const ey = my;
  // const textAnchor = cos >= 0 ? 'start' : 'end';

  const lableX = (titleAlignment === 'center') ? cx : (titleAlignment === 'left') ? 0 : cx * 2;
  const lableY = (titleLocation === 'top') ? 9 : cy * 2;

  const faceValue = showTotalCount === true ? `${value} / ${totalCount}` : value;

  return (
    <g>
      <text x={lableX} y={lableY} dy={0} textAnchor={(titleAlignment === 'center') ? 'middle' : null} fill={textColor} fontSize={fontSize || '12px'} fontWeight={fontWeight || '500'} fontFamily={fontFamily || 'Nunito'} cursor="text">
        {String(payload.name).length > 30 ? `${String(payload.name).substr(0, 30)}...` : payload.name}
        <title>{payload.name}</title>
      </text>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={textColor} fontSize="12px" fontWeight="bold" fontFamily="Nunito">{`${faceValue}`}</text>
      <text x={cx} y={cy} dy={12} textAnchor="middle" fill={textColor} fontSize="12px" fontWeight="light" fontFamily="Nunito">{`${titleText}`}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 8}
        fill={fill}
      />

    </g>
  );
};

const combineExtraProps = (props, extraProps, cb) => {
  const combinedProps = { ...props, ...extraProps };
  return cb(combinedProps);
};

const styles = {};

const getIndex = (data) => ((data.length !== undefined) ? data.length - 1 : 0);

function resetComponentState(component) {
  const { props } = component;
  const index = (props.data !== undefined) ? getIndex(props.data) : 0;
  component.setState({ activeIndex: index });
}

class CustomActiveDonut extends PureComponent {
  constructor(props) {
    super(props);
    const { data } = props;
    const index = getIndex(data);
    this.state = { activeIndex: index };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      resetComponentState(this);
    }
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const {
      data: DataObj, textColor, colors, paddingSpace,
      titleLocation, titleAlignment, titleText,
      fontSize, fontWeight, fontFamily, showTotalCount,
    } = this.props;

    let totalCount = 0;

    const data = DataObj.map((obj) => {
      totalCount += obj.subjects;
      return ({
        name: obj.group,
        value: obj.subjects,
      });
    });

    const COLORS_EVEN = (colors && colors.even) ? colors.even : DEFAULT_COLORS_EVEN;
    const COLORS_ODD = (colors && colors.odd) ? colors.even : DEFAULT_COLORS_ODD;

    const { activeIndex } = this.state;
    const extraProps = {
      titleLocation,
      titleAlignment,
      titleText,
      fontSize,
      fontWeight,
      fontFamily,
      totalCount,
      showTotalCount,
    };

    return (
      <ResponsiveContainer width={185} height={210}>
        <PieChart textColor={textColor}>
          <Pie
            activeIndex={activeIndex}
            activeShape={(props) => (combineExtraProps(props, extraProps, renderActiveShape))}
            data={data}
            cx={90}
            cy={98}
            textColor={textColor}
            innerRadius={45}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={this.onPieEnter}
            blendStroke
            paddingAngle={paddingSpace}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={data.length % 2 === 0 ? COLORS_EVEN[index % COLORS_EVEN.length] : COLORS_ODD[index % COLORS_ODD.length]} textColor={textColor} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

CustomActiveDonut.defaultProps = {
  titleText: 'Cases',
  paddingSpace: 0,
  showTotalCount: false,
};

const Chart = injectSheet(styles)(CustomActiveDonut);
export default Chart;
