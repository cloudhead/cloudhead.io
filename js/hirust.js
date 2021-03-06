(function (hirust) {
//
// hirust - Rust Syntax Highlighter
//
// Copyright (c) 2020 Alexis Sellier
//

// All elements which match this will be syntax highlighted.
var selector = hirust || '.language-rust';

var keywords = ('fn pub if else for while break match struct enum type let impl use mod self '
               +'continue return true false loop in unsafe where crate super').split(' '),
    special  = ('Ok Err Result').split(' '),
    traits   = ('Eq PartialEq Ord PartialOrd Copy Clone Debug Default Sync Send Sized').split(' ');

// Syntax definition.
//
// The key becomes the class name of the <span> around the matched block of code.
var syntax = [
  ['comment', /(\/\/[^\n]*)/g],
  ['string' , /("(?:(?!")[^\\\n]|\\.)*"|'[^\\\n']')/g],
  ['attr'   , /(#\[[^\]]+\])/g],
  ['number' , /\b([0-9]+(?:\.[0-9]+)?)\b/g],
  ['ref'    , /(&mut\b|\bmut\b|&)\b/g],
  ['op'     , /(::|\.\.)/g],
  ['macro'  , /\b(println!|eprintln!|panic!|assert!|assert_eq!)/g],
  ['trait'  , new(RegExp)('\\b(' + traits.join('|') + ')\\b', 'g')],
  ['keyword', new(RegExp)('\\b(' + keywords.join('|') + ')\\b', 'g')],
  ['special', new(RegExp)('\\b(' + special.join('|') + ')\\b', 'g')]
];
var nodes, table = {};

if (/^[a-z]+$/.test(selector)) {
    nodes = document.getElementsByTagName(selector);
} else if (/^\.[\w-]+$/.test(selector)) {
    nodes = document.getElementsByClassName(selector.slice(1));
} else if (document.querySelectorAll) {
    nodes = document.querySelectorAll(selector);
} else {
    nodes = [];
}

for (var i = 0, children; i < nodes.length; i++) {
    children = nodes[i].childNodes;

    for (var j = 0, str; j < children.length; j++) {
        code = children[j];

        if (code.length >= 0) { // It's a text node
            // Don't highlight command-line snippets
            if (! /^\$\s/.test(code.nodeValue.trim())) {
                syntax.forEach(function (s) {
                    var k = s[0], v = s[1];
                    code.nodeValue = code.nodeValue.replace(v, function (_, m) {
                        return '\u00ab' + encode(k) + '\u00b7'
                                        + encode(m) +
                               '\u00b7' + encode(k) + '\u00bb';
                    });
                });
            }
        }
    }
}

for (var i = 0; i < nodes.length; i++) {
    nodes[i].innerHTML =
        nodes[i].innerHTML.replace(/\u00ab(.+?)\u00b7(.+?)\u00b7\1\u00bb/g,
            function (_, name, value) {
                value = value.replace(/\u00ab[^\u00b7]+\u00b7/g, '')
                             .replace(/\u00b7[^\u00bb]+\u00bb/g, '');

                return '<span class="' + decode(name) + '">'
                                       + escape(decode(value))
                                       + '</span>';
            });
}

function escape(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Encode ASCII characters to, and from Braille
function encode (str, encoded) {
    table[encoded = str.split('').map(function (s) {
        if (s.charCodeAt(0) > 127) { return s }
        return String.fromCharCode(s.charCodeAt(0) + 0x2800);
    }).join('')] = str;

    return encoded;
}

function decode (str) {
    if (str in table) {
        return table[str];
    } else {
        return str.trim().split('').map(function (s) {
            if (s.charCodeAt(0) - 0x2800 > 127) { return s }
            return String.fromCharCode(s.charCodeAt(0) - 0x2800);
        }).join('');
    }
}

})(window.hirust);
