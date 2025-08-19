export function generateScriptFromOSC(msg, context = 'document') {
    const parts = msg.address.split('/').filter(Boolean);
    const mode = parts[0];
    const value = parts[1];
    const rawArg = msg.args?.[0];
    const keyword = typeof rawArg === 'string'
      ? rawArg
      : rawArg?.toString?.() ?? parts[parts.length - 1];

    // Handle scoped mode
    if (mode === 'scoped' && value === 'id') {
        const parentId = parts[2];
        // Special handling for /scoped/id/{id}/inputName/{name}
        if (parts[3] === 'inputName') {
            const inputName = parts[4];
            return `try {
  const parents = document.querySelectorAll('[id="${parentId}"]');
  if (parents.length > 0) {
    parents.forEach(parent => {
      const input = parent.querySelector('[name="${inputName}"]');
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (setter) setter.call(input, ${JSON.stringify(keyword)});
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✔️ Set input[name=${inputName}] to: ${keyword}');
      } else {
        console.warn("❌ No input with name ${inputName} found in parent");
      }
    });
  } else {
    console.warn("❌ No elements found with id=${parentId}");
  }
} catch (e) {
  console.error("⚠️ Error in SCOPED INPUTNAME block:", e);
}`;
        }
        const innerMsg = { address: '/' + parts.slice(3).join('/') };
        const finalInnerScript = generateScriptFromOSC(innerMsg, 'parent');
        return `try {
  const parents = document.querySelectorAll('[id="${parentId}"]');
  if (parents.length > 0) {
    parents.forEach(parent => {
${finalInnerScript.replace(/^/gm, '      ')}
    });
  } else {
    console.warn("❌ No elements found with id=${parentId}");
  }
} catch (e) {
  console.error("⚠️ Error in SCOPED block:", e);
}`;
    }

    // Helpers to generate queries based on context
    const Q = (selector) => `${context}.querySelector(${JSON.stringify(selector)})`;
    const Qall = (selector) => `Array.from(${context}.querySelectorAll(${JSON.stringify(selector)}))`;

    // Mode: id
    if (mode === 'id') {
        return `try {
  const el = document.getElementById("${value}");
  if (el) {
    el.click();
    console.log('✔️ Clicked element by id: ${value}');
  } else {
    console.warn('❌ No element found with id: ${value}');
  }
} catch (e) {
  console.error('⚠️ Error in ID script:', e);
}`;
    }

    // Mode: inputName
    if (mode === 'inputName') {
        return `try {
  const input = document.querySelector('[name="${value}"]');
  if (input) {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    if (setter) setter.call(input, ${JSON.stringify(keyword)});
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    console.log('✔️ Set input[name=${value}] to: ${keyword}');
  } else {
    console.warn('❌ No input found with name: ${value}');
  }
} catch (e) {
  console.error('⚠️ Error in INPUTNAME script:', e);
}`;
    }

    // Mode: class
    if (mode === 'class') {
        return `try {
  const elements = ${Qall(`.${value}`)};
  if (elements.length > 0) {
    elements.forEach(el => el.click());
    console.log('✔️ Clicked all elements with class: ${value}');
  } else {
    console.warn('❌ No elements found with class: ${value}');
  }
} catch (e) {
  console.error('⚠️ Error in CLASS script:', e);
}`;
    }

    // Mode: all/text or text/all
    if ((mode === 'text' && value === 'all') || mode === 'all') {
        return `try {
  const keyword = "${keyword}".toLowerCase();
  const elements = ${Qall("button, input[type=button], input[type=submit], [role=button], a")};
  const matches = elements.filter(el => {
    const text = el.innerText || el.value || el.textContent;
    return text && text.toLowerCase().trim() === keyword;
  });
  if (matches.length > 0) {
    matches.forEach(el => el.click());
    console.log('✔️ Clicked all elements with text: ${keyword}');
  } else {
    console.warn('❌ No matching elements found for text: ${keyword}');
  }
} catch (e) {
  console.error('⚠️ Error in ALL TEXT script:', e);
}`;
    }

    // Default: first matching element by text
    return `try {
  const keyword = "${keyword}".toLowerCase();
  const elements = ${Qall("button, input[type=button], input[type=submit], [role=button], a")};
  const match = elements.find(el => {
    const text = el.innerText || el.value || el.textContent;
    return text && text.toLowerCase().trim() === keyword;
  });
  if (match) {
    match.click();
    console.log('✔️ Clicked element with text: ${keyword}');
  } else {
    console.warn('❌ No matching element found for text: ${keyword}');
  }
} catch (e) {
  console.error('⚠️ Error in DEFAULT TEXT script:', e);
}`;
}
