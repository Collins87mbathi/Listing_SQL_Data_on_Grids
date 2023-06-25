import React,{useState} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Autocomplete, Button, TextField } from '@mui/material';
import { Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {countries} from "../countries"
import Swal from 'sweetalert2';
import request from '../Requests/Requests';
import apis from '../Requests/apis';


const today = dayjs().format('YYYY-MM-DD');

const initialState = Object.freeze({
  FirstName : "",
  LastName:"",
  Country:"",
  PhoneNumber:"",
  BirthDate:dayjs(today)
  });

const CreateEmployee = () => {
const [formData,setFormData] = useState(initialState);
const history = useLocation();

const handleSave = async () => {
  try {
     await request({
      url: apis.deleteEmployees, 
      payload: formData,  
    });

    // Show the success pop-up
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Data saved successfully.',
    });

    // Navigate to the home page
    history.push('/');
  } catch (error) {
    // Handle the error if needed
    console.log(error);
  }
};

  return (
    <div className='max-w-6xl mx-auto px-4 mt-20'>
    <div className="text-5xl">
      <Link to='/'>
      <ArrowBackIcon/>
      </Link>
    </div>
    <div >
    <div className="w-full space-y-8 border h-96 mt-16 py-12 px-4">
      <div className='flex  justify-between space-x-3'>
      <TextField
  fullWidth
  required={true}
  label="First Name"
  id="fullWidth"
  value={formData.FirstName}  // Connect value to formData state
  onChange={(e) => setFormData({ ...formData, FirstName: e.target.value })}  // Connect onChange to update formData state
/>
<TextField
  fullWidth
  required={true}
  label="Last Name"
  id="fullWidth"
  value={formData.LastName}  // Connect value to formData state
  onChange={(e) => setFormData({ ...formData, LastName: e.target.value })}  // Connect onChange to update formData state
/>
    </div>
    <div className='flex  justify-between space-x-3'>
    <Autocomplete
  fullWidth
  options={countries}
  getOptionLabel={(option) => option}
  value={formData.Country}  // Connect value to formData state
  onChange={(e, value) => setFormData({ ...formData, Country: value })}  // Connect onChange to update formData state
  renderInput={(params) => <TextField {...params} label="Country" id="fullWidth" required={true} />}
/>
<TextField
  fullWidth
  required={true}
  label="Phone Number"
  id="fullWidth"
  value={formData.PhoneNumber}  
  onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })}  // Connect onChange to update formData state
/>

    </div>
   <div className='w-1/2'>
   <LocalizationProvider dateAdapter={AdapterDayjs}>
   <DemoContainer
        components={[
          'DatePicker',
          'MobileDatePicker',
          'DesktopDatePicker',
          'StaticDatePicker',
        ]}
      >
   <DemoItem>
   <DatePicker
  value={formData.BirthDate}  // Connect value to formData state
  onChange={(date) => setFormData({ ...formData, BirthDate: date })}  // Connect onChange to update formData state
  renderInput={(props) => <TextField {...props} />}
/>

</DemoItem> 
</DemoContainer>  
    </LocalizationProvider>
   </div>
   <div>
   <Button variant="contained" className="right-0" onClick={handleSave}>Save</Button>
   </div>
    </div>
    </div>
    </div>
  )
}

export default CreateEmployee