import { expect, test, describe } from "bun:test";
import { Lexer } from "./lexer";
import { TokenType } from "../token/token";

describe("Lexer", () => {
	test("should parser the basic input correctly", () => {
		const input = "=+(){}";
		const lexer = new Lexer(input);
		const tests = [
			{
				expectType: TokenType.ASSIGN,
				expectedLiteral: "=",
			},
			{
				expectType: TokenType.PLUS,
				expectedLiteral: "+",
			},
			{
				expectType: TokenType.LPAREN,
				expectedLiteral: "(",
			},
			{
				expectType: TokenType.RPAREN,
				expectedLiteral: ")",
			},
			{
				expectType: TokenType.LBRACE,
				expectedLiteral: "{",
			},
			{
				expectType: TokenType.RBRACE,
				expectedLiteral: "}",
			},
			{
				expectType: TokenType.EOF,
				expectedLiteral: "",
			},
		];
		for (const test of tests) {
			const token = lexer.nextToken();
			expect(token.Type).toEqual(test.expectType);
			expect(token.Literal).toEqual(test.expectedLiteral);
		}
	});
	test("should parser the all input correctly", () => {
		const input = `
        let five = 5;
        let ten = 10;
        let add = fn(x,y){
            x+y;
        };
        let result = add(five,ten);
        `;
		const lexer = new Lexer(input);
		const tests = [
			{
				expectType: TokenType.LET,
				expectedLiteral: "let",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "five",
			},
			{
				expectType: TokenType.ASSIGN,
				expectedLiteral: "=",
			},
			{
				expectType: TokenType.INT,
				expectedLiteral: "5",
			},
			{
				expectType: TokenType.SEMICOLON,
				expectedLiteral: ";",
			},
			{
				expectType: TokenType.LET,
				expectedLiteral: "let",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "ten",
			},
			{
				expectType: TokenType.ASSIGN,
				expectedLiteral: "=",
			},
			{
				expectType: TokenType.INT,
				expectedLiteral: "10",
			},
			{
				expectType: TokenType.SEMICOLON,
				expectedLiteral: ";",
			},
			{
				expectType: TokenType.LET,
				expectedLiteral: "let",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "add",
			},
			{
				expectType: TokenType.ASSIGN,
				expectedLiteral: "=",
			},
			{
				expectType: TokenType.FUNCTION,
				expectedLiteral: "fn",
			},
			{
				expectType: TokenType.LPAREN,
				expectedLiteral: "(",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "x",
			},
			{
				expectType: TokenType.COMMA,
				expectedLiteral: ",",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "y",
			},
			{
				expectType: TokenType.RPAREN,
				expectedLiteral: ")",
			},
			{
				expectType: TokenType.LBRACE,
				expectedLiteral: "{",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "x",
			},
			{
				expectType: TokenType.PLUS,
				expectedLiteral: "+",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "y",
			},
			{
				expectType: TokenType.SEMICOLON,
				expectedLiteral: ";",
			},
			{
				expectType: TokenType.RBRACE,
				expectedLiteral: "}",
			},
			{
				expectType: TokenType.SEMICOLON,
				expectedLiteral: ";",
			},
			{
				expectType: TokenType.LET,
				expectedLiteral: "let",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "result",
			},
			{
				expectType: TokenType.ASSIGN,
				expectedLiteral: "=",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "add",
			},
			{
				expectType: TokenType.LPAREN,
				expectedLiteral: "(",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "five",
			},
			{
				expectType: TokenType.COMMA,
				expectedLiteral: ",",
			},
			{
				expectType: TokenType.IDENT,
				expectedLiteral: "ten",
			},
			{
				expectType: TokenType.RPAREN,
				expectedLiteral: ")",
			},
			{
				expectType: TokenType.SEMICOLON,
				expectedLiteral: ";",
			},
			{
				expectType: TokenType.EOF,
				expectedLiteral: "",
			},
		];
		for (const test of tests) {
			const token = lexer.nextToken();
			console.log(token);
			expect(token.Type).toEqual(test.expectType);
			expect(token.Literal).toEqual(test.expectedLiteral);
		}
	});
});
