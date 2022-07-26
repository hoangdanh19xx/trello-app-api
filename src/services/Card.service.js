import { CardModel } from "*/models/Card.model";
import { ColumnModel } from "../models/Column.model";

const createNew = async (data) => {
  try {
    const newCard = await CardModel.createNew(data);

    await ColumnModel.pushCardOrder(
      newCard.columnId.toString(),
      newCard._id.toString()
    );

    return newCard;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = { createNew };
