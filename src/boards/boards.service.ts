import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
    ) {}
    // getAllBoards():Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto;
    //     // const title = createBoardDto.title;

    //     const board: Board = {
    //         id: uuid(),
    //         title: title, // 이름이 같을 경우는 title, 만 작성해도 됨
    //         description: description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOneBy({ id });

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        return found;
    }

    // getBoardById(id: String): Board {
    //     const found = this.boards.find((board) => board.id === id);
        
    //     if(!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return found;
    // }

    // deleteBoard(id: String): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: String, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
