import * as React from "react";
import { Box, TextField, Divider, Chip, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Link from "@mui/material/Link";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, setSocial, setShowPreview } from "../../actions/index";


export default function Social() {
  const [social, setSociall] = React.useState("linkedin");
  const [socialUrl, setSocialUrl] = React.useState("");
  const [socialList, setSocialList] = React.useState([]);
  const dispatch = useDispatch();
  const socialData = useSelector((state)=>state.changePageState.social)
  const reduxData = useSelector((state)=>state.changePageState)

  const isUrlValid = (userInput) => {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) return false;
    else return true;
  };

  const onChange = (e) => {
    setSociall(e.target.value);
  };
  const onChangeUrl = (e) => {
    setSocialUrl(e.target.value);
  };
  const onAdd = () => {
    if (socialUrl.length === 0) {
      alert("URL cannt be empty");
      return;
    }
    if(!isUrlValid(socialUrl)){
      alert("URL is not valid, try again");
      return;
    }
    if(!socialUrl.includes(social)){
      alert(`Please enter valid url for ${social}`);
      return;
    }
    setSocialList([...socialList, { social: social, url: socialUrl }]);
  };

  const onFinalSubmit = () =>{
    if(socialList.length === 0){
      alert("Please add some social link and then press submit");
      return;
    }
    dispatch(setSocial(socialList));
    dispatch(setShowPreview(true));
    console.log("reduxData", reduxData);
    dispatch(nextPage());
    
  }

  React.useEffect(()=>{
    if(socialData.length > 0){
      setSocialList(socialData);
    }
  },[socialData])

  return (
    <>
      <Divider>
        <Chip label="Social" />
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
        {socialList.length > 0
          ? socialList.map((data) => {
              return (
                <>
                  <Box m={3}>
                    {data.social} <Link href={`${data.url}`}>{data.url}</Link>
                  </Box>
                  <Divider />
                  <Box m={3}></Box>
                </>
              );
            })
          : null}

        <FormControl>
          <InputLabel htmlFor="uncontrolled-native">Social</InputLabel>
          <NativeSelect
            defaultValue={social}
            // inputProps={{
            //   name: "age",
            //   id: "uncontrolled-native",
            // }}
            onChange={onChange}
          >
            <option value={"linkedin"}>linkedin</option>
            <option value={"github"}>github</option>
          </NativeSelect>
        </FormControl>

        <TextField
          id="socialUrl"
          value={socialUrl}
          onChange={onChangeUrl}
          label="URL"
        />
        <Box>
          <Button
            variant="contained"
            onClick={onAdd}
            size="large"
            color="success"
          >
            Add
          </Button>
        </Box>
      </Box>

      <Box textAlign="center">
        <Button onClick={onFinalSubmit} variant="contained">Submit</Button>
      </Box>
    </>
  );
}
