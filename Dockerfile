FROM php:7.2-apache

COPY resources/objectsAvailable.json /var/www/html
#COPY dist/models /var/www/html/models
COPY src/admin /var/www/html/admin