var code= document.querySelectorAll('pre code');
code.forEach(function (elem) {
let cls = elem.className;
if (!/language-/i.test(elem.className) && !/lang-/i.test(elem.className)) {
    elem.className = elem.className.replace(cls,'language-'+ cls);
}
    
});
var pre = document.querySelectorAll('pre.pure-highlightjs');
pre.forEach(function (elem) {
    let reg = /line-numbers/i;
    if (!reg.test(elem.className))
        elem.className += ' line-numbers';
});