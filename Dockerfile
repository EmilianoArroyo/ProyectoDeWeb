# Usar la imagen base de Ruby
FROM ruby:3.0

# Actualizar los repositorios y instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    apt-transport-https \
    ca-certificates \
    gnupg \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Instalar Google Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb \
    && apt-get -f install -y \
    && rm google-chrome-stable_current_amd64.deb

# Instalar Arachni y sus dependencias
RUN gem install arachni bundler webrick

# Configurar la ruta para que Arachni pueda encontrar `chromedriver` y `google-chrome`
ENV PATH=$PATH:/usr/lib/chromium-browser/

# Exponer el puerto que Arachni necesita (si es necesario para tu aplicación)
EXPOSE 9292

# Establecer el directorio de trabajo
WORKDIR /opt/arachni

# Ejecutar Arachni con el comando deseado
CMD ["arachni"]

