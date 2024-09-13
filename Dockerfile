# Use the base image provided by AWS for Python Lambda functions
FROM public.ecr.aws/lambda/python:3.10

# Set the working directory to /var/task (AWS Lambda's default working directory)
WORKDIR /var/task

# Copy only the necessary files
COPY requirements.txt .
COPY main.py .

# Install the dependencies
RUN python3.10 -m pip install --no-cache-dir -r requirements.txt

# Set the CMD to your handler (this should be the Mangum instance wrapping your FastAPI app)
CMD ["main.handler"]
