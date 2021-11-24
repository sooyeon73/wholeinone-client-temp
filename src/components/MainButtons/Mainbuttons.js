import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import { IconContext } from 'react-icons';
import './style.css';
import * as S from "./style";

import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from '@material-ui/styles';
import { TimePicker } from '@material-ui/pickers'
import { KeyboardTimePicker } from '@material-ui/pickers'
import { KeyboardDateTimePicker } from '@material-ui/pickers'

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { grey } from '@mui/material/colors';
import { TextField } from '@mui/material';

import { withStyles } from '@mui/styles';

import MobileTimePicker from '@mui/lab/MobileTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import MomentUtils from "@date-io/moment";
import { Global } from '@emotion/react';
import DatePicker from "react-horizontal-datepicker";
import defaultDayjs, { QUnitType } from "dayjs";
import { width } from '@mui/system';

const CURRENT_THEME = {
    background: "#1B262C",
    el1: "#ffffff",
    el2: "#263137",
    el3: "#ffffff",
    text: "#22A8A5",
    textInv: "#22A8A5",
    main: "#22A8A5",
    secondary: "#4DBBEB",
    danger: "#22A8A5",
    warning: "",
    font1: `"Roboto Slab", "Times New Roman", serif`,
    font2: `"Roboto light"`,
  };
  
  const styles = {
    paper: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      backgroundColor: CURRENT_THEME.el3,
      borderColor: CURRENT_THEME.danger
    },
    inputIcons: {
      padding: 2,
      color: CURRENT_THEME.textInv
    },
    input: {
      flex: 1,
      marginLeft: 8,
      color: CURRENT_THEME.textInv
    }
  };
  
  const useStyles_timepicker = makeStyles(styles);
  const StyledDateTime = withStyles({
    "& .MuiPickersToolbar-toolbar": {
      backgroundColor: CURRENT_THEME.textInv
    },
    root: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: CURRENT_THEME.textInv,
          "& .MuiPickersToolbar-toolbar": {
            backgroundColor: CURRENT_THEME.textInv
          }
        }
      }
    }
  })(MobileTimePicker);
  
  const CssTextField = withStyles({
    root: {
      //all
      "& .MuiIconButton-root": {
        color: CURRENT_THEME.textInv
      },
      // filled
      "& .MuiFilledInput-underline": {
        "&:before": {
          borderBottomColor: "transparent"
        },
        "&:after": {
          borderBottomColor: "transparent"
        }
      },
      "& .MuiFilledInput-input": {
        color: CURRENT_THEME.textInv
      },
      "& .MuiFilledInput-root": {
        borderRadius: "10px 10px 10px 10px",
        backgroundColor: CURRENT_THEME.el3,
        "&.Mui-focused": {
          //borderColor: "#1ab5e1",
          //backgroundColor: CURRENT_THEME.el2,
        }
      },
  
      "& .MuiInputLabel-formControl": {
        color: CURRENT_THEME.textInv,
        height: "auto"
      }
    }
  })(TextField);
  
  const materialTheme = createTheme({
    palette: {
      primary: {
        main: CURRENT_THEME.main
      }
    },
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: CURRENT_THEME.el3
        }
      },
      MuiPickersCalendarHeader: {
        iconButton: {
          backgroundColor: "transparent",
          color: CURRENT_THEME.main
        },
        dayLabel: {
          color: CURRENT_THEME.textInv,
        },
        transitionContainer: {
          color: CURRENT_THEME.textInv
        }
      },
      MuiPickersBasePicker: {
        pickerView: {
          backgroundColor: CURRENT_THEME.background
        }
      },
      MuiPickersDay: {
        day: {
          color: CURRENT_THEME.textInv
        }
      },
  
      MuiDialogActions: {
        root: {
          backgroundColor: CURRENT_THEME.background
        }
      },
      MuiPickersClock: {
        clock: {
          backgroundColor: CURRENT_THEME.el2
        }
      },
      MuiPickersClockNumber: {
        clockNumber: {
          color: CURRENT_THEME.textInv
        }
      }
    }
  });



const drawerBleeding = 0;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 120,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'relative',
  textAlign: 'center',
  top: 8,
  left: '50%',
  transform: 'translateX(-50%)'

}));

const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            backgroundColor: "transparent",
            color: "#22A8A5"
        }
    }
}));



const CustomSlider = withStyles({
    root: {
        color: "#22A8A5",
        height: 3,
    },
    track: {
        height: 6,
        borderRadius: 6,
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        marginTop: 0,
        marginLeft: 0,
        boxShadow: "#ebebeb 2px 2px 2px",
        "&:focus, &:hover, &$active": {
            boxShadow: "#ccc 0 2px 3px 1px",
        },
        color: "#fff",
    },
})(Slider);

const marks = [
    {
      value: 0,
      label: '현위치',
    },
    {
      value: 1,
      label: '1km',
    },
    {
      value: 2,
      label: '2km',
    },
    {
      value: 3,
      label: '4km',
    },
    {
      value: 4,
      label: '6km',
    },
    {
      value: 5,
      label: '8km',
    },
];

function valueLabelFormat(value) {
    const units = ['현위치', 'km'];
  
    let unitIndex = 0;
    let scaledValue = value;
  
    while (scaledValue > 0 && unitIndex < 1) {
      unitIndex += 1;
      if(scaledValue>=3){
          scaledValue+=1;
      }
      if(scaledValue>=5){
          scaledValue+=1;
      }
      if(scaledValue>=7){
        scaledValue+=1;
      }
    }
  
    if(unitIndex==0){
        return `${units[unitIndex]}`;
    }
    else return `${scaledValue} ${units[unitIndex]}`;
}

function calculateValue(value) {
    return value;
}

function valuetext(value) {
    return `${value}°C`;
  }

function Mainbuttons(props) {

    const { window } = props;
    const [open, setOpen] = React.useState(false);
  
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;


    const [timefilter, settimefilter] = useState(false);
    const showTimefilter = () => settimefilter(!timefilter);

    const [filter, setfilter] = useState(false);
    const showfilter = () => setfilter(!filter);

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const [state, setState] = useState('idle');

    const onClickHandler = () => {
        //setState('loading');
        //setTimeout(() => {
          //setState('success');
        //}, 2000);
      }

    const [value, setValue] = React.useState(10);

    const handleChange = (event, newValue) => {
        if (typeof newValue === 'number') {
            setValue(newValue);
        }
    };

    var day;
    var time;
    const moment= require('moment') 

    const selectedDay = val => {
        var d=new Date(val.getTime());
        var dd=d.getMonth()+1;
        var ddd=d.getDate();
        console.log(dd+"월"+ddd+"일");
    };

    const selectedTime = val => {
        console.log(val);
        var mm=moment();
        var t=mm.hour();
        var tt=mm.minutes();
        console.log(t+":"+tt);

        //var t=new Date(val.getTime());
        //var tt=t.getHours();
        //var ttt=t.getMinutes();
        //console.log(tt+"시"+ttt+"분");
    };

    const classes = useStyles();

    const [timevalue, settimeValue] = React.useState(new Date('2018-01-01T00:00:00.000Z'));

    const [myDate, setmyDate] = useState();



    return (
        <>
            <S.Container>
                <IconContext.Provider value={{ color: '#000' }}>
                    <div className='btn_filter' onClick={showfilter} filterisexpanded={true}>
                        <BiIcons.BiSliderAlt className='filter_icon'/>
                    </div>

                    <div className='btn_time' onClick={toggleDrawer(true)}>
                        <BiIcons.BiTimeFive className='time_icon'/>
                    </div>
                    <nav className={filter ? 'filter_menu active' : 'filter_menu'}>
                        <div className='filter_menu_drawer'>
                            <div className='filter_menu_title'><h2>필터 설정</h2></div>
                            <div className='filter_menu_subtitle'>
                                <div className='filter_brand_off'>
                                    <BiIcons.BiCheck className='check_icon' color="#fff"/>
                                </div>  
                                <h3>브랜드</h3>
                            </div>
                            <div className='filter_menu_buttons'>
                                <input type="checkbox" id="brand_checkbox_all"/><label for="brand_checkbox_all" classname="boxlabel">전체보기</label>
                                <input type="checkbox" id="brand_checkbox1"/><label classname="boxlabel" for="brand_checkbox1">골프존</label>
                                <input type="checkbox" id="brand_checkbox2"/><label for="brand_checkbox2">골프존파크</label>
                                <input type="checkbox" id="brand_checkbox3"/><label for="brand_checkbox3">레드골프</label>
                                <input type="checkbox" id="brand_checkbox4"/><label for="brand_checkbox4">시티존</label>
                                <input type="checkbox" id="brand_checkbox5"/><label for="brand_checkbox5">오케이온</label>
                                <input type="checkbox" id="brand_checkbox6"/><label for="brand_checkbox6">프렌즈스크린T</label>
                                <input type="checkbox" id="brand_checkbox7"/><label for="brand_checkbox7">프렌즈스크린G</label>
                                <input type="checkbox" id="brand_checkbox8"/><label for="brand_checkbox8">SG골프</label>
                            </div>
                            <div className='filter_brand_onoff'>

                            </div>
                            <div className='filter_menu_subtitle'>
                                <div className='filter_facility_off'>
                                    <BiIcons.BiCheck className='check_icon' color="#fff"/>
                                </div> 
                                <h3>시설</h3>   
                            </div>
                            <div className='filter_facility_onoff'>

                            </div>
                            <div className='filter_menu_buttons'>
                                <input type="checkbox" id="facility_checkbox_all"/><label for="facility_checkbox_all">전체보기</label>
                                <input type="checkbox" id="facility_checkbox1"/><label for="facility_checkbox1">왼손타석</label>
                                <input type="checkbox" id="facility_checkbox2"/><label for="facility_checkbox2">주차시설</label>
                                <input type="checkbox" id="facility_checkbox3"/><label for="facility_checkbox3">새벽영업</label>
                                <input type="checkbox" id="facility_checkbox4"/><label for="facility_checkbox4">단체석</label>
                                <input type="checkbox" id="facility_checkbox5"/><label for="facility_checkbox5">바닥스크린</label>
                                <input type="checkbox" id="facility_checkbox6"/><label for="facility_checkbox6">무빙/듀얼</label>
                                <input type="checkbox" id="facility_checkbox7"/><label for="facility_checkbox7">프로교습</label>
                                <input type="checkbox" id="facility_checkbox8"/><label for="facility_checkbox8">장비고관</label>
                            </div>
                            <div className='filter_menu_subtitle'>
                                <div className='filter_distance_off'>
                                    <BiIcons.BiCheck className='check_icon' color="#fff"/>
                                </div>
                                <h3>거리</h3>
                            </div>
                            <div className='filter_distance_slider'>
                                <Box sx={{ width: 250 }}>
                                    {/*<ThemeProvider theme={muiTheme}>*/}
                                        <CustomSlider
                                            value={value}
                                            aria-label="Temperature"
                                            defaultValue={0}
                                            getAriaValueText={valuetext}
                                            scale={calculateValue}
                                            valueLabelDisplay="auto"
                                            getAriaValueText={valueLabelFormat}
                                            valueLabelFormat={valueLabelFormat}
                                            onChange={handleChange}
                                            step={1}
                                            marks={marks}
                                            min={0}
                                            max={5}
                                            aria-labelledby="non-linear-slider"
                                        />
                                    {/*</ThemeProvider>*/}
                                </Box>
                            </div>


                            <div className='filter_apply_area'>
                                <div className='filter_reset_btn'>
                                    <span className='btn_center'>재설정</span>
                                </div>
                                <div className='filter_apply_btn'>
                                    <span className='btn_center'>필터 적용</span>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <Root>
                        <CssBaseline />
                            <Global
                                styles={{
                                '.MuiDrawer-root > .MuiPaper-root': {
                                    height: `calc(80% - ${drawerBleeding}px)`,
                                    overflow: 'visible',
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24,
                                    },
                                }}
                            />
                            <SwipeableDrawer
                                container={container}
                                anchor="bottom"
                                open={open}
                                onClose={toggleDrawer(false)}
                                onOpen={toggleDrawer(true)}
                                swipeAreaWidth={drawerBleeding}
                                disableSwipeToOpen={false}
                                ModalProps={{
                                    keepMounted: true,
                                }}
                            >
                            <StyledBox
                                sx={{
                                    position: 'relative',
                                    top: -drawerBleeding-0,
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24,
                                    visibility: 'visible',
                                    right: 0,
                                    left: 0,
                                }}
                            >
                                <Puller />
                                <div className='time_filter_title'><span className='time_filter_title_text'>티업 일시</span></div>
                            </StyledBox>
                            <StyledBox
                                sx={{
                                    position: 'relative',
                                    px: 2,
                                    pb: 2,
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24,
                                    visibility: 'visible',
                                    height: '180px',
                                    overflow: 'auto',
                                }}
                            >
                                <div className='time_filter_select_day'>
                                    <DatePicker id='datepicker'
                                        getSelectedDay={selectedDay}
                                        endDate={0}
                                        labelFormat={"y.M."}
                                        color={"#22A8A5"}
                                    />
                                </div>
                            </StyledBox>
                            <StyledBox
                                sx={{
                                    position: 'relative',
                                    px: 2,
                                    pb: 2,
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24,
                                    visibility: 'visible',
                                    height: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                <div className='time_filter_select_time'>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack>
                                        </Stack>
                                    </LocalizationProvider>
                                    <ThemeProvider theme={materialTheme}>
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <TimePicker id='timepicker'
                                                style={{ marginTop: "0px", width:"100%", borderRadius:"12px", border:"2px solid #22A8A5"}}
                                                format={"HH:MM"}
                                                inputVariant="filled"
                                                TextFieldComponent={CssTextField}
                                                size="medium"
                                                value={myDate}
                                                onChange={setmyDate, selectedTime}
                                                label="티업 시각"
                                                formattime={value=>{return value}}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </ThemeProvider>
                                </div>
                            </StyledBox>
                        </SwipeableDrawer>
                    </Root>
                    <div className='btn_bottom_list_view' onPress={() => {}}>
                        <FaIcons.FaBars className='list_drawer_icon'/>
                        <span className='list_drawer_title'>목록 보기</span>
                    </div>
                </IconContext.Provider>
                <div className={timefilter? 'nav-mask1 active' : 'nav-mask1'} onClick={showTimefilter}></div>
                <div className={filter? 'nav-mask2 active' : 'nav-mask2'} onClick={showfilter}></div>
            </S.Container>
        </>
    );
  }
export default Mainbuttons;