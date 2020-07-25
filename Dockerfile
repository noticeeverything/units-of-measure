FROM noticeeverything/apache:latest

COPY dist/browser /usr/local/apache2/htdocs
COPY .htaccess /usr/local/apache2/htdocs
