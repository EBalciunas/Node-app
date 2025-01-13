import Joi from "joi";

const answerSchema = Joi.object({
  answer_text: Joi.string()
    .min(1)
    .required()
    .messages({
      "string.base": `"answer_text" turi būti teksto tipo.`,
      "string.min": `"answer_text" turi būti bent {#limit} simbolių ilgio.`,
      "any.required": `"answer_text" yra privalomas.`,
    })
    .label("Atsakymas"),
});

const validateAnswer = (req, res, next) => {
  const { error } = answerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { validateAnswer };
