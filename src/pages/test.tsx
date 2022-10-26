import React from 'react'
import { getAllTraineess } from "../redux/actions/trainnee";
import { connect } from "react-redux";

const  test= (props : any) => {
  const {trainnes} = props;
  return (
    <div> Hello</div>
  )
}
const mapState=({trainee}: any)=>{
  trainnes: trainee
 }
 
 export default connect(mapState,{
  getAllTraineess
 })(test)