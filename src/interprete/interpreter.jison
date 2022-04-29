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
aceptacion      [^\"\\]
cadena          (\"({escape} | {aceptacion})*\")

//-----------------------> CARACTER

escapechar2      [\'\"\\ntr]
escape2          \\{escapechar2}
aceptacion2      [^\'\\] 
caracter         (\'({escape2} | {aceptacion2})\')

%%

//-----------------------> COMENTARIOS

"//".*                                  {/*Ignoramos los comentarios simples*/}
"/*"((\*+[^/*])|([^*]))*\**"*/"         {/*Ignorar comentarios con multiples lneas*/} 

//-------------------------------------------------------------------> SIMBOLOS DEL PROGRAMA

//-----------------------> OPERADORES DE INCREMENTO Y DECREMENTO

"++"                    { console.log("Reconocio : " + yytext); return 'INCRE' }
"--"                    { console.log("Reconocio : " + yytext); return 'DECRE' }

//-----------------------> OPERADORES ARITMETICOS

"+"                     { console.log("Reconocio : " + yytext); return 'MAS' } 
"-"                     { console.log("Reconocio : " + yytext); return 'MENOS' } 
"*"                     { console.log("Reconocio : " + yytext); return 'MULTI' } 
"/"                     { console.log("Reconocio : " + yytext); return 'DIV' } 
"^"                     { console.log("Reconocio : " + yytext); return 'POT' } 
"%"                     { console.log("Reconocio : " + yytext); return 'MOD' }

//-----------------------> SIGNOS DE AGRUPACION / ENCAPSULAMIENTO

"("                     { console.log("Reconocio : " + yytext); return 'PARA' } 
")"                     { console.log("Reconocio : " + yytext); return 'PARC' } 
"["                     { console.log("Reconocio : " + yytext); return 'CORA' } 
"]"                     { console.log("Reconocio : " + yytext); return 'CORC' } 
"{"                     { console.log("Reconocio : " + yytext); return 'LLAVA' }
"}"                     { console.log("Reconocio : " + yytext); return 'LLAVC' }

//-----------------------> OPERACIONES RELACIONALES

"=="                    { console.log("Reconocio : " + yytext); return 'IGUALIGUAL' } 
"!="                    { console.log("Reconocio : " + yytext); return 'DIFERENTE' }
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
"\r"                    { console.log("Reconocio : " + yytext); return 'RETORNO' }
"\'"                    { console.log("Reconocio : " + yytext); return 'COMILLASIMPLE' }

//-------------------------------------------------------------------> PALABRAS RESERVADAS

//-----------------------> TIPOS DE DATOS

"int"                   { console.log("Reconocio : " + yytext); return 'INT' } 
"double"                { console.log("Reconocio : " + yytext); return 'DOUBLE' } 
"boolean"               { console.log("Reconocio : " + yytext); return 'BOOLEAN' }
"char"                  { console.log("Reconocio : " + yytext); return 'CHAR' } 
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

"while"                 { console.log("Reconocio : " + yytext); return 'WHILE' }
"for"                   { console.log("Reconocio : " + yytext); return 'FOR' }
"do"                    { console.log("Reconocio : " + yytext); return 'DO' }

//-----------------------> SENTENCIAS DE TRANSFERENCIA

"break"                 { console.log("Reconocio : " + yytext); return 'BREAK' }
"continue"              { console.log("Reconocio : " + yytext); return 'CONTINUE' }
"return"                { console.log("Reconocio : " + yytext); return 'RETURN' }

//-----------------------> METODOS

"void"                  { console.log("Reconocio : " + yytext); return 'VOID' }

//-----------------------> INSTRUCCIONES

"new"                   { console.log("Reconocio : " + yytext); return 'NEW' }
"print"                 { console.log("Reconocio : " + yytext); return 'PRINT' }
"println"               { console.log("Reconocio : " + yytext); return 'PRINTLN' }
"toLower"               { console.log("Reconocio : " + yytext); return 'TOLOWER' }
"toUpper"               { console.log("Reconocio : " + yytext); return 'TOUPPER' }
"round"                 { console.log("Reconocio : " + yytext); return 'ROUND' }
"length"                { console.log("Reconocio : " + yytext); return 'LENGTH' }
"typeof"                { console.log("Reconocio : " + yytext); return 'TYPEOF' }
"toString"              { console.log("Reconocio : " + yytext); return 'TOSTRING' }
"toCharArray"           { console.log("Reconocio : " + yytext); return 'TOCHAR' }
"run"                   { console.log("Reconocio : " + yytext); return 'RUN' }

//-----------------------> SIMBOLOS DE EXPRESION REGULAR

[0-9]+("."[0-9]+)?\b    { console.log("Reconocio : " + yytext); return 'DECIMAL' }
{num}                   { console.log("Reconocio : " + yytext); return 'ENTERO' }
{id}                    { console.log("Reconocio : " + yytext); return 'ID' }
{cadena}                { console.log("Reconocio : " + yytext); return 'CADENA' }
{caracter}              { console.log("Reconocio : " + yytext); return 'CHAR' }

//-----------------------> ESPACIOS EN BLANCO 

[\s\r\n\t]              { /* ignora los espacios en blanco */ }

/*Espacios*/
[\s\r\n\t]             {/* Espacios se ignoran */}

<<EOF>>               return 'EOF'

//-----------------------> ERRORES 

.                       { 
                            console.log("Error Lexico " + yytext + " linea " + yylineno + " columna " + (yylloc.first_column+1));
                            new errores.default('Lexico', 'El caracter ' + yytext  + ' no forma parte del lenguaje',  yylineno+1,  yylloc.last_column+1); 
                        }

/lex

//-------------------------------------------------------------------> AREA DE IMPORTS

%{
        const identificador = require('../Interprete/Expresiones/Identificador')
        const primitivo = require('../Interprete/Expresiones/Primitivo');
        const ternario = require('../Interprete/Expresiones/Ternario');
        const aritmetica = require('../Interprete/Expresiones/Operaciones/Aritmetica');
        const logica = require('../Interprete/Expresiones/Operaciones/Logica');
        const relacional = require('../Interprete/Expresiones/Operaciones/Relacional');

        const ast = require('../Interprete/Ast/Ast')
        const errores = require('../Interprete/Ast/Errores')

        const tipo = require('../Interprete/TablaSimbolos/Tipo')
        const simbolo = require('../Interprete/TablaSimbolos/Simbolo')

        const declaracion = require('../Interprete/Instrucciones/Declaracion')
        const asignacion = require('../Interprete/Instrucciones/Asignacion');

        const detener = require('../Interprete/Instrucciones/SentenciasTransferencia/Break');
        const continuar = require('../Interprete/Instrucciones/SentenciasTransferencia/Continue');
        const retorno = require('../Interprete/Instrucciones/SentenciasTransferencia/Return');

        const funcion = require('../Interprete/Instrucciones/Funcion');
        const llamada = require('../Interprete/Instrucciones/Llamada');

        const While = require('../Interprete/Instrucciones/SentenciasCiclica/While');
        const For = require('../Interprete/Instrucciones/SentenciasCiclica/For');

        const Ifs = require('../Interprete/Instrucciones/SentenciasControl/Ifs');
        const Switch = require('../Interprete/Instrucciones/SentenciasControl/Switch');
        const caso = require('../Interprete/Instrucciones/SentenciasControl/Caso'); 
%}

//-------------------------------------------------------------------> PRECEDENCIA DE OPERADORES

%right 'INTERROGACION'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALIGUAL' 'DIFERENTE' 'MENORQUE' 'MENORIGUAL' 'MAYORQUE' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV'
%left 'POT' 
%right 'MOD'
%right UMINUS

%start inicio

%%

inicio  : instrucciones EOF     { $$ = new ast.default($1); return $$; }

instrucciones   : instrucciones instruccion     { $$ = $1; $$.push($2); }
                | instruccion                   { $$ = new Array(); $$.push($1); }
                ;

instruccion     : declaracion           { $$ = $1; }
                | asignacion            { $$ = $1; }
                | print                 { $$ = $1; }
                | sent_if               { $$ = $1; }
                | sent_while            { $$ = $1; } 
                | sent_for              { $$ = $1; } 
                | funciones             { $$ = $1; } 
                | llamada PYC           { $$ = $1; } 
                | RUN llamada PYC       { $$ = new run.default($2, @1.first_line, @1.last_column); }
                | BREAK PYC             { $$ = new detener.default(); }
                | CONTINUE PYC          { $$ = new continuar.default(); }
                | sent_switch           { $$ = $1; } 
                | ID DECRE PYC          { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
                | ID INCRE  PYC         { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
                | RETURN PYC            { $$ = new retorno.default(null); } 
                | RETURN e PYC          { $$ = new retorno.default($2); } 
                | error                 { 
                                          console.log("Error Sintactico" + yytext + "linea: " + this._$.first_line + "columna: " + this._$.first_column);                        
                                          new errores.default("Sintactico", "No se esperaba el caracter " + yytext, this._$.first_line ,this._$.first_column);            
                                        }
                ;

declaracion     : tipo lista_ids IGUAL e PYC    { $$ = new declaracion.default($1, $2, $4,  @1.first_line, @1.last_column); }  
                | tipo lista_ids PYC            { $$ = new declaracion.default($1, $2, null,  @1.first_line, @1.last_column); }
                ;

tipo    : INT           {$$ = new tipo.default("ENTERO"); }
        | DOUBLE        {$$ = new tipo.default("DOBLE"); }
        | STRING        {$$ = new tipo.default("CADENA"); }
        | CHAR          {$$ = new tipo.default("CARACTER"); }
        | BOOLEAN       {$$ = new tipo.default("BOOLEANO"); }  
        ;

lista_ids       : lista_ids COMA ID         { $$ = $1; $$.push($3); }
                | ID                        { $$ = new Array(); $$.push($1); }
                ;

asignacion      : ID IGUAL e PYC        { $$ = new asignacion.default($1, $3, @1.first_line, @1.last_column); }
                ;

sent_if : IF PARA e PARC LLAVA instrucciones LLAVC                                      { $$ = new Ifs.default($3, $6, [], @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE LLAVA instrucciones LLAVC       { $$ = new Ifs.default($3, $6, $10, @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE sent_if                         { $$ = new Ifs.default($3, $6, [$9], @1.first_line, @1.last_column); }
        ;

sent_while      : WHILE PARA e PARC LLAVA instrucciones LLAVC   { $$ = new While.default($3, $6, @1.first_line, @1.last_column); }
                ;

sent_for        : FOR PARA dec_asig_for PYC e PYC actualizacion_for PARC LLAVA instrucciones LLAVC      { $$ = new For.default($3, $5, $7, $10, @1.first_line, @1.last_column); }
                ;

dec_asig_for    : tipo ID IGUAL e       { $$ = new declaracion.default($1, $2, $4,  @1.first_line, @1.last_column); } 
                | ID IGUAL e            { $$ = new asignacion.default($1, $3, @1.first_line, @1.last_column); }
                ;

actualizacion_for       : ID DECRE      { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
                        | ID INCRE      { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
                        | ID IGUAL e    { $$ = new asignacion.default($1, $3, @1.first_line, @1.last_column); }
                        ;

sent_switch     : SWITCH PARA e PARC LLAVA caselist LLAVC               { $$ = new Switch.default($3, $6, null, @1.first_line, @1.last_column); }
                | SWITCH PARA e PARC LLAVA caselist default LLAVC       { $$ = new Switch.default($3, $6, $7, @1.first_line, @1.last_column); }
                | SWITCH PARA e PARC LLAVA default LLAVC                { $$ = new Switch.default($3, [], $6, @1.first_line, @1.last_column); }
                ;

caselist: caselist caso         { $$ = $1; $$.push($2); }
        | caso                  { $$ = new Array(); $$.push($1); }
        ;

caso    : CASE e DSPNTS instrucciones           { $$ = new caso.default($2, $4, @1.first_line, @1.last_column); }
        ;

default : DEFAULT DSPNTS instrucciones          { $$ = new caso.default(null, $3, @1.first_line, @1.last_column); }
        ;

funciones       : tipo ID PARA lista_params PARC LLAVA instrucciones LLAVC      { $$ = new funcion.default(2, $1, $2, $4, false, $7,  @1.first_line, @1.last_column); }
                | tipo ID PARA  PARC LLAVA instrucciones LLAVC                  { $$ = new funcion.default(2, $1, $2, [], false, $6,  @1.first_line, @1.last_column); }
                | VOID ID PARA lista_params PARC LLAVA instrucciones LLAVC      { $$ = new funcion.default(3, $1, $2, $4, true, $7,  @1.first_line, @1.last_column); }
                | VOID ID PARA  PARC LLAVA instrucciones LLAVC                  { $$ = new funcion.default(3, $1, $2, [], true, $6,  @1.first_line, @1.last_column); }
                ;

lista_params    : lista_params COMA tipo ID     { $$ = $1; $$.push(new simbolo.default(6, $3, $4, null)); }
                | tipo ID                       { $$ = new Array(); $$.push(new simbolo.default(6, $1, $2, null)); }
                ;

llamada : ID PARA lista_vals PARC       {$$ = new llamada.default($1, $3, @1.first_line, @1.last_column ); }
        | ID PARA  PARC                 {$$ = new llamada.default($1, [] ,@1.first_line, @1.last_column ); }
        ; 

lista_vals      : lista_vals COMA e     { $$ = $1; $$.push($3); }
                | e                     { $$ = new Array(); $$.push($1); }
                ; 

e       : e MAS e                       { $$ = new aritmetica.default($1, '+', $3, @1.first_line, @1.last_column,false); }
        | e MENOS e                     { $$ = new aritmetica.default($1, '-', $3, @1.first_line, @1.last_column,false); }
        | e MULTI e                     { $$ = new aritmetica.default($1, '*', $3, @1.first_line, @1.last_column,false); }
        | e DIV e                       { $$ = new aritmetica.default($1, '/', $3, @1.first_line, @1.last_column,false); }
        | e POT e                       { $$ = new aritmetica.default($1, '^', $3, @1.first_line, @1.last_column,false); }
        | e MOD e                       { $$ = new aritmetica.default($1, '%', $3, @1.first_line, @1.last_column,false); }

        | e IGUALIGUAL e                { $$ = new relacional.default($1, '==', $3, @1.first_line, @1.last_column,false); }
        | e DIFERENTE e                 { $$ = new relacional.default($1, '!=', $3, @1.first_line, @1.last_column,false); }
        | e MENORIGUAL e                { $$ = new relacional.default($1, '<=', $3, @1.first_line, @1.last_column,false); }
        | e MENORQUE e                  { $$ = new relacional.default($1, '<', $3, @1.first_line, @1.last_column,false); }
        | e MAYORIGUAL e                { $$ = new relacional.default($1, '>=', $3, @1.first_line, @1.last_column,false); }
        | e MAYORQUE e                  { $$ = new relacional.default($1, '>', $3, @1.first_line, @1.last_column,false); }

        | e OR e                        { $$ = new logica.default($1, '||', $3, @1.first_line, @1.last_column,false); }
        | e AND e                       { $$ = new logica.default($1, '&&', $3, @1.first_line, @1.last_column,false); }
        | NOT e                         { $$ = new logica.default($2, '!', null, @1.first_line, @1.last_column,true); }

        | MENOS e %prec UMINUS          { $$ = new aritmetica.default($2, 'UNARIO', null, @1.first_line, @1.last_column,true); }

        | PARA e PARC                   { $$ = $2; }
        
        
        | ENTERO                        { $$ = new primitivo.default(Number($1), 'ENTERO', @1.first_line, @1.last_column); }
        | DECIMAL                       { $$ = new primitivo.default(Number($1), 'DOBLE', @1.first_line, @1.last_column); }
        | CADENA                        { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, 'CADENA', @1.first_line, @1.last_column); }
        | CARACTER                      { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, 'CARACTER', @1.first_line, @1.last_column); }
        | TRUE                          { $$ = new primitivo.default(true, 'BOOLEANO', @1.first_line, @1.last_column); }
        | FALSE                         { $$ = new primitivo.default(false, 'BOOLEANO', @1.first_line, @1.last_column); }
        
        | ID                            { $$ = new identificador.default($1, @1.first_line, @1.last_column); }
        
        | ID INCRE                      { $$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false); }
        | ID DECRE                      { $$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false); }
        
        | e INTERROGACION e DSPNTS e    { $$ = new ternario.default($1, $3, $5, @1.first_line, @1.last_column); }
        | llamada                       { $$ = $1; } 
        ;
