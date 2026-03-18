// Shared event navigation for all transcript pages

var _eventsCache = null;

async function _loadEvents(path) {
    if (_eventsCache) return _eventsCache;
    var r = await fetch(path);
    _eventsCache = await r.json();
    return _eventsCache;
}

async function loadTranscript(lang) {
    var isEs = lang === 'es';
    var isNe = lang === 'ne';

    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-es').classList.toggle('active', isEs);
    var btnNe = document.getElementById('btn-ne');
    if (btnNe) btnNe.classList.toggle('active', isNe);

    // Load title/subtitle from events.json cache
    try {
        var events = await _loadEvents('../events.json');
        var folder = window.location.pathname.split('/').filter(Boolean).pop();
        var ev = events.find(function(e) { return e.folder === folder; });
        if (ev) {
            var h1 = document.querySelector('header h1');
            if (h1) {
                h1.textContent = isNe ? ev.title_ne : (isEs ? ev.title_es : ev.title);
            }
            var sub = document.getElementById('header-subtitle');
            if (sub) {
                var subtitle = isNe ? ev.subtitle_ne : (isEs ? ev.subtitle_es : ev.subtitle_en);
                if (subtitle) sub.innerHTML = subtitle;
            }
        }
    } catch(err) {
        // fallback: use data-attrs if present
        var h1 = document.querySelector('header h1');
        if (h1 && h1.dataset.titleEn) {
            h1.textContent = isEs ? h1.dataset.titleEs : h1.dataset.titleEn;
        }
        var sub = document.getElementById('header-subtitle');
        if (sub && sub.dataset.subtitleEn) {
            sub.innerHTML = isEs ? sub.dataset.subtitleEs : sub.dataset.subtitleEn;
        }
    }

    // "Select another talk" label — single span, content set by lang
    var labelEl = document.getElementById('other-talks-label');
    if (labelEl) {
        var href = labelEl.dataset.href || '../';
        if (isNe) {
            labelEl.innerHTML = 'अर्को चर्चा <a href="' + href + '">छान्नुहोस्</a>:';
        } else if (isEs) {
            labelEl.innerHTML = 'Ver <a href="' + href + '">otra charla</a>:';
        } else {
            labelEl.innerHTML = 'Select <a href="' + href + '">another talk</a>:';
        }
    }
    // Hide old ES label span if present (backwards compat)
    var labelEs = document.getElementById('other-talks-label-es');
    if (labelEs) labelEs.style.display = 'none';

    loadTalkSelector(lang);

    var url = new URL(window.location);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);

    var el = document.getElementById('content');
    el.innerHTML = '<p id="loading">Loading...</p>';
    try {
        var res = await fetch('transcript-' + lang + '.md');
        if (!res.ok) throw new Error('File not found');
        var md = await res.text();
        el.innerHTML = marked.parse(md);
        if (window.location.hash) {
            var target = document.querySelector(window.location.hash);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (e) {
        el.innerHTML = '<p style="color:#c00;">Could not load transcript. Please try again.</p>';
    }
}

async function loadResources() {
    try {
        var res = await fetch('resources.json');
        if (!res.ok) return;
        var data = await res.json();
        if (!data.resources || data.resources.length === 0) return;

        var audioItems  = data.resources.filter(function(r) { return r.type === 'audio' || r.type === 'audio-external'; });
        var fullPdfs    = data.resources.filter(function(r) { return r.type === 'pdf' && !r.compact; });
        var compactPdfs = data.resources.filter(function(r) { return r.type === 'pdf' && r.compact; });

        var audioEl = document.getElementById('resources-audio');
        if (!audioEl) return;
        var audioHtml = '';
        audioItems.forEach(function(r) {
            if (r.type === 'audio-external') {
                var metaParts = [r.description, r.source].filter(Boolean);
                audioHtml += `
                    <div class="resource-audio-card">
                        <div class="resource-body">
                            <div class="resource-title">${r.title}</div>
                            <div class="resource-meta">${metaParts.join(' &middot; ')}</div>
                            <a class="resource-download" href="${r.url}" target="_blank" rel="noopener">Listen on ${r.source} &rarr;</a>
                        </div>
                    </div>`;
            } else {
                var fileSrc    = 'resources/' + encodeURIComponent(r.file);
                var coverSrc   = r.cover ? 'resources/' + encodeURIComponent(r.cover) : '';
                var licenseStr = r.license_url
                    ? `<a class="resource-download" href="${r.license_url}" target="_blank" rel="noopener">${r.license}</a>`
                    : (r.license || '');
                var metaPartsA = [r.description, r.artist, licenseStr].filter(Boolean);
                var downloadLink = r.no_download
                    ? (r.external_url ? ` &middot; <a class="resource-download" href="${r.external_url}" target="_blank" rel="noopener">Listen on ${r.external_source} &rarr;</a>` : '')
                    : ` &middot; <a class="resource-download" href="${fileSrc}" download>Download</a>`;
                var mime       = r.file.endsWith('.mp3') ? 'audio/mpeg' : 'audio/mp4';
                var coverClick = coverSrc ? `onclick="document.getElementById('img-modal-img').src=this.src;document.getElementById('img-modal').classList.add('open')"` : '';
                audioHtml += `
                    <div class="resource-audio-card">
                        ${coverSrc ? `<img class="resource-cover" src="${coverSrc}" alt="${r.title}" ${coverClick}>` : ''}
                        <div class="resource-body">
                            <div class="resource-title">${r.title}</div>
                            <div class="resource-meta">${metaPartsA.join(' &middot; ')}${downloadLink}</div>
                            <audio class="resource-player" controls preload="none">
                                <source src="${fileSrc}" type="${mime}">
                            </audio>
                        </div>
                    </div>`;
            }
        });
        audioEl.innerHTML = audioHtml;

        // Exclusive playback: starting one track pauses all others
        document.querySelectorAll('.resource-player').forEach(function(player) {
            player.addEventListener('play', function() {
                document.querySelectorAll('.resource-player').forEach(function(other) {
                    if (other !== player) other.pause();
                });
            });
        });

        if (fullPdfs.length > 0 || compactPdfs.length > 0) {
            var pdfsEl = document.getElementById('resources-pdfs');
            if (pdfsEl) {
                var pdfsHtml = '<div class="resources-heading">Translation Reference</div>';
                fullPdfs.forEach(function(r) {
                    var fileSrc = 'resources/' + encodeURIComponent(r.file);
                    var badge   = r.lang ? `<span class="lang-badge">${r.lang.toUpperCase()}</span>` : '';
                    pdfsHtml += `
                        <div class="resource-pdf-item">
                            <i class="pdf-icon">PDF</i>
                            <a href="${fileSrc}" target="_blank">${r.title}</a>${badge}
                        </div>`;
                });
                if (compactPdfs.length > 0) {
                    pdfsHtml += '<details class="compact-pdfs"><summary>Compact versions</summary><div class="compact-list">';
                    compactPdfs.forEach(function(r) {
                        var fileSrc = 'resources/' + encodeURIComponent(r.file);
                        var badge   = r.lang ? `<span class="lang-badge">${r.lang.toUpperCase()}</span>` : '';
                        pdfsHtml += `
                            <div class="resource-pdf-item">
                                <i class="pdf-icon">PDF</i>
                                <a href="${fileSrc}" target="_blank">${r.title}</a>${badge}
                            </div>`;
                    });
                    pdfsHtml += '</div></details>';
                }
                pdfsEl.innerHTML = pdfsHtml;
            }
        }

        document.getElementById('resources-section').style.display = 'block';
    } catch (e) {
        // No resources.json — section stays hidden
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var modal = document.getElementById('img-modal');
        if (modal) modal.classList.remove('open');
    }
});


function eventLabel(e, lang) {
    var date  = lang === 'ne' ? e.date_ne  : (lang === 'es' ? e.date_es  : e.date);
    var title = lang === 'ne' ? e.title_short_ne : (lang === 'es' ? e.title_short_es : e.title_short);
    return date + ' \u2014 ' + e.location + ' \u2014 ' + title;
}

function loadTalkSelector(lang) {
    var inEventSubpage = window.location.pathname.indexOf('/events/') !== -1 &&
        window.location.pathname.split('/events/')[1].split('/').filter(Boolean).length > 0;
    var inEventsDir = !inEventSubpage && window.location.pathname.indexOf('/events') !== -1;

    var jsonPath, prefix, synthPath;
    if (inEventSubpage) {
        jsonPath   = '../events.json';
        prefix     = '../';
        synthPath  = '../../';
    } else if (inEventsDir) {
        jsonPath   = 'events.json';
        prefix     = '';
        synthPath  = '../';
    } else {
        // Root / synthesis / glossary page
        jsonPath   = 'events/events.json';
        prefix     = 'events/';
        synthPath  = './';
    }

    fetch(jsonPath).then(function(r) { return r.json(); }).then(function(events) {
        var sel = document.getElementById('talk-select');
        if (!sel) return;
        var current = window.location.pathname.split('/').filter(Boolean).pop();
        var isEs = lang === 'es';
        var isNe = lang === 'ne';
        var onSynthesisPage = !inEventSubpage && !inEventsDir && window.location.pathname.endsWith('/');

        var synthLabel = isNe
            ? 'सबै कुराहरूको सारांश — सबै चर्चाका मुख्य विचार'
            : (isEs
                ? 'Resumen de Charlas — Informe IA de ideas principales de todas las charlas'
                : 'Summary of Talks — AI-generated report of main ideas from all the talks');
        var glossPath = synthPath + 'glossary.html?lang=' + lang;
        var glossLabel = isNe
            ? 'शब्दावली — योग र संस्कृत शब्दहरूको परिभाषा'
            : (isEs
                ? 'Glosario de Términos — Definiciones de términos del yoga y sánscrito'
                : 'Glossary of Terms — Definitions of yoga and Sanskrit terms');
        var choosePlaceholder = isNe ? '-- छान्नुहोस् --' : (isEs ? '-- Elegir --' : '-- Choose --');

        var synthOption = onSynthesisPage ? '' :
            '<option value="' + synthPath + '?lang=' + lang + '">' + synthLabel + '</option>';

        sel.innerHTML = '<option value="">' + choosePlaceholder + '</option>' +
            synthOption +
            events.filter(function(e) { return e.folder !== current; }).map(function(e) {
                return '<option value="' + prefix + e.folder + '/?lang=' + lang + '">' + eventLabel(e, lang) + '</option>';
            }).join('') +
            '<option value="' + glossPath + '" data-newtab="true">' + glossLabel + '</option>';
    }).catch(function() {});
}

function handleTalkSelect(sel) {
    var opt = sel.options[sel.selectedIndex];
    if (!opt || !opt.value) return;
    if (opt.dataset && opt.dataset.newtab) {
        window.open(opt.value, '_blank');
        sel.selectedIndex = 0;
    } else {
        window.location.href = opt.value;
    }
}

function loadEventsList(lang) {
    fetch('events.json').then(function(r) { return r.json(); }).then(function(events) {
        var el = document.getElementById('events');
        if (!el) return;
        el.innerHTML = '<ul>' + events.map(function(e) {
            return '<li><a href="' + e.folder + '/?lang=' + lang + '">' + eventLabel(e, lang) + '</a></li>';
        }).join('') + '</ul>';
    }).catch(function() {
        var el = document.getElementById('events');
        if (el) el.innerHTML = '<p style="color:#c00;">Could not load events.</p>';
    });
}

// Configure marked link renderer (only on pages that load marked)
if (typeof marked !== 'undefined') {
    marked.use({ renderer: { link({ href, title, text }) {
        return `<a href="${href}"${title ? ` title="${title}"` : ''} target="_blank" rel="noopener">${text}</a>`;
    } } });
}
