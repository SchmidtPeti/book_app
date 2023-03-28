export const parseQuoteResponse = (xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
      
        const idezetekElements = xmlDoc.querySelectorAll('idezet');
        const idezetek = [];
      
        idezetekElements.forEach((idezetElement) => {
          const idezetszoveg = idezetElement.querySelector('idezetszoveg').textContent;
          const szerzo = idezetElement.querySelector('szerzo').textContent;
          const kategoria = idezetElement.querySelector('kategoria').textContent;
          const forras = idezetElement.querySelector('forras').textContent;
          const kedvenc = idezetElement.querySelector('kedvenc').textContent;
          const id = idezetElement.querySelector('id').textContent;
          const url = idezetElement.querySelector('url').textContent;
      
          idezetek.push({
            idezetszoveg,
            szerzo,
            kategoria,
            forras,
            kedvenc,
            id,
            url,
          });
        });
      
        return idezetek;
};