// Shared event navigation for all transcript pages
// Format: date — location — title

async function loadTranscript(lang) {
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-es').classList.toggle('active', lang === 'es');

    // Bilingual page header
    const h1 = document.querySelector('header h1');
    if (h1 && h1.dataset.titleEn) {
        h1.textContent = lang === 'es' ? h1.dataset.titleEs : h1.dataset.titleEn;
    }
    const sub = document.getElementById('header-subtitle');
    if (sub && sub.dataset.subtitleEn) {
        sub.innerHTML = lang === 'es' ? sub.dataset.subtitleEs : sub.dataset.subtitleEn;
    }

    // Bilingual "select another talk" label
    const labelEn = document.getElementById('other-talks-label');
    const labelEs = document.getElementById('other-talks-label-es');
    if (labelEn) labelEn.style.display = lang === 'es' ? 'none' : '';
    if (labelEs) labelEs.style.display = lang === 'es' ? '' : 'none';

    loadTalkSelector(lang);

    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);

    const el = document.getElementById('content');
    el.innerHTML = '<p id="loading">Loading...</p>';
    try {
        const res = await fetch('transcript-' + lang + '.md');
        if (!res.ok) throw new Error('File not found');
        const md = await res.text();
        el.innerHTML = marked.parse(md);
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (e) {
        el.innerHTML = '<p style="color:#c00;">Could not load transcript. Please try again.</p>';
    }
}

async function loadResources() {
    try {
        const res = await fetch('resources.json');
        if (!res.ok) return;
        const data = await res.json();
        if (!data.resources || data.resources.length === 0) return;

        const audioItems  = data.resources.filter(r => r.type === 'audio' || r.type === 'audio-external');
        const fullPdfs    = data.resources.filter(r => r.type === 'pdf' && !r.compact);
        const compactPdfs = data.resources.filter(r => r.type === 'pdf' && r.compact);

        const audioEl = document.getElementById('resources-audio');
        if (!audioEl) return;
        let audioHtml = '';
        audioItems.forEach(r => {
            if (r.type === 'audio-external') {
                const metaParts = [r.description, r.source].filter(Boolean);
                audioHtml += `
                    <div class="resource-audio-card">
                        <div class="resource-body">
                            <div class="resource-title">${r.title}</div>
                            <div class="resource-meta">${metaParts.join(' &middot; ')}</div>
                            <a class="resource-download" href="${r.url}" target="_blank" rel="noopener">Listen on ${r.source} &rarr;</a>
                        </div>
                    </div>`;
            } else {
                const fileSrc    = 'resources/' + encodeURIComponent(r.file);
                const coverSrc   = r.cover ? 'resources/' + encodeURIComponent(r.cover) : '';
                const licenseStr = r.license_url
                    ? `<a class="resource-download" href="${r.license_url}" target="_blank" rel="noopener">${r.license}</a>`
                    : (r.license || '');
                const metaParts  = [r.description, r.artist, licenseStr].filter(Boolean);
                const downloadLink = r.no_download
                    ? (r.external_url ? ` &middot; <a class="resource-download" href="${r.external_url}" target="_blank" rel="noopener">Listen on ${r.external_source} &rarr;</a>` : '')
                    : ` &middot; <a class="resource-download" href="${fileSrc}" download>Download</a>`;
                const mime       = r.file.endsWith('.mp3') ? 'audio/mpeg' : 'audio/mp4';
                const coverClick = coverSrc ? `onclick="document.getElementById('img-modal-img').src=this.src;document.getElementById('img-modal').classList.add('open')"` : '';
                audioHtml += `
                    <div class="resource-audio-card">
                        ${coverSrc ? `<img class="resource-cover" src="${coverSrc}" alt="${r.title}" ${coverClick}>` : ''}
                        <div class="resource-body">
                            <div class="resource-title">${r.title}</div>
                            <div class="resource-meta">${metaParts.join(' &middot; ')}${downloadLink}</div>
                            <audio class="resource-player" controls preload="none">
                                <source src="${fileSrc}" type="${mime}">
                            </audio>
                        </div>
                    </div>`;
            }
        });
        audioEl.innerHTML = audioHtml;

        // Exclusive playback: starting one track pauses all others
        document.querySelectorAll('.resource-player').forEach(player => {
            player.addEventListener('play', () => {
                document.querySelectorAll('.resource-player').forEach(other => {
                    if (other !== player) other.pause();
                });
            });
        });

        if (fullPdfs.length > 0 || compactPdfs.length > 0) {
            const pdfsEl = document.getElementById('resources-pdfs');
            if (pdfsEl) {
                let pdfsHtml = '<div class="resources-heading">Translation Reference</div>';
                fullPdfs.forEach(r => {
                    const fileSrc = 'resources/' + encodeURIComponent(r.file);
                    const badge   = r.lang ? `<span class="lang-badge">${r.lang.toUpperCase()}</span>` : '';
                    pdfsHtml += `
                        <div class="resource-pdf-item">
                            <i class="pdf-icon">PDF</i>
                            <a href="${fileSrc}" target="_blank">${r.title}</a>${badge}
                        </div>`;
                });
                if (compactPdfs.length > 0) {
                    pdfsHtml += '<details class="compact-pdfs"><summary>Compact versions</summary><div class="compact-list">';
                    compactPdfs.forEach(r => {
                        const fileSrc = 'resources/' + encodeURIComponent(r.file);
                        const badge   = r.lang ? `<span class="lang-badge">${r.lang.toUpperCase()}</span>` : '';
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

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('img-modal');
        if (modal) modal.classList.remove('open');
    }
});



function eventLabel(e, isEs) {
    var date = isEs ? e.date_es : e.date;
    var title = isEs ? e.title_es : e.title;
    return date + ' \u2014 ' + e.location + ' \u2014 ' + title;
}

function loadTalkSelector(lang) {
    var inEventSubpage = window.location.pathname.indexOf('/events/') !== -1 &&
        window.location.pathname.split('/events/')[1].split('/').filter(Boolean).length > 0;
    var inEventsDir = !inEventSubpage && window.location.pathname.indexOf('/events') !== -1;

    var jsonPath, prefix, synthPath;
    if (inEventSubpage) {
        jsonPath = '../events.json';
        prefix   = '../';
        synthPath = '../../';
    } else if (inEventsDir) {
        jsonPath  = 'events.json';
        prefix    = '';
        synthPath = '../';
    } else {
        // Root / synthesis page
        jsonPath  = 'events/events.json';
        prefix    = 'events/';
        synthPath = './';
    }

    fetch(jsonPath).then(function(r) { return r.json(); }).then(function(events) {
        var sel = document.getElementById('talk-select');
        if (!sel) return;
        var current = window.location.pathname.split('/').filter(Boolean).pop();
        var isEs = lang === 'es';
        var onSynthesisPage = !inEventSubpage && !inEventsDir && window.location.pathname.endsWith('/');
        var synthLabel = isEs ? 'Resumen de Charlas — Informe IA de ideas principales de todas las charlas' : 'Summary of Talks — AI-generated report of main ideas from all the talks';
        var glossPath = synthPath + 'glossary.html?lang=' + lang;
        var glossLabel = isEs ? 'Glosario de Términos — Definiciones de términos del yoga y sánscrito' : 'Glossary of Terms — Definitions of yoga and Sanskrit terms';
        var synthOption = onSynthesisPage ? '' :
            '<option value="' + synthPath + '?lang=' + lang + '">' + synthLabel + '</option>';
        sel.innerHTML = '<option value="">' + (isEs ? '-- Elegir --' : '-- Choose --') + '</option>' +
            synthOption +
            events.filter(function(e) { return e.folder !== current; }).map(function(e) {
                return '<option value="' + prefix + e.folder + '/">' + eventLabel(e, isEs) + '</option>';
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
        var isEs = lang === 'es';
        el.innerHTML = '<ul>' + events.map(function(e) {
            return '<li><a href="' + e.folder + '/?lang=' + lang + '">' + eventLabel(e, isEs) + '</a></li>';
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
