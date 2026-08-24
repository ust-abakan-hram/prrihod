// ============================================================================
//  ЛОГИКА САЙТА ХРАМА АЛЕКСАНДРА НЕВСКОГО
//
//  Этот файл НЕ нужно редактировать. Все данные находятся в:
//    - news.js      ← новости
//    - data.js      ← расписание, контакты, духовенство, галерея
// ============================================================================

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  //  КОНСТАНТЫ
  // ─────────────────────────────────────────────────────────────────────────
  var NEWS_PER_PAGE = 9;
  var DEFAULT_NEWS_IMAGE = 'images/news/no-photo.png';

  // Иконки SVG (для переиспользования)
  var ICONS = {
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    phone: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    mapPin: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    users: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    church: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M10 2v4l-2 2v14M14 2v4l2 2v14M6 14l4-2 4 0 4 2M12 6v4"/></svg>',
    arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    home: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg>',
    chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><polyline points="6 9 12 15 18 9"/></svg>',
    archive: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>',
    search: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',
    zoomIn: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    share: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    alertTriangle: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    upload: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    save: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    fileText: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    type: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
    alignLeft: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
    vk: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12.785 16.241s.288-.032.435-.193c.135-.148.131-.426.131-.426s-.019-1.302.582-1.495c.593-.19 1.354 1.27 2.16 1.83.61.422 1.075.33 1.075.33l2.155-.03s1.127-.071.593-.964c-.044-.073-.311-.66-1.601-1.872-1.351-1.265-1.17-1.059.458-3.246.991-1.331 1.387-2.146 1.262-2.494-.117-.333-.852-.245-.852-.245l-2.444.015s-.181-.025-.315.056c-.131.079-.215.262-.215.262s-.385 1.029-.898 1.905c-1.083 1.844-1.516 1.941-1.694 1.825-.412-.266-.309-1.07-.309-1.642 0-1.786.27-2.531-.526-2.725-.264-.064-.458-.106-1.134-.113-.867-.009-1.601.003-2.016.207-.276.135-.488.437-.359.454.16.021.522.099.715.364.249.339.241 1.101.241 1.101s.143 2.099-.333 2.36c-.327.178-.776-.185-1.748-1.86-.496-.854-.871-1.797-.871-1.797s-.072-.176-.201-.27c-.156-.114-.376-.15-.376-.15l-2.322.015s-.349.01-.477.161c-.114.135-.009.413-.009.413s1.819 4.256 3.879 6.402c1.889 1.965 4.033 1.836 4.033 1.836h.971z"/></svg>',
    telegram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>',
    whatsapp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.47-.01-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>',
    twitter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    globe: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
  };

  // ─────────────────────────────────────────────────────────────────────────
  //  УТИЛИТЫ
  // ─────────────────────────────────────────────────────────────────────────

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var key in attrs) {
        if (key === 'class') node.className = attrs[key];
        else if (key === 'html') node.innerHTML = attrs[key];
        else if (key === 'text') node.textContent = attrs[key];
        else if (key === 'href') node.setAttribute('href', attrs[key]);
        else if (key === 'src') node.setAttribute('src', attrs[key]);
        else if (key === 'alt') node.setAttribute('alt', attrs[key]);
        else if (key === 'aria-label') node.setAttribute('aria-label', attrs[key]);
        else if (key === 'target') node.setAttribute('target', attrs[key]);
        else if (key === 'rel') node.setAttribute('rel', attrs[key]);
        else if (key === 'id') node.id = attrs[key];
        else if (key === 'type') node.setAttribute('type', attrs[key]);
        else if (key === 'value') node.setAttribute('value', attrs[key]);
        else if (key === 'placeholder') node.setAttribute('placeholder', attrs[key]);
        else if (key === 'role') node.setAttribute('role', attrs[key]);
        else if (key === 'onclick' && typeof attrs[key] === 'function') {
          node.addEventListener('click', attrs[key]);
        } else if (attrs[key] !== null && attrs[key] !== undefined) {
          node.setAttribute(key, attrs[key]);
        }
      }
    }
    if (children) {
      if (Array.isArray(children)) {
        children.forEach(function (c) {
          if (c == null) return;
          if (typeof c === 'string') node.appendChild(document.createTextNode(c));
          else node.appendChild(c);
        });
      } else if (typeof children === 'string') {
        node.innerHTML = children;
      } else {
        node.appendChild(children);
      }
    }
    return node;
  }

  function getMonthNumber(monthName) {
    var months = {
      'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3, 'мая': 4, 'июня': 5,
      'июля': 6, 'августа': 7, 'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11
    };
    return months[monthName.toLowerCase()];
  }

  function parseRussianDate(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return null;
    var match = dateStr.trim().match(/^(\d{1,2})\s+([а-яё]+)\s+(\d{4})$/i);
    if (!match) return null;
    var day = parseInt(match[1], 10);
    var month = getMonthNumber(match[2]);
    var year = parseInt(match[3], 10);
    if (month === undefined) return null;
    return new Date(Date.UTC(year, month, day, 12, 0, 0));
  }

  function getYearFromDate(dateStr) {
    if (!dateStr) return null;
    var match = dateStr.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : null;
  }

  function escapeHtml(text) {
    if (text == null) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function splitParagraphs(text) {
    if (!text) return [];
    return text
      .split(/\n\s*\n/)
      .map(function (p) { return p.trim(); })
      .filter(Boolean);
  }

  function pluralize(n, one, few, many) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
  }

  function safeText(value, fallback) {
    if (typeof value === 'string' && value.trim()) return value.trim();
    return fallback || '';
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  НОРМАЛИЗАЦИЯ НОВОСТЕЙ (защита от ошибок)
  // ─────────────────────────────────────────────────────────────────────────
  function normalizeNews(rawList) {
    if (!Array.isArray(rawList)) return [];
    return rawList
      .map(function (item, idx) {
        if (!item || typeof item !== 'object') return null;
        var date = safeText(item.date, 'Дата не указана');
        var title = safeText(item.title, 'Без заголовка');
        var images = [];
        if (Array.isArray(item.images) && item.images.length > 0) {
          images = item.images
            .filter(function (img) { return typeof img === 'string' && img.trim(); })
            .map(function (img) { return img.trim(); });
        }
        var singleImage = safeText(item.image, '');
        if (singleImage && images.indexOf(singleImage) === -1) {
          images.unshift(singleImage);
        }
        if (images.length === 0) {
          images = [DEFAULT_NEWS_IMAGE];
        }
        var image = images[0]
        var excerpt = safeText(item.excerpt, 'Описание новости будет добавлено позже.');
        var content = safeText(item.content, 'Текст новости будет добавлен позже.');
        var id = (item.id !== undefined && item.id !== null && item.id !== '') ? item.id : 'auto-' + (idx + 1);
        return { id: id, date: date, title: title, image: image, images: images, excerpt: excerpt, content: content };
      })
      .filter(function (item) { return item !== null; })
      .map(function (item) {
        item.dateObj = parseRussianDate(item.date);
        item.year = getYearFromDate(item.date);
        return item;
      })
      .sort(function (a, b) {
        if (a.dateObj && b.dateObj) return b.dateObj.getTime() - a.dateObj.getTime();
        if (a.dateObj && !b.dateObj) return -1;
        if (!a.dateObj && b.dateObj) return 1;
        return 0;
      });
  }

  var ALL_NEWS = normalizeNews(window.NEWS);

  function getLatestNews(count) {
    return ALL_NEWS.slice(0, count);
  }

  function getNewsById(id) {
    var numId = parseInt(id, 10);
    return ALL_NEWS.find(function (n) {
      return Number(n.id) === numId || String(n.id) === String(id);
    });
  }

  function getNewsYears() {
    var years = {};
    ALL_NEWS.forEach(function (n) {
      if (n.year !== null) years[n.year] = true;
    });
    return Object.keys(years).map(Number).sort(function (a, b) { return b - a; });
  }

  function getNewsByYear(year) {
    return ALL_NEWS.filter(function (n) { return n.year === year; });
  }

  function searchNews(query) {
    var q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_NEWS.filter(function (n) {
      return n.title.toLowerCase().indexOf(q) !== -1 ||
             n.excerpt.toLowerCase().indexOf(q) !== -1 ||
             n.content.toLowerCase().indexOf(q) !== -1;
    });
  }

  function paginate(items, page, perPage) {
    var totalPages = Math.max(1, Math.ceil(items.length / perPage));
    var currentPage = Math.min(Math.max(1, page), totalPages);
    var start = (currentPage - 1) * perPage;
    return {
      items: items.slice(start, start + perPage),
      totalPages: totalPages,
      currentPage: currentPage,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1
    };
  }

  function getPageNumbers(currentPage, totalPages) {
    if (totalPages <= 7) {
      var arr = [];
      for (var i = 1; i <= totalPages; i++) arr.push(i);
      return arr;
    }
    var pages = [1];
    if (currentPage > 3) pages.push('...');
    var start = Math.max(2, currentPage - 1);
    var end = Math.min(totalPages - 1, currentPage + 1);
    for (var j = start; j <= end; j++) pages.push(j);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  ХЕШ-РОУТЕР
  // ─────────────────────────────────────────────────────────────────────────
  function parseHash() {
    var hash = window.location.hash.replace(/^#\/?/, '').trim();
    var page = 1;
    var rest = hash;
    var pageMatch = rest.match(/[\/&?]page[\/=](\d+)/i);
    if (pageMatch) {
      page = parseInt(pageMatch[1], 10);
      rest = rest.replace(/[\/&?]page[\/=]\d+/i, '');
    }
    var parts = rest.split('/').filter(Boolean);
    return {
      isHome: parts.length === 0,
      section: parts[0] || null,
      param: parts.slice(1).join('/') || null,
      page: page
    };
  }

  function navigate(to) {
    var hash = to.startsWith('#') ? to : '#' + (to.startsWith('/') ? to : '/' + to);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      handleRoute();
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  function handleRoute() {
    var route = parseHash();
    var app = document.getElementById('app');
    app.innerHTML = '';
    app.className = '';

    // Обновляем title
    var sectionTitles = {
      about: 'О храме',
      clergy: 'Духовенство',
      schedule: 'Расписание богослужений',
      news: 'Новости',
      archive: 'Архив новостей',
      search: 'Поиск по новостям',
      gallery: 'Фотоальбом',
      contacts: 'Контакты',
      'admin-help': 'Как добавить новость'
    };

    if (route.isHome) {
      document.title = 'Храм святого благоверного великого князя Александра Невского — п. Усть-Абакан';
      app.appendChild(renderHome());
    } else if (route.section === 'about') {
      document.title = (sectionTitles.about || '') + ' — Храм Александра Невского';
      app.appendChild(renderAbout());
    } else if (route.section === 'clergy') {
      document.title = (sectionTitles.clergy || '') + ' — Храм Александра Невского';
      app.appendChild(renderClergy());
    } else if (route.section === 'schedule') {
      document.title = (sectionTitles.schedule || '') + ' — Храм Александра Невского';
      app.appendChild(renderSchedule());
    } else if (route.section === 'gallery') {
      document.title = (sectionTitles.gallery || '') + ' — Храм Александра Невского';
      app.appendChild(renderGallery());
    } else if (route.section === 'contacts') {
      document.title = (sectionTitles.contacts || '') + ' — Храм Александра Невского';
      app.appendChild(renderContacts());
    } else if (route.section === 'news') {
      if (route.param) {
        var pageMatch = route.param.match(/^page\/(\d+)$/);
        if (pageMatch) {
          app.appendChild(renderNewsList(parseInt(pageMatch[1], 10)));
          document.title = 'Новости — Храм Александра Невского';
        } else {
          app.appendChild(renderNewsDetail(route.param));
        }
      } else {
        app.appendChild(renderNewsList(route.page > 1 ? route.page : 1));
        document.title = 'Новости — Храм Александра Невского';
      }
    } else if (route.section === 'archive') {
      if (route.param) {
        var yearPageMatch = route.param.match(/^(\d{4})\/page\/(\d+)$/);
        if (yearPageMatch) {
          app.appendChild(renderArchive(yearPageMatch[1], parseInt(yearPageMatch[2], 10)));
        } else {
          app.appendChild(renderArchive(route.param, 1));
        }
        document.title = 'Архив — Храм Александра Невского';
      } else {
        app.appendChild(renderArchive(null, 1));
        document.title = 'Архив новостей — Храм Александра Невского';
      }
    } else if (route.section === 'search') {
      app.appendChild(renderSearch(route.param ? decodeURIComponent(route.param) : null));
      document.title = 'Поиск — Храм Александра Невского';
    } else if (route.section === 'admin-help') {
      document.title = (sectionTitles['admin-help'] || '') + ' — Храм Александра Невского';
      app.appendChild(renderAdminHelp());
    } else {
      document.title = 'Раздел не найден — Храм Александра Невского';
      app.appendChild(renderNotFound());
    }

    updateActiveMenu();
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: ГЛАВНАЯ СТРАНИЦА
  // ─────────────────────────────────────────────────────────────────────────
  function renderHome() {
    var site = window.SITE;
    var contacts = window.CONTACTS;

    var fragment = document.createDocumentFragment();

    // Hero
    var hero = el('section', { class: 'hero', 'aria-label': 'Главное изображение храма' }, [
      el('div', { class: 'hero-bg' }, [
        el('img', { src: 'images/hero/hero.png', alt: site.name })
      ]),
      el('div', { class: 'hero-overlay' }),
      el('div', { class: 'hero-overlay-bottom' }),
      el('div', { class: 'hero-content' }, [
        el('div', { class: 'hero-icon', 'aria-hidden': 'true' }, '☩'),
        el('div', { class: 'hero-tagline' }, site.tagline),
        el('h1', { class: 'hero-title' }, site.name),
        el('div', { class: 'hero-divider' }, [
          el('span', {}, '✦')
        ]),
        el('p', { class: 'hero-description' }, site.heroDescription),
        el('div', { class: 'hero-buttons' }, [
          el('a', { href: '#/schedule', class: 'btn-primary', html: ICONS.clock + ' Расписание богослужений' }),
          el('a', { href: 'tel:' + contacts.phone.replace(/[^+\d]/g, ''), class: 'btn-outline', html: ICONS.phone + ' ' + contacts.phone })
        ])
      ]),
      el('a', { href: '#quick-links', class: 'hero-scroll', 'aria-label': 'Прокрутить вниз', html: ICONS.chevronDown })
    ]);
    fragment.appendChild(hero);

    // Quick Links
    var quickLinksSection = el('section', { class: 'quick-links', id: 'quick-links', 'aria-label': 'Быстрые ссылки' }, [
      el('div', { class: 'quick-links-inner' },
        window.QUICK_LINKS.map(function (link) {
          var iconHtml = ICONS[link.icon] || ICONS.church;
          return el('a', { href: '#/' + link.hash, class: 'quick-link-card' }, [
            el('div', { class: 'quick-link-icon', html: iconHtml }),
            el('div', { class: 'quick-link-title' }, link.label),
            el('p', { class: 'quick-link-description' }, link.description),
            el('div', { class: 'quick-link-corner', html: '✦' })
          ]);
        })
      )
    ]);
    fragment.appendChild(quickLinksSection);

    // О храме (превью)
    var about = window.ABOUT;
    var aboutSection = el('section', { class: 'section' }, [
      el('div', { class: 'about-grid' }, [
        el('div', {}, [
          renderSectionHeading('Добро пожаловать', about.heroTitle, null, 'left'),
          el('p', { style: 'margin-top: 24px; font-family: var(--font-serif); font-size: 16px; line-height: 1.7;', text: about.history[0] }),
          el('div', { style: 'margin-top: 32px;' }, [
            el('a', { href: '#/about', class: 'btn-primary', html: 'Подробнее о храме ' + ICONS.arrowRight })
          ])
        ]),
        el('div', { class: 'about-image' }, [
          el('img', { src: about.images[0] ? about.images[0].image : 'images/hero/hero.png', alt: about.images[0] ? about.images[0].caption : site.name, onerror: function (e) { e.target.src = 'images/hero/hero.png'; } })
        ])
      ])
    ]);
    fragment.appendChild(aboutSection);

    // Превью расписания
    var previewDays = window.SCHEDULE.slice(0, 3);
    var scheduleSection = el('section', { class: 'section bg-secondary' }, [
      el('div', { class: 'section-bg-secondary-inner' }, [
        renderSectionHeading('Богослужения', 'Ближайшие службы', 'Краткое расписание богослужений. Полное расписание на неделю доступно в отдельном разделе.'),
        el('div', { class: 'schedule-preview-grid' },
          previewDays.map(function (day) {
            return el('article', { class: 'schedule-preview-card' }, [
              el('div', { class: 'schedule-preview-header', html: ICONS.calendar }),
              el('div', { class: 'schedule-preview-day' }, day.weekday),
              el('div', { class: 'schedule-preview-date' }, day.date),
              el('ul', { class: 'schedule-preview-list' },
                day.services.map(function (s) {
                  return el('li', {}, [
                    el('span', { class: 'schedule-preview-time' }, s.time),
                    el('span', { class: 'schedule-preview-name' }, s.name)
                  ]);
                })
              )
            ]);
          })
        ),
        el('div', { style: 'margin-top: 32px; text-align: center;' }, [
          el('a', { href: '#/schedule', class: 'btn-primary', style: 'background: var(--card); color: var(--fg); border: 1px solid var(--border);', html: 'Полное расписание ' + ICONS.arrowRight })
        ])
      ])
    ]);
    fragment.appendChild(scheduleSection);

    // Последние новости
    var latest = getLatestNews(4);
    var newsSection = el('section', { class: 'section bg-secondary' }, [
      el('div', { class: 'section-bg-secondary-inner' }, [
        renderSectionHeading('Жизнь храма', 'Последние новости', 'Свежие события и объявления из жизни нашего прихода.'),
        latest.length > 0
          ? el('div', { class: 'news-grid' }, latest.map(function (a) { return renderNewsCard(a); }))
          : el('div', { class: 'empty-state' }, [
              el('div', { class: 'empty-state-icon' }, '✦'),
              el('div', { class: 'empty-state-title' }, 'Новости скоро появятся'),
              el('div', { class: 'empty-state-text' }, 'В этом разделе будут отображаться последние новости храма.')
            ]),
        el('div', { style: 'margin-top: 40px; text-align: center; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;' }, [
          el('a', { href: '#/news', class: 'btn-primary', html: 'Все новости ' + ICONS.arrowRight }),
          el('a', { href: '#/archive', style: 'display: inline-flex; align-items: center; gap: 8px; height: 48px; padding: 0 24px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card); color: var(--fg); font-weight: 500;', html: ICONS.archive + ' Архив по годам' }),
          el('a', { href: '#/search', style: 'display: inline-flex; align-items: center; gap: 8px; height: 48px; padding: 0 24px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card); color: var(--fg); font-weight: 500;', html: ICONS.search + ' Поиск' })
        ])
      ])
    ]);
    fragment.appendChild(newsSection);

    // Превью галереи
    var gallery = window.GALLERY.slice(0, 4);
    var gallerySection = el('section', { class: 'section bg-secondary' }, [
      el('div', { class: 'section-bg-secondary-inner' }, [
        renderSectionHeading('Фотоальбом', 'Фотогалерея', 'Фотографии нашего храма: архитектура, внутреннее убранство, богослужения и территория.'),
        el('div', { class: 'gallery-grid', style: 'grid-template-columns: repeat(2, 1fr);' },
          gallery.map(function (item) {
            return el('button', { class: 'gallery-item', 'data-image': item.image, 'data-caption': item.caption, 'data-category': item.category, onclick: function (e) { openLightboxFromButton(e.currentTarget); } }, [
              el('img', { src: item.image, alt: item.caption, loading: 'lazy', onerror: function (e) { e.target.src = 'images/news/no-photo.png'; } }),
              el('div', { class: 'gallery-item-overlay' }, [
                el('div', { class: 'gallery-item-category' }, item.category),
                el('div', { class: 'gallery-item-caption' }, item.caption)
              ]),
              el('div', { class: 'gallery-item-zoom', html: ICONS.zoomIn })
            ]);
          })
        ),
        el('div', { style: 'margin-top: 32px; text-align: center;' }, [
          el('a', { href: '#/gallery', class: 'btn-primary', style: 'background: var(--card); color: var(--fg); border: 1px solid var(--border);', html: 'Вся фотогалерея ' + ICONS.arrowRight })
        ])
      ])
    ]);
    fragment.appendChild(gallerySection);

    // CTA "Приходите к нам"
    var ctaSection = el('section', { class: 'section bg-primary' }, [
      el('div', { class: 'section-bg-primary-inner home-cta' }, [
        el('div', { class: 'home-cta-icon' }, '☩'),
        el('h2', { class: 'home-cta-title' }, 'Приходите к нам'),
        el('p', { class: 'home-cta-description' }, site.heroDescription),
        el('div', { class: 'home-cta-cards' }, [
          el('a', { href: 'tel:' + contacts.phone.replace(/[^+\d]/g, ''), class: 'home-cta-card' }, [
            el('div', { class: 'home-cta-card-icon', html: ICONS.phone }),
            el('div', { class: 'home-cta-card-label' }, 'Телефон'),
            el('div', { class: 'home-cta-card-value' }, contacts.phone)
          ]),
          el('div', { class: 'home-cta-card' }, [
            el('div', { class: 'home-cta-card-icon', html: ICONS.mapPin }),
            el('div', { class: 'home-cta-card-label' }, 'Адрес'),
            el('div', { class: 'home-cta-card-value' }, contacts.address)
          ]),
          el('div', { class: 'home-cta-card' }, [
            el('div', { class: 'home-cta-card-icon', html: ICONS.clock }),
            el('div', { class: 'home-cta-card-label' }, 'Часы работы'),
            el('div', { class: 'home-cta-card-value' }, contacts.workingHours[0] || '')
          ])
        ]),
        el('div', { style: 'margin-top: 32px;' }, [
          el('a', { href: '#/contacts', style: 'display: inline-flex; align-items: center; gap: 8px; height: 48px; padding: 0 24px; background: var(--gold); color: var(--primary); border-radius: var(--radius); font-weight: 600;', html: 'Контакты и карта ' + ICONS.arrowRight })
        ])
      ])
    ]);
    fragment.appendChild(ctaSection);

    return fragment;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: SECTION HEADING
  // ─────────────────────────────────────────────────────────────────────────
  function renderSectionHeading(eyebrow, title, description, align) {
    var div = el('div', { class: 'section-heading' + (align === 'left' ? ' left' : '') }, []);
    if (eyebrow) div.appendChild(el('div', { class: 'section-heading eyebrow' }, eyebrow));
    div.appendChild(el('h2', {}, title));
    div.appendChild(el('div', { class: 'divider' }, [el('span', {}, '✦')]));
    if (description) div.appendChild(el('p', { class: 'description' }, description));
    return div;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: КАРТОЧКА НОВОСТИ
  // ─────────────────────────────────────────────────────────────────────────
  function renderNewsCard(article) {
    return el('article', { class: 'news-card' }, [
      el('a', { href: '#/news/' + article.id, class: 'news-card-image', 'aria-label': 'Читать новость: ' + article.title }, [
        el('img', {
          src: article.image,
          alt: article.title,
          loading: 'lazy',
          onerror: function (e) {
            if (e.target.src.indexOf('no-photo.png') === -1) e.target.src = DEFAULT_NEWS_IMAGE;
          }
        })
      ]),
      el('div', { class: 'news-card-content' }, [
        el('div', { class: 'news-card-date', html: ICONS.calendar }, [
          el('span', {}, article.date)
        ]),
        el('h3', { class: 'news-card-title' }, [
          el('a', { href: '#/news/' + article.id }, article.title)
        ]),
        el('p', { class: 'news-card-excerpt' }, article.excerpt),
        el('a', { href: '#/news/' + article.id, class: 'news-card-readmore', html: 'Читать больше ' + ICONS.arrowRight })
      ])
    ]);
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: СПИСОК НОВОСТЕЙ С ПАГИНАЦИЕЙ
  // ─────────────────────────────────────────────────────────────────────────
  function renderNewsList(page) {
    var result = paginate(ALL_NEWS, page, NEWS_PER_PAGE);
    var section = el('section', { class: 'section' }, [
      renderSectionHeading('Жизнь храма', 'Все новости', 'Всего опубликовано новостей: ' + ALL_NEWS.length),
      el('div', { style: 'margin-top: 32px; display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;' }, [
        el('a', { href: '#/archive', style: 'display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card); color: var(--fg); font-size: 14px; font-weight: 500;', html: ICONS.archive + ' Архив по годам' }),
        el('a', { href: '#/search', style: 'display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 16px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card); color: var(--fg); font-size: 14px; font-weight: 500;', html: ICONS.search + ' Поиск по новостям' })
      ]),
      el('div', { style: 'margin-top: 32px; text-align: center; font-size: 14px; color: var(--muted);', text: 'Страница ' + result.currentPage + ' из ' + result.totalPages })
    ]);
    if (result.items.length > 0) {
      section.appendChild(el('div', { class: 'news-grid' }, result.items.map(function (a) { return renderNewsCard(a); })));
    } else {
      section.appendChild(el('div', { class: 'empty-state' }, [
        el('div', { class: 'empty-state-icon' }, '✦'),
        el('div', { class: 'empty-state-title' }, 'На этой странице пока нет новостей'),
        el('div', { class: 'empty-state-text' }, 'Возможно, новости ещё не добавлены.')
      ]));
    }
    section.appendChild(renderPagination(result.currentPage, result.totalPages, function (p) { return '#/news/page/' + p; }));
    return section;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: ПАГИНАЦИЯ
  // ─────────────────────────────────────────────────────────────────────────
  function renderPagination(currentPage, totalPages, buildHref) {
    if (totalPages <= 1) return el('div');
    var pages = getPageNumbers(currentPage, totalPages);
    var nav = el('nav', { class: 'pagination', 'aria-label': 'Постраничная навигация' }, []);

    // Назад
    if (currentPage > 1) {
      nav.appendChild(el('a', { href: buildHref(currentPage - 1), html: ICONS.chevronLeft }));
    } else {
      nav.appendChild(el('span', { class: 'disabled', html: ICONS.chevronLeft }));
    }

    // Номера страниц
    pages.forEach(function (p) {
      if (p === '...') {
        nav.appendChild(el('span', { class: 'ellipsis' }, '…'));
      } else {
        var link = el('a', { href: buildHref(p) }, String(p));
        if (p === currentPage) link.classList.add('active');
        nav.appendChild(link);
      }
    });

    // Вперёд
    if (currentPage < totalPages) {
      nav.appendChild(el('a', { href: buildHref(currentPage + 1), html: ICONS.chevronRight }));
    } else {
      nav.appendChild(el('span', { class: 'disabled', html: ICONS.chevronRight }));
    }

    return nav;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: ПОЛНАЯ СТРАНИЦА НОВОСТИ
  // ─────────────────────────────────────────────────────────────────────────
  function renderNewsDetail(id) {
    var article = getNewsById(id);
    if (!article) {
      return el('section', { class: 'not-found' }, [
        el('div', { class: 'not-found-icon' }, '✦'),
        el('h1', {}, 'Новость не найдена'),
        el('p', {}, 'К сожалению, запрошенная новость не найдена. Возможно, она была удалена или перенесена.'),
        el('a', { href: '#/news', class: 'btn-primary', html: ICONS.arrowLeft + ' К списку новостей' })
      ]);
    }

    document.title = article.title + ' — Храм Александра Невского';
    var paragraphs = splitParagraphs(article.content);
    var related = getLatestNews(5).filter(function (n) { return String(n.id) !== String(article.id); }).slice(0, 3);

    var section = el('article', { class: 'news-detail' }, [
      // Хлебные крошки
      el('nav', { class: 'breadcrumb', 'aria-label': 'Навигация' }, [
        el('a', { href: '#/', html: ICONS.home + ' Главная' }),
        el('span', { class: 'separator' }, '/'),
        el('a', { href: '#/news' }, 'Новости'),
        el('span', { class: 'separator' }, '/'),
        el('span', { class: 'current' }, article.title)
      ]),
      el('a', { href: '#/news', class: 'back-button', html: ICONS.arrowLeft + ' Назад к новостям' }),
      el('h1', { class: 'news-detail-title' }, article.title),
      el('div', { class: 'news-detail-date', html: ICONS.calendar + ' ' + article.date }),
      // Главное фото (первое из массива)
      el('img', {
        src: article.image,
        alt: article.title,
        class: 'news-detail-image',
        onerror: function (e) {
          if (e.target.src.indexOf('no-photo.png') === -1) e.target.src = DEFAULT_NEWS_IMAGE;
        }
      }),
      // Мини-галерея с остальными фотографиями (если их больше одной)
      (article.images && article.images.length > 1)
        ? el('div', { class: 'news-gallery' }, [
            el('div', { class: 'news-gallery-title' }, 'Фотографии (' + article.images.length + ')'),
            el('div', { class: 'news-gallery-grid' },
              article.images.map(function (img, idx) {
                return el('button', {
                  type: 'button',
                  class: 'news-gallery-item',
                  onclick: function (e) {
                    openNewsLightbox(article.images, idx, article.title);
                  }
                }, [
                  el('img', {
                    src: img,
                    alt: article.title + ' - фото ' + (idx + 1),
                    loading: 'lazy',
                    onerror: function (e) {
                      if (e.target.src.indexOf('no-photo.png') === -1) e.target.src = DEFAULT_NEWS_IMAGE;
                    }
                  })
                ]);
              })
            )
          ])
        : null,
      el('div', { class: 'news-detail-content' },
        paragraphs.map(function (p) { return el('p', {}, p); })
      ),
      el('div', { class: 'news-detail-divider' }, [el('span', {}, '✦')]),
      renderShareButtons(article.title),
      el('a', { href: '#/news', class: 'btn-primary', style: 'background: var(--card); color: var(--fg); border: 1px solid var(--border);', html: ICONS.arrowLeft + ' Вернуться к новостям' })
    ]);

    if (related.length > 0) {
      section.appendChild(el('section', { class: 'related-news' }, [
        el('h2', {}, 'Читайте также'),
        el('div', { class: 'news-grid', style: 'grid-template-columns: 1fr;' },
          related.map(function (n) { return renderNewsCard(n); })
        )
      ]));
    }

    return section;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: КНОПКИ ПОДЕЛИТЬСЯ
  // ─────────────────────────────────────────────────────────────────────────
  function renderShareButtons(title) {
    var url = window.location.href;
    var encodedUrl = encodeURIComponent(url);
    var encodedTitle = encodeURIComponent(title);

    var buttons = [
      { name: 'vk', icon: ICONS.vk, href: 'https://vk.com/share.php?url=' + encodedUrl + '&title=' + encodedTitle, label: 'Поделиться в ВКонтакте' },
      { name: 'telegram', icon: ICONS.telegram, href: 'https://t.me/share/url?url=' + encodedUrl + '&text=' + encodedTitle, label: 'Поделиться в Telegram' },
      { name: 'whatsapp', icon: ICONS.whatsapp, href: 'https://api.whatsapp.com/send?text=' + encodedTitle + '%20' + encodedUrl, label: 'Поделиться в WhatsApp' },
      { name: 'twitter', icon: ICONS.twitter, href: 'https://twitter.com/intent/tweet?url=' + encodedUrl + '&text=' + encodedTitle, label: 'Поделиться в X (Twitter)' }
    ];

    return el('div', { class: 'share-buttons' }, [
      el('span', { class: 'share-label', html: ICONS.share + ' Поделиться:' })
    ].concat(buttons.map(function (btn) {
      return el('a', {
        href: btn.href,
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'share-button ' + btn.name,
        'aria-label': btn.label,
        title: btn.name,
        html: btn.icon
      });
    })));
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: АРХИВ ПО ГОДАМ
  // ─────────────────────────────────────────────────────────────────────────
  function renderArchive(year, page) {
    var years = getNewsYears();

    // Если год не выбран — показать список лет
    if (!year) {
      var section = el('section', { class: 'section' }, [
        renderSectionHeading('Хроника', 'Архив новостей', 'Выберите год, чтобы увидеть все новости, опубликованные в течение этого периода.'),
        el('a', { href: '#/news', class: 'back-button', html: ICONS.arrowLeft + ' Все новости' })
      ]);

      if (years.length === 0) {
        section.appendChild(el('div', { class: 'empty-state' }, [
          el('div', { class: 'empty-state-icon', html: ICONS.archive }),
          el('div', { class: 'empty-state-title' }, 'В архиве пока нет новостей'),
          el('div', { class: 'empty-state-text' }, 'Как только появятся новости, они будут отображаться здесь.')
        ]));
      } else {
        section.appendChild(el('div', { class: 'archive-grid' },
          years.map(function (y) {
            var count = getNewsByYear(y).length;
            var word = pluralize(count, 'новость', 'новости', 'новостей');
            return el('a', { href: '#/archive/' + y, class: 'archive-year-card' }, [
              el('div', { class: 'archive-year-left' }, [
                el('div', { class: 'archive-year-icon' }, String(y).slice(-2)),
                el('div', {}, [
                  el('div', { class: 'archive-year-number' }, String(y)),
                  el('div', { class: 'archive-year-count' }, count + ' ' + word)
                ])
              ]),
              el('div', { class: 'archive-year-arrow', html: ICONS.chevronRight })
            ]);
          })
        ));
      }
      return section;
    }

    // Новости за конкретный год
    var yearNum = parseInt(year, 10);
    var isValidYear = !isNaN(yearNum) && years.indexOf(yearNum) !== -1;

    if (!isValidYear) {
      return el('section', { class: 'not-found' }, [
        el('div', { class: 'not-found-icon' }, '✦'),
        el('h1', {}, 'Год не найден'),
        el('p', {}, 'К сожалению, за указанный год новостей не найдено.'),
        el('a', { href: '#/archive', class: 'btn-primary', html: ICONS.arrowLeft + ' К архиву' })
      ]);
    }

    var yearNews = getNewsByYear(yearNum);
    var result = paginate(yearNews, page, NEWS_PER_PAGE);

    var section = el('section', { class: 'section' }, [
      el('nav', { class: 'breadcrumb' }, [
        el('a', { href: '#/', html: ICONS.home + ' Главная' }),
        el('span', { class: 'separator' }, '/'),
        el('a', { href: '#/news' }, 'Новости'),
        el('span', { class: 'separator' }, '/'),
        el('a', { href: '#/archive' }, 'Архив'),
        el('span', { class: 'separator' }, '/'),
        el('span', { class: 'current' }, String(yearNum))
      ]),
      renderSectionHeading('Архив', 'Новости ' + yearNum + ' года', 'Всего за этот год: ' + yearNews.length + ' ' + pluralize(yearNews.length, 'публикация', 'публикации', 'публикаций')),
      el('a', { href: '#/archive', class: 'back-button', html: ICONS.arrowLeft + ' Все годы архива' }),
      el('div', { style: 'margin-top: 32px; text-align: center; font-size: 14px; color: var(--muted);', text: 'Страница ' + result.currentPage + ' из ' + result.totalPages })
    ]);

    if (result.items.length > 0) {
      section.appendChild(el('div', { class: 'news-grid' }, result.items.map(function (a) { return renderNewsCard(a); })));
    }

    section.appendChild(renderPagination(result.currentPage, result.totalPages, function (p) { return '#/archive/' + yearNum + '/page/' + p; }));
    return section;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: ПОИСК
  // ─────────────────────────────────────────────────────────────────────────
  function renderSearch(initialQuery) {
    var section = el('section', { class: 'section' }, [
      renderSectionHeading('Поиск', 'Поиск по новостям', 'Найдите новости по ключевым словам. Введите слово или фразу, например: «Пасха», «крещение», «Александр Невский».'),
      el('a', { href: '#/news', class: 'back-button', html: ICONS.arrowLeft + ' К списку новостей' })
    ]);

    var resultsContainer = el('div', { id: 'search-results' });
    section.appendChild(resultsContainer);

    // Создаём поле поиска
    var searchBox = el('div', { class: 'search-box' }, []);
    var input = el('input', {
      type: 'search',
      class: 'search-input',
      placeholder: 'Введите слово для поиска...',
      value: initialQuery || ''
    });
    searchBox.appendChild(input);
    searchBox.appendChild(el('div', { class: 'search-icon', html: ICONS.search }));

    var clearBtn = el('button', { type: 'button', class: 'search-clear', 'aria-label': 'Очистить поиск', html: ICONS.x, onclick: function () { input.value = ''; performSearch(''); } });
    searchBox.appendChild(clearBtn);
    section.insertBefore(searchBox, resultsContainer);

    var infoEl = el('div', { class: 'search-results-info' });
    section.appendChild(infoEl);

    var debounceTimer;
    function performSearch(query) {
      var q = query.trim();
      if (!q) {
        resultsContainer.innerHTML = '';
        infoEl.textContent = '';
        return;
      }
      var results = searchNews(q);
      resultsContainer.innerHTML = '';
      if (results.length === 0) {
        resultsContainer.appendChild(el('div', { class: 'empty-state' }, [
          el('div', { class: 'empty-state-icon' }, '✦'),
          el('div', { class: 'empty-state-title' }, 'Ничего не найдено'),
          el('div', { class: 'empty-state-text' }, ['По запросу ', escapeHtml(q), ' новостей не найдено. Попробуйте изменить запрос.'].join(''))
        ]));
      } else {
        var word = pluralize(results.length, 'новость', 'новости', 'новостей');
        infoEl.textContent = 'Найдено ' + results.length + ' ' + word + ' по запросу «' + q + '»';
        resultsContainer.appendChild(el('div', { class: 'news-grid' }, results.map(function (a) { return renderNewsCard(a); })));
      }
    }

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { performSearch(input.value); }, 300);
    });

    // Запускаем начальный поиск
    setTimeout(function () {
      input.focus();
      if (initialQuery) performSearch(initialQuery);
    }, 100);

    return section;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: ГАЛЕРЕЯ С ЛАЙТБОКСОМ
  // ─────────────────────────────────────────────────────────────────────────
  var lightboxState = { items: [], index: 0 };

  function renderGallery() {
    var categories = window.GALLERY_CATEGORIES;
    var gallery = window.GALLERY;
    var section = el('section', { class: 'section bg-secondary' }, [
      el('div', { class: 'section-bg-secondary-inner' }, [
        renderSectionHeading('Фотоальбом', 'Фотогалерея', 'Фотографии нашего храма: архитектура, внутреннее убранство, богослужения и территория.'),
        el('div', { class: 'gallery-filters', id: 'gallery-filters' },
          categories.map(function (cat, idx) {
            var btn = el('button', {
              type: 'button',
              class: 'gallery-filter' + (idx === 0 ? ' active' : ''),
              'data-category': cat,
              onclick: function () { filterGallery(cat); }
            }, cat);
            return btn;
          })
        )
      ])
    ]);

    var grid = el('div', { class: 'gallery-grid', id: 'gallery-grid' },
      gallery.map(function (item, idx) {
        return el('button', {
          type: 'button',
          class: 'gallery-item',
          'data-image': item.image,
          'data-caption': item.caption,
          'data-category': item.category,
          'data-index': idx,
          onclick: function (e) {
            openLightboxFromButton(e.currentTarget);
          }
        }, [
          el('img', { src: item.image, alt: item.caption, loading: 'lazy', onerror: function (e) { e.target.src = 'images/news/no-photo.png'; } }),
          el('div', { class: 'gallery-item-overlay' }, [
            el('div', { class: 'gallery-item-category' }, item.category),
            el('div', { class: 'gallery-item-caption' }, item.caption)
          ]),
          el('div', { class: 'gallery-item-zoom', html: ICONS.zoomIn })
        ]);
      })
    );
    section.querySelector('.section-bg-secondary-inner').appendChild(grid);
    return section;
  }

  function filterGallery(category) {
    var filters = document.querySelectorAll('.gallery-filter');
    filters.forEach(function (f) {
      f.classList.toggle('active', f.getAttribute('data-category') === category);
    });
    var items = document.querySelectorAll('.gallery-item');
    items.forEach(function (item) {
      var itemCat = item.getAttribute('data-category');
      item.style.display = (category === 'Все' || itemCat === category) ? '' : 'none';
    });
  }

  function openLightboxFromButton(button) {
    var allItems = Array.from(document.querySelectorAll('.gallery-item'));
    var visibleItems = allItems.filter(function (it) { return it.style.display !== 'none'; });
    lightboxState.items = visibleItems.map(function (it) {
      return {
        image: it.getAttribute('data-image'),
        caption: it.getAttribute('data-caption'),
        category: it.getAttribute('data-category')
      };
    });
    lightboxState.index = visibleItems.indexOf(button);
    if (lightboxState.index === -1) lightboxState.index = 0;
    showLightbox();
  }

  // Открытие лайтбокса с фотографиями новости
  function openNewsLightbox(images, startIndex, title) {
    lightboxState.items = images.map(function (img, idx) {
      return {
        image: img,
        caption: title + ' - фото ' + (idx + 1) + ' из ' + images.length,
        category: 'Новость'
      };
    });
    lightboxState.index = startIndex || 0;
    if (lightboxState.index >= lightboxState.items.length) lightboxState.index = 0;
    showLightbox();
  }

  function showLightbox() {
    // Удаляем существующий lightbox
    var existing = document.getElementById('lightbox');
    if (existing) existing.remove();

    var item = lightboxState.items[lightboxState.index];
    if (!item) return;

    var lightbox = el('div', { class: 'lightbox', id: 'lightbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Просмотр фотографии', onclick: function (e) { if (e.target === lightbox) closeLightbox(); } }, []);

    lightbox.appendChild(el('button', { class: 'lightbox-close', 'aria-label': 'Закрыть', html: ICONS.x, onclick: closeLightbox }));

    if (lightboxState.items.length > 1) {
      lightbox.appendChild(el('button', { class: 'lightbox-prev', 'aria-label': 'Предыдущее фото', html: ICONS.chevronLeft, onclick: function (e) { e.stopPropagation(); lightboxState.index = (lightboxState.index - 1 + lightboxState.items.length) % lightboxState.items.length; showLightbox(); } }));
    }

    var figure = el('figure', { class: 'lightbox-figure', onclick: function (e) { e.stopPropagation(); } }, [
      el('img', { src: item.image, alt: item.caption, onerror: function (e) { e.target.src = 'images/news/no-photo.png'; } }),
      el('figcaption', { class: 'lightbox-caption' }, [
        el('div', { class: 'lightbox-category' }, item.category),
        el('div', { class: 'lightbox-caption-text' }, item.caption),
        el('div', { class: 'lightbox-counter' }, 'Фото ' + (lightboxState.index + 1) + ' из ' + lightboxState.items.length)
      ])
    ]);
    lightbox.appendChild(figure);

    if (lightboxState.items.length > 1) {
      lightbox.appendChild(el('button', { class: 'lightbox-next', 'aria-label': 'Следующее фото', html: ICONS.chevronRight, onclick: function (e) { e.stopPropagation(); lightboxState.index = (lightboxState.index + 1) % lightboxState.items.length; showLightbox(); } }));
    }

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.remove();
    document.body.style.overflow = '';
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: ДУХОВЕНСТВО
  // ─────────────────────────────────────────────────────────────────────────
  function renderClergy() {
    var clergy = window.CLERGY;
    var section = el('section', { class: 'section' }, [
      renderSectionHeading('Священнослужители', 'Духовенство храма', 'Священнослужители, совершающие богослужения и окормляющие прихожан нашего храма.')
    ]);

    if (clergy.length === 0) {
      section.appendChild(el('div', { class: 'empty-state' }, [
        el('div', { class: 'empty-state-icon' }, '✦'),
        el('div', { class: 'empty-state-title' }, 'Информация будет добавлена позже'),
        el('div', { class: 'empty-state-text' }, 'Информация о духовенстве появится позже.')
      ]));
    } else {
      section.appendChild(el('div', { class: 'clergy-grid' },
        clergy.map(function (member) {
          return el('article', { class: 'clergy-card' }, [
            el('div', { class: 'clergy-image' }, [
              el('img', { src: member.image, alt: member.name, loading: 'lazy', onerror: function (e) { e.target.src = 'images/news/no-photo.png'; } }),
              el('div', { class: 'clergy-image-gold-line' })
            ]),
            el('div', { class: 'clergy-content' }, [
              el('div', { class: 'clergy-role' }, member.role),
              el('h3', { class: 'clergy-name' }, member.name),
              el('p', { class: 'clergy-description' }, member.description)
            ])
          ]);
        })
      ));
    }
    return section;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: РАСПИСАНИЕ
  // ─────────────────────────────────────────────────────────────────────────
  function renderSchedule() {
    var schedule = window.SCHEDULE;
    var section = el('section', { class: 'section' }, [
      renderSectionHeading('Богослужения', 'Расписание на неделю', 'Точное время и порядок совершения богослужений в нашем храме. Приглашаем всех на совместную молитву.'),
      el('div', { class: 'schedule-list' },
        schedule.map(function (day) {
          return el('article', { class: 'schedule-day' }, [
            el('header', { class: 'schedule-day-header' }, [
              el('div', { class: 'schedule-day-info' }, [
                el('div', { class: 'schedule-day-icon', html: ICONS.calendar }),
                el('div', {}, [
                  el('div', { class: 'schedule-day-name' }, day.weekday),
                  el('div', { class: 'schedule-day-date' }, day.date)
                ])
              ]),
              el('div', { class: 'schedule-day-count' }, day.services.length + ' ' + pluralize(day.services.length, 'богослужение', 'богослужения', 'богослужений'))
            ]),
            el('ul', { class: 'schedule-services' },
              day.services.map(function (s) {
                return el('li', {}, [
                  el('div', { class: 'schedule-time', html: ICONS.clock + ' ' + s.time }),
                  el('div', { class: 'schedule-name' }, s.name)
                ]);
              })
            )
          ]);
        })
      ),
      el('p', { class: 'schedule-note' }, 'Время богослужений может изменяться в дни великих праздников. Уточняйте расписание по телефону храма.')
    ]);
    return section;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: О ХРАМЕ
  // ─────────────────────────────────────────────────────────────────────────
  function renderAbout() {
    var about = window.ABOUT;
    var section = el('section', { class: 'section' }, [
      renderSectionHeading('О нас', about.heroTitle, about.heroSubtitle),
      el('div', { class: 'about-text', style: 'max-width: 768px; margin: 48px auto 0;' },
        about.history.map(function (p) {
          return el('p', {}, p);
        })
      ),
      el('div', { class: 'about-facts' }, [
        el('h3', {}, 'Краткие сведения'),
        el('div', { class: 'about-facts-grid' },
          about.facts.map(function (fact) {
            return el('div', { class: 'about-fact' }, [
              el('div', { class: 'about-fact-label' }, fact.label),
              el('div', { class: 'about-fact-value' }, fact.value)
            ]);
          })
        )
      ])
    ]);

    if (about.images && about.images.length > 0) {
      section.appendChild(el('div', { class: 'about-images-grid' },
        about.images.map(function (img) {
          return el('figure', { class: 'about-image-card' }, [
            el('img', { src: img.image, alt: img.caption, loading: 'lazy', onerror: function (e) { e.target.src = 'images/news/no-photo.png'; } }),
            el('figcaption', {}, img.caption)
          ]);
        })
      ));
    }

    section.appendChild(el('div', { class: 'about-ornate-divider' }, [el('span', {}, '✦')]));
    return section;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: КОНТАКТЫ
  // ─────────────────────────────────────────────────────────────────────────
  function renderContacts() {
    var contacts = window.CONTACTS;
    var socials = [
      { name: 'ВКонтакте', href: contacts.social.vk, icon: ICONS.vk, class: 'vk' },
      { name: 'Telegram', href: contacts.social.telegram, icon: ICONS.telegram, class: 'telegram' },
      { name: 'WhatsApp', href: contacts.social.whatsapp, icon: ICONS.whatsapp, class: 'whatsapp' },
      { name: 'Сайт прихода', href: contacts.social.website, icon: ICONS.globe, class: 'website' }
    ].filter(function (s) { return s.href; });

    var section = el('section', { class: 'section bg-secondary' }, [
      el('div', { class: 'section-bg-secondary-inner' }, [
        renderSectionHeading('Связь', 'Контакты', 'Как связаться с храмом, найти его на карте и узнать часы работы.'),
        // Карточки с контактами
        el('div', { class: 'contacts-grid' }, [
          el('a', { href: 'tel:' + contacts.phone.replace(/[^+\d]/g, ''), class: 'contact-card' }, [
            el('div', { class: 'contact-card-icon', html: ICONS.phone }),
            el('div', {}, [
              el('div', { class: 'contact-card-label' }, 'Телефон'),
              el('div', { class: 'contact-card-value' }, contacts.phone)
            ])
          ]),
          el('a', { href: 'mailto:' + contacts.email, class: 'contact-card' }, [
            el('div', { class: 'contact-card-icon', html: ICONS.mail }),
            el('div', {}, [
              el('div', { class: 'contact-card-label' }, 'Электронная почта'),
              el('div', { class: 'contact-card-value' }, contacts.email)
            ])
          ]),
          el('div', { class: 'contact-card' }, [
            el('div', { class: 'contact-card-icon', html: ICONS.mapPin }),
            el('div', {}, [
              el('div', { class: 'contact-card-label' }, 'Адрес'),
              el('div', { class: 'contact-card-value' }, contacts.address)
            ])
          ]),
          el('div', { class: 'contact-card' }, [
            el('div', { class: 'contact-card-icon', html: ICONS.clock }),
            el('div', {}, [
              el('div', { class: 'contact-card-label' }, 'Часы работы'),
              el('ul', {}, contacts.workingHours.map(function (h) { return el('li', {}, h); }))
            ])
          ])
        ])
      ])
    ]);

    // Соцсети
    if (socials.length > 0) {
      section.appendChild(el('div', { class: 'contacts-socials' }, [
        el('div', { class: 'contacts-socials-label' }, 'Мы в социальных сетях'),
        el('div', { class: 'contacts-socials-list' },
          socials.map(function (s) {
            return el('a', { href: s.href, target: '_blank', rel: 'noopener noreferrer', class: 'social-icon ' + s.class, 'aria-label': s.name, title: s.name, html: s.icon });
          })
        )
      ]));
    }

    // Карта
    var mapSection = el('div', { class: 'section-bg-secondary-inner' }, [
      el('h3', { class: 'contacts-map-title' }, 'Как нас найти'),
      el('p', { class: 'contacts-map-address' }, contacts.address),
      el('div', { class: 'contacts-map' }, [
        el('iframe', {
          src: 'https://yandex.ru/map-widget/v1/?text=' + encodeURIComponent(contacts.mapQuery) + '&z=16',
          title: 'Карта проезда к храму',
          loading: 'lazy'
        })
      ]),
      el('div', { style: 'margin-top: 16px; text-align: center;' }, [
        el('a', { href: 'https://yandex.ru/maps/?text=' + encodeURIComponent(contacts.mapQuery), target: '_blank', rel: 'noopener noreferrer', class: 'contacts-map-link', html: ICONS.mapPin + ' Открыть в Яндекс.Картах' })
      ])
    ]);
    section.appendChild(mapSection);

    return section;
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: СТРАНИЦА ПОМОЩИ АДМИНИСТРАТОРУ
  // ─────────────────────────────────────────────────────────────────────────
  function renderAdminHelp() {
    var section = el('section', { class: 'admin-help' }, [
      // Заголовок
      el('div', { class: 'admin-help-header' }, [
        el('div', { class: 'admin-help-eyebrow' }, 'Для администратора сайта'),
        el('h1', { class: 'admin-help-title' }, 'Как добавить новость'),
        el('p', { class: 'admin-help-subtitle' }, 'Подробная инструкция для человека, который не разбирается в программировании. Следуйте шагам по порядку — и у вас всё получится.'),
        el('div', { class: 'admin-help-ornament' }, [el('span', {}, '✦')])
      ]),

      // Важное предупреждение
      el('div', { class: 'admin-help-alert' }, [
        el('div', { class: 'admin-help-alert-icon', html: ICONS.alertTriangle }),
        el('div', {}, [
          el('h2', {}, 'Главное, что нужно знать'),
          el('p', { html: 'Чтобы добавить новость, нужно изменить <strong>только один файл</strong>:' }),
          el('code', {}, 'news.js'),
          el('p', { style: 'margin-top: 8px;', text: 'Все остальные файлы проекта трогать не нужно. Сайт автоматически отсортирует новости по дате, рассчитает страницы и обновит архив.' })
        ])
      ]),

      // Шаги
      el('div', { class: 'admin-help-steps' }, [
        renderAdminStep(1, ICONS.fileText, 'Подготовьте фотографию', 'bg-blue', [
          el('p', { html: 'Возьмите фотографию в формате <strong>.png</strong> или <strong>.jpg</strong>. Лучше всего — горизонтальная фотография (шире, чем выше).' }),
          el('div', { class: 'admin-help-info-box', html: '<strong>Как назвать файл:</strong> используйте только латинские буквы, цифры и дефис. Например: <code>news-005.png</code><br><strong>НЕ используйте</strong> пробелы, кириллицу или спецсимволы в названии файла.' })
        ]),
        renderAdminStep(2, ICONS.upload, 'Положите фотографию в папку', 'bg-purple', [
          el('p', { html: 'Откройте папку с фотографиями новостей:' }),
          el('code', { class: 'admin-help-code-block' }, 'images/news/'),
          el('p', { style: 'margin-top: 12px;', html: 'Скопируйте туда вашу фотографию. Например, файл <code>news-005.png</code> должен оказаться по пути: <code>images/news/news-005.png</code>' })
        ]),
        renderAdminStep(3, ICONS.fileText, 'Откройте файл news.js', 'bg-orange', [
          el('p', { html: 'Откройте файл с новостями в любом текстовом редакторе (например, прямо на GitHub через кнопку «Edit»):' }),
          el('code', { class: 'admin-help-code-block' }, 'news.js'),
          el('p', { style: 'margin-top: 12px;', html: 'Прокрутите вниз до строки <code>const NEWS = [</code> — это начало списка новостей.' })
        ]),
        renderAdminStep(4, ICONS.fileText, 'Скопируйте готовый блок новости', 'bg-teal', [
          el('p', { html: 'Найдите ниже в файле любой готовый блок новости (он выглядит как блок текста от фигурной скобки <code>{</code> до <code>}</code>).' }),
          el('div', { class: 'admin-help-code-block' }, '{\n  date: "15 мая 2026",\n  title: "Праздник...",\n  image: "images/news/news-001.png",\n  excerpt: "Краткое описание...",\n  content: `Полный текст...`\n}'),
          el('p', { style: 'margin-top: 12px;', html: 'Скопируйте этот блок целиком (выделите от <code>{</code> до <code>}</code> и нажмите Ctrl+C).' })
        ]),
        renderAdminStep(5, ICONS.alignLeft, 'Вставьте блок и замените данные', 'bg-pink', [
          el('p', { html: 'Поставьте курсор сразу после строки <code>const NEWS = [</code>, нажмите Enter и вставьте (Ctrl+V) скопированный блок.' }),
          el('p', { style: 'margin-top: 16px; font-weight: 600;' }, 'Теперь замените поля по очереди:'),
          el('div', { class: 'admin-help-field' }, [
            el('div', { class: 'admin-help-field-header' }, [
              el('span', { html: ICONS.type }),
              el('code', { class: 'admin-help-field-name' }, 'date'),
              el('span', { class: 'admin-help-field-hint' }, '- Дата словами')
            ]),
            el('div', { class: 'admin-help-field-code' }, 'date: "15 мая 2026",')
          ]),
          el('div', { class: 'admin-help-field' }, [
            el('div', { class: 'admin-help-field-header' }, [
              el('span', { html: ICONS.type }),
              el('code', { class: 'admin-help-field-name' }, 'title'),
              el('span', { class: 'admin-help-field-hint' }, '- Заголовок новости')
            ]),
            el('div', { class: 'admin-help-field-code' }, 'title: "Праздник в честь иконы",')
          ]),
          el('div', { class: 'admin-help-field' }, [
            el('div', { class: 'admin-help-field-header' }, [
              el('span', { html: ICONS.fileText }),
              el('code', { class: 'admin-help-field-name' }, 'images'),
              el('span', { class: 'admin-help-field-hint' }, '- Фотографии (можно несколько!)')
            ]),
            el('div', { class: 'admin-help-field-code' }, 'images: [' + '\n' + '  "images/news/news-001.png",' + '\n' + '  "images/news/news-002.png",' + '\n' + '  "images/news/news-003.png"' + '\n' + '],'),
            el('div', { class: 'admin-help-info-box', style: 'margin-top: 8px; font-size: 13px;', html: 'Можно указать <strong>1, 2, 5, 10 и больше</strong> фотографий. Каждая в кавычках, разделяются запятой. На главной показывается первая, на странице новости - мини-галерея со всеми.' }),
            el('div', { class: 'admin-help-info-box', style: 'margin-top: 4px; font-size: 13px;', html: 'Старый формат тоже работает: <code>image: "images/news/news-001.png"</code> (одна фотография).' })
          ]),
          el('div', { class: 'admin-help-field' }, [
            el('div', { class: 'admin-help-field-header' }, [
              el('span', { html: ICONS.alignLeft }),
              el('code', { class: 'admin-help-field-name' }, 'excerpt'),
              el('span', { class: 'admin-help-field-hint' }, '- Краткое описание')
            ]),
            el('div', { class: 'admin-help-field-code' }, 'excerpt: "Приглашаем всех на богослужение.",')
          ]),
          el('div', { class: 'admin-help-field' }, [
            el('div', { class: 'admin-help-field-header' }, [
              el('span', { html: ICONS.fileText }),
              el('code', { class: 'admin-help-field-name' }, 'content'),
              el('span', { class: 'admin-help-field-hint' }, '- Полный текст (между обратными кавычками)')
            ]),
            el('div', { class: 'admin-help-field-code' }, 'content: `\nЗдесь полный текст новости.\n`')
          ])
        ]),
        renderAdminStep(6, ICONS.save, 'Сохраните файл', 'bg-green', [
          el('p', { html: 'Нажмите <strong>Ctrl+S</strong> (или кнопку «Save» / «Commit changes» на GitHub). Файл сохранён.' })
        ]),
        renderAdminStep(7, ICONS.upload, 'Отправьте изменения на GitHub', 'bg-indigo', [
          el('p', { html: 'Если вы редактировали прямо на GitHub — нажмите зелёную кнопку <strong>«Commit changes»</strong>.' }),
          el('p', { style: 'margin-top: 8px;', html: 'Если вы редактировали локально — выполните в терминале:' }),
          el('code', { class: 'admin-help-code-block' }, 'git add news.js images/news/news-005.png\ngit commit -m "Добавлена новость"\ngit push' )
        ]),
        renderAdminStep(8, ICONS.checkCircle, 'Готово! Сайт обновится автоматически', 'bg-emerald', [
          el('p', { html: 'Через 1-2 минуты сайт автоматически пересоберётся и опубликуется. Ваша новость:' }),
          el('ul', {}, [
            el('li', { html: '<span>' + ICONS.checkCircle + '</span> <span>появится <strong>первой</strong> в списке новостей</span>' }),
            el('li', { html: '<span>' + ICONS.checkCircle + '</span> <span>покажется на главной странице</span>' }),
            el('li', { html: '<span>' + ICONS.checkCircle + '</span> <span>добавится в архив за текущий год</span>' }),
            el('li', { html: '<span>' + ICONS.checkCircle + '</span> <span>будет находиться через поиск</span>' }),
            el('li', { html: '<span>' + ICONS.checkCircle + '</span> <span>получит свою уникальную ссылку</span>' })
          ])
        ])
      ]),

      // Возможные проблемы
      el('div', { class: 'admin-help-troubleshooting' }, [
        el('h2', {}, 'Если что-то пошло не так'),
        el('div', {}, [
          el('strong', {}, 'Забыли фотографию?'),
          el('p', {}, 'Ничего страшного. Сайт покажет запасное изображение. Просто новость будет без вашей фотографии.')
        ]),
        el('div', {}, [
          el('strong', {}, 'Удалили кавычку по ошибке?'),
          el('p', { html: 'Сайт может не собраться. Откройте файл, проверьте, что все тексты в кавычках <code>"..."</code>, а полный текст — в обратных кавычках <code>&#96;...&#96;</code>. После каждой закрывающей скобки <code>}</code> должна стоять запятая <code>,</code>.' })
        ]),
        el('div', {}, [
          el('strong', {}, 'Сайт не обновился?'),
          el('p', {}, 'Подождите 2-3 минуты. Если сборка упала с ошибкой — скорее всего, в файле news.js пропущена кавычка или запятая.')
        ])
      ]),

      // Кнопка "На главную"
      el('div', { style: 'margin-top: 40px; text-align: center;' }, [
        el('a', { href: '#/', class: 'btn-primary', html: ICONS.home + ' Вернуться на главную ' + ICONS.arrowRight })
      ])
    ]);

    return section;
  }

  function renderAdminStep(number, icon, title, colorClass, children) {
    return el('div', { class: 'admin-help-step' }, [
      el('div', { class: 'admin-help-step-header' }, [
        el('div', { class: 'admin-help-step-icon ' + colorClass, html: icon }),
        el('div', {}, [
          el('div', { class: 'admin-help-step-number' }, 'Шаг ' + number),
          el('h3', { class: 'admin-help-step-title' }, title)
        ])
      ]),
      el('div', { class: 'admin-help-step-body' }, children)
    ]);
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  РЕНДЕР: 404
  // ─────────────────────────────────────────────────────────────────────────
  function renderNotFound() {
    return el('section', { class: 'not-found' }, [
      el('div', { class: 'not-found-icon' }, '✦'),
      el('h1', {}, 'Раздел не найден'),
      el('p', {}, 'К сожалению, запрошенный раздел не существует.'),
      el('a', { href: '#/', class: 'btn-primary', html: ICONS.home + ' На главную' })
    ]);
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  ЗАПОЛНЕНИЕ HEADER / FOOTER
  // ─────────────────────────────────────────────────────────────────────────
  function fillHeaderAndFooter() {
    var site = window.SITE;
    var contacts = window.CONTACTS;

    // Header
    document.getElementById('header-name').textContent = site.shortName;
    document.getElementById('header-tagline').textContent = site.tagline;
    document.getElementById('drawer-name').textContent = site.shortName;
    document.getElementById('drawer-footer-name').textContent = site.shortName;

    // Drawer nav
    var drawerNav = document.getElementById('drawer-nav');
    drawerNav.innerHTML = '';
    var ul = el('ul', {});
    window.NAVIGATION.forEach(function (item, idx) {
      var li = el('li', {}, [
        el('a', {
          href: item.hash ? '#/' + item.hash : '#/',
          'data-hash': item.hash || '',
          onclick: function () { closeMenu(); }
        }, [
          el('span', { class: 'drawer-nav-number' }, String(idx + 1).padStart(2, '0')),
          el('span', {}, item.label)
        ])
      ]);
      ul.appendChild(li);
    });
    drawerNav.appendChild(ul);

    // Footer
    var year = new Date().getFullYear();
    document.getElementById('footer-name').textContent = site.shortName;
    document.getElementById('footer-tagline').textContent = site.tagline;
    document.getElementById('footer-description').textContent = site.footerDescription;
    document.getElementById('footer-year').textContent = year;
    document.getElementById('footer-year-bottom').textContent = year;
    document.getElementById('footer-copyright-name').textContent = site.name;

    // Footer nav
    var footerNav = document.getElementById('footer-nav');
    footerNav.innerHTML = '';
    window.NAVIGATION.forEach(function (item) {
      footerNav.appendChild(el('li', {}, [
        el('a', { href: item.hash ? '#/' + item.hash : '#/' }, item.label)
      ]));
    });

    // Footer contacts
    var footerContacts = document.getElementById('footer-contacts');
    footerContacts.innerHTML = '';
    footerContacts.appendChild(el('li', {}, [
      el('a', { href: 'tel:' + contacts.phone.replace(/[^+\d]/g, ''), html: ICONS.phone + ' ' + contacts.phone })
    ]));
    footerContacts.appendChild(el('li', {}, [
      el('a', { href: 'mailto:' + contacts.email, html: ICONS.mail + ' ' + contacts.email })
    ]));
    footerContacts.appendChild(el('li', {}, [
      el('span', { html: ICONS.mapPin + ' ' + contacts.address })
    ]));

    // Working hours
    var footerHours = document.getElementById('footer-hours');
    footerHours.innerHTML = '';
    footerHours.appendChild(el('div', { class: 'footer-working-hours-title', html: ICONS.clock + ' Часы работы' }));
    footerHours.appendChild(el('ul', {}, contacts.workingHours.map(function (h) {
      return el('li', {}, h);
    })));

    // Socials
    var footerSocials = document.getElementById('footer-socials');
    footerSocials.innerHTML = '';
    var socials = [
      { name: 'ВКонтакте', href: contacts.social.vk, icon: ICONS.vk, class: 'vk' },
      { name: 'Telegram', href: contacts.social.telegram, icon: ICONS.telegram, class: 'telegram' },
      { name: 'WhatsApp', href: contacts.social.whatsapp, icon: ICONS.whatsapp, class: 'whatsapp' },
      { name: 'Сайт прихода', href: contacts.social.website, icon: ICONS.globe, class: 'website' }
    ];
    socials.forEach(function (s) {
      if (s.href) {
        footerSocials.appendChild(el('a', {
          href: s.href,
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'footer-social ' + s.class,
          'aria-label': s.name,
          title: s.name,
          html: s.icon
        }));
      }
    });
  }

  function updateActiveMenu() {
    var route = parseHash();
    var currentHash = route.section || '';
    var links = document.querySelectorAll('.drawer-nav a');
    links.forEach(function (link) {
      var hash = link.getAttribute('data-hash') || '';
      link.classList.toggle('active', hash === currentHash);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  МЕНЮ (DRAWER)
  // ─────────────────────────────────────────────────────────────────────────
  function openMenu() {
    document.getElementById('drawer').classList.add('open');
    document.getElementById('drawer-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('drawer-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  ИНИЦИАЛИЗАЦИЯ
  // ─────────────────────────────────────────────────────────────────────────
  function init() {
    fillHeaderAndFooter();

    // Меню
    document.getElementById('menu-button').addEventListener('click', openMenu);
    document.getElementById('drawer-close').addEventListener('click', closeMenu);
    document.getElementById('drawer-overlay').addEventListener('click', closeMenu);

    // ESC для закрытия меню и лайтбокса
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMenu();
        closeLightbox();
      } else if (e.key === 'ArrowLeft' && document.getElementById('lightbox')) {
        // Предыдущее фото в лайтбоксе
        if (lightboxState.items.length > 1) {
          lightboxState.index = (lightboxState.index - 1 + lightboxState.items.length) % lightboxState.items.length;
          showLightbox();
        }
      } else if (e.key === 'ArrowRight' && document.getElementById('lightbox')) {
        // Следующее фото в лайтбоксе
        if (lightboxState.items.length > 1) {
          lightboxState.index = (lightboxState.index + 1) % lightboxState.items.length;
          showLightbox();
        }
      }
    });

    // Хеш-роутер
    window.addEventListener('hashchange', handleRoute);

    // Обработка кликов по ссылкам (для скролла наверх)
    document.addEventListener('click', function (e) {
      var target = e.target.closest('a[href^="#"]');
      if (target) {
        setTimeout(function () { window.scrollTo({ top: 0, behavior: 'auto' }); }, 50);
      }
    });

    // Первый рендер
    handleRoute();
  }

  // Запуск после загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
