import React from "react"

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';

import Layout from "../components/layout"
import SEO from "../components/seo"

// http://swords.id.au/ebac

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
}));

function IndexPage() {
  const [sesso, setSesso] = React.useState(0); //0 female 1 male
  const [peso, setPeso] = React.useState(60); 
  const [tempo, setTempo] = React.useState(2); 
  const [ebac, setEbac] = React.useState(0); 
  const classes = useStyles();
  var beta = [0.017, 0.015];
  var water = [0.49, 0.58];
  const alcolLevel = (quantoAlcol) => {
    // Number of standard drink, 10g each
    var drinks = (ebac + beta[sesso]*tempo)*water[sesso]*peso/(0.806*1.2);
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
      <SEO />
      <div style={{display: 'table', position:"absolute", textAlign: "center", height:"100%", width:"95%"}}>
        <div style={{display: 'table-cell', verticalAlign: "middle", textAlign: "center"}}>
          Female
          <Radio
            checked={sesso === 0}
            onChange={() => setSesso(0)}
            value={0}
            color="default"
            name="select_gender_female"
            inputProps={{ 'aria-label': 'Female' }}
          />
          Male
          <Radio
            checked={sesso === 1}
            onChange={() => setSesso(1)}
            value={1}
            color="default"
            name="radio-button-select_gender_male"
            inputProps={{ 'aria-label': 'Male' }}
          />
          <form className={classes.root} noValidate autoComplete="off">
            <div>
            <TextField
                id="standard-number"
                label="Weight"
                type="number"
                value={peso}
                onChange={(event) => setPeso(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 5,
                }}
              />
            </div>
            <div>
              <TextField
                id="standard-number"
                label="Time"
                type="number"
                value={tempo}
                onChange={(event) => setTempo(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </div>
              <div>
              <TextField
                id="standard-number"
                label="Blood alcohol level"
                type="number"
                value={ebac}
                onChange={handleEbac}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 0.05,
                }}
              />
              </div>
            </form>
            Puoi bere {alcolLevel(0.33).toFixed(2)}°, 33cl
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
