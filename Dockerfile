FROM php:7.2-apache

COPY dist /var/www/html
COPY resources/objectsAvailable.json /var/www/html
COPY src/admin /var/www/html/admin