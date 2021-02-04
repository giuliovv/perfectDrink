import React from "react"
import { Link } from "gatsby"

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Layout from "../components/layout"
import SEO from "../components/seo"

// http://swords.id.au/ebac

const useStyles = makeStyles((theme) => ({
  maleFemale: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
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
      <SEO title="Home" />
      <div className={classes.maleFemale}>
        <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
          <Button onClick={() => setSesso(1)}>Male</Button>
          <Button onClick={() => setSesso(0)}>Female</Button>
        </ButtonGroup>
      </div>
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
              step: 0.01,
            }}
          />
          </div>
        </form>
        Puoi bere {alcolLevel(0.33).toFixed(2)}°, 33cl
    </Layout>
  )
}

export default IndexPage
