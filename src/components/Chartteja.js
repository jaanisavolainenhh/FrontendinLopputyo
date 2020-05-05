import React, { Component } from 'react';
import {
    BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceArea,
    XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList, Label
} from 'recharts';

//import _ from 'lodash';
//import { changeNumberOfData } from './utils';


export default function Chartteja() {

    const [data, setData] = React.useState([
        { name: "gym", uv: 150 },
        { name: "jogging", uv: 120 },
        { name: "blabla", uv: 50 },

    ]);


    return (
        <div className="bar-charts">
            <div>
                <BarChart
                    width={1000}
                    height={400}
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    layout="horizontal"
                >

                    <YAxis>
                        <Label angle={-90} value='Duration' position='insideLeft' style={{ textAnchor: 'middle' }} />
                    </YAxis>

                    <XAxis dataKey="name" type="category" />
                    {/* <Tooltip /> */}
                    <Bar dataKey="uv" fill="#ff7300" label />
                    {/* <Bar dataKey="pv" fill="#387908">
                            <LabelList position="top" invertNegativesOn="vertical" label="loller" />
                        </Bar> 
                         <Bar dataKey="amt" fill="#683a98">
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