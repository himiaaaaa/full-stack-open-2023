import axios from "axios";
import { HealthCheckEntry, HealthCheckEntryFormValue, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (patientId: string, object: HealthCheckEntryFormValue) => {
  const { data } = await axios.post<HealthCheckEntry>(
    `${apiBaseUrl}/patients/${patientId}/entries`, object
  );

  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, addEntry
};

