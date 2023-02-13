"use strict";var W=require("module"),G=require("path"),J=require("magic-string");function Y(i){return i&&typeof i=="object"&&"default"in i?i:{default:i}}function Q(i){if(i&&i.__esModule)return i;var e=Object.create(null);return i&&Object.keys(i).forEach(function(r){if(r!=="default"){var n=Object.getOwnPropertyDescriptor(i,r);Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:function(){return i[r]}})}}),e.default=i,Object.freeze(e)}var T=Q(G),Z=Y(J),K=require;function X(){const i=process.cwd();try{return K.resolve("typescript",{paths:[i]})}catch{throw new Error(`Could not find \`typescript\` in ${i}`)}}var t=K(X());const A=".d.ts",M={getCurrentDirectory:()=>t.sys.getCurrentDirectory(),getNewLine:()=>t.sys.newLine,getCanonicalFileName:t.sys.useCaseSensitiveFileNames?i=>i:i=>i.toLowerCase()},ee={declaration:!0,noEmit:!1,emitDeclarationOnly:!0,noEmitOnError:!0,checkJs:!1,declarationMap:!1,skipLibCheck:!0,preserveSymlinks:!0,target:t.ScriptTarget.ESNext};function j(i,e){const r={...ee,...e};let n=T.dirname(i),s=[];const o=t.findConfigFile(n,t.sys.fileExists);if(!o)return{dtsFiles:s,dirName:n,compilerOptions:r};n=T.dirname(o);const{config:p,error:c}=t.readConfigFile(o,t.sys.readFile);if(c)return console.error(t.formatDiagnostic(c,M)),{dtsFiles:s,dirName:n,compilerOptions:r};const{fileNames:l,options:m,errors:f}=t.parseJsonConfigFileContent(p,t.sys,n);return s=l.filter(d=>d.endsWith(A)),f.length?(console.error(t.formatDiagnostics(f,M)),{dtsFiles:s,dirName:n,compilerOptions:r}):{dtsFiles:s,dirName:n,compilerOptions:{...m,...r}}}function te(i,e){const{dtsFiles:r,compilerOptions:n}=j(i,e);return t.createProgram([i].concat(Array.from(r)),n,t.createCompilerHost(n,!0))}function re(i,e){const r=[];let n=[],s=new Set,o="",p={};for(let c of i){if(c.endsWith(A))continue;c=T.resolve(c);const l=j(c,e);if(l.dtsFiles.forEach(s.add,s),!n.length){n.push(c),{dirName:o,compilerOptions:p}=l;continue}if(l.dirName===o)n.push(c);else{const m=t.createCompilerHost(p,!0),f=t.createProgram(n.concat(Array.from(s)),p,m);r.push(f),n=[c],{dirName:o,compilerOptions:p}=l}}if(n.length){const c=t.createCompilerHost(p,!0),l=t.createProgram(n.concat(Array.from(s)),p,c);r.push(l)}return r}function ne(){let i;try{return{codeFrameColumns:i}=K("@babel/code-frame"),i}catch{try{return{codeFrameColumns:i}=W.createRequire(typeof document=="undefined"?new(require("url")).URL("file:"+__filename).href:document.currentScript&&document.currentScript.src||new URL("rollup-plugin-dts-b69f795f.js",document.baseURI).href)("@babel/code-frame"),i}catch{}}}function ie(i){const e=i.getSourceFile(),r=e.getLineAndCharacterOfPosition(i.getStart()),n=e.getLineAndCharacterOfPosition(i.getEnd());return{start:{line:r.line+1,column:r.character+1},end:{line:n.line+1,column:n.character+1}}}function se(i){const e=ne(),n=i.getSourceFile().getFullText(),s=ie(i);return e?`
`+e(n,s,{highlightCode:!0}):`
${s.start.line}:${s.start.column}: \`${i.getFullText().trim()}\``}class h extends Error{constructor(e,r="Syntax not yet supported"){super(`${r}
${se(e)}`)}}class ae{constructor(e){this.sourceFile=e}findNamespaces(){const e=[],r={};for(const n of this.sourceFile.statements){const s={start:n.getStart(),end:n.getEnd()};if(t.isEmptyStatement(n)){e.unshift({name:"",exports:[],location:s});continue}if((t.isImportDeclaration(n)||t.isExportDeclaration(n))&&n.moduleSpecifier&&t.isStringLiteral(n.moduleSpecifier)){let{text:f}=n.moduleSpecifier;if(f.startsWith(".")&&(f.endsWith(".d.ts")||f.endsWith(".d.cts")||f.endsWith(".d.mts"))){let d=n.moduleSpecifier.getStart()+1,b=n.moduleSpecifier.getEnd()-1;e.unshift({name:"",exports:[],location:{start:d,end:b},textBeforeCodeAfter:f.replace(/\.d\.ts$/,".js").replace(/\.d\.cts$/,".cjs").replace(/\.d\.mts$/,".mjs")})}}if(t.isModuleDeclaration(n)&&n.body&&t.isModuleBlock(n.body)){for(const f of n.body.statements)if(t.isExportDeclaration(f)&&f.exportClause){if(t.isNamespaceExport(f.exportClause))continue;for(const d of f.exportClause.elements)d.propertyName&&d.propertyName.getText()==d.name.getText()&&e.unshift({name:"",exports:[],location:{start:d.propertyName.getEnd(),end:d.name.getEnd()}})}}if(t.isClassDeclaration(n)?r[n.name.getText()]={type:"class",generics:n.typeParameters}:t.isFunctionDeclaration(n)?r[n.name.getText()]={type:"function"}:t.isInterfaceDeclaration(n)?r[n.name.getText()]={type:"interface",generics:n.typeParameters}:t.isTypeAliasDeclaration(n)?r[n.name.getText()]={type:"type",generics:n.typeParameters}:t.isModuleDeclaration(n)&&t.isIdentifier(n.name)?r[n.name.getText()]={type:"namespace"}:t.isEnumDeclaration(n)&&(r[n.name.getText()]={type:"enum"}),!t.isVariableStatement(n))continue;const{declarations:o}=n.declarationList;if(o.length!==1)continue;const p=o[0],c=p.name.getText();if(!p.initializer||!t.isCallExpression(p.initializer)){r[c]={type:"var"};continue}const l=p.initializer.arguments[0];if(!p.initializer.expression.getFullText().includes("/*#__PURE__*/Object.freeze")||!t.isObjectLiteralExpression(l))continue;const m=[];for(const f of l.properties){if(!t.isPropertyAssignment(f)||!(t.isIdentifier(f.name)||t.isStringLiteral(f.name))||f.name.text!=="__proto__"&&!t.isIdentifier(f.initializer))throw new h(f,"Expected a property assignment");f.name.text!=="__proto__"&&m.push({exportedName:f.name.text,localName:f.initializer.getText()})}e.unshift({name:c,exports:m,location:s})}return{namespaces:e,itemTypes:r}}fix(){var s;let e=this.sourceFile.getFullText();const{namespaces:r,itemTypes:n}=this.findNamespaces();for(const o of r){const p=e.slice(o.location.end);e=e.slice(0,o.location.start);for(const{exportedName:c,localName:l}of o.exports)if(c===l){const{type:m,generics:f}=n[l]||{};if(m==="interface"||m==="type"){const d=O(f);e+=`type ${o.name}_${c}${d.in} = ${l}${d.out};
`}else if(m==="enum"||m==="class"){const d=O(f);e+=`type ${o.name}_${c}${d.in} = ${l}${d.out};
`,e+=`declare const ${o.name}_${c}: typeof ${l};
`}else e+=`declare const ${o.name}_${c}: typeof ${l};
`}if(o.name){e+=`declare namespace ${o.name} {
`,e+=`  export {
`;for(const{exportedName:c,localName:l}of o.exports)c===l?e+=`    ${o.name}_${c} as ${c},
`:e+=`    ${l} as ${c},
`;e+=`  };
`,e+="}"}e+=(s=o.textBeforeCodeAfter)!=null?s:"",e+=p}return e}}function O(i){return!i||!i.length?{in:"",out:""}:{in:`<${i.map(e=>e.getText()).join(", ")}>`,out:`<${i.map(e=>e.name.getText()).join(", ")}>`}}let _=1;function oe(i){return S({type:"Program",sourceType:"module",body:[]},{start:i.getFullStart(),end:i.getEnd()})}function ce(i){const e={type:"Identifier",name:String(_++)};return{ident:e,expr:{type:"AssignmentPattern",left:e,right:i}}}function v(i){return S({type:"Identifier",name:i.getText()},i)}function le(i){const e=S({type:"FunctionExpression",id:null,params:[],body:{type:"BlockStatement",body:[]}},i),r=S({type:"ExpressionStatement",expression:{type:"CallExpression",callee:{type:"Identifier",name:String(_++)},arguments:[e],optional:!1}},i);return{fn:e,iife:r}}function pe(){const i={type:"ArrayExpression",elements:[]};return{expr:i,stmt:{type:"ReturnStatement",argument:i}}}function fe(i,e){return S({type:"FunctionDeclaration",id:S({type:"Identifier",name:t.idText(i)},i),params:[],body:{type:"BlockStatement",body:[]}},e)}function I(i){if(t.isLiteralExpression(i))return{type:"Literal",value:i.text};if(t.isPropertyAccessExpression(i)){if(t.isPrivateIdentifier(i.name))throw new h(i.name);return S({type:"MemberExpression",computed:!1,optional:!1,object:I(i.expression),property:I(i.name)},{start:i.expression.getStart(),end:i.name.getEnd()})}if(t.isIdentifier(i))return v(i);if(i.kind==t.SyntaxKind.NullKeyword)return{type:"Literal",value:null};throw new h(i)}function S(i,e){let r="start"in e?e:{start:e.getStart(),end:e.getEnd()};return Object.assign(i,r)}function L(i,e){return(t.getCombinedModifierFlags(i)&e)===e}function ue({sourceFile:i}){const e=new Z.default(i.getFullText()),r=new Set,n=new Set;let s="";const o=new Map,p=new Map;for(const a of i.statements){if(t.isEmptyStatement(a)){e.remove(a.getStart(),a.getEnd());continue}if(t.isEnumDeclaration(a)||t.isFunctionDeclaration(a)||t.isInterfaceDeclaration(a)||t.isClassDeclaration(a)||t.isTypeAliasDeclaration(a)||t.isModuleDeclaration(a)){if(a.name){const u=a.name.getText();r.add(u),L(a,t.ModifierFlags.ExportDefault)?s=u:L(a,t.ModifierFlags.Export)&&n.add(u),a.flags&t.NodeFlags.GlobalAugmentation||N(u,[R(a),z(a)])}t.isModuleDeclaration(a)&&me(e,a),V(e,a)}else if(t.isVariableStatement(a)){const{declarations:u}=a.declarationList,g=L(a,t.ModifierFlags.Export);for(const x of a.declarationList.declarations)if(t.isIdentifier(x.name)){const D=x.name.getText();r.add(D),g&&n.add(D)}if(V(e,a),u.length==1){const x=u[0];t.isIdentifier(x.name)&&N(x.name.getText(),[R(a),z(a)])}else{const x=u.slice(),D=x.shift();N(D.name.getText(),[R(a),D.getEnd()]);for(const C of x)t.isIdentifier(C.name)&&N(C.name.getText(),[C.getFullStart(),C.getEnd()])}const{flags:y}=a.declarationList,P=`declare ${y&t.NodeFlags.Let?"let":y&t.NodeFlags.Const?"const":"var"} `,F=a.declarationList.getChildren().find(x=>x.kind===t.SyntaxKind.SyntaxList).getChildren();let E=0;for(const x of F)if(x.kind===t.SyntaxKind.CommaToken)E=x.getStart(),e.remove(E,x.getEnd());else if(E){e.appendLeft(E,`;
`);const D=x.getFullStart(),C=e.slice(D,x.getStart());let k=C.length-C.trimStart().length;k?e.overwrite(D,D+k,P):e.appendLeft(D,P)}}}for(const a of i.statements)if(f(a),!!L(a,t.ModifierFlags.ExportDefault)&&(t.isFunctionDeclaration(a)||t.isClassDeclaration(a))){if(a.name)continue;s||(s=b("export_default"));const u=a.getChildren(),g=u.findIndex(F=>F.kind===t.SyntaxKind.ClassKeyword||F.kind===t.SyntaxKind.FunctionKeyword),y=u[g],w=u[g+1];w.kind>=t.SyntaxKind.FirstPunctuation&&w.kind<=t.SyntaxKind.LastPunctuation?e.appendLeft(w.getStart(),s):e.appendRight(y.getEnd(),` ${s}`)}for(const a of p.values()){const g=a.pop()[0];for(const y of a)e.move(y[0],y[1],g)}s&&e.append(`
export default ${s};
`),n.size&&e.append(`
export { ${[...n].join(", ")} };
`);for(const[a,u]of o.entries())e.prepend(`import * as ${u} from "${a}";
`);const c=i.getLineStarts(),l=new Set;for(const a of i.typeReferenceDirectives){l.add(a.fileName);const{line:u}=i.getLineAndCharacterOfPosition(a.pos),g=c[u];let y=i.getLineEndOfPosition(a.pos);e.slice(y,y+1)==`
`&&(y+=1),e.remove(g,y)}const m=new Set;for(const a of i.referencedFiles){m.add(a.fileName);const{line:u}=i.getLineAndCharacterOfPosition(a.pos),g=c[u];let y=i.getLineEndOfPosition(a.pos);e.slice(y,y+1)==`
`&&(y+=1),e.remove(g,y)}return{code:e,typeReferences:l,fileReferences:m};function f(a){if(t.forEachChild(a,f),t.isImportTypeNode(a)){if(!t.isLiteralTypeNode(a.argument)||!t.isStringLiteral(a.argument.literal))throw new h(a,"inline imports should have a literal argument");const u=a.argument.literal.text,g=a.getChildren(),y=g.find(E=>E.kind===t.SyntaxKind.ImportKeyword).getStart();let w=a.getEnd();const P=g.find(E=>E.kind===t.SyntaxKind.DotToken||E.kind===t.SyntaxKind.LessThanToken);P&&(w=P.getStart());const F=d(u);e.overwrite(y,w,F)}}function d(a){let u=o.get(a);return u||(u=b(a.replace(/[^a-zA-Z0-9_$]/g,()=>"_")),o.set(a,u)),u}function b(a){let u=a;for(;r.has(u);)u=`_${u}`;return r.add(u),u}function N(a,u){let g=p.get(a);if(!g)g=[u],p.set(a,g);else{const y=g[g.length-1];y[1]===u[0]?y[1]=u[1]:g.push(u)}}}function V(i,e){var s;let r=!1;const n=t.isClassDeclaration(e)||t.isFunctionDeclaration(e)||t.isModuleDeclaration(e)||t.isVariableStatement(e);for(const o of(s=e.modifiers)!=null?s:[])switch(o.kind){case t.SyntaxKind.ExportKeyword:case t.SyntaxKind.DefaultKeyword:i.remove(o.getStart(),o.getEnd()+1);break;case t.SyntaxKind.DeclareKeyword:r=!0}n&&!r&&i.appendRight(e.getStart(),"declare ")}function me(i,e){if(!(!e.body||!t.isModuleBlock(e.body))){for(const r of e.body.statements)if(t.isExportDeclaration(r)&&r.exportClause){if(t.isNamespaceExport(r.exportClause))continue;for(const n of r.exportClause.elements)n.propertyName||i.appendLeft(n.name.getEnd(),` as ${n.name.getText()}`)}}}function R(i){const e=i.getFullStart();return e+(q(i,e)?1:0)}function z(i){const e=i.getEnd();return e+(q(i,e)?1:0)}function q(i,e){return i.getSourceFile().getFullText()[e]==`
`}const de=new Set([t.SyntaxKind.LiteralType,t.SyntaxKind.VoidKeyword,t.SyntaxKind.UnknownKeyword,t.SyntaxKind.AnyKeyword,t.SyntaxKind.BooleanKeyword,t.SyntaxKind.NumberKeyword,t.SyntaxKind.StringKeyword,t.SyntaxKind.ObjectKeyword,t.SyntaxKind.NullKeyword,t.SyntaxKind.UndefinedKeyword,t.SyntaxKind.SymbolKeyword,t.SyntaxKind.NeverKeyword,t.SyntaxKind.ThisKeyword,t.SyntaxKind.ThisType,t.SyntaxKind.BigIntKeyword]);class U{constructor({id:e,range:r}){if(this.scopes=[],e)this.declaration=fe(e,r);else{const{iife:s,fn:o}=le(r);this.iife=s,this.declaration=o}const n=pe();this.declaration.body.body.push(n.stmt),this.returnExpr=n.expr}pushScope(){this.scopes.push(new Set)}popScope(e=1){for(let r=0;r<e;r++)this.scopes.pop()}pushTypeVariable(e){var n;const r=e.getText();(n=this.scopes[this.scopes.length-1])==null||n.add(r)}pushReference(e){let r;if(e.type==="Identifier"?r=e.name:e.type==="MemberExpression"&&e.object.type==="Identifier"&&(r=e.object.name),r){for(const o of this.scopes)if(o.has(r))return}const{ident:n,expr:s}=ce(e);this.declaration.params.push(s),this.returnExpr.elements.push(n)}pushIdentifierReference(e){this.pushReference(v(e))}convertEntityName(e){return t.isIdentifier(e)?v(e):S({type:"MemberExpression",computed:!1,optional:!1,object:this.convertEntityName(e.left),property:v(e.right)},e)}convertPropertyAccess(e){if(!t.isIdentifier(e.expression)&&!t.isPropertyAccessExpression(e.expression))throw new h(e.expression);if(t.isPrivateIdentifier(e.name))throw new h(e.name);let r=t.isIdentifier(e.expression)?v(e.expression):this.convertPropertyAccess(e.expression);return S({type:"MemberExpression",computed:!1,optional:!1,object:r,property:v(e.name)},e)}convertComputedPropertyName(e){if(!e.name||!t.isComputedPropertyName(e.name))return;const{expression:r}=e.name;if(!(t.isLiteralExpression(r)||t.isPrefixUnaryExpression(r))){if(t.isIdentifier(r))return this.pushReference(v(r));if(t.isPropertyAccessExpression(r))return this.pushReference(this.convertPropertyAccess(r));throw new h(r)}}convertParametersAndType(e){this.convertComputedPropertyName(e);const r=this.convertTypeParameters(e.typeParameters);for(const n of e.parameters)this.convertTypeNode(n.type);this.convertTypeNode(e.type),this.popScope(r)}convertHeritageClauses(e){for(const r of e.heritageClauses||[])for(const n of r.types)this.pushReference(I(n.expression)),this.convertTypeArguments(n)}convertTypeArguments(e){if(!!e.typeArguments)for(const r of e.typeArguments)this.convertTypeNode(r)}convertMembers(e){for(const r of e){if(t.isPropertyDeclaration(r)||t.isPropertySignature(r)||t.isIndexSignatureDeclaration(r)){t.isPropertyDeclaration(r)&&r.initializer&&t.isPropertyAccessExpression(r.initializer)&&this.pushReference(this.convertPropertyAccess(r.initializer)),this.convertComputedPropertyName(r),this.convertTypeNode(r.type);continue}if(t.isMethodDeclaration(r)||t.isMethodSignature(r)||t.isConstructorDeclaration(r)||t.isConstructSignatureDeclaration(r)||t.isCallSignatureDeclaration(r)||t.isGetAccessorDeclaration(r)||t.isSetAccessorDeclaration(r))this.convertParametersAndType(r);else throw new h(r)}}convertTypeParameters(e){if(!e)return 0;for(const r of e)this.convertTypeNode(r.constraint),this.convertTypeNode(r.default),this.pushScope(),this.pushTypeVariable(r.name);return e.length}convertTypeNode(e){if(!!e&&!de.has(e.kind)){if(t.isTypeReferenceNode(e)){this.pushReference(this.convertEntityName(e.typeName)),this.convertTypeArguments(e);return}if(t.isTypeLiteralNode(e))return this.convertMembers(e.members);if(t.isArrayTypeNode(e))return this.convertTypeNode(e.elementType);if(t.isTupleTypeNode(e)){for(const r of e.elements)this.convertTypeNode(r);return}if(t.isNamedTupleMember(e)||t.isParenthesizedTypeNode(e)||t.isTypeOperatorNode(e)||t.isTypePredicateNode(e))return this.convertTypeNode(e.type);if(t.isUnionTypeNode(e)||t.isIntersectionTypeNode(e)){for(const r of e.types)this.convertTypeNode(r);return}if(t.isMappedTypeNode(e)){const{typeParameter:r,type:n,nameType:s}=e;this.convertTypeNode(r.constraint),this.pushScope(),this.pushTypeVariable(r.name),this.convertTypeNode(n),s&&this.convertTypeNode(s),this.popScope();return}if(t.isConditionalTypeNode(e)){this.convertTypeNode(e.checkType),this.pushScope(),this.convertTypeNode(e.extendsType),this.convertTypeNode(e.trueType),this.convertTypeNode(e.falseType),this.popScope();return}if(t.isIndexedAccessTypeNode(e)){this.convertTypeNode(e.objectType),this.convertTypeNode(e.indexType);return}if(t.isFunctionOrConstructorTypeNode(e)){this.convertParametersAndType(e);return}if(t.isTypeQueryNode(e)){this.pushReference(this.convertEntityName(e.exprName));return}if(t.isRestTypeNode(e)){this.convertTypeNode(e.type);return}if(t.isOptionalTypeNode(e)){this.convertTypeNode(e.type);return}if(t.isTemplateLiteralTypeNode(e)){for(const r of e.templateSpans)this.convertTypeNode(r.type);return}if(t.isInferTypeNode(e)){const{typeParameter:r}=e;this.convertTypeNode(r.constraint),this.pushTypeVariable(r.name);return}else throw new h(e)}}convertNamespace(e,r=!1){if(this.pushScope(),r&&e.body&&t.isModuleDeclaration(e.body)){this.convertNamespace(e.body,!0);return}if(!e.body||!t.isModuleBlock(e.body))throw new h(e,'namespace must have a "ModuleBlock" body.');const{statements:n}=e.body;for(const s of n){if(t.isEnumDeclaration(s)||t.isFunctionDeclaration(s)||t.isClassDeclaration(s)||t.isInterfaceDeclaration(s)||t.isTypeAliasDeclaration(s)||t.isModuleDeclaration(s)){if(s.name&&t.isIdentifier(s.name))this.pushTypeVariable(s.name);else throw new h(s,"non-Identifier name not supported");continue}if(t.isVariableStatement(s)){for(const o of s.declarationList.declarations)if(t.isIdentifier(o.name))this.pushTypeVariable(o.name);else throw new h(o,"non-Identifier name not supported");continue}if(!t.isExportDeclaration(s))throw new h(s,"namespace child (hoisting) not supported yet")}for(const s of n){if(t.isVariableStatement(s)){for(const o of s.declarationList.declarations)o.type&&this.convertTypeNode(o.type);continue}if(t.isFunctionDeclaration(s)){this.convertParametersAndType(s);continue}if(t.isInterfaceDeclaration(s)||t.isClassDeclaration(s)){const o=this.convertTypeParameters(s.typeParameters);this.convertHeritageClauses(s),this.convertMembers(s.members),this.popScope(o);continue}if(t.isTypeAliasDeclaration(s)){const o=this.convertTypeParameters(s.typeParameters);this.convertTypeNode(s.type),this.popScope(o);continue}if(t.isModuleDeclaration(s)){this.convertNamespace(s,r);continue}if(!t.isEnumDeclaration(s))if(t.isExportDeclaration(s)){if(s.exportClause){if(t.isNamespaceExport(s.exportClause))throw new h(s.exportClause);for(const o of s.exportClause.elements){const p=o.propertyName||o.name;this.pushIdentifierReference(p)}}}else throw new h(s,"namespace child (walking) not supported yet")}this.popScope()}}function ye({sourceFile:i}){return new he(i).transform()}class he{constructor(e){this.sourceFile=e,this.declarations=new Map,this.ast=oe(e);for(const r of e.statements)this.convertStatement(r)}transform(){return{ast:this.ast}}pushStatement(e){this.ast.body.push(e)}createDeclaration(e,r){const n={start:e.getFullStart(),end:e.getEnd()};if(!r){const c=new U({range:n});return this.pushStatement(c.iife),c}const s=r.getText(),o=new U({id:r,range:n}),p=this.declarations.get(s);if(p){p.pushIdentifierReference(r),p.declaration.end=n.end;let c=this.ast.body.findIndex(l=>l==p.declaration);for(let l=c+1;l<this.ast.body.length;l++){const m=this.ast.body[l];m.start=m.end=n.end}}else this.pushStatement(o.declaration),this.declarations.set(s,o);return p||o}convertStatement(e){if(t.isEnumDeclaration(e))return this.convertEnumDeclaration(e);if(t.isFunctionDeclaration(e))return this.convertFunctionDeclaration(e);if(t.isInterfaceDeclaration(e)||t.isClassDeclaration(e))return this.convertClassOrInterfaceDeclaration(e);if(t.isTypeAliasDeclaration(e))return this.convertTypeAliasDeclaration(e);if(t.isVariableStatement(e))return this.convertVariableStatement(e);if(t.isExportDeclaration(e)||t.isExportAssignment(e))return this.convertExportDeclaration(e);if(t.isModuleDeclaration(e))return this.convertNamespaceDeclaration(e);if(e.kind==t.SyntaxKind.NamespaceExportDeclaration)return this.removeStatement(e);if(t.isImportDeclaration(e)||t.isImportEqualsDeclaration(e))return this.convertImportDeclaration(e);throw new h(e)}removeStatement(e){this.pushStatement(S({type:"ExpressionStatement",expression:{type:"Literal",value:"pls remove me"}},e))}convertNamespaceDeclaration(e){if(e.flags&t.NodeFlags.GlobalAugmentation||!t.isIdentifier(e.name)){this.createDeclaration(e).convertNamespace(e,!0);return}const n=this.createDeclaration(e,e.name);n.pushIdentifierReference(e.name),n.convertNamespace(e)}convertEnumDeclaration(e){this.createDeclaration(e,e.name).pushIdentifierReference(e.name)}convertFunctionDeclaration(e){if(!e.name)throw new h(e,"FunctionDeclaration should have a name");const r=this.createDeclaration(e,e.name);r.pushIdentifierReference(e.name),r.convertParametersAndType(e)}convertClassOrInterfaceDeclaration(e){if(!e.name)throw new h(e,"ClassDeclaration / InterfaceDeclaration should have a name");const r=this.createDeclaration(e,e.name),n=r.convertTypeParameters(e.typeParameters);r.convertHeritageClauses(e),r.convertMembers(e.members),r.popScope(n)}convertTypeAliasDeclaration(e){const r=this.createDeclaration(e,e.name),n=r.convertTypeParameters(e.typeParameters);r.convertTypeNode(e.type),r.popScope(n)}convertVariableStatement(e){const{declarations:r}=e.declarationList;if(r.length!==1)throw new h(e,"VariableStatement with more than one declaration not yet supported");for(const n of r){if(!t.isIdentifier(n.name))throw new h(e,"VariableDeclaration must have a name");this.createDeclaration(e,n.name).convertTypeNode(n.type)}}convertExportDeclaration(e){if(t.isExportAssignment(e)){this.pushStatement(S({type:"ExportDefaultDeclaration",declaration:I(e.expression)},e));return}const r=e.moduleSpecifier?I(e.moduleSpecifier):void 0;if(!e.exportClause)this.pushStatement(S({type:"ExportAllDeclaration",source:r,exported:null},e));else if(t.isNamespaceExport(e.exportClause))this.pushStatement(S({type:"ExportAllDeclaration",source:r,exported:v(e.exportClause.name)},e));else{const n=[];for(const s of e.exportClause.elements)n.push(this.convertExportSpecifier(s));this.pushStatement(S({type:"ExportNamedDeclaration",declaration:null,specifiers:n,source:r},e))}}convertImportDeclaration(e){if(t.isImportEqualsDeclaration(e)){if(!t.isExternalModuleReference(e.moduleReference))throw new h(e,"ImportEquals should have a literal source.");this.pushStatement(S({type:"ImportDeclaration",specifiers:[{type:"ImportDefaultSpecifier",local:v(e.name)}],source:I(e.moduleReference.expression)},e));return}const r=I(e.moduleSpecifier),n=e.importClause&&e.importClause.namedBindings?this.convertNamedImportBindings(e.importClause.namedBindings):[];e.importClause&&e.importClause.name&&n.push({type:"ImportDefaultSpecifier",local:v(e.importClause.name)}),this.pushStatement(S({type:"ImportDeclaration",specifiers:n,source:r},e))}convertNamedImportBindings(e){return t.isNamedImports(e)?e.elements.map(r=>{const n=v(r.name),s=r.propertyName?v(r.propertyName):n;return{type:"ImportSpecifier",local:n,imported:s}}):[{type:"ImportNamespaceSpecifier",local:v(e.name)}]}convertExportSpecifier(e){const r=v(e.name);return{type:"ExportSpecifier",exported:r,local:e.propertyName?v(e.propertyName):r}}}function $(i,e){return t.createSourceFile(i,e,t.ScriptTarget.Latest,!0)}const ge=()=>{const i=new Map,e=new Map;return{name:"dts-transform",options(r){const{onwarn:n}=r;return{...r,onwarn(s,o){s.code!="CIRCULAR_DEPENDENCY"&&(n?n(s,o):o(s))},treeshake:{moduleSideEffects:"no-external",propertyReadSideEffects:!0,unknownGlobalSideEffects:!1}}},outputOptions(r){return{...r,chunkFileNames:r.chunkFileNames||"[name]-[hash].d.ts",entryFileNames:r.entryFileNames||"[name].d.ts",format:"es",exports:"named",compact:!1,freeze:!0,interop:"esModule",generatedCode:Object.assign({symbols:!1},r.generatedCode),strict:!1}},transform(r,n){let s=$(n,r);const o=ue({sourceFile:s});i.set(s.fileName,o.typeReferences),e.set(s.fileName,o.fileReferences),r=o.code.toString(),s=$(n,r);const p=ye({sourceFile:s});return process.env.DTS_DUMP_AST&&(console.log(n),console.log(r),console.log(JSON.stringify(p.ast.body,void 0,2))),{code:r,ast:p.ast,map:o.code.generateMap()}},renderChunk(r,n,s){const o=$(n.fileName,r),p=new ae(o),c=new Set,l=new Set;for(const m of Object.keys(n.modules)){for(const f of i.get(m.split("\\").join("/"))||[])c.add(f);for(const f of e.get(m.split("\\").join("/"))||[])if(f.startsWith(".")){const d=T.join(T.dirname(m),f),b=s.file&&T.dirname(s.file)||n.facadeModuleId&&T.dirname(n.facadeModuleId)||".";let N=T.relative(b,d).split("\\").join("/");N[0]!=="."&&(N="./"+N),l.add(N)}else l.add(f)}return r=B(Array.from(l,m=>`/// <reference path="${m}" />`)),r+=B(Array.from(c,m=>`/// <reference types="${m}" />`)),r+=p.fix(),r||(r+=`
export { }`),{code:r,map:{mappings:""}}}}};function B(i){return i.length?i.join(`
`)+`
`:""}const H=/\.([cm]ts|[tj]sx?)$/,xe=(i={})=>{const e=ge(),{respectExternal:r=!1,compilerOptions:n={}}=i;let s=[];function o(p){let c,l;return!s.length&&p.endsWith(A)?c=!0:(l=s.find(m=>c=m.getSourceFile(p)),!l&&t.sys.fileExists(p)&&(s.push(l=te(p,n)),c=l.getSourceFile(p))),{source:c,program:l}}return{name:"dts",options(p){let{input:c=[]}=p;if(!Array.isArray(c))c=typeof c=="string"?[c]:Object.values(c);else if(c.length>1){p.input={};for(const l of c){let m=l.replace(/((\.d)?\.(t|j)sx?)$/,"");T.isAbsolute(l)?m=T.basename(m):m=T.normalize(m),p.input[m]=l}}return s=re(Object.values(c),n),e.options.call(this,p)},outputOptions:e.outputOptions,transform(p,c){const l=(a,u)=>(typeof a=="object"&&(p=a.getFullText()),e.transform.call(this,p,u));if(!H.test(c))return null;if(c.endsWith(A)){const{source:a}=o(c);return a?l(a,c):null}const m=c.replace(H,A);let f=o(m);if(f.source)return l(f.source,m);if(f=o(c),typeof f.source!="object"||!f.program)return null;let d;const{emitSkipped:b,diagnostics:N}=f.program.emit(f.source,(a,u)=>{p=u,d=l(!0,m)},void 0,!0);if(b){const a=N.filter(u=>u.category===t.DiagnosticCategory.Error);a.length&&(console.error(t.formatDiagnostics(a,M)),this.error("Failed to compile. Check the logs above."))}return d},resolveId(p,c){if(!c)return;c=c.split("\\").join("/");const{resolvedModule:l}=t.nodeModuleNameResolver(p,c,n,t.sys);if(!!l)return!r&&l.isExternalLibraryImport?{id:p,external:!0}:{id:T.resolve(l.resolvedFileName)}},renderChunk:e.renderChunk}};exports.default=xe;
