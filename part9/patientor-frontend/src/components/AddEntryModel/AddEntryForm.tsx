import { SyntheticEvent, useState, useContext } from "react";
import { OutlinedInput, SelectChangeEvent, Typography, TextField, Grid, Button, InputLabel, Select, MenuItem } from "@mui/material";
import { Diagnosis, EntryWithoutId, HealthCheckRating} from "../../types";
import DiagnosesContext from "../../contexts/diagnosesContext";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
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
    const [dischargeDate, setDischargeDate] = useState('')
    const [dischargeCriteria, setDischargeCriteria] = useState('')
    const [employerName, setEmployerName] = useState('')
    const [sickLeaveStart, setSickLeaveStart] = useState('')
    const [sickLeaveEnd, setSickLeaveEnd] = useState('')
    const [entryOptions, setEntryOptions] = useState('')

    const diagnoses = useContext(DiagnosesContext)

    const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();

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

        const baseEntry = {
            description,
            date,
            specialist,
            diagnosisCodes,
        }

        switch(entryOptions){
            case "HealthCheck":
                onSubmit ({
                    type: "HealthCheck",
                    ...baseEntry,
                    healthCheckRating
                }); 
                break;
            case "Hospital":
                onSubmit ({
                    type: "Hospital",
                    ...baseEntry,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                }); 
                break;
            case "OccupationalHealthcare":
                onSubmit({
                    type:  "OccupationalHealthcare",
                    ...baseEntry,
                    employerName: employerName,
                    sickLeave: sickLeaveStart && sickLeaveEnd ? {
                        startDate: sickLeaveStart,
                        endDate: sickLeaveEnd
                    }: undefined
                })
        }
    };

    return (
        <div>
            <Typography component="h5" variant="h5">New Entry</Typography>
            <InputLabel style={{ marginTop: 20 }}>Entry Options</InputLabel>
            <Select
                label="Option"
                fullWidth
                value={entryOptions}
                onChange={({ target }) => setEntryOptions(target.value)}
            >
                <MenuItem key="HealthCheck" value="HealthCheck">Health Check</MenuItem>
                <MenuItem key="Hospital" value="Hospital">Hospital</MenuItem>
                <MenuItem key="OccupationalHealthcare" value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            </Select>

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
                    fullWidth
                    type="date"
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />               
                
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

                {entryOptions === "HealthCheck" && 
                    <>
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
                    </>
                }

                {entryOptions === "Hospital" && 
                    <>
                       <InputLabel style={{ marginTop: 20 }}>Discharge Date</InputLabel>
                        <TextField 
                            type="date"
                            fullWidth
                            value={dischargeDate}
                            onChange={({ target }) => setDischargeDate(target.value)}
                        />
                        <InputLabel style={{ marginTop: 20 }}>Discharge Criteria</InputLabel>
                        <TextField 
                            label='discharge criteria'
                            fullWidth
                            value={dischargeCriteria}
                            onChange={({ target }) => setDischargeCriteria(target.value)}
                        />
                    </>
                }

                {entryOptions === "OccupationalHealthcare" && 
                    <>
                       <InputLabel style={{ marginTop: 20 }}>Employer Name</InputLabel>
                        <TextField 
                            label='employername'
                            fullWidth
                            value={employerName}
                            onChange={({ target }) => setEmployerName(target.value)}
                        />

                       <InputLabel style={{ marginTop: 20 }}>Sick Leave: </InputLabel>
                       <InputLabel style={{ marginTop: 5 }}>Start Date</InputLabel>
                        <TextField 
                            type='date'
                            fullWidth
                            value={sickLeaveStart}
                            onChange={({ target }) => setSickLeaveStart(target.value)}
                        />
                        <InputLabel style={{ marginTop: 5 }} >End Date</InputLabel>
                        <TextField 
                            type='date'
                            fullWidth
                            value={sickLeaveEnd}
                            onChange={({ target }) => setSickLeaveEnd(target.value)}
                        />
                    </>
                }

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