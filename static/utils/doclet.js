'use strict';

var _ = require('underscore')
var util = require('util')

function applyTag (doclet, tag) {
    if (tag.title === 'name') {
        doclet.name = tag.value
    }

    if (tag.title === 'kind') {
        doclet.kind = tag.value
    }

    if (tag.title === 'description') {
        doclet.description = tag.values
    }
}

function fakeMeta (node) {
    return {
        type: node ? node.type : null,
        node: node
    };

function unwrap (docletSrc) {
    if (!docletSrc) { return '' }

    // note: keep trailing whitespace for @examples
    // extra opening/closing stars are ignored
    // left margin is considered a star and a space
    // use the /m flag on regex to avoid having to guess what this platform's newline is
    docletSrc =
        // remove opening slash+stars
        docletSrc.replace(/^\/\*\*+/, '')
            // replace closing star slash with end-marker
            .replace(/\**\*\/$/, '\\Z')
            // remove left margin like: spaces+star or spaces+end-marker
            .replace(/^\s*(\* ?|\\Z)/gm, '')
            // remove end-marker
            .replace(/\s*\\Z$/g, '')
    return docletSrc
}

/**
 * Convert the raw source of the doclet comment into an array of pseudo-Tag objects.
 * @private
 */
function toTags (docletSrc) {
    var parsedTag
    var tagData = []
    var tagText
    var tagTitle

    // split out the basic tags, keep surrounding whitespace
    // like: @tagTitle tagBody
    docletSrc
        // replace splitter ats with an arbitrary sequence
        .replace(/^(\s*)@(\S)/gm, '$1\\@$2')
        // then split on that arbitrary sequence
        .split('\\@')
        .forEach(function ($) {
            if ($) {
                parsedTag = $.match(/^(\S+)(?:\s+(\S[\s\S]*))?/);

                if (parsedTag) {
                    tagTitle = parsedTag[1];
                    tagText = parsedTag[2];

                    if (tagTitle) {
                        tagData.push({
                            title: tagTitle,
                            text: tagText
                        })
                    }
                }
            }
        })
    return tagData
}

function fixDescription (docletSrc, meta) {
    if (!/^\s*@/.test(docletSrc) && docletSrc.replace(/\s/g, '').length) {
    }

    return ''
}

let Doclet = exports.Doclet = function (docletSrc, meta) {
    var newTags = []

    /** The original text of the comment from the source code. */
    this.comment = docletSrc
    this.setMeta(meta)

    docletSrc = unwrap(docletSrc)
    docletSrc = fixDescription(docletSrc, meta)

    newTags = toTags.call(this, docletSrc)

    for (var i = 0, l = newTags.length; i < l; i++) {
        this.addTag(newTags[i].title, newTags[i].text);
    }

    this.postProcess()
}
