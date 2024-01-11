export enum TokenType{
    ILLEGAL = "ILLEGAL",
    EOF = "",

    // 标识符+字面量
    IDENT = "IDENT", // add, foobar, x, y, ...
    INT = "INT",     // 1343456

    // 运算符
    ASSIGN = "=",
    PLUS = "+",

    // 分隔符
    COMMA = ",",
    SEMICOLON = ";",

    LPAREN = "(",
    RPAREN = ")",
    LBRACE = "{",
    RBRACE = "}",
    
    // 关键字
    FUNCTION = "FUNCTION",
    LET = "LET"
}

export interface Token {
    Type: TokenType
    Literal: string|number
}
 