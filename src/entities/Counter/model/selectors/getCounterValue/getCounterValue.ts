import { buildSelector } from "@/shared/lib/store";

// мемоиизирует селектор
export const [useCounterValue, getCounterValue] = buildSelector(
    (state) => state.counter.value,
)