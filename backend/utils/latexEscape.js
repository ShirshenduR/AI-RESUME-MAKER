function latexEscape(text) {
    if (!text || typeof text !== 'string') {
        return '';
    }
    
    return text
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\$/g, '\\$')
        .replace(/&/g, '\\&')
        .replace(/%/g, '\\%')
        .replace(/#/g, '\\#')
        .replace(/\^/g, '\\textasciicircum{}')
        .replace(/_/g, '\\_')
        .replace(/~/g, '\\textasciitilde{}')
        .replace(/"/g, "''")
        .replace(/'/g, "'");
}

module.exports = { latexEscape };
