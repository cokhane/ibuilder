import $ from 'jquery';

export default {
  trigger: (data = {mainID: "preview", content: []}) => {
    let html = [];
    let finalData = html.concat(data.content);
    if (data.content === undefined || !data.content || data.content.length < 1) {
      return null;
    }
    $("#" + data.mainID).ready(function () {
      $("#" + data.mainID).contents().find('head').append(generateStyle({styleCont: finalData}));
      $("#" + data.mainID).contents().find('body').html(generate(finalData));
      $("#" + data.mainID).contents().find(".edtElbldr").hover(function () {
        if ($(this).parents().find('.edtElbldrHover').length > 0) {
          $(this).parents().find('.edtElbldrHover').remove();
        }
        $(this).append("<div class='edtElbldrHover'></div>");
      }, function () {
        $(this).find('.edtElbldrHover').remove()
      });
    });
    return true;
  },
  style: (data = {mainID: "preview", content: {}}) => {
    let finalData = Object.assign({}, data.content);
    if (data.content === undefined || !data.content) {
      return null;
    }
    $("#" + data.mainID).ready(function () {
      $("#" + data.mainID).contents().find('head').append(generateStyle(finalData));
    });
    return true;
  }
}

const generateStyle = (style) => {
  let finalstyle = $("<style></style>");

  if (style.imports) {
    if (style.imports.length > 0) {
      for (var i = 0; i < style.imports.length; i++) {
        finalstyle.append("imports url('" + style.imports[i] + "');")
      }
    }
  }

  if (style.pointer) {
    if (style.pointer.length > 0) {
      for (var s = 0; s < style.pointer.length; s++) {
        finalstyle.append(styletoString(style.pointer[s]));
      }
    }
  }

  if (style.styleCont) {
    if (style.styleCont.length > 0) {
      for (var q = 0; q < style.styleCont.length; q++) {
        finalstyle.append("#" + styletoString(style.styleCont[q]));
      }
    }
  }
  return finalstyle;
};

const styletoString = (styleObject) => {
  let styleString = styleObject.elId + "{";
  let styleKeys = Object.keys(styleObject.styles);
  if (styleKeys.length > 0) {
    for (var i = 0; i < styleKeys.length; i++) {
      styleString += (styleKeys[i] + ":" + styleObject.styles[styleKeys[i]] + ";")
    }
  }
  return styleString + "}";
};


const generate = (html) => {
  let finalTemplate = $("<div id='parent-3423' class='main'></div>");
  const sort = (parentID, template) => {
    let divList = template.find("#" + parentID).find("." + parentID);
    divList.sort(function (a, b) {
      return $(a).data("pos") - $(b).data("pos");
    });
    template.find("#" + parentID).html(divList);
  };

  const loop = () => {
    for (var i = 0; i < html.length; i++) {
      const tempObject = $(html[i].element);
      let attrArrange = {};
      attrArrange.id = html[i].elId;
      attrArrange = Object.assign(attrArrange, html[i].attr);
      const attrDataKeys = Object.keys(html[i].data);
      if (attrDataKeys.length > 0) {
        let attrDataModel = {}
        for (var w = 0; w < attrDataKeys.length; w++) {
          attrDataModel["data-" + attrDataKeys[w]] = html[i].data[attrDataKeys[w]]
        }
        attrArrange = Object.assign(attrArrange, attrDataModel);
      }
      tempObject.attr(attrArrange).append(html[i].text);
      tempObject.addClass(html[i].class);
      if (html[i].parentID) {
        const findID = "#" + html[i].parentID;
        let element_ = finalTemplate.find(findID);
        if (element_.length !== 0) {
          tempObject.addClass(html[i].parentID);
          element_.append(tempObject);
          sort(html[i].parentID, finalTemplate);
          html.splice(i, 1);
        }
      } else {
        tempObject.addClass("parent-3423");
        finalTemplate.append(tempObject);
        sort("parent-3423", finalTemplate);
        html.splice(i, 1);
      }
    }
  };
  while (html.length > 0) {
    loop();
  }
  return finalTemplate;
};