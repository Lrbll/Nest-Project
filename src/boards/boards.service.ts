import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];
    // Board[] : Board의 타입도 여러개가 들어갈 수 있도록 배열로
    getAllBoards():Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        // const title = createBoardDto.title;

        const board: Board = {
            id: uuid(),
            title: title, // 이름이 같을 경우는 title, 만 작성해도 됨
            description: description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: String): Board {
        const found = this.boards.find((board) => board.id === id);
        
        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    deleteBoard(id: String): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: String, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
