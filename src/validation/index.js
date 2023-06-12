import joi from 'joi';

export const validate = async (payload) => {
  //joi's validation schema
  const schema = joi.string().min(3).max(20);

  try {
    const results = await schema.validateAsync(payload);
    console.log(results);
    return null;
  } catch (errors) {
    console.log(errors);
    return errors.details[0].message;
  }
};
