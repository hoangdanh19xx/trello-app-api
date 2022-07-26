import { CardModel } from "*/models/Card.model";
import { ColumnModel } from "*/models/Column.model";

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

const update = async (id, data) => {
  try {
    const updatedData = {
      ...data,
      updatedAt: Date.now(),
    };
    if (updatedData._id) delete updatedData._id;

    const updatedCard = await CardModel.update(id, updatedData);

    return updatedCard;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = { createNew, update };
