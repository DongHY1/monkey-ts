import { expect, test, describe } from "bun:test";
import { Lexer } from "./lexer";
import { TokenType } from "../token/token";
interface ExpectLexerType {
	expectType: TokenType;
	expectedLiteral: string;
}
type TestsType = ExpectLexerType[];

describe("Lexer", () => {
	test("should parser the basic operators correctly", () => {
		const input = "=+(){}";
		const lexer = new Lexer(input);
		const tests: TestsType = [
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
		const tests: TestsType = [
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
			expect(token.Type).toEqual(test.expectType);
			expect(token.Literal).toEqual(test.expectedLiteral);
		}
	});
	test("should parser operators !-/*<>", () => {
		const input = `
		!-/*5
		5 < 10 > 5
		`;
		const lexer = new Lexer(input);
		const tests: TestsType = [
			{
				expectType: TokenType.BANG,
				expectedLiteral: "!",
			},
			{
				expectType: TokenType.MINUS,
				expectedLiteral: "-",
			},
			{
				expectType: TokenType.SLASH,
				expectedLiteral: "/",
			},
			{
				expectType: TokenType.ASTERISK,
				expectedLiteral: "*",
			},
			{
				expectType: TokenType.INT,
				expectedLiteral: "5",
			},
			{
				expectType: TokenType.INT,
				expectedLiteral: "5",
			},
			{
				expectType: TokenType.LT,
				expectedLiteral: "<",
			},
			{
				expectType: TokenType.INT,
				expectedLiteral: "10",
			},
			{
				expectType: TokenType.RT,
				expectedLiteral: ">",
			},
			{
				expectType: TokenType.INT,
				expectedLiteral: "5",
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
	test("should parser more keywords like true false if else return", () => {
		const input = `
			if(true){
				return true;
			}else{
				return false;
			}
		`;
		const lexer = new Lexer(input);
		const tests: TestsType = [
			{
				expectType: TokenType.IF,
				expectedLiteral: "if",
			},
			{
				expectType: TokenType.LPAREN,
				expectedLiteral: "(",
			},
			{
				expectType: TokenType.TRUE,
				expectedLiteral: "true",
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
				expectType: TokenType.RETURN,
				expectedLiteral: "return",
			},
			{
				expectType: TokenType.TRUE,
				expectedLiteral: "true",
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
				expectType: TokenType.ELSE,
				expectedLiteral: "else",
			},
			{
				expectType: TokenType.LBRACE,
				expectedLiteral: "{",
			},
			{
				expectType: TokenType.RETURN,
				expectedLiteral: "return",
			},
			{
				expectType: TokenType.FALSE,
				expectedLiteral: "false",
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
	test("should parser operators == and !=", () => {
		const input = `
		1==1;
		1!=2;
	`;
		const lexer = new Lexer(input);
		const tests: TestsType = [
			{
				expectType: TokenType.INT,
				expectedLiteral: "1",
			},
			{
				expectType: TokenType.EQ,
				expectedLiteral: "==",
			},
			{
				expectType: TokenType.INT,
				expectedLiteral: "1",
			},
			{
				expectType: TokenType.SEMICOLON,
				expectedLiteral: ";",
			},
			{
				expectType: TokenType.INT,
				expectedLiteral: "1",
			},
			{
				expectType: TokenType.NOT_EQ,
				expectedLiteral: "!=",
			},
			{
				expectType: TokenType.INT,
				expectedLiteral: "2",
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
			expect(token.Type).toEqual(test.expectType);
			expect(token.Literal).toEqual(test.expectedLiteral);
		}
	});
});
