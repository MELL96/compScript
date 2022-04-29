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

"break"                 { console.log("Reconocio : " + yytext); return 'BREAK'}
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
    const identificador = require('../Clases/Expresiones/Identificador');
    const primitivo = require('../Clases/Expresiones/Primitivo');
    const ternario = require('../Clases/Expresiones/Ternario');
    const aritmetica = require('../Clases/Expresiones/Operaciones/Aritmetica');
    const logica = require('../Clases/Expresiones/Operaciones/Logica');
    const relacional = require('../Clases/Expresiones/Operaciones/Relacional');

    const ast = require('../Clases/Ast/Ast');
    const errores = require('../Clases/Ast/Errores');

    const tipo = require('../Clases/TablaSimbolos/Tipo');
    const simbolo = require('../Clases/TablaSimbolos/Simbolos');

    const declaracion = require('../Clases/Instrucciones/Declaracion');
    const asignacion = require('../Clases/Instrucciones/Asignacion');
    const print = require('../Clases/Instrucciones/Print');
    const println = require('../Clases/Instrucciones/Println');
    const detener = require('../Clases/Instrucciones/SentenciaTransferencia/Break');
    const continuar = require('../clases/instrucciones/sentenciaTransferencia/Continue.ts');

    const funcion = require('../Clases/Instrucciones/Funcion');
    const run = require('../Clases/Instrucciones/Runs');
    const llamada = require('../Clases/Instrucciones/Llamada');
    
    const While = require('../Clases/Instrucciones/SentenciaCiclica/While');
    const Ifs = require('../Clases/Instrucciones/SentenciaControl/Ifs');
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

instruccion : declaracion               { $$ = $1; }
            | asignacion                { $$ = $1; }
            | print                     { $$ = $1; }
            | sent_if                   { $$ = $1; }
            | sent_while                { $$ = $1; }
            | sent_for                  { $$ = $1; }
            | funciones                 { $$ = $1; }
            | llamada PYC               { $$ = $1; }
            | RUN llamada PYC           { $$ = new run.default($2, @1.first_line, @1.last_column); }
            | BREAK PYC                 { $$ = new detener.default(); }
            | CONTINUE PYC              { $$ = new continuar.default(); }
            | error                     { 
                                            console.log("Error Sintactico" + yytext + "linea: " + this.@$.first_line + "columna: " + this._$.first_column); 
                                            new errores.default("Lexico", "No se esperaba el caracter " + yytext, this.@$.first_line, this._$.first_column);            
                                        }
            ;

declaracion : tipo lista_simbolos PYC           { $$ = new declaracion.default($1, $2, @1.first_line, @1.last_column); }
            ;   

tipo    : INT               { $$ = new tipo.default('ENTERO'); }
        | DOUBLE            { $$ = new tipo.default('DOBLE'); }
        | STRING            { $$ = new tipo.default('STRING'); }
        | CHAR1             { $$ = new tipo.default('CHAR'); }
        | BOOLEAN           { $$ = new tipo.default('BOOLEAN'); }
        ;

lista_simbolos  : lista_simbolos COMA ID                    { $$ = $1; $$.push(new simbolo.default(1,null,$3, null)); }
                | lista_simbolos COMA ID IGUAL e            { $$ = $1; $$.push(new simbolo.default(1,null,$3, $5)); }
                | ID                                        { $$ = new Array(); $$.push(new simbolo.default(1,null,$1, null)); }
                | ID IGUAL e                                { $$ = new Array(); $$.push(new simbolo.default(1,null,$1, $3)); }
                ;


asignacion      : ID IGUAL e PYC            { $$ = new asignacion.default($1,$3, @1.first_line, @1.last_column); }
                ;

sent_if : IF PARA e PARC LLAVA instrucciones LLAVC                                          { $$ = new Ifs.default($3, $6, [], @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE LLAVA instrucciones LLAVC           { $$ = new Ifs.default($3, $6, $10, @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE sent_if                             { $$ = new Ifs.default($3, $6, [$9], @1.first_line, @1.last_column); }
        ;
 
sent_while  : WHILE PARA e PARC LLAVA instrucciones LLAVC           { $$ = new While.default($3, $6, @1.first_line, @1.last_column); }
            ; 

sent_for: FOR PARA tipo ID IGUAL e PYC e PYC ID IGUAL e PARC LLAVA instrucciones  LLAVC                 { }
        | FOR PARA ID IGUAL e PYC e PYC ID IGUAL e PARC LLAVA instrucciones LLAVC                       { }
        ;

funciones   : VOID ID PARA PARC LLAVA instrucciones LLAVC                                       { $$ = new funcion.default(3, new tipo.default('VOID'), $2, [], true, $6, @1.first_line, @1.last_column ); }
            | VOID ID PARA lista_parametros PARC LLAVA instrucciones LLAVC                      { $$ = new funcion.default(3, new tipo.default('VOID'), $2, $4, true, $7, @1.first_line, @1.last_column ); }
            ;

lista_parametros    : lista_parametros COMA tipo ID         { $$ = $1; $$.push(new simbolo.default(6,$3, $4, null)); }
                    | tipo ID                               { $$ = new Array(); $$.push(new simbolo.default(6,$1,$2, null)); }
                    ;

llamada : ID PARA PARC                      { $$ = new llamada.default($1, [],@1.first_line, @1.last_column ); }
        | ID PARA lista_exp PARC            { $$ = new llamada.default($1, $3 ,@1.first_line, @1.last_column ); }
        ;

lista_exp   : lista_exp COMA e          { $$ = $1; $$.push($3); }
            | e                         { $$ = new Array(); $$.push($1); }
            ;

print   : PRINT PARA e PARC PYC         { $$ = new print.default($3, @1.first_line, @1.last_column); }
        | PRINTLN PARA e PARC PYC       { $$ = new println.default($3, @1.first_line, @1.last_column); }
        ; 
    
e   : e MAS e               { $$ = new aritmetica.default($1, '+', $3, @1.first_line, @1.last_column, false); }
    | e MENOS e             { $$ = new aritmetica.default($1, '-', $3, @1.first_line, @1.last_column, false); }
    | e MULTI e             { $$ = new aritmetica.default($1, '*', $3, @1.first_line, @1.last_column, false); }
    | e DIV e               { $$ = new aritmetica.default($1, '/', $3, @1.first_line, @1.last_column, false); }
    | e POTEN e             { $$ = new aritmetica.default($1, '^', $3, @1.first_line, @1.last_column, false); }
    | e MODULO e            { $$ = new aritmetica.default($1, '%', $3, @1.first_line, @1.last_column, false); }
    
    | e IGUALIGUAL e            { $$ = new relacional.default($1, '==', $3, @1.first_line, @1.last_column, false); }
    | e NOIGUAL e               { $$ = new relacional.default($1, '!=', $3, @1.first_line, @1.last_column, false); }
    | e MENORIGUAL e            { $$ = new relacional.default($1, '<=', $3, @1.first_line, @1.last_column, false); }
    | e MENORQUE e              { $$ = new relacional.default($1, '<', $3, @1.first_line, @1.last_column, false); } 
    | e MAYORIGUAL e            { $$ = new relacional.default($1, '>=', $3, @1.first_line, @1.last_column, false); }
    | e MAYORQUE e              { $$ = new relacional.default($1, '>', $3, @1.first_line, @1.last_column, false); }

    | e OR e            { $$ = new logica.default($1, '||', $3, @1.first_line, @1.last_column, false); }
    | e AND e           { $$ = new logica.default($1, '&&', $3, @1.first_line, @1.last_column, false); }
    | NOT e             { $$ = new logica.default($2, '!', null, @1.first_line, @1.last_column, true); }

    | PARA e PARC           { $$ = $2; }

    | MENOS e %prec UNARIO          { $$ = new aritmetica.default($2, 'UNARIO', null, @1.first_line, @1.last_column, true);}

    | ENTERO            { $$ = new primitivo.default(Number(yytext), @1.first_line, @1.last_column); }
    | DECIMAL           { $$ = new primitivo.default(Number(yytext), @1.first_line, @1.last_column); }
    | CADENA            { $$ = new primitivo.default($1.slice(1, $1.length-1), @1.first_line, @1.last_column); }
    | CHAR              { $$ = new primitivo.default($1.slice(1, $1.length-1), @1.first_line, @1.last_column); }
    | TRUE              { $$ = new primitivo.default(true, @1.first_line, @1.last_column); }
    | FALSE             { $$ = new primitivo.default(false, @1.first_line, @1.last_column); }

    | ID            { $$ = new identificador.default($1, @1.first_line, @1.last_column); }

    | e INTERROGACION e DSPNTS e            { $$ = new ternario.default($1, $3, $5, @1.first_line, @1.last_column); } 
    
    | ID INCRE          { $$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, @1.first_line, @1.last_column), @1.first_line, @1.last_column, false); }
    | ID DECRE          { $$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, @1.first_line, @1.last_column), @1.first_line, @1.last_column, false); }
    ;
