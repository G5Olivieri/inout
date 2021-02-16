import { useContext } from "react";
import { InternacionalizationContext } from "@app/internacionalizations/internacionalization-context";

export const useInternacionalization = () => useContext(InternacionalizationContext)

