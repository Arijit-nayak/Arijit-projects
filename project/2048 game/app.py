from flask import Flask, render_template, request, jsonify
from game import Game2048  

app = Flask(__name__)
game = Game2048() 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_board')
def get_board():
    return jsonify({
        'board': game.get_board(),
        'score': game.score,
        'game_over': game.check_game_over()
    })

@app.route('/move', methods=['POST'])
def move():
    data = request.json
    direction = data.get('direction')

    if direction == 'left':
        game.move_left()
    elif direction == 'right':
        game.move_right()
    elif direction == 'up':
        game.move_up()
    elif direction == 'down':
        game.move_down()

    return jsonify({
        'board': game.get_board(),
        'score': game.score,
        'game_over': game.check_game_over()
    })

@app.route('/reset', methods=['POST'])
def reset():
    game.reset_game()
    return jsonify({
        'board': game.get_board(),
        'score': game.score,
        'game_over': game.check_game_over()
    })

if __name__ == '__main__':
    app.run(debug=True)