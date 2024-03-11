# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker-compose up -d
```

2. Renombra el archivo .env.example a .env y modifica las variables de entorno
3. Ejecutar el **SEED** para [crear la base de datos local](localhost:3000/api/seed)

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
