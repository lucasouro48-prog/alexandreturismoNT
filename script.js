/* script.js
   Tradução, geração dinâmica de rotas, transferência galeria->reserva e WhatsApp
*/

const WHATSAPP_NUMBER = "5584991694313"; // 55 + DDD 84 + telefone 991694313

/* --- Dados das rotas (cada rota tem pelo menos 5 imagens e textos para tradução) --- */
const routes = [
  {
    id: "litoral sul" ,
    images: [
      "https://media-cdn.tripadvisor.com/media/photo-s/1b/81/d4/68/pipatrip21.jpg",
    ],
    price: "Sob consulta"
  },
  {
    id: "litoral norte",
    images: [
      "https://tse1.mm.bing.net/th/id/OIP.VjJ-ZuJ-9Nfu4LbzTyfjBgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
    ],
    price: "Sob consulta"
  },
  {
    id: "passeio das aguas",
    images: [
      "https://tokdehistoria.files.wordpress.com/2021/07/barreira-do-inferno1.png?w=639",
     
    ],
    price: "Sob consulta"
  }
];

/* --- Traduções básicas (pode ser ampliado) --- */
const translations = {
  "pt-BR": {
    langLabel: "Português (BR)",
    "nav.home":"Início","nav.gallery":"Galeria","nav.reserve":"Reserva",
    "hero.title":"Viva experiências únicas com Alexandre Turismo",
    "hero.subtitle":"Passeios personalizados, guias experientes e horários flexíveis.",
    "hero.cta":"Ver passeios","hero.whatsapp":"Reservar via WhatsApp",
    "highlights.expert":"Guias experientes","highlights.personalized":"Roteiros personalizados para todos os gostos.",
    "highlights.safe":"Segurança","highlights.flexible":"Transporte seguro e horários flexíveis.",
    "highlights.support":"Suporte","highlights.supportText":"Atendimento via WhatsApp e e-mail.",
    "preview.title":"Passeios em destaque",
    "gallery.title":"Galeria de Passeios","gallery.intro":"Escolha uma rota para ver imagens detalhadas e reservar.",
    "reserve.title":"Fazer Reserva","reserve.routeLabel":"Rota","reserve.date":"Data","reserve.time":"Horário","reserve.qty":"Quantidade de pessoas","reserve.names":"Nome(s)","reserve.submit":"Confirmar e Enviar WhatsApp","reserve.back":"Voltar para Galeria",
    "footer.rights":"Todos os direitos reservados",
    "preview.book":"Reservar",
    "route.praia-sunset.name":"Passeio Praia ao Pôr-do-sol",
    "route.praia-sunset.desc":"Passeio tranquilo para aproveitar o pôr-do-sol, banho de mar e guias locais.",
    "route.ilha-explorar.name":"Ilha Explorar",
    "route.ilha-explorar.desc":"Passeio de barco com paradas para snorkel e almoço a bordo.",
    "route.trilha-ecologica.name":"Trilha Ecológica",
    "route.trilha-ecologica.desc":"Caminhada guiada por trilhas naturais e observação da fauna e flora."
  },
  "en": {
    langLabel: "English",
    "nav.home":"Home","nav.gallery":"Gallery","nav.reserve":"Reserve",
    "hero.title":"Live unique experiences with Alexandre Turismo",
    "hero.subtitle":"Personalized tours, experienced guides and flexible schedules.",
    "hero.cta":"See tours","hero.whatsapp":"Book via WhatsApp",
    "highlights.expert":"Experienced guides","highlights.personalized":"Personalized itineraries for every taste.",
    "highlights.safe":"Safety","highlights.flexible":"Secure transport and flexible times.",
    "highlights.support":"Support","highlights.supportText":"Support via WhatsApp and email.",
    "preview.title":"Featured tours",
    "gallery.title":"Tours Gallery","gallery.intro":"Pick a route to view images and reserve.",
    "reserve.title":"Make a Reservation","reserve.routeLabel":"Route","reserve.date":"Date","reserve.time":"Time","reserve.qty":"Number of people","reserve.names":"Name(s)","reserve.submit":"Confirm and Send WhatsApp","reserve.back":"Back to Gallery",
    "footer.rights":"All rights reserved",
    "preview.book":"Book now",
    "route.praia-sunset.name":"Sunset Beach Tour",
    "route.praia-sunset.desc":"Relaxed tour to enjoy the sunset, sea bath and local guides.",
    "route.ilha-explorar.name":"Explore Island",
    "route.ilha-explorar.desc":"Boat trip with snorkel stops and lunch onboard.",
    "route.trilha-ecologica.name":"Eco Trail",
    "route.trilha-ecologica.desc":"Guided hike through natural trails with wildlife observation."
  },
  "de": {
    langLabel:"Deutsch",
    "nav.home":"Start","nav.gallery":"Galerie","nav.reserve":"Reservieren",
    "hero.title":"Erleben Sie einzigartige Abenteuer mit Alexandre Turismo",
    "hero.subtitle":"Personalisierte Touren, erfahrene Guides und flexible Zeiten.",
    "hero.cta":"Touren ansehen","hero.whatsapp":"Per WhatsApp buchen",
    "highlights.expert":"Erfahrene Guides","highlights.personalized":"Individuelle Routen für jeden Geschmack.",
    "highlights.safe":"Sicherheit","highlights.flexible":"Sicherer Transport und flexible Zeiten.",
    "highlights.support":"Support","highlights.supportText":"Support via WhatsApp und E-Mail.",
    "preview.title":"Empfohlene Touren",
    "gallery.title":"Touren Galerie","gallery.intro":"Wählen Sie eine Route, um Bilder zu sehen und zu reservieren.",
    "reserve.title":"Reservierung","reserve.routeLabel":"Route","reserve.date":"Datum","reserve.time":"Uhrzeit","reserve.qty":"Personenanzahl","reserve.names":"Name(n)","reserve.submit":"Bestätigen und WhatsApp senden","reserve.back":"Zur Galerie",
    "footer.rights":"Alle Rechte vorbehalten",
    "preview.book":"Buchen",
    "route.praia-sunset.name":"Strand Sonnenuntergangstour",
    "route.praia-sunset.desc":"Entspannte Tour, um den Sonnenuntergang zu genießen.",
    "route.ilha-explorar.name":"Insel Erforschen",
    "route.ilha-explorar.desc":"Bootstour mit Schnorchelpausen und Mittagessen an Bord.",
    "route.trilha-ecologica.name":"Öko Wanderung",
    "route.trilha-ecologica.desc":"Geführte Wanderung durch Naturpfade."
  },
  "fr": {
    langLabel:"Français",
    "nav.home":"Accueil","nav.gallery":"Galerie","nav.reserve":"Réserver",
    "hero.title":"Vivez des expériences uniques avec Alexandre Turismo",
    "hero.subtitle":"Tours personnalisés, guides expérimentés et horaires flexibles.",
    "hero.cta":"Voir les tours","hero.whatsapp":"Réserver via WhatsApp",
    "highlights.expert":"Guides expérimentés","highlights.personalized":"Itinéraires personnalisés pour tous les goûts.",
    "highlights.safe":"Sécurité","highlights.flexible":"Transport sécurisé et horaires flexibles.",
    "highlights.support":"Support","highlights.supportText":"Support via WhatsApp et e-mail.",
    "preview.title":"Tours en vedette",
    "gallery.title":"Galerie de Tours","gallery.intro":"Choisissez une route pour voir des images et réserver.",
    "reserve.title":"Faire une réservation","reserve.routeLabel":"Route","reserve.date":"Date","reserve.time":"Heure","reserve.qty":"Nombre de personnes","reserve.names":"Nom(s)","reserve.submit":"Confirmer et envoyer WhatsApp","reserve.back":"Retour à la Galerie",
    "footer.rights":"Tous droits réservés",
    "preview.book":"Réserver",
    "route.praia-sunset.name":"Tour Plage Couché de Soleil",
    "route.praia-sunset.desc":"Tour relax pour profiter du coucher du soleil.",
    "route.ilha-explorar.name":"Explorer l'île",
    "route.ilha-explorar.desc":"Excursion en bateau avec snorkel et déjeuner à bord.",
    "route.trilha-ecologica.name":"Sentier Écologique",
    "route.trilha-ecologica.desc":"Randonnée guidée à travers la nature."
  },
  "zh": {
    langLabel:"中文 (简体)",
    "nav.home":"首页","nav.gallery":"画廊","nav.reserve":"预定",
    "hero.title":"与 Alexandre Turismo 一起体验独特之旅",
    "hero.subtitle":"个性化行程、经验丰富的导游和灵活的时间。",
    "hero.cta":"查看行程","hero.whatsapp":"通过 WhatsApp 预订",
    "highlights.expert":"经验丰富的导游","highlights.personalized":"为各种喜好定制行程。",
    "highlights.safe":"安全","highlights.flexible":"安全交通和灵活时间。",
    "highlights.support":"支持","highlights.supportText":"通过 WhatsApp 和电子邮件提供支持。",
    "preview.title":"特色行程",
    "gallery.title":"行程画廊","gallery.intro":"选择一个路线查看图片并预订。",
    "reserve.title":"预定","reserve.routeLabel":"路线","reserve.date":"日期","reserve.time":"时间","reserve.qty":"人数","reserve.names":"姓名","reserve.submit":"确认并发送 WhatsApp","reserve.back":"返回画廊",
    "footer.rights":"版权所有",
    "preview.book":"预订",
    "route.praia-sunset.name":"海滩日落之旅",
    "route.praia-sunset.desc":"享受日落、海水浴和当地向导的轻松之旅。",
    "route.ilha-explorar.name":"岛屿探索",
    "route.ilha-explorar.desc":"船游，停靠浮潜并提供船上午餐。",
    "route.trilha-ecologica.name":"生态徒步",
    "route.trilha-ecologica.desc":"自然步道的导览徒步，观察动植物。"
  },
  "ru": {
    langLabel:"Русский",
    "nav.home":"Главная","nav.gallery":"Галерея","nav.reserve":"Бронирование",
    "hero.title":"Незабываемые впечатления с Alexandre Turismo",
    "hero.subtitle":"Индивидуальные туры, опытные гиды и гибкое расписание.",
    "hero.cta":"Посмотреть туры","hero.whatsapp":"Забронировать через WhatsApp",
    "highlights.expert":"Опытные гиды","highlights.personalized":"Маршруты на любой вкус.",
    "highlights.safe":"Безопасность","highlights.flexible":"Безопасный транспорт и гибкое время.",
    "highlights.support":"Поддержка","highlights.supportText":"Поддержка через WhatsApp и e-mail.",
    "preview.title":"Рекомендуемые туры",
    "gallery.title":"Галерея туров","gallery.intro":"Выберите маршрут, чтобы просмотреть фото и забронировать.",
    "reserve.title":"Бронирование","reserve.routeLabel":"Маршрут","reserve.date":"Дата","reserve.time":"Время","reserve.qty":"Количество людей","reserve.names":"Имя(а)","reserve.submit":"Подтвердить и отправить в WhatsApp","reserve.back":"Назад в галерею",
    "footer.rights":"Все права защищены",
    "preview.book":"Забронировать",
    "route.praia-sunset.name":"Поездка на пляж на закате",
    "route.praia-sunset.desc":"Расслабляющая поездка, чтобы полюбоваться закатом.",
    "route.ilha-explorar.name":"Исследование острова",
    "route.ilha-explorar.desc":"Поездка на лодке с остановками для снорклинга и обедом на борту.",
    "route.trilha-ecologica.name":"Эко-трек",
    "route.trilha-ecologica.desc":"Пешая экскурсия по природным тропам."
  },
  "pt-PT": {
    langLabel:"Português (PT)",
    "nav.home":"Início","nav.gallery":"Galeria","nav.reserve":"Reserva",
    "hero.title":"Viva experiências únicas com Alexandre Turismo",
    "hero.subtitle":"Passeios personalizados, guias experientes e horários flexíveis.",
    "hero.cta":"Ver passeios","hero.whatsapp":"Reservar via WhatsApp",
    "highlights.expert":"Guias experientes","highlights.personalized":"Roteiros personalizados para todos os gostos.",
    "highlights.safe":"Segurança","highlights.flexible":"Transporte seguro e horários flexíveis.",
    "highlights.support":"Apoio","highlights.supportText":"Atendimento via WhatsApp e e-mail.",
    "preview.title":"Passeios em destaque",
    "gallery.title":"Galeria de Passeios","gallery.intro":"Escolha uma rota para ver imagens detalhadas e reservar.",
    "reserve.title":"Fazer Reserva","reserve.routeLabel":"Rota","reserve.date":"Data","reserve.time":"Hora","reserve.qty":"Número de pessoas","reserve.names":"Nome(s)","reserve.submit":"Confirmar e Enviar WhatsApp","reserve.back":"Voltar para Galeria",
    "footer.rights":"Todos os direitos reservados",
    "preview.book":"Reservar",
    "route.praia-sunset.name":"Passeio Praia ao Pôr-do-sol",
    "route.praia-sunset.desc":"Passeio tranquilo para aproveitar o pôr-do-sol.",
    "route.ilha-explorar.name":"Ilha Explorar",
    "route.ilha-explorar.desc":"Passeio de barco com paragens para snorkel e almoço a bordo.",
    "route.trilha-ecologica.name":"Trilha Ecológica",
    "route.trilha-ecologica.desc":"Caminhada guiada por trilhos naturais."
  },
  "es": {
    langLabel:"Español",
    "nav.home":"Inicio","nav.gallery":"Galería","nav.reserve":"Reservar",
    "hero.title":"Vive experiencias únicas con Alexandre Turismo",
    "hero.subtitle":"Paseos personalizados, guías expertos y horarios flexibles.",
    "hero.cta":"Ver paseos","hero.whatsapp":"Reservar por WhatsApp",
    "highlights.expert":"Guías expertos","highlights.personalized":"Rutas personalizadas para todos los gustos.",
    "highlights.safe":"Seguridad","highlights.flexible":"Transporte seguro y horarios flexibles.",
    "highlights.support":"Soporte","highlights.supportText":"Atención por WhatsApp y correo electrónico.",
    "preview.title":"Paseos destacados",
    "gallery.title":"Galería de Paseos","gallery.intro":"Elige una ruta para ver imágenes y reservar.",
    "reserve.title":"Hacer Reserva","reserve.routeLabel":"Ruta","reserve.date":"Fecha","reserve.time":"Horario","reserve.qty":"Cantidad de personas","reserve.names":"Nombre(s)","reserve.submit":"Confirmar y Enviar WhatsApp","reserve.back":"Volver a la Galería",
    "footer.rights":"Todos los derechos reservados",
    "preview.book":"Reservar",
    "route.praia-sunset.name":"Paseo Playa al Atardecer",
    "route.praia-sunset.desc":"Paseo tranquilo para disfrutar del atardecer.",
    "route.ilha-explorar.name":"Isla Explorar",
    "route.ilha-explorar.desc":"Excursión en barco con paradas para snorkel y almuerzo a bordo.",
    "route.trilha-ecologica.name":"Sendero Ecológico",
    "route.trilha-ecologica.desc":"Caminata guiada por senderos naturales."
  }
};

/* util para localizar strings */
function t(key, lang="pt-BR"){
  const dict = translations[lang] || translations["pt-BR"];
  return dict[key] || key;
}

/* popula selects de idioma */
function populateLangSelects(){
  const langs = Object.keys(translations);
  const selects = document.querySelectorAll("#langSelect, #langSelectTop, #langSelectReserve");
  selects.forEach(sel=>{
    sel.innerHTML = "";
    langs.forEach(code=>{
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = translations[code].langLabel || code;
      sel.appendChild(opt);
    });
    // sync selection if previously chosen
    const stored = localStorage.getItem("siteLang") || "pt-BR";
    sel.value = stored;
    sel.addEventListener("change", (e)=>{ setLanguage(e.target.value); });
  });
}

/* atualiza textos na página */
function applyTranslations(lang){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key, lang);
  });
  // placeholders e inputs se existirem
  const namesInput = document.getElementById("names");
  if(namesInput) namesInput.placeholder = t("reserve.names", lang);
}

/* monta preview na home */
function buildPreview(){
  const previewGrid = document.getElementById("previewGrid");
  if(!previewGrid) return;
  previewGrid.innerHTML = "";
  routes.forEach(route=>{
    const card = document.createElement("div");
    card.className = "route-card";
    const nameKey = `route.${route.id}.name`;
    const descKey = `route.${route.id}.desc`;
    const title = document.createElement("h3");
    title.textContent = t(nameKey, currentLang());
    const p = document.createElement("p");
    p.textContent = t(descKey, currentLang());
    const thumbs = document.createElement("div");
    thumbs.className = "thumbs";
    route.images.slice(0,4).forEach(src=>{
      const img = document.createElement("img");
      img.src = src;
      img.alt = title.textContent;
      img.loading = "lazy";
      thumbs.appendChild(img);
    });
    const btn = document.createElement("a");
    btn.className = "btn btn-primary";
    btn.textContent = t("preview.book", currentLang());
    btn.href = `reserva.html?route=${encodeURIComponent(route.id)}`;
    card.appendChild(title);
    card.appendChild(p);
    card.appendChild(thumbs);
    card.appendChild(btn);
    previewGrid.appendChild(card);
  });
}

/* monta lista de rotas na galeria */
function buildGallery(){
  const list = document.getElementById("routesList");
  if(!list) return;
  list.innerHTML = "";
  routes.forEach(route=>{
    const wrapper = document.createElement("div");
    wrapper.className = "route-card";
    const h = document.createElement("h3");
    h.textContent = t(`route.${route.id}.name`, currentLang());
    const p = document.createElement("p");
    p.textContent = t(`route.${route.id}.desc`, currentLang());
    const grid = document.createElement("div");
    grid.className = "thumbs";
    route.images.forEach(src=>{
      const img = document.createElement("img");
      img.src = src;
      img.alt = h.textContent;
      img.className = "route-grid-img";
      grid.appendChild(img);
    });
    const actions = document.createElement("div");
    actions.style.marginTop = "0.6rem";
    const btn = document.createElement("a");
    btn.href = `reserva.html?route=${encodeURIComponent(route.id)}`;
    btn.className = "btn btn-primary";
    btn.textContent = t("preview.book", currentLang());
    actions.appendChild(btn);
    wrapper.appendChild(h);
    wrapper.appendChild(p);
    wrapper.appendChild(grid);
    wrapper.appendChild(actions);
    list.appendChild(wrapper);
  });
}

/* pega linguagem atual (armazenada) */
function currentLang(){
  return localStorage.getItem("siteLang") || "pt-BR";
}
function setLanguage(lang){
  localStorage.setItem("siteLang", lang);
  // aplicar texto a todas as páginas
  applyTranslations(lang);
  // rebuild dynamic content with new language
  buildPreview();
  buildGallery();
  populateRouteSummary(); // se estiver na reserva
}

/* função para popular resumo da rota na página de reserva */
function populateRouteSummary(){
  const params = new URLSearchParams(location.search);
  const routeId = params.get("route");
  const summary = document.getElementById("routeSummary");
  const selectedRouteInput = document.getElementById("selectedRoute");
  if(!summary || !selectedRouteInput) return;
  const route = routes.find(r=>r.id === routeId) || routes[0];
  const title = t(`route.${route.id}.name`, currentLang());
  const desc = t(`route.${route.id}.desc`, currentLang());
  summary.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <div class="thumbs">
      ${route.images.slice(0,5).map(src=>`<img src="${src}" alt="${title}" loading="lazy" style="width:120px;height:70px;object-fit:cover;border-radius:6px;margin-right:.4rem">`).join("")}
    </div>
  `;
  selectedRouteInput.value = title;
}

/* montar botões WhatsApp flutuantes */
function setupWhatsAppButtons(){
  const messagePrefill = encodeURIComponent("Olá, gostaria de mais informações sobre os passeios e fazer uma reserva.");
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${messagePrefill}`;
  document.getElementById("floatingWhatsApp")?.setAttribute("href", waLink);
  document.getElementById("floatingWhatsApp2")?.setAttribute("href", waLink);
  document.getElementById("floatingWhatsApp3")?.setAttribute("href", waLink);
  // hero and CTA if exist
  document.getElementById("whatsapp-cta")?.addEventListener("click", (e)=>{
    e.preventDefault();
    window.open(waLink, "_blank");
  });
  // header buttons also set
  document.querySelectorAll(".floating-whatsapp, #whatsapp-cta").forEach(el=>{
    el.setAttribute("target","_blank");
    el.setAttribute("rel","noopener");
  });
}

/* ao submeter formulário de reserva: abrir WhatsApp com mensagem preenchida */
function setupReservationForm(){
  const form = document.getElementById("reservationForm");
  if(!form) return;
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const route = form.route.value;
    const date = form.date.value;
    const time = form.time.value;
    const qty = form.qty.value;
    const names = form.names.value;
    const lang = currentLang();
    const msg = encodeURIComponent(
      `${t("reserve.title", lang)}\nRota: ${route}\nData: ${date}\nHorário: ${time}\nPessoas: ${qty}\nNome(s): ${names}\n\nSolicito confirmação de disponibilidade e valores.`
    );
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    // mostrar confirmação na página para o usuário
    const confirmBox = document.getElementById("confirmation");
    confirmBox.innerHTML = `<p style="padding:1rem;background:#ecffef;border-radius:8px"> ${t("reserve.submit", lang)} — <strong>${route}</strong></p>`;
    // abrir WhatsApp em nova aba
    window.open(waUrl, "_blank");
  });
}

/* inicializador */
document.addEventListener("DOMContentLoaded", ()=>{
  // setar anos no footer
  document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());
  document.getElementById("year2") && (document.getElementById("year2").textContent = new Date().getFullYear());
  document.getElementById("year3") && (document.getElementById("year3").textContent = new Date().getFullYear());

  populateLangSelects();
  setLanguage(currentLang());
  buildPreview();
  buildGallery();
  populateRouteSummary();
  setupWhatsAppButtons();
  setupReservationForm();

  // melhorar navegação: rolagem suave para ancoras internas (se existirem)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", (e)=>{
      e.preventDefault();
      const id = a.getAttribute("href").slice(1);
      document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    });
  });
});
