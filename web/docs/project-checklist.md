# Project checklist

This is the list of things to check before application/website before launching to production:


### Favicons

* Provide assets for multiple devices & screens. Use PNG image 512x512 and this service to create assets: [https://favicon.io](https://favicon.io)
* Ensure that favicon is visible both on light & dark theme
* If needed create different set for light & dark theme and script for loading relevant set according current theme on device


### Meta tags

* Title of the page (application)
* Description
* OG tags (title, description, image)
* Share image (PNG, 1200x630px)
* Charset
* Viewport
* Theme color


### Preload assets

* Dns-prefetch for analytics services
* Preload for fonts used in the application


### Console

* Ensure that there’s no errors or other outputs in console


### WWW and non-WWW

* Ensure that website/application works both with and without WWW


### HTTPS/SSL

* Ensure that website/application has valid SSL certificate
* Ensure that traffic is always redirected to HTTPS
