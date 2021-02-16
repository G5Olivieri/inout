import { createContext } from "react";
import { DefaultInternacionalization } from "@app/internacionalizations/default-internacionalization";

export const InternacionalizationContext = createContext(new DefaultInternacionalization())
