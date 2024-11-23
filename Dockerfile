# Use a base image with Ruby (Arachni is Ruby-based)
FROM ruby:3.0

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpcap-dev \
  libsqlite3-dev \
  libssl-dev \
  libreadline-dev \
  libpcap-dev \
  zlib1g-dev \
  git \
  && rm -rf /var/lib/apt/lists/*

# Install Arachni
RUN git clone https://github.com/Arachni/arachni.git /opt/arachni \
  && cd /opt/arachni && bundle install

# Set the working directory to /opt/arachni
WORKDIR /opt/arachni

# Expose the necessary ports if required
EXPOSE 9292

# Run Arachni
CMD ["bin/arachni", "http://web:9292/d/users/sign_in"]
