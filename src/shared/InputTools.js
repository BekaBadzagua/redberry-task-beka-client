export const InputIsValid = (value, rules) => {
  if (!rules) return true;

  let isValid = true;
  if (rules.required) isValid = value.trim() !== '' && isValid;
  if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
  if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};

// თუ ინფუთი ობიექტის სახით გვაქვს შენახული ისეთ ფორმატში როგორიც არის Sign Upში - inputData , 
// ნებისმიერ კომპონენტში იმუშავებს ეს კოდი, ანალოგიურად შესაძლებელია გავწროთ ვალიდაციისა 
// შესაბამისი ინფუთეის დაგენერირება, მაგრამ აპლიკაციის მცირე ზომის გამო ამ მიდგომას არ ვიყენებ
export const InputChangeHandler = (event, inputData, setInputData) => {
  let propName = event.target.name;
  let data = {
    ...inputData,
    [propName]: {
      ...inputData[propName],
      value: event.target.value,
    },
  };
  setInputData(data);
};
