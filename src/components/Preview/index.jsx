import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, TextField, Divider, Chip, Button, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { nextPage, previousPage, setPreview } from '../../actions/index';
import Link from '@mui/material/Link';

import './styling.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CloseIcon /> */}x
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Preview() {
  const [skillList, setSkillList] = useState([]);
  const [skill, setSkilll] = useState('');
  const skillData = useSelector((state) => state.changePageState.skill);
  const reduxData = useSelector((state) => state.changePageState);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onClickDownload = () => {};

  return (
    <>
      <Box mt={3} textAlign="center">
        <Button onClick={handleClickOpen} variant="outlined" size="large">
          Preview
        </Button>
      </Box>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          RESUME
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div>
            <div className="container">
              <div className="header">
                <div className="full-name">
                  <span className="first-name">{reduxData.profile.firstName}</span>
                  <span className="last-name">{reduxData.profile.lastName}</span>
                </div>
                <div className="contact-info">
                  <span className="email">Address: </span>
                  <span className="email-val">{reduxData.profile.address}</span>
                  <span className="separator" />
                  <span className="phone">Phone: </span>
                  <span className="phone-val">{reduxData.profile.phoneNumber}</span>
                </div>
              </div>
              <div className="details">
                <div className="section">
                  <div className="section__title">Education</div>
                  <div className="section__list">
                    <div className="section__list-item">
                      {reduxData.education.length > 0
                        ? reduxData.education.map((data) => {
                            return (
                              <Box mt={2}>
                                <div>
                                  <div className="name">{data.collegeName}</div>
                                  <div className="addr">{data.nameOfCourse}</div>
                                  <div className="duration">Passing Year: {data.courseCompletionYear}</div>
                                  <div className="duration">Percentage: {data.percentage}</div>
                                </div>
                              </Box>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
                <div className="section">
                  <div className="section__title">Projects</div>
                  {reduxData.project.length > 0
                    ? reduxData.project.map((data) => {
                        return (
                          <Box mt={2}>
                            <div>
                              <div className="section__list">
                                <div className="section__list-item">
                                  <div className="name">{data.projectName}</div>
                                  <div className="text">{data.projectDesc}</div>
                                  <div className="duration">{data.techUsed}</div>
                                </div>
                              </div>
                            </div>
                          </Box>
                        );
                      })
                    : null}
                </div>
                <div className="section">
                  <div className="section__title">Skills</div>
                  <div className="skills">
                    {reduxData.skill.length > 0
                      ? reduxData.skill.map((data) => {
                          return (
                            <Box mt={2}>
                              <div className="skills__item">
                                <div className="left">
                                  <div className="name">{data}</div>
                                </div>
                              </div>
                            </Box>
                          );
                        })
                      : null}
                  </div>
                </div>
                <div className="section">
                  <div className="section__title">Links</div>
                  <div className="section__list">
                    {reduxData.social.length > 0
                      ? reduxData.social.map((data) => {
                          return (
                            <Box mt={2}>
                              <div className="skills__item">
                                <div className="left">
                                  <Link href={`${data.url}`}>{data.url}</Link>
                                </div>
                              </div>
                            </Box>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClickDownload}>
            Download
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
