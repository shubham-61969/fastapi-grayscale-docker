from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import io
from PIL import Image, ImageOps, UnidentifiedImageError
from mangum import Mangum

app = FastAPI()

# CORS settings
origins = [
    "http://localhost:3000",
    "http://react-fastapi-docker.s3-website-us-east-1.amazonaws.com",
    "https://react-fastapi-docker.s3-website-us-east-1.amazonaws.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/convert", responses={200: {"content": {"image/png": {}}}, 400: {"description": "Invalid image"}})
async def convert_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="Invalid image")

    grayscale_image = ImageOps.grayscale(image)
    buf = io.BytesIO()
    grayscale_image.save(buf, format="PNG")
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png")

# Wrap the FastAPI application with Mangum
handler = Mangum(app)
