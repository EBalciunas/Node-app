import Joi from "joi";

const questionValidation = Joi.object({
  question_text: Joi.string().min(5).required().messages({
    "string.base": `"question_text" turi būti teksto tipo.`,
    "string.min": `"question_text" turi būti bent {#limit} simbolių ilgio.`,
    "any.required": `"question_text" yra privalomas.`,
  }),
});

export { questionValidation };
