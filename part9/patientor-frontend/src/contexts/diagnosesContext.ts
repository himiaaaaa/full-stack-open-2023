import { createContext } from "react";
import { Diagnosis } from "../types";

const DiagnosesContext = createContext<Diagnosis[]>([]);

export default DiagnosesContext;

