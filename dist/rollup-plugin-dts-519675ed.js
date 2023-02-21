"use strict";var Y=require("module"),Q=require("path"),Z=require("magic-string");function X(n){return n&&typeof n=="object"&&"default"in n?n:{default:n}}function ee(n){if(n&&n.__esModule)return n;var e=Object.create(null);return n&&Object.keys(n).forEach(function(r){if(r!=="default"){var i=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(e,r,i.get?i:{enumerable:!0,get:function(){return n[r]}})}}),e.default=n,Object.freeze(e)}var x=ee(Q),te=X(Z),R=require;function re(){const n=process.cwd();try{return R.resolve("typescript",{paths:[n]})}catch{throw new Error(`Could not find \`typescript\` in ${n}`)}}var t=R(re());const L=".d.ts",$={getCurrentDirectory:()=>t.sys.getCurrentDirectory(),getNewLine:()=>t.sys.newLine,getCanonicalFileName:t.sys.useCaseSensitiveFileNames?n=>n:n=>n.toLowerCase()},ne={declaration:!0,noEmit:!1,emitDeclarationOnly:!0,noEmitOnError:!0,checkJs:!1,declarationMap:!1,skipLibCheck:!0,preserveSymlinks:!0,target:t.ScriptTarget.ESNext},K=new Map,P=(...n)=>process.env.DTS_LOG_CACHE?console.log("[cache]",...n):null;function V([n,e],r){for(P(n),K.set(n,r);n!==e&&n!==x.dirname(n);){if(n=x.dirname(n),P("up",n),K.has(n))return P("has",n);K.set(n,r)}}function O(n,e,r){const i={...ne,...e};let s=x.dirname(n),o=[];const m=r||s;if(K.has(m))P("HIT",m);else{P("miss",m);const l=r?x.resolve(process.cwd(),r):t.findConfigFile(s,t.sys.fileExists);if(!l)return{dtsFiles:o,dirName:s,compilerOptions:i};let d=s;s=x.dirname(l);const{config:D,error:N}=t.readConfigFile(l,t.sys.readFile);if(N)return console.error(t.formatDiagnostic(N,$)),{dtsFiles:o,dirName:s,compilerOptions:i};P("tsconfig",D);const a=t.parseJsonConfigFileContent(D,t.sys,s);V(r?[r,r]:[d,s],a)}const{fileNames:p,options:c,errors:f}=K.get(m);return o=p.filter(l=>l.endsWith(L)),f.length?(console.error(t.formatDiagnostics(f,$)),{dtsFiles:o,dirName:s,compilerOptions:i}):{dtsFiles:o,dirName:s,compilerOptions:{...c,...i}}}function ie(n,e,r){const{dtsFiles:i,compilerOptions:s}=O(n,e,r);return t.createProgram([n].concat(Array.from(i)),s,t.createCompilerHost(s,!0))}function se(n,e,r){const i=[];let s=[],o=new Set,m="",p={};for(let c of n){if(c.endsWith(L))continue;c=x.resolve(c);const f=O(c,e,r);if(f.dtsFiles.forEach(o.add,o),!s.length){s.push(c),{dirName:m,compilerOptions:p}=f;continue}if(f.dirName===m)s.push(c);else{const l=t.createCompilerHost(p,!0),d=t.createProgram(s.concat(Array.from(o)),p,l);i.push(d),s=[c],{dirName:m,compilerOptions:p}=f}}if(s.length){const c=t.createCompilerHost(p,!0),f=t.createProgram(s.concat(Array.from(o)),p,c);i.push(f)}return i}function ae(){let n;try{return{codeFrameColumns:n}=R("@babel/code-frame"),n}catch{try{return{codeFrameColumns:n}=Y.createRequire(typeof document=="undefined"?new(require("url")).URL("file:"+__filename).href:document.currentScript&&document.currentScript.src||new URL("rollup-plugin-dts-519675ed.js",document.baseURI).href)("@babel/code-frame"),n}catch{}}}function oe(n){const e=n.getSourceFile(),r=e.getLineAndCharacterOfPosition(n.getStart()),i=e.getLineAndCharacterOfPosition(n.getEnd());return{start:{line:r.line+1,column:r.character+1},end:{line:i.line+1,column:i.character+1}}}function ce(n){const e=ae(),i=n.getSourceFile().getFullText(),s=oe(n);return e?`
`+e(i,s,{highlightCode:!0}):`
${s.start.line}:${s.start.column}: \`${n.getFullText().trim()}\``}class g extends Error{constructor(e,r="Syntax not yet supported"){super(`${r}
${ce(e)}`)}}class le{constructor(e){this.sourceFile=e}findNamespaces(){const e=[],r={};for(const i of this.sourceFile.statements){const s={start:i.getStart(),end:i.getEnd()};if(t.isEmptyStatement(i)){e.unshift({name:"",exports:[],location:s});continue}if((t.isImportDeclaration(i)||t.isExportDeclaration(i))&&i.moduleSpecifier&&t.isStringLiteral(i.moduleSpecifier)){let{text:l}=i.moduleSpecifier;if(l.startsWith(".")&&(l.endsWith(".d.ts")||l.endsWith(".d.cts")||l.endsWith(".d.mts"))){let d=i.moduleSpecifier.getStart()+1,D=i.moduleSpecifier.getEnd()-1;e.unshift({name:"",exports:[],location:{start:d,end:D},textBeforeCodeAfter:l.replace(/\.d\.ts$/,".js").replace(/\.d\.cts$/,".cjs").replace(/\.d\.mts$/,".mjs")})}}if(t.isModuleDeclaration(i)&&i.body&&t.isModuleBlock(i.body)){for(const l of i.body.statements)if(t.isExportDeclaration(l)&&l.exportClause){if(t.isNamespaceExport(l.exportClause))continue;for(const d of l.exportClause.elements)d.propertyName&&d.propertyName.getText()==d.name.getText()&&e.unshift({name:"",exports:[],location:{start:d.propertyName.getEnd(),end:d.name.getEnd()}})}}if(t.isClassDeclaration(i)?r[i.name.getText()]={type:"class",generics:i.typeParameters}:t.isFunctionDeclaration(i)?r[i.name.getText()]={type:"function"}:t.isInterfaceDeclaration(i)?r[i.name.getText()]={type:"interface",generics:i.typeParameters}:t.isTypeAliasDeclaration(i)?r[i.name.getText()]={type:"type",generics:i.typeParameters}:t.isModuleDeclaration(i)&&t.isIdentifier(i.name)?r[i.name.getText()]={type:"namespace"}:t.isEnumDeclaration(i)&&(r[i.name.getText()]={type:"enum"}),!t.isVariableStatement(i))continue;const{declarations:o}=i.declarationList;if(o.length!==1)continue;const m=o[0],p=m.name.getText();if(!m.initializer||!t.isCallExpression(m.initializer)){r[p]={type:"var"};continue}const c=m.initializer.arguments[0];if(!m.initializer.expression.getFullText().includes("/*#__PURE__*/Object.freeze")||!t.isObjectLiteralExpression(c))continue;const f=[];for(const l of c.properties){if(!t.isPropertyAssignment(l)||!(t.isIdentifier(l.name)||t.isStringLiteral(l.name))||l.name.text!=="__proto__"&&!t.isIdentifier(l.initializer))throw new g(l,"Expected a property assignment");l.name.text!=="__proto__"&&f.push({exportedName:l.name.text,localName:l.initializer.getText()})}e.unshift({name:p,exports:f,location:s})}return{namespaces:e,itemTypes:r}}fix(){var s;let e=this.sourceFile.getFullText();const{namespaces:r,itemTypes:i}=this.findNamespaces();for(const o of r){const m=e.slice(o.location.end);e=e.slice(0,o.location.start);for(const{exportedName:p,localName:c}of o.exports)if(p===c){const{type:f,generics:l}=i[c]||{};if(f==="interface"||f==="type"){const d=z(l);e+=`type ${o.name}_${p}${d.in} = ${c}${d.out};
`}else if(f==="enum"||f==="class"){const d=z(l);e+=`type ${o.name}_${p}${d.in} = ${c}${d.out};
`,e+=`declare const ${o.name}_${p}: typeof ${c};
`}else e+=`declare const ${o.name}_${p}: typeof ${c};
`}if(o.name){e+=`declare namespace ${o.name} {
`,e+=`  export {
`;for(const{exportedName:p,localName:c}of o.exports)p===c?e+=`    ${o.name}_${p} as ${p},
`:e+=`    ${c} as ${p},
`;e+=`  };
`,e+="}"}e+=(s=o.textBeforeCodeAfter)!=null?s:"",e+=m}return e}}function z(n){return!n||!n.length?{in:"",out:""}:{in:`<${n.map(e=>e.getText()).join(", ")}>`,out:`<${n.map(e=>e.name.getText()).join(", ")}>`}}let q=1;function pe(n){return T({type:"Program",sourceType:"module",body:[]},{start:n.getFullStart(),end:n.getEnd()})}function fe(n){const e={type:"Identifier",name:String(q++)};return{ident:e,expr:{type:"AssignmentPattern",left:e,right:n}}}function v(n){return T({type:"Identifier",name:n.getText()},n)}function ue(n){const e=T({type:"FunctionExpression",id:null,params:[],body:{type:"BlockStatement",body:[]}},n),r=T({type:"ExpressionStatement",expression:{type:"CallExpression",callee:{type:"Identifier",name:String(q++)},arguments:[e],optional:!1}},n);return{fn:e,iife:r}}function me(){const n={type:"ArrayExpression",elements:[]};return{expr:n,stmt:{type:"ReturnStatement",argument:n}}}function de(n,e){return T({type:"FunctionDeclaration",id:T({type:"Identifier",name:t.idText(n)},n),params:[],body:{type:"BlockStatement",body:[]}},e)}function I(n){if(t.isLiteralExpression(n))return{type:"Literal",value:n.text};if(t.isPropertyAccessExpression(n)){if(t.isPrivateIdentifier(n.name))throw new g(n.name);return T({type:"MemberExpression",computed:!1,optional:!1,object:I(n.expression),property:I(n.name)},{start:n.expression.getStart(),end:n.name.getEnd()})}if(t.isIdentifier(n))return v(n);if(n.kind==t.SyntaxKind.NullKeyword)return{type:"Literal",value:null};throw new g(n)}function T(n,e){let r="start"in e?e:{start:e.getStart(),end:e.getEnd()};return Object.assign(n,r)}function M(n,e){return(t.getCombinedModifierFlags(n)&e)===e}function ye({sourceFile:n}){const e=new te.default(n.getFullText()),r=new Set,i=new Set;let s="";const o=new Map,m=new Map;for(const a of n.statements){if(t.isEmptyStatement(a)){e.remove(a.getStart(),a.getEnd());continue}if(t.isEnumDeclaration(a)||t.isFunctionDeclaration(a)||t.isInterfaceDeclaration(a)||t.isClassDeclaration(a)||t.isTypeAliasDeclaration(a)||t.isModuleDeclaration(a)){if(a.name){const u=a.name.getText();r.add(u),M(a,t.ModifierFlags.ExportDefault)?s=u:M(a,t.ModifierFlags.Export)&&i.add(u),a.flags&t.NodeFlags.GlobalAugmentation||N(u,[_(a),U(a)])}t.isModuleDeclaration(a)&&he(e,a),B(e,a)}else if(t.isVariableStatement(a)){const{declarations:u}=a.declarationList,y=M(a,t.ModifierFlags.Export);for(const S of a.declarationList.declarations)if(t.isIdentifier(S.name)){const E=S.name.getText();r.add(E),y&&i.add(E)}if(B(e,a),u.length==1){const S=u[0];t.isIdentifier(S.name)&&N(S.name.getText(),[_(a),U(a)])}else{const S=u.slice(),E=S.shift();N(E.name.getText(),[_(a),E.getEnd()]);for(const C of S)t.isIdentifier(C.name)&&N(C.name.getText(),[C.getFullStart(),C.getEnd()])}const{flags:h}=a.declarationList,F=`declare ${h&t.NodeFlags.Let?"let":h&t.NodeFlags.Const?"const":"var"} `,A=a.declarationList.getChildren().find(S=>S.kind===t.SyntaxKind.SyntaxList).getChildren();let w=0;for(const S of A)if(S.kind===t.SyntaxKind.CommaToken)w=S.getStart(),e.remove(w,S.getEnd());else if(w){e.appendLeft(w,`;
`);const E=S.getFullStart(),C=e.slice(E,S.getStart());let j=C.length-C.trimStart().length;j?e.overwrite(E,E+j,F):e.appendLeft(E,F)}}}for(const a of n.statements)if(l(a),!!M(a,t.ModifierFlags.ExportDefault)&&(t.isFunctionDeclaration(a)||t.isClassDeclaration(a))){if(a.name)continue;s||(s=D("export_default"));const u=a.getChildren(),y=u.findIndex(A=>A.kind===t.SyntaxKind.ClassKeyword||A.kind===t.SyntaxKind.FunctionKeyword),h=u[y],b=u[y+1];b.kind>=t.SyntaxKind.FirstPunctuation&&b.kind<=t.SyntaxKind.LastPunctuation?e.appendLeft(b.getStart(),s):e.appendRight(h.getEnd(),` ${s}`)}for(const a of m.values()){const y=a.pop()[0];for(const h of a)e.move(h[0],h[1],y)}s&&e.append(`
export default ${s};
`),i.size&&e.append(`
export { ${[...i].join(", ")} };
`);for(const[a,u]of o.entries())e.prepend(`import * as ${u} from "${a}";
`);const p=n.getLineStarts(),c=new Set;for(const a of n.typeReferenceDirectives){c.add(a.fileName);const{line:u}=n.getLineAndCharacterOfPosition(a.pos),y=p[u];let h=n.getLineEndOfPosition(a.pos);e.slice(h,h+1)==`
`&&(h+=1),e.remove(y,h)}const f=new Set;for(const a of n.referencedFiles){f.add(a.fileName);const{line:u}=n.getLineAndCharacterOfPosition(a.pos),y=p[u];let h=n.getLineEndOfPosition(a.pos);e.slice(h,h+1)==`
`&&(h+=1),e.remove(y,h)}return{code:e,typeReferences:c,fileReferences:f};function l(a){if(t.forEachChild(a,l),t.isImportTypeNode(a)){if(!t.isLiteralTypeNode(a.argument)||!t.isStringLiteral(a.argument.literal))throw new g(a,"inline imports should have a literal argument");const u=a.argument.literal.text,y=a.getChildren(),h=y.find(w=>w.kind===t.SyntaxKind.ImportKeyword).getStart();let b=a.getEnd();const F=y.find(w=>w.kind===t.SyntaxKind.DotToken||w.kind===t.SyntaxKind.LessThanToken);F&&(b=F.getStart());const A=d(u);e.overwrite(h,b,A)}}function d(a){let u=o.get(a);return u||(u=D(a.replace(/[^a-zA-Z0-9_$]/g,()=>"_")),o.set(a,u)),u}function D(a){let u=a;for(;r.has(u);)u=`_${u}`;return r.add(u),u}function N(a,u){let y=m.get(a);if(!y)y=[u],m.set(a,y);else{const h=y[y.length-1];h[1]===u[0]?h[1]=u[1]:y.push(u)}}}function B(n,e){var s;let r=!1;const i=t.isClassDeclaration(e)||t.isFunctionDeclaration(e)||t.isModuleDeclaration(e)||t.isVariableStatement(e);for(const o of(s=e.modifiers)!=null?s:[])switch(o.kind){case t.SyntaxKind.ExportKeyword:case t.SyntaxKind.DefaultKeyword:n.remove(o.getStart(),o.getEnd()+1);break;case t.SyntaxKind.DeclareKeyword:r=!0}i&&!r&&n.appendRight(e.getStart(),"declare ")}function he(n,e){if(!(!e.body||!t.isModuleBlock(e.body))){for(const r of e.body.statements)if(t.isExportDeclaration(r)&&r.exportClause){if(t.isNamespaceExport(r.exportClause))continue;for(const i of r.exportClause.elements)i.propertyName||n.appendLeft(i.name.getEnd(),` as ${i.name.getText()}`)}}}function _(n){const e=n.getFullStart();return e+(W(n,e)?1:0)}function U(n){const e=n.getEnd();return e+(W(n,e)?1:0)}function W(n,e){return n.getSourceFile().getFullText()[e]==`
`}const ge=new Set([t.SyntaxKind.LiteralType,t.SyntaxKind.VoidKeyword,t.SyntaxKind.UnknownKeyword,t.SyntaxKind.AnyKeyword,t.SyntaxKind.BooleanKeyword,t.SyntaxKind.NumberKeyword,t.SyntaxKind.StringKeyword,t.SyntaxKind.ObjectKeyword,t.SyntaxKind.NullKeyword,t.SyntaxKind.UndefinedKeyword,t.SyntaxKind.SymbolKeyword,t.SyntaxKind.NeverKeyword,t.SyntaxKind.ThisKeyword,t.SyntaxKind.ThisType,t.SyntaxKind.BigIntKeyword]);class H{constructor({id:e,range:r}){if(this.scopes=[],e)this.declaration=de(e,r);else{const{iife:s,fn:o}=ue(r);this.iife=s,this.declaration=o}const i=me();this.declaration.body.body.push(i.stmt),this.returnExpr=i.expr}pushScope(){this.scopes.push(new Set)}popScope(e=1){for(let r=0;r<e;r++)this.scopes.pop()}pushTypeVariable(e){var i;const r=e.getText();(i=this.scopes[this.scopes.length-1])==null||i.add(r)}pushReference(e){let r;if(e.type==="Identifier"?r=e.name:e.type==="MemberExpression"&&e.object.type==="Identifier"&&(r=e.object.name),r){for(const o of this.scopes)if(o.has(r))return}const{ident:i,expr:s}=fe(e);this.declaration.params.push(s),this.returnExpr.elements.push(i)}pushIdentifierReference(e){this.pushReference(v(e))}convertEntityName(e){return t.isIdentifier(e)?v(e):T({type:"MemberExpression",computed:!1,optional:!1,object:this.convertEntityName(e.left),property:v(e.right)},e)}convertPropertyAccess(e){if(!t.isIdentifier(e.expression)&&!t.isPropertyAccessExpression(e.expression))throw new g(e.expression);if(t.isPrivateIdentifier(e.name))throw new g(e.name);let r=t.isIdentifier(e.expression)?v(e.expression):this.convertPropertyAccess(e.expression);return T({type:"MemberExpression",computed:!1,optional:!1,object:r,property:v(e.name)},e)}convertComputedPropertyName(e){if(!e.name||!t.isComputedPropertyName(e.name))return;const{expression:r}=e.name;if(!(t.isLiteralExpression(r)||t.isPrefixUnaryExpression(r))){if(t.isIdentifier(r))return this.pushReference(v(r));if(t.isPropertyAccessExpression(r))return this.pushReference(this.convertPropertyAccess(r));throw new g(r)}}convertParametersAndType(e){this.convertComputedPropertyName(e);const r=this.convertTypeParameters(e.typeParameters);for(const i of e.parameters)this.convertTypeNode(i.type);this.convertTypeNode(e.type),this.popScope(r)}convertHeritageClauses(e){for(const r of e.heritageClauses||[])for(const i of r.types)this.pushReference(I(i.expression)),this.convertTypeArguments(i)}convertTypeArguments(e){if(e.typeArguments)for(const r of e.typeArguments)this.convertTypeNode(r)}convertMembers(e){for(const r of e){if(t.isPropertyDeclaration(r)||t.isPropertySignature(r)||t.isIndexSignatureDeclaration(r)){t.isPropertyDeclaration(r)&&r.initializer&&t.isPropertyAccessExpression(r.initializer)&&this.pushReference(this.convertPropertyAccess(r.initializer)),this.convertComputedPropertyName(r),this.convertTypeNode(r.type);continue}if(t.isMethodDeclaration(r)||t.isMethodSignature(r)||t.isConstructorDeclaration(r)||t.isConstructSignatureDeclaration(r)||t.isCallSignatureDeclaration(r)||t.isGetAccessorDeclaration(r)||t.isSetAccessorDeclaration(r))this.convertParametersAndType(r);else throw new g(r)}}convertTypeParameters(e){if(!e)return 0;for(const r of e)this.convertTypeNode(r.constraint),this.convertTypeNode(r.default),this.pushScope(),this.pushTypeVariable(r.name);return e.length}convertTypeNode(e){if(e&&!ge.has(e.kind)){if(t.isTypeReferenceNode(e)){this.pushReference(this.convertEntityName(e.typeName)),this.convertTypeArguments(e);return}if(t.isTypeLiteralNode(e))return this.convertMembers(e.members);if(t.isArrayTypeNode(e))return this.convertTypeNode(e.elementType);if(t.isTupleTypeNode(e)){for(const r of e.elements)this.convertTypeNode(r);return}if(t.isNamedTupleMember(e)||t.isParenthesizedTypeNode(e)||t.isTypeOperatorNode(e)||t.isTypePredicateNode(e))return this.convertTypeNode(e.type);if(t.isUnionTypeNode(e)||t.isIntersectionTypeNode(e)){for(const r of e.types)this.convertTypeNode(r);return}if(t.isMappedTypeNode(e)){const{typeParameter:r,type:i,nameType:s}=e;this.convertTypeNode(r.constraint),this.pushScope(),this.pushTypeVariable(r.name),this.convertTypeNode(i),s&&this.convertTypeNode(s),this.popScope();return}if(t.isConditionalTypeNode(e)){this.convertTypeNode(e.checkType),this.pushScope(),this.convertTypeNode(e.extendsType),this.convertTypeNode(e.trueType),this.convertTypeNode(e.falseType),this.popScope();return}if(t.isIndexedAccessTypeNode(e)){this.convertTypeNode(e.objectType),this.convertTypeNode(e.indexType);return}if(t.isFunctionOrConstructorTypeNode(e)){this.convertParametersAndType(e);return}if(t.isTypeQueryNode(e)){this.pushReference(this.convertEntityName(e.exprName));return}if(t.isRestTypeNode(e)){this.convertTypeNode(e.type);return}if(t.isOptionalTypeNode(e)){this.convertTypeNode(e.type);return}if(t.isTemplateLiteralTypeNode(e)){for(const r of e.templateSpans)this.convertTypeNode(r.type);return}if(t.isInferTypeNode(e)){const{typeParameter:r}=e;this.convertTypeNode(r.constraint),this.pushTypeVariable(r.name);return}else throw new g(e)}}convertNamespace(e,r=!1){if(this.pushScope(),r&&e.body&&t.isModuleDeclaration(e.body)){this.convertNamespace(e.body,!0);return}if(!e.body||!t.isModuleBlock(e.body))throw new g(e,'namespace must have a "ModuleBlock" body.');const{statements:i}=e.body;for(const s of i){if(t.isEnumDeclaration(s)||t.isFunctionDeclaration(s)||t.isClassDeclaration(s)||t.isInterfaceDeclaration(s)||t.isTypeAliasDeclaration(s)||t.isModuleDeclaration(s)){if(s.name&&t.isIdentifier(s.name))this.pushTypeVariable(s.name);else throw new g(s,"non-Identifier name not supported");continue}if(t.isVariableStatement(s)){for(const o of s.declarationList.declarations)if(t.isIdentifier(o.name))this.pushTypeVariable(o.name);else throw new g(o,"non-Identifier name not supported");continue}if(!t.isExportDeclaration(s))throw new g(s,"namespace child (hoisting) not supported yet")}for(const s of i){if(t.isVariableStatement(s)){for(const o of s.declarationList.declarations)o.type&&this.convertTypeNode(o.type);continue}if(t.isFunctionDeclaration(s)){this.convertParametersAndType(s);continue}if(t.isInterfaceDeclaration(s)||t.isClassDeclaration(s)){const o=this.convertTypeParameters(s.typeParameters);this.convertHeritageClauses(s),this.convertMembers(s.members),this.popScope(o);continue}if(t.isTypeAliasDeclaration(s)){const o=this.convertTypeParameters(s.typeParameters);this.convertTypeNode(s.type),this.popScope(o);continue}if(t.isModuleDeclaration(s)){this.convertNamespace(s,r);continue}if(!t.isEnumDeclaration(s))if(t.isExportDeclaration(s)){if(s.exportClause){if(t.isNamespaceExport(s.exportClause))throw new g(s.exportClause);for(const o of s.exportClause.elements){const m=o.propertyName||o.name;this.pushIdentifierReference(m)}}}else throw new g(s,"namespace child (walking) not supported yet")}this.popScope()}}function xe({sourceFile:n}){return new Se(n).transform()}class Se{constructor(e){this.sourceFile=e,this.declarations=new Map,this.ast=pe(e);for(const r of e.statements)this.convertStatement(r)}transform(){return{ast:this.ast}}pushStatement(e){this.ast.body.push(e)}createDeclaration(e,r){const i={start:e.getFullStart(),end:e.getEnd()};if(!r){const p=new H({range:i});return this.pushStatement(p.iife),p}const s=r.getText(),o=new H({id:r,range:i}),m=this.declarations.get(s);if(m){m.pushIdentifierReference(r),m.declaration.end=i.end;let p=this.ast.body.findIndex(c=>c==m.declaration);for(let c=p+1;c<this.ast.body.length;c++){const f=this.ast.body[c];f.start=f.end=i.end}}else this.pushStatement(o.declaration),this.declarations.set(s,o);return m||o}convertStatement(e){if(t.isEnumDeclaration(e))return this.convertEnumDeclaration(e);if(t.isFunctionDeclaration(e))return this.convertFunctionDeclaration(e);if(t.isInterfaceDeclaration(e)||t.isClassDeclaration(e))return this.convertClassOrInterfaceDeclaration(e);if(t.isTypeAliasDeclaration(e))return this.convertTypeAliasDeclaration(e);if(t.isVariableStatement(e))return this.convertVariableStatement(e);if(t.isExportDeclaration(e)||t.isExportAssignment(e))return this.convertExportDeclaration(e);if(t.isModuleDeclaration(e))return this.convertNamespaceDeclaration(e);if(e.kind==t.SyntaxKind.NamespaceExportDeclaration)return this.removeStatement(e);if(t.isImportDeclaration(e)||t.isImportEqualsDeclaration(e))return this.convertImportDeclaration(e);throw new g(e)}removeStatement(e){this.pushStatement(T({type:"ExpressionStatement",expression:{type:"Literal",value:"pls remove me"}},e))}convertNamespaceDeclaration(e){if(e.flags&t.NodeFlags.GlobalAugmentation||!t.isIdentifier(e.name)){this.createDeclaration(e).convertNamespace(e,!0);return}const i=this.createDeclaration(e,e.name);i.pushIdentifierReference(e.name),i.convertNamespace(e)}convertEnumDeclaration(e){this.createDeclaration(e,e.name).pushIdentifierReference(e.name)}convertFunctionDeclaration(e){if(!e.name)throw new g(e,"FunctionDeclaration should have a name");const r=this.createDeclaration(e,e.name);r.pushIdentifierReference(e.name),r.convertParametersAndType(e)}convertClassOrInterfaceDeclaration(e){if(!e.name)throw new g(e,"ClassDeclaration / InterfaceDeclaration should have a name");const r=this.createDeclaration(e,e.name),i=r.convertTypeParameters(e.typeParameters);r.convertHeritageClauses(e),r.convertMembers(e.members),r.popScope(i)}convertTypeAliasDeclaration(e){const r=this.createDeclaration(e,e.name),i=r.convertTypeParameters(e.typeParameters);r.convertTypeNode(e.type),r.popScope(i)}convertVariableStatement(e){const{declarations:r}=e.declarationList;if(r.length!==1)throw new g(e,"VariableStatement with more than one declaration not yet supported");for(const i of r){if(!t.isIdentifier(i.name))throw new g(e,"VariableDeclaration must have a name");this.createDeclaration(e,i.name).convertTypeNode(i.type)}}convertExportDeclaration(e){if(t.isExportAssignment(e)){this.pushStatement(T({type:"ExportDefaultDeclaration",declaration:I(e.expression)},e));return}const r=e.moduleSpecifier?I(e.moduleSpecifier):void 0;if(!e.exportClause)this.pushStatement(T({type:"ExportAllDeclaration",source:r,exported:null},e));else if(t.isNamespaceExport(e.exportClause))this.pushStatement(T({type:"ExportAllDeclaration",source:r,exported:v(e.exportClause.name)},e));else{const i=[];for(const s of e.exportClause.elements)i.push(this.convertExportSpecifier(s));this.pushStatement(T({type:"ExportNamedDeclaration",declaration:null,specifiers:i,source:r},e))}}convertImportDeclaration(e){if(t.isImportEqualsDeclaration(e)){if(!t.isExternalModuleReference(e.moduleReference))throw new g(e,"ImportEquals should have a literal source.");this.pushStatement(T({type:"ImportDeclaration",specifiers:[{type:"ImportDefaultSpecifier",local:v(e.name)}],source:I(e.moduleReference.expression)},e));return}const r=I(e.moduleSpecifier),i=e.importClause&&e.importClause.namedBindings?this.convertNamedImportBindings(e.importClause.namedBindings):[];e.importClause&&e.importClause.name&&i.push({type:"ImportDefaultSpecifier",local:v(e.importClause.name)}),this.pushStatement(T({type:"ImportDeclaration",specifiers:i,source:r},e))}convertNamedImportBindings(e){return t.isNamedImports(e)?e.elements.map(r=>{const i=v(r.name),s=r.propertyName?v(r.propertyName):i;return{type:"ImportSpecifier",local:i,imported:s}}):[{type:"ImportNamespaceSpecifier",local:v(e.name)}]}convertExportSpecifier(e){const r=v(e.name);return{type:"ExportSpecifier",exported:r,local:e.propertyName?v(e.propertyName):r}}}function k(n,e){return t.createSourceFile(n,e,t.ScriptTarget.Latest,!0)}const Te=()=>{const n=new Map,e=new Map;return{name:"dts-transform",options(r){const{onwarn:i}=r;return{...r,onwarn(s,o){s.code!="CIRCULAR_DEPENDENCY"&&(i?i(s,o):o(s))},treeshake:{moduleSideEffects:"no-external",propertyReadSideEffects:!0,unknownGlobalSideEffects:!1}}},outputOptions(r){return{...r,chunkFileNames:r.chunkFileNames||"[name]-[hash].d.ts",entryFileNames:r.entryFileNames||"[name].d.ts",format:"es",exports:"named",compact:!1,freeze:!0,interop:"esModule",generatedCode:Object.assign({symbols:!1},r.generatedCode),strict:!1}},transform(r,i){let s=k(i,r);const o=ye({sourceFile:s});n.set(s.fileName,o.typeReferences),e.set(s.fileName,o.fileReferences),r=o.code.toString(),s=k(i,r);const m=xe({sourceFile:s});return process.env.DTS_DUMP_AST&&(console.log(i),console.log(r),console.log(JSON.stringify(m.ast.body,void 0,2))),{code:r,ast:m.ast,map:o.code.generateMap()}},renderChunk(r,i,s){const o=k(i.fileName,r),m=new le(o),p=new Set,c=new Set;for(const f of Object.keys(i.modules)){for(const l of n.get(f.split("\\").join("/"))||[])p.add(l);for(const l of e.get(f.split("\\").join("/"))||[])if(l.startsWith(".")){const d=x.join(x.dirname(f),l),D=s.file&&x.dirname(s.file)||i.facadeModuleId&&x.dirname(i.facadeModuleId)||".";let N=x.relative(D,d).split("\\").join("/");N[0]!=="."&&(N="./"+N),c.add(N)}else c.add(l)}return r=G(Array.from(c,f=>`/// <reference path="${f}" />`)),r+=G(Array.from(p,f=>`/// <reference types="${f}" />`)),r+=m.fix(),r||(r+=`
export { }`),{code:r,map:{mappings:""}}}}};function G(n){return n.length?n.join(`
`)+`
`:""}const J=/\.([cm]ts|[tj]sx?)$/,ve=(n={})=>{const e=Te(),{respectExternal:r=!1,compilerOptions:i={},tsconfig:s}=n;let o=[];function m(p){let c,f;return!o.length&&p.endsWith(L)?c=!0:(f=o.find(l=>c=l.getSourceFile(p)),!f&&t.sys.fileExists(p)&&(o.push(f=ie(p,i,s)),c=f.getSourceFile(p))),{source:c,program:f}}return{name:"dts",options(p){let{input:c=[]}=p;if(!Array.isArray(c))c=typeof c=="string"?[c]:Object.values(c);else if(c.length>1){p.input={};for(const f of c){let l=f.replace(/((\.d)?\.(t|j)sx?)$/,"");x.isAbsolute(f)?l=x.basename(l):l=x.normalize(l),p.input[l]=f}}return o=se(Object.values(c),i,s),e.options.call(this,p)},outputOptions:e.outputOptions,transform(p,c){const f=(u,y)=>(typeof u=="object"&&(p=u.getFullText()),e.transform.call(this,p,y));if(!J.test(c))return null;if(c.endsWith(L)){const{source:u}=m(c);return u?f(u,c):null}const l=c.replace(J,L);let d=m(l);if(d.source)return f(d.source,l);if(d=m(c),typeof d.source!="object"||!d.program)return null;let D;const{emitSkipped:N,diagnostics:a}=d.program.emit(d.source,(u,y)=>{p=y,D=f(!0,l)},void 0,!0);if(N){const u=a.filter(y=>y.category===t.DiagnosticCategory.Error);u.length&&(console.error(t.formatDiagnostics(u,$)),this.error("Failed to compile. Check the logs above."))}return D},resolveId(p,c){if(!c)return;c=c.split("\\").join("/");let f=i;if(s){const d=p.startsWith(".")?x.resolve(x.dirname(c),p):p;f=O(d,i,s).compilerOptions}const{resolvedModule:l}=t.nodeModuleNameResolver(p,c,f,t.sys);if(l)return!r&&l.isExternalLibraryImport?{id:p,external:!0}:{id:x.resolve(l.resolvedFileName)}},renderChunk:e.renderChunk}};exports.default=ve;
