// Shared event navigation for all transcript pages
// Format: date — location — title

function eventLabel(e, isEs) {
    var date = isEs ? e.date_es : e.date;
    var title = isEs ? e.title_es : e.title;
    return date + ' \u2014 ' + e.location + ' \u2014 ' + title;
}

function loadTalkSelector(lang) {
    var jsonPath = window.location.pathname.indexOf('/events/') !== -1 &&
        window.location.pathname.split('/events/')[1].split('/').filter(Boolean).length > 0
        ? '../events.json' : 'events.json';

    fetch(jsonPath).then(function(r) { return r.json(); }).then(function(events) {
        var sel = document.getElementById('talk-select');
        if (!sel) return;
        var current = window.location.pathname.split('/').filter(Boolean).pop();
        var isEs = lang === 'es';
        var prefix = jsonPath === 'events.json' ? '' : '../';
        var synthPath = jsonPath === 'events.json' ? '../' : '../../';
        var synthLabel = isEs ? 'Resumen de Charlas — Informe IA de ideas principales de todas las charlas' : 'Summary of Talks — AI-generated report of main ideas from all the talks';
        sel.innerHTML = '<option value="">' + (isEs ? '-- Elegir --' : '-- Choose --') + '</option>' +
            events.filter(function(e) { return e.folder !== current; }).map(function(e) {
                return '<option value="' + prefix + e.folder + '/">' + eventLabel(e, isEs) + '</option>';
            }).join('') +
            '<option value="' + synthPath + '?lang=' + lang + '">' + synthLabel + '</option>';
    }).catch(function() {});
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
