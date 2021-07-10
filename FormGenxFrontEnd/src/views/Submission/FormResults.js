/*eslint-disable*/
import React , {useState, useEffect } from "react";
import { connect } from "react-redux";
import Card from "../../components/Card/Card.js";
import axios from "axios";
import {backEndBaseUrl} from "../../constants/Urls";
import LoadingIcon  from "../../components/LoadingIcon/LoadingIcon"
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table/Table.js";
import {unwantedVariables} from "../../constants/unwantedLabels"


import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { keys } from "@material-ui/core/styles/createBreakpoints";
// @material-ui/core




const useStyles = makeStyles(styles);

const Results = ({form,userToken}) =>{

  const [state, setState] = useState({
    submissionData : [],
    loading : false,
    data: [],
    tableHead : [],
    tableData : [],
    tableOptions : []

  })
  const classes = useStyles();
  useEffect(() => {

    setState({...state, loading:true})

    const requestHeader = {
      headers: {
        Authorization: "Token " + userToken
      },
    };

    axios.get(backEndBaseUrl + `/creator/submissions/${form.id}`, requestHeader)  
    .then((response) => {
  
      const submissionDataArray=[]
      const tempFormOptions = []
      const tempFormOptionKeys= []
      const tempFormOptionsValues=[]
      const tempFormHead=[]
      const tempUsefulFormKeys= []
      const tempUsefulFormOptionsValues=[]

      console.log(  JSON.parse(form.form_structure))
    
      JSON.parse(form.form_structure).map ((element,key) => {
      

        if (unwantedVariables.includes(element.element)){
            null
          } 
        else{
          if(element.options){         
            let keys = element.options.map(a => a.key);
            let values = element.options.map(a => a.text);
            tempFormOptionKeys.push(keys)
            tempFormOptionsValues.push(values)
            tempFormOptions.push(element.options)
            tempUsefulFormKeys.push(keys)
            tempUsefulFormOptionsValues.push(values)

          }else{
            tempFormOptions.push("No Options")
            tempFormOptionKeys.push("No Options")
            tempFormOptionsValues.push("No Options")
          }
          tempFormHead.push(element.label)
        
         
        }
      })

      




      response.data.map((element,index) => {
     
        submissionDataArray.push(
       
          JSON.parse(element.submission).map((row,key)=> {
    

          if (Array.isArray(row.value)){
            if(row.value[0]){

 

              
              let index =  tempUsefulFormKeys[key].indexOf(row.value[0])
            

              let result =  tempUsefulFormOptionsValues[key][index]
              
        
             
        
              return result
            }
          }
          else{
            return row.value
          }

            }
            ))   

      })


      submissionDataArray.map((row,key) => {
        row.unshift(key)
      })

    


   

      tempFormHead.unshift("id")
      setState({...state, data: submissionDataArray, tableHead : tempFormHead , tableOptions: tempFormOptions})  
      })  .catch((error) => {
        console.log(error)

        })

  }, [form]);


  return(
  <>

  <Card >
  <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>{form.title} Results</h4>
              <p className={classes.cardCategoryWhite}>
       
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="success"
                tableHead= {state.tableHead}
                tableData={ state.data }
              />
            </CardBody>
          </Card>
  </Card>
  </>
)
}
export default connect()(Results);
