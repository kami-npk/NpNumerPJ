# Use the official PHP image with Apache
FROM php:8.0-apache

# Set the working directory
WORKDIR /var/www/html

# Copy the application files to the container
COPY . .

# Enable Apache Rewrite Module
RUN a2enmod rewrite

# Expose port 80 (the default port for HTTP)
EXPOSE 80
