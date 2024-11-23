FROM ruby:3.0

# Install dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  libsqlite3-dev \
  libxml2-dev \
  libxslt1-dev \
  libssl-dev \
  libreadline-dev \
  zlib1g-dev \
  && rm -rf /var/lib/apt/lists/*

# Install Ruby dependencies
RUN gem install bundler

# Install the missing 'webrick' gem explicitly
RUN gem install webrick

# Clone Arachni repository
RUN git clone https://github.com/Arachni/arachni.git /opt/arachni

# Install Arachni dependencies
RUN cd /opt/arachni && bundle install

# Set working directory to Arachni
WORKDIR /opt/arachni

# Run Arachni
CMD ["ruby", "bin/arachni"]
