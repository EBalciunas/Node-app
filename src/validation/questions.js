import Joi from "joi";

const questionSchema = Joi.object({
  question_text: Joi.string()
    .min(5)
    .required()
    .messages({
      "string.base": `"question_text" turi būti teksto tipo.`,
      "string.min": `"question_text" turi būti bent {#limit} simbolių ilgio.`,
      "any.required": `"question_text" yra privalomas.`,
    })
    .label("Question"),
});

const validateQuestion = (req, res, next) => {
  const { error } = questionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { validateQuestion };
