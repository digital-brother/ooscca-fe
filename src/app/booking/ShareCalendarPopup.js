"use client";

import {
  FormikErrors,
  FormikTextField,
  createHandleSubmit,
} from "@/app/activities/[activityId]/edit/components/formikFields";
import { shareCalendar } from "@/app/api.mjs";
import { Form, Formik } from "formik";
import { useSnackbar } from 'notistack';
import { Dialog, Box, styled, Button, Typography, InputAdornment } from '@mui/material';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { useMutation } from "react-query";
import LinkIcon from '@mui/icons-material/Link';
import { OssContainer } from "@/components/OosContainer";
import * as Yup from "yup";

const CustomTab = styled(Tab)(({ theme }) => ({
    textTransform: "none",
    "&.Mui-selected": {
      color: "black",
    },
    fontWeight: "bold",
    fontSize: 16,
  }));

  export default function ShareCalendarPopup ({ open, onClose, childId }) {
    const [selectedTab, setSelectedTab] = useState("invite");
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event, newValue) => {
      setSelectedTab(newValue);
    };

    const mutation = useMutation((data) => shareCalendar(childId, data));
    
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
          <OssContainer sx={{pb: 6, border: "none"}} handleClick={onClose}>
              <TabContext value={selectedTab}>
                <Box sx={{ borderBottom: "2px solid", borderColor: "grey.300", pt: 2 }}>
                  <TabList  variant="fullWidth"
                            textColor="primary"
                            indicatorColor="none"
                            aria-label="full width tabs" onChange={handleChange}>
                    <CustomTab label="Invite" value="invite" />
                    <CustomTab label="Sharing" value="sharing" disabled={true}/>
                    <CustomTab label="Privacy" value="privacy" disabled={true}/>
                  </TabList>
                </Box>
                <Box sx={{ pt: 2}}>
                  <TabPanel sx={{ p: 0 }} value="invite">
                    <Typography sx={{ py: 2 }} >Sharing with friends</Typography>
                    <Formik
                      onSubmit={handleSubmit}
                      initialValues={{ toEmail: "" }}
                      validationSchema={Yup.object({
                        toEmail: Yup.string().label("Email address").email().required(),
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
                                <InputAdornment sx={{color: "info.light"}} position="start">
                                  <LinkIcon />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Button variant="contained" sx={{backgroundColor: "success.light" }} type="submit">
                                    Send invite
                                  </Button>
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{
                              sx: {
                                color: "info.light",
                                '&.Mui-focused': {
                                  color: "info.light",
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
          </OssContainer>
        </Dialog>
    );
};
