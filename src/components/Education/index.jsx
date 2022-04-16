import React, { useState } from "react";
import { Box, TextField, Divider, Chip, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, previousPage, setPage, setEducation } from "../../actions/index";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const initialFormField = {
  nameOfCourse: "",
  courseCompletionYear: "",
  collegeName: "",
  percentage: "",
};

export default function Education() {
  const [formFields, setFormFields] = useState(initialFormField);
  const [educationArray, setEducationArray] = useState([]);
  const dispatch = useDispatch();
  const educationData = useSelector((state)=>state.changePageState.education);
  console.log("educationData", educationData);  
  const onChange = (id, value) => {
    const x = { ...formFields, [id]: value };
    setFormFields(x);
  };

  const onHandleSubmit = (data) => {
    if(educationArray.length===0){
      alert("Please enter the details and then press next");
      return
    }
    dispatch(setEducation(educationArray));
    dispatch(nextPage());
  };

  const onHandleAdd = (data) => {
    if (
      data.nameOfCourse === "" ||
      data.courseCompletionYear === "" ||
      data.collegeName === "" ||
      data.percentage === ""
    ) {
      alert("Please fill up the required fields");
      return false;
    }
    setEducationArray([...educationArray, formFields]);
    setFormFields(initialFormField);
  };

  React.useEffect(()=>{
    if(educationData.length > 0){
      setEducationArray(educationData);
    }
  },[educationData])

  return (
    <>
      <Divider>
        <Chip label="Education" />
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
        {educationArray.length > 0
          ? educationArray.map((data) => {
              return (
                <Box>
                  {" "}
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      College : {data.collegeName}
                    </Typography>
                    <Typography variant="h5" component="div">
                      Course : {data.nameOfCourse}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Passing Year :{data.courseCompletionYear}
                    </Typography>
                    <Typography variant="body2">
                      Percentage : {data.percentage}%
                    </Typography>
                  </CardContent>
                  <Divider />
                </Box>
              );
            })
          : null}
        <div>
          <div>
            <TextField
              required
              id="nameOfCourse"
              label="Name of course"
              value={formFields.nameOfCourse}
              onChange={(e) => onChange(e.target.id, e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              id="courseCompletionYear"
              label="Course completion year"
              type="number"
              value={formFields.courseCompletionYear}
              onChange={(e) => onChange(e.target.id, e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              required
              id="collegeName"
              label="College /School Name"
              value={formFields.collegeName}
              onChange={(e) => onChange(e.target.id, e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              id="percentage"
              label="Percentage"
              type="number"
              value={formFields.percentage}
              onChange={(e) => onChange(e.target.id, e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Button variant="contained" color="success" onClick={() => onHandleAdd(formFields)}>
            Add
          </Button>
        </div>
      </Box>
      <Box textAlign="center">
        <Button variant="contained" onClick={() => onHandleSubmit(formFields)}>
          Next
        </Button>
      </Box>
    </>
  );
}
