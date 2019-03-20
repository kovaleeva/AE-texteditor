export const getSynonymsFromApi = (word) => {
  const fixWord = word.match(/[\w]?['-]?[\w]+/gi);
  const apiUrl = `https://api.datamuse.com/words?rel_syn=${fixWord[0]}`;
  
  return fetch(apiUrl).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
    .catch((error) => {
      console.log('Error: ' + error.message);
    });
};