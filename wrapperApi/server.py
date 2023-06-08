import subprocess
from flask import Flask, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate_image', methods=['POST'])
def generate_image():
    # Получение параметров из запроса
    # Здесь предполагается, что клиент отправляет параметры в форме JSON
    parameters = request.json
    
#    # Преобразование параметров в аргументы командной строки
#     args = [
#         ' C:\Python311\python.exe', 
#         'D:/work/WrapperStableDiffusion/stable-diffusion-main/scripts/txt2img.py',
#         '--prompt', parameters['propmt'],
#         '--outdir', 'output_directory',  # Здесь укажите директорию, куда будут сохраняться результаты
#         '--n_samples', str(parameters['amountOfImages']),
#         '--detail', str(parameters['detail']),
#         '--creativness', str(parameters['creativness']),
#         '--seed', str(parameters['seed']),
#         '--W', str(parameters['width']),
#         '--H', str(parameters['height']),
#         '--sampler', parameters['sampler'],
#         '--scale', '1.0',  # Пример значения, вы можете настроить его по своему усмотрению
#     ]
    
#     # Выполнение команды для генерации картинки с использованием приложения stable-diffusion
#     subprocess.run(args)

    # После выполнения команды картинка будет сохранена в файле 'output.png'
    # Возвращаем файл клиенту в бинарном формате
    return send_file('output.png', mimetype='image/png')

if __name__ == '__main__':
    app.run()