"use client";

import {
  FormikErrors,
  FormikTextField,
  createHandleSubmit,
} from "@/app/activities/[activityId]/edit/components/formikFields";
import { sendInvite } from "@/app/api.mjs";
import { Form, Formik } from "formik";
import { useSnackbar } from 'notistack';
import { Dialog, Box, Container, IconButton, styled, Button, Typography, InputAdornment } from '@mui/material';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Image from "next/image";
import { useState } from "react";
import { useMutation } from "react-query";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import LinkIcon from '@mui/icons-material/Link';
import * as Yup from "yup";

const CustomTab = styled(Tab)(({ theme }) => ({
    textTransform: "none",
    bottom: "none",
    "&.Mui-selected": {
      color: "black",
    },
    fontWeight: "bold",
    fontSize: 16,
  }));

  const CustomDialog = styled(Dialog)({
    '& .MuiPaper-root': {
      border: 'none',
    },
  });

  export default function ShareInvitePopup ({ open, onClose, childId }) {
    const [value, setValue] = useState("invite");
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const mutation = useMutation((data) => sendInvite(childId, data));
    
    async function handleSubmit(values, formikHelpers) {
        const handle = createHandleSubmit({
          mutation,
          onSuccess: () => {
            enqueueSnackbar("Invite created", { variant: "success" });
          },
        });
        handle(values, formikHelpers);
    }
    
    return (
        <Dialog open={open} onClose={onClose}>
          <Container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
            <Box sx={{ border: 'none', width: { xs: '100%', sm: 545 }, maxWidth: 545, p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Image src="/logo.png" alt="Logo" width={160} height={36} />
                <IconButton size="small" onClick={onClose}>
                  <HighlightOffRoundedIcon sx={{ color: 'common.black', fontSize: 28 }} />
                </IconButton>
              </Box>
              <TabContext value={value}>
                <Box sx={{ width: '100%', borderBottom: '2px solid lightgray' }}>
                  <TabList  variant="fullWidth"
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="full width tabs" onChange={handleChange}>
                    <CustomTab label="Invite" value="invite" />
                    <CustomTab label="Sharing" value="sharing" disabled={true}/>
                    <CustomTab label="Privacy" value="privacy" disabled={true}/>
                  </TabList>
                </Box>
                <Box sx={{ p: 0, pt: 2}}>
                  <TabPanel sx={{ p: 0 }} value="invite">
                    <Typography sx={{ py: 2 }} >Sharing with friends</Typography>
                    <Formik
                      onSubmit={handleSubmit}
                      initialValues={{ toEmail: "" }}
                      validationSchema={Yup.object({
                        toEmail: Yup.string().label("Email address").email("Invalid email address").required(),
                      })}
                    >
                      <Form>
                        <Box sx={{ mt: 2 }}>
                          <FormikTextField
                            name="toEmail"
                            variant="outlined"
                            fullWidth
                            label="Add email to share with more friends"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment sx={{color: '#23A6C9'}} position="start">
                                  <LinkIcon />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Button variant="contained" sx={{backgroundColor: '#23A161'}} type="submit">
                                    Send invite
                                  </Button>
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{
                              sx: {
                                color: '#23A6C9',
                                '&.Mui-focused': {
                                  color: '#23A6C9',
                                },
                              },
                            }}
                          />
                          <FormikErrors sx={{ mt: 1.5 }} />
                        </Box>
                      </Form>
                    </Formik> 
                  </TabPanel>
                  <TabPanel sx={{ p: 0 }} value="sharing">
                  </TabPanel>
                  <TabPanel sx={{ p: 0 }} value="privacy">
                  </TabPanel>
                </Box>
              </TabContext>
            </Box>
          </Container>
        </Dialog>
    );
};
