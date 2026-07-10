import React, { useState, useEffect, useRef } from "react";
import { Shuffle, Heart, ShoppingCart, Clock, Users, X, Check, ChefHat, Search, Trash2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Datos: almuerzos colombianos sencillos del día a día
// ---------------------------------------------------------------------------
const RECETAS = [
  {
    id: "arroz-pollo",
    nombre: "Arroz con pollo casero",
    tiempo: 35,
    porciones: 4,
    tags: ["con-pollo", "economico"],
    ingredientes: ["Pollo", "Arroz", "Cebolla", "Tomate", "Ajo", "Zanahoria", "Color/achiote"],
    pasos: [
      "Sofríe cebolla, tomate y ajo picados en un poco de aceite con color.",
      "Agrega el pollo en presas y dora por ambos lados.",
      "Añade el arroz, la zanahoria en cubos y el agua caliente (doble de agua que de arroz).",
      "Tapa y cocina a fuego bajo 20 minutos hasta que el arroz esté listo.",
    ],
  },
  {
    id: "sudado-pollo",
    nombre: "Sudado de pollo con papa",
    tiempo: 30,
    porciones: 4,
    tags: ["con-pollo", "rapido"],
    ingredientes: ["Pollo", "Papa", "Tomate", "Cebolla larga", "Ajo", "Color/achiote", "Arroz"],
    pasos: [
      "Haz un guiso con cebolla, tomate y ajo picados.",
      "Agrega el pollo y sella por unos minutos.",
      "Suma la papa en trozos y un poco de agua, tapa y cocina 20 minutos.",
      "Sirve con arroz blanco.",
    ],
  },
  {
    id: "frijoles",
    nombre: "Frijoles antioqueños con arroz",
    tiempo: 90,
    porciones: 6,
    tags: ["vegetariano-opcional", "economico"],
    ingredientes: ["Fríjol cargamanto", "Plátano verde", "Cebolla", "Tomate", "Ajo", "Color/achiote", "Arroz"],
    pasos: [
      "Remoja los fríjoles la noche anterior si puedes.",
      "Cocina en olla a presión con plátano verde en trozos hasta ablandar (35-40 min).",
      "Aparte, haz un guiso con cebolla, tomate y ajo y mézclalo con los fríjoles.",
      "Deja hervir 15 minutos más y sirve con arroz.",
    ],
  },
  {
    id: "lentejas",
    nombre: "Lentejas guisadas",
    tiempo: 40,
    porciones: 4,
    tags: ["vegetariano", "rapido", "economico"],
    ingredientes: ["Lentejas", "Zanahoria", "Cebolla", "Tomate", "Ajo", "Papa", "Arroz"],
    pasos: [
      "Lava las lentejas y ponlas a cocinar en agua.",
      "Cuando estén a medio cocinar, agrega papa y zanahoria en cubos.",
      "Aparte prepara un guiso de cebolla, tomate y ajo y mézclalo con las lentejas.",
      "Cocina 15 minutos más hasta espesar y sirve con arroz.",
    ],
  },
  {
    id: "bandeja",
    nombre: "Bandeja paisa sencilla",
    tiempo: 60,
    porciones: 4,
    tags: ["con-carne", "con-cerdo"],
    ingredientes: ["Fríjoles", "Arroz", "Carne molida", "Chicharrón", "Huevo", "Plátano maduro", "Aguacate"],
    pasos: [
      "Prepara fríjoles y arroz (puedes usar fríjoles del día anterior).",
      "Fríe la carne molida sazonada y el chicharrón.",
      "Fríe un huevo y el plátano maduro en tajadas.",
      "Sirve todo junto con tajadas de aguacate.",
    ],
  },
  {
    id: "ajiaco",
    nombre: "Ajiaco bogotano exprés",
    tiempo: 50,
    porciones: 4,
    tags: ["con-pollo", "sopa"],
    ingredientes: ["Pollo", "Papa criolla", "Papa pastusa", "Mazorca", "Guascas", "Cebolla", "Ajo"],
    pasos: [
      "Cocina el pollo con cebolla y ajo hasta que esté tierno; desmecha.",
      "En el mismo caldo agrega las papas en trozos y la mazorca.",
      "Cocina hasta que la papa criolla se deshaga y espese el caldo.",
      "Agrega las guascas los últimos 5 minutos y sirve con crema y alcaparras.",
    ],
  },
  {
    id: "huevos-pericos",
    nombre: "Huevos pericos con arroz y arepa",
    tiempo: 15,
    porciones: 2,
    tags: ["vegetariano", "rapido", "economico"],
    ingredientes: ["Huevos", "Tomate", "Cebolla larga", "Arroz", "Arepa"],
    pasos: [
      "Sofríe cebolla larga y tomate picados finamente.",
      "Agrega los huevos batidos y revuelve a fuego medio.",
      "Sirve caliente con arroz blanco y arepa.",
    ],
  },
  {
    id: "tallarines",
    nombre: "Tallarines con carne molida",
    tiempo: 25,
    porciones: 4,
    tags: ["con-carne", "rapido"],
    ingredientes: ["Pasta", "Carne molida", "Tomate", "Cebolla", "Ajo", "Salsa de tomate"],
    pasos: [
      "Cocina la pasta en agua con sal.",
      "Sofríe cebolla, ajo y tomate; agrega la carne molida y dora.",
      "Añade salsa de tomate y deja hervir 10 minutos.",
      "Mezcla con la pasta escurrida y sirve.",
    ],
  },
  {
    id: "pechuga-plancha",
    nombre: "Pechuga a la plancha con ensalada",
    tiempo: 20,
    porciones: 2,
    tags: ["con-pollo", "rapido", "saludable"],
    ingredientes: ["Pechuga de pollo", "Lechuga", "Tomate", "Limón", "Arroz"],
    pasos: [
      "Sazona la pechuga con sal, limón y las especias que tengas.",
      "Cocina a la plancha 5-6 minutos por lado.",
      "Prepara una ensalada simple de lechuga y tomate.",
      "Sirve con arroz blanco.",
    ],
  },
  {
    id: "arroz-huevo",
    nombre: "Arroz con huevo y plátano",
    tiempo: 15,
    porciones: 2,
    tags: ["vegetariano", "rapido", "economico"],
    ingredientes: ["Arroz", "Huevos", "Plátano maduro"],
    pasos: [
      "Fríe el plátano maduro en tajadas.",
      "Fríe o revuelve los huevos a tu gusto.",
      "Sirve todo sobre una porción de arroz blanco.",
    ],
  },
  {
    id: "carne-guisada",
    nombre: "Carne guisada con papa",
    tiempo: 45,
    porciones: 4,
    tags: ["con-carne"],
    ingredientes: ["Carne de res en trozos", "Papa", "Tomate", "Cebolla", "Ajo", "Color/achiote", "Arroz"],
    pasos: [
      "Sella la carne en trozos con sal y pimienta.",
      "Agrega cebolla, tomate y ajo picados y sofríe.",
      "Añade agua y cocina tapado 25 minutos hasta ablandar.",
      "Suma la papa en trozos y cocina 15 minutos más. Sirve con arroz.",
    ],
  },
  {
    id: "pescado-frito",
    nombre: "Pescado frito con patacón",
    tiempo: 35,
    porciones: 2,
    tags: ["con-pescado"],
    ingredientes: ["Pescado", "Plátano verde", "Limón", "Ajo", "Ensalada"],
    pasos: [
      "Marina el pescado con limón, sal y ajo.",
      "Fríe el pescado hasta dorar por ambos lados.",
      "Aplasta y fríe el plátano verde para hacer los patacones.",
      "Sirve con ensalada fresca.",
    ],
  },
  {
    id: "chuleta-cerdo",
    nombre: "Chuleta de cerdo con arroz",
    tiempo: 30,
    porciones: 4,
    tags: ["con-cerdo"],
    ingredientes: ["Chuleta de cerdo", "Ajo", "Limón", "Arroz", "Ensalada"],
    pasos: [
      "Marina la chuleta con ajo, limón, sal y pimienta.",
      "Cocina a la plancha o al horno hasta dorar.",
      "Sirve con arroz blanco y ensalada.",
    ],
  },
  {
    id: "espagueti-atun",
    nombre: "Espagueti con atún",
    tiempo: 20,
    porciones: 3,
    tags: ["con-pescado", "rapido", "economico"],
    ingredientes: ["Pasta", "Atún en lata", "Tomate", "Cebolla", "Ajo"],
    pasos: [
      "Cocina la pasta en agua con sal.",
      "Sofríe cebolla, ajo y tomate; agrega el atún escurrido.",
      "Mezcla con la pasta y sirve caliente.",
    ],
  },
  {
    id: "sopa-verduras",
    nombre: "Sopa de verduras con costilla",
    tiempo: 50,
    porciones: 4,
    tags: ["sopa", "con-carne"],
    ingredientes: ["Costilla de res", "Papa", "Zanahoria", "Arracacha", "Cebolla", "Cilantro"],
    pasos: [
      "Cocina la costilla en agua con cebolla hasta ablandar.",
      "Agrega papa, zanahoria y arracacha en trozos.",
      "Cocina 20 minutos más hasta que las verduras estén blandas.",
      "Rectifica sal y termina con cilantro fresco.",
    ],
  },
  {
    id: "arroz-atollado",
    nombre: "Arroz atollado sencillo",
    tiempo: 40,
    porciones: 4,
    tags: ["con-cerdo", "con-pollo"],
    ingredientes: ["Arroz", "Costilla de cerdo", "Papa", "Cebolla", "Tomate", "Color/achiote"],
    pasos: [
      "Sofríe cebolla, tomate y color; agrega la costilla y dora.",
      "Añade agua y cocina hasta que la carne esté tierna.",
      "Agrega el arroz y la papa en cubos pequeños.",
      "Cocina a fuego bajo, revolviendo, hasta que quede meloso.",
    ],
  },
];

const TODOS_LOS_INGREDIENTES = [...new Set(RECETAS.flatMap((r) => r.ingredientes))].sort();

const TAGS = [
  { id: "rapido", label: "Rápido" },
  { id: "economico", label: "Económico" },
  { id: "vegetariano", label: "Vegetariano" },
  { id: "con-pollo", label: "Con pollo" },
  { id: "con-carne", label: "Con carne" },
  { id: "con-cerdo", label: "Con cerdo" },
  { id: "con-pescado", label: "Con pescado" },
  { id: "sopa", label: "Sopa" },
];

// ---------------------------------------------------------------------------

export default function App() {
  const [vista, setVista] = useState("inicio"); // inicio | favoritos | mercado
  const [ingredientesTengo, setIngredientesTengo] = useState([]);
  const [tagsActivos, setTagsActivos] = useState([]);
  const [buscarIngrediente, setBuscarIngrediente] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [recetaActual, setRecetaActual] = useState(null);
  const [girando, setGirando] = useState(false);
  const [nombrePreview, setNombrePreview] = useState("");

  const [favoritos, setFavoritos] = useState([]);
  const [mercado, setMercado] = useState({}); // { ingrediente: boolean(comprado) }
  const [cargado, setCargado] = useState(false);
  const intervalRef = useRef(null);

  // Cargar datos persistidos (guardados en este dispositivo/navegador)
  useEffect(() => {
    try {
      const fav = localStorage.getItem("almuerzo-favoritos");
      if (fav) setFavoritos(JSON.parse(fav));
    } catch (e) {}
    try {
      const mer = localStorage.getItem("almuerzo-mercado");
      if (mer) setMercado(JSON.parse(mer));
    } catch (e) {}
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem("almuerzo-favoritos", JSON.stringify(favoritos));
    } catch (e) {}
  }, [favoritos, cargado]);

  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem("almuerzo-mercado", JSON.stringify(mercado));
    } catch (e) {}
  }, [mercado, cargado]);

  function recetasFiltradas() {
    return RECETAS.filter((r) => {
      const cumpleTags = tagsActivos.length === 0 || tagsActivos.every((t) => r.tags.includes(t));
      const cumpleIngredientes =
        ingredientesTengo.length === 0 ||
        ingredientesTengo.some((i) => r.ingredientes.includes(i));
      return cumpleTags && cumpleIngredientes;
    });
  }

  function sugerir() {
    const pool = recetasFiltradas();
    const usar = pool.length > 0 ? pool : RECETAS;
    if (girando) return;
    setGirando(true);
    let count = 0;
    intervalRef.current = setInterval(() => {
      const r = usar[Math.floor(Math.random() * usar.length)];
      setNombrePreview(r.nombre);
      count++;
      if (count > 10) {
        clearInterval(intervalRef.current);
        const final = usar[Math.floor(Math.random() * usar.length)];
        setRecetaActual(final);
        setGirando(false);
      }
    }, 90);
  }

  function toggleFavorito(receta) {
    setFavoritos((prev) =>
      prev.some((f) => f.id === receta.id)
        ? prev.filter((f) => f.id !== receta.id)
        : [...prev, receta]
    );
  }

  function agregarAlMercado(receta) {
    setMercado((prev) => {
      const copia = { ...prev };
      receta.ingredientes.forEach((ing) => {
        if (!(ing in copia)) copia[ing] = false;
      });
      return copia;
    });
  }

  function toggleIngrediente(ing) {
    setIngredientesTengo((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  }

  function toggleTag(tag) {
    setTagsActivos((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  const esFavorito = recetaActual && favoritos.some((f) => f.id === recetaActual.id);
  const ingredientesFiltrados = TODOS_LOS_INGREDIENTES.filter((i) =>
    i.toLowerCase().includes(buscarIngrediente.toLowerCase())
  );
  const itemsMercado = Object.keys(mercado);

  return (
    <div className="min-h-screen w-full flex items-start justify-center py-6 px-3" style={{ background: "#EFE7D2" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes spinPlate { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(8deg) scale(1.02); } 100% { transform: rotate(0deg) scale(1); } }
        .spinning { animation: spinPlate 0.18s ease-in-out infinite; }
        @keyframes popIn { from { opacity: 0; transform: translateY(6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .pop-in { animation: popIn 0.35s ease-out; }
      `}</style>

      {/* Marco tipo teléfono */}
      <div
        className="w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px]"
        style={{ background: "#FFFDF7", borderColor: "#2B211B", minHeight: "780px" }}
      >
        {/* Notch */}
        <div className="flex justify-center pt-2 pb-1" style={{ background: "#2B211B" }}>
          <div className="w-24 h-4 rounded-full" style={{ background: "#2B211B" }} />
        </div>

        {/* Header */}
        <div className="px-5 pt-5 pb-4" style={{ background: "#2B211B" }}>
          <div className="flex items-center gap-2">
            <ChefHat size={22} color="#D9A441" />
            <h1 className="font-display text-2xl" style={{ color: "#FBF6E9" }}>
              ¿Qué almuerzo hago hoy?
            </h1>
          </div>
          <p className="font-body text-xs mt-1" style={{ color: "#C9BFAE" }}>
            Recetas sencillas para el día a día en Colombia
          </p>
        </div>

        {/* Contenido */}
        <div className="px-5 pb-24 pt-5" style={{ minHeight: "560px" }}>
          {vista === "inicio" && (
            <>
              {/* Botón principal */}
              <button
                onClick={sugerir}
                disabled={girando}
                className="w-full rounded-2xl py-4 flex items-center justify-center gap-2 font-body font-semibold text-base shadow-md active:scale-[0.98] transition-transform"
                style={{ background: "#C1432E", color: "#FFFDF7" }}
              >
                <Shuffle size={18} />
                {girando ? "Pensando..." : "Sugiéreme algo"}
              </button>

              {/* Filtros toggle */}
              <button
                onClick={() => setMostrarFiltros((v) => !v)}
                className="w-full mt-3 text-sm font-body font-medium flex items-center justify-center gap-1"
                style={{ color: "#4C6444" }}
              >
                {mostrarFiltros ? "Ocultar filtros" : "Filtrar por ingredientes o tipo"}
                {(ingredientesTengo.length > 0 || tagsActivos.length > 0) && (
                  <span
                    className="font-mono text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ background: "#D9A441", color: "#2B211B" }}
                  >
                    {ingredientesTengo.length + tagsActivos.length}
                  </span>
                )}
              </button>

              {mostrarFiltros && (
                <div className="mt-3 rounded-2xl p-4 pop-in" style={{ background: "#F4EEDD" }}>
                  <p className="font-body text-xs font-semibold mb-2" style={{ color: "#2B211B" }}>
                    Tipo de almuerzo
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {TAGS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => toggleTag(t.id)}
                        className="text-xs font-body px-2.5 py-1 rounded-full border"
                        style={
                          tagsActivos.includes(t.id)
                            ? { background: "#4C6444", color: "#FFFDF7", borderColor: "#4C6444" }
                            : { background: "transparent", color: "#4C6444", borderColor: "#4C6444" }
                        }
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <p className="font-body text-xs font-semibold mb-2" style={{ color: "#2B211B" }}>
                    Ingredientes que tienes
                  </p>
                  <div className="relative mb-2">
                    <Search size={14} className="absolute left-2 top-2.5" style={{ color: "#8A8071" }} />
                    <input
                      value={buscarIngrediente}
                      onChange={(e) => setBuscarIngrediente(e.target.value)}
                      placeholder="Buscar ingrediente..."
                      className="w-full text-xs font-body pl-7 pr-2 py-2 rounded-lg border outline-none"
                      style={{ borderColor: "#D9CFB8", background: "#FFFDF7" }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {ingredientesFiltrados.map((ing) => (
                      <button
                        key={ing}
                        onClick={() => toggleIngrediente(ing)}
                        className="text-xs font-body px-2.5 py-1 rounded-full border"
                        style={
                          ingredientesTengo.includes(ing)
                            ? { background: "#D9A441", color: "#2B211B", borderColor: "#D9A441" }
                            : { background: "transparent", color: "#8A8071", borderColor: "#D9CFB8" }
                        }
                      >
                        {ing}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tarjeta de receta */}
              <div
                className={`mt-4 rounded-2xl p-5 border ${girando ? "spinning" : "pop-in"}`}
                style={{ background: "#FFFDF7", borderColor: "#E8DFC8", minHeight: "220px" }}
              >
                {!recetaActual && !girando && (
                  <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                    <ChefHat size={28} style={{ color: "#D9CFB8" }} />
                    <p className="font-body text-sm mt-2" style={{ color: "#8A8071" }}>
                      Toca "Sugiéreme algo" y te decimos qué preparar hoy.
                    </p>
                  </div>
                )}

                {girando && (
                  <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                    <p className="font-display text-lg" style={{ color: "#2B211B" }}>
                      {nombrePreview}
                    </p>
                  </div>
                )}

                {recetaActual && !girando && (
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-display text-xl leading-snug" style={{ color: "#2B211B" }}>
                        {recetaActual.nombre}
                      </h2>
                      <button onClick={() => toggleFavorito(recetaActual)} className="shrink-0 mt-1">
                        <Heart
                          size={20}
                          fill={esFavorito ? "#C1432E" : "none"}
                          color={esFavorito ? "#C1432E" : "#8A8071"}
                        />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-2 font-mono text-[11px]" style={{ color: "#8A8071" }}>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {recetaActual.tiempo} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {recetaActual.porciones} porciones
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {recetaActual.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-body px-2 py-0.5 rounded-full"
                          style={{ background: "#F4EEDD", color: "#4C6444" }}
                        >
                          {TAGS.find((x) => x.id === t)?.label || t}
                        </span>
                      ))}
                    </div>

                    <p className="font-body text-xs font-semibold mt-4 mb-1" style={{ color: "#2B211B" }}>
                      Ingredientes
                    </p>
                    <ul className="font-body text-sm space-y-0.5" style={{ color: "#4A4136" }}>
                      {recetaActual.ingredientes.map((ing) => (
                        <li key={ing}>• {ing}</li>
                      ))}
                    </ul>

                    <p className="font-body text-xs font-semibold mt-4 mb-1" style={{ color: "#2B211B" }}>
                      Preparación
                    </p>
                    <ol className="font-body text-sm space-y-1.5" style={{ color: "#4A4136" }}>
                      {recetaActual.pasos.map((paso, idx) => (
                        <li key={idx}>
                          <span className="font-mono text-[11px]" style={{ color: "#C1432E" }}>
                            {idx + 1}.{" "}
                          </span>
                          {paso}
                        </li>
                      ))}
                    </ol>

                    <button
                      onClick={() => agregarAlMercado(recetaActual)}
                      className="w-full mt-4 rounded-xl py-2.5 flex items-center justify-center gap-2 font-body text-sm font-semibold"
                      style={{ background: "#4C6444", color: "#FFFDF7" }}
                    >
                      <ShoppingCart size={15} />
                      Agregar a lista de mercado
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {vista === "favoritos" && (
            <div className="pop-in">
              <h2 className="font-display text-lg mb-3" style={{ color: "#2B211B" }}>
                Tus favoritos
              </h2>
              {favoritos.length === 0 && (
                <p className="font-body text-sm" style={{ color: "#8A8071" }}>
                  Aún no has guardado ningún almuerzo. Toca el corazón en una receta para guardarla aquí.
                </p>
              )}
              <div className="space-y-2">
                {favoritos.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-xl p-3 border flex items-center justify-between gap-2"
                    style={{ background: "#FFFDF7", borderColor: "#E8DFC8" }}
                  >
                    <button
                      className="text-left flex-1"
                      onClick={() => {
                        setRecetaActual(r);
                        setVista("inicio");
                      }}
                    >
                      <p className="font-body text-sm font-semibold" style={{ color: "#2B211B" }}>
                        {r.nombre}
                      </p>
                      <p className="font-mono text-[10px]" style={{ color: "#8A8071" }}>
                        {r.tiempo} min · {r.porciones} porciones
                      </p>
                    </button>
                    <button onClick={() => toggleFavorito(r)}>
                      <Heart size={18} fill="#C1432E" color="#C1432E" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {vista === "mercado" && (
            <div className="pop-in">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-lg" style={{ color: "#2B211B" }}>
                  Lista de mercado
                </h2>
                {itemsMercado.length > 0 && (
                  <button
                    onClick={() => setMercado({})}
                    className="text-xs font-body flex items-center gap-1"
                    style={{ color: "#C1432E" }}
                  >
                    <Trash2 size={12} /> Vaciar
                  </button>
                )}
              </div>
              {itemsMercado.length === 0 && (
                <p className="font-body text-sm" style={{ color: "#8A8071" }}>
                  Cuando agregues una receta a tu lista, los ingredientes aparecerán aquí.
                </p>
              )}
              <div className="space-y-1.5">
                {itemsMercado.map((ing) => (
                  <button
                    key={ing}
                    onClick={() => setMercado((prev) => ({ ...prev, [ing]: !prev[ing] }))}
                    className="w-full flex items-center gap-2 rounded-lg p-2.5 border text-left"
                    style={{ background: "#FFFDF7", borderColor: "#E8DFC8" }}
                  >
                    <span
                      className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0"
                      style={
                        mercado[ing]
                          ? { background: "#4C6444", borderColor: "#4C6444" }
                          : { borderColor: "#D9CFB8" }
                      }
                    >
                      {mercado[ing] && <Check size={13} color="#FFFDF7" />}
                    </span>
                    <span
                      className="font-body text-sm"
                      style={{
                        color: mercado[ing] ? "#8A8071" : "#2B211B",
                        textDecoration: mercado[ing] ? "line-through" : "none",
                      }}
                    >
                      {ing}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Barra de navegación inferior */}
        <div
          className="fixed-bottom-nav flex items-center justify-around py-3 border-t"
          style={{
            background: "#FFFDF7",
            borderColor: "#E8DFC8",
            position: "relative",
            marginTop: "-72px",
          }}
        >
          {[
            { id: "inicio", label: "Inicio", icon: Shuffle },
            { id: "favoritos", label: "Favoritos", icon: Heart },
            { id: "mercado", label: "Mercado", icon: ShoppingCart },
          ].map((tab) => {
            const Icon = tab.icon;
            const activo = vista === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setVista(tab.id)}
                className="flex flex-col items-center gap-0.5 px-3"
              >
                <Icon size={18} color={activo ? "#C1432E" : "#8A8071"} fill={tab.id === "favoritos" && activo ? "#C1432E" : "none"} />
                <span
                  className="font-body text-[10px] font-medium"
                  style={{ color: activo ? "#C1432E" : "#8A8071" }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
