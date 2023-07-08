import { SyntheticEvent, useState, useContext } from "react";
import { OutlinedInput, SelectChangeEvent, Typography, TextField, Grid, Button, InputLabel, Select, MenuItem } from "@mui/material";
import { Diagnosis, HealthCheckEntryFormValue, HealthCheckRating} from "../../types";
import DiagnosesContext from "../../contexts/diagnosesContext";

interface Props {
    onCancel: () => void;
    onSubmit: (values: HealthCheckEntryFormValue) => void;
}

interface HealthCheckRatingOption{
    value: number;
    label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating).filter((value) => typeof value === "number")
.map((v) => ({
  value: v as number,
  label: HealthCheckRating[v as number],
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [specialist, setSpecialist] = useState('')
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([])
    const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy)

    const diagnoses = useContext(DiagnosesContext)

    const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        /* if( typeof event.target.value === 'number' ){
            const value = Number(event.target.value);
            const healthCheckRating = Object.values(HealthCheckRating).find(h => h === value)
            if(healthCheckRating){
                setHealthCheckRating(value);
            }
        } */

        const value = Number(event.target.value);
        console.log(value)

        const healthCheckRating = Object.values(HealthCheckRating)
        console.log(healthCheckRating)

        if (value && healthCheckRating.includes(value)) {
          setHealthCheckRating(value);
        } 

    } 

    const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
        event.preventDefault();

        const value = event.target.value;
        console.log(value)
        
        typeof value === "string" ?
        setDiagnosisCodes(value.split(', '))
        :
        setDiagnosisCodes(value)
    }

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            type: "HealthCheck",
            description,
            date,
            specialist,
            diagnosisCodes,
            healthCheckRating
        });
    };

    return (
        <div>
            <Typography component="h6" variant="h6">New HealthCheck Entry</Typography>
            <form onSubmit={addEntry}>
                <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
                <TextField 
                    label='description'
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />

                <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
                <TextField 
                    label='date'
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />

                <InputLabel style={{ marginTop: 20 }}>HealthCheckRating</InputLabel>
                <Select
                    label="HealthCheckRating"
                    fullWidth
                    value={healthCheckRating.toString()}
                    onChange={onHealthCheckRatingChange}
                >
                {healthCheckRatingOptions.map(option =>
                    <MenuItem
                    key={option.label}
                    value={option.value}
                    >
                    {option.label}
                    </MenuItem>
                )}
                </Select>
                
                <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
                <TextField 
                    label='specialist'
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />

            
                <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
                <Select
                    label="Diagnosis codes"
                    multiple
                    fullWidth
                    value={diagnosisCodes}
                    onChange={onDiagnosisCodesChange}
                    input={<OutlinedInput label="Multiple Select" />}
                >
                {diagnoses.map((d) => (
                <MenuItem key={d.code} value={d.code}>
                    {d.code}
                </MenuItem>
                ))}
                </Select> 

                <Grid>
                    <Grid item>
                        <Button
                            color='secondary'
                            variant='contained'
                            style={{ float: 'left' }}
                            type='button'
                            onClick={onCancel}
                        >
                            cancel
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            style={{ float: 'right' }}
                            type='submit'
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>

                </form>
            
        </div>
    )
}

export default AddEntryForm;