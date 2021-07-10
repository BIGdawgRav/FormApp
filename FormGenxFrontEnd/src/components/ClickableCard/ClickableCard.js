import React from 'react';

import GridItem from "../../components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import Update from "@material-ui/icons/Update";

// core components
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardFooter from "../../components/Card/CardFooter.js";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

import './style.css'

const useStyles = makeStyles(styles);

export default function ClickableCard({element}) {
 const classes = useStyles();





  return (
    <GridItem xs={12} sm={6} md={3}>

        <div className="clickcard">
       
          <div className="clickcard-body">
    
      <CardHeader color="info" stats icon>

        <CardIcon color={element.is_deployed?"success": "danger"}>
          <AssignmentIndIcon />
        </CardIcon>
        <p className={classes.cardCategory}>Form Title: </p>
        <h3 className={classes.cardTitle}>  {element.title} </h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <Update />
          {element.is_deployed ? "Deployed" : "Not Deployed Yet"}
     
         
        </div>
      </CardFooter>
 
          </div>
        </div>

     </GridItem>
    
  );
}
