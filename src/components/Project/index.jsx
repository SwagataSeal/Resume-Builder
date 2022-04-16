import React, { useState } from 'react';
import { Box, TextField, Divider, Chip, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { nextPage, previousPage, setProject } from '../../actions/index';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const initialFormField = {
  projectName: '',
  techUsed: '',
  projectDesc: '',
};
export default function Project() {
  const [formFields, setFormFields] = useState(initialFormField);
  const [projectArray, setProjectArray] = useState([]);
  const dispatch = useDispatch();
  const projectData = useSelector((state)=>state.changePageState.project)


  const onChange = (id, value) => {
    const x = { ...formFields, [id]: value };
    setFormFields(x);
  };

  const onHandleSubmit = (data) => {
    if(projectArray.length === 0){
      alert("Please add some project and then press next");
      return;
    }
    dispatch(setProject(projectArray));
    dispatch(nextPage());
  };

  const onHandleAdd = (data) => {
    if (data.projectName === '' || data.techUsed === '' || data.projectDesc === '') {
      alert('Please fill up the required fields');
      return false;
    }
    setProjectArray([...projectArray, formFields]);
    setFormFields(initialFormField);
  };

  React.useEffect(()=>{
    if(projectData.length > 0){
      setProjectArray(projectData);
    }
  },[projectData])

  return (
    <>
      <Divider>
        <Chip label="Project" />
      </Divider>
      <Box
        pt={2}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        {projectArray.length > 0
          ? projectArray.map((data) => {
              return (
                <Box>
                  {' '}
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Project Name: {data.projectName}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} component="div">
                      Tech Stack used : {data.techUsed}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Project Description :{data.projectDesc}
                    </Typography>
                  </CardContent>
                  <Divider />
                </Box>
              );
            })
          : null}
        <div>
          <div>
            <TextField required id="projectName" label="Project Name" value={formFields.projectName} onChange={(e) => onChange(e.target.id, e.target.value)} />
          </div>

          <div>
            <TextField required multiline rows={2} id="techUsed" label="Tech-Stack Used" value={formFields.techUsed} onChange={(e) => onChange(e.target.id, e.target.value)} />
          </div>

          <div>
            <TextField required multiline minRows={5} id="projectDesc" label="Project Description" value={formFields.projectDesc} onChange={(e) => onChange(e.target.id, e.target.value)} />
          </div>
        </div>
        <Button variant="contained" color="success" onClick={() => onHandleAdd(formFields)}>
          Add
        </Button>
      </Box>
      <Box textAlign="center">
        <Button variant="contained" onClick={() => onHandleSubmit(formFields)}>
          Next
        </Button>
      </Box>
    </>
  );
}