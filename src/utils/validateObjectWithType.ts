const validateObjectWithType = (input: unknown): input is { type: string } => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'type' in input &&
    typeof (input as { type: unknown }).type === 'string'
  );
};
export default validateObjectWithType;
