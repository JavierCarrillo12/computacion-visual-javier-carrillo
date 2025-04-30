# Taller 0 - Transformaciones Básicas en Computación Visual

## Objetivo del taller

El objetivo del taller es explorar los conceptos fundamentales de las transformaciones geométricas (traslación, rotación y escala) en distintos entornos de programación visual. En este ejercicio, se debe crear un objeto o escena básica y se le apliquen transformaciones estáticas y animadas en función del tiempo.

## Actividades por entorno

### 1. 💻 **Python (Colab o Jupyter Notebook)**

**Herramientas utilizadas:** `matplotlib`, `numpy`, `imageio`

**Descripción:**
- Se creó una figura 2D con puntos o formas.
- Se aplicaron transformaciones (traslación, rotación, escala) usando matrices de transformación.
- Se generó una animación utilizando bucles o interpolación.
- Las transformaciones fueron animadas en función del tiempo (`t` o del frame).
- Se exportó el resultado como un GIF animado usando `imageio`.

### 2. 🎨 **Processing**
Descripción:

- Se creó un proyecto con Vite y React Three Fiber.
- Se añadió un objeto 3D.
- Se aplicaron animaciones con useFrame para:
    - Trasladar el objeto por una trayectoria senoidal o circular.
    - Rotarlo sobre su propio eje con incremento en cada frame.
    - Escalarlo suavemente usando Math.sin(clock.elapsedTime).

### 3. 🌐 **Three.js con React Three Fiber**

Descripción: En esta parte del taller, se creó un sketch simple en Processing utilizando una figura geométrica en 3D. Se aplicaron tres transformaciones geométricas: traslación, rotación y escala.
