FROM python:3.10-slim-buster

RUN apt-get update && apt-get install -y \
    curl

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "app.py"]