/*
Language: AzureCLI
Author: Duncan Mackenzie <duncanma@duncanmackenzie.net>
*/
  function azureCLI(hljs) {
    var VAR = {
        className: 'variable',
        variants: [
        {begin: /\$[\w\d#@][\w\d_]*/},
        {begin: /\$\{(.*?)}/}
        ]
    };
    var COMMAND = {
      className: 'keyword',
      begin: /^(az|azsphere|azure) (\b[a-zA-Z][a-zA-Z0-9_-]*\b( |$))+/,
      relevance:1
    }
    var PARAMETER = 
    {
      // Match command line parameters (-p, -u)
      className: 'parameter',
      variants: [ //single dash, double dash, double dash in square brackets
        {begin: '-{1,2}[a-zA-Z\-]*'},
        {begin: '--[a-zA-Z\-]*'},
        {begin: '\[--[a-zA-Z\-]*\]'},
        {begin: '\[a-z_]+\.[a-z_]+='}
      ],
      relevance: 0
    };

    var QUOTE_STRING = {
        className: 'string',
        begin: /"/, end: /"/,
        contains: [
        hljs.BACKSLASH_ESCAPE,
        VAR,
        {
            className: 'variable',
            begin: /\$\(/, end: /\)/,
            contains: [hljs.BACKSLASH_ESCAPE]
        }
        ]
    };
    var APOS_STRING = {
        className: 'string',
        begin: /'/, end: /'/
    };
    var AngleBracket_STRING = {
        className: 'string',
        begin: /</, end: />/
    };

  return {
    aliases: ['azurecli', 'azure', 'azsphere'],
    lexemes: /\b[a-zA-Z][a-zA-Z0-9_-]*\b/,
    keywords: {
      literal:
        'true false',
      built_in:
        'ls cd' 
    },
    contains: [
      {
        // Match typed numeric constants (1000, 12.34!, 1.2e5, 1.5#, 1.2D2)
        className: 'number',
        begin: '\\b([0-9]+[0-9edED\.]*[#\!]?)',
        relevance: 0
      },
      COMMAND, 
      PARAMETER,
      AngleBracket_STRING,
      hljs.HASH_COMMENT_MODE,
      QUOTE_STRING,
      APOS_STRING,
      VAR
    ]
  };
}