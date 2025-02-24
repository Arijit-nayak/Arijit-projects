import random

class Game2048:
    def __init__(self):
        self.board = [[0] * 4 for _ in range(4)]
        self.score = 0
        self.add_new_tile()
        self.add_new_tile()

    def add_new_tile(self):
        empty_cells = [(r, c) for r in range(4) for c in range(4) if self.board[r][c] == 0]
        if empty_cells:
            r, c = random.choice(empty_cells)
            self.board[r][c] = 2 if random.random() < 0.9 else 4

    def compress(self):
        new_board = [[0] * 4 for _ in range(4)]
        for r in range(4):
            pos = 0
            for c in range(4):
                if self.board[r][c] != 0:
                    new_board[r][pos] = self.board[r][c]
                    pos += 1
        self.board = new_board

    def merge(self):
        for r in range(4):
            for c in range(3):
                if self.board[r][c] == self.board[r][c + 1] and self.board[r][c] != 0:
                    self.board[r][c] *= 2
                    self.score += self.board[r][c]  
                    self.board[r][c + 1] = 0

    def move_left(self):
        old_board = [row[:] for row in self.board]
        self.compress()
        self.merge()
        self.compress()
        if old_board != self.board:
            self.add_new_tile()

    def rotate_board(self):
        self.board = [list(row) for row in zip(*self.board[::-1])]

    def move_right(self):
        self.rotate_board()
        self.rotate_board()
        self.move_left()
        self.rotate_board()
        self.rotate_board()

    def move_up(self):
        self.rotate_board()
        self.rotate_board()
        self.rotate_board()
        self.move_left()
        self.rotate_board()

    def move_down(self):
        self.rotate_board()
        self.move_left()
        self.rotate_board()
        self.rotate_board()
        self.rotate_board()

    def check_game_over(self):
        for r in range(4):
            for c in range(4):
                if self.board[r][c] == 0:
                    return False  
                if c < 3 and self.board[r][c] == self.board[r][c + 1]:
                    return False  
                if r < 3 and self.board[r][c] == self.board[r + 1][c]:
                    return False  
        return True 

    def get_board(self):
        return self.board

    def reset_game(self):
        self.__init__()