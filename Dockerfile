FROM ruby:3.0

# Actualizar repositorios e instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    apt-transport-https \
    ca-certificates \
    gnupg \
    chromium-driver \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Agregar el repositorio oficial de Google Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable

# Instalar Arachni y sus dependencias
RUN apt-get update && apt-get install -y arachni
RUN apt-get update && apt-get install -y containerd.io
RUN gem install arachni bundler webrick

# Configurar PATH para Chrome y Chromedriver
ENV PATH="/usr/lib/chromium-browser/:/usr/bin:$PATH"

# Establecer el directorio de trabajo
WORKDIR /opt/arachni

# Exponer el puerto (opcional)
EXPOSE 9292

# Comando predeterminado
CMD ["arachni"]
