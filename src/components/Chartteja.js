import React, { Component } from 'react';
import {
    BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceArea,
    XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList, Label
} from 'recharts';


export default function Chartteja() {

    const [trainings, setTrainings] = React.useState([]);

    const [data, setData] = React.useState([
        { name: "gym", uv: 150 },
        { name: "jogging", uv: 120 },
        { name: "blabla", uv: 50 },

    ]);

    
    React.useEffect(() => {
        getTrainings();

    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(
                data => {
                    
                    let trainit =  new Array();
                    let setti = new Set();
                    let tempcount = {};
             

                    data.map((daa, index) => {
                        setti.add(daa.activity);
                    })

                    setti.forEach((a) => {
                        tempcount[a] = 0
                    })

          
                    data.map((daa, index) => {
                        tempcount[daa.activity] = tempcount[daa.activity] + daa.duration
                    })

                    
                    Object.keys(tempcount).forEach((looper) => {
                        trainit.push({name: looper, uv: tempcount[looper]})
                    })

                    setData(trainit)
                })
            .catch(err => console.error(err))
    }

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
                        <Label angle={-90} value='Duration (min)' position='insideLeft' style={{ textAnchor: 'middle' }} />
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