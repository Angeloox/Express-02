// const validateMovie = (req, res, next) => {
//   const { title, director, year, color, duration } = req.body;
//   const errors = [];

//   if (title == null) {
//     errors.push({ field: "title", message: "This field is required" });
//   } else if (title.length >= 255) {
//     errors.push({
//       field: "title",
//       message: "Should contain less than 255 characters",
//     });
//   }
//   if (director == null) {
//     errors.push({ field: "director", message: "This field is required" });
//   } else if (director.length >= 255) {
//     errors.push({
//       field: "director",
//       message: "Should contain less than 255 characters",
//     });
//   }
//   if (year == null) {
//     errors.push({ field: "year", message: "This field is required" });
//   } else if (year.length >= 255) {
//     errors.push({
//       field: "year",
//       message: "Should contain less than 255 characters",
//     });
//   }
//   if (color == null) {
//     errors.push({ field: "color", message: "This field is required" });
//   } else if (color.length >= 255) {
//     errors.push({
//       field: "color",
//       message: "Should contain less than 255 characters",
//     });
//   }
//   if (duration == null) {
//     errors.push({ field: "duration", message: "This field is required" });
//   }

//   if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

// const validateUser = (req, res, next) => {
//   const { firstname, lastname, email, city, language } = req.body;
//   const errors = [];

//   const emailregex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

//   if (firstname == null) {
//     errors.push({ field: "firstname", message: "This field is required" });
//   } else if (firstname.length >= 255) {
//     errors.push({
//       field: "firstname",
//       message: "Should contain less than 255 characters",
//     });
//   }

//   if (lastname == null) {
//     errors.push({ field: "lastname", message: "This field is required" });
//   } else if (lastname.length >= 255) {
//     errors.push({
//       field: "lastname",
//       message: "Should contain less than 255 characters",
//     });
//   }

//   if (!emailregex.test(email)) {
//     errors.push({ field: "email", message: "Invalid email" });
//   } else if (email == null) {
//     errors.push({ field: "email", message: "This field is required" });
//   } else if (email.length >= 255) {
//     errors.push({
//       field: "email",
//       message: "Should contain less than 255 characters",
//     });
//   }

//   if (city == null) {
//     errors.push({ field: "city", message: "This field is required" });
//   } else if (city.length >= 255) {
//     errors.push({
//       field: "city",
//       message: "Should contain less than 255 characters",
//     });
//   }

//   if (language == null) {
//     errors.push({ field: "language", message: "This field is required" });
//   } else if (language.length >= 255) {
//     errors.push({
//       field: "language",
//       message: "Should contain less than 255 characters",
//     });
//   }

//   if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  city: Joi.string().max(255).required(),
  language: Joi.string().max(255).required(),
  hashedPassword: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language, hashedPassword },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  color: Joi.string().max(255).required(),
  year: Joi.string().max(255).required(),
  duration: Joi.number().required(),
});

const validateMovie = (req, res, next) => {
  const { title, director, color, year, duration } = req.body;

  const { error } = movieSchema.validate(
    { title, director, color, year, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
