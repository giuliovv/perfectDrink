import React from "react"

import Plot from 'react-plotly.js';

function Grafico(props){
    return(
        <Plot
        data={[
            {
            x: [0,6],
            y: [props.ebacLevel(0.33, 0), props.ebacLevel(0.33, 3), props.ebacLevel(0.33, 6)],
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'red'},
            },
        ]}
        layout={{
            showlegend: false,
            margin: {
            l: 40,
            r: 30,
            t: 20,
            b: 80,
            pad: 0
        },
      }}
      style={{
        width:"100%"
      }}
      config={{staticPlot:true}}
    />
    )
}

export default Grafico