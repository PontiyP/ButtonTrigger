export function generateScriptFromOSC(msg) {
    const parts = msg.address.split('/').filter(Boolean);
    const mode = parts[0];
    const value = parts[1];
    const keyword = parts[parts.length - 1];

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

    if (mode === 'class') {
        return `try {
      const elements = document.querySelectorAll(".${value}");
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

    if ((mode === 'text' && value === 'all') || mode === 'all') {
        return `try {
      const keyword = "${keyword}".toLowerCase();
      const elements = Array.from(document.querySelectorAll("button, input[type=button], input[type=submit], [role=button], a"));
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

    // default: single match by text
    return `try {
    const keyword = "${keyword}".toLowerCase();
    const elements = Array.from(document.querySelectorAll("button, input[type=button], input[type=submit], [role=button], a"));
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
