import React, { useState, useEffect } from 'react';
import { Grid, Container, Box } from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import DoctorsTable from '../components/DoctorsTable';
import axios from 'axios';
import GovSearch from '../components/GovSearch';
import Modal from '../shared/Modal';
import ModifyDoctor from './../components/ModifyDoctor';
import Pagination from '@material-ui/lab/Pagination';
import { paginate } from './../utils/paginate';



const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2)
  },

 
}))


function Doctors() {

  const [govs, setGovs] = useState([]);

  useEffect(() => {
    document.title = "doctors";
    const fetchData = async () => {

      try {
        const { data } = await axios.get('/api/DoctorsSpecialization')
        setSpeciality(data)
      } catch (error) {
        console.log('no speciality', error);
      }
    };
    fetchData();
  }, []);
  //=====================Speciality===========================
  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await axios.get('/api/Gov')
        setGovs(res.data);
      } catch (error) {
        console.log('no govs', error);
      }
    };
    fetchData();
  }, []);
  //===============Fetching govs===================

  const [isLoading, setIsLoading] = useState(false)
  const [cityId, setCityId] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [delDoctor, setDelDoctor] = useState(null);
  const [modifyDok, setModifyDok] = useState({});
  const [speciality, setSpeciality] = useState([]);
  const [selectedGov, setSelectedGov] = useState({});
  const [doctorCities, setDoctorCities] = useState([]);
  const [revised, setRevised] = useState(false);



  const getCityId = (cityId) => {
    setCityId(cityId);
  };
  useEffect(() => {

    const fetchData = async () => {
      if (cityId) {
        try {
          setIsLoading(true)
          const res = await axios.get(`/api/doctor/GetCompleteDoctorsInACity/${cityId}`)
          setDoctors(res.data);
          setIsLoading(false)
        } catch (error) {
          console.log(error);
        }
      } else return null
    };
    fetchData();
    //=========================


  }, [cityId]);

  const deleteDoctor = async (delDoctor) => {

    const originalDocotrs = doctors;
    const filterd = doctors.filter(doctor => doctor.id !== delDoctor.id);
    setDoctors(filterd);

    try {
      const res = await axios.delete(`/api/doctor/${delDoctor.id}`);
      toast.success("deleted successfully");
      
    } catch (error) {
      setDoctors(originalDocotrs);
      toast.error("failed to delete a doctor!")
    }
    
  };

  const reviseDoctor = async (doctor) => {

    try {
      const { data } = await axios.put(`/api/doctor/revised/${doctor.id}`, {
        ...doctor,
        revised: true
      } );
      toast.success('Verified successfully')
   } catch (error) {
     alert("Something wrong happened when revising a doctor, try, again!");
     toast.error("failed to verify a doctor.")
     console.log(error);
   }
  }

  function handleDelete(id) {
    setDelDoctor(id)
  }



  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  function setDoctorsCity() {

  }

  function handleModify(dok) {
    setModifyDok(dok)
    setShowModal(true)
  }

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
};

const paginatedDoctors = paginate(doctors, page, 15)

  return (<div className={classes.root}>
    <Grid direction='column' container spacing={2}>
      <Container maxWidth="lg" >
        <GovSearch onChoosingCity={getCityId} onChoosingGov={(gov) => {
          setSelectedGov(gov)
          setDoctorCities(gov.cities)
        }} govs={govs} />
        {doctors && <DoctorsTable className={classes.table} rows={paginatedDoctors} markRevised={reviseDoctor} onModify={handleModify}
          onDelete={deleteDoctor} />}

      {doctors &&  <Grid container justify="center">
                <Grid item>
                    <Box style={{
                        marginTop: '16px'
                    }}>
                        <Pagination count={Math.ceil(doctors.length / 15)} page={page} onChange={handleChange} color="primary" />
                    </Box>
                </Grid>
            </Grid> }
      </Container>

    </Grid>
    <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <ModifyDoctor hide={() => setShowModal(false)} doctor={modifyDok} speciality={speciality} doctorCities={doctorCities} />
    </Modal>
    
  </div>);
}

export default Doctors


