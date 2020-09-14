import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RepInfo from '../components/RepInfo';



function Profile(props) {

    
    
    const [repData, setRepData] = useState(null);
    const profileId = props.match.params.id
    console.log(profileId)
    useEffect(() => {
       const fetchRepData = async () => {
        if(profileId) {
            try {
                const { data } = await axios.get(`/api/rep/${profileId}`);
                setRepData(data);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
           } else {
                return null;
           }
       }
        fetchRepData()
    }, [profileId]);
    
    const renderReps = () => {
        if(repData) {
            return !!repData ? <RepInfo {...repData} /> : "null"
        } else {
            return null
        }
    }
   
    return (
         <div>
             { !!repData && renderReps() }
         </div>
    )
}

export default Profile;
