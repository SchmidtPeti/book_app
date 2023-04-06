export const parseQuoteResponse = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

  const idezetekElements = xmlDoc.querySelectorAll('idezet');
  const idezetek = [];

  idezetekElements.forEach((idezetElement) => {
      if (idezetElement) {
          const idezetszoveg = idezetElement.querySelector('idezetszoveg').innerHTML;
          const szerzoElement = idezetElement.querySelector('szerzo');
          const szerzo = szerzoElement ? szerzoElement.innerHTML : '';
          const kategoriaElements = idezetElement.querySelectorAll('kategoria');
          const kategoria = Array.from(kategoriaElements)
              .map((element) => element.innerHTML)
              .join(', ');
          const forrasElement = idezetElement.querySelector('forras');
          const forras = forrasElement ? forrasElement.innerHTML : '';
          const kedvenc = idezetElement.querySelector('kedvenc').innerHTML;
          const id = idezetElement.querySelector('id').innerHTML;
          const url = idezetElement.querySelector('url').innerHTML;

          idezetek.push({
              idezetszoveg,
              szerzo,
              kategoria,
              forras,
              kedvenc,
              id,
              url,
          });
      }
  });

  return idezetek;
};
