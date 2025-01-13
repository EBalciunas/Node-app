import Joi from "joi";

const answerValidation = Joi.object({
  answer_text: Joi.string().min(1).required().messages({
    "string.base": `"answer_text" turi būti teksto tipo.`,
    "string.min": `"answer_text" turi būti bent {#limit} simbolių ilgio.`,
    "any.required": `"answer_text" yra privalomas.`,
  }),
});

export { answerValidation };
