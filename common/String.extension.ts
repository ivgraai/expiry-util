// type.d.ts
/* declare interface String {
    capitalize(): string;
    toCamelCase(): string;
} */

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toCamelCase = function() {
  return this.toLowerCase().replace(/(\s|^)(.)/g, function($1) { return $1.toUpperCase(); });
}
