import * as Joi from "joi"
const login = Joi.object({
    mobileNo: Joi.string()
        .min(10)
        .required(),

});
export default {login}