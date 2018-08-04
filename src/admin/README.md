# Admin

This subproject allow the admin to edit the objects available and the models.

## Build Run

This subproject requires no building.
The php server which update the files is made for an apache php fpm.
The server must be deployed in an admin folder where ../objectsAvailable.json contains the objects definition and ../models contains the models

## Test

For development purposes run the server with:

```bash
cd ../..
docker build -t 3ecadmin .  # run this every time the default objectsAvailable.json changes or models directory strucutre changes
docker run -it --rm -v $(pwd)/src/admin:/var/www/html/admin -p 80:80 3ecadmin
```

Le serveur est accessible à l'adresse localhost/admin