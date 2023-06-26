import { Patient, Gender, Diagnosis } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Typography} from "@mui/material";


interface Props {
    patient : Patient | null | undefined
    diagnoses: Diagnosis[]
  }

const genderId = (gender: Gender | undefined ) => {
    switch(gender){
        case "female":
            return <FemaleIcon />;
        case "male":
            return <MaleIcon/>;
        default:
            return null;
    }
}

const OnePatientPage = ({ patient, diagnoses }: Props) => {
   return(
    <div>
       <Typography component="h5" variant="h5">{patient?.name}{genderId(patient?.gender)}</Typography>
       <p>ssn: {patient?.ssn}</p>
       <p>occupation: {patient?.occupation}</p>
       <Typography component="h6" variant="h6">entries</Typography>
       {patient?.entries.map(e => {
            return (
                <div key={e.id}>
                    <p>{e.date}{' '}{e.description}</p>
                    <ul>
                        {e.diagnosisCodes?.map(d => {
                            const diagnosis = diagnoses.find(diagnose => diagnose.code === d)?.name
                            return ( 
                            <li key={d}>{d} {diagnosis? diagnosis : null}</li> 
                            )
                          }
                        )}
                     </ul>
                </div>)
            }
        )}
    </div>
   )
}

export default OnePatientPage;