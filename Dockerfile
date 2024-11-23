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
    libxml2-dev \
    libxslt-dev \
    zlib1g-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar Google Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb \
    && apt-get -f install -y \
    && rm google-chrome-stable_current_amd64.deb

# Clonar Arachni y configurar su entorno
RUN git clone https://github.com/Arachni/arachni.git /opt/arachni

# Cambiar al directorio de Arachni y instalar dependencias
WORKDIR /opt/arachni
RUN bundle install

# Configurar la ruta para que Arachni pueda encontrar `chromedriver` y `google-chrome`
ENV PATH=$PATH:/opt/arachni/bin:/usr/lib/chromium-browser/

# Exponer el puerto que Arachni necesita (si es necesario para tu aplicación)
EXPOSE 9292

# Establecer el directorio de trabajo
WORKDIR /opt/arachni

# Comando por defecto para ejecutar Arachni
CMD ["arachni"]


