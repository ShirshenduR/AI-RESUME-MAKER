FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js 18 and minimal LaTeX
RUN apt-get update && \
    apt-get install -y curl gnupg software-properties-common && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs \
    texlive-latex-base \
    texlive-latex-recommended \
    texlive-fonts-recommended \
    texlive-latex-extra && \
    apt-get clean

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
