/*
Language: qsharp
Description: language definition for Qsharp scripts
*/

function(hljs) {

  // qflat specific declarations

  var KEYWORDS = {
    keyword:  'let set new using borrowing newtype ' +
              'mutable namespace open operation function ' +
              'body adjoint Adjoint controlled Controlled ' +
              'self auto none ' +
              'internal Adj Ctl is as within apply ' +
    //datatypes
              'Int BigInt Unit Double Bool String Qubit Pauli Result Range Callable Array',
    constant: 'true false PauliI PauliX PauliY PauliZ One Zero',
    control: 'if elif else repeat until fixup for in .. return fail while',
    helper: 'Message Length Assert AssertProb AssertEqual Random Floor Float ' +
    'Start Step Stop X Y Z H HY S T SWAP CNOT CCNOT MultiX R RFrac Rx Ry Rz R1 R1Frac ' +
    'Exp ExpFrac Measure M MultiM'
  }

  // C# reserved words, which cannot be used in Q#
  var CSHARP_RESERVED = {
    className: 'reserved',
    begin: '\\b(abstract|as|base|bool|break|bybyte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|enum|event|explicit|extern|false|finally|fixed|float|foreach|goto|implicit|int|interface|internal|is|lock|long|null|object|operator|out|override|params|private|protected|public|readonly|ref|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|unit|ulong|unchecked|unsafe|ushort|virtual|void|volatile)\\b'
  };

  // variable definitions from the csharp language config

  var VERBATIM_STRING = {
    className: 'string',
    begin: '@"', end: '"',
    contains: [{ begin: '""' }]
  };

  // var VERBATIM_STRING_NO_LF = hljs.inherit(VERBATIM_STRING, { illegal: /\n/ });

  var SUBST = {
    className: 'subst',
    begin: '{', end: '}',
    keywords: KEYWORDS
  };

  var SUBST_NO_LF = hljs.inherit(SUBST, { illegal: /\n/ });

  var STRING = {
    className: 'string',
    begin: '"', end: '"',
    contains: [{ begin: '{{' }, { begin: '}}' }, { begin: '""' }, SUBST],
    variants: [
      VERBATIM_STRING,
      hljs.QUOTE_STRING_MODE
    ]
  };

  var TYPE_IDENT_RE = hljs.IDENT_RE + '(<' + hljs.IDENT_RE + '(\\s*,\\s*' + hljs.IDENT_RE + ')*>)?(\\[\\])?';

  return {
    aliases: ['qsharp'],
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
      hljs.C_NUMBER_MODE,
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
          hljs.inherit(hljs.TITLE_MODE, { begin: '[a-zA-Z](\\.?\\w)*' }),
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // [Attributes("")]
        className: 'meta',
        begin: '^\\s*\\[', excludeBegin: true, end: '\\]', excludeEnd: true,
        contains: [
          { className: 'meta-string', begin: /"/, end: /"/ }
        ]
      },
      {
        className: 'function',
        begin: '(' + TYPE_IDENT_RE + '\\s+)+' + hljs.IDENT_RE + '\\s*\\(', returnBegin: true,
        end: /[{;=]/, excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              STRING,
              hljs.C_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          STRING
        ]
      },
      STRING
    ]
  };
}
