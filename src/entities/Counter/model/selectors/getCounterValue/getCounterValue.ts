import { createSelector } from "@reduxjs/toolkit";
import { getCounter } from "../getCounter/getCounter";
import { CounterSchema } from "../../types/counterSchema";
import { buildSelector } from "@/shared/lib/store";

// мемоиизирует селектор
export const [useCounterValue, getCounterValue] = buildSelector(
    (state) => state.counter.value,
)