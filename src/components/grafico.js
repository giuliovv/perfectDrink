import React from "react"

import Plot from 'react-plotly.js';

function Grafico(props){
    var maxtempo = props.timeForEbac(0)
    return(
        <Plot
        data={[
            {
            x: [0, props.traQuanteOre, props.traQuanteOre, maxtempo],
            y: [props.ebacLevel(0), props.ebacLevel(props.traQuanteOre), props.ebac*1.3, props.ebacLevel(maxtempo) + props.ebac*0.6],
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