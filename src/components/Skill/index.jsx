import React, { useState } from "react";
import { Box, TextField, Divider, Chip, Button, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, previousPage, setSkill } from "../../actions/index";

export default function Skill() {
  const [skillList, setSkillList] = useState([]);
  const [skill, setSkilll] = useState("");
  const skillData = useSelector((state)=>state.changePageState.skill)
  const dispatch = useDispatch();

  const handleDelete = (data) =>{
    console.log("e", data)
    const arr = skillList.filter(e => e !== data); 
    setSkillList(arr);
  }


  const onChange = (e)=>{
    setSkilll(e.target.value)
  }

  const submit = () =>{
    if(skill.length === 0){
      alert("Skill field cannot be empty");
    } else {
      if(skillList.find(e => e === skill)){
        alert("Duplicate data cannot be added");
        return
      }
      setSkillList([...skillList, skill]);
      setSkilll([]);
    }
  }

  const clickNext = () =>{
    if(skillList.length === 0){
      alert("Please add some skill and then press next");
      return;
    }
    dispatch(setSkill(skillList));
    dispatch(nextPage());
  }

  React.useEffect(()=>{
    if(skillData.length > 0){
      setSkillList(skillData);
    }
  },[skillData])

  return (
    <>
      <Divider>
        <Chip label="Skill" />
      </Divider>
      <Box
        pt={2}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      > 
        {/* <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />&nbsp; */}
        {skillList.length >0 ? skillList.map((data)=>{
          return(<>
          <Chip label={data} variant="outlined" onDelete={()=>handleDelete(data)} />
          &nbsp;
          </>)
        }): null }
      </Box>
      <Box
        pt={2}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        
        <TextField
          id="skill"
          label="skill"
          value={skill}
          onChange={onChange}
          InputProps={{ endAdornment: <Button variant="outlined" onClick={submit} size="small">
          add
        </Button>}}
        />
      </Box>
      <Box  textAlign="center">
        <Button onClick={clickNext} variant="contained">Next</Button>
      </Box>
    </>
  );
}
