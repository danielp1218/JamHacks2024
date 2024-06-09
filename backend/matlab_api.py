import matlab.engine
from fastapi import FastAPI
import base64
import random

app = FastAPI()

eng = matlab.engine.start_matlab()
imagePath = 'C:\\Users\\tsara\\Downloads\\47c54c542e3b4417b253eac36636701cb6554afd.tif'

@app.get("/")
async def root(b64string):
    imgdata = base64.b64decode(b64string)
    filename = f'temp/{random.random()}/.tif'  # I assume you have a way of picking unique filenames
    with open(filename, 'wb') as f:
        f.write(imgdata)
    res = eng.ai_model(filename)
    print("in python " + res)
    return res.result
