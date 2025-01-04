/* eslint-disable @typescript-eslint/no-explicit-any */
// / function currying

const logger = (state: any) => (next: any) => (action: any) => {
  console.group(action.type);
  console.info("Prev State", state.getState());
  const result = next(action);
  console.info("Next State", state.getState());
  console.groupEnd();
  return result;
};

export default logger;
