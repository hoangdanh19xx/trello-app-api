import Joi from "joi";
import { getDB } from "*/config/mongodb";

// Define Board collection
const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  cover: Joi.string().default(null),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const options = { upsert: true, returnDocument: "after" };
    const result = await getDB()
      .collection(cardCollectionName)
      .findOneAndUpdate(value, { $set: {} }, options);

    // console.log(result.value);
    // const result = await getDB()
    //   .collection(boardCollectionName)
    //   .insertOne(value);

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardModel = { createNew };
