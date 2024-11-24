FROM ruby:3.0

# Actualizar repositorios e instalar dependencias
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    apt-transport-https \
    ca-certificates \
    gnupg \
    chromium-driver \
    google-chrome-stable

# Agregar el repositorio oficial de Arachni y su clave GPG
RUN sh -c 'echo "deb http://download.opensuse.org/repositories/security:/arachni/xUbuntu_20.04/ /" > /etc/apt/sources.list.d/arachni.list' \
    && wget -q -O - https://download.opensuse.org/repositories/security:arachni/xUbuntu_20.04/Release.key | apt-key add - \
    && apt-get update \
    && apt-get install -y arachni

# Configurar PATH para Chrome y Chromedriver
ENV PATH="/usr/lib/chromium-browser/:/usr/bin:$PATH"

# Establecer el directorio de trabajo
WORKDIR /opt/arachni

# Exponer el puerto para Arachni Web UI (opcional)
EXPOSE 9292

# Comando predeterminado para ejecutar Arachni
CMD ["arachni"]
