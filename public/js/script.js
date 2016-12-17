/**
 * Copyright © 2016 Dekka Inc. All Rights Reserved.
 */

'use strict'

$(function () {
    var options = {
        valueNames: ['date', 'group', 'campaign', 'method', 'producer', 'path', 'status', 'duration']
    }
    var documentTable = new List('mdl-table', options)

    /* Menu */
    $('.mdl-navigation__link').on('click', function () {
        $('#menu-progress').fadeIn()
    })

    $('input.search-global').on('keyup', function (e) {
        documentTable.search($(e.currentTarget).val())
    })

    /* Dashboard */
    $('.dashboard-button-mode').on('click', function (e) {
        if ($(this).children('i').html() == 'autorenew') {
            $(this).children('i').html('swap_horiz')
        } else {
            $(this).children('i').html('autorenew')
        }
    })

    /* Viewer */
    $('.viewer-sorted').on('click', function (e) {
        if ($(this).hasClass('mdl-data-table__header--sorted-ascending')) {
            $(this).removeClass('mdl-data-table__header--sorted-ascending')
            $(this).addClass('mdl-data-table__header--sorted-descending')
            documentTable.sort('date', {
                order: "desc"
            })
        } else {
            $(this).removeClass('mdl-data-table__header--sorted-descending')
            $(this).addClass('mdl-data-table__header--sorted-ascending')
            documentTable.sort('date', {
                order: "asc"
            })
        }
    })

    /* Request response pairs */
    $('.viewer-button-open').on('click', function (e) {
        var id = '.viewer-code-' + $(this).attr('id')
        if ($(this).children('i').html() == 'keyboard_arrow_up') {
            $(this).children('i').html('keyboard_arrow_down')
            $(id).addClass('viewer-hide')
        } else {
            $(this).children('i').html('keyboard_arrow_up')
            $(id).removeClass('viewer-hide')
        }
    })

    $('.rrp-button-table').on('click', function (e) {
        var tbody = $(this).parent().parent().parent().parent().parent().children('tbody')
        if ($(this).children('i').html() == 'keyboard_arrow_up') {
            $(this).children('i').html('keyboard_arrow_down')
            tbody.addClass('rrp-body-hide')
        } else {
            $(this).children('i').html('keyboard_arrow_up')
            tbody.removeClass('rrp-body-hide')
            if ($(this).hasClass('rrp-code')) {
                var xml = tbody.find('tr>td>pre>code.xml')
                var esc = _.escape(xml.html())
                if (esc != '') {
                    xml.html(esc)
                    hljs.highlightBlock(xml);
                }
            }
        }
    })

    $('.rrp-button-close').on('click', function (e) {})

})

$(document).ready(function () {})