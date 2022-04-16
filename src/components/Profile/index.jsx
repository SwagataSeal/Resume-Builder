import React, { useState } from "react";
import { Box, TextField, Divider, Chip, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, previousPage, setProfile } from "../../actions/index";


const initialFormField = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: "",
};

export default function Profile() {
  const profileData = useSelector((state)=>state.changePageState.profile)
  const [formFields, setFormFields] = useState(initialFormField);
  const dispatch = useDispatch();

  React.useEffect(()=>{
    if(Object.keys(profileData).length !== 0){
      setFormFields(profileData);
    }
  },[profileData])

  const onChange = (id, value) =>{
    if(id === "phoneNumber"){
      if(value.length > 10){
        setFormFields({...formFields, [id]:value.substring(0,10)});
        return
      }
    }
    const x = {...formFields, [id]: value};
    setFormFields(x)
  }

  const onHandleSubmit = (data) =>{
    console.log("data", data);
    if( data.firstName === "" || data.lastName === "" || data.phoneNumber === ""){
      alert("Please fill up the required fields");
      return false;
    }
    if(data.phoneNumber){
      if(data.phoneNumber.length !== 10) {
        alert("Please enter proper 10 digit number");
        return false;
      }
    }
    dispatch(setProfile(data));
    dispatch(nextPage());

  }

  return (
    <>
      <Divider>
        <Chip label="Profile" />
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
        <div>
          <div>
            <TextField
              required
              id="firstName"
              label="First Name"
              value={formFields.firstName}
              onChange={(e)=>onChange(e.target.id,e.target.value)}
            />
            <TextField
              required
              id="lastName"
              label="Last Name"
              value={formFields.lastName}
              onChange={(e)=>onChange(e.target.id,e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              id="phoneNumber"
              label="Phone Number"
              type="number"
              value={formFields.phoneNumber}
              onChange={(e)=>onChange(e.target.id,e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              id="address"
              label="Address"
              multiline
              rows={4}
              value={formFields.address}
              onChange={(e)=>onChange(e.target.id,e.target.value)}
            />
          </div>
        </div>
      </Box>
      <Box textAlign="center">
        <Button variant="contained" onClick={()=>onHandleSubmit(formFields)}>Next</Button>
      </Box>
    </>
  );
}
