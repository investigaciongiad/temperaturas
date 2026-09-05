# 🌡️ Conversor de Temperatura °C / °F / K

Aplicativo web **sencillo, visual e intuitivo** para convertir temperaturas entre **Celsius (°C)**, **Fahrenheit (°F)** y **Kelvin (K)**. Pensado especialmente para **personas mayores**: letra grande, botones enormes, alto contraste y cero complicaciones.

> Sin instalaciones, sin internet y sin dependencias. Abres el archivo y funciona.

---

## 🗺️ Esquema de uso

```
 ┌────────────────────────────────────────────────────────────┐
 │  1. ELIGE LA UNIDAD        2. ESCRIBE EL NÚMERO            │
 │     [°C]  [°F]  [K]        [   25,5   ]                    │
 │                             (teclado del equipo o móvil)   │
 │                                                            │
 │  3. MIRA EL RESULTADO       4. (Opcional) ESCUCHA          │
 │     [°C → 25,5]                 🔊 "25 coma 5 grados       │
 │     [°F → 77,9]                  Celsius equivalen a…"     │
 │     [K  → 298,65]                                          │
 │                                                            │
 │  ¿No sabes qué escribir? Toca una referencia:              │
 │  💧 Agua hierve · 🧊 Agua se congela · 🤒 Cuerpo humano…   │
 └────────────────────────────────────────────────────────────┘
```

Todo se actualiza **en tiempo real**: no hay botón de "convertir", el resultado aparece solo mientras escribes.

---

## ✨ Funcionalidades

| Función | Qué hace |
|---|---|
| 🎚️ Selector de unidad | 3 botones grandes y de colores: °C azul, °F naranja, K verde |
| ⚡ Conversión en vivo | Al escribir o cambiar de unidad, las 3 tarjetas se actualizan al instante |
| ⌨️ Escritura libre | Escribe con el teclado de tu equipo o el numérico del móvil; acepta coma o punto decimal |
| 🔊 Leer en voz alta | Lee el resultado en español usando la voz del navegador |
| 🤔 Referencias cotidianas | Ejemplos reales (agua hirviendo, cuerpo humano…) con un solo toque |
| 🧹 Limpiar | Botón grande para empezar de nuevo |
| ⚠️ Mensajes amables | Avisa si escribes algo imposible (ej. Kelvin negativo o bajo el cero absoluto) |
| ♿ Accesibilidad | Navegación con teclado, foco visible, lectores de pantalla, modo sin animaciones |

---

## 📁 Estructura del proyecto

```
conversor-temperatura/
├── index.html     → Estructura y contenido de la página
├── styles.css     → Diseño visual, colores y accesibilidad
└── script.js      → Lógica de conversión, teclado y voz
```

Tres archivos, sin librerías externas: **HTML5 + CSS3 + JavaScript puro**.

---

## 🧮 Cómo funciona por dentro

### Las 6 fórmulas (una por dirección)

| Conversión | Fórmula |
|---|---|
| Celsius → Fahrenheit | `°F = °C × 9/5 + 32` |
| Celsius → Kelvin | `K = °C + 273,15` |
| Fahrenheit → Celsius | `°C = (°F − 32) × 5/9` |
| Fahrenheit → Kelvin | `K = (°F − 32) × 5/9 + 273,15` |
| Kelvin → Celsius | `°C = K − 273,15` |
| Kelvin → Fahrenheit | `°F = (K − 273,15) × 9/5 + 32` |

### El truco del código

Para no duplicar lógica, el programa convierte **todo a Celsius** y desde ahí a las otras dos unidades:

```
  [tu número] ──▶ °C (unidad común) ──▶ [°F] y [K]
```

- Si escribes en Fahrenheit o Kelvin, primero se pasa a Celsius con su fórmula `TO_C`, y luego se expande con las `FROM_C`.

### Valores que siempre deben salir (para comprobar)

| Entrada | °C | °F | K |
|---|---|---|---|
| Agua se congela | 0 | 32 | 273,15 |
| Cuerpo humano | 37 | 98,6 | 310,15 |
| Agua hierve | 100 | 212 | 373,15 |
| Cero absoluto | −273,15 | −459,67 | 0 |

> 💡 **Dato divulgativo:** el **cero absoluto** (0 K) es la temperatura más baja que existe en el universo. Nada puede estar más frío. Por eso la app avisa si intentas escribir Kelvin negativos.

---

## 🧓 Diseño pensado para personas mayores

| Decisión | Detalle |
|---|---|
| 🔠 Tipografía grande | Resultados hasta 58 px, botones desde 62 px de alto |
| 🌈 Alto contraste | Texto oscuro sobre fondos claros (WCAG AA) |
| 🎯 Zonas táctiles grandes | Mínimo 48 px recomendado; aquí mucho más |
| 🧭 Un solo camino | Flujo vertical y numerado: 1 → 2 → 3 → 4 |
| 🗣️ Apoyo por voz | Botón "Leer en voz alta" con `speechSynthesis` |
| ✋ Sin gestos raros | Solo toques simples y claros |
| 🔇 Sin distracciones | Nada parpadea; las animaciones son sutiles y se desactivan con `prefers-reduced-motion` |

---

## 🚀 Cómo usarlo

### Opción A — Directa (la más fácil)
1. Descarga los 3 archivos en una misma carpeta.
2. Haz doble clic en **`index.html`**.
3. ¡Listo! Funciona sin internet.

### Opción B — Servidor local (opcional)
```bash
# Desde la carpeta del proyecto, con Python:
python -m http.server 8000
# o con Node:
npx serve .
```
Abre `http://localhost:8000` en tu navegador.

---

## 🧰 Tecnologías

- **HTML5** — estructura semántica y accesible (`aria-live`, `role`, etc.)
- **CSS3** — diseño responsive, gradientes, `prefers-reduced-motion`
- **JavaScript (vanilla)** — lógica de conversión y eventos
- **Web Speech API** — lectura en voz alta en español

---

## 🚧 Ideas para el futuro

- [ ] Modo oscuro de alto contraste
- [ ] Grados Réaumur y Rankine
- [ ] Historial de conversiones recientes
- [ ] Selección de voz o velocidad de lectura
- [ ] Versión en otros idiomas

---

## 👤 Autor

**Oscar Ivan Vargas Pineda** — proyecto asistido por IA.

---

## 📄 Licencia

MIT — úsalo, modifícalo y compártelo libremente.

---

*Hecho con ❤️ para que la temperatura se entienda a cualquier edad.*