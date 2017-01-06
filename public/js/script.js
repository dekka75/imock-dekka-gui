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
    $('.dashboard-js-mode').on('click', function (e) {
        if ($(this).children('i').html() == 'autorenew') {
            $(this).children('i').html('swap_horiz')

        } else {
            $(this).children('i').html('autorenew')
        }
    })

    $('.dashboard-js-settings').on('click', function (e) {
        $('.dashboard-service').removeClass('dashboard-hide')
    })

    /* Viewer */
    $('.viewer-js-sorted').on('click', function (e) {
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
    $('.viewer-js-button-open').on('click', function (e) {
        var content = $('.details-content-' + $(this).attr('id'))
        if ($(this).children('i').html() == 'keyboard_arrow_up') {
            $(this).children('i').html('keyboard_arrow_down')
            content.addClass('details-hide')
            content.find('td#details>.details-content').remove()

        } else {
            $(this).children('i').html('keyboard_arrow_up')
            content.find('td>.details-content').remove()
            content.find('td#details').append($('.details-content-meta').clone())
            content.find('td#details>.details-content-meta').addClass('details-content').removeClass('details-content-meta')
            content.removeClass('details-hide')
        }
    })

    $('body').on('click', '.details-js-button-table', function (e) {
        var tbody = $(this).parent().parent().parent().parent().parent().children('tbody')
        if ($(this).children('i').html() == 'keyboard_arrow_up') {
            $(this).children('i').html('keyboard_arrow_down')
            tbody.addClass('details-body-hide')

        } else {
            $(this).children('i').html('keyboard_arrow_up')
            tbody.removeClass('details-body-hide')

            if ($(this).hasClass('details-code')) {
                var body = _.escape(formatXml(tbody.find('tr>td>content').html()))
                if (body != '') {
                    var code = tbody.find('tr>td>pre>code')
                    code.html(body)
                    code.each(function (i, block) {
                        hljs.highlightBlock(block);
                    })
                }
            }
        }
        $(this).blur()
    })

})

$(document).ready(function () {})