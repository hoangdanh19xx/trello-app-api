import Joi from "joi";
import { getDB } from "*/config/mongodb";

// Define Board collection
const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const options = { upsert: true, returnDocument: "after" };
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(value, { $set: {} }, options);

    // console.log(result.value);
    // const result = await getDB()
    //   .collection(boardCollectionName)
    //   .insertOne(value);

    return result.value;
  } catch (error) {
    console.log(error);
  }
};

export const ColumnModel = { createNew };
