/**
 * Copyright Â© 2016 Dekka Inc. All Rights Reserved.
 */

'use strict';

$(document).ready(function () {})

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

})