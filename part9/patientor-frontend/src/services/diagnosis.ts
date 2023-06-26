import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
    );
    return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
    getAll
};