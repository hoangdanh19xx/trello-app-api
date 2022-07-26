import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "*/config/mongodb";
import { CardModel } from "./Card.model";
import { ColumnModel } from "./Column.model";

// Define Board collection
const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const options = { upsert: true, returnDocument: "after" };
    const result = await getDB()
      .collection(boardCollectionName)
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

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { columnOrder: columnId } },
        { returnDocument: "after" }
      );

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        { $match: { _id: ObjectId(boardId), _destroy: false } },
        // { $addFields: { _idTest: { $toString: "$_id" } } },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName,
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName,
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();

    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = { createNew, pushColumnOrder, getFullBoard };
