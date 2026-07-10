# Cómo publicar "¿Qué almuerzo hago hoy?" gratis en Vercel

No necesitas saber programar para seguir estos pasos. Solo copiar, pegar y hacer clic.
Tiempo estimado: 15-20 minutos la primera vez.

---

## Paso 1: Crear una cuenta de GitHub (gratis)

GitHub es donde vas a guardar el código de tu app. Vercel lo lee directamente de ahí.

1. Ve a https://github.com/signup
2. Crea tu cuenta con tu correo (enriquesim@hotmail.com o el que prefieras).
3. Confirma tu correo cuando te llegue el email de verificación.

## Paso 2: Crear un repositorio nuevo

1. Ya con sesión iniciada, ve a https://github.com/new
2. En "Repository name" escribe: `que-almuerzo-hago-hoy`
3. Déjalo en "Public".
4. NO marques ninguna casilla adicional (README, .gitignore, licencia). Déjalas vacías.
5. Haz clic en "Create repository".

## Paso 3: Subir el código

GitHub te va a mostrar una pantalla con comandos. La forma más fácil sin usar la terminal:

1. En esa misma página de tu repositorio nuevo, busca el enlace que dice **"uploading an existing file"**.
2. Arrastra TODOS los archivos y carpetas que están dentro de la carpeta `almuerzo-app` que te compartí (todo excepto `node_modules`, que no debería existir todavía).
3. Asegúrate de que quede la estructura de carpetas (por ejemplo `src/App.jsx`, `public/manifest.json`, etc. — GitHub respeta las subcarpetas si arrastras la carpeta completa).
4. Abajo, en "Commit changes", escribe algo como "Primera versión" y haz clic en **"Commit changes"**.

## Paso 4: Conectar con Vercel (gratis)

1. Ve a https://vercel.com/signup
2. Elige **"Continue with GitHub"** e inicia sesión con la cuenta que acabas de crear.
3. Autoriza a Vercel a acceder a tus repositorios.
4. En el panel de Vercel, haz clic en **"Add New..." → "Project"**.
5. Busca `que-almuerzo-hago-hoy` en la lista y haz clic en **"Import"**.
6. Vercel detecta automáticamente que es un proyecto Vite/React — no cambies nada, deja la configuración por defecto.
7. Haz clic en **"Deploy"**.
8. Espera 1-2 minutos. Cuando termine, Vercel te da un link tipo:
   `https://que-almuerzo-hago-hoy.vercel.app`

¡Listo! Ese link ya es tu app, funcionando, gratis, para siempre (mientras esté dentro del plan gratuito de Vercel, que es más que suficiente para esta app).

## Paso 5: Instalarla como app en un celular

Comparte el link por WhatsApp. Cuando alguien lo abra:

- **En Android (Chrome)**: aparece un aviso o pueden tocar los tres puntos (⋮) → "Agregar a pantalla de inicio".
- **En iPhone (Safari)**: tocar el botón de compartir (□ con flecha) → "Agregar a pantalla de inicio".

Después de eso, la app queda con su ícono en el celular como cualquier otra app instalada.

## Paso 6 (opcional): actualizar la app más adelante

Cada vez que quieras cambiar algo (agregar recetas, cambiar colores, etc.), solo tienes que:
1. Editar los archivos directamente en GitHub (botón del lápiz ✏️ en cada archivo), o subir la nueva versión.
2. Vercel detecta el cambio automáticamente y actualiza la app sola en 1-2 minutos. No hay que hacer nada más.

---

### Si prefieres que lo suba yo por ti

Si me das acceso a una cuenta de GitHub (o me pides que te guíe en videollamada/paso a paso en vivo), también puedo ayudarte a hacerlo usando la terminal con dos o tres comandos, que es más rápido si te animas. Solo dime.
