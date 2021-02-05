import React from "react"

import Fab from '@material-ui/core/Fab';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import BathtubIcon from '@material-ui/icons/Bathtub';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

import Plot from 'react-plotly.js';

import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import Layout from "../components/layout"
import SEO from "../components/seo"

// http://swords.id.au/ebac

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function GetDati(props){
  const classes = useStyles();
  return (
    <div>
        Donna
            <Radio
              checked={props.sesso === 0}
              onChange={() => props.setSesso(0)}
              value={0}
              color="default"
              name="select_gender_female"
              inputProps={{ 'aria-label': 'Female' }}
            />
            Uomo
            <Radio
              checked={props.sesso === 1}
              onChange={() => props.setSesso(1)}
              value={1}
              color="default"
              name="radio-button-select_gender_male"
              inputProps={{ 'aria-label': 'Male' }}
            />
            <form className={classes.root} noValidate autoComplete="off">
              <div>
              <TextField
                  id="standard-number"
                  label="Peso"
                  type="number"
                  value={props.peso}
                  onChange={(event) => props.setPeso(event.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 5,
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                  }}
                />
              </div>
              <div>
                <TextField
                  id="standard-number"
                  label="Tempo"
                  type="number"
                  value={props.tempo}
                  onChange={(event) => props.setTempo(event.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Ore</InputAdornment>,
                  }}
                />
                </div>
                <div>
                <TextField
                  id="standard-number"
                  label="Livello di alcol nel sangue"
                  type="number"
                  value={props.ebac}
                  onChange={props.handleEbac}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 0.05,
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">‰</InputAdornment>,
                  }}
                />
                </div>
              </form>
              Puoi bere {props.alcolLevel(0.33).toFixed(2)}°, 33cl
      </div>
  )
}

function Perfetta(props){
  const classes = useStyles();
  const [gradi, setGradi] = React.useState(12);
  const [primoLancio, setPrimoLancio] = React.useState(true);
  const ebacLevel = (quantoAlcol, tempo) => {
    // Number of standard drinks
    var drinks = gradi * 8 * quantoAlcol /10
    var ebac = (drinks*0.806*1.2/(props.water[props.sesso]*props.peso) - props.beta[props.sesso]*tempo)*10;
    return ebac
  }
  if (primoLancio){
    props.setEbac(0.5)
    setPrimoLancio(false)
  }
  return (
    <div style={{maxWidth: "100%"}}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-number"
            label="Livello"
            type="number"
            value={props.ebac}
            onChange={props.handleEbac}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 0.05,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">‰</InputAdornment>,
            }}
          />
        </div>
        <div>
          <TextField
            id="standard-number"
            label="Gradi drink"
            type="number"
            value={gradi}
            onChange={(event) => setGradi(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">°</InputAdornment>,
            }}
          />
        </div>
      </form>
      <Plot
      data={[
        {
          x: [0,6],
          y: [ebacLevel(0.33, 0), ebacLevel(0.33, 3), ebacLevel(0.33, 6)],
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
  </div>
  )
}

function IndexPage() {
  const [modPerfetta, setmodPerfetta] = React.useState(false);
  const [sesso, setSesso] = React.useState(0); //0 female 1 male
  const [peso, setPeso] = React.useState(60); 
  const [tempo, setTempo] = React.useState(2); 
  const [ebac, setEbac] = React.useState(0); 
  const classes = useStyles();
  var beta = [0.017, 0.015];
  var water = [0.49, 0.58];
  const alcolLevel = (quantoAlcol) => {
    // Number of standard drink, 10g each
    var drinks = (ebac/10 + beta[sesso]*tempo)*water[sesso]*peso/(0.806*1.2);
    // g/L
    var realAmount = drinks*10/quantoAlcol
    //gradi
    var gradi = (realAmount/8)
    return gradi
  }
  const handleEbac = (event) => {
    var val = parseFloat(event.target.value);
    if (val < 0){
      val = 0;
    }
    setEbac(val)
  };
  return(
    <Layout>
      <ThemeProvider theme={theme}>
        <SEO />
        <div style={{display: 'table', position:"absolute", textAlign: "center", height:"100%", width:"95%"}}>
          <div style={{display: 'table-cell', verticalAlign: "middle", textAlign: "center"}}>
            {modPerfetta ? 
            <Perfetta
            ebac={ebac}
            handleEbac={handleEbac}
            setEbac={setEbac}
            water={water}
            beta={beta}
            sesso={sesso}
            tempo={tempo}
            peso={peso}
            /> :
            <GetDati
            ebac={ebac}
            handleEbac={handleEbac}
            alcolLevel={alcolLevel}
            setPeso={setPeso}
            setSesso={setSesso}
            setTempo={setTempo}
            sesso={sesso}
            tempo={tempo}
            peso={peso}/>
            }
          </div>
        </div>
        <Fab variant="extended" color={modPerfetta ? "secondary":"primary"} className={classes.fab} onClick={() => setmodPerfetta(!modPerfetta)}>
          {
            modPerfetta ?
            <AccessibleForwardIcon className={classes.extendedIcon} /> :
            <BathtubIcon className={classes.extendedIcon} />
          }
          {modPerfetta ? "Informazioni": "Perfetta"}
        </Fab>
      </ThemeProvider>
    </Layout>
  )
}

export default IndexPage
