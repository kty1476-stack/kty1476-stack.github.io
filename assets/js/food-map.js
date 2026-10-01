(() => {
  'use strict';
  const root = document.getElementById('food-map-app');
  if (!root) return;
  const status = document.getElementById('map-status');
  const query = document.getElementById('map-search');
  const program = document.getElementById('map-program');
  const results = document.getElementById('map-results');
  const pending = document.getElementById('map-pending-list');
  const markerBySlug = new Map();
  let map, layer, posts = [];
  const el = (tag, text, cls) => { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; };
  const located = p => p.location && Number.isFinite(p.location.lat) && Number.isFinite(p.location.lng);
  function link(text, url, external = false) {
    const a = el('a', text); a.href = url;
    if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  }
  function photo(p) { const img = el('img'); img.src = p.image; img.alt = p.alt; img.loading = 'lazy'; img.width = 1200; img.height = 630; return img; }
  function select(p) {
    const marker = markerBySlug.get(p.slug);
    if (!marker) return;
    map.setView(marker.getLatLng(), 17, {animate:false}); marker.openPopup();
    requestAnimationFrame(()=>marker.getPopup().update());
    document.getElementById('restaurant-map').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
    marker.getElement()?.focus({preventScroll:true});
  }
  function card(p, popup = false) {
    const loc = p.location || {};
    const box = el(popup?'div':'article', '', popup?'map-popup':'map-card');
    if (p.image) box.append(photo(p));
    const body = el('div', '', popup?'':'map-card-body');
    body.append(el('span', p.program, 'map-program'), el('h3', loc.name || p.title));
    if (loc.address) body.append(el('p', loc.address));
    if (loc.precision === 'building') body.append(el('p', '주소지 건물 위치 기준'));
    const actions = el('div', '', 'map-actions');
    actions.append(link('게시글 보기 →', p.url));
    if (!popup && located(p) && map) { const b = el('button','핀 보기'); b.type='button'; b.onclick=()=>select(p); actions.append(b); }
    const search = [loc.name,loc.address].filter(Boolean).join(' ') || p.title;
    actions.append(link('카카오맵 검색', 'https://map.kakao.com/?q='+encodeURIComponent(search),true));
    body.append(actions);
    if(popup && loc.source) body.append(link('위치 확인 자료',loc.source,true));
    box.append(body); return box;
  }
  function render() {
    const term=query.value.trim().replace(/\s/g,'').toLowerCase();
    const matches=posts.filter(p=>(!program.value||p.program===program.value)&&[p.title,p.location?.name,p.location?.address].join(' ').replace(/\s/g,'').toLowerCase().includes(term));
    results.replaceChildren();pending.replaceChildren();layer?.clearLayers();markerBySlug.clear();
    const points=[];
    matches.forEach(p=>{
      if(located(p)){
        results.append(card(p));points.push([p.location.lat,p.location.lng]);
        if(map){const marker=L.marker(points[points.length-1],{title:p.location.name,alt:p.location.name,autoPanOnFocus:false,icon:L.divIcon({className:'map-pin',html:'<span></span>',iconSize:[30,38],iconAnchor:[15,34],popupAnchor:[0,-30]})}).bindPopup(card(p,true),{autoPanPadding:[16,16]});marker.addTo(layer);markerBySlug.set(p.slug,marker);}
      }else pending.append(card(p));
    });
    status.textContent=`${matches.length}편 중 위치 확인 ${points.length}곳 · 위치 확인 중 ${matches.length-points.length}편`+(map?'':' · 지도를 불러오지 못했습니다. 아래 글과 지도 검색을 이용해 주세요.');
    if(!points.length) results.append(el('p','조건에 맞는 핀이 없습니다. 다른 검색어나 프로그램을 선택해 주세요.'));
    document.getElementById('map-pending').hidden=matches.length===points.length;
    document.querySelector('#map-pending summary').textContent=`위치 확인 중인 맛집 ${matches.length-points.length}편`;
    if(map && points.length) map.fitBounds(points,{padding:[35,35],maxZoom:15});
  }
  fetch(root.dataset.source).then(r=>{if(!r.ok)throw Error('data');return r.json();}).then(data=>{
    posts=data;
    if(window.L){map=L.map('restaurant-map',{scrollWheelZoom:false}).setView([36.2,127.8],7);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);layer=L.layerGroup().addTo(map);}
    [...new Set(posts.map(p=>p.program))].sort().forEach(p=>{const o=el('option',p);o.value=p;program.append(o);});
    query.addEventListener('input',render);program.addEventListener('change',render);
    document.getElementById('map-reset').onclick=()=>{query.value='';program.value='';render();};render();
  }).catch(()=>{status.textContent='맛집 정보를 불러오지 못했습니다. 잠시 후 새로고침해 주세요.';status.append(' ',link('기존 글 보기','/'));});
})();
