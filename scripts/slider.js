"use strict";function _createForOfIteratorHelper(e,r){var t,n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||r&&e&&"number"==typeof e.length)return n&&(e=n),t=0,{s:r=function(){},n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:r};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){a=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(a)throw o}}}}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(t="Object"===t&&e.constructor?e.constructor.name:t)||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var _step,ARROW='\n<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M12 13L9 8.04167L12 3" stroke="white" stroke-width="2" stroke-linecap="round"/>\n<path d="M7 13L4 8.04167L7 3" stroke="white" stroke-width="2" stroke-linecap="round"/>\n</svg>\n',list=document.querySelectorAll(".glider"),_iterator=_createForOfIteratorHelper(list);try{for(_iterator.s();!(_step=_iterator.n()).done;){var slider=_step.value,gliderPrev=document.createElement("button"),gliderNext=(gliderPrev.classList.add("glider-contain__button_prev","glider-contain__button"),gliderPrev.setAttribute("area-label","Previous"),gliderPrev.innerHTML=ARROW,document.createElement("button"));gliderNext.classList.add("glider-contain__button_next","glider-contain__button"),gliderNext.setAttribute("area-label","Next"),gliderNext.innerHTML=ARROW,slider.parentNode.append(gliderPrev,gliderNext),new Glider(slider,{slidesToShow:5,exactWidth:!0,itemWidth:345,draggable:!1,arrows:{prev:gliderPrev,next:gliderNext}})}}catch(e){_iterator.e(e)}finally{_iterator.f()}