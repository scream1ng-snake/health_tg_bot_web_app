type Optional<T> = T | null
type Undef<T> = T | undefined

type answer = {
  cdate: string,
  answer_text: string
}

const LoadStates = {
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

type LoadStatesType = typeof LoadStates[keyof typeof LoadStates];