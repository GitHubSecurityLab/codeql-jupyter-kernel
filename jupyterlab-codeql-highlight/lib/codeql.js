// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
import * as CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple';

// "use strict";

// from where select predicate in as order by asc desc module result this super
// abstract cached external final library noopt private deprecated override query pragma language bindingset noinline nomagic monotonicAggregates transient
// not and or implies exists forall forex any none
// if then else
// int float string boolean date
// import
// class extends instanceof
// avg concat count max min rank strictconcat strictcount strictsum sum
// false true
var builtins_base = [
  "from", "where", "select", "predicate", "in", "as", "order", "by", "asc", "desc", "module", "result", "this", "super",
  "abstract", "cached", "external", "final", "library", "noopt", "private", "deprecated", "override", "query", "pragma", "language", "bindingset", "noinline", "nomagic", "monotonicAggregates", "transient",
  "not", "and", "or", "implies", "exists", "forall", "forex", "any", "none",
  "if", "then", "else",
  "int", "float", "string", "boolean", "date",
  "import",
  "class", "extends", "instanceof",
  "avg", "concat", "count", "max", "min", "rank", "strictconcat", "strictcount", "strictsum", "sum",
  "false", "true"
];
var builtins_str = '(' + builtins_base.join('|') + ')\\b';

var builtins_functions = [];
var builtins_fun_str = '(' + builtins_functions.join('|') + ')(?=\\()';

CodeMirror.defineSimpleMode("codeql", {
  // The start state contains the rules that are intially used
  start: [
    // Comments
    { regex: /\/\/\/?.*$/, token: 'comment', sol: true },
    { regex: /(\s)\/\/\/?.*$/, token: 'comment' },
    { regex: /\s*\*.*$/, token: 'comment', sol: true },
    { regex: /\/\*/, token: 'comment', push: 'comments_block' },

    // Strings
    { regex: /"/, token: 'string', push: 'string_regular' },
    { regex: /`"/, token: 'string', push: 'string_compound' },

    // Macros
    { regex: /`/, token: 'variable-2', push: 'macro_local' },
    { regex: /\$/, token: 'variable-2', push: 'macro_global' },

    // Decimal Numbers
    {
      regex: /\b[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+|\.)(?:[eE][+-]?[0-9]+)?[i]?\b/,
      token: 'number'
    },

    // Keywords
    // There are two separate dictionaries because the `\b` at the beginning of the regex seemed not to work. So instead, I either match the preceding space before the keyword or require the keyword to be at beginning of the string. I think this necessitates two different strings.
    { regex: new RegExp('\\s' + builtins_str), token: 'keyword' },
    { regex: new RegExp(builtins_str), token: 'keyword', sol: true },

    { regex: new RegExp('\\s' + builtins_fun_str), token: 'def' },
    { regex: /\s\w+(?=\()/, token: 'def' },

    { regex: /[\{]/, indent: true },
    { regex: /[\}]/, dedent: true },

    { regex: /-|==|<=|>=|<|>|&|!=/, token: 'operator' },
    { regex: /\*|\+|\^|\/|!|~|=|~=/, token: 'operator' },
  ],
  comments_block: [
    { regex: /\/\*/, token: 'comment', push: 'comments_block' },
    // this ends and restarts a comment block. but need to catch this so
    // that it doesn\'t start _another_ level of comment blocks
    { regex: /\*\/\*/, token: 'comment' },
    { regex: /(\*\/\s+\*(?!\/)[^\n]*)|(\*\/)/, token: 'comment', pop: true },
    // Match anything else as a character inside the comment
    { regex: /./, token: 'comment' },
  ],

  string_compound: [
    { regex: /`"/, token: 'string', push: 'string_compound' },
    { regex: /"'/, token: 'string', pop: true },
    { regex: /`/, token: 'variable-2', push: 'macro_local' },
    { regex: /\$/, token: 'variable-2', push: 'macro_global' },
    { regex: /./, token: 'string' }
  ],
  string_regular: [
    { regex: /"/, token: 'string', pop: true },
    { regex: /`/, token: 'variable-2', push: 'macro_local' },
    { regex: /\$/, token: 'variable-2', push: 'macro_global' },
    { regex: /./, token: 'string' }
  ],
  macro_local: [
    { regex: /`/, token: 'variable-2', push: 'macro_local' },
    { regex: /'/, token: 'variable-2', pop: true },
    { regex: /./, token: 'variable-2' },
  ],
  macro_global: [
    { regex: /\}/, token: 'variable-2', pop: true },
    { regex: /.(?=[^\w\{\}])/, token: 'variable-2', pop: true },
    { regex: /./, token: 'variable-2' },
  ],
  meta: {
    closeBrackets: { pairs: "()[]{}`'\"\"" },
    dontIndentStates: ['comment'],
    electricInput: /^\s*\}$/,
    blockCommentStart: '/*',
    blockCommentEnd: '*/',
    lineComment: '//',
    fold: 'brace'
  }
});

CodeMirror.defineMIME('text/x-codeql', 'codeql');
CodeMirror.defineMIME('text/codeql', 'codeql');

// When I paste this file in Jupyter, it won't work unless I include the
// following code, but when I leave this as a separate module, it won't work and
// raises an error.
CodeMirror.modeInfo.push({
  ext: ['do', 'ado'],
  mime: "text/x-codeql",
  mode: 'codeql',
  name: 'CodeQL'
});
