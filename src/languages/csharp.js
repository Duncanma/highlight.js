/*
Language: C#
Author: Jason Diamond <jason@diamond.name>
Contributor: Nicolas LLOBERA <nllobera@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, David Pine <david.pine@microsoft.com>
Category: common
*/

function(hljs) {
  const BUILT_IN_KEYWORDS = [
      'bool',
      'byte',
      'char',
      'decimal',
      'delegate',
      'double',
      'dynamic',
      'enum',
      'float',
      'int',
      'long',
      'nint',
      'nuint',
      'object',
      'sbyte',
      'short',
      'string',
      'ulong',
      'unit',
      'ushort'
  ];
  const LITERAL_KEYWORDS = [
      'default',
      'false',
      'null',
      'true'
  ];
  const NORMAL_KEYWORDS = [
    'abstract',
    'as',
    'base',
    'break',
    'case',
    'class',
    'const',
    'continue',
    'do',
    'else',
    'event',
    'explicit',
    'extern',
    'finally',
    'fixed',
    'for',
    'foreach',
    'goto',
    'if',
    'implicit',
    'in',
    'interface',
    'internal',
    'is',
    'lock',
    'namespace',
    'new',
    'operator',
    'out',
    'override',
    'params',
    'private',
    'protected',
    'public',
    'readonly',
    'record',
    'ref',
    'return',
    'sealed',
    'sizeof',
    'stackalloc',
    'static',
    'struct',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'unchecked',
    'unsafe',
    'using',
    'virtual',
    'void',
    'volatile',
    'while'
  ];
  const CONTEXTUAL_KEYWORDS = [
    'add',
    'alias',
    'and',
    'ascending',
    'async',
    'await',
    'by',
    'descending',
    'equals',
    'from',
    'get',
    'global',
    'group',
    'init',
    'into',
    'join',
    'let',
    'nameof',
    'not',
    'notnull',
    'on',
    'or',
    'orderby',
    'partial',
    'remove',
    'select',
    'set',
    'unmanaged',
    'value',
    'var',
    'when',
    'where',
    'with',
    'yield'
  ];
  const KEYWORDS = {
    keyword: NORMAL_KEYWORDS.concat(CONTEXTUAL_KEYWORDS).join(' '),
    built_in: BUILT_IN_KEYWORDS.join(' '),
    literal: LITERAL_KEYWORDS.join(' ')
  };
  const NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b(0b[01\']+)' },
      { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)(u|U|l|L|ul|UL|f|F|b|B)' },
      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
    ],
    relevance: 0
  };
  const VERBATIM_STRING = {
    className: 'string',
    begin: '@"', end: '"',
    contains: [{begin: '""'}]
  };
  const VERBATIM_STRING_NO_LF = hljs.inherit(VERBATIM_STRING, {illegal: /\n/});
  const SUBST = {
    className: 'subst',
    begin: '{', end: '}',
    keywords: KEYWORDS
  };
  const SUBST_NO_LF = hljs.inherit(SUBST, {illegal: /\n/});
  const INTERPOLATED_STRING = {
    className: 'string',
    begin: /\$"/, end: '"',
    illegal: /\n/,
    contains: [{begin: '{{'}, {begin: '}}'}, hljs.BACKSLASH_ESCAPE, SUBST_NO_LF]
  };
  const INTERPOLATED_VERBATIM_STRING = {
    className: 'string',
    begin: /\$@"/, end: '"',
    contains: [{begin: '{{'}, {begin: '}}'}, {begin: '""'}, SUBST]
  };
  const INTERPOLATED_VERBATIM_STRING_NO_LF = hljs.inherit(INTERPOLATED_VERBATIM_STRING, {
    illegal: /\n/,
    contains: [{begin: '{{'}, {begin: '}}'}, {begin: '""'}, SUBST_NO_LF]
  });
  SUBST.contains = [
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.C_BLOCK_COMMENT_MODE
  ];
  SUBST_NO_LF.contains = [
    INTERPOLATED_VERBATIM_STRING_NO_LF,
    INTERPOLATED_STRING,
    VERBATIM_STRING_NO_LF,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.inherit(hljs.C_BLOCK_COMMENT_MODE, {illegal: /\n/})
  ];
  const STRING = {
    variants: [
      INTERPOLATED_VERBATIM_STRING,
      INTERPOLATED_STRING,
      VERBATIM_STRING,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  const TYPE_IDENT_RE = hljs.IDENT_RE + '(<' + hljs.IDENT_RE + '(\\s*,\\s*' + hljs.IDENT_RE + ')*>)?(\\[\\])?';

  return {
    aliases: ['cs', 'c#'],
    keywords: KEYWORDS,
    illegal: /::/,
    contains: [
      hljs.COMMENT(
        '///',
        '$',
        {
          returnBegin: true,
          contains: [
            {
              className: 'doctag',
              variants: [
                {
                  begin: '///', relevance: 0
                },
                {
                  begin: '<!--|-->'
                },
                {
                  begin: '</?', end: '>'
                }
              ]
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'meta',
        begin: '#', end: '$',
        keywords: {
          'meta-keyword': 'if else elif endif define undef warning error line region endregion pragma checksum'
        }
      },
      STRING,
      NUMBERS,
      {
        beginKeywords: 'class interface', end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [
          hljs.TITLE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'namespace', end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: '[a-zA-Z](\\.?\\w)*'}),
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // [Attributes("")]
        className: 'meta',
        begin: '^\\s*\\[', excludeBegin: true, end: '\\]', excludeEnd: true,
        contains: [
          INTERPOLATED_VERBATIM_STRING_NO_LF,
          INTERPOLATED_STRING,
          VERBATIM_STRING_NO_LF,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.C_NUMBER_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new return throw await else',
        relevance: 0
      },
      {
        className: 'function',
        begin: '(' + TYPE_IDENT_RE + '\\s+)+' + hljs.IDENT_RE + '\\s*\\(', returnBegin: true,
        end: /\s*[{;=]/, excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: hljs.IDENT_RE + '\\s*\\(', returnBegin: true,
            contains: [hljs.TITLE_MODE],
            relevance: 0
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              STRING,
              NUMBERS,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      }
    ]
  };
}
