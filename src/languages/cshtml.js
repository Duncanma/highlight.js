/*
Language: CSHTML
Requires: xml.js, csharp.js
Author: Roman Resh <romanresh@live.com>, Scott Addie <scott.addie@microsoft.com>
Category: common
*/

function(hljs) {
    var SPECIAL_SYMBOL_CLASSNAME = "built_in";

    var BLOCK_TEXT = {
        begin: "[@]{0,1}<text>",
        returnBegin: true,
        end: "</text>",
        returnEnd: true,
        subLanguage: "cshtml",
        contains: [
            {
                begin: "[@]{0,1}<text>",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "</text>",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true,
            }
        ]
    };

    var DIRECTIVES = {
        begin: "^@(addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|tagHelperPrefix|typeparam|using)?$",
        end: "$",
        className: SPECIAL_SYMBOL_CLASSNAME,
        returnBegin: true,
        returnEnd: true,
        contains: [
            {
                begin: "@(addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|tagHelperPrefix|typeparam|using)",
                className: SPECIAL_SYMBOL_CLASSNAME,
            },
            {
                variants: [
                    {
                        begin: "\\s+",
                        end: "$",
                    },
                    {
                        begin: "$"
                    },
                ],
                className: "type",
                endsParent: true
            }
        ]
    };

    var EXCEPTIONS = {
        variants: [
            { begin: "@@" },
            { begin: "[a-zA-Z]+@" },
        ],
        skip: true
    };

    var ONE_LINE_EXPRESSION = {
        begin: "@[a-zA-Z]+",
        returnBegin: true,
        end: "(\\r|\\n|<|\\s)",
        subLanguage: 'csharp',
        contains: [
            {
                begin: '@',
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            { 
                begin: '".*(?!$)"',
                skip: true
            },
            {
                begin: '"',
                endsParent: true
            }
        ],
        returnEnd: true
    };

    var ONE_LINE_AWAIT = {
        begin: "@await ",
        returnBegin: true,
        subLanguage: 'csharp',
        end: "(\\r|\\n|<|\\s)",
        contains: [
            {
                begin: "@await ",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "[<\\r\\n]",
                endsParent: true
            }
        ]
    };

    var BLOCK_ROUND_BRACKET = {
        begin: "@\\(",
        end: "\\)",
        returnBegin: true,
        returnEnd: true,
        subLanguage: 'csharp',
        contains: [
            {
                begin: "@\\(",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "\\(",
                end: "\\)",
                subLanguage: 'csharp',
                contains: [hljs.QUOTE_STRING_MODE, BLOCK_TEXT, 'self']
            },
            BLOCK_TEXT,
            {
                begin: "\\)",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            }
        ]
    };

    var BLOCK_FIGURE_BRACKET = {
        begin: "@\\{",
        returnBegin: true,
        returnEnd: true,
        end: "\\}",
        subLanguage: 'csharp',
        contains: [
            {
                begin: "@\\{",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "{",
                end: "}",
                contains: [hljs.QUOTE_STRING_MODE, BLOCK_TEXT, 'self']
            },
            BLOCK_TEXT,
            {
                begin: "\\}",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            }
        ],
    };

    var BUILT_IN_CODE_BLOCKS_VARIANTS = [
      {
          begin: "@(for|foreach|if|lock|switch|using|while)[\\s]*\\([^{]+[\\s]*",
          end: "}"
      },
      {
          begin: "@do[\\s]*[^{]+",
          end: "}"
      }
    ];

    var BUILT_IN_CODE_BLOCKS = {
        variants: BUILT_IN_CODE_BLOCKS_VARIANTS,
        returnBegin: true,
        returnEnd: true,
        subLanguage: "cshtml",
        contains: [
            {
                variants: BUILT_IN_CODE_BLOCKS_VARIANTS.map(function(v) {
                    return {
                        begin: v.begin
                    };
                }),
                returnBegin: true,
                contains: [
                     { begin: "@", className: SPECIAL_SYMBOL_CLASSNAME },
                     { 
                         variants: BUILT_IN_CODE_BLOCKS_VARIANTS.map(function(v) { 
                            return {
                                begin: v.begin.substr(1, v.begin.length - 2)
                            }; }), 
                         subLanguage: "csharp" },
                     { begin: "{", className: SPECIAL_SYMBOL_CLASSNAME }
                ]
            },
            {
                begin: "{",
                end: "}",
                contains: [hljs.QUOTE_STRING_MODE, 'self']
            },
            BLOCK_TEXT,
            {
                variants: [
                    {
                        begin: "}[\\s]*else\\sif[\\s]*\\([^\\)]+\\)[\\s]*{"
                    },
                    {
                        begin: "}[\\s]*else[\\s]*{"
                    }
                ],
                returnBegin: true,
                contains: [
                    {
                        begin: "}",
                        className: SPECIAL_SYMBOL_CLASSNAME
                    },
                    {
                        variants: [
                            {
                                begin: "[\\s]*else\\sif[\\s]*\\([^\\)]+\\)[\\s]*",
                            },
                            {
                                begin: "[\\s]*else[\\s]*",
                            },
                        ],
                        subLanguage: "csharp"
                    },
                    {
                        begin: "{",
                        className: SPECIAL_SYMBOL_CLASSNAME
                    }
                ]
            },
            {
                begin: "}",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            },
        ]
    };

    var BLOCK_TRY = {
      begin: "@try[\\s]*{",
      end: "}",
      returnBegin: true,
      returnEnd: true,
      subLanguage: "csharp",
      contains: [
          {
              begin: "@",
              className: SPECIAL_SYMBOL_CLASSNAME
          },
          {
              begin: "try[\\s]*{",
              subLanguage: "csharp"
          },
          {
              begin: "{",
              end: "}",
              contains: [hljs.QUOTE_STRING_MODE, 'self']
          },
          {      
              variants: [
                  {
                      begin: "}[\\s]*catch[\\s]*\\([^\\)]+\\)[\\s]*{"
                  },
                  {
                      begin: "}[\\s]*finally[\\s]*{"
                  }
              ],
              returnBegin: true,
              contains: [
                  {
                      begin: "}",
                      className: SPECIAL_SYMBOL_CLASSNAME
                  },
                  {
                      variants: [
                          {
                              begin: "[\\s]*catch[\\s]*\\([^\\)]+\\)[\\s]*",
                          },
                          {
                              begin: "[\\s]*finally[\\s]*",
                          },
                      ],
                      subLanguage: "csharp"
                  },
                  {
                      begin: "{",
                      className: SPECIAL_SYMBOL_CLASSNAME
                  }
              ]
          },
          {
              begin: "}",
              className: SPECIAL_SYMBOL_CLASSNAME,
              endsParent: true
          },
      ]
    };

    var BLOCK_FUNCTIONS = {
        begin: "@(code|functions)[\\s]*{",
        end: "}",
        returnBegin: true,
        returnEnd: true,
        subLanguage: "csharp",
        contains: [
            {
                begin: "@(code|functions)[\\s]*{",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "{",
                end: "}",
                contains: [hljs.QUOTE_STRING_MODE, 'self']
            },
            {
                begin: "}",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            }
        ]
    };

    var RAZOR_COMPONENTS = {
      begin: "<[A-Z]{1}[a-zA-Z]+",
      end: ">",
      returnBegin: true,
      returnEnd: true,
      subLanguage: "xml",
      contains: [
        {
          begin: "<\\/{1}[A-Z]{1}[a-zA-Z]+",
          className: "tag"
        }
      ]
    };

    var BIND_DIRECTIVES = {
      begin: "@bind(-|:)?[a-zA-Z:]*",
      end: "=",
      returnBegin: true,
      returnEnd: false,
      subLanguage: "cshtml",
      contains: [
        {
          begin: "@bind(-|:)?[a-zA-Z:]*",
          className: SPECIAL_SYMBOL_CLASSNAME
        }
      ]
    };

    var ON_EVENT_DIRECTIVE_ATTRIBUTE = {
      begin: "@on[a-zA-Z]*(:preventDefault|:stopPropagation)?",
      returnBegin: true,
      returnEnd: false,
      subLanguage: "cshtml",
      end: "(=|\\s)",
      contains: [
        {
            begin: "@on[a-zA-Z]*(:preventDefault|:stopPropagation)?",
            className: SPECIAL_SYMBOL_CLASSNAME
        }
      ]
    };

    var DIRECTIVE_ATTRIBUTES = {
      begin: "@(attributes|key|ref)",
      returnBegin: true,
      returnEnd: false,
      subLanguage: "cshtml",
      end: "=",
      contains: [
        {
          begin: "@(attributes|key|ref)",
          className: SPECIAL_SYMBOL_CLASSNAME
        }
      ]
    };

    var BLOCK_SECTION = {
        begin: "@section[\\s]+[a-zA-Z0-9]+[\\s]*{",
        returnBegin: true,
        returnEnd: true,
        subLanguage: "cshtml",
        end: "}",
        contains: [
            {
                begin: "@section[\\s]+[a-zA-Z0-9]+[\\s]*{",
                className: SPECIAL_SYMBOL_CLASSNAME
            },
            {
                begin: "{",
                end: "}",
                contains: [hljs.QUOTE_STRING_MODE, 'self']
            },
            {
                begin: "}",
                className: SPECIAL_SYMBOL_CLASSNAME,
                endsParent: true
            }
        ]
    };

    return {
        subLanguage: 'xml',
        aliases: ['cshtml', 'razor'],
        contains: [
            hljs.COMMENT("@\\*", "\\*@"),
            EXCEPTIONS,
            DIRECTIVES,
            DIRECTIVE_ATTRIBUTES,
            BIND_DIRECTIVES,
            ON_EVENT_DIRECTIVE_ATTRIBUTE,
            RAZOR_COMPONENTS,
            BLOCK_FUNCTIONS,
            BLOCK_SECTION,
            BLOCK_TRY,
            BUILT_IN_CODE_BLOCKS,
            ONE_LINE_AWAIT,
            ONE_LINE_EXPRESSION,
            BLOCK_ROUND_BRACKET,
            BLOCK_FIGURE_BRACKET,
            BLOCK_TEXT
        ]
    };
}
