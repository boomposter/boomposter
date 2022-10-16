FROM python:3.9.5

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Ставим русскую локаль
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y locales locales-all
ENV LANGUAGE ru_RU.UTF-8
ENV LANG ru_RU.UTF-8
ENV LC_ALL ru_RU.UTF-8
RUN locale-gen ru_RU.UTF-8 && dpkg-reconfigure locales

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements/base.txt /usr/src/app/requirements/base.txt
COPY ./requirements/dev.txt /usr/src/app/requirements/dev.txt
RUN pip install -r ./requirements/dev.txt

# copy project
COPY . /usr/src/app/
