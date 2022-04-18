//-------------------------------------------------------------------> DEFINICION

%lex
%options case-insensitive
%option yylineno

//-----------------------> EXPRESIONES REGULARES

num             [0-9]+
id              [a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*

//-----------------------> CADENA

escapechar      [\'\"\\ntr]
escape          \\{escapechar}
aceptacion      [^\"\\]+
cadena          (\"({escape} | {aceptacion})*\")

//-----------------------> CARACTER

escapechar2     [\\ntr]
escape2         \\{escapechar2}
aceptada2       [^\'\\]
caracter        (\'({escape2}|{aceptada2})\')

%%

//-----------------------> COMENTARIOS

"//".*                              { /* Ignoro los comentarios simples */ }
"/*"((\*+[^/*])|([^*]))*\**"*/"     { /*Ignorar comentarios con multiples lneas*/ }  

//-------------------------------------------------------------------> SIMBOLOS DEL PROGRAMA

//-----------------------> OPERADORES DE INCREMENTO Y DECREMENTO

"++"                    { console.log("Reconocio : " + yytext); return 'INCRE' }
"--"                    { console.log("Reconocio : " + yytext); return 'DECRE' }

//-----------------------> OPERADORES ARITMETICOS

"+"                     { console.log("Reconocio : " + yytext); return 'MAS' }
"-"                     { console.log("Reconocio : " + yytext); return 'MENOS' }
"*"                     { console.log("Reconocio : " + yytext); return 'MULTI' }
"/"                     { console.log("Reconocio : " + yytext); return 'DIV' }
"^"                     { console.log("Reconocio : " + yytext); return 'POTEN' }
"%"                     { console.log("Reconocio : " + yytext); return 'MODULO' }

//-----------------------> SIGNOS DE AGRUPACION / ENCAPSULAMIENTO

"("                     { console.log("Reconocio : " + yytext); return 'PARA' }
")"                     { console.log("Reconocio : " + yytext); return 'PARC' }
"["                     { console.log("Reconocio : " + yytext); return 'CORA' }
"]"                     { console.log("Reconocio : " + yytext); return 'CORC' }
"{"                     { console.log("Reconocio : " + yytext); return 'LLAVA' }
"}"                     { console.log("Reconocio : " + yytext); return 'LLAVC' } 

//-----------------------> OPERACIONES RELACIONALES

"=="                    { console.log("Reconocio : " + yytext); return 'IGUALIGUAL' }
"!="                    { console.log("Reconocio : " + yytext); return 'NOIGUAL' }
"<="                    { console.log("Reconocio : " + yytext); return 'MENORIGUAL' }
"<"                     { console.log("Reconocio : " + yytext); return 'MENORQUE' }
">="                    { console.log("Reconocio : " + yytext); return 'MAYORIGUAL' }
">"                     { console.log("Reconocio : " + yytext); return 'MAYORQUE' }
"="                     { console.log("Reconocio : " + yytext); return 'IGUAL' }

//-----------------------> SIGNOS DE PUNTUACION

":"                     { console.log("Reconocio : " + yytext); return 'DSPNTS' }
";"                     { console.log("Reconocio : " + yytext); return 'PYC' }
","                     { console.log("Reconocio : " + yytext); return 'COMA' }
"."                     { console.log("Reconocio : " + yytext); return 'PUNTO' } 

//-----------------------> OPERACIONES LOGICOS

"||"                    { console.log("Reconocio : " + yytext); return 'OR' }
"&&"                    { console.log("Reconocio : " + yytext); return 'AND' }
"!"                     { console.log("Reconocio : " + yytext); return 'NOT' }
"?"                     { console.log("Reconocio : " + yytext); return 'INTERROGACION' }

//-----------------------> SECUENCIAS DE ESCAPE

"\n"                    { console.log("Reconocio : " + yytext); return 'SALTOLINEA' }
"\\"                    { console.log("Reconocio : " + yytext); return 'BARRAINVERTIDA' }
"\t"                    { console.log("Reconocio : " + yytext); return 'TABULACION' }
"\r"                    { console.log("Reconocio : " + yytext); return 'RETORNO'}
"\'"                    { console.log("Reconocio : " + yytext); return 'COMILLASIMPLE' }

//-------------------------------------------------------------------> PALABRAS RESERVADAS

//-----------------------> TIPOS DE DATOS

"int"                   { console.log("Reconocio : " + yytext); return 'INT' }
"double"                { console.log("Reconocio : " + yytext); return 'DOUBLE' }
"boolean"               { console.log("Reconocio : " + yytext); return 'BOOLEAN' }
"char"                  { console.log("Reconocio : " + yytext); return 'CHAR1' }
"string"                { console.log("Reconocio : " + yytext); return 'STRING' }
"true"                  { console.log("Reconocio : " + yytext); return 'TRUE' }
"false"                 { console.log("Reconocio : " + yytext); return 'FALSE' } 

//-----------------------> SENTENCIAS DE CONTROL

"if"                    { console.log("Reconocio : " + yytext); return 'IF' }
"else"                  { console.log("Reconocio : " + yytext); return 'ELSE' }
"switch"                { console.log("Reconocio : " + yytext); return 'SWITCH' }
"case"                  { console.log("Reconocio : " + yytext); return 'CASE' }
"default"               { console.log("Reconocio : " + yytext); return 'DEFAULT' }

//-----------------------> SENTENCIAS CICLICAS

"while"                 { console.log("Reconocio : " + yytext); return 'WHILE'}
"for"                   { console.log("Reconocio : " + yytext); return 'FOR' }
"do"                    { console.log("Reconocio : " + yytext); return 'DO' }

//-----------------------> SENTENCIAS DE TRANSFERENCIA

"break"                 { console.log("Reconocio : "+ yytext); return 'BREAK'}
"continue"              { console.log("Reconocio : " + yytext); return 'CONTINUE' }
"return"                { console.log("Reconocio : " + yytext); return 'RETURN' }

//-----------------------> METODOS

"void"                  { console.log("Reconocio : " + yytext); return 'VOID'}

//-----------------------> INSTRUCCIONES

"new"                   { console.log("Reconocio : " + yytext); return 'NEW' }
"print"                 { console.log("Reconocio : " + yytext); return 'PRINT'}
"println"               { console.log("Reconocio : " + yytext); return 'PRINTLN'}
"toLower"               { console.log("Reconocio : " + yytext); return 'TOLOWER' }
"toUpper"               { console.log("Reconocio : " + yytext); return 'TOUPPER' }
"round"                 { console.log("Reconocio : " + yytext); return 'ROUND' }
"length"                { console.log("Reconocio : " + yytext); return 'LENGTH' }
"typeof"                { console.log("Reconocio : " + yytext); return 'TYPEOF' }
"toString"              { console.log("Reconocio : " + yytext); return 'TOSTRING' }
"toCharArray"           { console.log("Reconocio : " + yytext); return 'TOCHAR' } 
"run"                   { console.log("Reconocio : " + yytext); return 'RUN' } 

//-----------------------> SIMBOLOS DE EXPRESION REGULAR

[0-9]+("."[0-9]+)?\b    { console.log("Reconocio : " + yytext); return 'DECIMAL'}
{num}                   { console.log("Reconocio : " + yytext); return 'ENTERO'}
{id}                    { console.log("Reconocio : " + yytext); return 'ID'}
{cadena}                { console.log("Reconocio : " + yytext); return 'CADENA'}
{caracter}              { console.log("Reconocio : " + yytext); return 'CHAR'}

//-----------------------> ESPACIOS EN BLANCO 

[\s\r\n\t]              { /* ignora los espacios en blanco */ }

<<EOF>>               return 'EOF'

//-----------------------> ERRORES 

.                       { 
                            console.log("Error Lexico " + yytext + " linea " + yylineno + " columna " + (yylloc.first_column+1));
                            new errores.default('Lexico', 'El caracter ' + yytext  + ' no forma parte del lenguaje',  yylineno+1,  yylloc.last_column+1); 
                        }

/lex

//-------------------------------------------------------------------> AREA DE IMPORTS

%{
        const primitivo = require('../clases/expresiones/Primitivo.ts');

        const aritmetica = require('../clases/expresiones/operaciones/Aritmetica.ts');
        const logica = require('../clases/expresiones/operaciones/Logica.ts')
        const relacional = require('../clases/expresiones/operaciones/Relacional.ts');
        const identificador = require('../clases/expresiones/Identificador.ts');

        const ast = require('../clases/ast');
        const errores = require('../clases/ast/Errores.ts');

        const tipo = require('../clases/tablaSimbolos/Tipo.ts');
%}

//-------------------------------------------------------------------> PRECEDENCIA DE OPERADORES

%right 'INTERROGACION'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MENORIGUAL' 'MAYORQUE' 'MAYORIGUAL' 'IGUALIGUAL' 'NOIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV'
%right 'UNARIO'
%nonassoc 'POTEN' 'MODULO' ' IGUAL'

%start inicio

%% 

//-------------------------------------------------------------------> GRAMATICA

inicio  : instrucciones EOF         { console.log($1); $$ = new ast.default($1); return $$; }
        ;

instrucciones   : instrucciones instruccion         { $$ = $1; $$.push($2); }
                | instruccion                       { $$ = new Array(); $$.push($1); }
                ;

instruccion : declaracion                   { }
            | asignacion                    { }
            | print                         { }
            | sent_if                       { }
            | sent_while                    { }
            | funciones                     { }
            | llamada PYC                   { }
            | EJECUTAR llamada PYC          { }
            | BREAK PYC                     { }
            | error                         { new errores.default('Lexico', `No se esperaba el caracter ${yytext}`, this._$.first_line, this._$.first_column); }
            ;

declaracion : tipo lista_simbolos PYC           { }
            ;   

tipo    : INT               { $$ = new tipo.default('ENTERO'); }
        | DOUBLE            { $$ = new tipo.default('DOBLE'); }
        | STRING            { $$ = new tipo.default('STRING'); }
        | CHAR1             { $$ = new tipo.default('CHAR'); }
        | BOOLEAN           { $$ = new tipo.default('BOOLEAN'); }
        ;

lista_simbolos  : lista_simbolos COMA ID                    { }
                | lista_simbolos COMA ID IGUAL e            { }
                | ID                                        { }
                | ID IGUAL e                                { }
                ;

asignacion  : ID IGUAL e PYC            { }
            ; 

sent_if : IF PARA e PARC LLAVA instrucciones LLAVC                                          { }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE LLAVA instrucciones LLAVC           { }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE sent_if                             { }
        ;
 
sent_while  : WHILE PARA e PARC LLAVA instrucciones LLAVC           { }
            ; 

funciones   : VOID ID PARA PARC LLAVA instrucciones LLAVC                           { }
            | VOID ID PARA lista_parametros PARC LLAVA instrucciones LLAVC          { }  
            ;

lista_parametros    : lista_parametros COMA tipo ID         { }
                    | tipo ID                               { }
                    ;

llamada : ID PARA PARC                      { }
        | ID PARA lista_exp PARC            { }
        ;

lista_exp   : lista_exp COMA e          { }
            | e                         { }
            ;

print : PRINT PARA e PARC PYC           { }
    ; 
    
e : e MAS e                         { $$ = new aritmetica.default($1, '+', $3, $1.first_line, $1.last_column, false); }
    | e MENOS e                     { $$ = new aritmetica.default($1, '-', $3, $1.first_line, $1.last_column, false); }
    | e MULTI e                     { $$ = new aritmetica.default($1, '*', $3, $1.first_line, $1.last_column, false); }
    | e DIV e                       { $$ = new aritmetica.default($1, '/', $3, $1.first_line, $1.last_column, false); }
    | e POTEN e                     { $$ = new aritmetica.default($1, '^', $3, $1.first_line, $1.last_column, false); }
    | e MODULO e                    { $$ = new aritmetica.default($1, '%', $3, $1.first_line, $1.last_column, false); }
    
    | e IGUALIGUAL e                { $$ = new relacional.default($1, '==', $3, $1.first_line, $1.last_column, false); }
    | e NOIGUAL e                   { $$ = new relacional.default($1, '!=', $3, $1.first_line, $1.last_column, false); }
    | e MENORIGUAL e                { $$ = new relacional.default($1, '<=', $3, $1.first_line, $1.last_column, false); }
    | e MENORQUE e                  { $$ = new relacional.default($1, '<', $3, $1.first_line, $1.last_column, false); } 
    | e MAYORIGUAL e                { $$ = new relacional.default($1, '>=', $3, $1.first_line, $1.last_column, false); }
    | e MAYORQUE e                  { $$ = new relacional.default($1, '>', $3, $1.first_line, $1.last_column, false); }

    | e OR e                        { $$ = new logica.default($1, '||', $3, $1.first_line, $1.last_column, false); }
    | e AND e                       { $$ = new logica.default($1, '&&', $3, $1.first_line, $1.last_column, false); }
    | NOT e                         { $$ = new logica.default($1, '!', null, $1.first_line, $1.last_column, true); }

    | PARA e PARC                   { $$ = $2; }

    | MENOS e %prec UNARIO          { $$ = new aritemtica.default($2, 'UNARIO', null, $1.first_line, $1.last_column, true); }

    | ENTERO                        { $$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column); }
    | DECIMAL                       { $$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column); }
    | CADENA                        { $$ = new primitivo.default($1.slice(1, $1.length-1), $1.first_line, $1.last_column); }
    | CHAR                          { $$ = new primitivo.default($1.slice(1, $1.length-1), $1.first_line, $1.last_column); }
    | TRUE                          { $$ = new primitivo.default(true, $1.first_line, $1.last_column); }
    | FALSE                         { $$ = new primitivo.default(false, $1.first_line, $1.last_column); }

    | ID                            { $$ = new identificador.default($1, $1.first_line, $1.last_column); }

    | e INTERROGACION e DSPNTS e    { } 
    
    | ID INCRE                      { $$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, $1.first_line, $1.last_column), $1.first_line, $1.last_column, false); }
    | ID DECRE                      { $$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, $1.first_line, $1.last_column), $1.first_line, $1.last_column, false); }
    ;
