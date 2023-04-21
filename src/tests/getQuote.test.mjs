const { getQuote } = require('../utils/api');

describe('getQuote', () => {
  it('fetches and parses quotes from the API', async () => {
    // Set up a mock response from the API
    const mockResponse = {
      data: {
        results: [
          { quote: 'To be or not to be' },
          { quote: 'It is a truth universally acknowledged' },
        ],
      },
    };
    const axiosGetMock = jest.spyOn(require('axios'), 'get').mockResolvedValue(mockResponse);

    // Call the getQuote function with a mock book parameter
    const quotes = await getQuote('mock-book');

    // Expect axios.get to have been called with the correct URL and parameters
    expect(axiosGetMock).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_BASE_URL}/idezet.php`,
      {
        params: {
          konyv: 'mock-book',
          f: process.env.REACT_APP_IDEZET_API_F,
          j: process.env.REACT_APP_IDEZET_API_J,
          db: 5,
          rendez: 'kedvencek',
          honnan: 0,
          rendez_ir: 1,
        },
      }
    );

    // Expect the returned quotes to match the mock response
    expect(quotes).toEqual(['To be or not to be', 'It is a truth universally acknowledged']);

    // Restore the original axios.get function
    axiosGetMock.mockRestore();
  });

  it('returns an empty array if there is an error', async () => {
    // Set up a mock error response from the API
    const axiosGetMock = jest.spyOn(require('axios'), 'get').mockRejectedValue(new Error('API error'));

    // Call the getQuote function with a mock book parameter
    const quotes = await getQuote('mock-book');

    // Expect the function to return an empty array
    expect(quotes).toEqual([]);

    // Restore the original axios.get function
    axiosGetMock.mockRestore();
  });
});
