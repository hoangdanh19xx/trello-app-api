import { BoardModel } from "*/models/Board.model";

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);

    if (!board || !board.columns) {
      throw new Error("Board not found!");
    }

    // add card to each column
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (c) => c.columnId.toString() === column._id.toString()
      );
    });

    // sort column by columnOrder, sort cards by cardOrder, this step will apass to frontend DEV
    // remove cards data from boards
    delete board.cards;

    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard };
