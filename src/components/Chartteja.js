import React, { Component } from 'react';
import {
    BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceArea,
    XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList
} from 'recharts';

import _ from 'lodash';
//import { changeNumberOfData } from './utils';

const testidata = [
    { name: "gym", uv: 1505 },
    { name: "jogging", uv: 1205 },
    { name: "blabla", uv: 505 },
    //{ name: 'cosmetic', uv: 3300, pv: 2000, amt: 6500, bmk: 2000, time: 1, uvError: 120, pvError: 50 },

]

const data = [
    { name: 'food', uv: -2000, pv: -2013, amt: -4500, bmk: -4301, time: 1, uvError: [100, 50], pvError: [110, 20] },
    { name: 'cosmetic', uv: 3300, pv: 2000, amt: 6500, bmk: 2000, time: 2, uvError: 120, pvError: 50 },
    { name: 'storage', uv: 3200, pv: 1398, amt: 5000, bmk: 3000, time: 3, uvError: [120, 80], pvError: [200, 100] },
    { name: 'digital', uv: 2800, pv: 2800, amt: 4000, bmk: 1500, time: 4, uvError: 100, pvError: 30 },
];





const initialState = {
    testidata
};

export default class Demo extends Component {

    static displayName = 'BarChartDemo';

    state = initialState;

    handleChangeData = () => {
        // this.setState(() => _.mapValues(initialState, changeNumberOfData));
    };

    handlePvBarClick = (data, index, e) => {
        console.log(`Pv Bar (${index}) Click: `, data);
    };

    handleBarAnimationStart = () => {
        console.log('Animation start');
    };

    handleBarAnimationEnd = () => {
        console.log('Animation end');
    };

    handleMoreData = () => {
        const { data } = this.state;
        const count = data.length;
        console.log(count);

        this.setState({
            data: [...data, ..._.range(1 + Math.ceil(data.length * Math.random())).map((entry, index) => {
                console.log(index);
                return {
                    name: `random${Math.random()}`.slice(0, 10),
                    uv: 3000 * Math.random(),
                    pv: 3000 * Math.random(),
                    amt: 5000 * Math.random(),
                    time: count + index,
                    uvError: 100 * Math.random(),
                    pvError: 50 * Math.random()
                };
            })],
        });
    };

    handleLessData = () => {
        const { data } = this.state;

        this.setState({
            data: data.slice(0, Math.ceil(data.length * Math.random())),
        });
    };

    render() {


        return (
            <div className="bar-charts">



                <div className="area-chart-wrapper">
                    <BarChart
                        width={1000}
                        height={400}
                        data={testidata}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        layout="horizontal"
                    >
                        <YAxis type="number" label="Minutes" />
                        <XAxis dataKey="name" type="category" />
                        <Tooltip />
                        <ReferenceArea x1="food" x2="cosmetic" />
                        <Bar dataKey="uv" fill="#ff7300" label />
                        {/* <Bar dataKey="pv" fill="#387908">
                            <LabelList position="top" invertNegativesOn="vertical" />
                        </Bar> */}
                        {/* <Bar dataKey="amt" fill="#683a98">
                            <LabelList position="bottom" />
                        </Bar>
                        <Bar dataKey="bmk" fill="#183a91">
                            <LabelList position="insideTop" fill="#ffffff" invertNegativesOn="vertical" />
                        </Bar> */}
                    </BarChart>
                </div>

            </div>
        );
    }
}