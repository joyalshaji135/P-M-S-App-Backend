import LookupCodes from '../models/lookups-models/lookup-code.model';
export async function generateNewLookupCode(type: string): Promise<string> {
  console.log(type, 'type');
  const lookupCodeDoc = await LookupCodes.findOne({ type });
  // console.log(lookupCodeDoc, "lookupCOde");
  if (!lookupCodeDoc) {
    throw new Error(`No lookup code found for type: ${type}`);
  }

  let lastNumber: number = lookupCodeDoc.lastNumber;
  let newNumber: number;

  if (lastNumber === 0) {
    newNumber = lookupCodeDoc.firstNumber + 1;
  } else {
    newNumber = lastNumber + 1;
  }

  const newNumberString = newNumber.toString().padStart(2, '0');

  const newCode = `${lookupCodeDoc.code}${newNumberString}`;

  await LookupCodes.updateOne({ type }, { lastNumber: newNumber });

  return newCode;
}
